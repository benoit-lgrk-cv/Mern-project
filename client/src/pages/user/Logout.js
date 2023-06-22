import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const logoutUser = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Récupération du token depuis le stockage local
        await axios.post(
          `${process.env.REACT_APP_API_URL}/logout`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem('authToken'); // Suppression du token du stockage local
        localStorage.removeItem('userId'); // Suppression du token du stockage local
        navigate('/'); // Redirection vers la page principale
      } catch (error) {
        console.log(error);
      }
    };

    logoutUser();
  }, [navigate]);

  return <div>
    <Navbar/>
    <h3>Vous êtes déconnecté...</h3></div>;
};

export default Logout;
