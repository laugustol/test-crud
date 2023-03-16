const { Schema, model } = require("mongoose");

const plateSchema = new Schema(
    {
        color: String,
        precio: String,
        campos: String,
        nombre: String,
        fechainicioactividad: { type: Date, default: Date.now },
        oferta: String
    },
    {
        timestamps: true
    }
);

module.exports = model("Plate", plateSchema, "plates");
