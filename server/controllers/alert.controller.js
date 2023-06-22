const Alert = require("../models/Alert.model");
const fs = require("fs");

// Méthode pour créer une nouvelle alerte
exports.createAlert = async (req, res) => {
  try {
    const { species, tattooNumber, name, description, location, userId } =
      req.body;
    const imageUrl = req.file.filename;

    const newAlert = new Alert({
      species,
      tattooNumber,
      imageUrl,
      name,
      description,
      location,
      userId,
    });
    const savedAlert = await newAlert.save();
    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création de l'alerte.",
    });
  }
};

//récupère les alertes d'un utilisateur
exports.getUserAlerts = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);

    const alerts = await Alert.find({ userId: id });

    res.status(200).json(alerts);
    console.log(alerts);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur s'est produite lors de la récupération des alertes de l'utilisateur",
    });
  }
};

//récupère toutes les alertes pour la page principale
exports.getAlerts = async (req, res, next) => {
  Alert.find()
    .then((alerts) => res.status(200).json(alerts))
    .catch((error) => res.status(400).json({ error }));
};

//récupère une alerte pour la page de modification d'alerte
exports.getAlert = async (req, res, next) => {
  try {
    const { id } = req.params;

    const alert = await Alert.findById(id);

    if (!alert) {
      return res.status(404).json({ message: "Alerte non trouvée" });
    }

    res.status(200).json(alert);
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la récupération de l'alerte",
      error: error.message,
    });
  }
};

exports.updateAlert = async (req, res, next) => {
  const { id } = req.params;
  const { species, tattooNumber, name, description, location } = req.body;
  console.log(name);
  const imageUrl = req.file.filename;
  console.log(imageUrl);
  try {
    // Vérifiez si l'alerte existe
    const alert = await Alert.findById(id);
    if (!alert) {
      return res.status(404).json({ message: "Alerte non trouvée" });
    }

    // Mettez à jour les champs de l'alerte avec les nouvelles valeurs
    alert.species = species;
    alert.tattooNumber = tattooNumber;
    alert.name = name;
    alert.description = description;
    alert.location = location;

    if (alert.imageUrl) {
      fs.unlinkSync(`./images/${alert.imageUrl}`);
    }
    alert.imageUrl = imageUrl;
    // Sauvegardez les modifications dans la base de données
    await alert.save();

    return res
      .status(200)
      .json({ message: "Alerte mise à jour avec succès !" });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la mise à jour de l'alerte",
      error: error.message,
    });
  }
};

exports.deleteAlert = async (req, res, next) => {
  try {
    const alertId = req.params.id;

    const alert = await Alert.findById(alertId);
    if (!alert) {
      return res.status(404).json({ message: "Alerte introuvable!" });
    }
    if (alert.imageUrl) {
      fs.unlinkSync(`./images/${alert.imageUrl}`);
    }

    await Alert.findByIdAndRemove(alertId);
    res.status(200).json({ message: "Alerte supprimée avec succes!" });
  } catch (error) {
    res.status(500).json({
      message: "Une erreur s'est produite lors de la suppression de l'alerte!",
      error: error.message,
    });
  }
};

// les commentaires
module.exports.commentPost = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) return res.status(400).send("identifiant inconnu : " + postId);
    await Alert.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true }
    ).then((data) => res.status(200).send(data)),
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400);
      };
  } catch (err) {
    return res.status(400).send(err);
  }
};

module.exports.editComment = async (req, res) => {
  try {
    const postId = req.params.id;
    if (!postId) return res.status(400).send("ID unknown : " + req.params.id);

    const updatedRecord = {
      comments: {
        commenterId: req.body.commenterId,
        commenterPseudo: req.body.commenterPseudo,
        text: req.body.text,
        timestamp: new Date().getTime(),
      },
    };
    const updatedDoc = await Alert.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true }
    );

    if (updatedDoc) {
      res.send(updatedDoc);
    } else {
      console.log("Update failed.");
      return res.status(400).send("Update failed.");
    }
  } catch (error) {
    console.log("Error : " + error);
    return res.status(400).send(error);
  }
};

module.exports.deleteComment = async (req, res) => {
  const postId = req.params.id;
  if (!postId)
    return res.status(400).send("Identifiant inconnu : " + req.params.id);
  try {
    await Alert.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            commenterId: req.body.commenterId,
          },
        },
      },
      { new: true }
    ).then((data) => res.status(200).send(data)),
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400);
      };
  } catch (err) {
    return res.status(400).send(err);
  }
};
