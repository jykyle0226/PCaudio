import DCA from "../components/DCA";
import DCADataComp from "../components/DCADataComp";
import DCAArr from "../DCAData";
import InstArr from "../InstData";
import SingerArr from "../SingerData";
import StemArr from "../StemData";
import "../Style/AudioComp.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

const Edit = (props) => {
  const DCAdata = DCAArr.map((ele, index) => {
    return <DCA {...ele} key={index} />;
  });

  const Instdata = InstArr.map((ele, index) => {
    return <DCA {...ele} key={index} />;
  });

  const Singerdata = SingerArr.map((ele, index) => {
    return <DCA {...ele} key={index} />;
  });

  const Stemdata = StemArr.map((ele, index) => {
    return <DCA {...ele} key={index} />;
  });

  const ServiceOptions = ["W&P", "Sunday Service"];
  const SongOptions = ["First", "Second", "Third"];
  const defaultServiceOption = ServiceOptions[0];
  const defaultSongOption = SongOptions[0];

  return (
    <div>
      <div className="nav">
        <a href="/">
          <h1>Home</h1>
        </a>
        <a href="/live">
          <h1>Live</h1>
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
      <section className="Data">
        <div className="DataLeft">
          <div className="DCAdata">
            <h1>DCA</h1>
            {DCAdata}
          </div>
          <div className="Singerdata">
            <h1>Singers</h1>
            {Singerdata}
          </div>
        </div>
        <div className="DataRight">
          <div className="Stemdata">
            <h1>STEM</h1> {Stemdata}
          </div>
          <div className="Instdata">
            <h1>Instruments</h1> {Instdata}
          </div>
        </div>
      </section>
    </div>
  );
};
export default Edit;
