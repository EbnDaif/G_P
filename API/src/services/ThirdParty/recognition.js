const axios = require("axios");
const fs = require("fs").promises;

async function uploadImagesAndGetFeatureVectors(file) {
  try {
    const fileData = await fs.readFile(file.path);
    const blob = new Blob([fileData], { type: "image/jpeg" });
    const formData = new FormData();
    formData.append("files", blob, file.filename);

    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.feature_vectors;
  } catch (error) {
    console.error("Error uploading images:", error.message);
    return null;
  }
}
// Function to calculate cosine similarity
async function calculateCosineSimilarity(vector1, vector2) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/calculate_similarity",
      {
        vector1,
        vector2,
      }
    );

    return response.data.cosine_similarity;
  } catch (error) {
    console.error("Error calculating cosine similarity:", error);
    return null;
  }
}

module.exports = {
  calculateCosineSimilarity,
  uploadImagesAndGetFeatureVectors,
};
