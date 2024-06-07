const { v2: cloudinary } = require("cloudinary");
const fs = require("fs");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

async function uploadToCloudinary(localFilePath, userId) {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    return response.url;
  } catch (e) {
    fs.unlinkSync(localFilePath);
    console.log("Error: ", e.message);
    return null;
  }
}

async function DeleteFromCloudinary(urlpath) {
  let list = urlpath?.split("/");
  let imageId = list[list.length - 1].split(".")[0];
  try {
    if (!urlpath) return null;
    const response = await cloudinary.uploader.destroy(imageId);

    return response;
  } catch (e) {
    fs.unlinkSync(localFilePath);
    console.log("Error: ", e.message);
    return null;
  }
}

module.exports = { uploadToCloudinary, DeleteFromCloudinary };
