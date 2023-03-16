const { Router } = require("express");
const router = Router();
const plate = require("../controllers/plate");

router.get("/", (req, res) => {
    res.send("API");
});

router.get("/plates", plate.getAll);

router.post("/plates/add", plate.add);

router.put("/plates/update", plate.update);

router.delete("/plates/delete/:id", plate.delete);

module.exports = router;
