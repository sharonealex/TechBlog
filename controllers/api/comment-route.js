const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(comments => res.json(comments))
        .catch(err => {
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(comments => res.json(comments))
        .catch(err => {
            res.status(500).json(err);
        })
});





