const db = require("../models");
const User = db.users;

exports.create = (req, res) => {
    if (!req.body.userName) {
        res.status(400).send({ message: "Los datos no se pudieron ingresar verifique los campos!" });
        return;
    }

    User.find({ userName: req.body.userName })
        .then(data => {
            if (data.length == 0) {
                const user = new User({
                    name: req.body.name,
                    email: req.body.email,
                    userName: req.body.userName,
                    password: req.body.password
                });
                user.save(user)
                    .then(data => {
                        res.status(200).send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Ocurrio un error al almacenar un usuario"
                        });
                    });
            } else {
                return res.status(400).send({ message: "Los datos no se pudieron ingresar verifique los campos!" });
            }
        });
};

exports.findAll = (req, res) => {
    const email = req.query.email;
    var condicion = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

    User.find(condicion)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.nessage || "Ocurrio un error al buscar usuarios"
            });
        });
};

exports.delete = (req, res) => {
    const userName = req.params.userName;

    User.findOneAndDelete({ userName: userName })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "No se pudo eliminar el usuario."
                });
            } else {
                res.status(200).send({ message: "Se ha eliminado el usuario." });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "No se pudo eliminar el usuario"
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const userName = req.params.userName;
    User.findOneAndUpdate({ userName: userName }, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo actualizar el usuario ${userName}. Por favor verifique y vuelva a realizar la acción!`
                });
            } else {
                res.status(200).send({ message: "Usuario actualizado satisfactoriamente" });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error al actualizar el usuario ${userName}.`
            });
        });
};