import React from "react";
import { useEffect, useState } from "react";
import "../Style/Fader.css";

const FaderDataComp = ({ name, dB, Catagory }) => {
  const [db, setDb] = useState(dB);
  const [muted, setMuted] = useState(true ? db === "" : false);
  const finalVolume = muted ? -60 : db ** 1;
  const indicatorColor = () =>{
    if(Catagory === 'Inst') {
      return '#6372EE'
    } else if(Catagory === 'Singer'){
      return '#D3A3E6'
    } else if(Catagory === 'DCA'){
      return '#FBF883'
    } else if(Catagory === 'Stem'){
      return '#E6BAA3'
    }
  }

  

  return (
    <main className="main">
      <button
      className="button-5"
        style={{
          backgroundColor: muted ? "red" : "",
        }}
        onClick={() => setMuted((m) => !m)}
      >
        {muted ? "Off" : "On"}
      </button>
      <section>
      <div className="middle">
        <div className="slider-container">
          <span className="bar">
            <span className="fill"></span>
          </span>
          <input
            type="range"
            id="slider"
            className="slider"
            min="-60"
            max="20"
            value={finalVolume}
            onChange={(event) => {
              setDb(event.target.valueAsNumber);
            }}
          ></input>
        </div>
      </div>

      </section>
      <div>
        
        <div className="indicator"
        style={{
          backgroundColor: indicatorColor()
          
        }}></div>
        </div>
      <div
        style={{
          backgroundColor: muted ? "red" : "",
        }}
        className="screen"
      >
        <section>
          <p  id="screenfont" className="name">{name}</p>
        </section>
        <section>
          <p id="screenfont" className="dB">{finalVolume.toFixed(1)} dB</p>
        </section>


      </div>
      
    </main>
  );
};

export default FaderDataComp;
