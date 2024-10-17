const express = require("express")
const router = express.Router();
const {validateToken} = require("../middlewares/Authentication")
const { postsComments, users } = require("../models");

router.post("/", validateToken, async (req, res) => {
    
    const {comment, postId} = req.body;

    let commentedPost = await postsComments.create({
        comment: comment,
        userId: req.user.id,
        postId: postId
    })

    return res.json(commentedPost)
})

router.get("/:postId", validateToken, async (req, res) => {

    const {postId} = req.params;

    let getComments = await postsComments.findAll({
        where: {
            postId: postId
        },
        include: [{
            model: users,
            attributes: ["username"]
        }]
    });

    return res.json(getComments)
})

module.exports = router