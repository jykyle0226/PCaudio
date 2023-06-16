import React from "react";
import { useEffect, useState } from "react";
import "../Style/Fader.css";

const FaderDataComp = ({ Name, dB }) => {
  const [db, setDb] = useState(dB);
  const [muted, setMuted] = useState(false);
  const finalVolume = muted ? -60 : db ** 1;


  return (
    <main>
      <button style={{
        backgroundColor: muted ? 'red' : 'green' 
      }} onClick={() => setMuted((m) => !m)}>
        {muted ? "Off" : "On"}
      </button>
      <section>
        <input
          type="range"
          orient="vertical"
          min={-50}
          max={20}
          step={0.02}
          value={db}
          className="Fader"
          onChange={(event) => {
            setDb(event.target.valueAsNumber);
          }}
        />
      </section>
      <div style={{
        backgroundColor: muted ? 'red' : '' 
      }}className="screen">
        <section>
          <p className="name">{Name}</p>
        </section>
        <section>
          <p className="dB" >{finalVolume.toFixed(1)} dB</p>
        </section>
      </div>
    </main>
  );
};

export default FaderDataComp;
