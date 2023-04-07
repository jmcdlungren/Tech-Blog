const router = require('express').Router();
const { User, Post, Comment } = require("../models");
const withAuth = require('../utils/auth');


// View Posts
router.get("/", withAuth, async (req, res) => {
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

// // Create new post
// router.post('/', async (req, res) => {
//     try {
//         const newPost = await Post.create({
//             ...req.body,
//             user_id: req.session.user_id,
//         });
        
//         res.status(200).json(newPost);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });




module.exports = router;