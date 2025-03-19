"use client"
import { useState } from "react";

const ImageUploader = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Show preview before upload
    }
  };

  // Handle image upload
  const handleUpload = async () => {
    if (!image) {
      setError("Please select an image to upload.");
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    console.log("formdae",formData)
    console.log("image",image)
    formData.append("file", image);

    try {
      const response = await fetch("/api/upload-image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUploadedImage(data.image.url); // Set uploaded image URL
      } else {
        setError(data.error || "Upload failed");
      }
    } catch (err) {
      setError("Something went wrong while uploading.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 border rounded-md shadow-md">
      <input type="file" accept="image/*" onChange={handleFileChange} className="p-2 border rounded-md" />
      
      {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded-md" />}
      
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {uploadedImage && (
        <div className="mt-4">
          <p className="text-green-600">Image Uploaded Successfully:</p>
          <img src={uploadedImage} alt="Uploaded" className="w-32 h-32 object-cover rounded-md" />
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;
