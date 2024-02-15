const express = require("express");
const axios = require("axios");

const app = express();
const port = 3001; // Port for the server

app.use(express.json());

// Define a route for proxying requests to Udemy API
app.get("/udemy-api", async (req, res) => {
  const { search, ordering } = req.query;
  try {
    const response = await axios.get(
      `https://www.udemy.com/api-2.0/courses?search=${search}&ordering=${ordering}`,
      {
        headers: {
          Authorization: req.headers.authorization, // Pass the Authorization header received from the client
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.response.status, error.response.statusText);
    res.status(error.response.status).send(error.response.statusText);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
