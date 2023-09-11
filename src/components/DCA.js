import React from "react";
import DCADataComp from "./DCADataComp";

const DCA = (props) => {
  console.log("DCA", props);
  return (
    <div>
      <div>
        <DCADataComp name={props.name} dB={props.dB} Note={props.Note} />
      </div>
    </div>
  );
};

export default DCA;
