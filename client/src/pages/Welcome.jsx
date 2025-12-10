import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2, Circle, TrendingUp, Share2, Shield, Zap, ArrowRight } from "lucide-react";

export default function Welcome() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [options, setOptions] = useState([
    { text: "Dark Mode", votes: 5 },
    { text: "Poll Scheduling", votes: 3 },
    { text: "Anonymous Voting", votes: 4 },
    { text: "Custom Backgrounds", votes: 2 },
  ]);

  const totalVotes = options.reduce((sum, o) => sum + o.votes, 0);

  const handleVote = () => {
    if (selected === null) return;

    const updated = [...options];
    updated[selected].votes += 1;
    setOptions(updated);
    setHasVoted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Header */}
      <nav className="border-b-2 border-black bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">LivePoll</h1>
          <button
            onClick={() => navigate("/create")}
            className="bg-black text-white font-bold px-6 py-2.5 rounded-lg border-2 border-black hover:bg-gray-800 transition-colors"
          >
            Create Poll
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-black mb-4 leading-tight">
            Real-Time Polls Made Simple
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create polls, share instantly, and watch results update live. No registration required.
          </p>
          <button
            onClick={() => navigate("/create")}
            className="bg-black text-white font-bold px-8 py-4 rounded-xl border-2 border-black hover:bg-gray-800 transition-all inline-flex items-center gap-2 text-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Interactive Demo Poll */}
        <div className="mb-16">
          <div className="text-center mb-6">
            <span className="inline-block bg-gray-100 border-2 border-black rounded-full px-4 py-1.5 text-sm font-bold text-black mb-3">
              TRY IT NOW
            </span>
            <h3 className="text-3xl font-bold text-black">See LivePoll in Action</h3>
          </div>

          <div className="max-w-2xl mx-auto bg-white border-2 border-black rounded-2xl p-8">
            <p className="text-xl font-semibold text-black mb-6 text-center">
              Which feature should we build next?
            </p>

            {!hasVoted ? (
              <>
                <div className="space-y-3 mb-6">
                  {options.map((opt, i) => (
                    <label
                      key={i}
                      onClick={() => setSelected(i)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        selected === i
                          ? "border-black bg-gray-100"
                          : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                      }`}
                    >
                      {selected === i ? (
                        <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0" />
                      ) : (
                        <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                      )}
                      <span className="font-semibold text-black">
                        {opt.text}
                      </span>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleVote}
                  disabled={selected === null}
                  className={`w-full font-bold py-4 rounded-xl border-2 border-black transition-all ${
                    selected === null
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  Submit Vote
                </button>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6 text-black" />
                  </div>
                  <h4 className="text-lg font-bold text-black">Vote Recorded!</h4>
                  <p className="text-sm text-gray-600">Watch the results update in real-time</p>
                </div>

                <div className="space-y-4">
                  {options.map((opt, i) => {
                    const percent = ((opt.votes / totalVotes) * 100).toFixed(1);
                    const isSelected = i === selected;

                    return (
                      <div key={i}>
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <div className="w-2 h-2 bg-black rounded-full"></div>
                            )}
                            <span className={`font-semibold ${isSelected ? "text-black" : "text-gray-700"}`}>
                              {opt.text}
                            </span>
                          </div>
                          <span className="font-bold text-black">
                            {opt.votes} votes
                          </span>
                        </div>

                        <div className="h-10 border-2 border-black rounded-lg overflow-hidden relative">
                          <div
                            className="h-full bg-black transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="font-bold text-black mix-blend-difference">
                              {percent}%
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-black text-center mb-10">
            Everything You Need for Instant Polling
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border-2 border-black rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Instant Setup</h4>
              <p className="text-gray-600">Create and share polls in seconds. No sign-up required.</p>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Live Results</h4>
              <p className="text-gray-600">Watch votes come in real-time with instant updates.</p>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded-lg flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Easy Sharing</h4>
              <p className="text-gray-600">Share poll links instantly with your audience.</p>
            </div>

            <div className="bg-white border-2 border-black rounded-xl p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-gray-100 border-2 border-black rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h4 className="text-lg font-bold text-black mb-2">Admin Controls</h4>
              <p className="text-gray-600">Manage your polls with dedicated admin access.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gray-50 border-2 border-black rounded-2xl p-12 text-center">
          <h3 className="text-3xl font-bold text-black mb-4">
            Ready to Create Your First Poll?
          </h3>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Join thousands of users gathering real-time feedback with LivePoll. Simple, fast, and completely free.
          </p>
          <button
            onClick={() => navigate("/create")}
            className="bg-black text-white font-bold px-10 py-4 rounded-xl border-2 border-black hover:bg-gray-800 transition-all inline-flex items-center gap-2 text-lg"
          >
            Create Your Poll Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t-2 border-black mt-20 py-8 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-gray-600">
            <span className="font-bold text-black">LivePoll</span> - Real-time polling made simple
          </p>
        </div>
      </footer>
    </div>
  );
}