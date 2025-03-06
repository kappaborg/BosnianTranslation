const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const TOURS_DIR = path.join(process.cwd(), 'public', 'images', 'tours');
const SOURCE_DIR = path.join(TOURS_DIR, 'source');

// Create directories if they don't exist
const createDirs = () => {
  const locations = ['mostar', 'jajce', 'bascarsija', 'vrelo-bosne', 'travnik', 'blagaj'];
  locations.forEach(location => {
    const dir = path.join(SOURCE_DIR, location);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Download an image from a URL
const downloadImage = async (url, filepath) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        'User-Agent': 'BosniaTrans/1.0 (https://github.com/yourusername/BosniaTrans; your@email.com) Node.js/18.0',
        'Accept': 'image/jpeg,image/*'
      }
    };

    https.get(url, options, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(filepath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
};

// Process images using the existing script
const processImages = () => {
  try {
    execSync('node scripts/process-images.js', { stdio: 'inherit' });
  } catch (error) {
    console.error('Error processing images:', error);
  }
};

// Main function to download all images
const downloadAllImages = async () => {
  createDirs();

  const images = {
    mostar: {
      regular: [
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Mostar_Old_Bridge_2017.jpg',
          filename: '1.jpg'
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Mostar_Old_Bridge_at_night.jpg',
          filename: '2.jpg'
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Stari_Most_Mostar.jpg',
          filename: '3.jpg'
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Mostar_Old_Bridge_from_river.jpg',
          filename: '4.jpg'
        }
      ],
      panorama: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/Mostar_Old_Bridge_Panorama.jpg',
        filename: '360.jpg'
      }
    },
    jajce: {
      regular: [
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Pliva_Waterfall_in_Jajce.jpg',
          filename: '1.jpg'
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Pliva_Waterfall_aerial.jpg',
          filename: '2.jpg'
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Pliva_Waterfall_night.jpg',
          filename: '3.jpg'
        },
        {
          url: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Pliva_Waterfall_sunset.jpg',
          filename: '4.jpg'
        }
      ],
      panorama: {
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Pliva_Waterfall_panorama.jpg',
        filename: '360.jpg'
      }
    }
  };

  for (const [location, locationImages] of Object.entries(images)) {
    const locationDir = path.join(SOURCE_DIR, location);
    
    // Download regular images
    for (const image of locationImages.regular) {
      const filepath = path.join(locationDir, image.filename);
      console.log(`Downloading ${image.filename} for ${location}...`);
      try {
        await downloadImage(image.url, filepath);
        console.log(`Successfully downloaded ${image.filename} for ${location}`);
      } catch (error) {
        console.error(`Error downloading ${image.filename} for ${location}:`, error);
      }
    }

    // Download panorama
    const panoramaPath = path.join(locationDir, locationImages.panorama.filename);
    console.log(`Downloading panorama for ${location}...`);
    try {
      await downloadImage(locationImages.panorama.url, panoramaPath);
      console.log(`Successfully downloaded panorama for ${location}`);
    } catch (error) {
      console.error(`Error downloading panorama for ${location}:`, error);
    }
  }

  // Process all images
  console.log('Processing images...');
  processImages();
};

// Run the script
downloadAllImages().catch(console.error); 