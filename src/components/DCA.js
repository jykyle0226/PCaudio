import React from "react";
import DCADataComp from "./DCADataComp";

const Audio = (props) => {

  return (
    <div>
      <div>
        <DCADataComp Name={props.Name} dB={props.dB} Note={props.Note} />
      </div>
    </div>
  );
};

export default Audio;
