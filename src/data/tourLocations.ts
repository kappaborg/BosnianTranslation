import { Location } from '@/types';

export const locations: Location[] = [
  {
    id: 'old-bridge',
    name: 'Stari Most (Old Bridge)',
    description: 'The iconic Old Bridge in Mostar, originally built in the 16th century, stands as a symbol of Bosnia and Herzegovina. This UNESCO World Heritage site connects the two parts of the city across the Neretva River.',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Mostar_Old_Bridge.jpg/1280px-Mostar_Old_Bridge.jpg'
    ],
    coordinates: {
      lat: 43.337,
      lng: 17.815
    },
    historicalFacts: [
      'Built between 1557 and 1566 by Ottoman architect Mimar Hayruddin',
      'The original bridge stood for 427 years before being destroyed in 1993',
      'Reconstructed and reopened in 2004 using many original stones',
      'Famous for its traditional diving competitions'
    ],
    panorama: {
      url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mostar_Old_Bridge_360_Panorama_at_Night.jpg/2880px-Mostar_Old_Bridge_360_Panorama_at_Night.jpg',
      thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Mostar_Old_Bridge_360_Panorama_at_Night.jpg/640px-Mostar_Old_Bridge_360_Panorama_at_Night.jpg',
      hotspots: [
        {
          pitch: -10,
          yaw: 180,
          text: 'View of the Neretva River',
          type: 'info'
        },
        {
          pitch: 0,
          yaw: 0,
          text: 'Bridge entrance',
          type: 'info'
        }
      ]
    }
  },
  {
    id: 'bascarsija',
    name: 'Baščaršija',
    description: 'The historical and cultural heart of Sarajevo, Baščaršija is the city\'s old bazaar and the historical and cultural center of the city.',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Sarajevo_Sebilj_2.jpg/1280px-Sarajevo_Sebilj_2.jpg'
    ],
    coordinates: {
      lat: 43.859,
      lng: 18.431
    },
    historicalFacts: [
      'Founded in the 15th century when Isa-Beg Isaković built a han (inn)',
      'Name derives from "baš" (main) and "čaršija" (bazaar)',
      'Features the famous Sebilj fountain, built in 1753',
      'Home to traditional crafts including coppersmith and woodcarving'
    ]
  },
  {
    id: 'vijecnica',
    name: 'Sarajevo City Hall (Vijećnica)',
    description: 'A pseudo-Moorish architectural masterpiece, the Sarajevo City Hall was built during the Austro-Hungarian period and served as the National Library until its destruction in 1992.',
    images: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Sarajevo_City_Hall%2C_Sarajevo%2C_Bosnia_and_Herzegovina.jpg/1280px-Sarajevo_City_Hall%2C_Sarajevo%2C_Bosnia_and_Herzegovina.jpg'
    ],
    coordinates: {
      lat: 43.859,
      lng: 18.435
    },
    historicalFacts: [
      'Built between 1892 and 1894',
      'Designed by Czech architect Karel Pařík',
      'Restored and reopened in 2014 after being destroyed in 1992',
      'Now hosts the National Library of Bosnia and Herzegovina'
    ]
  }
]; 