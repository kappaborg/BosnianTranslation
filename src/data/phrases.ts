export interface Phrase {
  english: string;
  bosnian: string;
  chinese: string;
  pronunciation: string;
  context: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export const categories = [
  'greetings',
  'basics',
  'numbers',
  'food',
  'travel',
  'shopping',
  'family',
  'emergency',
  'weather',
  'time'
] as const;

export const phrases: Phrase[] = [
  // Greetings
  {
    english: "Hello",
    bosnian: "Zdravo",
    chinese: "你好",
    pronunciation: "ZDRAH-voh",
    context: "Informal greeting",
    category: "greetings",
    difficulty: "beginner"
  },
  {
    english: "Good morning",
    bosnian: "Dobro jutro",
    chinese: "早上好",
    pronunciation: "DOH-broh YOO-troh",
    context: "Morning greeting",
    category: "greetings",
    difficulty: "beginner"
  },
  {
    english: "Good evening",
    bosnian: "Dobro veče",
    chinese: "晚上好",
    pronunciation: "DOH-broh VEH-cheh",
    context: "Evening greeting",
    category: "greetings",
    difficulty: "beginner"
  },
  
  // Numbers
  {
    english: "One",
    bosnian: "Jedan",
    chinese: "一",
    pronunciation: "YEH-dahn",
    context: "Cardinal number",
    category: "numbers",
    difficulty: "beginner"
  },
  {
    english: "Two",
    bosnian: "Dva",
    chinese: "二",
    pronunciation: "dvah",
    context: "Cardinal number",
    category: "numbers",
    difficulty: "beginner"
  },
  
  // Food
  {
    english: "Restaurant",
    bosnian: "Restoran",
    chinese: "餐厅",
    pronunciation: "reh-stoh-RAHN",
    context: "Dining out",
    category: "food",
    difficulty: "beginner"
  },
  {
    english: "Coffee",
    bosnian: "Kafa",
    chinese: "咖啡",
    pronunciation: "KAH-fah",
    context: "Beverages",
    category: "food",
    difficulty: "beginner"
  },
  
  // Travel
  {
    english: "Where is the bus station?",
    bosnian: "Gdje je autobuska stanica?",
    chinese: "公交车站在哪里？",
    pronunciation: "g-DYEH yeh ow-toh-BOO-ska STAH-nee-tsa",
    context: "Asking for directions",
    category: "travel",
    difficulty: "intermediate"
  },
  {
    english: "Hotel",
    bosnian: "Hotel",
    chinese: "酒店",
    pronunciation: "hoh-TEHL",
    context: "Accommodation",
    category: "travel",
    difficulty: "beginner"
  },
  
  // Shopping
  {
    english: "How much does it cost?",
    bosnian: "Koliko košta?",
    chinese: "多少钱？",
    pronunciation: "KOH-lee-koh KOH-shtah",
    context: "Asking for price",
    category: "shopping",
    difficulty: "beginner"
  },
  {
    english: "Too expensive",
    bosnian: "Preskupo",
    chinese: "太贵了",
    pronunciation: "preh-SKOO-poh",
    context: "Negotiating price",
    category: "shopping",
    difficulty: "intermediate"
  },
  
  // Family
  {
    english: "Mother",
    bosnian: "Majka",
    chinese: "妈妈",
    pronunciation: "MY-kah",
    context: "Family members",
    category: "family",
    difficulty: "beginner"
  },
  {
    english: "Father",
    bosnian: "Otac",
    chinese: "爸爸",
    pronunciation: "OH-tats",
    context: "Family members",
    category: "family",
    difficulty: "beginner"
  },
  
  // Emergency
  {
    english: "Help!",
    bosnian: "Upomoć!",
    chinese: "救命！",
    pronunciation: "oo-POH-moch",
    context: "Emergency situation",
    category: "emergency",
    difficulty: "beginner"
  },
  {
    english: "I need a doctor",
    bosnian: "Treba mi doktor",
    chinese: "我需要医生",
    pronunciation: "TREH-bah mee DOK-tor",
    context: "Medical emergency",
    category: "emergency",
    difficulty: "intermediate"
  },
  
  // Weather
  {
    english: "It's sunny",
    bosnian: "Sunčano je",
    chinese: "天气晴朗",
    pronunciation: "SOON-chah-noh yeh",
    context: "Weather description",
    category: "weather",
    difficulty: "beginner"
  },
  {
    english: "It's raining",
    bosnian: "Pada kiša",
    chinese: "下雨了",
    pronunciation: "PAH-dah KEE-shah",
    context: "Weather description",
    category: "weather",
    difficulty: "beginner"
  },
  
  // Time
  {
    english: "What time is it?",
    bosnian: "Koliko je sati?",
    chinese: "几点了？",
    pronunciation: "KOH-lee-koh yeh SAH-tee",
    context: "Asking for time",
    category: "time",
    difficulty: "beginner"
  },
  {
    english: "Today",
    bosnian: "Danas",
    chinese: "今天",
    pronunciation: "DAH-nahs",
    context: "Time reference",
    category: "time",
    difficulty: "beginner"
  }
]; 