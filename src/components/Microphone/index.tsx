import { useState } from "react";
import style from "./microphone.module.scss";

interface MicrophoneProps {
  activateMicrophone: () => void;
  disableMicrophone: () => void;
  isActivated: boolean;
  setIsActivated: (value: boolean) => void;
}

export const Microphone = ({
  activateMicrophone,
  disableMicrophone,
  isActivated,
  setIsActivated,
}: MicrophoneProps) => {
  const handleMicrophone = () => {
    const newIsActivated = !isActivated;
    setIsActivated(newIsActivated);
    if (newIsActivated) {
      return activateMicrophone();
    } else {
      return disableMicrophone();
    }
  };

  return (
    <div
      onClick={handleMicrophone}
      className={isActivated ? style.microphoneOn : style.microphone}
    >
      <div className={style.circle}></div>
    </div>
  );
};
