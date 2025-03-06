const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const TOURS_DIR = path.join(process.cwd(), 'public', 'images', 'tours');
const SOURCE_DIR = path.join(TOURS_DIR, 'source');

// Process a single image
const processImage = async (inputPath, outputPath, width, height) => {
  await sharp(inputPath)
    .resize(width, height, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 })
    .toFile(outputPath);
};

// Process all images for a location
const processLocationImages = async (location) => {
  console.log(`Processing images for ${location}...`);
  
  const sourceDir = path.join(SOURCE_DIR, location);
  const galleryDir = path.join(TOURS_DIR, location, 'gallery');
  const panoramaDir = path.join(TOURS_DIR, location, '360');

  // Create output directories
  fs.mkdirSync(galleryDir, { recursive: true });
  fs.mkdirSync(panoramaDir, { recursive: true });

  // Process gallery images
  for (let i = 1; i <= 4; i++) {
    const sourcePath = path.join(sourceDir, `${i}.jpg`);
    const outputPath = path.join(galleryDir, `${i}.jpg`);

    if (fs.existsSync(sourcePath)) {
      try {
        await processImage(sourcePath, outputPath, 1920, 1080);
        console.log(`Processed gallery image ${i} for ${location}`);
      } catch (error) {
        console.error(`Error processing gallery image ${i} for ${location}:`, error);
      }
    }
  }

  // Process panorama
  const sourcePanoPath = path.join(sourceDir, '360.jpg');
  const outputPanoPath = path.join(panoramaDir, 'panorama.jpg');

  if (fs.existsSync(sourcePanoPath)) {
    try {
      await processImage(sourcePanoPath, outputPanoPath, 4096, 2048);
      console.log(`Processed panorama for ${location}`);
    } catch (error) {
      console.error(`Error processing panorama for ${location}:`, error);
    }
  }
};

// Main function to process all locations
const processAllLocations = async () => {
  const locations = ['mostar', 'jajce', 'bascarsija', 'vrelo-bosne', 'travnik', 'blagaj'];

  for (const location of locations) {
    if (fs.existsSync(path.join(SOURCE_DIR, location))) {
      await processLocationImages(location);
    }
  }
};

// Run the script
processAllLocations().catch(console.error); 