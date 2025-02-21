export const vocabularyCategories = {
  greetings: [
    { bosnian: 'Zdravo', english: 'Hello', context: 'Informal greeting' },
    { bosnian: 'Dobar dan', english: 'Good day', context: 'Formal greeting' },
    { bosnian: 'Dobro jutro', english: 'Good morning', context: 'Morning greeting' },
    { bosnian: 'Dobra večer', english: 'Good evening', context: 'Evening greeting' },
    { bosnian: 'Laku noć', english: 'Good night', context: 'Night greeting' },
    { bosnian: 'Doviđenja', english: 'Goodbye', context: 'Formal farewell' },
    { bosnian: 'Ćao', english: 'Hi/Bye', context: 'Very informal greeting/farewell' },
    { bosnian: 'Kako si?', english: 'How are you?', context: 'Informal inquiry' },
    { bosnian: 'Kako ste?', english: 'How are you?', context: 'Formal inquiry' },
    { bosnian: 'Drago mi je', english: 'Nice to meet you', context: 'First meeting' },
  ],
  basics: [
    { bosnian: 'Da', english: 'Yes', context: 'Basic affirmation' },
    { bosnian: 'Ne', english: 'No', context: 'Basic negation' },
    { bosnian: 'Molim', english: 'Please', context: 'Polite request' },
    { bosnian: 'Hvala', english: 'Thank you', context: 'Gratitude' },
    { bosnian: 'Izvinite', english: 'Excuse me', context: 'Polite interruption' },
    { bosnian: 'Nema na čemu', english: "You're welcome", context: 'Response to thanks' },
    { bosnian: 'Razumijem', english: 'I understand', context: 'Comprehension' },
    { bosnian: 'Ne razumijem', english: "I don't understand", context: 'Lack of comprehension' },
    { bosnian: 'Gdje?', english: 'Where?', context: 'Basic question' },
    { bosnian: 'Kada?', english: 'When?', context: 'Basic question' },
  ],
  numbers: [
    { bosnian: 'Jedan', english: 'One', context: 'Cardinal number' },
    { bosnian: 'Dva', english: 'Two', context: 'Cardinal number' },
    { bosnian: 'Tri', english: 'Three', context: 'Cardinal number' },
    { bosnian: 'Četiri', english: 'Four', context: 'Cardinal number' },
    { bosnian: 'Pet', english: 'Five', context: 'Cardinal number' },
    { bosnian: 'Šest', english: 'Six', context: 'Cardinal number' },
    { bosnian: 'Sedam', english: 'Seven', context: 'Cardinal number' },
    { bosnian: 'Osam', english: 'Eight', context: 'Cardinal number' },
    { bosnian: 'Devet', english: 'Nine', context: 'Cardinal number' },
    { bosnian: 'Deset', english: 'Ten', context: 'Cardinal number' },
  ],
  family: [
    { bosnian: 'Majka', english: 'Mother', context: 'Family member' },
    { bosnian: 'Otac', english: 'Father', context: 'Family member' },
    { bosnian: 'Sestra', english: 'Sister', context: 'Family member' },
    { bosnian: 'Brat', english: 'Brother', context: 'Family member' },
    { bosnian: 'Djed', english: 'Grandfather', context: 'Family member' },
    { bosnian: 'Nana', english: 'Grandmother', context: 'Family member' },
    { bosnian: 'Tetka', english: 'Aunt', context: 'Family member' },
    { bosnian: 'Amidža', english: 'Uncle', context: 'Family member' },
    { bosnian: 'Rođak', english: 'Cousin', context: 'Family member' },
    { bosnian: 'Porodica', english: 'Family', context: 'Family member' },
  ],
  food: [
    { bosnian: 'Hljeb', english: 'Bread', context: 'Basic food' },
    { bosnian: 'Mlijeko', english: 'Milk', context: 'Dairy' },
    { bosnian: 'Sir', english: 'Cheese', context: 'Dairy' },
    { bosnian: 'Meso', english: 'Meat', context: 'Protein' },
    { bosnian: 'Riba', english: 'Fish', context: 'Seafood' },
    { bosnian: 'Voće', english: 'Fruit', context: 'Produce' },
    { bosnian: 'Povrće', english: 'Vegetables', context: 'Produce' },
    { bosnian: 'Kafa', english: 'Coffee', context: 'Beverage' },
    { bosnian: 'Čaj', english: 'Tea', context: 'Beverage' },
    { bosnian: 'Voda', english: 'Water', context: 'Beverage' },
  ],
  places: [
    { bosnian: 'Kuća', english: 'House', context: 'Building' },
    { bosnian: 'Škola', english: 'School', context: 'Building' },
    { bosnian: 'Bolnica', english: 'Hospital', context: 'Building' },
    { bosnian: 'Prodavnica', english: 'Store', context: 'Shopping' },
    { bosnian: 'Pijaca', english: 'Market', context: 'Shopping' },
    { bosnian: 'Park', english: 'Park', context: 'Recreation' },
    { bosnian: 'Restoran', english: 'Restaurant', context: 'Dining' },
    { bosnian: 'Kafana', english: 'Traditional restaurant/café', context: 'Dining' },
    { bosnian: 'Biblioteka', english: 'Library', context: 'Education' },
    { bosnian: 'Muzej', english: 'Museum', context: 'Culture' },
  ],
};

