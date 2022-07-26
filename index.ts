import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import routes from "./src/routes";
import deserializeUser from "./src/middleware/deserializeUser";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(deserializeUser);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3001",
  })
);

function main() {
  app.listen(4000, () => {
    console.log(`Server listening at http://localhost:4000`);
  });

  routes(app);
}

main();


module.exports = app;
