// src/data/curriculum.ts
// Full structured curriculum — Discover → Understand → Practice → Prove It

export type LessonStage = 'discover' | 'understand' | 'practice' | 'prove';

export interface CurriculumWord {
  id: string;
  word: string;
  pronunciation: string;
  translation: string;
  emoji: string;
  example: string;
  exampleTranslation: string;
  audio?: string;
}

export interface CurriculumLesson {
  id: string;
  title: string;
  stage: LessonStage;
  stageLabel: string;
  stageDescription: string;
  stageColor: string;
  words: CurriculumWord[];
  xpReward: number;
  passThreshold: number; // 0 for discover (auto-pass)
}

export interface CurriculumLevel {
  id: string;
  number: number;
  title: string;
  lessons: CurriculumLesson[];
}

export interface CurriculumUnit {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  description: string;
  levels: CurriculumLevel[];
}

// ── STAGE CONFIG ────────────────────────────────────────────
export const STAGE_CONFIG: Record<LessonStage, { label: string; description: string; color: string; icon: string; tip: string }> = {
  discover: {
    label: 'Discover',
    description: 'See it & hear it — no pressure!',
    color: '#9b7ff4',
    icon: '👀',
    tip: 'Just watch and listen. No tests today!',
  },
  understand: {
    label: 'Understand',
    description: 'Learn what it means',
    color: '#3dd9c8',
    icon: '🧠',
    tip: 'Match the word to the right picture!',
  },
  practice: {
    label: 'Practice',
    description: 'Use it yourself',
    color: '#fb923c',
    icon: '✏️',
    tip: 'Build sentences and speak out loud!',
  },
  prove: {
    label: 'Prove It',
    description: 'Show what you know',
    color: '#f9c846',
    icon: '🏆',
    tip: 'No hints this time — you\'ve got this!',
  },
};

