export interface Location {
  id: string;
  name: string;
  description: string;
  images: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  historicalFacts: string[];
  audioGuide?: string;
}

export const locations: Location[] = [
  {
    id: '1',
    name: 'Stari Most (Old Bridge)',
    description: `The Stari Most is a 16th-century Ottoman bridge in the city of Mostar that crosses the river Neretva and connects two parts of the city. The Old Bridge stood for 427 years, until it was destroyed on November 9, 1993, during the Bosnian War. Subsequently, a project was set in motion to reconstruct it, and the rebuilt bridge opened on July 23, 2004.

The bridge is considered an exemplary piece of Balkan Islamic architecture and was commissioned by Suleiman the Magnificent in 1557. It was designed by Mimar Hayruddin, a student of the great Ottoman architect Mimar Sinan.

The bridge is also famous for its traditional diving competitions, where brave divers plunge from the bridge into the cold waters of the Neretva River below.`,
    images: [
      '/images/tours/stari-most-1.jpg',
      '/images/tours/stari-most-2.jpg',
      '/images/tours/stari-most-3.jpg'
    ],
    coordinates: {
      lat: 43.337,
      lng: 17.815
    },
    historicalFacts: [
      'Built between 1557 and 1566',
      'Original construction cost 300,000 drams',
      'The bridge is 4 meters wide and 30 meters long',
      'Rises 24 meters above the summer water level',
      'Reconstructed using original building techniques and some of the original stones'
    ],
    audioGuide: '/audio/stari-most-guide.mp3'
  },
  {
    id: '2',
    name: 'Baščaršija',
    description: `Baščaršija is Sarajevo's old bazaar and the historical and cultural center of the city. Built in the 15th century when Isa-Beg Isaković founded the town, it has maintained its role as the city's major trading center ever since.

The word Baščaršija derives from the Turkish words "baş" (head) and "çarşı" (bazaar). During the height of the Ottoman Empire, Baščaršija had 12,000 shops and was one of the largest and most important trade centers in the Balkans.

Today, it is a major tourist attraction and still serves as a working market. The area is home to several important historical buildings, including the Gazi Husrev-beg Mosque, the Morića Han, and the Sebilj fountain.`,
    images: [
      '/images/tours/bascarsija-1.jpg',
      '/images/tours/bascarsija-2.jpg',
      '/images/tours/bascarsija-3.jpg'
    ],
    coordinates: {
      lat: 43.859,
      lng: 18.431
    },
    historicalFacts: [
      'Founded in 1462 by Isa-Beg Isaković',
      'Originally had 12,000 shops and 47 different craft guilds',
      'The Sebilj fountain was built in 1753',
      'Many buildings were destroyed in the Great Sarajevo Fire of 1697',
      'Restored and preserved as a cultural heritage site'
    ],
    audioGuide: '/audio/bascarsija-guide.mp3'
  },
  {
    id: '3',
    name: 'Sarajevo City Hall (Vijećnica)',
    description: `The Sarajevo City Hall, known as Vijećnica, is a pseudo-Moorish building located in Sarajevo. It was built during the Austro-Hungarian period and served as the city hall until 1949 when it became the National and University Library of Bosnia and Herzegovina.

The building's architecture represents a unique blend of European and Ottoman styles, making it one of the most beautiful examples of Austro-Hungarian architecture in the Balkans. It was designed by Czech architect Karel Pařík and completed in 1896.

During the Siege of Sarajevo, the building was deliberately targeted and burned down on August 25, 1992, destroying almost 2 million books and manuscripts. After extensive reconstruction, it was reopened in 2014.`,
    images: [
      '/images/tours/vijecnica-1.jpg',
      '/images/tours/vijecnica-2.jpg',
      '/images/tours/vijecnica-3.jpg'
    ],
    coordinates: {
      lat: 43.859,
      lng: 18.435
    },
    historicalFacts: [
      'Construction began in 1892 and was completed in 1896',
      'Designed in Pseudo-Moorish style by Karel Pařík',
      'Served as the National Library from 1949 to 1992',
      'Destroyed during the Siege of Sarajevo in 1992',
      'Reconstruction took 18 years and cost over 25 million euros'
    ],
    audioGuide: '/audio/vijecnica-guide.mp3'
  }
]; 