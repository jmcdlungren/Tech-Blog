const router = require('express').Router();
const { User, Post, Comment } = require("../models");

router.get("/", async (req, res) => {
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
        res.render("dashboard", { posts })
    } catch (err) {
        res.status(400).json(err)
    }
})


module.exports = router;