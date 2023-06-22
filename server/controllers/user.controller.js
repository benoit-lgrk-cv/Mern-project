const User = require("../models/User.model");
const fs = require("fs");

exports.signup = async (req, res, next) => {
  const user = new User(req.body);

  try {
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.status(201).send({ user, authToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findUser(req.body.email, req.body.password);
    const authToken = await user.generateAuthTokenAndSaveUser();
    res.send({ user, authToken });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    req.user.authTokens = [];
    await req.user.save();
    res.send();
    res.redirect("/");
  } catch (error) {
    res.status(500).send();
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    if (user.imageProfile) {
      fs.unlinkSync(`./images/${user.imageProfile}`);
    }

    await User.findByIdAndRemove(userId);

    res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({
      message:
        "Une erreur s'est produite lors de la suppression de l'utilisateur",
      error: error.message,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { pseudo, phoneNumber, address } = req.body;
  const imageProfile = req.file.filename;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    user.pseudo = pseudo;
    user.phoneNumber = phoneNumber;
    user.address = address;

    if (user.imageProfile) {
      fs.unlinkSync(`./images/${user.imageProfile}`);
    }

    user.imageProfile = imageProfile;
    await user.save();

    return res.status(200).json({ message: "Profil utilisateur mis à jour" });
  } catch (error) {
    return res.status(500).json({
      message:
        "Une erreur est survenue lors de la mise à jour du profil utilisateur",
    });
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.userInfo = async (req, res, next) => {
  const userId = req.params.id; // Récupère l'ID de l'utilisateur depuis les paramètres de la requête

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("Utilisateur introuvable");
    }

    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};
