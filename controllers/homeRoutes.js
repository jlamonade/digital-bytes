const router = require("express").Router();

router.get("/", async (req, res) => {
  await res.render("index");
});
router.get("/login", async (req, res) => {
  return await res.render("login");
});
router.get("/newpost", async (req, res) => {
  return await res.render("newPost");
});

module.exports = router;
