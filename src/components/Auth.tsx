import React from 'react';
import './../styles/Auth.styles.css';

const Auth: React.FC = () => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const scopes = 'repo delete_repo'; // Ensure the correct scopes are included

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

  return (
    <div className="auth-container">
    <a className="auth-button" href={githubAuthUrl}>Login with GitHub</a>
  </div>
  );
};

export default Auth;
