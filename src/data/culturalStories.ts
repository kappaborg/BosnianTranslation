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
    content: `Sarajevo, the capital of Bosnia and Herzegovina, has a rich history dating back to prehistoric times. The city's modern history began in the 15th century when the Ottoman governor Isa-beg Isaković transformed a small village into a city. The name Sarajevo comes from the Turkish words 'saray' (palace) and 'ovasi' (field).

The city grew rapidly as a major trading center and cultural hub, known for its religious diversity and tolerance. It was often called the 'Jerusalem of Europe' due to the peaceful coexistence of Muslims, Christians, and Jews.

In 1914, Sarajevo became the site of a pivotal moment in world history when Archduke Franz Ferdinand was assassinated, triggering World War I. Throughout its history, the city has demonstrated remarkable resilience, surviving various conflicts and emerging stronger each time.`,
    imageUrl: '/images/stories/sarajevo.jpg',
    category: 'history',
    readTime: '5 min',
    quiz: {
      questions: [
        {
          question: 'Who founded modern Sarajevo?',
          options: ['Isa-beg Isaković', 'Franz Ferdinand', 'Gazi Husrev-beg', 'Tvrtko I'],
          correctAnswer: 0,
          explanation: 'Isa-beg Isaković, an Ottoman governor, founded modern Sarajevo in the 15th century.'
        },
        {
          question: 'What does the name Sarajevo mean?',
          options: ['Holy City', 'Palace Field', 'River Town', 'Mountain Valley'],
          correctAnswer: 1,
          explanation: 'Sarajevo comes from the Turkish words "saray" (palace) and "ovasi" (field).'
        }
      ]
    }
  },
  {
    id: 'coffee-culture',
    title: 'Bosnian Coffee Culture',
    content: `Bosnian coffee (Bosanska kafa) is more than just a beverage; it's a cultural institution and a daily ritual that brings people together. The tradition dates back to the Ottoman period and has become an integral part of Bosnian identity.

The preparation of Bosnian coffee is an art form, requiring specific tools and techniques. The coffee is served in a džezva (a special copper-plated pot) alongside rahat lokum (Turkish delight), sugar cubes, and a glass of water.

The ritual of drinking Bosnian coffee is a social event, often lasting for hours as people engage in conversation, known as "sijelo" or "muhabbet". It's considered impolite to rush through your coffee, as the experience is meant to be savored and enjoyed.`,
    imageUrl: '/images/stories/coffee.jpg',
    category: 'tradition',
    readTime: '4 min',
    quiz: {
      questions: [
        {
          question: 'What is the traditional pot used for making Bosnian coffee called?',
          options: ['Džezva', 'Ibrik', 'Cezve', 'Fildžan'],
          correctAnswer: 0,
          explanation: 'A džezva is the traditional copper-plated pot used for preparing Bosnian coffee.'
        },
        {
          question: 'What is typically served alongside Bosnian coffee?',
          options: ['Chocolate', 'Baklava', 'Rahat lokum', 'Cookies'],
          correctAnswer: 2,
          explanation: 'Rahat lokum (Turkish delight) is traditionally served with Bosnian coffee.'
        }
      ]
    }
  },
  {
    id: 'drina-bridge',
    title: 'The Tale of Drina Bridge',
    content: `The famous bridge on the Drina River in Višegrad is not just an architectural marvel but a symbol of connection between different cultures and peoples. Built in the 16th century during the height of the Ottoman Empire, the bridge was commissioned by Grand Vizier Mehmed Paša Sokolović.

The bridge's construction is surrounded by fascinating legends and was immortalized in Ivo Andrić's Nobel Prize-winning novel "The Bridge on the Drina". The bridge has 11 arches spanning the emerald waters of the Drina River.

Despite numerous conflicts and natural disasters, the bridge has stood the test of time, becoming a UNESCO World Heritage site in 2007. It continues to serve as both a functional crossing and a testament to the region's rich history.`,
    imageUrl: '/images/stories/drina-bridge.jpg',
    category: 'folklore',
    readTime: '6 min',
    quiz: {
      questions: [
        {
          question: 'Who commissioned the Bridge on the Drina?',
          options: ['Ivo Andrić', 'Mehmed Paša Sokolović', 'Suleiman the Magnificent', 'Mimar Sinan'],
          correctAnswer: 1,
          explanation: 'The bridge was commissioned by Grand Vizier Mehmed Paša Sokolović in the 16th century.'
        },
        {
          question: 'When did the Bridge on the Drina become a UNESCO World Heritage site?',
          options: ['2000', '2003', '2007', '2010'],
          correctAnswer: 2,
          explanation: 'The Bridge on the Drina was designated as a UNESCO World Heritage site in 2007.'
        }
      ]
    }
  },
  {
    id: 'modern-art',
    title: 'Modern Bosnian Art Scene',
    content: `Bosnia's contemporary art scene is vibrant and dynamic, reflecting both traditional influences and modern perspectives. The capital, Sarajevo, hosts numerous galleries and annual events that showcase local and international artists.

The Ars Aevi Museum of Contemporary Art, established during the siege of Sarajevo, has become a symbol of cultural resistance and renaissance. The collection includes works from renowned artists worldwide who donated their pieces in solidarity with the city.

Street art and public installations have also become prominent features of urban spaces, with artists using their work to address social issues and preserve historical memory. The annual Sarajevo Film Festival has emerged as one of the largest cultural events in Southeast Europe.`,
    imageUrl: '/images/stories/modern-art.jpg',
    category: 'modern',
    readTime: '4 min',
    quiz: {
      questions: [
        {
          question: 'Which museum was established during the siege of Sarajevo?',
          options: ['National Museum', 'Ars Aevi Museum', 'History Museum', 'Olympic Museum'],
          correctAnswer: 1,
          explanation: 'The Ars Aevi Museum of Contemporary Art was established during the siege of Sarajevo.'
        },
        {
          question: 'What is one of the largest cultural events in Southeast Europe?',
          options: ['Sarajevo Film Festival', 'MESS Theatre Festival', 'Jazz Fest Sarajevo', 'Baščaršija Nights'],
          correctAnswer: 0,
          explanation: 'The Sarajevo Film Festival has become one of the largest cultural events in Southeast Europe.'
        }
      ]
    }
  }
]; 