export const grammarLessons = [
  {
    title: 'Present Tense',
    explanation: 'The present tense in Bosnian is used to describe current actions and states.',
    examples: [
      { bosnian: 'Ja čitam knjigu', english: 'I am reading a book', explanation: 'First person singular' },
      { bosnian: 'Ti piješ vodu', english: 'You are drinking water', explanation: 'Second person singular' },
      { bosnian: 'On/Ona radi', english: 'He/She works', explanation: 'Third person singular' },
      { bosnian: 'Mi učimo', english: 'We are learning', explanation: 'First person plural' },
      { bosnian: 'Vi pišete', english: 'You are writing', explanation: 'Second person plural' },
      { bosnian: 'Oni/One govore', english: 'They speak', explanation: 'Third person plural' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Complete the sentence: "Ja ___ kafu." (I drink coffee)',
        options: ['pijem', 'piješ', 'pije'],
        correctAnswer: 'pijem',
      },
      {
        type: 'fill-in',
        question: 'Write the correct form of "raditi" (to work) for "mi" (we)',
        correctAnswer: 'radimo',
      },
    ],
  },
  {
    title: 'Cases - Nominative',
    explanation: 'The nominative case is used for the subject of a sentence.',
    examples: [
      { bosnian: 'Knjiga je na stolu', english: 'The book is on the table', explanation: 'Nominative case' },
      { bosnian: 'Mačka spava', english: 'The cat is sleeping', explanation: 'Nominative case' },
      { bosnian: 'Dječak trči', english: 'The boy is running', explanation: 'Nominative case' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Which form is in nominative case?',
        options: ['knjigu', 'knjiga', 'knjizi'],
        correctAnswer: 'knjiga',
      },
    ],
  },
  {
    title: 'Past Tense',
    explanation: 'The past tense in Bosnian is formed using the past participle and auxiliary verb "biti" (to be).',
    examples: [
      { bosnian: 'Ja sam radio', english: 'I worked/was working', explanation: 'First person singular masculine' },
      { bosnian: 'Ti si čitala', english: 'You read/were reading', explanation: 'Second person singular feminine' },
      { bosnian: 'On je pisao', english: 'He wrote/was writing', explanation: 'Third person singular masculine' },
    ],
    exercises: [
      {
        type: 'multiple-choice',
        question: 'Complete: "Mi ___ učili." (We were learning)',
        options: ['smo', 'su', 'sam'],
        correctAnswer: 'smo',
      },
    ],
  },
];

export const culturalContent = [
  {
    title: 'Traditional Coffee Culture',
    type: 'tradition',
    content: 'Bosnian coffee (bosanska kafa) is more than just a beverage - it\'s a social ritual that brings people together. Served in a traditional copper pot (džezva) with small cups (fildžani), the coffee is prepared and enjoyed slowly, often accompanied by lokum (Turkish delight) and engaging conversation.',
    mediaUrls: [],
    tags: ['coffee', 'tradition', 'social customs'],
    relatedVocabulary: [
      { bosnian: 'Džezva', english: 'Traditional coffee pot', context: 'Coffee culture' },
      { bosnian: 'Fildžan', english: 'Small coffee cup', context: 'Coffee culture' },
      { bosnian: 'Lokum', english: 'Turkish delight', context: 'Sweets' },
    ],
  },
  {
    title: 'Sevdalinka Music',
    type: 'music',
    content: 'Sevdalinka is a traditional genre of folk music from Bosnia and Herzegovina, characterized by emotional love songs and complex melodies. These songs often tell stories of love, longing, and life in Bosnia\'s cities and towns.',
    mediaUrls: [],
    tags: ['music', 'tradition', 'folk'],
    relatedVocabulary: [
      { bosnian: 'Pjesma', english: 'Song', context: 'Music' },
      { bosnian: 'Sevdah', english: 'Love, longing', context: 'Emotions' },
      { bosnian: 'Muzika', english: 'Music', context: 'Arts' },
    ],
  },
  {
    title: 'Traditional Cuisine',
    type: 'food',
    content: 'Bosnian cuisine is a delightful mix of Eastern and Western influences. Famous dishes include ćevapi (grilled meat), burek (meat pie), and bosanski lonac (Bosnian pot stew). The cuisine emphasizes fresh ingredients and slow cooking methods.',
    mediaUrls: [],
    tags: ['food', 'tradition', 'cuisine'],
    relatedVocabulary: [
      { bosnian: 'Ćevapi', english: 'Grilled meat rolls', context: 'Food' },
      { bosnian: 'Burek', english: 'Meat pie', context: 'Food' },
      { bosnian: 'Pita', english: 'Traditional pie', context: 'Food' },
    ],
  },
];

