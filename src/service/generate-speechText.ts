declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

type ConvertProps = {
  finalTranscripts: string;
  interimTranscripts: string;
  setFinalTranscripts: (value: string) => void;
  setInterimTranscripts: (value: string) => void;
};

const SpeechRecognition =
  typeof window !== "undefined" &&
  (window.SpeechRecognition || window.webkitSpeechRecognition);

let speechRecognizer: any;

export const startConverting = ({
  finalTranscripts,
  interimTranscripts,
  setFinalTranscripts,
  setInterimTranscripts,
}: ConvertProps) => {
  if (SpeechRecognition) {
    speechRecognizer = new SpeechRecognition();
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

export const stopConverting = () => {
  if (speechRecognizer) {
    speechRecognizer.stop();
  }
};
