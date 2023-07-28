import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function API() {
  const CLIENT_ID =
    "fcb67e4fe64a76f345852e960f65b5442a628d19f5bc7e7457aecba021bebe95";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback";
  const CLIENT_SECRET =
    "ddb28c33d638d5368301517741b24857f545bdc02e5af0cc8d9ce2d152c8ef56";
  const [accessToken, setAccessToken] = useState("");
  const [token, setToken] = useState("");
  useEffect(() => {
    (async () => {
      await FetchData();
    })();
  }, []);

  useEffect(() => {
    // Check if the authorization code is available
    if (token) {
      // Fetch the access token when the authorization code is available
      FetchData();
    }
  }, [token]);

  
  useEffect(() => {
    const search = window.location.search;
    let token = window.localStorage.getItem("code");

    if (!token && search) {
      token = search.split("?code=")[1];
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const AUTH_ENDPOINT = `https://api.planningcenteronline.com/oauth/token?grant_type=authorization_code&code=${token}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;

  const logoutRedirect = () => {
    setToken("");
    window.localStorage.removeItem("code");
    window.location.href = "/login";
  };
  const logout = () => {
    setToken("");
    window.localStorage.removeItem(token);
    logoutRedirect();
  };

  const FetchData = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const form = new FormData();
      form.append("grant_type", "authorization_code");
      form.append("code", token);
      form.append("client_id", CLIENT_ID);
      form.append("client_secret", CLIENT_SECRET);
      form.append("redirect_uri", REDIRECT_URI);
      const { data } = await axios.post(
        `https://api.planningcenteronline.com/oauth/token`,
        form
      );
      console.log(data);
      const accessToken = data.access_token;
      console.log(data.access_token);
      setAccessToken(accessToken);
      console.log(accessToken);
    } catch (error) {
      console.error("Error fetching access token:", error);
    }
  };

  localStorage.setItem("AccessToken", accessToken);

  const [plans, setPlans] = useState("");

  const searchPlans = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.planningcenteronline.com/services/v2/service_types/777403/plans",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          order: "-sort_date",
          per_page: "20",
        },
      }
    );
    setPlans(data.data);
    console.log(data.data);
    console.log(accessToken);
  };

  const today = new Date();

  const consoleToday = () => {
    console.log(today);
  };
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
    setInputDates(allDates);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>You are Logged In</h1>
        {!token ? (
          <a
            className="button-68"
            href={`https://api.planningcenteronline.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=people registrations check_ins calendar giving groups services`}
          >
            Login
          </a>
        ) : (
          <button className="button-68" onClick={logout}>
            Logout
          </button>
        )}
        <div>
          <a href="/live">Live Page</a>
        </div>
        <div>
          <a href="/edit">Edit Page</a>
        </div>

      </header>
    </div>
  );
}

export default API;
