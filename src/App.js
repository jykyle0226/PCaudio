import './App.css';
import { Route } from "react-router-dom"
import { useEffect, useState } from "react";


function App() {
  const CLIENT_ID = "fcb67e4fe64a76f345852e960f65b5442a628d19f5bc7e7457aecba021bebe95"
  const redirect = encodeURIComponent('http://localhost:3000/oauth/callback')
  const CLIENT_SECRET = "ddb28c33d638d5368301517741b24857f545bdc02e5af0cc8d9ce2d152c8ef56"
  return (
    <div>
      <div>
        <a href={`https://api.planningcenteronline.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirect}&response_type=code&scope=people registrations check_ins calendar giving groups services`}>Login</a>
      </div>
    </div>
  );
}
export default App;
