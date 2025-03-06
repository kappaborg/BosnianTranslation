const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

const PEXELS_API_KEY = 'YOUR_PEXELS_API_KEY'; // Replace with your Pexels API key

const locations = [
  {
    id: 'mostar',
    name: 'Stari Most Mostar',
    searchTerms: ['Mostar Bridge', 'Stari Most', 'Mostar Bosnia']
  },
  {
    id: 'bascarsija',
    name: 'Baščaršija Sarajevo',
    searchTerms: ['Bascarsija', 'Sarajevo Old Town', 'Sarajevo Bazaar']
  },
  {
    id: 'vrelo-bosne',
    name: 'Vrelo Bosne',
    searchTerms: ['Vrelo Bosne', 'Springs of Bosnia', 'Sarajevo Park']
  },
  {
    id: 'travnik',
    name: 'Travnik',
    searchTerms: ['Travnik Castle', 'Travnik Bosnia', 'Travnik Fortress']
  },
  {
    id: 'jajce',
    name: 'Jajce',
    searchTerms: ['Jajce Waterfall', 'Jajce Bosnia', 'Pliva Waterfall']
  },
  {
    id: 'blagaj',
    name: 'Blagaj',
    searchTerms: ['Blagaj Tekke', 'Blagaj Monastery', 'Buna River Source']
  }
];

async function searchPexels(query) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.pexels.com',
      path: `/v1/search?query=${encodeURIComponent(query)}&per_page=5`,
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    };

    https.get(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          resolve(response.photos || []);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', reject);
  });
}

async function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        reject(new Error(`Failed to download: ${response.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function processImage(inputPath, outputPath, width, height) {
  await sharp(inputPath)
    .resize(width, height, {
      fit: 'cover',
      position: 'center'
    })
    .jpeg({ quality: 80 })
    .toFile(outputPath);
}

async function main() {
  for (const location of locations) {
    console.log(`Processing ${location.name}...`);
    
    const galleryDir = path.join(__dirname, '..', 'public', 'images', 'tours', location.id, 'gallery');
    const panoramaDir = path.join(__dirname, '..', 'public', 'images', 'tours', location.id, '360');

    fs.mkdirSync(galleryDir, { recursive: true });
    fs.mkdirSync(panoramaDir, { recursive: true });

    // Search and download images for each search term
    let allPhotos = [];
    for (const searchTerm of location.searchTerms) {
      try {
        const photos = await searchPexels(searchTerm);
        allPhotos = [...allPhotos, ...photos];
      } catch (error) {
        console.error(`Error searching for ${searchTerm}:`, error);
      }
    }

    // Use the first 4 unique photos for gallery
    const uniquePhotos = [...new Map(allPhotos.map(p => [p.id, p])).values()];
    for (let i = 0; i < 4 && i < uniquePhotos.length; i++) {
      const photo = uniquePhotos[i];
      const tempPath = path.join(galleryDir, `temp_${i + 1}.jpg`);
      const finalPath = path.join(galleryDir, `${i + 1}.jpg`);

      try {
        await downloadImage(photo.src.original, tempPath);
        await processImage(tempPath, finalPath, 1920, 1080);
        fs.unlinkSync(tempPath);
        console.log(`Processed gallery image ${i + 1} for ${location.id}`);
      } catch (error) {
        console.error(`Error processing gallery image ${i + 1} for ${location.id}:`, error);
      }
    }

    // Use the widest photo for panorama
    if (uniquePhotos.length > 0) {
      const panoramaPhoto = uniquePhotos.reduce((prev, curr) => 
        (curr.width / curr.height) > (prev.width / prev.height) ? curr : prev
      );

      const tempPanoPath = path.join(panoramaDir, 'temp_panorama.jpg');
      const finalPanoPath = path.join(panoramaDir, 'panorama.jpg');

      try {
        await downloadImage(panoramaPhoto.src.original, tempPanoPath);
        await processImage(tempPanoPath, finalPanoPath, 4096, 2048);
        fs.unlinkSync(tempPanoPath);
        console.log(`Processed panorama for ${location.id}`);
      } catch (error) {
        console.error(`Error processing panorama for ${location.id}:`, error);
      }
    }
  }
}

main().catch(console.error); 