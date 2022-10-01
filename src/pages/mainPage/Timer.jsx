import React from "react";
import { useState } from "react";
import Stopwatch from "../../components/stopwatch/Stopwatch";
import { Blur } from "./Styled";

const Timer = () => {
  const [color, setColor] = useState("#7E7C8C");
  const [mode, setMode] = useState("normal");
  const [running, setRunning] = useState(false);

  const blurOff = () => {
    setMode("normal");
    setColor("#7E7C8C");
    mode === "complete" && setRunning(false);
  };

  return (
    <>
      <Stopwatch
        mode={mode}
        setMode={setMode}
        color={color}
        setColor={setColor}
        running={running}
        setRunning={setRunning}
      />
      {(mode === "set" || mode === "complete") && <Blur onClick={blurOff} />}
    </>
  );
};

export default Timer;
