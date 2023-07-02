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
    const { data } = await axios.post(`https://api.planningcenteronline.com/oauth/token`, {
      body: {
        grant_type: "authorization_code",
        code: "CODE_FROM_STEP_2",
        client_id: "CLIENT_ID",
        client_secret: "CLIENT_SECRET",
        redirect_uri: "https://example.com/auth/complete",
      },
    });

    console.log(data);
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
          <div className="card text-center m-3">
            <h5 className="card-header">
              GET Request with Bearer Token Authorization Header
            </h5>
            <div className="card-body">Product name:</div>
            <button onClick={FetchData}> button </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default API;