// ── SPANISH CURRICULUM ───────────────────────────────────────
export const SPANISH_CURRICULUM: CurriculumUnit[] = [
  // ════════════════════════════════════════════════════════
  // UNIT 0 — THE ALPHABET & SOUNDS
  // ════════════════════════════════════════════════════════
  {
    id: 'es-u0',
    number: 0,
    title: 'The Alphabet & Sounds',
    subtitle: 'Before words, learn the music',
    emoji: '🔤',
    color: '#9b7ff4',
    description: 'Spanish sounds different from English. Learn how letters sound so every word makes sense!',
    levels: [
      {
        id: 'es-u0-l1',
        number: 1,
        title: 'Vowel Sounds',
        lessons: [
          {
            id: 'es-u0-l1-a',
            title: 'Meet the Vowels',
            stage: 'discover',
            stageLabel: 'Discover',
            stageDescription: 'See it & hear it',
            stageColor: '#9b7ff4',
            xpReward: 10,
            passThreshold: 0,
            words: [
              { id:'a', word:'A', pronunciation:'AH (like "father")', translation:'The letter A', emoji:'🅰️', example:'A de árbol', exampleTranslation:'A as in tree' },
              { id:'e', word:'E', pronunciation:'EH (like "bed")', translation:'The letter E', emoji:'🔤', example:'E de elefante', exampleTranslation:'E as in elephant' },
              { id:'i', word:'I', pronunciation:'EE (like "see")', translation:'The letter I', emoji:'🔤', example:'I de iglesia', exampleTranslation:'I as in church' },
              { id:'o', word:'O', pronunciation:'OH (like "go")', translation:'The letter O', emoji:'🔤', example:'O de oso', exampleTranslation:'O as in bear' },
              { id:'u', word:'U', pronunciation:'OO (like "moon")', translation:'The letter U', emoji:'🔤', example:'U de uva', exampleTranslation:'U as in grape' },
            ],
          },
          {
            id: 'es-u0-l1-b',
            title: 'Vowel Match',
            stage: 'understand',
            stageLabel: 'Understand',
            stageDescription: 'Learn what it sounds like',
            stageColor: '#3dd9c8',
            xpReward: 25,
            passThreshold: 70,
            words: [
              { id:'a', word:'A', pronunciation:'AH', translation:'like "father"', emoji:'👂', example:'Árbol', exampleTranslation:'Tree' },
              { id:'e', word:'E', pronunciation:'EH', translation:'like "bed"', emoji:'👂', example:'Elefante', exampleTranslation:'Elephant' },
              { id:'i', word:'I', pronunciation:'EE', translation:'like "see"', emoji:'👂', example:'Iglú', exampleTranslation:'Igloo' },
              { id:'o', word:'O', pronunciation:'OH', translation:'like "go"', emoji:'👂', example:'Oso', exampleTranslation:'Bear' },
              { id:'u', word:'U', pronunciation:'OO', translation:'like "moon"', emoji:'👂', example:'Uva', exampleTranslation:'Grape' },
            ],
          },
          {
            id: 'es-u0-l1-c',
            title: 'Vowel Challenge',
            stage: 'prove',
            stageLabel: 'Prove It',
            stageDescription: 'Show what you know',
            stageColor: '#f9c846',
            xpReward: 50,
            passThreshold: 80,
            words: [
              { id:'a', word:'A', pronunciation:'AH', translation:'like "father"', emoji:'🅰️', example:'Árbol', exampleTranslation:'Tree' },
              { id:'e', word:'E', pronunciation:'EH', translation:'like "bed"', emoji:'🔤', example:'Elefante', exampleTranslation:'Elephant' },
              { id:'i', word:'I', pronunciation:'EE', translation:'like "see"', emoji:'🔤', example:'Iglú', exampleTranslation:'Igloo' },
              { id:'o', word:'O', pronunciation:'OH', translation:'like "go"', emoji:'🔤', example:'Oso', exampleTranslation:'Bear' },
              { id:'u', word:'U', pronunciation:'OO', translation:'like "moon"', emoji:'🔤', example:'Uva', exampleTranslation:'Grape' },
            ],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // UNIT 1 — FIRST WORDS & GREETINGS
  // ════════════════════════════════════════════════════════
  {
    id: 'es-u1',
    number: 1,
    title: 'First Words',
    subtitle: 'Say hello to Spanish!',
    emoji: '👋',
    color: '#fb923c',
    description: 'Your first Spanish words! Learn to say hello, goodbye, please and thank you.',
    levels: [
      {
        id: 'es-u1-l1',
        number: 1,
        title: 'Hello & Goodbye',
        lessons: [
          {
            id: 'es-u1-l1-a',
            title: 'Greetings Discover',
            stage: 'discover',
            stageLabel: 'Discover',
            stageDescription: 'See it & hear it — no pressure!',
            stageColor: '#9b7ff4',
            xpReward: 10,
            passThreshold: 0,
            words: [
              { id:'hola', word:'Hola', pronunciation:'OH-lah', translation:'Hello', emoji:'👋', example:'¡Hola! ¿Cómo estás?', exampleTranslation:'Hello! How are you?' },
              { id:'adios', word:'Adiós', pronunciation:'ah-DYOS', translation:'Goodbye', emoji:'👋', example:'¡Adiós! Hasta luego.', exampleTranslation:'Goodbye! See you later.' },
              { id:'buenos-dias', word:'Buenos días', pronunciation:'BWEH-nos DEE-as', translation:'Good morning', emoji:'🌅', example:'¡Buenos días, mamá!', exampleTranslation:'Good morning, mum!' },
              { id:'buenas-noches', word:'Buenas noches', pronunciation:'BWEH-nas NO-ches', translation:'Good night', emoji:'🌙', example:'¡Buenas noches, papá!', exampleTranslation:'Good night, dad!' },
              { id:'por-favor', word:'Por favor', pronunciation:'por fah-VOR', translation:'Please', emoji:'🙏', example:'Agua, por favor.', exampleTranslation:'Water, please.' },
              { id:'gracias', word:'Gracias', pronunciation:'GRAH-syahs', translation:'Thank you', emoji:'😊', example:'¡Gracias por tu ayuda!', exampleTranslation:'Thank you for your help!' },
            ],
          },
          {
            id: 'es-u1-l1-b',
            title: 'Greetings Understand',
            stage: 'understand',
            stageLabel: 'Understand',
            stageDescription: 'Learn what it means',
            stageColor: '#3dd9c8',
            xpReward: 25,
            passThreshold: 70,
            words: [
              { id:'hola', word:'Hola', pronunciation:'OH-lah', translation:'Hello', emoji:'👋', example:'¡Hola! ¿Cómo estás?', exampleTranslation:'Hello! How are you?' },
              { id:'adios', word:'Adiós', pronunciation:'ah-DYOS', translation:'Goodbye', emoji:'👋', example:'¡Adiós!', exampleTranslation:'Goodbye!' },
              { id:'buenos-dias', word:'Buenos días', pronunciation:'BWEH-nos DEE-as', translation:'Good morning', emoji:'🌅', example:'¡Buenos días!', exampleTranslation:'Good morning!' },
              { id:'buenas-noches', word:'Buenas noches', pronunciation:'BWEH-nas NO-ches', translation:'Good night', emoji:'🌙', example:'¡Buenas noches!', exampleTranslation:'Good night!' },
              { id:'por-favor', word:'Por favor', pronunciation:'por fah-VOR', translation:'Please', emoji:'🙏', example:'Por favor.', exampleTranslation:'Please.' },
              { id:'gracias', word:'Gracias', pronunciation:'GRAH-syahs', translation:'Thank you', emoji:'😊', example:'¡Gracias!', exampleTranslation:'Thank you!' },
            ],
          },
          {
            id: 'es-u1-l1-c',
            title: 'Greetings Practice',
            stage: 'practice',
            stageLabel: 'Practice',
            stageDescription: 'Use it yourself',
            stageColor: '#fb923c',
            xpReward: 35,
            passThreshold: 75,
            words: [
              { id:'hola', word:'Hola', pronunciation:'OH-lah', translation:'Hello', emoji:'👋', example:'¡Hola! ¿Cómo estás?', exampleTranslation:'Hello! How are you?' },
              { id:'adios', word:'Adiós', pronunciation:'ah-DYOS', translation:'Goodbye', emoji:'👋', example:'¡Adiós!', exampleTranslation:'Goodbye!' },
              { id:'buenos-dias', word:'Buenos días', pronunciation:'BWEH-nos DEE-as', translation:'Good morning', emoji:'🌅', example:'¡Buenos días!', exampleTranslation:'Good morning!' },
              { id:'por-favor', word:'Por favor', pronunciation:'por fah-VOR', translation:'Please', emoji:'🙏', example:'Por favor.', exampleTranslation:'Please.' },
              { id:'gracias', word:'Gracias', pronunciation:'GRAH-syahs', translation:'Thank you', emoji:'😊', example:'¡Gracias!', exampleTranslation:'Thank you!' },
              { id:'buenas-noches', word:'Buenas noches', pronunciation:'BWEH-nas NO-ches', translation:'Good night', emoji:'🌙', example:'¡Buenas noches!', exampleTranslation:'Good night!' },
            ],
          },
          {
            id: 'es-u1-l1-d',
            title: 'Greetings Prove It',
            stage: 'prove',
            stageLabel: 'Prove It',
            stageDescription: 'Show what you know — no hints!',
            stageColor: '#f9c846',
            xpReward: 50,
            passThreshold: 80,
            words: [
              { id:'hola', word:'Hola', pronunciation:'OH-lah', translation:'Hello', emoji:'👋', example:'¡Hola! ¿Cómo estás?', exampleTranslation:'Hello! How are you?' },
              { id:'adios', word:'Adiós', pronunciation:'ah-DYOS', translation:'Goodbye', emoji:'👋', example:'¡Adiós!', exampleTranslation:'Goodbye!' },
              { id:'buenos-dias', word:'Buenos días', pronunciation:'BWEH-nos DEE-as', translation:'Good morning', emoji:'🌅', example:'¡Buenos días!', exampleTranslation:'Good morning!' },
              { id:'buenas-noches', word:'Buenas noches', pronunciation:'BWEH-nas NO-ches', translation:'Good night', emoji:'🌙', example:'¡Buenas noches!', exampleTranslation:'Good night!' },
              { id:'por-favor', word:'Por favor', pronunciation:'por fah-VOR', translation:'Please', emoji:'🙏', example:'Por favor.', exampleTranslation:'Please.' },
              { id:'gracias', word:'Gracias', pronunciation:'GRAH-syahs', translation:'Thank you', emoji:'😊', example:'¡Gracias!', exampleTranslation:'Thank you!' },
            ],
          },
        ],
      },
      {
        id: 'es-u1-l2',
        number: 2,
        title: 'Yes, No & Sorry',
        lessons: [
          {
            id: 'es-u1-l2-a',
            title: 'Essential Words Discover',
            stage: 'discover',
            stageLabel: 'Discover',
            stageDescription: 'See it & hear it — no pressure!',
            stageColor: '#9b7ff4',
            xpReward: 10,
            passThreshold: 0,
            words: [
              { id:'si', word:'Sí', pronunciation:'SEE', translation:'Yes', emoji:'✅', example:'Sí, me gusta.', exampleTranslation:'Yes, I like it.' },
              { id:'no', word:'No', pronunciation:'NOH', translation:'No', emoji:'❌', example:'No, gracias.', exampleTranslation:'No, thank you.' },
              { id:'lo-siento', word:'Lo siento', pronunciation:'loh SYEN-toh', translation:'I am sorry', emoji:'😔', example:'Lo siento mucho.', exampleTranslation:'I am very sorry.' },
              { id:'de-nada', word:'De nada', pronunciation:'deh NAH-dah', translation:'You are welcome', emoji:'😊', example:'De nada, amigo.', exampleTranslation:'You are welcome, friend.' },
              { id:'ayuda', word:'Ayuda', pronunciation:'ah-YOO-dah', translation:'Help', emoji:'🆘', example:'¡Ayuda, por favor!', exampleTranslation:'Help, please!' },
              { id:'no-entiendo', word:'No entiendo', pronunciation:'no en-TYEN-doh', translation:'I don\'t understand', emoji:'🤷', example:'No entiendo. ¿Puedes repetir?', exampleTranslation:'I don\'t understand. Can you repeat?' },
            ],
          },
          {
            id: 'es-u1-l2-b', title: 'Essential Words Understand', stage: 'understand', stageLabel: 'Understand', stageDescription: 'Learn what it means', stageColor: '#3dd9c8', xpReward: 25, passThreshold: 70,
            words: [
              { id:'si', word:'Sí', pronunciation:'SEE', translation:'Yes', emoji:'✅', example:'Sí, me gusta.', exampleTranslation:'Yes, I like it.' },
              { id:'no', word:'No', pronunciation:'NOH', translation:'No', emoji:'❌', example:'No, gracias.', exampleTranslation:'No, thank you.' },
              { id:'lo-siento', word:'Lo siento', pronunciation:'loh SYEN-toh', translation:'I am sorry', emoji:'😔', example:'Lo siento.', exampleTranslation:'I am sorry.' },
              { id:'de-nada', word:'De nada', pronunciation:'deh NAH-dah', translation:'You are welcome', emoji:'😊', example:'De nada.', exampleTranslation:'You are welcome.' },
              { id:'ayuda', word:'Ayuda', pronunciation:'ah-YOO-dah', translation:'Help', emoji:'🆘', example:'¡Ayuda!', exampleTranslation:'Help!' },
              { id:'no-entiendo', word:'No entiendo', pronunciation:'no en-TYEN-doh', translation:'I don\'t understand', emoji:'🤷', example:'No entiendo.', exampleTranslation:'I don\'t understand.' },
            ],
          },
          {
            id: 'es-u1-l2-c', title: 'Essential Words Practice', stage: 'practice', stageLabel: 'Practice', stageDescription: 'Use it yourself', stageColor: '#fb923c', xpReward: 35, passThreshold: 75,
            words: [
              { id:'si', word:'Sí', pronunciation:'SEE', translation:'Yes', emoji:'✅', example:'Sí, me gusta.', exampleTranslation:'Yes, I like it.' },
              { id:'no', word:'No', pronunciation:'NOH', translation:'No', emoji:'❌', example:'No, gracias.', exampleTranslation:'No, thank you.' },
              { id:'lo-siento', word:'Lo siento', pronunciation:'loh SYEN-toh', translation:'I am sorry', emoji:'😔', example:'Lo siento.', exampleTranslation:'I am sorry.' },
              { id:'de-nada', word:'De nada', pronunciation:'deh NAH-dah', translation:'You are welcome', emoji:'😊', example:'De nada.', exampleTranslation:'You are welcome.' },
              { id:'ayuda', word:'Ayuda', pronunciation:'ah-YOO-dah', translation:'Help', emoji:'🆘', example:'¡Ayuda!', exampleTranslation:'Help!' },
              { id:'no-entiendo', word:'No entiendo', pronunciation:'no en-TYEN-doh', translation:'I don\'t understand', emoji:'🤷', example:'No entiendo.', exampleTranslation:'I don\'t understand.' },
            ],
          },
          {
            id: 'es-u1-l2-d', title: 'Essential Words Prove It', stage: 'prove', stageLabel: 'Prove It', stageDescription: 'No hints — show what you know!', stageColor: '#f9c846', xpReward: 50, passThreshold: 80,
            words: [
              { id:'si', word:'Sí', pronunciation:'SEE', translation:'Yes', emoji:'✅', example:'Sí, me gusta.', exampleTranslation:'Yes, I like it.' },
              { id:'no', word:'No', pronunciation:'NOH', translation:'No', emoji:'❌', example:'No, gracias.', exampleTranslation:'No, thank you.' },
              { id:'lo-siento', word:'Lo siento', pronunciation:'loh SYEN-toh', translation:'I am sorry', emoji:'😔', example:'Lo siento.', exampleTranslation:'I am sorry.' },
              { id:'de-nada', word:'De nada', pronunciation:'deh NAH-dah', translation:'You are welcome', emoji:'😊', example:'De nada.', exampleTranslation:'You are welcome.' },
              { id:'ayuda', word:'Ayuda', pronunciation:'ah-YOO-dah', translation:'Help', emoji:'🆘', example:'¡Ayuda!', exampleTranslation:'Help!' },
              { id:'no-entiendo', word:'No entiendo', pronunciation:'no en-TYEN-doh', translation:'I don\'t understand', emoji:'🤷', example:'No entiendo.', exampleTranslation:'I don\'t understand.' },
            ],
          },
        ],
      },
      {
        id: 'es-u1-l3',
        number: 3,
        title: 'Numbers 1–10',
        lessons: [
          {
            id: 'es-u1-l3-a', title: 'Numbers Discover', stage: 'discover', stageLabel: 'Discover', stageDescription: 'See it & hear it!', stageColor: '#9b7ff4', xpReward: 10, passThreshold: 0,
            words: [
              { id:'uno', word:'Uno', pronunciation:'OO-noh', translation:'One', emoji:'1️⃣', example:'Tengo un gato.', exampleTranslation:'I have one cat.' },
              { id:'dos', word:'Dos', pronunciation:'DOHS', translation:'Two', emoji:'2️⃣', example:'Hay dos perros.', exampleTranslation:'There are two dogs.' },
              { id:'tres', word:'Tres', pronunciation:'TREHS', translation:'Three', emoji:'3️⃣', example:'Tres manzanas.', exampleTranslation:'Three apples.' },
              { id:'cuatro', word:'Cuatro', pronunciation:'KWAH-troh', translation:'Four', emoji:'4️⃣', example:'Cuatro amigos.', exampleTranslation:'Four friends.' },
              { id:'cinco', word:'Cinco', pronunciation:'SEEN-koh', translation:'Five', emoji:'5️⃣', example:'Cinco estrellas.', exampleTranslation:'Five stars.' },
              { id:'seis', word:'Seis', pronunciation:'SEHS', translation:'Six', emoji:'6️⃣', example:'Seis colores.', exampleTranslation:'Six colours.' },
            ],
          },
          {
            id: 'es-u1-l3-b', title: 'Numbers Understand', stage: 'understand', stageLabel: 'Understand', stageDescription: 'Learn what it means', stageColor: '#3dd9c8', xpReward: 25, passThreshold: 70,
            words: [
              { id:'uno', word:'Uno', pronunciation:'OO-noh', translation:'One', emoji:'1️⃣', example:'Uno', exampleTranslation:'One' },
              { id:'dos', word:'Dos', pronunciation:'DOHS', translation:'Two', emoji:'2️⃣', example:'Dos', exampleTranslation:'Two' },
              { id:'tres', word:'Tres', pronunciation:'TREHS', translation:'Three', emoji:'3️⃣', example:'Tres', exampleTranslation:'Three' },
              { id:'cuatro', word:'Cuatro', pronunciation:'KWAH-troh', translation:'Four', emoji:'4️⃣', example:'Cuatro', exampleTranslation:'Four' },
              { id:'cinco', word:'Cinco', pronunciation:'SEEN-koh', translation:'Five', emoji:'5️⃣', example:'Cinco', exampleTranslation:'Five' },
              { id:'seis', word:'Seis', pronunciation:'SEHS', translation:'Six', emoji:'6️⃣', example:'Seis', exampleTranslation:'Six' },
            ],
          },
          {
            id: 'es-u1-l3-c', title: 'Numbers Practice', stage: 'practice', stageLabel: 'Practice', stageDescription: 'Use it yourself', stageColor: '#fb923c', xpReward: 35, passThreshold: 75,
            words: [
              { id:'uno', word:'Uno', pronunciation:'OO-noh', translation:'One', emoji:'1️⃣', example:'Uno', exampleTranslation:'One' },
              { id:'dos', word:'Dos', pronunciation:'DOHS', translation:'Two', emoji:'2️⃣', example:'Dos', exampleTranslation:'Two' },
              { id:'tres', word:'Tres', pronunciation:'TREHS', translation:'Three', emoji:'3️⃣', example:'Tres', exampleTranslation:'Three' },
              { id:'cuatro', word:'Cuatro', pronunciation:'KWAH-troh', translation:'Four', emoji:'4️⃣', example:'Cuatro', exampleTranslation:'Four' },
              { id:'cinco', word:'Cinco', pronunciation:'SEEN-koh', translation:'Five', emoji:'5️⃣', example:'Cinco', exampleTranslation:'Five' },
              { id:'seis', word:'Seis', pronunciation:'SEHS', translation:'Six', emoji:'6️⃣', example:'Seis', exampleTranslation:'Six' },
            ],
          },
          {
            id: 'es-u1-l3-d', title: 'Numbers Prove It', stage: 'prove', stageLabel: 'Prove It', stageDescription: 'No hints!', stageColor: '#f9c846', xpReward: 50, passThreshold: 80,
            words: [
              { id:'uno', word:'Uno', pronunciation:'OO-noh', translation:'One', emoji:'1️⃣', example:'Uno', exampleTranslation:'One' },
              { id:'dos', word:'Dos', pronunciation:'DOHS', translation:'Two', emoji:'2️⃣', example:'Dos', exampleTranslation:'Two' },
              { id:'tres', word:'Tres', pronunciation:'TREHS', translation:'Three', emoji:'3️⃣', example:'Tres', exampleTranslation:'Three' },
              { id:'cuatro', word:'Cuatro', pronunciation:'KWAH-troh', translation:'Four', emoji:'4️⃣', example:'Cuatro', exampleTranslation:'Four' },
              { id:'cinco', word:'Cinco', pronunciation:'SEEN-koh', translation:'Five', emoji:'5️⃣', example:'Cinco', exampleTranslation:'Five' },
              { id:'seis', word:'Seis', pronunciation:'SEHS', translation:'Six', emoji:'6️⃣', example:'Seis', exampleTranslation:'Six' },
            ],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // UNIT 2 — ME, MY FAMILY & MY BODY
  // ════════════════════════════════════════════════════════
  {
    id: 'es-u2',
    number: 2,
    title: 'Me & My Family',
    subtitle: 'The people I love',
    emoji: '👨‍👩‍👧',
    color: '#f472b6',
    description: 'Learn to talk about yourself and your family in Spanish!',
    levels: [
      {
        id: 'es-u2-l1',
        number: 1,
        title: 'Family Members',
        lessons: [
          {
            id: 'es-u2-l1-a', title: 'Family Discover', stage: 'discover', stageLabel: 'Discover', stageDescription: 'See it & hear it!', stageColor: '#9b7ff4', xpReward: 10, passThreshold: 0,
            words: [
              { id:'mama', word:'Mamá', pronunciation:'mah-MAH', translation:'Mum', emoji:'👩', example:'Mi mamá es bonita.', exampleTranslation:'My mum is beautiful.' },
              { id:'papa', word:'Papá', pronunciation:'pah-PAH', translation:'Dad', emoji:'👨', example:'Mi papá es alto.', exampleTranslation:'My dad is tall.' },
              { id:'hermano', word:'Hermano', pronunciation:'ehr-MAH-noh', translation:'Brother', emoji:'👦', example:'Mi hermano se llama Carlos.', exampleTranslation:'My brother\'s name is Carlos.' },
              { id:'hermana', word:'Hermana', pronunciation:'ehr-MAH-nah', translation:'Sister', emoji:'👧', example:'Mi hermana es pequeña.', exampleTranslation:'My sister is small.' },
              { id:'abuelo', word:'Abuelo', pronunciation:'ah-BWEH-loh', translation:'Grandfather', emoji:'👴', example:'Mi abuelo es muy sabio.', exampleTranslation:'My grandfather is very wise.' },
              { id:'abuela', word:'Abuela', pronunciation:'ah-BWEH-lah', translation:'Grandmother', emoji:'👵', example:'Mi abuela cocina bien.', exampleTranslation:'My grandmother cooks well.' },
            ],
          },
          {
            id: 'es-u2-l1-b', title: 'Family Understand', stage: 'understand', stageLabel: 'Understand', stageDescription: 'Learn what it means', stageColor: '#3dd9c8', xpReward: 25, passThreshold: 70,
            words: [
              { id:'mama', word:'Mamá', pronunciation:'mah-MAH', translation:'Mum', emoji:'👩', example:'Mi mamá.', exampleTranslation:'My mum.' },
              { id:'papa', word:'Papá', pronunciation:'pah-PAH', translation:'Dad', emoji:'👨', example:'Mi papá.', exampleTranslation:'My dad.' },
              { id:'hermano', word:'Hermano', pronunciation:'ehr-MAH-noh', translation:'Brother', emoji:'👦', example:'Mi hermano.', exampleTranslation:'My brother.' },
              { id:'hermana', word:'Hermana', pronunciation:'ehr-MAH-nah', translation:'Sister', emoji:'👧', example:'Mi hermana.', exampleTranslation:'My sister.' },
              { id:'abuelo', word:'Abuelo', pronunciation:'ah-BWEH-loh', translation:'Grandfather', emoji:'👴', example:'Mi abuelo.', exampleTranslation:'My grandfather.' },
              { id:'abuela', word:'Abuela', pronunciation:'ah-BWEH-lah', translation:'Grandmother', emoji:'👵', example:'Mi abuela.', exampleTranslation:'My grandmother.' },
            ],
          },
          {
            id: 'es-u2-l1-c', title: 'Family Practice', stage: 'practice', stageLabel: 'Practice', stageDescription: 'Use it yourself', stageColor: '#fb923c', xpReward: 35, passThreshold: 75,
            words: [
              { id:'mama', word:'Mamá', pronunciation:'mah-MAH', translation:'Mum', emoji:'👩', example:'Mi mamá.', exampleTranslation:'My mum.' },
              { id:'papa', word:'Papá', pronunciation:'pah-PAH', translation:'Dad', emoji:'👨', example:'Mi papá.', exampleTranslation:'My dad.' },
              { id:'hermano', word:'Hermano', pronunciation:'ehr-MAH-noh', translation:'Brother', emoji:'👦', example:'Mi hermano.', exampleTranslation:'My brother.' },
              { id:'hermana', word:'Hermana', pronunciation:'ehr-MAH-nah', translation:'Sister', emoji:'👧', example:'Mi hermana.', exampleTranslation:'My sister.' },
              { id:'abuelo', word:'Abuelo', pronunciation:'ah-BWEH-loh', translation:'Grandfather', emoji:'👴', example:'Mi abuelo.', exampleTranslation:'My grandfather.' },
              { id:'abuela', word:'Abuela', pronunciation:'ah-BWEH-lah', translation:'Grandmother', emoji:'👵', example:'Mi abuela.', exampleTranslation:'My grandmother.' },
            ],
          },
          {
            id: 'es-u2-l1-d', title: 'Family Prove It', stage: 'prove', stageLabel: 'Prove It', stageDescription: 'No hints!', stageColor: '#f9c846', xpReward: 50, passThreshold: 80,
            words: [
              { id:'mama', word:'Mamá', pronunciation:'mah-MAH', translation:'Mum', emoji:'👩', example:'Mi mamá.', exampleTranslation:'My mum.' },
              { id:'papa', word:'Papá', pronunciation:'pah-PAH', translation:'Dad', emoji:'👨', example:'Mi papá.', exampleTranslation:'My dad.' },
              { id:'hermano', word:'Hermano', pronunciation:'ehr-MAH-noh', translation:'Brother', emoji:'👦', example:'Mi hermano.', exampleTranslation:'My brother.' },
              { id:'hermana', word:'Hermana', pronunciation:'ehr-MAH-nah', translation:'Sister', emoji:'👧', example:'Mi hermana.', exampleTranslation:'My sister.' },
              { id:'abuelo', word:'Abuelo', pronunciation:'ah-BWEH-loh', translation:'Grandfather', emoji:'👴', example:'Mi abuelo.', exampleTranslation:'My grandfather.' },
              { id:'abuela', word:'Abuela', pronunciation:'ah-BWEH-lah', translation:'Grandmother', emoji:'👵', example:'Mi abuela.', exampleTranslation:'My grandmother.' },
            ],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // UNIT 3 — MY WORLD
  // ════════════════════════════════════════════════════════
  {
    id: 'es-u3',
    number: 3,
    title: 'My World',
    subtitle: 'Animals, food & colours',
    emoji: '🌍',
    color: '#22c55e',
    description: 'Explore the world around you in Spanish — animals, food, and all the colours!',
    levels: [
      {
        id: 'es-u3-l1',
        number: 1,
        title: 'Animals',
        lessons: [
          {
            id: 'es-u3-l1-a', title: 'Animals Discover', stage: 'discover', stageLabel: 'Discover', stageDescription: 'See it & hear it!', stageColor: '#9b7ff4', xpReward: 10, passThreshold: 0,
            words: [
              { id:'perro', word:'Perro', pronunciation:'PEH-rroh', translation:'Dog', emoji:'🐶', example:'El perro es mi amigo.', exampleTranslation:'The dog is my friend.' },
              { id:'gato', word:'Gato', pronunciation:'GAH-toh', translation:'Cat', emoji:'🐱', example:'El gato duerme mucho.', exampleTranslation:'The cat sleeps a lot.' },
              { id:'pajaro', word:'Pájaro', pronunciation:'PAH-hah-roh', translation:'Bird', emoji:'🐦', example:'El pájaro canta bien.', exampleTranslation:'The bird sings well.' },
              { id:'pez', word:'Pez', pronunciation:'PEHS', translation:'Fish', emoji:'🐟', example:'El pez nada en el agua.', exampleTranslation:'The fish swims in the water.' },
              { id:'caballo', word:'Caballo', pronunciation:'kah-BAH-yoh', translation:'Horse', emoji:'🐴', example:'El caballo es muy rápido.', exampleTranslation:'The horse is very fast.' },
              { id:'leon', word:'León', pronunciation:'leh-ON', translation:'Lion', emoji:'🦁', example:'El león es el rey.', exampleTranslation:'The lion is the king.' },
            ],
          },
          {
            id: 'es-u3-l1-b', title: 'Animals Understand', stage: 'understand', stageLabel: 'Understand', stageDescription: 'Learn what it means', stageColor: '#3dd9c8', xpReward: 25, passThreshold: 70,
            words: [
              { id:'perro', word:'Perro', pronunciation:'PEH-rroh', translation:'Dog', emoji:'🐶', example:'Perro', exampleTranslation:'Dog' },
              { id:'gato', word:'Gato', pronunciation:'GAH-toh', translation:'Cat', emoji:'🐱', example:'Gato', exampleTranslation:'Cat' },
              { id:'pajaro', word:'Pájaro', pronunciation:'PAH-hah-roh', translation:'Bird', emoji:'🐦', example:'Pájaro', exampleTranslation:'Bird' },
              { id:'pez', word:'Pez', pronunciation:'PEHS', translation:'Fish', emoji:'🐟', example:'Pez', exampleTranslation:'Fish' },
              { id:'caballo', word:'Caballo', pronunciation:'kah-BAH-yoh', translation:'Horse', emoji:'🐴', example:'Caballo', exampleTranslation:'Horse' },
              { id:'leon', word:'León', pronunciation:'leh-ON', translation:'Lion', emoji:'🦁', example:'León', exampleTranslation:'Lion' },
            ],
          },
          {
            id: 'es-u3-l1-c', title: 'Animals Practice', stage: 'practice', stageLabel: 'Practice', stageDescription: 'Use it yourself', stageColor: '#fb923c', xpReward: 35, passThreshold: 75,
            words: [
              { id:'perro', word:'Perro', pronunciation:'PEH-rroh', translation:'Dog', emoji:'🐶', example:'Perro', exampleTranslation:'Dog' },
              { id:'gato', word:'Gato', pronunciation:'GAH-toh', translation:'Cat', emoji:'🐱', example:'Gato', exampleTranslation:'Cat' },
              { id:'pajaro', word:'Pájaro', pronunciation:'PAH-hah-roh', translation:'Bird', emoji:'🐦', example:'Pájaro', exampleTranslation:'Bird' },
              { id:'pez', word:'Pez', pronunciation:'PEHS', translation:'Fish', emoji:'🐟', example:'Pez', exampleTranslation:'Fish' },
              { id:'caballo', word:'Caballo', pronunciation:'kah-BAH-yoh', translation:'Horse', emoji:'🐴', example:'Caballo', exampleTranslation:'Horse' },
              { id:'leon', word:'León', pronunciation:'leh-ON', translation:'Lion', emoji:'🦁', example:'León', exampleTranslation:'Lion' },
            ],
          },
          {
            id: 'es-u3-l1-d', title: 'Animals Prove It', stage: 'prove', stageLabel: 'Prove It', stageDescription: 'No hints!', stageColor: '#f9c846', xpReward: 50, passThreshold: 80,
            words: [
              { id:'perro', word:'Perro', pronunciation:'PEH-rroh', translation:'Dog', emoji:'🐶', example:'Perro', exampleTranslation:'Dog' },
              { id:'gato', word:'Gato', pronunciation:'GAH-toh', translation:'Cat', emoji:'🐱', example:'Gato', exampleTranslation:'Cat' },
              { id:'pajaro', word:'Pájaro', pronunciation:'PAH-hah-roh', translation:'Bird', emoji:'🐦', example:'Pájaro', exampleTranslation:'Bird' },
              { id:'pez', word:'Pez', pronunciation:'PEHS', translation:'Fish', emoji:'🐟', example:'Pez', exampleTranslation:'Fish' },
              { id:'caballo', word:'Caballo', pronunciation:'kah-BAH-yoh', translation:'Horse', emoji:'🐴', example:'Caballo', exampleTranslation:'Horse' },
              { id:'leon', word:'León', pronunciation:'leh-ON', translation:'Lion', emoji:'🦁', example:'León', exampleTranslation:'Lion' },
            ],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // UNIT 4 — COLOURS & FOOD
  // ════════════════════════════════════════════════════════
  {
    id: 'es-u4',
    number: 4,
    title: 'Colours & Food',
    subtitle: 'Taste the rainbow!',
    emoji: '🌈',
    color: '#f9c846',
    description: 'Learn all the colours and delicious food words in Spanish!',
    levels: [
      {
        id: 'es-u4-l1',
        number: 1,
        title: 'Colours',
        lessons: [
          {
            id: 'es-u4-l1-a', title: 'Colours Discover', stage: 'discover', stageLabel: 'Discover', stageDescription: 'See it & hear it!', stageColor: '#9b7ff4', xpReward: 10, passThreshold: 0,
            words: [
              { id:'rojo', word:'Rojo', pronunciation:'ROH-hoh', translation:'Red', emoji:'🔴', example:'La manzana es roja.', exampleTranslation:'The apple is red.' },
              { id:'azul', word:'Azul', pronunciation:'ah-SOOL', translation:'Blue', emoji:'🔵', example:'El cielo es azul.', exampleTranslation:'The sky is blue.' },
              { id:'verde', word:'Verde', pronunciation:'BEHR-deh', translation:'Green', emoji:'🟢', example:'La hierba es verde.', exampleTranslation:'The grass is green.' },
              { id:'amarillo', word:'Amarillo', pronunciation:'ah-mah-REE-yoh', translation:'Yellow', emoji:'🟡', example:'El sol es amarillo.', exampleTranslation:'The sun is yellow.' },
              { id:'blanco', word:'Blanco', pronunciation:'BLAHN-koh', translation:'White', emoji:'⬜', example:'La nieve es blanca.', exampleTranslation:'The snow is white.' },
              { id:'negro', word:'Negro', pronunciation:'NEH-groh', translation:'Black', emoji:'⬛', example:'El gato es negro.', exampleTranslation:'The cat is black.' },
            ],
          },
          {
            id: 'es-u4-l1-b', title: 'Colours Understand', stage: 'understand', stageLabel: 'Understand', stageDescription: 'Learn what it means', stageColor: '#3dd9c8', xpReward: 25, passThreshold: 70,
            words: [
              { id:'rojo', word:'Rojo', pronunciation:'ROH-hoh', translation:'Red', emoji:'🔴', example:'Rojo', exampleTranslation:'Red' },
              { id:'azul', word:'Azul', pronunciation:'ah-SOOL', translation:'Blue', emoji:'🔵', example:'Azul', exampleTranslation:'Blue' },
              { id:'verde', word:'Verde', pronunciation:'BEHR-deh', translation:'Green', emoji:'🟢', example:'Verde', exampleTranslation:'Green' },
              { id:'amarillo', word:'Amarillo', pronunciation:'ah-mah-REE-yoh', translation:'Yellow', emoji:'🟡', example:'Amarillo', exampleTranslation:'Yellow' },
              { id:'blanco', word:'Blanco', pronunciation:'BLAHN-koh', translation:'White', emoji:'⬜', example:'Blanco', exampleTranslation:'White' },
              { id:'negro', word:'Negro', pronunciation:'NEH-groh', translation:'Black', emoji:'⬛', example:'Negro', exampleTranslation:'Black' },
            ],
          },
          {
            id: 'es-u4-l1-c', title: 'Colours Practice', stage: 'practice', stageLabel: 'Practice', stageDescription: 'Use it yourself', stageColor: '#fb923c', xpReward: 35, passThreshold: 75,
            words: [
              { id:'rojo', word:'Rojo', pronunciation:'ROH-hoh', translation:'Red', emoji:'🔴', example:'Rojo', exampleTranslation:'Red' },
              { id:'azul', word:'Azul', pronunciation:'ah-SOOL', translation:'Blue', emoji:'🔵', example:'Azul', exampleTranslation:'Blue' },
              { id:'verde', word:'Verde', pronunciation:'BEHR-deh', translation:'Green', emoji:'🟢', example:'Verde', exampleTranslation:'Green' },
              { id:'amarillo', word:'Amarillo', pronunciation:'ah-mah-REE-yoh', translation:'Yellow', emoji:'🟡', example:'Amarillo', exampleTranslation:'Yellow' },
              { id:'blanco', word:'Blanco', pronunciation:'BLAHN-koh', translation:'White', emoji:'⬜', example:'Blanco', exampleTranslation:'White' },
              { id:'negro', word:'Negro', pronunciation:'NEH-groh', translation:'Black', emoji:'⬛', example:'Negro', exampleTranslation:'Black' },
            ],
          },
          {
            id: 'es-u4-l1-d', title: 'Colours Prove It', stage: 'prove', stageLabel: 'Prove It', stageDescription: 'No hints!', stageColor: '#f9c846', xpReward: 50, passThreshold: 80,
            words: [
              { id:'rojo', word:'Rojo', pronunciation:'ROH-hoh', translation:'Red', emoji:'🔴', example:'Rojo', exampleTranslation:'Red' },
              { id:'azul', word:'Azul', pronunciation:'ah-SOOL', translation:'Blue', emoji:'🔵', example:'Azul', exampleTranslation:'Blue' },
              { id:'verde', word:'Verde', pronunciation:'BEHR-deh', translation:'Green', emoji:'🟢', example:'Verde', exampleTranslation:'Green' },
              { id:'amarillo', word:'Amarillo', pronunciation:'ah-mah-REE-yoh', translation:'Yellow', emoji:'🟡', example:'Amarillo', exampleTranslation:'Yellow' },
              { id:'blanco', word:'Blanco', pronunciation:'BLAHN-koh', translation:'White', emoji:'⬜', example:'Blanco', exampleTranslation:'White' },
              { id:'negro', word:'Negro', pronunciation:'NEH-groh', translation:'Black', emoji:'⬛', example:'Negro', exampleTranslation:'Black' },
            ],
          },
        ],
      },
    ],
  },

  // ════════════════════════════════════════════════════════
  // UNIT 5 — SIMPLE CONVERSATIONS
  // ════════════════════════════════════════════════════════
  {
    id: 'es-u5',
    number: 5,
    title: 'Simple Conversations',
    subtitle: 'Start talking!',
    emoji: '💬',
    color: '#60a5fa',
    description: 'Put it all together and have your first real Spanish conversations!',
    levels: [
      {
        id: 'es-u5-l1',
        number: 1,
        title: 'Introduce Yourself',
        lessons: [
          {
            id: 'es-u5-l1-a', title: 'Introductions Discover', stage: 'discover', stageLabel: 'Discover', stageDescription: 'See it & hear it!', stageColor: '#9b7ff4', xpReward: 10, passThreshold: 0,
            words: [
              { id:'me-llamo', word:'Me llamo...', pronunciation:'meh YAH-moh', translation:'My name is...', emoji:'🏷️', example:'Me llamo Finn.', exampleTranslation:'My name is Finn.' },
              { id:'tengo', word:'Tengo... años', pronunciation:'TEN-goh AN-yos', translation:'I am ... years old', emoji:'🎂', example:'Tengo diez años.', exampleTranslation:'I am ten years old.' },
              { id:'soy-de', word:'Soy de...', pronunciation:'SOY deh', translation:'I am from...', emoji:'🌍', example:'Soy de España.', exampleTranslation:'I am from Spain.' },
              { id:'me-gusta', word:'Me gusta...', pronunciation:'meh GOOS-tah', translation:'I like...', emoji:'❤️', example:'Me gusta el fútbol.', exampleTranslation:'I like football.' },
              { id:'no-me-gusta', word:'No me gusta...', pronunciation:'no meh GOOS-tah', translation:'I don\'t like...', emoji:'💔', example:'No me gusta el brócoli.', exampleTranslation:'I don\'t like broccoli.' },
              { id:'como-te-llamas', word:'¿Cómo te llamas?', pronunciation:'KOH-moh teh YAH-mas', translation:'What is your name?', emoji:'❓', example:'¿Cómo te llamas?', exampleTranslation:'What is your name?' },
            ],
          },
          {
            id: 'es-u5-l1-b', title: 'Introductions Understand', stage: 'understand', stageLabel: 'Understand', stageDescription: 'Learn what it means', stageColor: '#3dd9c8', xpReward: 25, passThreshold: 70,
            words: [
              { id:'me-llamo', word:'Me llamo...', pronunciation:'meh YAH-moh', translation:'My name is...', emoji:'🏷️', example:'Me llamo Finn.', exampleTranslation:'My name is Finn.' },
              { id:'tengo', word:'Tengo... años', pronunciation:'TEN-goh AN-yos', translation:'I am ... years old', emoji:'🎂', example:'Tengo diez años.', exampleTranslation:'I am ten years old.' },
              { id:'soy-de', word:'Soy de...', pronunciation:'SOY deh', translation:'I am from...', emoji:'🌍', example:'Soy de España.', exampleTranslation:'I am from Spain.' },
              { id:'me-gusta', word:'Me gusta...', pronunciation:'meh GOOS-tah', translation:'I like...', emoji:'❤️', example:'Me gusta el fútbol.', exampleTranslation:'I like football.' },
              { id:'no-me-gusta', word:'No me gusta...', pronunciation:'no meh GOOS-tah', translation:'I don\'t like...', emoji:'💔', example:'No me gusta el brócoli.', exampleTranslation:'I don\'t like broccoli.' },
              { id:'como-te-llamas', word:'¿Cómo te llamas?', pronunciation:'KOH-moh teh YAH-mas', translation:'What is your name?', emoji:'❓', example:'¿Cómo te llamas?', exampleTranslation:'What is your name?' },
            ],
          },
          {
            id: 'es-u5-l1-c', title: 'Introductions Practice', stage: 'practice', stageLabel: 'Practice', stageDescription: 'Use it yourself', stageColor: '#fb923c', xpReward: 35, passThreshold: 75,
            words: [
              { id:'me-llamo', word:'Me llamo...', pronunciation:'meh YAH-moh', translation:'My name is...', emoji:'🏷️', example:'Me llamo Finn.', exampleTranslation:'My name is Finn.' },
              { id:'tengo', word:'Tengo... años', pronunciation:'TEN-goh AN-yos', translation:'I am ... years old', emoji:'🎂', example:'Tengo diez años.', exampleTranslation:'I am ten years old.' },
              { id:'soy-de', word:'Soy de...', pronunciation:'SOY deh', translation:'I am from...', emoji:'🌍', example:'Soy de España.', exampleTranslation:'I am from Spain.' },
              { id:'me-gusta', word:'Me gusta...', pronunciation:'meh GOOS-tah', translation:'I like...', emoji:'❤️', example:'Me gusta el fútbol.', exampleTranslation:'I like football.' },
              { id:'no-me-gusta', word:'No me gusta...', pronunciation:'no meh GOOS-tah', translation:'I don\'t like...', emoji:'💔', example:'No me gusta el brócoli.', exampleTranslation:'I don\'t like broccoli.' },
              { id:'como-te-llamas', word:'¿Cómo te llamas?', pronunciation:'KOH-moh teh YAH-mas', translation:'What is your name?', emoji:'❓', example:'¿Cómo te llamas?', exampleTranslation:'What is your name?' },
            ],
          },
          {
            id: 'es-u5-l1-d', title: 'Introductions Prove It', stage: 'prove', stageLabel: 'Prove It', stageDescription: 'No hints!', stageColor: '#f9c846', xpReward: 50, passThreshold: 80,
            words: [
              { id:'me-llamo', word:'Me llamo...', pronunciation:'meh YAH-moh', translation:'My name is...', emoji:'🏷️', example:'Me llamo Finn.', exampleTranslation:'My name is Finn.' },
              { id:'tengo', word:'Tengo... años', pronunciation:'TEN-goh AN-yos', translation:'I am ... years old', emoji:'🎂', example:'Tengo diez años.', exampleTranslation:'I am ten years old.' },
              { id:'soy-de', word:'Soy de...', pronunciation:'SOY deh', translation:'I am from...', emoji:'🌍', example:'Soy de España.', exampleTranslation:'I am from Spain.' },
              { id:'me-gusta', word:'Me gusta...', pronunciation:'meh GOOS-tah', translation:'I like...', emoji:'❤️', example:'Me gusta el fútbol.', exampleTranslation:'I like football.' },
              { id:'no-me-gusta', word:'No me gusta...', pronunciation:'no meh GOOS-tah', translation:'I don\'t like...', emoji:'💔', example:'No me gusta el brócoli.', exampleTranslation:'I don\'t like broccoli.' },
              { id:'como-te-llamas', word:'¿Cómo te llamas?', pronunciation:'KOH-moh teh YAH-mas', translation:'What is your name?', emoji:'❓', example:'¿Cómo te llamas?', exampleTranslation:'What is your name?' },
            ],
          },
        ],
      },
    ],
  },
];

// ── HELPER FUNCTIONS ─────────────────────────────────────────

export function getUnit(unitId: string): CurriculumUnit | undefined {
  return SPANISH_CURRICULUM.find(u => u.id === unitId);
}

export function getLesson(lessonId: string): CurriculumLesson | undefined {
  for (const unit of SPANISH_CURRICULUM) {
    for (const level of unit.levels) {
      for (const lesson of level.lessons) {
        if (lesson.id === lessonId) return lesson;
      }
    }
  }
  return undefined;
}

export function getNextLesson(currentLessonId: string): CurriculumLesson | undefined {
  const allLessons: CurriculumLesson[] = [];
  for (const unit of SPANISH_CURRICULUM) {
    for (const level of unit.levels) {
      for (const lesson of level.lessons) {
        allLessons.push(lesson);
      }
    }
  }
  const idx = allLessons.findIndex(l => l.id === currentLessonId);
  return idx >= 0 ? allLessons[idx + 1] : undefined;
}

export function getTotalLessons(): number {
  let count = 0;
  for (const unit of SPANISH_CURRICULUM) {
    for (const level of unit.levels) {
      count += level.lessons.length;
    }
  }
  return count;
}
