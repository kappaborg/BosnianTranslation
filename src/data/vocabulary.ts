import { VocabularyWord } from '@/types';

export const vocabularyWords: VocabularyWord[] = [
  // Greetings
  {
    id: '1',
    bosnian: 'zdravo',
    english: 'hello',
    pronunciation: 'ZDRAH-voh',
    category: 'Greetings',
    difficulty: 'beginner',
    context: 'Informal greeting',
    examples: ['Zdravo, kako si?', 'Zdravo svima!'],
    audioUrl: '/audio/zdravo.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '2',
    bosnian: 'dobar dan',
    english: 'good day',
    pronunciation: 'DOH-bahr dahn',
    category: 'Greetings',
    difficulty: 'beginner',
    context: 'Formal greeting',
    examples: ['Dobar dan, gospodine.', 'Dobar dan svima.'],
    audioUrl: '/audio/dobar-dan.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '3',
    bosnian: 'dobro jutro',
    english: 'good morning',
    pronunciation: 'DOH-broh YOO-troh',
    category: 'Greetings',
    difficulty: 'beginner',
    examples: ['Dobro jutro, kako ste spavali?'],
    audioUrl: '/audio/dobro-jutro.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '4',
    bosnian: 'laku noć',
    english: 'good night',
    pronunciation: 'LAH-koo nohch',
    category: 'Greetings',
    difficulty: 'beginner',
    examples: ['Laku noć, slatki snovi.'],
    audioUrl: '/audio/laku-noc.mp3',
    reviewCount: 0,
    successRate: 0
  },

  // Common Phrases
  {
    id: '5',
    bosnian: 'hvala',
    english: 'thank you',
    pronunciation: 'HVAH-lah',
    category: 'Common Phrases',
    difficulty: 'beginner',
    context: 'Expressing gratitude',
    examples: ['Hvala lijepo.', 'Hvala vam puno.'],
    audioUrl: '/audio/hvala.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '6',
    bosnian: 'molim',
    english: 'please/you\'re welcome',
    pronunciation: 'MOH-leem',
    category: 'Common Phrases',
    difficulty: 'beginner',
    context: 'Used for both "please" and "you\'re welcome"',
    examples: ['Molim vas.', 'Hvala! - Molim.'],
    audioUrl: '/audio/molim.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '7',
    bosnian: 'izvinite',
    english: 'excuse me/sorry',
    pronunciation: 'eez-VEE-nee-teh',
    category: 'Common Phrases',
    difficulty: 'beginner',
    context: 'Formal apology or getting attention',
    examples: ['Izvinite, gdje je banka?'],
    audioUrl: '/audio/izvinite.mp3',
    reviewCount: 0,
    successRate: 0
  },

  // Questions
  {
    id: '8',
    bosnian: 'kako si',
    english: 'how are you',
    pronunciation: 'KAH-koh see',
    category: 'Questions',
    difficulty: 'beginner',
    context: 'Informal',
    examples: ['Zdravo, kako si?'],
    audioUrl: '/audio/kako-si.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '9',
    bosnian: 'kako se zoveš',
    english: 'what is your name',
    pronunciation: 'KAH-koh seh ZOH-vesh',
    category: 'Questions',
    difficulty: 'beginner',
    context: 'Informal',
    examples: ['Kako se zoveš? - Zovem se Ana.'],
    audioUrl: '/audio/kako-se-zoves.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '10',
    bosnian: 'odakle si',
    english: 'where are you from',
    pronunciation: 'oh-DAH-kleh see',
    category: 'Questions',
    difficulty: 'beginner',
    examples: ['Odakle si? - Iz Bosne sam.'],
    audioUrl: '/audio/odakle-si.mp3',
    reviewCount: 0,
    successRate: 0
  },

  // Food and Drink
  {
    id: '11',
    bosnian: 'kafa',
    english: 'coffee',
    pronunciation: 'KAH-fah',
    category: 'Food and Drink',
    difficulty: 'beginner',
    context: 'Bosnian coffee is a cultural staple',
    examples: ['Želite li kafu?'],
    audioUrl: '/audio/kafa.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '12',
    bosnian: 'čaj',
    english: 'tea',
    pronunciation: 'chay',
    category: 'Food and Drink',
    difficulty: 'beginner',
    examples: ['Želim čaj s limunom.'],
    audioUrl: '/audio/caj.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '13',
    bosnian: 'voda',
    english: 'water',
    pronunciation: 'VOH-dah',
    category: 'Food and Drink',
    difficulty: 'beginner',
    examples: ['Čašu vode, molim.'],
    audioUrl: '/audio/voda.mp3',
    reviewCount: 0,
    successRate: 0
  },

  // Weather
  {
    id: '14',
    bosnian: 'sunčano',
    english: 'sunny',
    pronunciation: 'SOON-chah-noh',
    category: 'Weather',
    difficulty: 'beginner',
    examples: ['Danas je sunčano.'],
    audioUrl: '/audio/suncano.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '15',
    bosnian: 'kiša',
    english: 'rain',
    pronunciation: 'KEE-shah',
    category: 'Weather',
    difficulty: 'beginner',
    examples: ['Pada kiša.'],
    audioUrl: '/audio/kisa.mp3',
    reviewCount: 0,
    successRate: 0
  },

  // Time
  {
    id: '16',
    bosnian: 'danas',
    english: 'today',
    pronunciation: 'DAH-nahs',
    category: 'Time',
    difficulty: 'beginner',
    examples: ['Šta radiš danas?'],
    audioUrl: '/audio/danas.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '17',
    bosnian: 'sutra',
    english: 'tomorrow',
    pronunciation: 'SOO-trah',
    category: 'Time',
    difficulty: 'beginner',
    examples: ['Vidimo se sutra.'],
    audioUrl: '/audio/sutra.mp3',
    reviewCount: 0,
    successRate: 0
  },

  // Family
  {
    id: '18',
    bosnian: 'majka',
    english: 'mother',
    pronunciation: 'MY-kah',
    category: 'Family',
    difficulty: 'beginner',
    examples: ['Moja majka je učiteljica.'],
    audioUrl: '/audio/majka.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '19',
    bosnian: 'otac',
    english: 'father',
    pronunciation: 'OH-tahts',
    category: 'Family',
    difficulty: 'beginner',
    examples: ['Moj otac radi u banci.'],
    audioUrl: '/audio/otac.mp3',
    reviewCount: 0,
    successRate: 0
  },
  {
    id: '20',
    bosnian: 'sestra',
    english: 'sister',
    pronunciation: 'SEH-strah',
    category: 'Family',
    difficulty: 'beginner',
    examples: ['Imam stariju sestru.'],
    audioUrl: '/audio/sestra.mp3',
    reviewCount: 0,
    successRate: 0
  }
]; 