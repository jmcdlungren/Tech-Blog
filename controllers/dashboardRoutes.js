const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const withAuth = require('../utils/auth');


// View Posts
router.get("/", withAuth, async (req, res) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    }
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }, 
            include: [User, Comment]
        })
        const posts = postData.map((post) => post.get({
            plain: true
        }))
        console.log(posts)
        // res.json(posts)
        res.render("dashboard", { posts, logged_in: true })
    } catch (err) {
        res.status(400).json(err)
    }
})



module.exports = router;