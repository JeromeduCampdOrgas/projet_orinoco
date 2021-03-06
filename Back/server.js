const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");
const categorieRoutes = require("./routes/categorie.routes");

require("dotenv").config({ path: "./config/.env" });
require("./config/db");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");

const { v4: uuidv4 } = require("uuid");

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(helmet());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/categories", categorieRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
