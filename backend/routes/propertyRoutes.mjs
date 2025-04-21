import express from "express";
import upload from "../utils/multer.mjs";
import {
  createProperty,
  getAllProperties,
  getSingleProperties,
  deleteSingleProperty,
  updateSingleProperty,
} from "../controllers/propertyController.mjs";

const router = express.Router();

router.get("/", getAllProperties);
router.get("/:id", getSingleProperties);
router.delete("/:id", deleteSingleProperty);
router.post(
  "/",
  upload.singleUpload({
    fieldName: "image",
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  }),
  createProperty
);
router.put(
  "/:id",
  upload.singleUpload({
    fieldName: "image",
    allowedTypes: ["image/jpeg", "image/png", "image/webp"],
  }),
  updateSingleProperty
);

export default router;
