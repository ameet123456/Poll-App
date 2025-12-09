import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Vote } from "lucide-react";
import { useParams } from "react-router-dom";
import socket from "../utils/socket";   // ✅ REQUIRED

export default function PollPage() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  // ✅ Load poll on page open (REST)
  useEffect(() => {
    const loadPoll = async () => {
      const res = await fetch(`http://localhost:3000/api/poll/${pollId}`);
      const data = await res.json();
      setPoll(data);
      setLoading(false);
    };

    loadPoll();
  }, [pollId]);

  // ✅ Listen for LIVE vote updates
  useEffect(() => {
    socket.on("pollUpdate", (updatedPoll) => {
      if (updatedPoll.pollId === pollId) {
        setPoll(updatedPoll); // ✅ Backend is source of truth
      }
    });

    return () => socket.off("pollUpdate");
  }, [pollId]);

  // ✅ Listen for ADMIN STOP
  useEffect(() => {
    socket.on("pollStopped", (stoppedPollId) => {
      if (stoppedPollId === pollId) {
        setPoll((prev) => ({ ...prev, isStopped: true }));
      }
    });

    return () => socket.off("pollStopped");
  }, [pollId]);

  // ✅ Send vote ONLY to backend (no local mutation)
  const handleVote = () => {
    if (selected === null || poll.isStopped) return;

    socket.emit("vote", {
      pollId,
      optionIndex: selected,
    });

    setHasVoted(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <h2 className="text-xl text-black">Loading poll...</h2>
        </div>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-black mb-2">Poll not found</h2>
          <p className="text-gray-600">This poll may have been deleted or the link is incorrect</p>
        </div>
      </div>
    );
  }

  const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="mb-8 pt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-gray-100 border-2 border-black rounded-full px-4 py-2 mb-4">
            <Vote className="w-4 h-4 text-black" />
            <span className="text-sm font-semibold text-black">LIVE POLL</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
            {poll.question}
          </h1>
          <p className="text-gray-600">
            {totalVotes} {totalVotes === 1 ? "vote" : "votes"} cast
          </p>
        </div>

        {/* Voting Area */}
        {!hasVoted && !poll.isStopped ? (
          <div className="bg-white border-2 border-black rounded-2xl p-8 mb-6">
            <h2 className="text-lg font-semibold text-black mb-6">
              Select your answer:
            </h2>

            <div className="space-y-3 mb-8">
              {poll.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selected === i
                      ? "border-black bg-gray-100"
                      : "border-gray-300 bg-white hover:border-gray-400 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelected(i)}
                >
                  <input
                    type="radio"
                    name="vote"
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                    className="sr-only"
                  />
                  {selected === i ? (
                    <CheckCircle2 className="w-6 h-6 text-black flex-shrink-0" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-400 flex-shrink-0" />
                  )}
                  <span
                    className={`font-semibold flex-1 ${
                      selected === i ? "text-black" : "text-gray-700"
                    }`}
                  >
                    {opt.text}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={handleVote}
              disabled={selected === null}
              className={`w-full font-bold py-4 px-6 rounded-xl border-2 border-black transition-all ${
                selected === null
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Submit Vote
            </button>
          </div>
        ) : (
          <div className="bg-white border-2 border-black rounded-2xl p-8 mb-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gray-100 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-bold text-black mb-2">
                Vote Submitted!
              </h2>
              <p className="text-gray-600">Thank you for participating</p>
            </div>

            {poll.showResults && (
              <>
                <h3 className="text-lg font-semibold text-black mb-4">
                  Current Results:
                </h3>
                <div className="space-y-4">
                  {poll.options.map((opt, i) => {
                    const percentage =
                      totalVotes > 0
                        ? ((opt.votes / totalVotes) * 100).toFixed(1)
                        : 0;
                    const isSelected = i === selected;

                    return (
                      <div key={i} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isSelected && (
                              <div className="w-2 h-2 bg-black rounded-full"></div>
                            )}
                            <span
                              className={`font-semibold ${
                                isSelected ? "text-black" : "text-gray-700"
                              }`}
                            >
                              {opt.text}
                            </span>
                          </div>
                          <span className="font-bold text-black">
                            {opt.votes} votes
                          </span>
                        </div>

                        <div className="h-10 bg-gray-100 border-2 border-black rounded-lg overflow-hidden relative">
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
              </>
            )}
          </div>
        )}

        {/* Info Footer */}
        {poll.isStopped && (
          <div className="text-center">
            <div className="inline-block bg-gray-100 border-2 border-black rounded-lg px-4 py-2">
              <span className="text-sm font-semibold text-black">
                This poll has ended
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
