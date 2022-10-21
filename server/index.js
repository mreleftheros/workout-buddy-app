require("dotenv").config();
const { connect } = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 5000;

connect()
  .then(() => {
    console.log("Database connected.");
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
  })
  .catch(err => {
    console.log(err.message);
    process.exit(1);
  })
