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