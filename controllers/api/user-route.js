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
    console.log('heree')
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(user => {
        console.log(user)
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.username = user.username;
                req.session.loggedIn = true;
                console.log("success now", user)
                res.json(req.session.user_id );
            });
            
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//function to update a user
router.put('/:id', (req, res) => {

    User.update(req.body, {
            individualHooks: true,
            where: {
                id: req.params.id
            }
        })
        .then(user => {
            if (!user[0]) {
                res.status(404).json({ message: 'user not found' });
                return;
            }
            res.json(user);
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

//function to log in a user successfully.
router.post('/login', (req, res) => {
    console.log('inside login', req.body.username )
    User.findOne({
            where: {
                username: req.body.username
            }
        }).then((user) => {
            console.log("test from db")
            console.log('login', user)
            if (!user) {
                res.status(400).json({ message: 'user not found' });
                return;
            }
            const validPassword = user.checkPassword(req.body.password);

            if (!validPassword) {
                res.status(400).json({ message: 'Invalid password!!!' });
                return;
            }
            req.session.save(() => {
                req.session.user_id = user.id;
                req.session.username = user.username;
                req.session.loggedIn = true;
                res.json({ user: user, message: 'Successfully logged in!' });
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//function to log out the user.
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;

