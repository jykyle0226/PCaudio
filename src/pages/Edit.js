import DCA from "../components/DCA";
import DCADataComp from "../components/DCADataComp";
import DCAArr from "../DCAData";
import InstArr from "../InstData";
import axios from "axios";
import SingerArr from "../SingerData";
import StemArr from "../StemData";
import "../Style/AudioComp.css";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import styled from "styled-components";
import moment from 'moment';

import { useState, useEffect } from "react";

const Edit = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSongOpen, setSongIsOpen] = useState(false);
  const Servicetoggling = () => setIsOpen(!isOpen);
  const Songtoggling = () => setSongIsOpen(!isSongOpen);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSongOption, setSelectedSongOption] = useState(null);


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


  const [test1, setTest1] = useState()
  const [test, setTest] = useState()
  const [test3, setTest3] = useState()
  const testing = () => {
    console.log(selectedSongs)
    console.log(test)
    console.log(test1)
    console.log(inputDates[7])
    console.log(id)
    if (test === inputDates[7]){
      console.log(true)
    } else {
      console.log(false)
    }
  }

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
    setTest3(songsData)
    const serviceOrders = [];
    songsData.forEach((songTitle) => {
      const songAttributes = songTitle.attributes.title;
      serviceOrders.push(songAttributes);
    }, setSongs(serviceOrders));
    console.log(songs);
    const selectedSongs = songs.slice(3, 6)
    console.log(selectedSongs)
    setSelectedSongs(selectedSongs)
    console.log(selectedSongs)
  };

  const [ selectedSongs, setSelectedSongs ] = useState("")
  const onOptionClicked = (value) => () => {
    const dateStr = value
    const formattedDate = moment.utc(dateStr).format('MMMM D, YYYY');

  

    setTest1(value)
    setTest(formattedDate)
    setSelectedOption(value);
    setIsOpen(false);
    plans.forEach((plan) => {
      if (formattedDate === plan.attributes.dates) {
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
  const [ reformed, setReformed] = useState("")
  const changeDateFormat = () => {
    const arrOfDates = []
    inputDates.forEach((services) => {
      const dateStr = services
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      console.log(formattedDate)
      arrOfDates.push(formattedDate)
    })
    console.log(arrOfDates)
    setReformed(arrOfDates)
    console.log(reformed)
    const getClosestDates = () => {
      const today = new Date();
      const upcomingDates = reformed.filter(date => new Date(date) >= today);
      const sortedDates = upcomingDates.sort((a, b) => new Date(a) - new Date(b));
      return sortedDates.slice(0, 3);
    };

    const closestService = getClosestDates();
    console.log(closestService)
    setClosestDates(closestService)
  }



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
          per_page: "20",
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
                    {closestDates.map((option) => (
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
                    {selectedSongs.map((song) => (
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
      <div>
        <button onClick={checkToken}>button 1</button>
        <button onClick={searchPlans}>button 2</button>
        <button onClick={renderServices}>button3</button>
        <button onClick={changeDateFormat}>button 4</button>
        <button onClick={testing}>button 5</button>
      </div>
    </div>
  );
};
export default Edit;
