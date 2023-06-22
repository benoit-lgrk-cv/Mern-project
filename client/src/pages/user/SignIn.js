import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/login`,
        {
          email,
          password,
        }
      );

      const { user, authToken } = response.data; // Récupération de l'utilisateur et du token de la réponse
      console.log(user, authToken);

      // Enregistrement de l'ID et du token dans le stockage local
      localStorage.setItem("userId", user._id);
      localStorage.setItem("userPseudo", user.pseudo)
      localStorage.setItem("authToken", authToken);

      // Redirection vers la page de profil
      navigate(`/profile/${user._id}`);
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError("Aucune correspondance !");
      }
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email :</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <label htmlFor="password">Mot de passe :</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
          <input type="submit" name="submit" value="Connexion" />
        </form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
};

export default SignIn;
