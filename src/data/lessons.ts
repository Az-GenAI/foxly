// src/data/lessons.ts
// Full lesson content for all 5 languages
// Each language has categories, each category has words

import type { LessonWord, Language, Kingdom } from '@/types';

// ── KINGDOMS ────────────────────────────────────────────────
export const KINGDOMS: Kingdom[] = [
  {
    id: 'spanish',
    name: 'Spanish',
    theme: 'The Fiesta Kingdom',
    emoji: '🌮',
    color: '#fb923c',
    glowColor: 'rgba(251,146,60,0.3)',
    unlockLevel: 1,
    totalLevels: 50,
    description: 'Explore the vibrant world of Spanish through music, dance and magical stories.',
  },
  {
    id: 'french',
    name: 'French',
    theme: 'The Enchanted Château',
    emoji: '🏰',
    color: '#c084fc',
    glowColor: 'rgba(192,132,252,0.3)',
    unlockLevel: 1,
    totalLevels: 50,
    description: 'Step into enchanted châteaux and discover a language that sounds like music.',
  },
  {
    id: 'german',
    name: 'German',
    theme: 'The Clockwork Kingdom',
    emoji: '⚙️',
    color: '#60a5fa',
    glowColor: 'rgba(96,165,250,0.3)',
    unlockLevel: 4,
    totalLevels: 50,
    description: 'Unlock the gears of the Clockwork Kingdom and master the language of engineers.',
  },
  {
    id: 'japanese',
    name: 'Japanese',
    theme: 'Cherry Blossom Empire',
    emoji: '🌸',
    color: '#f472b6',
    glowColor: 'rgba(244,114,182,0.3)',
    unlockLevel: 6,
    totalLevels: 50,
    description: 'Enter the ancient Cherry Blossom Empire — anime, sushi and samurai await.',
  },
  {
    id: 'arabic',
    name: 'Arabic',
    theme: 'The Desert Star Realm',
    emoji: '🌙',
    color: '#fbbf24',
    glowColor: 'rgba(251,191,36,0.3)',
    unlockLevel: 5,
    totalLevels: 50,
    description: 'A magical realm of desert stars, ancient mysteries and golden dunes.',
  },
];

