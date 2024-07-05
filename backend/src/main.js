const app = require("./app");
require("dotenv").config();

async function init() {
  try {
    //Run server
    const port = process.env.PORT ?? 3000;
    await app.listen(port);

    console.log(`✓ Server on port ${port}`);
  } catch (error) {
    console.error("Error starting server: ", error);
  }
}

init();
