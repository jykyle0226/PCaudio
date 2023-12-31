import React from "react";
import { useEffect, useState } from "react";
import "../Style/AudioComp.css";
const DCADataComp = (props) => {
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
            <div className="testbox">
              <div>
                <div id="db" className="Edittext">
                  <h1 className="ADCname">{props.name}</h1>
                </div>
              </div>
            </div>
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
                      value={props.dB}
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
    </div>
  );
};

export default DCADataComp;