// ── SPANISH LESSONS ─────────────────────────────────────────
export const SPANISH: Record<string, LessonWord[]> = {
  greetings: [
    { word: 'Hola',          pronunciation: 'OH-lah',        translation: 'Hello',         emoji: '👋', example: 'Hola, ¿cómo estás?',          category: 'greetings' },
    { word: 'Adiós',         pronunciation: 'ah-DYOS',       translation: 'Goodbye',       emoji: '👋', example: 'Adiós, hasta luego!',           category: 'greetings' },
    { word: 'Por favor',     pronunciation: 'por fah-VOR',   translation: 'Please',        emoji: '🙏', example: 'Agua, por favor.',              category: 'greetings' },
    { word: 'Gracias',       pronunciation: 'GRAH-syahs',    translation: 'Thank you',     emoji: '😊', example: '¡Gracias por tu ayuda!',        category: 'greetings' },
    { word: 'Lo siento',     pronunciation: 'loh SYEN-toh',  translation: 'I am sorry',    emoji: '😔', example: 'Lo siento mucho.',             category: 'greetings' },
    { word: 'Buenos días',   pronunciation: 'BWEH-nos DEE-ahs', translation: 'Good morning', emoji: '🌅', example: 'Buenos días, mamá.',          category: 'greetings' },
  ],
  animals: [
    { word: 'Gato',    pronunciation: 'GAH-toh',   translation: 'Cat',      emoji: '🐱', example: 'El gato es bonito.',       category: 'animals' },
    { word: 'Perro',   pronunciation: 'PEH-rroh',  translation: 'Dog',      emoji: '🐶', example: 'El perro juega en el parque.', category: 'animals' },
    { word: 'Pájaro',  pronunciation: 'PAH-hah-roh', translation: 'Bird',   emoji: '🐦', example: 'El pájaro canta.',         category: 'animals' },
    { word: 'Pez',     pronunciation: 'PEHS',       translation: 'Fish',     emoji: '🐟', example: 'El pez nada en el agua.',  category: 'animals' },
    { word: 'Caballo', pronunciation: 'kah-BAH-yoh', translation: 'Horse',  emoji: '🐴', example: 'El caballo corre rápido.', category: 'animals' },
    { word: 'León',    pronunciation: 'leh-ON',     translation: 'Lion',     emoji: '🦁', example: 'El león ruge fuerte.',     category: 'animals' },
  ],
  food: [
    { word: 'Manzana', pronunciation: 'mahn-SAH-nah', translation: 'Apple',  emoji: '🍎', example: 'Me gusta la manzana.',     category: 'food' },
    { word: 'Pan',     pronunciation: 'PAHN',          translation: 'Bread',  emoji: '🍞', example: 'El pan está caliente.',    category: 'food' },
    { word: 'Leche',   pronunciation: 'LEH-cheh',      translation: 'Milk',   emoji: '🥛', example: 'Bebo leche cada día.',     category: 'food' },
    { word: 'Agua',    pronunciation: 'AH-gwah',       translation: 'Water',  emoji: '💧', example: 'Quiero agua, por favor.',  category: 'food' },
    { word: 'Pollo',   pronunciation: 'POH-yoh',       translation: 'Chicken',emoji: '🍗', example: 'El pollo está delicioso.', category: 'food' },
    { word: 'Arroz',   pronunciation: 'ah-RROHS',      translation: 'Rice',   emoji: '🍚', example: 'Como arroz con frijoles.', category: 'food' },
  ],
  numbers: [
    { word: 'Uno',    pronunciation: 'OO-noh',    translation: 'One',   emoji: '1️⃣', example: 'Tengo un gato.',         category: 'numbers' },
    { word: 'Dos',    pronunciation: 'DOHS',       translation: 'Two',   emoji: '2️⃣', example: 'Tengo dos hermanos.',    category: 'numbers' },
    { word: 'Tres',   pronunciation: 'TREHS',      translation: 'Three', emoji: '3️⃣', example: 'Son las tres de tarde.', category: 'numbers' },
    { word: 'Cuatro', pronunciation: 'KWAH-troh',  translation: 'Four',  emoji: '4️⃣', example: 'Tengo cuatro libros.',   category: 'numbers' },
    { word: 'Cinco',  pronunciation: 'SEEN-koh',   translation: 'Five',  emoji: '5️⃣', example: 'Hay cinco personas.',    category: 'numbers' },
    { word: 'Diez',   pronunciation: 'DYEHS',       translation: 'Ten',   emoji: '🔟', example: 'Tengo diez años.',       category: 'numbers' },
  ],
  colors: [
    { word: 'Rojo',     pronunciation: 'ROH-hoh',    translation: 'Red',    emoji: '🔴', example: 'La manzana es roja.',   category: 'colors' },
    { word: 'Azul',     pronunciation: 'ah-SOOL',    translation: 'Blue',   emoji: '🔵', example: 'El cielo es azul.',     category: 'colors' },
    { word: 'Verde',    pronunciation: 'BEHR-deh',   translation: 'Green',  emoji: '🟢', example: 'La hierba es verde.',   category: 'colors' },
    { word: 'Amarillo', pronunciation: 'ah-mah-REE-yoh', translation: 'Yellow', emoji: '🟡', example: 'El sol es amarillo.', category: 'colors' },
    { word: 'Blanco',   pronunciation: 'BLAHN-koh',  translation: 'White',  emoji: '⬜', example: 'La nieve es blanca.',   category: 'colors' },
    { word: 'Negro',    pronunciation: 'NEH-groh',   translation: 'Black',  emoji: '⬛', example: 'El gato es negro.',     category: 'colors' },
  ],
};

// ── FRENCH LESSONS ──────────────────────────────────────────
export const FRENCH: Record<string, LessonWord[]> = {
  greetings: [
    { word: 'Bonjour',    pronunciation: 'bohn-ZHOOR',   translation: 'Hello/Good day', emoji: '👋', example: 'Bonjour, comment allez-vous?', category: 'greetings' },
    { word: 'Au revoir',  pronunciation: 'oh reh-VWAR',  translation: 'Goodbye',        emoji: '👋', example: 'Au revoir, à demain!',        category: 'greetings' },
    { word: 'Merci',      pronunciation: 'mehr-SEE',     translation: 'Thank you',      emoji: '😊', example: 'Merci beaucoup!',             category: 'greetings' },
    { word: 'Excusez-moi',pronunciation: 'ex-koo-zay-MWAH', translation: 'Excuse me', emoji: '🙏', example: 'Excusez-moi, où est la gare?', category: 'greetings' },
    { word: "S'il vous plaît", pronunciation: 'seel voo PLAY', translation: 'Please', emoji: '🙏', example: "De l'eau, s'il vous plaît.",   category: 'greetings' },
    { word: 'Bonsoir',    pronunciation: 'bohn-SWAHR',   translation: 'Good evening',   emoji: '🌆', example: 'Bonsoir tout le monde!',      category: 'greetings' },
  ],
  animals: [
    { word: 'Chat',    pronunciation: 'SHAH',     translation: 'Cat',    emoji: '🐱', example: 'Le chat est mignon.',       category: 'animals' },
    { word: 'Chien',   pronunciation: 'SHYAN',    translation: 'Dog',    emoji: '🐶', example: 'Mon chien est grand.',      category: 'animals' },
    { word: 'Oiseau',  pronunciation: 'wah-ZOH',  translation: 'Bird',   emoji: '🐦', example: "L'oiseau chante bien.",    category: 'animals' },
    { word: 'Poisson', pronunciation: 'pwah-SON', translation: 'Fish',   emoji: '🐟', example: 'Le poisson nage vite.',     category: 'animals' },
    { word: 'Cheval',  pronunciation: 'shuh-VAL', translation: 'Horse',  emoji: '🐴', example: 'Le cheval est rapide.',    category: 'animals' },
    { word: 'Lapin',   pronunciation: 'lah-PAN',  translation: 'Rabbit', emoji: '🐰', example: 'Le lapin mange des carottes.', category: 'animals' },
  ],
};

