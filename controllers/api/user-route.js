const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//function to fetch all users
router.get('/', (req, res) => {
    User.findAll({
            attributes: { exclude: ['[password'] }
        })
        .then(user => res.json(user))
        .catch(err => {
            res.status(500).json(err);
        });
});

//function to fetch user by id
router.get('/:id', (req, res) => {
    User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [{
                    model: Post,
                    attributes: [
                        'id',
                        'title',
                        'content',
                        'created_at'
                    ]
                },

                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            res.json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//function to create a new yser and save to session
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(user => {
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.username = user.username;
                req.session.loggedIn = true;
                res.json(user);
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//function to delete a user.
router.delete('/:id', (req, res) => {
    User.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (!user) {
                res.status(404).json({ message: 'user not found' });
                return;
            }
            res.json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

