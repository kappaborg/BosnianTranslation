export interface TourLocation {
  id: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  locationType: 'bridge' | 'spring' | 'fortress' | 'waterfall' | 'monastery' | 'bazaar';
  images: {
    gallery: string[];
    panorama: string;
  };
  historicalInfo: string;
  culturalSignificance: string;
  visitingHours: string;
  admissionFee: string;
  tips: string[];
}

export const tourLocations: TourLocation[] = [
  {
    id: 'mostar',
    name: 'Stari Most (Old Bridge)',
    description: 'Iconic 16th-century bridge listed as a UNESCO World Heritage site.',
    coordinates: {
      lat: 43.337,
      lng: 17.815
    },
    locationType: 'bridge',
    images: {
      gallery: [
        '/images/tours/mostar/gallery/1.jpg',
        '/images/tours/mostar/gallery/2.jpg',
        '/images/tours/mostar/gallery/3.jpg',
        '/images/tours/mostar/gallery/4.jpg'
      ],
      panorama: '/images/tours/mostar/360/panorama.jpg'
    },
    historicalInfo: 'Built in 1566 during the Ottoman period, the Old Bridge stood for 427 years until it was destroyed in 1993 during the Bosnian War. It was reconstructed and reopened in 2004, becoming a symbol of reconciliation and international cooperation.',
    culturalSignificance: 'The bridge is considered one of the finest examples of Islamic architecture in the Balkans and has been a UNESCO World Heritage site since 2005. It\'s also famous for its traditional diving competitions where local divers jump from the bridge into the Neretva River.',
    visitingHours: 'Open 24/7, but best visited during daylight hours. Sunset offers particularly stunning views.',
    admissionFee: 'Free to walk across the bridge. There is a small fee (around 5 KM) to visit the bridge museum.',
    tips: [
      'Visit early morning or late afternoon to avoid crowds',
      'Watch local divers perform their traditional jumps',
      'Visit the Old Bridge Museum to learn about its history',
      'Wear comfortable shoes as the bridge surface can be slippery',
      'Take a boat tour under the bridge for unique photo opportunities'
    ]
  },
  {
    id: 'bascarsija',
    name: 'Baščaršija',
    description: 'Sarajevo\'s old bazaar and the historical and cultural center of the city. Built in the 15th century, it is a well-preserved example of oriental architecture.',
    coordinates: {
      lat: 43.859907,
      lng: 18.431502
    },
    locationType: 'bazaar',
    images: {
      gallery: [
        '/images/tours/bascarsija/gallery/1.jpg',
        '/images/tours/bascarsija/gallery/2.jpg',
        '/images/tours/bascarsija/gallery/3.jpg',
        '/images/tours/bascarsija/gallery/4.jpg'
      ],
      panorama: '/images/tours/bascarsija/360/panorama.jpg'
    },
    historicalInfo: 'Founded in 1462 by Isa-beg Isaković, Baščaršija was Sarajevo\'s main trading center during Ottoman rule. The name \'Baščaršija\' comes from the Turkish words \'baş\' (head or main) and \'çarşı\' (bazaar or market).',
    culturalSignificance: 'As the historical, cultural, and economic heart of Sarajevo, Baščaršija represents the city\'s Ottoman heritage and multicultural spirit. The area is famous for its unique architectural style, traditional crafts, and the iconic Sebilj wooden fountain.',
    visitingHours: 'Shops and restaurants are typically open from 8:00 AM to 11:00 PM. The area is accessible 24/7.',
    admissionFee: 'Free to explore. Individual shops and museums may have their own entrance fees.',
    tips: [
      'Visit the Sebilj fountain and feed the pigeons',
      'Try traditional Bosnian coffee and sweets',
      'Shop for authentic copper crafts and souvenirs',
      'Visit the Gazi Husrev-beg Mosque and Madrasa',
      'Take an evening stroll to experience the vibrant atmosphere'
    ]
  },
  {
    id: 'vrelo-bosne',
    name: 'Vrelo Bosne (Spring of Bosna)',
    description: 'Natural park and source of the Bosna River located in the southwestern part of Sarajevo.',
    coordinates: {
      lat: 43.823,
      lng: 18.269
    },
    locationType: 'spring',
    images: {
      gallery: [
        '/images/tours/vrelo-bosne/gallery/1.jpg',
        '/images/tours/vrelo-bosne/gallery/2.jpg',
        '/images/tours/vrelo-bosne/gallery/3.jpg',
        '/images/tours/vrelo-bosne/gallery/4.jpg'
      ],
      panorama: '/images/tours/vrelo-bosne/360/panorama.jpg'
    },
    historicalInfo: 'The springs have been a source of water for Sarajevo since Roman times and were particularly developed during the Austro-Hungarian period. The area was first mentioned in documents from the 16th century and became a popular recreational spot during the Austro-Hungarian rule in the late 19th century.',
    culturalSignificance: 'Vrelo Bosne represents the natural heritage of Bosnia and Herzegovina and serves as a symbol of environmental preservation. The park features traditional horse-drawn carriage rides along the Grande Allee, a 3.5 km tree-lined avenue leading to the springs.',
    visitingHours: 'Open daily from 7:00 AM to 11:00 PM. Best visited during spring and early summer when the vegetation is lush.',
    admissionFee: 'Park entrance: 2 KM per person. Horse-drawn carriage ride: 20-30 KM round trip.',
    tips: [
      'Take a traditional horse-drawn carriage ride through the Grande Allee',
      'Visit early morning to avoid crowds and enjoy the peaceful atmosphere',
      'Bring a camera to capture the crystal-clear springs and wildlife',
      'Pack a picnic to enjoy in the designated areas',
      'Wear comfortable walking shoes as there are many paths to explore',
      'Visit the mini zoo and feed the ducks and swans',
      'Try the local restaurants near the springs for traditional Bosnian cuisine'
    ]
  },
  {
    id: 'travnik',
    name: 'Travnik Fortress',
    description: 'Impressive medieval fortress and historic Ottoman city.',
    coordinates: {
      lat: 44.226,
      lng: 17.667
    },
    locationType: 'fortress',
    images: {
      gallery: [
        '/images/tours/travnik/gallery/1.jpg',
        '/images/tours/travnik/gallery/2.jpg',
        '/images/tours/travnik/gallery/3.jpg',
        '/images/tours/travnik/gallery/4.jpg'
      ],
      panorama: '/images/tours/travnik/360/panorama.jpg'
    },
    historicalInfo: 'Travnik served as the capital of the Ottoman province of Bosnia from 1699 to 1850 and was home to 77 Bosnian viziers. The city\'s fortress, dating back to medieval times, was expanded during Ottoman rule and played a crucial role in defending central Bosnia. The town gained additional significance as the birthplace of Nobel Prize-winning author Ivo Andrić.',
    culturalSignificance: 'Known for its unique architectural heritage that blends Ottoman and Austro-Hungarian styles, Travnik represents a crossroads of Eastern and Western influences. The city is famous for its traditional crafts, including the renowned Travnik cheese, and its historical role as an administrative and cultural center during Ottoman rule.',
    visitingHours: 'Fortress: 9:00 AM - 10:00 PM (summer), 9:00 AM - 5:00 PM (winter). Museums and historical sites: 10:00 AM - 6:00 PM (Tuesday-Sunday).',
    admissionFee: 'Fortress: 5 KM, Ivo Andrić Museum: 3 KM, Combined ticket: 7 KM.',
    tips: [
      'Start your visit at the medieval fortress for panoramic views of the city',
      'Visit the birth house of Nobel laureate Ivo Andrić',
      'Try the famous Travnik cheese and ćevapi at local restaurants',
      'Explore the Ottoman-era mosques, particularly the colorful Sulejmanija Mosque',
      'Take a walking tour of the old town to see traditional architecture',
      'Visit the Two Clocks Tower, a unique symbol of the city',
      'Stop by the Plava Voda (Blue Water) spring for a refreshing break'
    ]
  },
  {
    id: 'jajce',
    name: 'Jajce Waterfall',
    description: 'Impressive waterfall where the Pliva River drops 21 meters in the historic city center.',
    coordinates: {
      lat: 44.342,
      lng: 17.271
    },
    locationType: 'waterfall',
    images: {
      gallery: [
        '/images/tours/jajce/gallery/1.jpg',
        '/images/tours/jajce/gallery/2.jpg',
        '/images/tours/jajce/gallery/3.jpg',
        '/images/tours/jajce/gallery/4.jpg'
      ],
      panorama: '/images/tours/jajce/360/panorama.jpg'
    },
    historicalInfo: 'Founded in the 14th century, Jajce was the last Bosnian royal city and the place where the medieval Bosnian kingdom fell to the Ottoman Empire in 1463.',
    culturalSignificance: 'Known for its unique waterfall in the city center and the AVNOJ museum, marking the foundation of Yugoslavia.',
    visitingHours: 'Waterfall viewpoint: 8:00 AM - 8:00 PM',
    admissionFee: 'Waterfall and fortress combined ticket: 5 KM',
    tips: [
      'Visit the Pliva Waterfall',
      'Explore the ancient catacombs',
      'See the AVNOJ building',
      'Visit the medieval fortress',
      'Take a boat ride on the Pliva Lakes',
      'Try local trout specialties',
      'Visit during sunset for the best waterfall photos'
    ]
  },
  {
    id: 'blagaj',
    name: 'Blagaj Tekke',
    description: 'A 16th-century Dervish monastery located at the source of the Buna River.',
    coordinates: {
      lat: 43.256,
      lng: 17.885
    },
    locationType: 'monastery',
    images: {
      gallery: [
        '/images/tours/blagaj/gallery/1.jpg',
        '/images/tours/blagaj/gallery/2.jpg',
        '/images/tours/blagaj/gallery/3.jpg',
        '/images/tours/blagaj/gallery/4.jpg'
      ],
      panorama: '/images/tours/blagaj/360/panorama.jpg'
    },
    historicalInfo: 'The tekke was built in the 16th century and has been a center of Sufi spiritual practice for centuries.',
    culturalSignificance: 'Represents the meeting of Ottoman architecture with the natural beauty of Herzegovina, and the spiritual heritage of Sufism in Bosnia.',
    visitingHours: '9:00 AM - 7:00 PM (summer), 9:00 AM - 4:00 PM (winter)',
    admissionFee: 'Entrance fee: 4 KM, Boat ride to the source: 12 KM per person',
    tips: [
      'Respect the dress code when entering the tekke',
      'Try fresh fish from the Buna river',
      'Take a boat ride to the source of the river',
      'Visit during spring when the surroundings are most beautiful',
      'Bring a camera for stunning cliff and monastery photos',
      'Try traditional Bosnian coffee at the riverside restaurants',
      'Consider visiting early morning to avoid tourist crowds'
    ]
  }
];
