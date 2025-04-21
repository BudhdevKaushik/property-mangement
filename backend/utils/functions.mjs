import { unlink } from "fs/promises";
import { join } from "path";

export const deleteFile = async (filename, directory) => {
  try {
    const filePath = join(directory, filename);
    await unlink(filePath);
    console.log(`File ${filename} deleted successfully from ${directory}`);
  } catch (error) {
    console.error(`Error deleting file ${filename}:`, error.message);
  }
};
