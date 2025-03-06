# Tour Images

This directory contains images for the virtual tour feature. To add images for each location:

1. Create a folder with high-resolution images for each location in the `source` directory:
   ```
   source/
     mostar/
       1.jpg    # Regular photo
       2.jpg    # Regular photo
       3.jpg    # Regular photo
       4.jpg    # Regular photo
       360.jpg  # Panorama photo (should be wide aspect ratio)
     bascarsija/
       ...
   ```

2. Run the processing script:
   ```
   node scripts/process-images.js
   ```

The script will:
- Create optimized gallery images (1920x1080)
- Create optimized panorama images (4096x2048)
- Place them in the correct directories

Image requirements:
- Gallery images: At least 1920x1080 pixels, JPG format
- Panorama images: At least 4096x2048 pixels, equirectangular projection preferred, JPG format

Locations:
- Stari Most (Old Bridge) (mostar): Iconic 16th-century bridge in Mostar
- Baščaršija (bascarsija): Historic bazaar and cultural center in Sarajevo
- Vrelo Bosne (vrelo-bosne): Spring of the Bosna River near Sarajevo
- Travnik Fortress (travnik): Medieval fortress in central Bosnia
- Jajce Waterfall (jajce): Unique waterfall in the heart of the city
- Blagaj Tekke (blagaj): Historic Dervish monastery near Mostar

Directory structure after processing:
```
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
```
