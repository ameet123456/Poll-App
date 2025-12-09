import { useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  // ✅ Demo poll state (Hardcoded for experience)
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
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">

        {/* ✅ HEADER */}
        <div className="flex items-center justify-between pt-6 mb-10">
          <h1 className="text-3xl font-bold text-black">LivePoll</h1>
          <button
            onClick={() => navigate("/create")}
            className="bg-black text-white font-bold px-6 py-3 rounded-xl border-2 border-black hover:bg-gray-900"
          >
            Create Poll
          </button>
        </div>

        {/* ✅ DEMO POLL */}
        <div className="border-2 border-black rounded-2xl p-8 mb-14">
          <h2 className="text-2xl font-bold text-black mb-6 text-center">
            DEMO POLL
          </h2>

          <p className="text-xl font-semibold text-black mb-6 text-center">
            Which feature should we build next?
          </p>

          {!hasVoted ? (
            <>
              <div className="space-y-4 mb-6">
                {options.map((opt, i) => (
                  <label
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer ${
                      selected === i
                        ? "border-black bg-gray-100"
                        : "border-gray-300"
                    }`}
                  >
                    {selected === i ? (
                      <CheckCircle2 className="w-6 h-6 text-black" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-400" />
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
                className={`w-full font-bold py-4 rounded-xl border-2 border-black ${
                  selected === null
                    ? "bg-gray-200 text-gray-400"
                    : "bg-black text-white hover:bg-gray-900"
                }`}
              >
                Submit Demo Vote
              </button>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold text-black mb-4 text-center">
                Live Results
              </h3>

              <div className="space-y-4">
                {options.map((opt, i) => {
                  const percent = ((opt.votes / totalVotes) * 100).toFixed(1);

                  return (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="font-semibold text-black">
                          {opt.text}
                        </span>
                        <span className="font-bold text-black">
                          {opt.votes} votes
                        </span>
                      </div>

                      <div className="h-10 border-2 border-black rounded-lg overflow-hidden">
                        <div
                          className="h-full bg-black"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* ✅ HERO SECTION */}
        <div className="text-center border-2 border-black rounded-2xl p-10">
          <h2 className="text-3xl font-bold text-black mb-4">
            Create Real-Time Polls in Seconds
          </h2>

          <p className="text-gray-700 mb-6">
            Create polls, share links, watch live results, and control the poll
            as an admin — all without login.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="border-2 border-black rounded-xl p-4 font-semibold">
              ✅ Live Voting
            </div>
            <div className="border-2 border-black rounded-xl p-4 font-semibold">
              ✅ Shareable Links
            </div>
            <div className="border-2 border-black rounded-xl p-4 font-semibold">
              ✅ Admin Controls
            </div>
            <div className="border-2 border-black rounded-xl p-4 font-semibold">
              ✅ Instant Results
            </div>
          </div>

          <button
            onClick={() => navigate("/create")}
            className="bg-black text-white font-bold px-10 py-4 rounded-xl border-2 border-black hover:bg-gray-900"
          >
            Start Creating Polls
          </button>
        </div>
      </div>
    </div>
  );
}
