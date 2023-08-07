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
import moment from "moment";

import { useState, useEffect } from "react";
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

  const [songId, setSongId] = useState("");
  const [songData, setSongData] = useState("");
  const findSongs = async (e) => {
    try {
      const { data } = await axios.get(
        `https://api.planningcenteronline.com/services/v2/service_types/777403/plans/${planId}/items`,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      );
      console.log(planId);
      const itemData = data.data;
      const songData = itemData.slice(3, 6);
      setSongData(songData);
      const itemTitles = [];
      const itemIds = [];
      itemData.forEach((item) => {
        const itemTitle = item.attributes.title;
        const itemId = item.id;
        itemTitles.push(itemTitle);
        itemIds.push(itemId);
      });
      const songIds = itemIds.slice(3, 6);
      setSongId(songIds);
      const songTitles = itemTitles.slice(3, 6);
      setSongs(songTitles);
    } catch (error) {
      if (error.response) {
        console.error(
          "Request failed with status code:",
          error.response.status
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Error occurred:", error.message);
      }
    }
  };

  const [planId, setPlanId] = useState("");
  const [songs, setSongs] = useState("");

  const onOptionClicked = (dateStr) => () => {
    const formattedDate = moment.utc(dateStr).format("MMMM D, YYYY");

    setSelectedOption(dateStr);
    setIsOpen(false);
    const selectedPlan = plans.find(
      (plan) => formattedDate === plan.attributes.dates
    );
    setPlanId(selectedPlan.id);
    console.log()
  };

  const [leadSingers, setleadSingers] = useState([]);

  const findLeadSingers = async (e) => {
    try {
      const { data } = await axios.get(
        `https://api.planningcenteronline.com/services/v2/service_types/777403/plans/${planId}/items`,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      );

      const itemData = data.data;
      const itemDescriptions = [];

      itemData.forEach((item) => {
        const itemDescription = item.attributes.description;
        itemDescriptions.push(itemDescription);
        console.log(itemDescriptions);
      });

      const bySingers = itemDescriptions.slice(3, 6);

      const leadSingersData = [];
      bySingers.forEach((bySinger) => {
        const singer = bySinger.replace("By ", "");
        console.log(singer);
        leadSingersData.push(singer);
        window.localStorage.setItem("leadVocal", JSON.stringify(leadSingersData));
      });

      setleadSingers(leadSingersData);
      
    } catch (error) {
      console.error("Error fetching singers:", error);
    }
  };
  const [vocals, setVocals] = useState([]);
  const findAllSingers = async (e) => {
    try {
      const { data } = await axios.get(
        `  https://api.planningcenteronline.com/services/v2/service_types/777403/plans/${planId}/team_members`,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      );

      const allTeamMembers = data.data;
      allTeamMembers.forEach((teamMembers) => {
        const Allvocals = allTeamMembers
          .filter(
            (teamMember) =>
              teamMember.attributes.status === "C" &&
              (teamMember.attributes.team_position_name === "Soprano" ||
                teamMember.attributes.team_position_name === "Alto" ||
                teamMember.attributes.team_position_name === "Tenor")
          )
          .map((teamMember) => teamMember.attributes.name);
            window.localStorage.setItem('Allvocals', Allvocals)
        console.log(Allvocals);
      });
    } catch (error) {
      console.error("Error fetching singers:", error);
    }
  };

  const getDbMemo = async (e) => {
    console.log(theSongId);
    try {
      const { data } = await axios.get(
        `https://api.planningcenteronline.com/services/v2/service_types/777403/plans/${planId}/items/${theSongId}/item_notes`,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      );

      const songDetails = data.data;
      const vocalsItem = songDetails.find(
        (item) => item.attributes.category_name === "Vocals"
      );
      const vocalItemContent = vocalsItem.attributes.content;
      console.log(vocalItemContent);

      if (vocalsItem) {
        console.log("Vocals item:", vocalsItem);
      } else {
        console.log("No vocals item found.");
      }

      const names = vocalItemContent
        .match(/{(.*?):/g)
        .map((match) => match.slice(1, -1));
      const dBValues = vocalItemContent
        .match(/:(.*?)}/g)
        .map((match) => match.slice(1, -1));
      window.localStorage.setItem("singerNames", JSON.stringify(names));
      window.localStorage.setItem("dBValues", JSON.stringify(dBValues));

      console.log("Names:", names);
      console.log("dB Values:", dBValues);
    } catch (error) {
      console.error("Error fetching singers:", error);
    }
  };
  const [theSongId, setTheSongId] = useState("");

  const onSongOptionClicked = (value) => () => {
    songData.forEach((data) => {
      if (data.attributes.title === value) {
        console.log(value);
        const theSongId = data.id;
        console.log(theSongId);
        setTheSongId(theSongId);
      }
    });
    getDbMemo();
  };

  useEffect(() => {
    if (theSongId) {
      getDbMemo();
    }
  }, [theSongId]);

  const AccessToken = localStorage.getItem("AccessToken");

  const checkToken = () => {
    console.log(AccessToken);
  };

  const [plans, setPlans] = useState("");
  const [planDates, setPlanDates] = useState([]);
  const [closestDates, setClosestDates] = useState([]);

  const getDatesFromPlans = async () => {
    try {
      if (!Array.isArray(plans)) {
        console.error("plans is not an array");
        return;
      }

      const allDates = [];
      for (const plan of plans) {
        const date = plan.attributes.dates;
        allDates.push(changeDateFormat(date));
      }

      setPlanDates(allDates);
      console.log(planDates);
    } catch (error) {
      console.error("Error rendering services:", error);
    }
  };

  useEffect(() => {
    (async () => {
      checkToken();
      searchPlans();
    })();
  }, []);

  useEffect(() => {
    if (plans) {
      getDatesFromPlans();
    }
  }, [plans]);

  useEffect(() => {
    if (planDates) {
      getClosestDates();
    }
  }, [planDates]);

  useEffect(() => {
    if (planId) {
      findSongs();
    }
  }, [planId]);

  const changeDateFormat = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getTeamMemberList = async (e) => {
    try {
      const { data } = await axios.get(
        `https://api.planningcenteronline.com/services/v2/service_types/777403/teams/2947875/people`,
        {
          headers: {
            Authorization: `Bearer ${AccessToken}`,
          },
        }
      );
      const teamData = data.data;
      const FullName = [];
      console.log(teamData);
      teamData.forEach((teamMember) => {
        const membersFullName = teamMember.attributes.first_name;
        console.log(membersFullName);
      });
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };
  const getClosestDates = async () => {
    const today = new Date();
    const upcomingDates = planDates.filter((date) => new Date(date) >= today);
    const sortedDates = upcomingDates.sort((a, b) => new Date(a) - new Date(b));
    const closestService = sortedDates.slice(0, 3);
    console.log(closestService);
    setClosestDates(closestService);
  };

  const searchPlans = async (e) => {
    try {
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
      console.log("live");
      setPlans(data.data);
      console.log(plans);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

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
        <button onClick={findLeadSingers}>button</button>
        <button onClick={getTeamMemberList}> button2</button>
        <button onClick={findAllSingers}>button3</button>
        <button onClick={getDbMemo}>button4</button>
      </section>
    </div>
  );
};
export default Edit;
