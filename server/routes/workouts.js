const router = require("express").Router();
const { index_get, index_post, idParam_get, idParam_patch, idParam_delete } = require("../controller/workout");

router.get("/", index_get);

router.post("/", index_post);

router.get("/:id", idParam_get);

router.patch("/:id", idParam_patch);

router.delete("/:id", idParam_delete);

module.exports = router;