import type { NextApiRequest, NextApiResponse } from "next";
import db from "@/prisma/db";
import cloudinary from "@/lib/cloudinary"; // Cloudinary config
import multer from "multer";
import { promisify } from "util";

// Configure multer to store file in memory
const upload = multer({ storage: multer.memoryStorage() });
const uploadMiddleware:any = promisify(upload.single("file")); // Convert to promise-based

const handler = async (req: any, res: any) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  console.log("req",req)

  await uploadMiddleware(req, res); // Process file upload

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  try {
    // Convert buffer to base64 for Cloudinary upload
    const fileStr = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;
    console.log("fileStr",fileStr)
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      folder: "uploads",
    });

    // Store image URL in Prisma database
    // const savedImage = await db.image.create({
    //   data: {
    //     url: uploadResponse.secure_url,
    //     publicId: uploadResponse.public_id,
    //   },
    // });

    return res.status(200).json({ image: uploadResponse });
  } catch (error) {
    return res.status(500).json({ error: "Error uploading image" });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false, // Disable Next.js default body parser
  },
};
