require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const pricesRouter = require("./routes/prices");

const app = express();
app.use(cors());
app.use(express.json());

// RUTAS
app.use("/api/prices", pricesRouter);

const PORT = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB conectado correctamente");
    app.listen(PORT, () =>
      console.log(`Backend corriendo en http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error("Error conectando a Mongo:", err));
