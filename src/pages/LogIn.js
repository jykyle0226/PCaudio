import { useEffect, useState } from "react";
import axios from "axios";


function API() {
  const CLIENT_ID = "fcb67e4fe64a76f345852e960f65b5442a628d19f5bc7e7457aecba021bebe95";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback";
  const CLIENT_SECRET = "ddb28c33d638d5368301517741b24857f545bdc02e5af0cc8d9ce2d152c8ef56"
  const RESPONSE_TYPE = "token"
  const AUTH_ENDPOINT = `https://api.planningcenteronline.com/oauth/token?grant_type=authorization_code&code=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`



  const [token, setToken] = useState("");

  // const getToken = () => {
  //     let urlParams = new URLSearchParams(window.location.hash.replace("#","?"));
  //     let token = urlParams.get('access_token');
  // }

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    console.log(token)
    // getToken()

    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("code="))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }

    setToken(token);
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("code");
  };

  console.log(token)


  return (
    <div className="App">
      <header className="App-header">
        <h1>API</h1>
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


      </header>
    </div>
  );
}

export default API;