// ── GERMAN LESSONS ──────────────────────────────────────────
export const GERMAN: Record<string, LessonWord[]> = {
  greetings: [
    { word: 'Hallo',      pronunciation: 'HAH-loh',      translation: 'Hello',       emoji: '👋', example: 'Hallo, wie geht es dir?',  category: 'greetings' },
    { word: 'Tschüss',    pronunciation: 'CHEWS',         translation: 'Bye',         emoji: '👋', example: 'Tschüss, bis morgen!',     category: 'greetings' },
    { word: 'Danke',      pronunciation: 'DAHN-keh',      translation: 'Thank you',   emoji: '😊', example: 'Danke sehr!',              category: 'greetings' },
    { word: 'Bitte',      pronunciation: 'BIT-teh',       translation: 'Please/Welcome', emoji: '🙏', example: 'Bitte schön.',          category: 'greetings' },
    { word: 'Guten Morgen', pronunciation: 'GOO-ten MOR-gen', translation: 'Good morning', emoji: '🌅', example: 'Guten Morgen, Mama!', category: 'greetings' },
    { word: 'Entschuldigung', pronunciation: 'ent-SHOOL-dee-goong', translation: 'Excuse me', emoji: '🙏', example: 'Entschuldigung, wo ist die Schule?', category: 'greetings' },
  ],
};

// ── JAPANESE LESSONS ────────────────────────────────────────
export const JAPANESE: Record<string, LessonWord[]> = {
  greetings: [
    { word: 'こんにちは', pronunciation: 'kon-ni-CHI-wa',   translation: 'Hello',       emoji: '👋', example: 'こんにちは、元気ですか？',     category: 'greetings' },
    { word: 'ありがとう', pronunciation: 'a-ri-GA-to',      translation: 'Thank you',   emoji: '😊', example: 'ありがとうございます！',       category: 'greetings' },
    { word: 'さようなら', pronunciation: 'sa-yo-NA-ra',     translation: 'Goodbye',     emoji: '👋', example: 'さようなら、またね！',          category: 'greetings' },
    { word: 'はい',       pronunciation: 'HAI',              translation: 'Yes',         emoji: '✅', example: 'はい、わかりました。',          category: 'greetings' },
    { word: 'いいえ',     pronunciation: 'i-I-e',            translation: 'No',          emoji: '❌', example: 'いいえ、ちがいます。',          category: 'greetings' },
    { word: 'すみません', pronunciation: 'su-mi-MA-sen',    translation: 'Excuse me',   emoji: '🙏', example: 'すみません、トイレはどこですか？', category: 'greetings' },
  ],
};

// ── ARABIC LESSONS ──────────────────────────────────────────
export const ARABIC: Record<string, LessonWord[]> = {
  greetings: [
    { word: 'مرحبا',       pronunciation: 'MAR-ha-ban',     translation: 'Hello',       emoji: '👋', example: 'مرحبا، كيف حالك؟',          category: 'greetings' },
    { word: 'شكراً',       pronunciation: 'SHUK-ran',       translation: 'Thank you',   emoji: '😊', example: 'شكراً جزيلاً!',             category: 'greetings' },
    { word: 'من فضلك',     pronunciation: 'min FAD-lak',    translation: 'Please',      emoji: '🙏', example: 'ماء من فضلك.',              category: 'greetings' },
    { word: 'مع السلامة',  pronunciation: 'ma-as-sa-LA-ma', translation: 'Goodbye',     emoji: '👋', example: 'مع السلامة، إلى اللقاء!',   category: 'greetings' },
    { word: 'صباح الخير',  pronunciation: 'SA-bah al-KHAYR', translation: 'Good morning', emoji: '🌅', example: 'صباح الخير يا أمي!',      category: 'greetings' },
    { word: 'نعم',         pronunciation: 'NA-am',           translation: 'Yes',         emoji: '✅', example: 'نعم، أنا بخير.',            category: 'greetings' },
  ],
};

