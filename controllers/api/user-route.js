const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(user => res.json(user))
        .catch(err => {
            res.status(500).json(err);
        });
});