import { ChatMessage } from '@/types';

interface ChatResponse {
  message: string;
  suggestions?: string[];
  audioUrl?: string;
  type?: 'translation' | 'grammar' | 'vocabulary' | 'general' | 'culture' | 'practice';
  bosnianText?: string;
  englishText?: string;
}

const grammarPatterns = [
  'grammar',
  'conjugation',
  'tense',
  'case',
  'declension',
  'plural',
  'singular',
];

const vocabularyPatterns = [
  'how do you say',
  'what does',
  'mean',
  'translate',
  'word for',
];

const practicePatterns = [
  'practice',
  'exercise',
  'quiz',
  'test',
  'drill',
];

const culturalPatterns = [
  'culture',
  'tradition',
  'custom',
  'history',
  'food',
  'music',
];

const commonPhrases: Record<string, { en: string; bs: string }> = {
  hello: { en: 'Hello', bs: 'Zdravo' },
  goodbye: { en: 'Goodbye', bs: 'Doviđenja' },
  thanks: { en: 'Thank you', bs: 'Hvala' },
  welcome: { en: "You're welcome", bs: 'Nema na čemu' },
  howareyou: { en: 'How are you?', bs: 'Kako si?' },
  good: { en: 'Good', bs: 'Dobro' },
  yes: { en: 'Yes', bs: 'Da' },
  no: { en: 'No', bs: 'Ne' },
  please: { en: 'Please', bs: 'Molim' },
};

const commonResponses: Record<string, ChatResponse> = {
  greeting: {
    message: 'Zdravo! (Hello!) How can I help you with learning Bosnian today?',
    bosnianText: 'Zdravo! Kako vam mogu pomoći sa učenjem bosanskog jezika danas?',
    englishText: 'Hello! How can I help you with learning Bosnian today?',
    suggestions: [
      'Help me practice pronunciation',
      'Teach me basic greetings',
      'Explain grammar rules',
      'Tell me about Bosnian culture',
    ],
    type: 'general',
  },
  goodbye: {
    message: 'Doviđenja! (Goodbye!) Feel free to return anytime for more practice!',
    bosnianText: 'Doviđenja! Slobodno se vratite bilo kada za više vježbe!',
    englishText: 'Goodbye! Feel free to return anytime for more practice!',
    type: 'general',
  },
  thanks: {
    message: 'Nema na čemu! (You\'re welcome!) Is there anything else you\'d like to learn?',
    bosnianText: 'Nema na čemu! Ima li još nešto što biste željeli naučiti?',
    englishText: 'You\'re welcome! Is there anything else you\'d like to learn?',
    type: 'general',
  },
};

const generatePracticeExercise = (): ChatResponse => {
  const phrases = Object.entries(commonPhrases);
  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  
  return {
    message: `Let's practice! Try to translate this phrase:\n\nEnglish: "${randomPhrase[1].en}"\n\nType your answer in Bosnian, and I'll check if it's correct!`,
    type: 'practice',
  };
};

const checkTranslation = (userInput: string, targetPhrase: string): boolean => {
  return userInput.toLowerCase().trim() === targetPhrase.toLowerCase().trim();
};

const generateResponse = async (message: string, context?: { difficulty?: string }): Promise<ChatResponse> => {
  const lowerMessage = message.toLowerCase();

  // Check for greetings
  if (lowerMessage.match(/^(hi|hello|hey|zdravo)/i)) {
    return commonResponses.greeting;
  }

  // Check for goodbyes
  if (lowerMessage.match(/^(bye|goodbye|doviđenja)/i)) {
    return commonResponses.goodbye;
  }

  // Check for thanks
  if (lowerMessage.match(/^(thanks|thank you|hvala)/i)) {
    return commonResponses.thanks;
  }

  // Check for practice request
  if (practicePatterns.some(pattern => lowerMessage.includes(pattern))) {
    return generatePracticeExercise();
  }

  // Check for cultural questions
  if (culturalPatterns.some(pattern => lowerMessage.includes(pattern))) {
    return {
      message: 'I\'d be happy to tell you about Bosnian culture! What specific aspect interests you?',
      bosnianText: 'Rado ću vam pričati o bosanskoj kulturi! Koji vas aspekt posebno zanima?',
      englishText: 'I\'d be happy to tell you about Bosnian culture! What specific aspect interests you?',
      suggestions: [
        'Traditional food',
        'Music and dance',
        'Festivals and holidays',
        'Daily customs',
      ],
      type: 'culture',
    };
  }

  // Check for grammar questions
  if (grammarPatterns.some(pattern => lowerMessage.includes(pattern))) {
    return {
      message: 'Let me help you with Bosnian grammar. What specific aspect would you like to learn about?',
      bosnianText: 'Dozvolite mi da vam pomognem sa bosanskom gramatikom. O kojem aspektu želite učiti?',
      englishText: 'Let me help you with Bosnian grammar. What specific aspect would you like to learn about?',
      suggestions: [
        'Verb conjugation',
        'Noun cases',
        'Adjective agreement',
        'Word order',
      ],
      type: 'grammar',
    };
  }

  // Check for vocabulary questions
  if (vocabularyPatterns.some(pattern => lowerMessage.includes(pattern))) {
    return {
      message: 'I can help you with Bosnian vocabulary. Could you please specify the word or phrase you\'d like to learn?',
      bosnianText: 'Mogu vam pomoći sa bosanskim vokabularom. Možete li specificirati riječ ili frazu koju želite naučiti?',
      englishText: 'I can help you with Bosnian vocabulary. Could you please specify the word or phrase you\'d like to learn?',
      type: 'vocabulary',
    };
  }

  // Default response
  return {
    message: 'I understand you\'re interested in learning Bosnian. Could you please be more specific about what you\'d like to learn?',
    bosnianText: 'Razumijem da ste zainteresovani za učenje bosanskog jezika. Možete li biti precizniji o tome što želite naučiti?',
    englishText: 'I understand you\'re interested in learning Bosnian. Could you please be more specific about what you\'d like to learn?',
    suggestions: [
      'Basic phrases',
      'Grammar rules',
      'Pronunciation help',
      'Cultural insights',
    ],
    type: 'general',
  };
};

export const processChatMessage = async (
  message: string,
  context?: {
    difficulty?: string;
    focusArea?: string;
  }
): Promise<ChatMessage> => {
  const response = await generateResponse(message, context);
  
  let content = response.message;
  if (response.bosnianText && response.englishText) {
    content = `🇧🇦 ${response.bosnianText}\n\n🇬🇧 ${response.englishText}`;
  }

  return {
    id: Date.now().toString(),
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
    attachments: response.audioUrl
      ? [{ type: 'audio', url: response.audioUrl }]
      : undefined,
    suggestions: response.suggestions,
  };
}; 