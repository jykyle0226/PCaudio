import React from "react";
import FaderDataComp from "./FaderDataComp";

const Fader = (props) => {
  // console.log("this is Fader", props);

  return (
    <div>
      <div>
        <FaderDataComp name={props.name} dB={props.dB} Note={props.Note} Catagory={props.Catagory} />
      </div>
    </div>
  );
};

export default Fader;