// ── LESSON SENTENCES (Drag & Drop) ──────────────────────────
export const DRAG_SENTENCES: Record<Language, Array<{words: string[], translation: string}>> = {
  spanish: [
    { words: ['Hola', 'me', 'llamo', 'Finn'],     translation: 'Hello, my name is Finn' },
    { words: ['El', 'gato', 'es', 'grande'],      translation: 'The cat is big' },
    { words: ['Me', 'gusta', 'el', 'agua'],       translation: 'I like water' },
    { words: ['Buenos', 'días', 'mamá'],          translation: 'Good morning mum' },
    { words: ['El', 'perro', 'juega', 'mucho'],   translation: 'The dog plays a lot' },
  ],
  french: [
    { words: ['Bonjour', 'je', 'mappelle', 'Finn'], translation: 'Hello, my name is Finn' },
    { words: ['Le', 'chat', 'est', 'petit'],        translation: 'The cat is small' },
    { words: ['Merci', 'beaucoup', 'madame'],        translation: 'Thank you very much, madame' },
  ],
  german: [
    { words: ['Hallo', 'ich', 'heisse', 'Finn'], translation: 'Hello, my name is Finn' },
    { words: ['Die', 'Katze', 'ist', 'gross'],   translation: 'The cat is big' },
  ],
  japanese: [
    { words: ['わたしは', 'フィンです'],          translation: 'I am Finn' },
    { words: ['ねこが', 'すきです'],              translation: 'I like cats' },
  ],
  arabic: [
    { words: ['اسمي', 'فين'],                     translation: 'My name is Finn' },
    { words: ['أنا', 'بخير', 'شكراً'],            translation: 'I am fine, thank you' },
  ],
};

// ── BADGES ──────────────────────────────────────────────────
export const BADGES = [
  { id: 'first_step',    name: 'First Step',       emoji: '🌟', description: 'Complete your first lesson!',          requirement: '1 lesson' },
  { id: 'week_warrior',  name: 'Week Warrior',      emoji: '🔥', description: 'Keep a 7-day streak!',                requirement: '7-day streak' },
  { id: 'word_wizard',   name: 'Word Wizard',        emoji: '🧙', description: 'Earn 100 XP total!',                  requirement: '100 XP' },
  { id: 'sharpshooter',  name: 'Sharpshooter',       emoji: '🎯', description: 'Get 100% on a quiz!',                 requirement: 'Perfect quiz' },
  { id: 'fiesta_hero',   name: 'Fiesta Hero',         emoji: '🌮', description: 'Complete 10 Spanish lessons!',        requirement: '10 Spanish lessons' },
  { id: 'chateau',       name: 'Château Explorer',    emoji: '🏰', description: 'Complete 10 French lessons!',         requirement: '10 French lessons' },
  { id: 'clockwork',     name: 'Clockwork Pro',       emoji: '⚙️', description: 'Unlock the German kingdom!',          requirement: 'Reach Level 4' },
  { id: 'blossom',       name: 'Blossom Master',      emoji: '🌸', description: 'Unlock the Japanese kingdom!',        requirement: 'Reach Level 6' },
  { id: 'desert_star',   name: 'Desert Star',         emoji: '🌙', description: 'Unlock the Arabic kingdom!',          requirement: 'Reach Level 5' },
  { id: 'grand_explorer',name: 'Grand Explorer',      emoji: '👑', description: 'Complete a lesson in all 5 languages!', requirement: 'All 5 languages' },
  { id: 'diamond_streak',name: 'Diamond Streak',      emoji: '💎', description: 'Keep a 30-day streak!',               requirement: '30-day streak' },
  { id: 'voice_master',  name: 'Voice Master',        emoji: '🎤', description: 'Score 90%+ on 10 pronunciation lessons!', requirement: '10 speak lessons at 90%+' },
];

// ── HELPER: get words for a lesson ──────────────────────────
export function getLessonWords(language: Language, category = 'greetings'): LessonWord[] {
  const map: Record<Language, Record<string, LessonWord[]>> = {
    spanish: SPANISH,
    french: FRENCH,
    german: GERMAN,
    japanese: JAPANESE,
    arabic: ARABIC,
  };
  return map[language]?.[category] || map[language]?.['greetings'] || [];
}
