const express = require("express")
const router = express.Router();
const {validateToken} = require("../middlewares/Authentication")
const { posts, users } = require("../models");
const { Op, json } = require("sequelize");

router.post("/", validateToken, async (req, res) => {
    const {title, description} = req.body;

    let post = await posts.create({
        title: title,
        description: description,
        userId: req.user.id,
        status: "active"
    })

    return res.json(post)
})

router.get("/", validateToken, async (req, res) => {

    let getPosts = await posts.findAll({
        where: {
            status: {
                [Op.ne]: "deleted"
            }
        },
        include: [{
            model: users,
            attributes: ["username"]
        }]
    });

    return res.json(getPosts)
})

router.get("/:username", validateToken, async (req, res) => {
    const {username} = req.params;

    let user = await users.findOne({
        where: {
            username: username
        }
    })

    if(!user) {
        return res.json({ error: "User Does Not Exist!"})
    }

    let userPosts = await posts.findAll({
        where: {
            userId: user.id,
            status: "active"
        }
    })

    return res.json(userPosts)
})

router.delete("/:id", validateToken, async (req, res) => {
    
    const {id} = req.params;

    console.log("ID", id)

    await posts.update(
        {
            status: "deleted"
        },
        {
            where: {
                id: id
            }
        }
    )

    return res.json({ message: "Deleted Post"})

})

module.exports = router