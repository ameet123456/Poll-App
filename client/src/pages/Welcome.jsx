import { useEffect, useRef, useState } from "react";
import {
  Vote,
  Sparkles,
  ArrowRight,
  LineChart,
  Code2,
  Rocket,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  const heroRef = useRef(null);
  const demoRef = useRef(null);
  const roadmapRef = useRef(null);
  const learningRef = useRef(null);
  const stackRef = useRef(null);

  const [heroVisible, setHeroVisible] = useState(false);
  const [demoVisible, setDemoVisible] = useState(false);
  const [roadmapVisible, setRoadmapVisible] = useState(false);
  const [learningVisible, setLearningVisible] = useState(false);
  const [stackVisible, setStackVisible] = useState(false);

  // IMPORTANT: MODAL STATE
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const [demoVotes, setDemoVotes] = useState([
    { label: "Custom Backgrounds", votes: 5 },
    { label: "Theme Customization", votes: 3 },
    { label: "Better Vote Protection", votes: 2 },
    { label: "Poll Analytics Dashboard", votes: 4 },
  ]);

  const handleDemoVote = (index) => {
    setDemoVotes((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, votes: item.votes + 1 } : item
      )
    );
  };

  // DevTools Greeting
  useEffect(() => {
    console.log("%cHello Developer 👋", "color:black;background:#FFD54F;padding:4px 8px;font-weight:bold;");
    console.log("%cWelcome to my Socket.IO learning project!", "color:#555;font-size:12px;");
  }, []);

  // Intersection Animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === heroRef.current) setHeroVisible(entry.isIntersecting);
          if (entry.target === demoRef.current) setDemoVisible(entry.isIntersecting);
          if (entry.target === roadmapRef.current) setRoadmapVisible(entry.isIntersecting);
          if (entry.target === learningRef.current) setLearningVisible(entry.isIntersecting);
          if (entry.target === stackRef.current) setStackVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.15 }
    );

    [heroRef, demoRef, roadmapRef, learningRef, stackRef].forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">

      {/* HEADER */}
      <header className="border-b border-black/10 sticky top-0 bg-white/95 backdrop-blur-sm z-30">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
              <Vote className="w-4 h-4" />
            </div>
            <div className="font-bold tracking-tight">Real-Time Poll App</div>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <a href="#roadmap" className="hover:underline">Roadmap</a>
            <a href="#learning" className="hover:underline">What I Learned</a>
            <a href="#stack" className="hover:underline">Tech Stack</a>

            <button
              onClick={() => navigate("/create")}
              className="inline-flex items-center gap-1 border-2 border-black rounded-full px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white"
            >
              Create Poll
              <ArrowRight className="w-3 h-3" />
            </button>
          </nav>
        </div>
      </header>

      {/* GLOBAL BLUR OVERLAY */}
      {demoModalOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"></div>
      )}

      {/* MAIN CONTENT */}
      <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">

        {/* HERO SECTION */}
        <section className="grid gap-8 md:grid-cols-[1.2fr,1fr] items-center">
          <div
            ref={heroRef}
            className={`transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 border border-black rounded-full px-3 py-1 text-xs mb-4">
              <Sparkles className="w-3 h-3" />
              <span>Socket.IO Learning Journey – V2</span>
            </div>

            <h1 className="text-3xl font-black mb-3">
              Real-Time Polls, Built to Learn How the Web Talks.
            </h1>

            <p className="text-gray-700 mb-6 text-sm">
              From a simple idea → to real-time WebSocket interactions →
              to a sharable poll system.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/create")}
                className="border-2 border-black bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-900"
              >
                Create a Poll
              </button>

              <button
                onClick={() => setDemoModalOpen(true)}
                className="border-2 border-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100"
              >
                View Demo Poll
              </button>
            </div>
          </div>

          {/* STATIC PREVIEW CARD */}
          <div
            ref={demoRef}
            className={`border-2 border-black rounded-2xl p-5 bg-gray-50 shadow-[4px_4px_0px_black] transition-all duration-1000 ${
              demoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-sm font-bold mb-4">Which feature should ship first?</h2>

            {[46, 32, 15, 7].map((v, i) => (
              <div key={i} className="mb-2">
                <div className="flex justify-between text-xs">
                  <span>Option {i + 1}</span>
                  <span>{v}%</span>
                </div>
                <div className="h-6 border border-black rounded-lg bg-white overflow-hidden">
                  <div
                    className="h-full bg-black"
                    style={{ width: demoVisible ? `${v}%` : "0%" }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
<section
          id="roadmap"
          ref={roadmapRef}
          className={`space-y-4 transition-all duration-1000 ${
            roadmapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-2">
            <LineChart className="w-4 h-4" />
            <h2 className="text-xl font-bold">Project Roadmap: V1 → V3</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3 text-sm">
            {[
              {
                version: "V1 – Proof of Concept",
                title: "Single \"Tea vs Coffee?\" Poll",
                items: [
                  "One hard-coded poll",
                  "Anyone can vote multiple times",
                  "Real-time updates with Socket.IO"
                ],
                bg: "bg-gray-50"
              },
              {
                version: "V2 – Sharable Polls (Current)",
                title: "Links for voters & admin",
                items: [
                  "Create custom questions & options",
                  "Separate voter & admin links",
                  "Live result updates on both sides",
                  "Admin can stop the poll"
                ],
                bg: "bg-white"
              },
              {
                version: "V3 – Coming Soon",
                title: "More \"product-like\" features",
                items: [
                  "Custom backgrounds (image / AI)",
                  "Theme customization",
                  "Better duplicate-vote protection",
                  "Optional auth & basic analytics"
                ],
                bg: "bg-gray-50"
              }
            ].map((card, idx) => (
              <div
                key={card.version}
                className={`border-2 border-black rounded-2xl p-4 ${card.bg} transition-all duration-700 hover:shadow-lg hover:-translate-y-2 transform`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="text-xs font-semibold mb-1">{card.version}</div>
                <p className="font-bold mb-2">{card.title}</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {card.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* What I Learned */}
        <section
          id="learning"
          ref={learningRef}
          className={`space-y-4 transition-all duration-1000 delay-200 ${
            learningVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <h2 className="text-xl font-bold">What I Learned Building This</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            {[
              {
                title: "Socket.IO & Real-Time Thinking",
                items: [
                  "Difference between io.on and socket.on",
                  "How emit sends events to server / all clients",
                  "Using WebSockets + REST together in one project",
                  "Keeping server as the \"source of truth\" for votes"
                ],
                bg: "bg-white"
              },
              {
                title: "Full-Stack & Deployment",
                items: [
                  "Express routes for creating & fetching polls",
                  "In-memory storage for quick V2 iteration",
                  "Deploying backend to Render",
                  "Deploying React (Vite) frontend to Vercel"
                ],
                bg: "bg-gray-50"
              }
            ].map((card, idx) => (
              <div
                key={card.title}
                className={`border-2 border-black rounded-2xl p-4 ${card.bg} transition-all duration-700 hover:shadow-lg hover:-translate-y-2 transform`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {card.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
<section
          id="stack"
          ref={stackRef}
          className={`space-y-3 pb-10 transition-all duration-1000 delay-300 ${
            stackVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex items-center gap-2">
            <Rocket className="w-4 h-4" />
            <h2 className="text-xl font-bold">Tech Stack</h2>
          </div>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              "React",
              "Vite",
              "Tailwind CSS",
              "Socket.IO",
              "Node.js",
              "Express",
              "Render (Backend)",
              "Vercel (Frontend)",
            ].map((tag, idx) => (
              <span
                key={tag}
                className="border border-black rounded-full px-3 py-1 bg-gray-50 transition-all duration-300 hover:bg-black hover:text-white hover:scale-110 transform cursor-default"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
        {/* MODAL FOR DEMO POLL */}
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white border-2 border-black rounded-2xl p-6 w-[90%] max-w-md shadow-[6px_6px_0px_black]">
              <div className="flex justify-between mb-4">
                <h2 className="font-bold flex items-center gap-2">
                  <Vote className="w-4 h-4" /> Demo Poll
                </h2>
                <button onClick={() => setDemoModalOpen(false)}>✕</button>
              </div>

              {demoVotes.map((opt, idx) => {
                const total = demoVotes.reduce((sum, o) => sum + o.votes, 0);
                const percent = ((opt.votes / total) * 100).toFixed(1);

                return (
                  <div key={idx} onClick={() => handleDemoVote(idx)} className="cursor-pointer mb-3">
                    <div className="flex justify-between text-xs">
                      <span>{opt.label}</span>
                      <span>{percent}%</span>
                    </div>
                    <div className="h-5 border border-black rounded-lg bg-gray-50 overflow-hidden">
                      <div className="h-full bg-black" style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
