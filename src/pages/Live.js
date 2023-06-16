import Fader from "../components/Fader";
import FaderDataComp from "../components/FaderDataComp";

import DCAArr from "../DCAData";
import InstArr from "../InstData";
import SingerArr from "../SingerData";
import StemArr from "../StemData";

import DCA from "../components/DCA";
import "../Style/Fader.css";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const ServiceOptions = ["W&P", "Sunday Service"];
const SongOptions = ["First", "Second", "Third"];
const defaultServiceOption = ServiceOptions[0];
const defaultSongOption = SongOptions[0];

const Live = (props) => {
  const DCAfader = DCAArr.map((ele, index) => {
    return <Fader {...ele} key={index} />;
  });

  const InstFader = InstArr.map((ele, index) => {
    return <Fader {...ele} key={index} />;
  });

  const SingerFader = SingerArr.map((ele, index) => {
    return <Fader {...ele} key={index} />;
  });

  const StemFader = StemArr.map((ele, index) => {
    return <Fader {...ele} key={index} />;
  });

  return (
    <div>
      <div className="nav">
        <a href="/">
          <h1>Home</h1>
        </a>
        <a href="/edit">
          <h1>Edit</h1>
        </a>
      </div>
      <div className="EditNav">
        <h1>Service: </h1>
        <Dropdown
          options={ServiceOptions}
          onChange={ServiceOptions._onSelect}
          value={defaultServiceOption}
          placeholder="Select an option"
        ></Dropdown>
        <h1>Song Name: </h1>
        <Dropdown
          options={SongOptions}
          onChange={SongOptions._onSelect}
          value={defaultSongOption}
          placeholder="Select an option"
        ></Dropdown>
      </div>

      <div className="FaderDiv">
        <div>
          <div className="Upper">
            <div className="DCAfader">
              <div>
                <div>
                  <h1>DCA</h1>
                </div>
                <div id="DCAfader">{DCAfader}</div>
              </div>
              <div className="Stemfader">
                <div>
                  <div>
                    <h1>Stem</h1>
                  </div>
                  <div id="Stemfader">{StemFader}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Lower">
            <div className="Singerfader">
              <div>
                <div>
                  <h1>Singers</h1>
                </div>
                <div id="Singerfader">{SingerFader}</div>
              </div>

              <div className="Instfader">
                <div>
                  <div>
                    <h1>Inst</h1>
                  </div>
                  <div id="Instfader">{InstFader}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Live;
