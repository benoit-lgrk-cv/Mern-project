import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AlertList = () => {
  const [alerts, setAlerts] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/alert/all`
        );
        setAlerts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlerts();
  }, []);
  alerts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div>
      <h2>Les derniers disparus</h2>
      {alerts.map((alert) => (
        <div key={alert._id}>
          <h3>{alert.name}</h3>
          <p>Description : {alert.description}</p>
          {alert.imageUrl && (
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${alert.imageUrl}`}
              alt={alert.name}
              style={{ width: "200px" }}
            />
          )}
          <button onClick={() => navigate(`/comment/${alert._id}`)}>
            Vous l'avez vu ?
          </button>
        </div>
      ))}
    </div>
  );
};

export default AlertList;
