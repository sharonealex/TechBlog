const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");
//home route server homepage
router.get("/", (req, res) => {
    console.log("herreee")
  //we need to get all posts
  Post.findAll({
    attributes: ["id", "title", "content", "user_id",  'created_at'],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "user_id",  'created_at'],
      },
    ],
  })
    .then((dbPostData) => {
      //serialize data
      if (!dbPostData) {
        res.status(404).json({ message: "No Posts Available" });
        return;
      }
      const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
      console.log(posts);
      res.render("home", { posts, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//serve up the single post page
router.get("/viewpost/:id", (req, res) => {

    Post.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "title", "content", "user_id"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    })
      .then((dbPostData) => {
        //serialize data
        if (!dbPostData) {
          res.status(404).json({ message: "No Posts Available" });
          return;
        }
        const post = dbPostData.get({ plain: true }); // serialize all the posts
        
        const myPost = post.user_id == req.session.user_id;
        res.render("single-post", {
          post,
          loggedIn: req.session.loggedIn,
          currentUser: myPost,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  //render login page
  router.get("/login", (req, res) => {
    console.log("Is user logged in for this session?", req.session.loggedIn);
    if (req.session.loggedIn) {
      res.redirect("/home");
      return;
    }
    res.render("login", { loggedIn: req.session.loggedIn });
  });

  //render signup page
  router.get("/signup", (req, res)=>{
    res.render("signup");
  })


  
  //serve up the dashboard
  router.get("/dashboard", withAuth, (req, res) => {
    //we need to get all posts
    console.log(req.session.user_id, " this is the session id");
    Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      attributes: ["id", "title", "content", "user_id", "created_at"],
      include: [
        {
          model: User,
          as: "user",
          attributes: ["username"],
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "comment_text", "user_id", "created_at"],
          include: [
            {
              model: User,
              as: "user",
              attributes: ["username"],
            },
          ],
        },
      ],
    })
      .then((dbPostData) => {
        //serialize data
        if (!dbPostData) {
          res.status(404).json({ message: "No Posts Available" });
          return;
        }
        const posts = dbPostData.map((post) => post.get({ plain: true })); // serialize all the posts
        console.log(posts);
        res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  router.get("/post", (req, res) => {
    res.render("new-post", { loggedIn: req.session.loggedIn });
  });
  //load the edit page
  router.get("/edit/:id", (req, res) => {
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
      const postData = post.get({ plain: true });
      console.log(postData)
      res.render("edit-post", {
        loggedIn: req.session.loggedIn,
        postId: req.params.id,
        title: post.title,
        content: post.content
      });
  })
  .catch(err => {
      res.status(500).json(err);
  });
   
  });
  module.exports = router;