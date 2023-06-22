import React, { useState} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';

const UpdateAlert = () => {
  const { id } = useParams();
  console.log(id)
  const [species, setSpecies] = useState("");
  const [tattooNumber, setTattooNumber] = useState("");
  const [dataImage, setImage] = useState(null);
  console.log(dataImage, setImage)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("species", species);
    formData.append("tattooNumber", tattooNumber);
    formData.append("imageUrl", dataImage);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("location", location);


axios
      .put(`${process.env.REACT_APP_API_URL}/alert/update/${ id }`, formData)
      .then((response) => {
        console.log(response.data);
        navigate('/')

      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
 
<div>
      <Navbar/>
      <h1>Créer une alerte</h1>
      <form onSubmit={handleUpdate} encType="multipart/form-data">
        <div>
          <label>Espèce:</label>
          <input
            type="text"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
          />
        </div>
        <div>
          <label>Numéro de tatouage:</label>
          <input
            type="text"
            value={tattooNumber}
            onChange={(e) => setTattooNumber(e.target.value)}
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            type="file"
            name="imageUrl"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label>Nom:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Localisation:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type="submit">Modifier</button>
      </form>
    </div>

  );
};

export default UpdateAlert;

