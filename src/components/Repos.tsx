import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './../styles/Repos.css';

interface Repo {
  id: number;
  name: string;
  full_name: string;
}

const Repos: React.FC = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRepos = async () => {
      const token = localStorage.getItem('github_token');
      if (!token) {
        console.error('No access token found');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRepos(response.data);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Failed to fetch repositories', error.response?.data || error.message);
          setError('Failed to fetch repositories');
        } else {
          console.error('Unexpected error', error);
          setError('Unexpected error occurred');
        }
        setLoading(false);
      }
    };

    fetchRepos();
  }, [navigate]);

  const deleteRepo = async (fullName: string) => {
    const token = localStorage.getItem('github_token');
    if (!token) {
      console.error('No access token found');
      navigate('/');
      return;
    }

    try {
      await axios.delete(`https://api.github.com/repos/${fullName}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRepos(repos.filter((repo) => repo.full_name !== fullName));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Failed to delete repository', error.response?.data || error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  const filteredRepos = repos.filter(repo =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="repos-container">
      <h1>Your Repositories</h1>
      <input
        type="text"
        placeholder="Search Repositories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <ul>
        {filteredRepos.map((repo) => (
          <li className="repo-item" key={repo.id}>
            {repo.name}{' '}
            <button className="delete-button" onClick={() => deleteRepo(repo.full_name)}>Delete Permanently</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Repos;
