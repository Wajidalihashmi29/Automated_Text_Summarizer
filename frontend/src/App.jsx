import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true); 
    try {
      const res = await axios.post("http://localhost:3000/api/summarize-input", {
        input: text
      });
      console.log("API Response:", res.data); 
      if (res.data && res.data.output) {
        setSummary(res.data.output);
      } else {
        console.error("Unexpected response format:", res.data);
      }
      setText(''); 
    } catch (error) {
      console.error("Error summarizing text:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="bg-[#0f172a] min-h-[100vh]">
      <div className="w-full bg-[#0f172a] h-full py-4 px-4 md:px-20">
        <div className="w-full">
          <div className="flex flex-row justify-between items-center w-full h-10 px-5 2xl:px-40">
            <h3 className="cursor-pointer text-3xl font-bold text-cyan-600">Summarizer</h3>
          </div>

          <div className="flex flex-col items-center justify-center mt-4 p-4">
            <h1 className="text-3xl text-white text-center leading-10 font-semibold">
              Summarize your text with
              <br />
              <span className="text-5xl font-bold text-cyan-500">Summarizer</span>
            </h1>
            <p className="mt-5 text-lg text-gray-500 sm:text-xl text-center max-w-2xl">
              Simply add your text and get a quick summary using our model
            </p>
          </div>

          <div className="flex flex-col w-full items-center justify-center mt-5">
            <textarea
              value={text}
              onChange={handleChange}
              placeholder="Paste doc content here ..."
              rows="6"
              className="block w-full md:w-[650px] rounded-md border border-slate-700 bg-slate-800 p-2 text-sm shadow-lg font-medium text-white focus:border-gray-500 focus:outline-none focus:ring-0"
            ></textarea>
            <button
              onClick={handleSubmit}
              className="mt-5 bg-blue-500 px-5 py-2 text-white text-md font cursor-pointer rounded-md"
              disabled={loading} 
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>

        <div className="w-full mt-10 flex flex-col gap-5 shadow-md items-center justify-center">
          <p className="text-white font-semibold text-lg">Summary</p>
          {summary ? (
            <div className="max-w-2xl bg-slate-800 p-3 rounded-md">
              <p className="text-gray-400 text-lg">{summary}</p>
              <div className="flex gap-5 items-center justify-end mt-2">
                <p
                  onClick={handleCopy}
                  className="text-gray-500 font-semibold cursor-pointer"
                >
                  Copy
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-lg">No summary available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
