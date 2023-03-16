const Plate = require("../models/Plate");
module.exports = {
    getAll: async (req, res) => {
        let currentDate = new Date();
        const plates = await Plate.find({
            fechainicioactividad: { $gte: currentDate }
        });
        res.json(plates);
    },
    add: async (req, res) => {
        const { color, precio, campos, nombre, fechainicioactividad, oferta } =
            req.body;

        const newPlate = new Plate({
            color,
            precio,
            campos,
            nombre,
            fechainicioactividad,
            oferta
        });
        await newPlate.save();
        const plates = await Plate.find({});
        res.json(plates);
    },
    update: async (req, res) => {
        const {
            id,
            color,
            precio,
            campos,
            nombre,
            fechainicioactividad,
            oferta
        } = req.body;
        await Plate.findByIdAndUpdate(
            { _id: id },
            { color, precio, campos, nombre, fechainicioactividad, oferta }
        );
        const plates = await Plate.find({});
        res.json(plates);
    },
    delete: async (req, res) => {
        const { id } = req.params;
        await Plate.findByIdAndRemove({ _id: id });
        const plates = await Plate.find({});
        res.json(plates);
    }
};
