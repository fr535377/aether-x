const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const helmet = require("helmet");

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use("/api", routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
