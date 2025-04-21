import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = (destination = path.join(__dirname, "../public/property/")) =>
  multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destination);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
      );
    },
  });

const fileFilter =
  (allowedTypes = []) =>
  (req, file, cb) => {
    if (allowedTypes.length === 0 || allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid file type. Only ${allowedTypes.join(", ")} are allowed.`
        ),
        false
      );
    }
  };

const createMulterConfig = ({
  destination = path.join(__dirname, "../public/property/"),
  allowedTypes = [],
  maxSize = 5 * 1024 * 1024,
  fieldName = "file",
} = {}) => {
  return multer({
    storage: storage(destination),
    fileFilter: fileFilter(allowedTypes),
    limits: {
      fileSize: maxSize,
    },
  });
};

export default {
  singleUpload: (config = {}) =>
    createMulterConfig(config).single(config.fieldName || "file"),

  multipleUpload: (maxCount = 10, config = {}) =>
    createMulterConfig(config).array(config.fieldName || "files", maxCount),

  fieldsUpload: (fields, config = {}) =>
    createMulterConfig(config).fields(fields),

  anyUpload: (config = {}) => createMulterConfig(config).any(),
};
