import React, { useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

export const SpeechToText = () => {
  const [finalTranscripts, setFinalTranscripts] = useState("");
  const [interimTranscripts, setInterimTranscripts] = useState("");

  const startConverting = () => {
    if (SpeechRecognition) {
      const speechRecognizer = new SpeechRecognition();
      speechRecognizer.continuous = true;
      speechRecognizer.interimResults = true;
      speechRecognizer.lang = "en-US";
      speechRecognizer.start();

      speechRecognizer.onresult = (event: any) => {
        let interimTranscripts = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          let transcript = event.results[i][0].transcript;
          transcript.replace("\n", "<br>");
          if (event.results[i].isFinal) {
            setFinalTranscripts(finalTranscripts + transcript);
          } else {
            interimTranscripts += transcript;
          }
        }
        setInterimTranscripts(interimTranscripts);
      };
      speechRecognizer.onerror = (event: any) => {};
    } else {
      setFinalTranscripts(
        "Your browser is not supported. Please download Google chrome or Update your Google chrome!!"
      );
    }
  };

  return (
    <div>
      <button onClick={startConverting}>Start</button>
      <div>
        {finalTranscripts}
        <span style={{ color: "#999" }}>{interimTranscripts}</span>
      </div>
    </div>
  );
};

export default SpeechToText;
