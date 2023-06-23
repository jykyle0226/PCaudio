import React, { Component } from "react";
import { OauthReceiver } from "react-oauth-flow";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

const CLIENT_ID =
"fcb67e4fe64a76f345852e960f65b5442a628d19f5bc7e7457aecba021bebe95";
const CLIENT_SECRET =
"ddb28c33d638d5368301517741b24857f545bdc02e5af0cc8d9ce2d152c8ef56";
const code = "";
const redirect = "http://localhost:3000/oauth/callback";


export default class ReceiveFromDropbox extends Component {
  handleSuccess = async (accessToken, { response, state }) => {
    console.log("Successfully authorized");
    // await setProfileFromDropbox(accessToken);
    // await redirect(state.from);
  };

  handleError = (error) => {
    console.error("An error occurred");
    console.error(error.message);
  };

  render() {
    console.log(code)
    return (
      
      <OauthReceiver
        tokenUrl={`https://api.planningcenteronline.com/oauth/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`}
        clientId={CLIENT_ID}
        clientSecret={CLIENT_SECRET}
        redirectUri="http://localhost:3000/oauth/callback"
        onAuthSuccess={this.handleSuccess}
        onAuthError={this.handleError}
        render={({ processing, state, error }) => (

          
          <div>
            <div>
            
            {processing && <p>Authorizing now...</p>}
            {error && (
              <p className="error">An error occurred: {error.message}</p>
            )}
          </div>
          </div>

        )}
        
      />
      
    );
  }
}
