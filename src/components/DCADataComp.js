import React from "react";
import { useEffect, useState } from "react";
import "../Style/AudioComp.css";
const DCADataComp = ({ Name, dB, Note }) => {
  const [val, setVal] = useState(dB);

  return (
    <div className="AudioDataComp">
      <div className="test">
        <h1 className="ADCname">{Name}</h1>
      </div>
      <div id="db">
        <input className="ADCdb" type="text" value={val} />
        <h1>dB</h1>
      </div>

      <h1 className="ADCnote">{Note}</h1>

      <div>
        
      </div>
    </div>

  );
};

export default DCADataComp;
