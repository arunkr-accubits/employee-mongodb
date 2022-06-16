const app = require("./src/app");

const authorRouter = require("./src/routes/authorRoutes");

app.use("/api", authorRouter);

app.listen(3000, () => {
  console.log("Express Server is listening on port: 3000");
});
