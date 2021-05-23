const router = require("express").Router();
const { User, BlogPost } = require("../../models");

// CREATE
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    if (userData) res.status(200).json("User successfully created.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: BlogPost,
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const userData = await User.findAll({
      where: {
        id: req.params.id,
      },
      include: BlogPost,
    });
    if (userData) res.status(200).json(userData);
    else res.status(404).json("404: User Data Not Found.");
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE
// router.put();

// DELETE

module.exports = router;
