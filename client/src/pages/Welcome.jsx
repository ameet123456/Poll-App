import { useEffect, useRef, useState } from "react";
import { Vote, Sparkles, ArrowRight, LineChart, Code2, Rocket } from "lucide-react";

export default function WelcomePage() {
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

  // Small easter egg for devs opening DevTools
  useEffect(() => {
    const styleTitle =
      "color: #000; background: #FFD54F; padding: 4px 8px; font-size: 14px; font-weight: bold;";
    const styleText = "color: #555; font-size: 12px;";

    console.log("%cHello developer 👋", styleTitle);
    console.log(
      "%cThis is a Socket.IO learning project. Check the code, break things, learn things.",
      styleText
    );
  }, []);

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

    if (heroRef.current) observer.observe(heroRef.current);
    if (demoRef.current) observer.observe(demoRef.current);
    if (roadmapRef.current) observer.observe(roadmapRef.current);
    if (learningRef.current) observer.observe(learningRef.current);
    if (stackRef.current) observer.observe(stackRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white text-black overflow-x-hidden">
      {/* Top nav / header */}
      <header className="border-b border-black/10 sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center transform hover:rotate-12 transition-transform">
              <Vote className="w-4 h-4" />
            </div>
            <div className="font-bold tracking-tight">Real-Time Poll App</div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <a
              href="#roadmap"
              className="hover:underline underline-offset-4 transition-all"
            >
              Roadmap
            </a>
            <a
              href="#learning"
              className="hover:underline underline-offset-4 transition-all"
            >
              What I Learned
            </a>
            <a
              href="#stack"
              className="hover:underline underline-offset-4 transition-all"
            >
              Tech Stack
            </a>
            <button className="inline-flex items-center gap-1 border-2 border-black rounded-full px-3 py-1 text-xs font-semibold hover:bg-black hover:text-white transition-all hover:scale-105">
              Create Poll
              <ArrowRight className="w-3 h-3" />
            </button>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-12">
        {/* Hero Section */}
        <section className="grid gap-8 md:grid-cols-[1.2fr,1fr] items-center">
          <div
            ref={heroRef}
            className={`transition-all duration-1000 ${
              heroVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="inline-flex items-center gap-2 border border-black rounded-full px-3 py-1 text-xs mb-4 animate-pulse">
              <Sparkles className="w-3 h-3" />
              <span className="uppercase tracking-wide">
                Socket.IO Learning Journey – V2
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight mb-3">
              Real-Time Polls, Built to Learn How the Web Talks.
            </h1>
            <p className="text-sm md:text-base text-gray-700 mb-6">
              This app started as a simple "Tea vs Coffee?" test and grew into a
              full real-time polling system using <span className="font-semibold">Socket.IO</span>,{" "}
              <span className="font-semibold">React</span>, and{" "}
              <span className="font-semibold">Node.js</span>.  
              V2 focuses on sharable polls, admin view, and live result updates.
            </p>

            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 border-2 border-black bg-black text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-900 transition-all hover:scale-105 hover:shadow-lg">
                Create a Poll
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center gap-2 border-2 border-black px-4 py-2 rounded-xl text-sm font-semibold hover:bg-gray-100 transition-all hover:scale-105">
                View Demo Poll
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-600">
              V3 (coming soon): background customization, theme options, better
              vote protection, and more "real product" features.
            </p>
          </div>

          {/* Demo Poll Card (static) */}
          <div
            ref={demoRef}
            className={`border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_#000] bg-gray-50 transition-all duration-1000 delay-200 hover:shadow-[6px_6px_0px_#000] hover:-translate-y-1 ${
              demoVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="inline-flex items-center gap-2 text-xs font-semibold border border-black rounded-full px-3 py-1 bg-white">
                <Vote className="w-3 h-3" />
                LIVE DEMO
              </div>
              <span className="text-[11px] text-gray-600">Read-only preview</span>
            </div>
            <h2 className="text-sm font-bold mb-4">
              Which feature should ship first in V3?
            </h2>

            <div className="space-y-2 text-xs">
              {[
                { label: "Custom Backgrounds", percent: 46 },
                { label: "Theme Customization", percent: 32 },
                { label: "Better Vote Protection", percent: 15 },
                { label: "Poll Analytics Dashboard", percent: 7 },
              ].map((opt, idx) => (
                <div
                  key={opt.label}
                  className="transform transition-all duration-500 hover:scale-102"
                  style={{ transitionDelay: `${idx * 100}ms` }}
                >
                  <div className="flex justify-between mb-1">
                    <span>{opt.label}</span>
                    <span className="font-semibold">{opt.percent}%</span>
                  </div>
                  <div className="h-6 border border-black rounded-lg overflow-hidden bg-white">
                    <div
                      className="h-full bg-black transition-all duration-1000 ease-out"
                      style={{ width: demoVisible ? `${opt.percent}%` : "0%" }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <p className="mt-4 text-[11px] text-gray-600">
              This is just a static preview – the real polls update live via Socket.IO.
            </p>
          </div>
        </section>

        {/* Roadmap Section */}
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

        {/* Tech Stack */}
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
      </main>
    </div>
  );
}