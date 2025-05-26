const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const uploadedFiles = req.files.map((file) => file.path); 
    res.json(uploadedFiles);
  } catch (error) {
    // console.error("Error uploading files:", error);
    res.status(500).json({ error: "Failed to upload files" });
  }
};

module.exports = { uploadImages };
