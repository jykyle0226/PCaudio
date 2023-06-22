import Fader from "../components/Fader";
import FaderDataComp from "../components/FaderDataComp";
import styled from "styled-components";
import { useState } from "react";
import DCAArr from "../DCAData";
import InstArr from "../InstData";
import SingerArr from "../SingerData";
import StemArr from "../StemData";

import DCA from "../components/DCA";
import "../Style/Fader.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../Style/style.css";

const ServiceOptions = ["W&P", "Sunday Service"];
const SongOptions = ["First", "Second", "Third"];
const defaultServiceOption = ServiceOptions[0];
const defaultSongOption = SongOptions[0];

const DropDownContainer = styled("div")`
  width: 10.5em;
  margin: 0 auto;
`;

const DropDownHeader = styled("div")`
  margin-bottom: 0.8em;
  padding: 0.4em 2em 0.4em 1em;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1.3rem;
  color: #3faffa;
  background: #ffffff;
`;

const DropDownListContainer = styled("div")``;

const DropDownList = styled("ul")`
  padding: 0;
  margin: 0;
  padding-left: 1em;
  background: #ffffff;
  border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 1.3rem;
  font-weight: 500;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled("li")`
  list-style: none;
  margin-bottom: 0.8em;
`;

const Live = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggling = () => setIsOpen(!isOpen);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSongOption, setSelectedSongOption] = useState(null);

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
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const onSongOptionClicked = (value) => () => {
    setSelectedSongOption(value);
    setIsOpen(false);
  };

  const options = ServiceOptions;
  const Songoptions = SongOptions;
  return (
    <div className="background">
      <div className="nav">
        <button type="button" class="btn cube cube-hover">
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div class="bg-inner"></div>
          </div>
          <div class="text">
            <a className="link" href="/">
              Home
            </a>
          </div>
        </button>
        <button type="button" class="btn cube cube-hover">
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div class="bg-inner"></div>
          </div>
          <div class="text">
            <a className="link" href="/edit">
              Edit
            </a>
          </div>
        </button>
      </div>
      <div className="EditNav">
        <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {" "}
            {selectedOption || "Service"}
          </DropDownHeader>{" "}
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {options.map((option) => (
                  <ListItem
                    onClick={onOptionClicked(option)}
                    key={Math.random()}
                  >
                    {option}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
        <DropDownContainer>
          <DropDownHeader onClick={toggling}>
            {" "}
            {selectedSongOption || "Song Option"}
          </DropDownHeader>{" "}
          {isOpen && (
            <DropDownListContainer>
              <DropDownList>
                {Songoptions.map((songOption) => (
                  <ListItem
                    onClick={onSongOptionClicked(songOption)}
                    key={Math.random()}
                  >
                    {songOption}
                  </ListItem>
                ))}
              </DropDownList>
            </DropDownListContainer>
          )}
        </DropDownContainer>
      </div>

      <div className="FaderDiv">
        <div>
          <div className="Upper">
            <div className="DCAfader">
              <div className="container" >
                <div >
                  <h1 id="font">DCA</h1>
                </div>
                <div id="DCAfader">{DCAfader}</div>
              </div>
              <div className="Stemfader">
                <div className="container">
                  <div>
                    <h1 id="font">Stem</h1>
                  </div>
                  <div id="Stemfader">{StemFader}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="Lower">
            <div className="Singerfader">
              <div  className="container">
                <div>
                  <h1 id="font">Singers</h1>
                </div>
                <div id="Singerfader">{SingerFader}</div>
              </div>

              <div className="Instfader">
                <div  className="container">
                  <div>
                    <h1 id="font">Instrumentals</h1>
                  </div>
                  <div id="Instfader">{InstFader}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};
export default Live;
