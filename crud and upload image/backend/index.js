import express from "express";
import FileUpload from "express-fileupload";
import cors from "cors";
import ProductRoute from "./routes/ProductRoute.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(FileUpload()); // middleware upload file
app.use(express.static("public"));
// contoh mengakses file static image : http://localhost:5000/images/743bfe8dd9542cc4aa02a1fcf9aed205.jpeg
app.use(ProductRoute);

app.listen(port, () => {
  console.log(`Server up and running in port localhost:${port}`);
});
