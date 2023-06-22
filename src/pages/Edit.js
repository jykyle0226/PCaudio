import DCA from "../components/DCA";
import DCADataComp from "../components/DCADataComp";
import DCAArr from "../DCAData";
import InstArr from "../InstData";
import SingerArr from "../SingerData";
import StemArr from "../StemData";
import "../Style/AudioComp.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styled from "styled-components";

import { useState } from "react";

const Edit = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSongOpen, setSongIsOpen] = useState(false);
  const Servicetoggling = () => setIsOpen(!isOpen);
  const Songtoggling = () => setSongIsOpen(!isSongOpen);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSongOption, setSelectedSongOption] = useState(null);
  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const onSongOptionClicked = (value) => () => {
    setSelectedSongOption(value);
    setSongIsOpen(false);
  };


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

  const DropdownTop = styled("div")`
    position: absolute;
    height: 10px;
    background: #d4af37;
    bottom: 100%;
    left: 5px;
    right: -5px;
    transform: skew(-45deg, 0);
    margin: 0;
    transition: all 0.4s;
  `;
  const DropdownRight = styled("div")`
    position: absolute;
    left: 0;
    background: #d4af37;
    top: -5px;
    z-index: 0;
    bottom: 5px;
    width: 10px;
    left: 100%;
    transform: skew(0, -45deg);
    transition: all 0.4s;
    border-bottom: 2px solid;
  `;
  const DropdownBg = styled("div")`
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    right: 0;
    background: #d4af37;
    transition: all 0.4s;
    border-bottom: 2px solid;
  `;
  const DropdownInner = styled("div")`
    background: #28282d;
    position: absolute;
    left: 2px;
    right: 2px;
    top: 2px;
    bottom: 2px;
    bottom: 0;
    left: 0;
  `;

  const DropDownContainer = styled("div")`
  width: 100px;
  height: 20px
  margin: 0 auto;
`;

  const DropDownHeader = styled("div")`
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
    font-family: monospace;
    font-size: 17px;
    color: #d4af37;
    background: #28282d;
    position: relative;
    transition: all 0.4s;
  `;

  const DropDownListContainer = styled("div")``;

  const DropDownList = styled("ul")`
    padding: 0;
    margin: 0;
    background: #28282d;
    border: 2px solid #d4af37;
    box-sizing: border-box;
    color: #d4af37;
    font-size: 1.3rem;
    &:first-child {
      padding-top: 0.8em;
    }
  `;

  const ListItem = styled("li")`
    list-style: none;
    position: relative;
    transition: all 0.4s;
    margin-bottom: 0.8em;
    &:hover {
      background: #d4af37;
      transition: all 0.4s;
      color: #28282d;
    }
  `;
  const options = ServiceOptions;
  const Songoptions = SongOptions;

  return (
    <div>
      <div className="nav">
        <div className="homebtn">
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
        </div>
        <div className="editbtn">
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
              <a className="link" href="/Live">
                Live
              </a>
            </div>
          </button>
        </div>
        <div className="servicebtn">
          <button type="button" class="btn cube cube-hover">
            <DropdownTop>
              <DropdownInner></DropdownInner>
            </DropdownTop>
            <DropdownRight>
              <DropdownInner></DropdownInner>
            </DropdownRight>
            <DropdownBg>
              <DropdownInner></DropdownInner>
            </DropdownBg>
            <DropDownContainer div class="text" >
              <DropDownHeader onClick={Servicetoggling}>
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
          </button>
        </div>
        <div className="songoptionbtn">
          <button type="button" class="btn cube cube-hover">
            <DropdownTop>
              <DropdownInner></DropdownInner>
            </DropdownTop>
            <DropdownRight>
              <DropdownInner></DropdownInner>
            </DropdownRight>
            <DropdownBg>
              <DropdownInner></DropdownInner>
            </DropdownBg>
            <DropDownContainer>
              <DropDownHeader onClick={Songtoggling}>
                {" "}
                {selectedSongOption || "Song"}
              </DropDownHeader>{" "}
              {isSongOpen && (
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
          </button>
        </div>
      </div>
      <section className="Data">
        <div className="UpperAndLower">
        <div className="Upper">
        <div type="button" class="btn cube1">
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
            <div id="db">
              <h1 className="ADCnote">DCA</h1>
            </div>
          </div>
          {DCAdata}
        </div>
        <div type="button" class="btn cube1">
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
            <div id="db">
              <h1 className="ADCnote">STEM</h1>
            </div>
          </div>
          {Stemdata}
        </div>
        </div>
        <div className="Lower">
        <div type="button" class="btn cube1 ">
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
            <div id="db">
              <h1 className="ADCnote">Instrumentals</h1>
            </div>
          </div>
          {Instdata}
        </div>

        <div type="button" class="btn cube1">
          <div class="bg-top">
            <div class="bg-inner"></div>
          </div>
          <div class="bg-right">
            <div class="bg-inner"></div>
          </div>
          <div class="bg">
            <div id="this" class="bg-inner"></div>
          </div>
          <div class="text">
            <div id="db">
              <h1 className="ADCnote">Vocals</h1>
            </div>
          </div>
          {Singerdata}
        </div>
        </div>
      
        </div>
        
        
      </section>
    </div>
  );
};
export default Edit;
