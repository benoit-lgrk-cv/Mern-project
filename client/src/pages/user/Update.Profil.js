import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const UpdateProfil = () => {
  const { _id } = useParams();
  console.log(_id);
  const [pseudo, setPseudo] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [dataImage, setImage] = useState(null);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("pseudo", pseudo);
    data.append("phoneNumber", phoneNumber);
    data.append("address", address);
    data.append("imageProfile", dataImage);

    const authToken = localStorage.getItem("authToken");

    axios
      .put(`${process.env.REACT_APP_API_URL}/updateprofile/${_id}`, data, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => {
        console.log("Profil mis à jour avec succès");
        navigate(`/profile/${_id}`);
        // Gérez la réponse de votre backend ici si nécessaire
      })
      .catch((error) => {
        console.error(error.data);
        // Gérez les erreurs ici si nécessaire
      });
  };

  return (
    <div>
      <Navbar/>
      <h1>Mettre à jour le profil</h1>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div>
          <label>Photo de profil:</label>
          <input
            type="file"
            name="imageProfile"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="pseudo">Pseudo:</label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>
        <div>
          <label>Numéro de téléphone:</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Adresse postale:</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default UpdateProfil;