export const quizQuestions = [
  {
    category: 'Vocabulary',
    questions: [
      {
        question: 'What does "hvala" mean?',
        options: ['Hello', 'Thank you', 'Please', 'Goodbye'],
        correctAnswer: 'Thank you',
        difficulty: 'beginner',
      },
      {
        question: 'Which word means "water" in Bosnian?',
        options: ['hljeb', 'voda', 'mlijeko', 'sok'],
        correctAnswer: 'voda',
        difficulty: 'beginner',
      },
      {
        question: 'What is "knjiga" in English?',
        options: ['pen', 'paper', 'book', 'notebook'],
        correctAnswer: 'book',
        difficulty: 'beginner',
      },
      {
        question: 'Choose the correct translation for "good morning"',
        options: ['dobro veče', 'dobro jutro', 'dobar dan', 'laku noć'],
        correctAnswer: 'dobro jutro',
        difficulty: 'beginner',
      },
    ],
  },
  {
    category: 'Grammar',
    questions: [
      {
        question: 'Which is the correct form of "to be" for "ja" (I)?',
        options: ['sam', 'si', 'je', 'su'],
        correctAnswer: 'sam',
        difficulty: 'beginner',
      },
      {
        question: 'What is the plural form of "knjiga" (book)?',
        options: ['knjige', 'knjigu', 'knjizi', 'knjigama'],
        correctAnswer: 'knjige',
        difficulty: 'beginner',
      },
      {
        question: 'Choose the correct verb form: "Mi ___ učimo" (We are learning)',
        options: ['sam', 'si', 'je', ''],
        correctAnswer: '',
        difficulty: 'beginner',
      },
      {
        question: 'Which pronoun is used for "they" in Bosnian?',
        options: ['mi', 'vi', 'oni', 'on'],
        correctAnswer: 'oni',
        difficulty: 'beginner',
      },
    ],
  },
  {
    category: 'Culture',
    questions: [
      {
        question: 'What is "bosanska kafa"?',
        options: ['Turkish coffee', 'Espresso', 'Instant coffee', 'Bosnian-style coffee'],
        correctAnswer: 'Bosnian-style coffee',
        difficulty: 'beginner',
      },
      {
        question: 'What is a "džezva" used for?',
        options: ['Serving soup', 'Making coffee', 'Cooking stew', 'Baking bread'],
        correctAnswer: 'Making coffee',
        difficulty: 'beginner',
      },
      {
        question: 'What type of music is Sevdalinka?',
        options: ['Rock', 'Folk', 'Pop', 'Classical'],
        correctAnswer: 'Folk',
        difficulty: 'beginner',
      },
      {
        question: 'What is "burek"?',
        options: ['Soup', 'Salad', 'Meat pie', 'Dessert'],
        correctAnswer: 'Meat pie',
        difficulty: 'beginner',
      },
    ],
  },
];

export const practiceDialogues = [
  {
    title: 'At the Café',
    context: 'Ordering coffee and snacks',
    exchanges: [
      {
        speaker: 'Customer',
        bosnian: 'Dobar dan, želio bih jednu kafu, molim.',
        english: 'Good day, I would like one coffee, please.',
      },
      {
        speaker: 'Waiter',
        bosnian: 'Kako želite kafu?',
        english: 'How would you like your coffee?',
      },
      {
        speaker: 'Customer',
        bosnian: 'Sa mlijekom, bez šećera.',
        english: 'With milk, without sugar.',
      },
    ],
    vocabulary: [
      {
        word: 'kafa',
        translation: 'coffee',
        context: 'beverages',
        usage: ['Bosanska kafa je jaka.', 'Pijem kafu svako jutro.'],
      },
      {
        word: 'mlijeko',
        translation: 'milk',
        context: 'beverages',
        usage: ['Želim mlijeko u kafi.', 'Svježe mlijeko je zdravo.'],
      },
    ],
  },
  {
    title: 'Meeting Someone New',
    context: 'First introductions',
    exchanges: [
      {
        speaker: 'Person 1',
        bosnian: 'Zdravo! Ja sam Amina.',
        english: 'Hello! I am Amina.',
      },
      {
        speaker: 'Person 2',
        bosnian: 'Drago mi je! Ja sam Emir.',
        english: 'Nice to meet you! I am Emir.',
      },
      {
        speaker: 'Person 1',
        bosnian: 'Odakle si?',
        english: 'Where are you from?',
      },
      {
        speaker: 'Person 2',
        bosnian: 'Iz Sarajeva sam. A ti?',
        english: 'I am from Sarajevo. And you?',
      },
    ],
    vocabulary: [
      {
        word: 'odakle',
        translation: 'where from',
        context: 'questions',
        usage: ['Odakle dolaziš?', 'Odakle je tvoja porodica?'],
      },
      {
        word: 'iz',
        translation: 'from',
        context: 'prepositions',
        usage: ['Ja sam iz Bosne.', 'On je iz Mostara.'],
      },
    ],
  },
]; 