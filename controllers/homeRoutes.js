const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const withAuth = require('../utils/auth');


router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [User, Comment]
        })
        const posts = postData.map((post) => post.get({
            plain: true
        }))
        // res.json(posts)
        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(400).json(err)
    }
});

router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                        }
                    ]
                }
            ],
        });

        const post = postData.get({ plain: true });

        if (post.user_id == req.session.user_id) {
            res.redirect('/your-post/' + post.id);
            return;
          }
        // console.log(post)
        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/your-post/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                User,
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                        }
                    ]
                }
            ],
        });
  
      const post = postData.get({ plain: true });
  
      res.render('yourPost', {
        ...post,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

router.get('/login', (req, res) => {
    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;