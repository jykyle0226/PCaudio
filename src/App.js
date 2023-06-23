import './App.css';
import { Route } from "react-router-dom"
import { useEffect, useState } from "react";
import Home from '../src/pages/Home'
import Edit from '../src/pages/Edit'
import Live from '../src/pages/Live'
import Login from '../src/pages/LogIn'
import Callback from '../src/pages/CallBack'
import { Callbacks } from 'jquery';
import API from './pages/API';


function App() {
  const CLIENT_ID = "fcb67e4fe64a76f345852e960f65b5442a628d19f5bc7e7457aecba021bebe95"
  const redirect = encodeURIComponent('http://localhost:3000/oauth/callback')
  const CLIENT_SECRET = "ddb28c33d638d5368301517741b24857f545bdc02e5af0cc8d9ce2d152c8ef56"
  return (
    <div className='App'>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/edit">
        <Edit />
      </Route>
      <Route exact path="/Live">
        <Live />
      </Route>

      <Route exact path='/login'>
          <Login></Login>
      </Route>
      <Route exact path='/oauth/callback'>
          <API></API>
      </Route>
    </div>
  );
}
export default App;
