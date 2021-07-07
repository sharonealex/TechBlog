  
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Post.findAll({
            attributes: [
                'id',
                'title',
                'content',
                'created_at'
            ],
            order: [
                ['created_at', 'DESC']
            ],
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id', 
                        'comment_text', 
                        'post_id',
                        'user_id',
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(post => res.json(post))
        .catch(err => {
            res.status(500).json(err);
        });
});


router.get('/:id', (req, res) => {
    Post.findOne({
            where: {
                id: req.params.id
            },
            attributes: [
                'id',
                'content',
                'title',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['username']
                },
                {
                    model: Comment,
                    attributes: [
                        'id',
                        'comment_text', 
                        'post_id', 
                        'user_id', 
                        'created_at'
                    ],
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        })
        .then(post => {
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.json(post);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', withAuth, (req, res) => {
    Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(post => res.json(post))
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        }).then(post => {
            if (!post) {
                res.status(404).json({ message: 'Post not found' });
                return;
            }
            res.json(post);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(post => {
        if (!post) {
            res.status(404).json({ message: 'Post not found' });
            return;
        }
        res.json(post);
    }).catch(err => {
        res.status(500).json(err);
    });
});

module.exports = router;