// Auth.tsx

import React from 'react';
import './../styles/Auth.styles.css';

const Auth: React.FC = () => {
  const clientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URI;
  const scopes = 'repo delete_repo';

  const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}`;

  const handleLogin = () => {
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="auth-container">
      <h1>Welcome to GitHub Repo Manager</h1>
      <p>Manage your GitHub repositories with ease. Sign in with your GitHub account to get started.</p>
      <button onClick={handleLogin} className="login-button">Sign In with GitHub</button>
    </div>
  );
};

export default Auth;
