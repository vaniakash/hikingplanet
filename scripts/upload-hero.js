const cloudinary = require('cloudinary').v2;
require('dotenv').config({ path: '.env.local' });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const images = [
  'public/hero/hero_a_dayarabugyal.jpg'
];

async function uploadImages() {
  for (const img of images) {
    try {
      const result = await cloudinary.uploader.upload(img, {
        folder: 'hikingplanet/hero',
      });
      console.log(`Uploaded ${img}: ${result.secure_url}`);
    } catch (err) {
      console.error(`Error uploading ${img}:`, err);
    }
  }
}

uploadImages();
