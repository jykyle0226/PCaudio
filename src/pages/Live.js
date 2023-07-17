import Fader from "../components/Fader";
import FaderDataComp from "../components/FaderDataComp";
import styled from "styled-components";
import { useState } from "react";
import DCAArr from "../DCAData";
import axios from "axios";
import InstArr from "../InstData";
import SingerArr from "../SingerData";
import StemArr from "../StemData";
import API from "../pages/API";
import DCA from "../components/DCA";
import "../Style/Fader.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "../Style/style.css";
import { useEffect } from "react";
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
  text-transform: uppercase;
  
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
  text-transform: uppercase;
  transition: all 0.4s;
  margin-bottom: 0.8em;

  &:hover {
    background: #d4af37;
    transition: all 0.4s;
    color: #28282d;
    transition: all 0.4s;
  }
`;

const Live = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSongOpen, setSongIsOpen] = useState(false);
  const Servicetoggling = () => setIsOpen(!isOpen);
  const Songtoggling = () => setSongIsOpen(!isSongOpen);
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

  const [id, setId] = useState("");
  const [songs, setSongs] = useState("");
  const findSongs = async (e) => {
    const { data } = await axios.get(
      `https://api.planningcenteronline.com/services/v2/service_types/777403/plans/${id}/items`,
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
      }
    );
    const songsData = data.data;
    const serviceOrders = [];
    songsData.forEach((songTitle) => {
      const songAttributes = songTitle.attributes.title;
      serviceOrders.push(songAttributes);
    }, setSongs(serviceOrders));
    console.log(songs);
  };

  //     var valuesArr = ["v1","v2","v3","v4","v5"],
  //     removeValFromIndex = [0,2,4];

  // for (var i = removeValFromIndex.length -1; i >= 0; i--)
  //    valuesArr.splice(removeValFromIndex[i],1);
  //   function GFG_Fun() {
  //     const indexes = [0, 1];

  //     arr = arr.filter((value, index) => !indexes.includes(index));

  //     console.log(arr);
  // }

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    setIsOpen(false);
    plans.forEach((plan) => {
      if (value === plan.attributes.dates) {
        setId(plan.id);
        console.log(id);
        findSongs();
      }
    });
  };

  const onSongOptionClicked = (value) => () => {
    console.log("yay");
  };

  const AccessToken = localStorage.getItem("AccessToken");

  const checkToken = () => {
    console.log(AccessToken);
  };

  const [plans, setPlans] = useState("");
  const [inputDates, setInputDates] = useState([]);
  const [closestDates, setClosestDates] = useState([]);

  const renderServices = () => {
    if (!Array.isArray(plans)) {
      console.error("plans is not an array");
      return;
    }
    const allDates = [];
    plans.forEach((plan) => {
      const dateList = plan.attributes.dates;
      allDates.push(dateList);
    });
    console.log(plans);
    setInputDates(allDates);
  };

  useEffect(() => {
    console.log(inputDates);
  }, [inputDates]);

  const searchPlans = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.planningcenteronline.com/services/v2/service_types/777403/plans",
      {
        headers: {
          Authorization: `Bearer ${AccessToken}`,
        },
        params: {
          order: "-sort_date",
          per_page: "10",
        },
      }
    );
    setPlans(data.data);
    console.log(data.data);
    console.log(AccessToken);
  };

  const options = ServiceOptions;
  const Songoptions = SongOptions;
  return (
    <div className="background">
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
              <a className="link" href="/edit">
                Edit
              </a>
            </div>
          </button>
        </div>
        <div className="servicebtn">
          <button type="button" class="btn cube cube-hover">
            <DropdownTop class="bg-top">
              <DropdownInner class="bg-inner"></DropdownInner>
            </DropdownTop>
            <DropdownRight class="bg-right">
              <DropdownInner class="bg-inner"></DropdownInner>
            </DropdownRight>
            <DropdownBg class="bg">
              <DropdownInner class="bg-inner"></DropdownInner>
            </DropdownBg>
            <DropDownContainer div class="text">
              <DropDownHeader onClick={Servicetoggling}>
                {" "}
                {selectedOption || "Service"}
              </DropDownHeader>{" "}
              {isOpen && (
                <DropDownListContainer>
                  <DropDownList>
                    {inputDates.map((option) => (
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
                    {songs.map((song) => (
                      <ListItem
                        onClick={onSongOptionClicked(song)}
                        key={Math.random()}
                      >
                        {song}
                      </ListItem>
                    ))}
                  </DropDownList>
                </DropDownListContainer>
              )}
            </DropDownContainer>
          </button>
        </div>
      </div>
      <div className="EditNav"></div>

      <div className="FaderDiv">
        <div>
          <div className="Upper">
            <div className="DCAfader">
              <div className="container">
                <div className="headScreen">
                  <h1 id="font">DCA</h1>
                </div>
                <div id="DCAfader">{DCAfader}</div>
              </div>
              <div className="Stemfader">
                <div className="container">
                  <div className="headScreen">
                    <h1 id="font">Stem</h1>
                  </div>
                  <div id="Stemfader">{StemFader}</div>
                </div>
              </div>
              <div className="Singerfader">
                <div className="container">
                  <div className="headScreen">
                    <h1 id="font">Singers</h1>
                  </div>
                  <div id="Singerfader">{SingerFader}</div>
                </div>

                <div className="Instfader">
                  <div className="container">
                    <div className="headScreen">
                      <h1 id="font">Instrumentals</h1>
                    </div>
                    <div id="Instfader">{InstFader}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="Lower"></div>
        </div>
      </div>
      <div>
        <button onClick={checkToken}>button 1</button>
        <button onClick={searchPlans}>button 2</button>
        <button onClick={renderServices}>button 3</button>
      </div>
    </div>
  );
};
export default Live;
