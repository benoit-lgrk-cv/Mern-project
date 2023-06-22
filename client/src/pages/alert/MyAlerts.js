import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const MyAlerts = () => {
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/alert/${userId}`);
        setAlerts(response.data);
      } catch (error) {
        console.error(`Une erreur s'est produite lors de la récupération des alertes:`, error);
      }
    };

    fetchAlerts();
  }, [userId]);

  alerts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const handleUpdateAlert = (alertId) => {
    navigate(`/update/${alertId}`); // Rediriger vers la page de mise à jour avec l'ID de l'alerte
  };

  const handleDeleteAlert = async (alertId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/alert/${alertId}`);
      // Effectuez une nouvelle requête pour obtenir les alertes mises à jour après la suppression
      window.location.href = '/'
    } catch (error) {
      console.error(`Une erreur s'est produite lors de la suppression de l'alerte:`, error);
    }
  };
  

  return (
    <div>
        <Navbar/>
      <h1>Mes Alertes</h1>
      {alerts.map(alert => (
        <div key={alert._id}>
          <h2>{alert.name}</h2>
          <p>Espèce: {alert.species}</p>
          <p>Description: {alert.description}</p>
          <p>Lieu: {alert.location}</p>
          {alert.imageUrl && (
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${alert.imageUrl}`}
              alt={alert.name}
              style={{ width: "200px" }}
            />
            
          )}
          <button onClick={() => handleDeleteAlert(alert._id)}>Supprimer</button>
           <button onClick={() => handleUpdateAlert(alert._id)}>Modifier</button>
        </div>
      ))}
    </div>
  );
};

export default MyAlerts;
