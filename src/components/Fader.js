import React from "react";
import FaderDataComp from "./FaderDataComp";

const Fader = (props) => {
  console.log("this is Fader", props);

  return (
    <div>
      <div>
        <FaderDataComp Name={props.Name} dB={props.dB} Note={props.Note} />
      </div>
    </div>
  );
};

export default Fader;
