import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async (code: string | null) => {
      if (!code) {
        console.error('No code found in URL');
        return;
      }

      console.log('Authorization code:', code);

      try {
        const response = await axios.post(
          '/github/login/oauth/access_token',
          {
            client_id: process.env.REACT_APP_GITHUB_CLIENT_ID,
            client_secret: process.env.REACT_APP_GITHUB_CLIENT_SECRET,
            code,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          },
          {
            headers: { Accept: 'application/json' },
          }
        );

        console.log('Response data:', response.data);

        const accessToken = response.data.access_token;
        if (accessToken) {
          localStorage.setItem('github_token', accessToken);
          navigate('/repos');
        } else {
          console.error('Access token not found in response:', response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Axios error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    };

    const code = new URL(window.location.href).searchParams.get('code');
    fetchToken(code);
  }, [navigate]);

  return <div>Loading...</div>;
};

export default Callback;
