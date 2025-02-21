import { culturalContent, grammarLessons, practiceDialogues, quizQuestions, vocabularyCategories } from '@/data/learningContent';
import { ChatMessage } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface ChatResponse {
  message: string;
  suggestions?: string[];
  audioUrl?: string;
  type?: 'translation' | 'grammar' | 'vocabulary' | 'general' | 'culture' | 'practice' | 'quiz';
  bosnianText?: string;
  englishText?: string;
  learningContent?: any;
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

const getRandomQuestion = (category: string, difficulty: string = 'beginner'): any => {
  const categoryQuestions = quizQuestions.find(q => q.category.toLowerCase() === category.toLowerCase());
  if (!categoryQuestions) return null;

  const filteredQuestions = categoryQuestions.questions.filter(q => q.difficulty === difficulty);
  if (filteredQuestions.length === 0) return null;

  return filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];
};

const getRandomVocabulary = (category: keyof typeof vocabularyCategories): any => {
  const words = vocabularyCategories[category];
  return words[Math.floor(Math.random() * words.length)];
};

const getRandomDialogue = (): any => {
  return practiceDialogues[Math.floor(Math.random() * practiceDialogues.length)];
};

const getGrammarLesson = (topic: string): any => {
  return grammarLessons.find(lesson => 
    lesson.title.toLowerCase().includes(topic.toLowerCase())
  );
};

const generateResponse = async (message: string, context?: { difficulty?: string; focusArea?: string }): Promise<ChatResponse> => {
  const lowerMessage = message.toLowerCase();
  const userLevel = context?.difficulty || 'beginner';
  const focusArea = context?.focusArea;

  // Check for quiz/practice requests
  if (practicePatterns.some(pattern => lowerMessage.includes(pattern))) {
    if (lowerMessage.includes('vocabulary')) {
      const question = getRandomQuestion('vocabulary', userLevel);
      return {
        message: `Let's practice vocabulary!\n\n${question.question}`,
        suggestions: question.options,
        type: 'quiz',
        learningContent: question,
      };
    }

    if (lowerMessage.includes('grammar')) {
      const question = getRandomQuestion('grammar', userLevel);
      return {
        message: `Let's practice grammar!\n\n${question.question}`,
        suggestions: question.options,
        type: 'quiz',
        learningContent: question,
      };
    }

    if (lowerMessage.includes('dialogue') || lowerMessage.includes('conversation')) {
      const dialogue = getRandomDialogue();
      const formattedDialogue = dialogue.exchanges
        .map((exchange: any) => `${exchange.speaker}:\n🇧🇦 ${exchange.bosnian}\n🇬🇧 ${exchange.english}`)
        .join('\n\n');

      return {
        message: `Let's practice this dialogue:\n\n${dialogue.title}\n${dialogue.context}\n\n${formattedDialogue}`,
        suggestions: [
          'Practice pronunciation',
          'Show vocabulary',
          'Try another dialogue',
          'Explain grammar',
        ],
        type: 'practice',
        learningContent: dialogue,
      };
    }
  }

  // Check for grammar explanations
  if (grammarPatterns.some(pattern => lowerMessage.includes(pattern))) {
    const topic = grammarPatterns.find(pattern => lowerMessage.includes(pattern)) || '';
    const lesson = getGrammarLesson(topic);

    if (lesson) {
      const formattedExamples = lesson.examples
        .map((ex: any) => `🇧🇦 ${ex.bosnian}\n🇬🇧 ${ex.english}\n💡 ${ex.explanation}`)
        .join('\n\n');

      return {
        message: `📚 ${lesson.title}\n\n${lesson.explanation}\n\nExamples:\n${formattedExamples}`,
        suggestions: [
          'Practice this grammar',
          'Show more examples',
          'Try exercises',
          'Next lesson',
        ],
        type: 'grammar',
        learningContent: lesson,
      };
    }
  }

  // Check for vocabulary requests
  if (vocabularyPatterns.some(pattern => lowerMessage.includes(pattern))) {
    const categories = Object.keys(vocabularyCategories);
    const category = categories.find(cat => lowerMessage.includes(cat.toLowerCase()));

    if (category) {
      const word = getRandomVocabulary(category as keyof typeof vocabularyCategories);
      return {
        message: `Here's a ${category} word:\n\n🇧🇦 ${word.bosnian}\n🇬🇧 ${word.english}\n💡 Context: ${word.context}`,
        suggestions: [
          'Show another word',
          'Practice pronunciation',
          'Use in a sentence',
          'More words in this category',
        ],
        type: 'vocabulary',
        learningContent: word,
      };
    }
  }

  // Check for cultural content
  if (culturalPatterns.some(pattern => lowerMessage.includes(pattern))) {
    const topic = culturalContent.find(content => 
      content.tags.some(tag => lowerMessage.includes(tag.toLowerCase()))
    );

    if (topic) {
      return {
        message: `📚 ${topic.title}\n\n${topic.content}`,
        suggestions: [
          'Learn more',
          'Related vocabulary',
          'Show pictures',
          'Practice conversation',
        ],
        type: 'culture',
        learningContent: topic,
      };
    }
  }

  // Default response with learning suggestions
  return {
    message: `I can help you learn Bosnian! Here are some options:`,
    suggestions: [
      'Practice vocabulary',
      'Learn grammar',
      'Try a conversation',
      'Take a quiz',
      'Explore Bosnian culture',
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
    id: uuidv4(),
    role: 'assistant',
    content,
    timestamp: new Date().toISOString(),
    attachments: response.audioUrl
      ? [{ type: 'audio', url: response.audioUrl }]
      : undefined,
    suggestions: response.suggestions || [],
    learningContent: response.learningContent,
  };
}; 