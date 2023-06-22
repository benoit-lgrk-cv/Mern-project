import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    setIsAuthenticated(authToken !== null);
  }, []); // Effectue cette vérification une seule fois après le premier rendu

  const handleLogout = () => {
    setIsAuthenticated(false); // Mettre à jour l'état d'authentification
  };

  // const handleSignin = () => {
  //   setIsAuthenticated(true); // Mettre à jour l'état d'authentification
  // };

  return (
    <div className='navigation'>
      <ul>
        <li>
          <NavLink to='/' className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>
            Accueil
          </NavLink>
        </li>
        {!isAuthenticated && (
          <>
            <li>
              <NavLink to='/signup' className={({ isActive }) => (isActive ? 'activeLink' : undefined)}>
                S'inscrire
              </NavLink>
            </li>
            <li>
              <NavLink to='/login' className={({ isActive }) => (isActive ? 'activeLink' : undefined)} >
                Se connecter
              </NavLink>
            </li>
          </>
        )}
        {isAuthenticated && (
          <>
            <li>
              <NavLink
                to={`/create/${localStorage.getItem('userId')}`}
                className={({ isActive }) => (isActive ? 'activeLink' : undefined)}
              >
                Créer une alerte
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/alerts/${localStorage.getItem('userId')}`}
                className={({ isActive }) => (isActive ? 'activeLink' : undefined)}
              >
                Mes alertes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={`/profile/${localStorage.getItem('userId')}`}
                className={({ isActive }) => (isActive ? 'activeLink' : undefined)}
              >
                Mon profil
              </NavLink>
            </li>
            <li>
              <NavLink to='/logout' className={({ isActive }) => (isActive ? 'activeLink' : undefined)} onClick={handleLogout}>
                Se déconnecter
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
