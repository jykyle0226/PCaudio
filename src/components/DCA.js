
import React from "react";
import DCADataComp from "./DCADataComp";

const Audio = (props) => {
  console.log("this is Audio", props);

  return (
    <div className="weather">
      <DCADataComp 
      Name={props.Name} 
      dB={props.dB} 
      Note={props.Note} />
    </div>
  );
};

export default Audio;