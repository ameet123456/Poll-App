import { useState } from "react";
import {
  Plus,
  X,
  Calendar,
  Eye,
  EyeOff,
  Share2,
  Copy,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CreatePoll() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [showResults, setShowResults] = useState(true);
  const [endTime, setEndTime] = useState("");
  const [links, setLinks] = useState(null);
  const [copiedVoter, setCopiedVoter] = useState(false);
  const [copiedAdmin, setCopiedAdmin] = useState(false);

  const navigate = useNavigate();

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const updateOption = (index, value) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "voter") {
      setCopiedVoter(true);
      setTimeout(() => setCopiedVoter(false), 2000);
    } else {
      setCopiedAdmin(true);
      setTimeout(() => setCopiedAdmin(false), 2000);
    }
  };

  const createPoll = async () => {
    if (!question.trim()) {
      alert("Please enter a poll question");
      return;
    }
    const cleanOptions = options.filter((o) => o.trim() !== "");
    if (cleanOptions.length < 2) {
      alert("Please add at least 2 options");
      return;
    }

    const res = await fetch(
      "https://poll-backend-idy1.onrender.com/api/create",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question,
          options: cleanOptions,
          showResults,
          endTime: endTime || null,
        }),
      }
    );
    const data = await res.json();
    setLinks(data);
  };

  const resetForm = () => {
    setQuestion("");
    setOptions(["", ""]);
    setShowResults(true);
    setEndTime("");
    setLinks(null);
  };

  if (links) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Poll Created Successfully!
            </h2>
            <p className="text-gray-600">
              Share these links with your audience
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {/* Voter Link */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-3">
                <Share2 className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-900">Voter Link</h3>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`https://poll-app-amber.vercel.app/poll/${links.pollId}`}
                  className="flex-1 bg-white border border-blue-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={() =>
                    copyToClipboard(
                      `https://poll-app-amber.vercel.app/poll/${links.pollId}`,
                      "voter"
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                >
                  {copiedVoter ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Share this link with voters
              </p>
            </div>

            {/* Admin Link */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center gap-2 mb-3">
                <Eye className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-gray-900">Admin Link</h3>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={`https://poll-app-amber.vercel.app/admin/${links.adminId}`}
                  className="flex-1 bg-white border border-purple-200 rounded-lg px-4 py-2 text-sm text-gray-700 focus:outline-none"
                />
                <button
                  onClick={() =>
                    copyToClipboard(
                      `https://poll-app-amber.vercel.app/admin/${links.adminId}`,
                      "admin"
                    )
                  }
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors"
                >
                  {copiedAdmin ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <Copy className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Keep this private – use it to manage the poll.
              </p>
            </div>
          </div>

          {/* ✅ NEW: Go to Admin Dashboard */}
          <button
            onClick={() => navigate(`/admin/${links.adminId}`)}
            className="w-full mb-3 bg-black text-white font-semibold py-3 px-6 rounded-xl border-2 border-black hover:bg-gray-900 transition-all"
          >
            Go to Admin Dashboard
          </button>

          <button
            onClick={resetForm}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all transform hover:scale-[1.02] shadow-lg"
          >
            Create Another Poll
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-4xl font-bold text-black mb-2">
            Create Your Poll
          </h1>
          <p className="text-gray-600">
            Gather opinions and feedback in real-time
          </p>
        </div>

        <div className="bg-white border-2 border-black rounded-2xl p-8">
          {/* Question Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-black mb-3">
              Poll Question
            </label>
            <input
              type="text"
              placeholder="What would you like to ask?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all"
            />
          </div>

          {/* Options Section */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-black mb-3">
              Answer Options
            </label>
            <div className="space-y-3">
              {options.map((opt, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {i + 1}
                  </div>
                  <input
                    type="text"
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    className="flex-1 bg-gray-50 border-2 border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black focus:bg-white transition-all"
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => removeOption(i)}
                      className="flex-shrink-0 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-black border-2 border-black rounded-lg flex items-center justify-center transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              onClick={addOption}
              className="mt-4 w-full bg-white hover:bg-gray-50 border-2 border-dashed border-gray-300 text-black font-semibold py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Another Option
            </button>
          </div>

          {/* Settings Section */}
          <div className="mb-8 space-y-4">
            <label className="block text-sm font-semibold text-black mb-3">
              Poll Settings
            </label>

            <div className="bg-gray-50 rounded-xl p-4 border-2 border-black">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  {showResults ? (
                    <Eye className="w-5 h-5 text-black" />
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}
                  <div>
                    <div className="font-semibold text-black">
                      Show Live Results
                    </div>
                    <div className="text-sm text-gray-600">
                      Allow voters to see results after voting
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={showResults}
                    onChange={() => setShowResults(!showResults)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-gray-300 peer-checked:bg-black rounded-full peer transition-all border-2 border-black"></div>
                  <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all peer-checked:translate-x-6 shadow-md border-2 border-black"></div>
                </div>
              </label>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border-2 border-black">
              <label className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-black mt-1" />
                <div className="flex-1">
                  <div className="font-semibold text-black mb-2">
                    End Date (Optional)
                  </div>
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-2 text-black focus:outline-none focus:border-black transition-all"
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Create Button */}
          <button
            onClick={createPoll}
            className="w-full bg-black hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-all border-2 border-black"
          >
            Create Poll
          </button>
        </div>
      </div>
    </div>
  );
}
