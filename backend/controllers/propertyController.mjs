import {
  deleteProperty,
  findProperties,
  findProperty,
  insertProperty,
  updateProperty,
} from "../services/propertyService.mjs";
import { deleteFile } from "../utils/functions.mjs";

export const getAllProperties = async (req, res) => {
  try {
    const { category = "" } = req.query;
    const query = category ? { category } : {};
    const properties = await findProperties(query);
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSingleProperties = async (req, res) => {
  try {
    const property = await findProperty({ _id: req.params.id });
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProperty = async (req, res) => {
  try {
    const image = req?.file ? req?.file.filename : "";
    const { title, description, price, category } = req.body;

    await insertProperty({
      title,
      image,
      price,
      category,
      description,
    });

    res.status(201).json({
      status: "success",
      message: "Property created successfully",
    });
  } catch (er) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the property",
      error: er.message,
    });
  }
};

export const updateSingleProperty = async (req, res) => {
  try {
    const property = await findProperty({ _id: req.params.id });

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    let image;
    const { title, description, price, category } = req.body;

    if (req?.file) {
      if (property.image) {
        await deleteFile(property.image, "public/property");
      }
      image = req?.file ? req?.file.filename : property.image;
    }

    await updateProperty(
      { _id: req.params.id },
      {
        title,
        image,
        price,
        category,
        description,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Property updated successfully",
    });
  } catch (er) {
    res.status(500).json({
      status: "error",
      message: "An error occurred while creating the property",
      error: er.message,
    });
  }
};

export const deleteSingleProperty = async (req, res) => {
  try {
    const property = await findProperty({ _id: req.params.id });
    if (property.image) {
      await deleteFile(property.image, "public/property");
    }

    await deleteProperty({ _id: req.params.id });
    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
