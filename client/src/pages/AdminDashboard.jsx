import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";
import { Crown, Users, TrendingUp, StopCircle, Link2, Copy, Check } from "lucide-react";

export default function AdminDashboard() {
  const { adminId } = useParams();
  const [poll, setPoll] = useState(null);
  const [copied, setCopied] = useState(false);

  // Load poll as admin
  useEffect(() => {
    const loadAdminPoll = async () => {
      const res = await fetch(
  `https://poll-backend-idy1.onrender.com/api/admin/${adminId}`
);
      const data = await res.json();
      setPoll(data);
    };

    loadAdminPoll();
  }, [adminId]);

  // Live updates
  useEffect(() => {
    socket.on("pollUpdate", (updatedPoll) => {
      if (updatedPoll.adminId === adminId) {
        setPoll(updatedPoll);
      }
    });

    return () => socket.off("pollUpdate");
  }, [adminId]);

  const stopPoll = () => {
    socket.emit("stopPoll", adminId);
  };

const handleCopyVoterLink = () => {
  const voterLink = `https://poll-app-amber.vercel.app/poll/${poll.pollId}`;
  navigator.clipboard.writeText(voterLink);
  setCopied(true);
  setTimeout(() => setCopied(false), 2000);
};

  if (!poll) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <h2 className="text-xl text-black">Loading admin panel...</h2>
        </div>
      </div>
    );
  }

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);
  const winner = poll.options.reduce(
    (max, o) => (o.votes > max.votes ? o : max),
    poll.options[0]
  );
  const voterLink = `http://localhost:5173/poll/${poll.pollId}`;

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-8">
          <h1 className="text-4xl font-bold text-black mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Real-time poll results and management</p>
        </div>

        {/* 🔗 Voter Link Section */}
        <div className="bg-gray-50 border-2 border-black rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="w-5 h-5 text-black" />
            <span className="font-semibold text-black">Voter Link</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={voterLink}
              className="flex-1 bg-white border-2 border-black rounded-xl px-3 py-2 text-sm text-gray-800"
            />
            <button
              onClick={handleCopyVoterLink}
              className="flex items-center justify-center gap-1 px-4 py-2 border-2 border-black rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-900"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {/* Poll Question */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-black mb-6">{poll.question}</h2>

          {/* Options with Results */}
          <div className="space-y-4 mb-8">
            {poll.options.map((opt, i) => {
              const percentage =
                totalVotes > 0 ? ((opt.votes / totalVotes) * 100).toFixed(1) : 0;
              const isWinner = opt.text === winner.text && totalVotes > 0;

              return (
                <div key={i} className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isWinner && <Crown className="w-5 h-5 text-black" />}
                      <span className="font-semibold text-black">{opt.text}</span>
                    </div>
                    <span className="font-bold text-black">{opt.votes} votes</span>
                  </div>

                  <div className="h-12 bg-gray-100 border-2 border-black rounded-lg overflow-hidden relative">
                    <div
                      className="h-full bg-black transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-bold text-black mix-blend-difference">
                        {percentage}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Statistics */}
          <div className="border-t-2 border-black pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-black" />
                <span className="text-sm font-semibold text-gray-600">Total Votes</span>
              </div>
              <p className="text-3xl font-bold text-black">{totalVotes}</p>
            </div>

            <div className="bg-gray-50 border-2 border-black rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp className="w-6 h-6 text-black" />
                <span className="text-sm font-semibold text-gray-600">Leading Option</span>
              </div>
              <p className="text-xl font-bold text-black truncate">{winner.text}</p>
            </div>
          </div>

          {/* Stop Poll Button */}
          <div className="mt-6">
            <button
              onClick={stopPoll}
              disabled={poll.isStopped}
              className={`w-full font-bold py-4 px-6 rounded-xl border-2 border-black transition-all flex items-center justify-center gap-2 ${
                poll.isStopped
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-900"
              }`}
            >
              <StopCircle className="w-5 h-5" />
              {poll.isStopped ? "Poll Stopped" : "Stop Poll"}
            </button>
            {poll.isStopped && (
              <p className="text-center text-gray-600 mt-3 text-sm">
                This poll has been closed. No more votes can be submitted.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
