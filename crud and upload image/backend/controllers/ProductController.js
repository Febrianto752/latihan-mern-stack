import Product from "../model/Product.js";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
  try {
    const response = await Product.findAll();

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getProductById = async (req, res) => {
  try {
    const response = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const saveProduct = (req, res) => {
  if (!req.files) {
    return res.status(400).json({ msg: "No file Uploaded" });
  }

  const name = req.body.name;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase())) {
    return res.status(422).json({ msg: "invalid extension image" });
  }
  // 1mb = 1.000.000
  if (fileSize > 1000000) {
    return res.status(422).json({ msg: "Image must be less than 1mb" });
  }
  // harus sudah dibuat folder public/images
  file.mv(`./public/images/${fileName}`, async (error) => {
    if (error) return res.status(500).json({ msg: error.message });

    try {
      await Product.create({ name: name, image: fileName, url: url });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};
export const updateProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) return res.status(404).json({ msg: "Data Not Found!" });

  let fileName = "";
  if (!req.files) {
    fileName = product.image;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;

    const allowedType = [".png", ".jpg", ".jpeg"];

    if (!allowedType.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "invalid extension image" });
    }
    // 1mb = 1.000.000
    if (fileSize > 1000000) {
      return res.status(422).json({ msg: "Image must be less than 1mb" });
    }
    const filePath = `./public/images/${product.image}`;
    fs.unlinkSync(filePath);

    file.mv(`./public/images/${fileName}`, (error) => {
      if (error) return res.status(500).json({ msg: error.message });
    });
  }

  const name = req.body.name;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;

  try {
    await Product.update(
      { name, image: fileName, url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Product updated successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Product.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!product) return res.status(404).json({ msg: "Data Not Found!" });

  try {
    const filePath = `./public/images/${product.image}`;
    fs.unlinkSync(filePath);
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Product deleted successfuly" });
  } catch (error) {
    console.log(error.message);
  }
};
