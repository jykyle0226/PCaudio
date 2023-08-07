import React from "react";
import { useEffect, useState } from "react";
import "../Style/AudioComp.css";
const DCADataComp = () => {
  const [leadVocals, setLeadVocals] = useState([]);
  const [AllVocals, setAllVocals] = useState([]);
  const [dBs, setDBs] = useState([]);
  const [name, setName] = useState([]);
  const [dB, setDB] = useState([]);

  useEffect(() => {
    const storedNames = JSON.parse(window.localStorage.getItem("singerNames"));
    const storedDBs = JSON.parse(window.localStorage.getItem("dBValues"));
    const LeadVocals = JSON.parse(window.localStorage.getItem("leadVocal"));
    const Allvocals = JSON.parse(window.localStorage.getItem("Allvocals"));
    if (leadVocals && Allvocals) {
      setLeadVocals(LeadVocals);
      setAllVocals(Allvocals);
    }
  }, []);

  return (
    <div className="AudioDataComp">
      <div id="AudioDataCompDiv" type="button" class="btn cube cube-hover">
        <div class="bg-top">
          <div class="bg-inner"></div>
        </div>
        <div class="bg-right">
          <div class="bg-inner"></div>
        </div>
        <div class="bg">
          <div id="this" class="bg-inner"></div>
        </div>
        <div className="testbox">
          <div>
            {names.map((name, index) => (
              <div key={index} className="testbox">
                <div>
                  <div id="db" className="Edittext">
                    <h1 className="ADCname">{name}</h1>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="thebox">
        <div type="button" class="btn cube cube-hover">
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div class="bg-inner"></div>
          </div>
          <div className="test">
            <div>
              <div className="Edittext" id="db">
                <div className="dBBoxL">
                  <div className="Edittext">
                    <input
                      id="edit-db"
                      className="ADCdb"
                      type="text"
                      value={dB}
                    />
                  </div>
                </div>
                <div className="dBBoxR">
                  <h1>dB</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div type="button" class="btn cube cube-hover">
        <div class="bg-top">
          <div class="bg-inner"></div>
        </div>
        <div class="bg-right">
          <div class="bg-inner"></div>
        </div>
        <div class="bg">
          <div class="bg-inner"></div>
        </div>
        <div className="test">
          <div>
            <div id="db" className="Edittext">
              <h1 className="ADCnote">{}</h1>
            </div>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default DCADataComp;
