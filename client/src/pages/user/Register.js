import React, { useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";


const Register = () => {
  const [pseudo, setPseudo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    // Créez un objet avec les données du formulaire
    const user = {
      pseudo,
      email,
      password,
    };

    // Effectuez une requête POST vers votre backend pour l'inscription de l'utilisateur
    axios.post(`${process.env.REACT_APP_API_URL}/signup`, user)
      .then((response) => {
        // Gérez la réponse de votre backend ici
        console.log(response.data);
        window.location.href = "/login"
      })
      .catch((error) => {
        // Gérez les erreurs ici
        console.error(error);
      });
  };

  return (
    <div className="register">
      <Navbar/>
      <h1>Inscription</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="pseudo">Pseudo :</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email :</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Register;
