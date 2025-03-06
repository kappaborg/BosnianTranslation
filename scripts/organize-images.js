const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const locations = [
  {
    id: 'mostar',
    name: 'Stari Most (Old Bridge)',
    description: 'Iconic 16th-century bridge in Mostar'
  },
  {
    id: 'bascarsija',
    name: 'Baščaršija',
    description: 'Historic bazaar and cultural center in Sarajevo'
  },
  {
    id: 'vrelo-bosne',
    name: 'Vrelo Bosne',
    description: 'Spring of the Bosna River near Sarajevo'
  },
  {
    id: 'travnik',
    name: 'Travnik Fortress',
    description: 'Medieval fortress in central Bosnia'
  },
  {
    id: 'jajce',
    name: 'Jajce Waterfall',
    description: 'Unique waterfall in the heart of the city'
  },
  {
    id: 'blagaj',
    name: 'Blagaj Tekke',
    description: 'Historic Dervish monastery near Mostar'
  }
];

async function processImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 })
    .toFile(outputPath);
}

function createDirectoryStructure() {
  const baseDir = path.join(__dirname, '..', 'public', 'images', 'tours');
  
  // Create base directory
  fs.mkdirSync(baseDir, { recursive: true });

  // Create README with instructions
  const readmePath = path.join(baseDir, 'README.md');
  const readmeContent = `# Tour Images

This directory contains images for the virtual tour feature. To add images for each location:

1. Create a folder with high-resolution images for each location in the \`source\` directory:
   \`\`\`
   source/
     mostar/
       1.jpg    # Regular photo
       2.jpg    # Regular photo
       3.jpg    # Regular photo
       4.jpg    # Regular photo
       360.jpg  # Panorama photo (should be wide aspect ratio)
     bascarsija/
       ...
   \`\`\`

2. Run the processing script:
   \`\`\`
   node scripts/process-images.js
   \`\`\`

The script will:
- Create optimized gallery images (1920x1080)
- Create optimized panorama images (4096x2048)
- Place them in the correct directories

Image requirements:
- Gallery images: At least 1920x1080 pixels, JPG format
- Panorama images: At least 4096x2048 pixels, equirectangular projection preferred, JPG format

Locations:
${locations.map(loc => `- ${loc.name} (${loc.id}): ${loc.description}`).join('\n')}

Directory structure after processing:
\`\`\`
tours/
  mostar/
    gallery/
      1.jpg  # 1920x1080
      2.jpg
      3.jpg
      4.jpg
    360/
      panorama.jpg  # 4096x2048
  bascarsija/
    ...
\`\`\`
`;

  fs.writeFileSync(readmePath, readmeContent);
  console.log('Created README with instructions');

  // Create source directory
  const sourceDir = path.join(baseDir, 'source');
  fs.mkdirSync(sourceDir, { recursive: true });

  // Create directories for each location
  for (const location of locations) {
    // Source directory
    const locationSourceDir = path.join(sourceDir, location.id);
    fs.mkdirSync(locationSourceDir, { recursive: true });

    // Gallery and panorama directories
    const galleryDir = path.join(baseDir, location.id, 'gallery');
    const panoramaDir = path.join(baseDir, location.id, '360');
    fs.mkdirSync(galleryDir, { recursive: true });
    fs.mkdirSync(panoramaDir, { recursive: true });
  }

  console.log('Created directory structure');
}

async function processImages() {
  const baseDir = path.join(__dirname, '..', 'public', 'images', 'tours');
  const sourceDir = path.join(baseDir, 'source');

  for (const location of locations) {
    console.log(`Processing ${location.name}...`);
    
    const locationSourceDir = path.join(sourceDir, location.id);
    const galleryDir = path.join(baseDir, location.id, 'gallery');
    const panoramaDir = path.join(baseDir, location.id, '360');

    // Process gallery images
    for (let i = 1; i <= 4; i++) {
      const sourcePath = path.join(locationSourceDir, `${i}.jpg`);
      const targetPath = path.join(galleryDir, `${i}.jpg`);

      if (fs.existsSync(sourcePath)) {
        try {
          await processImage(sourcePath, targetPath, 1920, 1080);
          console.log(`Processed gallery image ${i} for ${location.id}`);
        } catch (error) {
          console.error(`Error processing gallery image ${i} for ${location.id}:`, error);
        }
      }
    }

    // Process panorama
    const sourcePanoPath = path.join(locationSourceDir, '360.jpg');
    const targetPanoPath = path.join(panoramaDir, 'panorama.jpg');

    if (fs.existsSync(sourcePanoPath)) {
      try {
        await processImage(sourcePanoPath, targetPanoPath, 4096, 2048);
        console.log(`Processed panorama for ${location.id}`);
      } catch (error) {
        console.error(`Error processing panorama for ${location.id}:`, error);
      }
    }
  }
}

// Create directory structure and README
createDirectoryStructure();

// Check if we should process images
if (process.argv.includes('--process')) {
  processImages().catch(console.error);
} else {
  console.log('\nDirectory structure and README created. To process images:');
  console.log('1. Add your high-resolution images to the source directories');
  console.log('2. Run: node scripts/organize-images.js --process');
} 