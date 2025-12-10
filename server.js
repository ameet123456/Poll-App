import express from "express";
import { createServer } from "node:http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

/* ✅✅✅ TRUE GLOBAL MEMORY (SURVIVES HOT RELOADS) */
global.polls = global.polls || {};
const polls = global.polls;

/* ✅ CREATE POLL */
app.post("/api/create", (req, res) => {
  const { question, options, showResults, endTime } = req.body;

  if (!question || !Array.isArray(options) || options.length < 2) {
    return res.status(400).json({ error: "Invalid poll data" });
  }

  const pollId = "p_" + Date.now();
  const adminId = "a_" + Date.now() + Math.floor(Math.random() * 10000);

  polls[pollId] = {
    pollId,
    adminId,
    question,
    options: options.map(text => ({ text, votes: 0 })),
    showResults,
    endTime,
    isStopped: false,
    createdAt: Date.now()
  };

  res.json({ pollId, adminId });
});

/* ✅ GET POLL (VOTERS) */
app.get("/api/poll/:pollId", (req, res) => {
  const { pollId } = req.params;
  const poll = polls[pollId];

  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  res.json({
    pollId: poll.pollId,
    question: poll.question,
    options: poll.options,
    showResults: poll.showResults,
    endTime: poll.endTime,
    isStopped: poll.isStopped
  });
});

/* ✅ GET ADMIN POLL */
app.get("/api/admin/:adminId", (req, res) => {
  const { adminId } = req.params;

  const poll = Object.values(polls).find(p => p.adminId === adminId);

  if (!poll) {
    return res.status(404).json({ error: "Poll not found" });
  }

  res.json({
    pollId: poll.pollId,
    adminId: poll.adminId,
    question: poll.question,
    options: poll.options,
    showResults: poll.showResults,
    endTime: poll.endTime,
    isStopped: poll.isStopped,
    createdAt: poll.createdAt
  });
});

/* ✅ SOCKET.IO */
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  /* ✅ USER VOTE */
  socket.on("vote", ({ pollId, optionIndex }) => {
    const poll = polls[pollId];
    if (!poll || poll.isStopped) return;

    if (poll.options[optionIndex]) {
      poll.options[optionIndex].votes += 1;
    }

    io.emit("pollUpdate", poll);
  });

  /* ✅ ADMIN STOP */
  socket.on("stopPoll", (adminId) => {
    const poll = Object.values(polls).find(p => p.adminId === adminId);
    if (!poll) return;

    poll.isStopped = true;
    io.emit("pollStopped", poll.pollId);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

/* ✅ RENDER SAFE PORT */
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
