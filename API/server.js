require("dotenv").config();
const bcryptjs = require("bcryptjs")

const app = require("./src/config/app");
const { connectdb } = require("./src/config/database");
const PORT = process.env.PORT || 3000;

connectdb().then(() => {
  app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);
});
});
