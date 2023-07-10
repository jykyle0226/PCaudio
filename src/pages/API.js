import { useEffect, useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function API() {
  const CLIENT_ID =
    "fcb67e4fe64a76f345852e960f65b5442a628d19f5bc7e7457aecba021bebe95";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback";
  const CLIENT_SECRET =
    "ddb28c33d638d5368301517741b24857f545bdc02e5af0cc8d9ce2d152c8ef56";

  const [token, setToken] = useState("");

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
    window.location.href = "/login";
  };
  const logout = () => {
    setToken("");
    window.localStorage.removeItem(token);
    logoutRedirect();
  };

  const FetchData = async (e) => {
    e.preventDefault();
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
  };

  const [plans, setPlans] = useState("");

  const searchPlans = async (e) => {
    e.preventDefault();
    const { data } = await axios.get(
      "https://api.planningcenteronline.com/services/v2/service_types/777403/plans",
      {
        headers: {
          Authorization: `Bearer ${data.access_token}`,
        },
      }
    );
    console.log(data);
    setPlans(data.plans.item);
  };

  const renderServices = () => {
    return plans.map((plan) => (
      <div key={plan.id}>
        {plan.name}
        <div>
          <p>Services</p>
        </div>
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Logged In</h1>
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
          <div>
            <div>Product:</div>
            <button onClick={FetchData}> button </button>
          </div>
        </div>
        {token ? (
          <form onSubmit={searchPlans}>
            <input
              className="input"
              type="text"
              onChange={(e) => setPlans(e.target.value)}
            />
            <button className="button-68" type={"submit"}>
              Search
            </button>
          </form>
        ) : (
          <h2>Please login</h2>
        )}

        {/* {renderServices()} */}
      </header>
    </div>
  );
}

export default API;
