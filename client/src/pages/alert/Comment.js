import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Comment = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editCommentId, setEditCommentId] = useState('');
  const userId = localStorage.getItem('userId');
  const userPseudo = localStorage.getItem('userPseudo');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAlert = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/alert/update/${id}`
        );
        setAlert(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAlert();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/alert/comment-alert/${id}`,
        {
          commenterId: userId,
          commenterPseudo: userPseudo,
          text: commentText,
        }
      );

      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    navigate('/login'); // Naviguez vers la page de connexion lorsque le bouton "Se connecter" est cliqué
  };

  const handleEditComment = async (e) => {
    e.preventDefault();

    try {
      await axios.patch(
        `${process.env.REACT_APP_API_URL}/alert/edit-comment/${editCommentId}`,
        {
            commenterId: userId,
            commenterPseudo: userPseudo,
          text: commentText,

        }
      );
      setEditMode(false);
      setEditCommentId('');
      setCommentText('');
    } catch (error) {
      console.log(error);
    }
  };
  const enterEditMode = (commentId, commentText) => {
    setEditMode(true);
    setEditCommentId(commentId);
    setCommentText(commentText);
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditCommentId('');
    setCommentText('');
  };
  return (
    <div>
      <Navbar />
      {alert ? (
        <div>
          <h1>Aidez-moi à être retrouvé !</h1>
          <p>Species: {alert.species}</p>
          <p>Tattoo Number: {alert.tattooNumber}</p>
          {alert.imageUrl && (
            <img
              src={`${process.env.REACT_APP_API_URL}/images/${alert.imageUrl}`}
              alt={alert.name}
              style={{ width: "200px" }}
            />
          )}
          <p>Name: {alert.name}</p>
          <p>Description: {alert.description}</p>
          <p>Location: {alert.location}</p>
          {/* Affichez les autres détails de l'alerte */}

          {userId ? (
            <div>
              <h3>Ajouter un commentaire</h3>
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  name="comment"
                  rows="4"
                  cols="50"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <br />
                <button type="submit">Ajouter</button>
              </form>
            </div>
          ) : (
            <button onClick={handleLogin}>Se connecter</button>
          )}

          {/* Affichez les commentaires existants */}
          {alert.comments.map((comment) => (
            <div key={comment.createdAt}>
              <p>Commenter: {comment.commenterPseudo}</p>
              <p>Comment: {comment.text}</p>
              <p>Created At: {comment.createdAt}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Comment;
