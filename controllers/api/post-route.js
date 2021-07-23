  
const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//function to get all posts
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

//function to get a post by id
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

//function to create a new post
router.post('/', withAuth, (req, res) => {
    console.log(req.body.title);
    console.log(req.body.content);
    console.log(req.body.session)
    console.log(req.session.user_id);
    Post.create({
            title: req.body.title,
            content: req.body.body,
            user_id: req.session.user_id
        })
        // .then(post => res.json(post))
        .then((post)=>{
            console.log(res.json(post));
            res.json(post);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});
//function to upadte a existing post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
            title: req.body.title,
            content: req.body.body
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

//function to delete a post by id.
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