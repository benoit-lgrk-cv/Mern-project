
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";


const Profile = () => {
  const { _id } = useParams();
  const [user, setUser] = useState(null);
  const storedUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/profile/${_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserProfile();
  }, [_id]);

  const handleDeleteProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${process.env.REACT_APP_API_URL}/profile/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Profil utilisateur</h1>
      {user ? (
        <div>
             {user.imageProfile && (
            <img src={`${process.env.REACT_APP_API_URL}/images/${user.imageProfile}`} alt={user.pseudo} style={{ width: "100px" }} />
          )}
          <p>ID: {user._id}</p>
          <p>Email: {user.email}</p>
          <p>Pseudo: {user.pseudo}</p>
          {/* Affichez d'autres informations du profil de l'utilisateur ici */}
          <NavLink to={`/updateprofile/${storedUserId}`}>
            Mettre à jour le profil
          </NavLink>
          <button onClick={handleDeleteProfile}>Supprimer le profil</button>
        </div>
      ) : (
        <p>Chargement du profil...</p>
      )}
    </div>
  );
};

export default Profile;
