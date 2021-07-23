const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//function to get all comments.
router.get('/', (req, res) => {
    Comment.findAll({})
        .then(comments => res.json(comments))
        .catch(err => {
            res.status(500).json(err);
        })
});

//Function to fetch a comment by id
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


//Function to create a new comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
                comment_text: req.body.commentText,
                post_id: req.body.postId,
                user_id: req.session.user_id,
            })
            .then(comment => res.json(comment))
            .catch(err => {
                res.status(500).json(err);
            })
    }
});

//Function to update a comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_text: req.body.comment_text
    }, {
        where: {
            id: req.params.id
        }
    }).then(comment => {
        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(comment);
    }).catch(err => {
        res.status(500).json(err);
    });
});

//Function to delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }).then(comment => {
        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(comment);
    }).catch(err => {
        res.status(500).json(err);
    });
});


module.exports = router;



