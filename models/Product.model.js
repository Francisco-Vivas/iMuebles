const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imagesURL: {
      type: [String],
      default: "https://aqt.cl/wp-content/uploads/2020/09/sin_imagen.jpg",
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    ownerID: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    category: {
      type: String,
      enum: [
        "Sofás",
        "Mesas",
        "Sillas",
        "Escritorios",
        "Armarios",
        "Otomanos",
        "Mesas de Comedor",
        "Sillas de Comedor",
        "Soportes para TV",
        "Librerías",
        "Futones",
        "Coffee Tables",
        "Taburetes",
        "Mesa de Noche",
        "Mesas de Conferencias",
        "Mesas de Entrenamiento",
        "Sillas de Visitante",
        "Mesas de Oficina",
        "Sillas de Oficina",
        "Sillas Ejecutivas",
        "Taburetes de Oficina",
        "Unidades de Almacenamiento de Oficina",
        "Repisas de Oficina",
        "Estaciones de trabajo",
        "Sin Categoría",
      ],
      default: "Sin Categoría",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Product", productSchema);
