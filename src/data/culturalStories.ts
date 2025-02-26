export interface Story {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: 'history' | 'tradition' | 'folklore' | 'modern';
  readTime: string;
  quiz?: {
    questions: Array<{
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }>;
  };
}

export const stories: Story[] = [
  {
    id: 'sarajevo-history',
    title: 'The Legend of Sarajevo',
    content: `Sarajevo, known as the "Jerusalem of Europe," has a rich history spanning over 500 years. The city was founded by the Ottoman Empire in the 15th century and has since been a melting pot of cultures, religions, and traditions. The name Sarajevo comes from the Turkish words 'saray' (palace) and 'ovasi' (field), referring to the field around the palace.

    One of the most significant events in Sarajevo's history was the assassination of Archduke Franz Ferdinand in 1914, which sparked World War I. Despite this turbulent past, Sarajevo has always been a symbol of unity and coexistence, where mosques, churches, and synagogues stand side by side.

    The city's resilient spirit was demonstrated during the 1984 Winter Olympics and again during the siege of Sarajevo in the 1990s. Today, Sarajevo stands as a testament to human perseverance and cultural harmony.`,
    imageUrl: '/images/stories/sarajevo.jpg',
    category: 'history',
    readTime: '5 min',
    quiz: {
      questions: [
        {
          question: 'What does the name Sarajevo mean?',
          options: [
            'Holy City',
            'Palace Field',
            'Mountain Valley',
            'River Town'
          ],
          correctAnswer: 1,
          explanation: 'Sarajevo comes from the Turkish words "saray" (palace) and "ovasi" (field), meaning "Palace Field".'
        }
      ]
    }
  },
  {
    id: 'coffee-culture',
    title: 'Bosnian Coffee Culture',
    content: `Bosnian coffee (Bosanska kafa) is more than just a beverage; it's a cultural ritual that has been practiced for centuries. Unlike Turkish coffee, Bosnian coffee has its own distinct preparation method and serving customs.

    The coffee is served in a traditional copper-plated pot called a džezva, accompanied by a small ceramic cup (fildžan), sugar cubes, and rahat lokum (Turkish delight). The ritual of preparing and serving Bosnian coffee is an essential part of social gatherings and hospitality.

    When drinking Bosnian coffee, it's customary to dip a sugar cube in the coffee first, take a bite, and then sip the coffee. This creates a unique taste experience that is distinctly Bosnian.`,
    imageUrl: '/images/stories/coffee.jpg',
    category: 'tradition',
    readTime: '4 min',
    quiz: {
      questions: [
        {
          question: 'What is the traditional Bosnian coffee pot called?',
          options: [
            'Fildžan',
            'Džezva',
            'Kahva',
            'Lokum'
          ],
          correctAnswer: 1,
          explanation: 'A džezva is the traditional copper-plated pot used to prepare Bosnian coffee.'
        }
      ]
    }
  },
  {
    id: 'drina-bridge',
    title: 'The Tale of Drina Bridge',
    content: `The famous bridge on the Drina River in Višegrad is not just an architectural marvel but also a symbol of Bosnia's complex history. Built in the 16th century during the Ottoman Empire, the bridge was commissioned by Grand Vizier Mehmed Paša Sokolović.

    The bridge's construction is surrounded by legends and was immortalized in Ivo Andrić's Nobel Prize-winning novel "The Bridge on the Drina." The most famous legend tells of the sacrifice of two babies who were built into the bridge's central pillars to appease the river spirit and ensure the bridge's stability.

    Today, the bridge stands as a UNESCO World Heritage site and continues to connect people across the Drina River, just as it has done for over 400 years.`,
    imageUrl: '/images/stories/drina-bridge.jpg',
    category: 'folklore',
    readTime: '6 min',
    quiz: {
      questions: [
        {
          question: 'Who commissioned the building of the Drina Bridge?',
          options: [
            'Ivo Andrić',
            'Sultan Suleiman',
            'Mehmed Paša Sokolović',
            'King Tvrtko'
          ],
          correctAnswer: 2,
          explanation: 'The bridge was commissioned by Grand Vizier Mehmed Paša Sokolović in the 16th century.'
        }
      ]
    }
  },
  {
    id: 'modern-art',
    title: 'Modern Bosnian Art Scene',
    content: `Bosnia's contemporary art scene is vibrant and dynamic, reflecting both traditional influences and modern perspectives. The Ars Aevi Museum in Sarajevo houses one of the most important collections of contemporary art in Southeast Europe.

    Young Bosnian artists are making waves internationally, combining traditional motifs with contemporary techniques. Street art and murals have become particularly significant in urban areas, often addressing themes of peace, reconciliation, and cultural identity.

    Annual events like the Sarajevo Film Festival and various art biennials have put Bosnia on the global cultural map, attracting artists and audiences from around the world.`,
    imageUrl: '/images/stories/modern-art.jpg',
    category: 'modern',
    readTime: '3 min',
    quiz: {
      questions: [
        {
          question: 'Which museum houses an important collection of contemporary art in Sarajevo?',
          options: [
            'National Museum',
            'Ars Aevi Museum',
            'History Museum',
            'Olympic Museum'
          ],
          correctAnswer: 1,
          explanation: 'The Ars Aevi Museum in Sarajevo houses one of the most important collections of contemporary art in Southeast Europe.'
        }
      ]
    }
  }
]; 