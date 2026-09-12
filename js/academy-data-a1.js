/* ============================================================
   Rami Academy — A1 Beginner curriculum (5 units × 4 lessons)
   Every lesson: Rami teaches (teach[]), examples, words, quiz.
   ============================================================ */
const ACADEMY_UNITS_A1 = [
  {
    id: 'a1-words',
    title: 'First Words',
    icon: 'vocab',
    desc: 'Your absolute starting point: the alphabet, numbers, greetings and simple classroom English.',
    lessons: [
      {
        id: 'a1-1-1',
        title: 'The Alphabet & A–Z Sounds',
        tag: 'vocab',
        icon: 'vocab',
        mins: 10,
        xp: 10,
        objective: 'Say every letter of the alphabet and connect each letter to the sound it makes in common words.',
        teach: [
          'The English alphabet has 26 letters: 5 vowels (A E I O U) and 21 consonants. Vowels are the sound makers — every English word needs at least one vowel sound, even if the letter is silent.',
          'Pronounce letters in two groups. First: A F L M N O R S X (they end in an "ay/eh" vowel sound). Second: B C D G P T V Z (they end in a "ee" sound). Practise saying the whole alphabet in a steady rhythm.',
          'Letter names are NOT always the sound they make. "C" is pronounced "see" as a name, but in "cat" it sounds /k/. This is why spelling aloud is a core IELTS skill — examiners love to test letters in names and addresses.',
          'Digraphs are two letters making one sound: SH /ʃ/ (ship), CH /tʃ/ (chair), TH /θ ð/ (think, this), PH /f/ (photo). Never separate them when spelling: "S-H" is one sound, not two.',
          'Rami tip: sing or chant the alphabet out loud once a day. Your mouth needs reps, not just your eyes.'
        ],
        examples: [
          {
            en: 'My name is Rami. R-A-M-I.',
            note: 'Spelling names letter by letter is a guaranteed IELTS Listening phrase.'
          },
          {
            en: 'The word "photo" starts with F, but it sounds like /f/ from PH.',
            note: 'Same sound (/f/), different letters — English loves this.'
          },
          {
            en: '"She" and "ship" both start with the digraph SH.',
            note: 'Two letters, one sound: say it softly, like asking for quiet.'
          }
        ],
        words: [
          {
            w: 'alphabet',
            ar: 'الأبجدية',
            ex: 'The alphabet has 26 letters from A to Z.'
          },
          {
            w: 'vowel',
            ar: 'حرف علة',
            ex: 'A, E, I, O and U are vowels.'
          },
          {
            w: 'consonant',
            ar: 'حرف ساكن',
            ex: 'B, C, D and F are consonants.'
          },
          {
            w: 'digraph',
            ar: 'حرفان بصوت واحد',
            ex: 'SH in "ship" is a digraph.'
          }
        ],
        quiz: [
          {
            q: 'How many letters are in the English alphabet?',
            opts: [
              '24',
              '25',
              '26',
              '28'
            ],
            ans: 2,
            why: 'English has exactly 26 letters, from A to Z.'
          },
          {
            q: 'Which group of letters is everything below?',
            opts: [
              'Vowels',
              'Consonants',
              'Digraphs',
              'Numbers'
            ],
            ans: 0,
            why: 'The five vowels are A, E, I, O, U.'
          },
          {
            q: 'In "chair", the CH sound is best written as:',
            opts: [
              'C-H as one sound /tʃ/',
              'K-A',
              'S-H',
              'Q-U'
            ],
            ans: 0,
            why: 'CH together make the }/tʃ/ sound, as in chair and cheese.'
          },
          {
            q: 'When the examiner says "Please spell your surname", you should:',
            opts: [
              'Write the meaning',
              'Say each letter one by one',
              'Only say the first letter',
              'Guess the spelling'
            ],
            ans: 1,
            why: 'Spelling a name means saying every letter separately, e.g. R-A-M-I.'
          }
        ]
      },
      {
        id: 'a1-1-2',
        title: 'Numbers, Dates & Time',
        tag: 'vocab',
        icon: 'clock',
        mins: 12,
        xp: 10,
        objective: 'Count to 100, say dates, tell the time, and understand prices — the most tested numbers in IELTS.',
        teach: [
          'Counting by tens is your skeleton: ten, twenty, thirty, forty, fifty, sixty, seventy, eighty, ninety, a hundred. Teen numbers (13–19) feel the same but sound different — "thirTEEN" stresses the -TEEN, "THIRty" stresses the front.',
          'Dates in IELTS come in three spoken forms: "the second of May", "May the second", and "2 May". In Listening, you often hear it and must choose the written form — keep the month in your ears, not just the number.',
          'Time phrases to master: "half past two" (2:30), "quarter past" (2:15), "quarter to" (2:45), "twenty past", "ten to". Digital English is easier: "two thirty", "two fifteen".',
          'Money is spoken differently: "seventeen fifty" usually means $17.50, and "eleven eighty" means £11.80. The small coin sounds like a number — trust the unit word that follows (dollars, pounds, euros).',
          'Rami tip: every time you hear English on a screen, jot down the first number you catch. Five minutes a day and numbers stop scaring you.'
        ],
        examples: [
          {
            en: 'The train leaves at half past seven.',
            note: '7:30 — "half past" = 30 minutes after the hour.'
          },
          {
            en: 'My birthday is on the third of April.',
            note: 'Day + of + month: the most natural spoken date form.'
          },
          {
            en: 'The ticket costs twelve fifty.',
            note: 'Probably $12.50 — say it with a currency word to be sure.'
          }
        ],
        words: [
          {
            w: 'hundred',
            ar: 'مئة',
            ex: 'One hundred students take the exam.'
          },
          {
            w: 'quarter',
            ar: 'ربع',
            ex: 'It is a quarter past nine.'
          },
          {
            w: 'past / to',
            ar: 'بعد / إلى (للوقت)',
            ex: 'It is ten past eight and ten to nine.'
          },
          {
            w: 'price',
            ar: 'سعر',
            ex: 'What is the price of this ticket?'
          }
        ],
        quiz: [
          {
            q: '"Half past two" is written as:',
            opts: [
              '2:15',
              '2:30',
              '2:45',
              '3:00'
            ],
            ans: 1,
            why: 'Half past two = 2:30, thirty minutes after two.'
          },
          {
            q: 'Which spoken date matches "3rd May"?',
            opts: [
              'The third of May',
              'The third of March',
              'The thirty of May',
              'The fourth of May'
            ],
            ans: 0,
            why: '"The third of May" is the natural spoken form of 3 May.'
          },
          {
            q: '"The room costs eighty-five fifty" most likely means:',
            opts: [
              '$8.50',
              '$85.50',
              '$8550',
              '$8.55'
            ],
            ans: 1,
            why: 'Eighty-five fifty = eighty-five units and fifty cents: $85.50.'
          },
          {
            q: 'Counting by tens, after "forty" comes:',
            opts: [
              'forty-ten',
              'fifty',
              'eighty',
              'thirty'
            ],
            ans: 1,
            why: 'The tens sequence runs ... forty, fifty, sixty ...'
          }
        ]
      },
      {
        id: 'a1-1-3',
        title: 'Greetings & Introductions',
        tag: 'speaking',
        icon: 'speak',
        mins: 10,
        xp: 10,
        objective: 'Open a conversation, introduce yourself, and say goodbye naturally in English.',
        teach: [
          'Start with a smile and a question. "Hello!", "Good morning!", "How are you?" — and prepare two answers: positive ("I am great, thank you.") and neutral ("Pretty good, thanks. And you?").',
          'Introduce yourself in one breathe: name, where you are from, and what you do. "Hi, I am Omar. I am from Hebron and I study engineering." Three facts, one sentence each — that is an IELTS Part 1 shape.',
          'Everyone forgets the reply: after "And you?" the conversation has to flow. Keep a set of follow-ups ready: "Where are you from?" "What do you do?" "Do you enjoy it?"',
          'End politely: "It was nice meeting you!", "See you later!", "Take care!". Saying goodbye well is as important as saying hello.',
          'Rami tip: introduce yourself out loud to the mirror twice a day. You are rehearsing the real exam.'
        ],
        examples: [
          {
            en: 'Good morning! How are you today? — I am well, thank you. And you?',
            note: 'Polite question + balanced answer + the return question.'
          },
          {
            en: 'Hi, my name is Lara. I am from Nablus and I am a student.',
            note: 'Name + origin + job/studies: the perfect introduction triangle.'
          },
          {
            en: 'It was great talking to you. See you tomorrow!',
            note: 'A warm, natural goodbye that keeps the door open.'
          }
        ],
        words: [
          {
            w: 'introduce',
            ar: 'يُعرّف عن',
            ex: 'Let me introduce myself first.'
          },
          {
            w: 'pleased',
            ar: 'مسرور',
            ex: 'I am pleased to meet you.'
          },
          {
            w: 'from',
            ar: 'من (مدينة/بلد)',
            ex: 'I am from Ramallah.'
          },
          {
            w: 'nice',
            ar: 'لطيف/جميل',
            ex: 'It is nice to meet you.'
          }
        ],
        quiz: [
          {
            q: 'The best answer to "How are you?" is:',
            opts: [
              '"I am fine, thank you. And you?"',
              '"Yes, I am."',
              '"Who are you?"',
              '"Good bye!"'
            ],
            ans: 0,
            why: 'Answer the question, then politely return it with "And you?".'
          },
          {
            q: 'Which introduction gives the right three facts?',
            opts: [
              '"I am Omar, I am from Hebron, and I am a doctor."',
              '"I am fine."',
              '"Hello, hello, hello."',
              '"My name is 26 letters."'
            ],
            ans: 0,
            why: 'Name + origin + job is the strongest simple introduction.'
          },
          {
            q: 'A natural goodbye is:',
            opts: [
              '"It was nice meeting you!"',
              '"How old are you?"',
              '"Give me your phone."',
              '"I am leaving now forever."'
            ],
            ans: 0,
            why: '"Nice meeting you" is a warm, natural closing line.'
          },
          {
            q: 'To keep a conversation alive, best follow-up is:',
            opts: [
              '"Where are you from?"',
              'Silence',
              '"Okay."',
              '"Good bye."'
            ],
            ans: 0,
            why: 'A simple personal question keeps the exchange moving.'
          }
        ]
      },
      {
        id: 'a1-1-4',
        title: 'Classroom Words & Instructions',
        tag: 'vocab',
        icon: 'bookmark',
        mins: 10,
        xp: 10,
        objective: 'Understand common instructions and name everyday classroom objects confidently.',
        teach: [
          'You will hear these words on the IELTS track thousands of times: "open", "close", "listen", "read", "write", "look", "repeat", "answer". They are commands — the base verb at the front.',
          'Two-word commands are everywhere: "turn to page five", "fill in the form", "point at the picture", "put the word in the box". The second word (to, in, at) changes the meaning, so learn commands as whole chunks.',
          'Objects: table, chair, board, book, notebook, pen, pencil, desk, bag, door, window, papers, phone. In the Listening test, the speaker often names the object AND its position: "put it on the desk".',
          '"Listen and repeat" means: hear the sound first (listen), then copy it out loud (repeat). This is the single best habit for pronunciation.',
          'Rami tip: act out commands while saying them. Point at your book, say "my book". Your body remembers what your mouth learns.'
        ],
        examples: [
          {
            en: 'Open your book and turn to page ten.',
            note: 'Two commands in a row — "open" then "turn to".'
          },
          {
            en: 'Fill in the form with your full name.',
            note: '"Fill in" = complete the empty spaces.'
          },
          {
            en: 'Listen to the next question and write your answer.',
            note: 'A classic IELTS-style chain: listen first, write second.'
          }
        ],
        words: [
          {
            w: 'instructions',
            ar: 'تعليمات',
            ex: 'Follow the instructions on the board.'
          },
          {
            w: 'board',
            ar: 'السبورة',
            ex: 'The teacher writes new words on the board.'
          },
          {
            w: 'repeat',
            ar: 'يكرر',
            ex: 'Listen and repeat the sentence.'
          },
          {
            w: 'form',
            ar: 'استمارة',
            ex: 'Write your surname at the top of the form.'
          }
        ],
        quiz: [
          {
            q: '"Turn to page five" means:',
            opts: [
              'Close the book',
              'Open the book at page five',
              'Write five words',
              'Sit down'
            ],
            ans: 1,
            why: '"Turn to page five" = open the book so page five is in front of you.'
          },
          {
            q: 'The correct order for a listening drill is:',
            opts: [
              'Repeat then listen',
              'Listen then repeat',
              'Write then read',
              'Sleep then read'
            ],
            ans: 1,
            why: 'Ears first, mouth second: hear the sound, then copy it.'
          },
          {
            q: 'Which is a classroom object?',
            opts: [
              'Airplane',
              'Notebook',
              'Ocean',
              'Mountain'
            ],
            ans: 1,
            why: 'A notebook is a common classroom object.'
          },
          {
            q: '"Fill in the form" means:',
            opts: [
              'Throw away the form',
              'Complete the empty spaces',
              'Read the form once',
              'Fold the form'
            ],
            ans: 1,
            why: 'Fill in = write your answers in the blank spaces.'
          }
        ]
      }
    ]
  },
  {
    id: 'a1-world',
    title: 'My World',
    icon: 'spark',
    desc: 'Name the people, places, food and feelings around you — the real first vocabulary of life.',
    lessons: [
      {
        id: 'a1-2-1',
        title: 'Family & People',
        tag: 'vocab',
        icon: 'vocab',
        mins: 10,
        xp: 10,
        objective: 'Describe your family and the people around you with precise words.',
        teach: [
          'Family words are the warm-up of Speaking Part 1: mother, father, brother, sister — then wider: grandmother, grandfather, uncle, aunt, cousin, nephew, niece. Say them slowly and own them.',
          'Your direct family is "immediate family"; your wider family is "extended family". Examiners love this pair: "I live with my immediate family, but I visit my extended family every Friday."',
          'Describe people in three moves: appearance (tall, short, young, old), personality (kind, funny, quiet, hard-working), and what they do (my mother is a nurse). Three moves = a full answer.',
          'Age words matter: a baby, a child, a teenager, a young adult, middle-aged, elderly. Choose the right one and your answer instantly sounds accurate.',
          'Rami tip: describe one family member to yourself in English every morning. You will never run out of things to say about your own life.'
        ],
        examples: [
          {
            en: 'I have two brothers and one older sister.',
            note: 'Putting "older/younger" first makes family descriptions crystal clear.'
          },
          {
            en: 'My grandfather is seventy-five, but he is very active.',
            note: 'Age + unexpected quality keeps the answer interesting.'
          },
          {
            en: 'My cousin is studying medicine at university.',
            note: 'Cousin — the most-forgotten family word in the exam.'
          }
        ],
        words: [
          {
            w: 'family',
            ar: 'عائلة',
            ex: 'My family is small, just four people.'
          },
          {
            w: 'parents',
            ar: 'الوالدان',
            ex: 'My parents both work in Gaza City.'
          },
          {
            w: 'cousin',
            ar: 'ابن/ابنة العم أو الخال',
            ex: 'I play football with my cousins.'
          },
          {
            w: 'grandmother',
            ar: 'جدة',
            ex: 'My grandmother makes the best bread.'
          }
        ],
        quiz: [
          {
            q: 'Your father and mother together are your:',
            opts: [
              'cousins',
              'parents',
              'uncles',
              'nieces'
            ],
            ans: 1,
            why: 'Father + mother = parents.'
          },
          {
            q: 'Your uncle\'s son is your:',
            opts: [
              'grandfather',
              'cousin',
              'nephew',
              'aunt'
            ],
            ans: 1,
            why: 'The children of your uncle or aunt are your cousins.'
          },
          {
            q: 'Which sentence describes personality?',
            opts: [
              'My brother is tall',
              'My sister is very funny',
              'My mother is 45',
              'My father is a driver'
            ],
            ans: 1,
            why: 'Funny describes character; the others describe looks, age or job.'
          },
          {
            q: 'The best first answer for "Tell me about your family" is:',
            opts: [
              '"I have three brothers."',
              '"I do not know."',
              '"My cousin lives there."',
              '"Yes please."'
            ],
            ans: 0,
            why: 'Give the number and shape of your family first — then details.'
          }
        ]
      },
      {
        id: 'a1-2-2',
        title: 'Rooms & Home',
        tag: 'vocab',
        icon: 'dome',
        mins: 10,
        xp: 10,
        objective: 'Name every room in a home and the furniture inside it.',
        teach: [
          'The four core rooms: kitchen (cooking), bedroom (sleeping), bathroom (washing), living room (relaxing). Add: dining room (eating), garden (outside). Every IELTS housing answer starts from one of these.',
          'Furniture lives in its room: the fridge and cooker are in the kitchen; the sofa, armchair and TV in the living room; the bed, wardrobe and desk in the bedroom.',
          'Use position words to place things: "The TV is opposite the sofa." "The bed is next to the window." "The fridge is in the corner." Position language boosts your descriptions instantly.',
          'Describe your home in overview first: "I live in a flat on the third floor with two bedrooms and one bathroom." Big picture, then the furniture tour.',
          'Rami tip: walk through your kitchen right now and name everything in English. Real rooms are the best flashcards.'
        ],
        examples: [
          {
            en: 'Our flat has two bedrooms and a small kitchen.',
            note: 'Overview sentence first — size, type, and rooms.'
          },
          {
            en: 'The sofa is opposite the TV in the living room.',
            note: 'Furniture + position = a precise, exam-ready description.'
          },
          {
            en: 'I do my homework at a desk next to my bed.',
            note: 'Desk (furniture) + position (next to) + activity.'
          }
        ],
        words: [
          {
            w: 'flat / apartment',
            ar: 'شقة',
            ex: 'We live in a flat on the first floor.'
          },
          {
            w: 'sofa',
            ar: 'أريكة',
            ex: 'The whole family sits on the sofa.'
          },
          {
            w: 'fridge',
            ar: 'ثلاجة',
            ex: 'There is milk in the fridge.'
          },
          {
            w: 'opposite',
            ar: 'مقابل',
            ex: 'The table is opposite the kitchen door.'
          }
        ],
        quiz: [
          {
            q: 'You sleep in the:',
            opts: [
              'kitchen',
              'bathroom',
              'bedroom',
              'garage'
            ],
            ans: 2,
            why: 'Bedroom = the room with the bed for sleeping.'
          },
          {
            q: 'The fridge and cooker belong in the:',
            opts: [
              'kitchen',
              'living room',
              'bedroom',
              'hall'
            ],
            ans: 0,
            why: 'Cooking appliances live in the kitchen.'
          },
          {
            q: '"The lamp is next to the sofa" means the lamp is:',
            opts: [
              'far from the sofa',
              'on top of the sofa',
              'beside the sofa',
              'behind the sofa in a different room'
            ],
            ans: 2,
            why: 'Next to = directly beside something.'
          },
          {
            q: 'A good first sentence about your home is:',
            opts: [
              '"Flat have two rooms."',
              '"I live in a small flat with one bedroom."',
              '"Bedroom the sofa is."',
              '"I have happy home."'
            ],
            ans: 1,
            why: 'Article + word order: "I live in a small flat with one bedroom."'
          }
        ]
      },
      {
        id: 'a1-2-3',
        title: 'Food & Drink',
        tag: 'vocab',
        icon: 'olive',
        mins: 10,
        xp: 10,
        objective: 'Order food, talk about meals, and describe what you like to eat.',
        teach: [
          'Meals of the day: breakfast (morning), lunch (midday), dinner (evening). All food belongs to one of the groups: fruit, vegetables, meat, fish, bread & grains, dairy, drinks.',
          'Drinks are simple and useful: water, tea, coffee, juice, milk, lemonade. Say what you drink before what you eat: "I usually drink tea, and I love bread with olive oil."',
          'Ordering language for any country: "Can I have...?" "I would like...?" "A glass of water, please." "Two pieces of chicken, please." Polite request = base verb phrase.',
          'Describe taste in three words: sweet, salty, sour, spicy, bitter, fresh. One taste word "upgrades" a boring food answer: "The lemonade is sweet and fresh."',
          'Rami tip: tonight, name everything on your dinner table in English. The exam is made of exactly this vocabulary.'
        ],
        examples: [
          {
            en: 'For lunch I usually eat rice, chicken and salad.',
            note: 'A balanced meal answer: grain + meat + vegetables.'
          },
          {
            en: 'Can I have a cup of tea, please?',
            note: '"Can I have...?" + "please" = perfect polite ordering.'
          },
          {
            en: 'This lemon is too sour, but the orange is very sweet.',
            note: 'Opposite taste words make food talk alive.'
          }
        ],
        words: [
          {
            w: 'breakfast',
            ar: 'فطور',
            ex: 'I eat bread and eggs for breakfast.'
          },
          {
            w: 'vegetables',
            ar: 'خضروات',
            ex: 'I try to eat fresh vegetables every day.'
          },
          {
            w: 'soup',
            ar: 'شوربة',
            ex: 'In winter we drink hot lentil soup.'
          },
          {
            w: 'spicy',
            ar: 'حار (بتوابل)',
            ex: 'I like spicy food, but only a little.'
          }
        ],
        quiz: [
          {
            q: 'The morning meal is:',
            opts: [
              'dinner',
              'breakfast',
              'supper',
              'snack'
            ],
            ans: 1,
            why: 'Breakfast is the first meal of the morning.'
          },
          {
            q: 'A polite way to order is:',
            opts: [
              '"Give me tea now!"',
              '"Can I have a glass of water, please?"',
              '"Tea."',
              '"I want water quick."'
            ],
            ans: 1,
            why: '"Can I have ... please?" is polite and fully correct.'
          },
          {
            q: 'Rice and bread belong to the group of:',
            opts: [
              'vegetables',
              'grains',
              'meat',
              'drinks'
            ],
            ans: 1,
            why: 'Rice and bread are grains — the staple food group.'
          },
          {
            q: '"Sour" describes a taste that is:',
            opts: [
              'sweet like sugar',
              'sharp like lemon',
              'salty like salt',
              'plain like water'
            ],
            ans: 1,
            why: 'Sour = the sharp taste of lemon or vinegar.'
          }
        ]
      },
      {
        id: 'a1-2-4',
        title: 'Body & Feelings',
        tag: 'vocab',
        icon: 'spark',
        mins: 10,
        xp: 10,
        objective: 'Name body parts and say exactly how you feel — physically and emotionally.',
        teach: [
          'Top body parts for the exam: head, face, eyes, ears, nose, mouth, hand, arm, leg, foot, fingers. For a doctor visit add: head (headache), stomach, back, throat.',
          'Health phrases glue the words together: "I have a headache", "My stomach hurts", "I feel tired", "I have a cold". Learn them as whole sentences, not single words.',
          'Feelings, in order of frequency: happy, sad, tired, excited, nervous, relaxed, worried, angry. Two tools make them vivid: very + tired (a lot), a little + nervous (a bit).',
          'The exam asks "How do you feel about...?" constantly. Answer with a feeling word, then one reason: "I feel excited about the exam because I am well prepared."',
          'Rami tip: when you feel an emotion today, say it in English out loud: "I feel tired." Naming feelings in the new language trains honest fluency.'
        ],
        examples: [
          {
            en: 'I have a headache, so I am going to rest.',
            note: 'Symptom + result: a full, natural health sentence.'
          },
          {
            en: 'She feels nervous before every speaking test.',
            note: 'Feeling word (nervous) + the context (before the test).'
          },
          {
            en: 'My hands are cold in the winter mornings.',
            note: 'Body part (hands) + state (cold) + when (winter).'
          }
        ],
        words: [
          {
            w: 'headache',
            ar: 'صداع',
            ex: 'I have a headache from looking at screens.'
          },
          {
            w: 'tired',
            ar: 'متعب',
            ex: 'I feel tired after a long day.'
          },
          {
            w: 'excited',
            ar: 'متحمس',
            ex: 'I am excited about my new course.'
          },
          {
            w: 'worried',
            ar: 'قلق',
            ex: 'She is worried about the exam results.'
          }
        ],
        quiz: [
          {
            q: '"I have a headache" means:',
            opts: [
              'My head hurts',
              'I am happy',
              'My hand is cold',
              'I am hungry'
            ],
            ans: 0,
            why: 'A headache = pain in the head.'
          },
          {
            q: 'Which word describes how you feel BEFORE a big test?',
            opts: [
              'nervous',
              'full',
              'wet',
              'tall'
            ],
            ans: 0,
            why: 'Nervous is the natural feeling of anxiety before a test.'
          },
          {
            q: 'A vivid way to say slightly nervous is:',
            opts: [
              '"a little nervous"',
              '"nervous hundred"',
              '"nervous very"',
              '"nervous now now"'
            ],
            ans: 0,
            why: '"A little nervous" = a small amount of nerves.'
          },
          {
            q: 'Complete: "I feel excited ______ the trip."',
            opts: [
              'about',
              'at',
              'on',
              'from'
            ],
            ans: 0,
            why: 'We say "excited about" + the event.'
          }
        ]
      }
    ]
  },
  {
    id: 'a1-grammar',
    title: 'Basic Grammar 1',
    icon: 'grammar',
    desc: 'The engine of English in one unit: to be, articles, plurals and polite commands.',
    lessons: [
      {
        id: 'a1-3-1',
        title: 'The Verb "to be" (am / is / are)',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 10,
        objective: 'Use am, is and are correctly for yourself, one person, and many people.',
        teach: [
          '"To be" is the most important verb in English. Present simple has three forms: I AM, he/she/it IS, you/we/they ARE. Memorise the three, and linking sentences become possible.',
          'The pattern is always the same: I + am, He + is, They + are, then a noun, adjective or place: "I am a student." "She is tall." "They are in class."',
          'Negative is easy: add NOT. I am not, he is not (isn\'t), they are not (aren\'t). Contractions are gold in speaking: I\'m, he\'s, they\'re, isn\'t, aren\'t.',
          'Questions swap the verb to the front: "Are you ready?" "Is she your sister?" "Am I early?" Rising tone + verb first = a natural yes/no question.',
          'Rami tip: one day, replace every "is/are/am" you write with the correct form out loud. You will catch your own limits and fix them.'
        ],
        examples: [
          {
            en: 'I am a student and my brother is a teacher.',
            note: 'Am for "I", is for one person (he).'
          },
          {
            en: 'We are from Palestine and we are proud of it.',
            note: 'Are for "we" — a plural subject takes are.'
          },
          {
            en: 'Are you ready for the test? — Yes, I am.',
            note: 'Question word order: Are + you + ready?'
          }
        ],
        words: [
          {
            w: 'am / is / are',
            ar: 'يكون (أشكال فعل الكينونة)',
            ex: 'I am ready, he is ready, they are ready.'
          },
          {
            w: 'proud',
            ar: 'فخور',
            ex: 'She is proud of her work.'
          },
          {
            w: 'ready',
            ar: 'جاهز',
            ex: 'Are you ready for the lesson?'
          },
          {
            w: 'happy',
            ar: 'سعيد',
            ex: 'We are happy to see you.'
          }
        ],
        quiz: [
          {
            q: 'Complete: "I ______ a nurse."',
            opts: [
              'am',
              'is',
              'are',
              'be'
            ],
            ans: 0,
            why: 'The subject "I" always takes "am".'
          },
          {
            q: 'Complete: "She ______ my best friend."',
            opts: [
              'am',
              'is',
              'are',
              'be'
            ],
            ans: 1,
            why: 'He, she, it take "is".'
          },
          {
            q: 'Complete: "They ______ from Jordan."',
            opts: [
              'am',
              'is',
              'are',
              'be'
            ],
            ans: 2,
            why: 'They, we, you take "are".'
          },
          {
            q: 'The correct question is:',
            opts: [
              '"You are ready?"',
              '"Are you ready?"',
              '"You is ready?"',
              '"Are ready you?"'
            ],
            ans: 1,
            why: 'Questions move the verb first: Are + you + ready?'
          }
        ]
      },
      {
        id: 'a1-3-2',
        title: 'Articles: a / an / the',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 10,
        objective: 'Choose a, an or the correctly and understand why articles exist.',
        teach: [
          'A/an means "one, but which one is not important": "a book" = any book. The means "you know which one I mean": "the book on the table". That difference — general vs specific — is the heart of articles.',
          'Use "a" before a consonant SOUND and "an" before a vowel SOUND. It is the sound, not the letter: "a university" (sounds YOO), "an hour" (silent H, sounds OW-er).',
          'Use "the" when the listener already knows: "I saw a dog. The dog was black." First time = a, second time = the. This pattern repeats all over IELTS writing.',
          'Big mistakes to avoid: no article before singular nouns ("I have car" is wrong), and "the" with general plurals ("The books are important" is wrong — say "Books are important").',
          'Rami tip: when you write a noun, always ask: "Which one?" If neither you nor the reader can point to it, use a; if everyone knows, use the.'
        ],
        examples: [
          {
            en: 'I bought a phone yesterday. The phone is very fast.',
            note: 'First mention = a; the known one = the.'
          },
          {
            en: 'She is a university student, but she wants to be an engineer.',
            note: 'A before the "y" sound; an before the vowel sound.'
          },
          {
            en: 'The sun rises in the east.',
            note: 'One-of-a-kind things (the sun) always take "the".'
          }
        ],
        words: [
          {
            w: 'a / an',
            ar: 'أداة نكرة (واحد)',
            ex: 'I need a pen and an eraser.'
          },
          {
            w: 'the',
            ar: 'أداة معرفة (الـ)',
            ex: 'Close the door, please.'
          },
          {
            w: 'university',
            ar: 'جامعة',
            ex: 'She studies at a university in Amman.'
          },
          {
            w: 'hour',
            ar: 'ساعة (وقت)',
            ex: 'The lesson lasts one hour.'
          }
        ],
        quiz: [
          {
            q: 'Choose the correct sentence:',
            opts: [
              '"I have car."',
              '"I have a car."',
              '"I have the car." always wrong',
              '"I have an car."'
            ],
            ans: 1,
            why: 'Singular countable nouns need an article: "a car".'
          },
          {
            q: '"An" goes before a word starting with a vowel SOUND: choose the right one.',
            opts: [
              'a university',
              'an hour',
              'a apple',
              'an student'
            ],
            ans: 1,
            why: 'Hour starts with a silent H — first sound is a vowel, so "an hour".'
          },
          {
            q: 'First mention vs the known thing: correct pair is:',
            opts: [
              '"a dog ... the dog"',
              '"the dog ... a dog"',
              '"an dog ... a dog"',
              '"dog ... dog"'
            ],
            ans: 0,
            why: 'Introduce with "a", then refer to the known one with "the".'
          },
          {
            q: 'General statement: which is correct?',
            opts: [
              '"The books are important."',
              '"Books are important."',
              '"A books are important."',
              '"One books is important."'
            ],
            ans: 1,
            why: 'General plural ideas take no article: "Books are important."'
          }
        ]
      },
      {
        id: 'a1-3-3',
        title: 'Plurals & this / that / these / those',
        tag: 'grammar',
        icon: 'vocab',
        mins: 12,
        xp: 10,
        objective: 'Make plurals correctly and point at things with this, that, these and those.',
        teach: [
          'Regular plurals just add -s: book → books, door → doors. Watch the traps: -sh, -ch, -s end with -es (bus → buses, box → boxes); consonant + y becomes -ies (city → cities); -f/-fe often becomes -ves (wife → wives).',
          'Irregular plurals must be learned by heart: man → men, woman → women, child → children, foot → feet, tooth → teeth, person → people, mouse → mice.',
          'This and these are near you; that and those are far from you. This book (in your hand), that book (across the room), these books (here), those books (there). Distance decides the word.',
          'Use them with the verb to be: "This is my pen." "These are my pens." "That is your bag." "Those are your bags." One of these + is-are patterns appears in almost every daily conversation.',
          'Rami tip: point at things around you and say this/that/these/those out loud. Your hands teach your grammar.'
        ],
        examples: [
          {
            en: 'These are my books, and those are yours on the shelf.',
            note: 'These = near plurals; those = far plurals.'
          },
          {
            en: 'There are three children and two women at the door.',
            note: 'Irregular plurals: child→children, woman→women.'
          },
          {
            en: 'That man over there is my uncle.',
            note: '"That" for something far from you.'
          }
        ],
        words: [
          {
            w: 'children',
            ar: 'أطفال',
            ex: 'The children are playing outside.'
          },
          {
            w: 'people',
            ar: 'ناس',
            ex: 'Many people use the bus.'
          },
          {
            w: 'these',
            ar: 'هؤلاء/هذه (قريب، جمع)',
            ex: 'These apples are fresh.'
          },
          {
            w: 'those',
            ar: 'أولئك/تلك (بعيد، جمع)',
            ex: 'Those houses are old.'
          }
        ],
        quiz: [
          {
            q: 'The plural of "city" is:',
            opts: [
              'citys',
              'cities',
              'citie',
              'caties'
            ],
            ans: 1,
            why: 'Consonant + y → -ies: city → cities.'
          },
          {
            q: 'The plural of "child" is:',
            opts: [
              'childs',
              'childes',
              'children',
              'childrens'
            ],
            ans: 2,
            why: 'Child is irregular: child → children.'
          },
          {
            q: 'You hold the pen in your hand. You say:',
            opts: [
              '"That is a pen."',
              '"These is a pen."',
              '"This is a pen."',
              '""Those is a pen.""'
            ],
            ans: 2,
            why: 'Something near you takes "this" + is.'
          },
          {
            q: 'The houses across the street (far away) are:',
            opts: [
              'this houses',
              'these houses',
              'that houses',
              'those houses'
            ],
            ans: 3,
            why: 'Far plurals take "those": those houses.'
          }
        ]
      },
      {
        id: 'a1-3-4',
        title: 'Commands & Polite Requests',
        tag: 'speaking',
        icon: 'speak',
        mins: 10,
        xp: 10,
        objective: 'Give commands and soften them into polite requests.',
        teach: [
          'A command starts with the base verb: "Open the door." "Close the window." It is short, direct, and mostly used between people who know each other.',
          'To make it polite, add "please": "Open the door, please." Put please at the start or the end — both are fine, the end is softer.',
          'Even more polite requests use "Can I...?" or "Could you...?": "Can I have some water?" "Could you help me, please?" These two open every service situation.',
          'Classroom English runs on requests: "Can you repeat that, please?" "Can I go to the bathroom?" "How do you say this in English?" Know these and you are never stuck.',
          'Rami tip: reframe one command you say today into a request: "Pass the salt" → "Could you pass the salt, please?" Politeness is a language skill too.'
        ],
        examples: [
          {
            en: 'Close the door, please.',
            note: 'Command + please = polite.'
          },
          {
            en: 'Can I have a glass of juice, please?',
            note: '"Can I have...?" is the golden request phrase.'
          },
          {
            en: 'Could you speak more slowly, please?',
            note: '"Could you...?" is the most useful classroom request ever.'
          }
        ],
        words: [
          {
            w: 'please',
            ar: 'من فضلك',
            ex: 'Open the window, please.'
          },
          {
            w: 'can / could',
            ar: 'يستطيع',
            ex: 'Can I sit here? Could you help me?'
          },
          {
            w: 'pass',
            ar: 'يمرر',
            ex: 'Pass me the salt, please.'
          },
          {
            w: 'slowly',
            ar: 'ببطء',
            ex: 'Please speak slowly.'
          }
        ],
        quiz: [
          {
            q: 'The most polite request is:',
            opts: [
              '"Give water."',
              '"Water, please, now."',
              '"Could you give me some water, please?"',
              '"I am thirsty give water."'
            ],
            ans: 2,
            why: '"Could you...please?" is both grammatically complete and polite.'
          },
          {
            q: 'To ask a teacher to repeat, you say:',
            opts: [
              '"Repeat you."',
              '"Can you repeat that, please?"',
              '"Again speak."',
              '"What?"'
            ],
            ans: 1,
            why: '"Can you repeat that, please?" is the standard classroom request.'
          },
          {
            q: '"Please" at the end of "Close the door, please" sounds:',
            opts: [
              'rude',
              'softer and more polite',
              'like a question',
              'aggressive'
            ],
            ans: 1,
            why: 'Placing please at the end softens the command.'
          },
          {
            q: 'A direct command without please is:',
            opts: [
              '"Open the window."',
              '"Could you open the window?"',
              '"Can I open the window?"',
              '"May I open the window?"'
            ],
            ans: 0,
            why: 'Base verb at the front is the command form; the others are requests.'
          }
        ]
      }
    ]
  },
  {
    id: 'a1-everyday',
    title: 'Everyday English',
    icon: 'listen',
    desc: 'Survive real life in English: shopping, directions, weather and your daily routine.',
    lessons: [
      {
        id: 'a1-4-1',
        title: 'At the Shop',
        tag: 'speaking',
        icon: 'speak',
        mins: 10,
        xp: 10,
        objective: 'Ask prices, choose items, and pay politely in any shop.',
        teach: [
          'Walk in with a purpose: "Hello! How much is this?" Then give the listener the item: "How much is this jacket?" Asking the price of a specific thing is the #1 shopping phrase.',
          'Saying what you want: "I would like a bottle of water, please." "Can I have two kilos of tomatoes?" "Do you have this in a bigger size?" Each one is just: polite opening + item.',
          'Understand the shopkeeper\'s reply: "That is ten shekels." "$5.50, please." "It is on sale — twenty percent off." Numbers decide everything, so listen for the price twice.',
          'Payment words: cash, card, "Can I pay by card?" Taxi to the transaction: "Here you are." "Thank you, goodbye!"',
          'Rami tip: act out a tiny shopping scene in your head — you are the customer; say every line out loud. Dramatic? Yes. Effective? Very.'
        ],
        examples: [
          {
            en: 'How much is this water bottle?',
            note: 'The price question: "How much is..." + item.'
          },
          {
            en: 'I would like two kilos of oranges, please.',
            note: 'Quantity + unit + item: two kilos of oranges.'
          },
          {
            en: 'Can I pay by card? — Of course.',
            note: 'A smooth, natural payment exchange.'
          }
        ],
        words: [
          {
            w: 'cost',
            ar: 'يكلف',
            ex: 'How much does it cost?'
          },
          {
            w: 'cheap / expensive',
            ar: 'رخيص / غالي',
            ex: 'This one is cheap, but that one is expensive.'
          },
          {
            w: 'size',
            ar: 'مقاس',
            ex: 'Do you have this in a smaller size?'
          },
          {
            w: 'change',
            ar: 'باقي الدراهم',
            ex: 'Here is your change.'
          }
        ],
        quiz: [
          {
            q: 'To ask the price in a shop, say:',
            opts: [
              '"How much is this jacket?"',
              '"Jacket price?"',
              '"This jacket how?"',
              '"How money jacket?"'
            ],
            ans: 0,
            why: '"How much is...?" is the complete, correct price question.'
          },
          {
            q: '"Do you have this in a bigger size?" means you want:',
            opts: [
              'a different colour',
              'a bigger size of the same item',
              'a refund',
              'a cheaper item'
            ],
            ans: 1,
            why: 'You are asking for the same product in a larger size.'
          },
          {
            q: 'The polite way to ask for a product is:',
            opts: [
              '"I would like a bottle of water, please."',
              '"Bottle water want."',
              '"Give water bottle."',
              '"Water bottle I need please please."'
            ],
            ans: 0,
            why: '"I would like..." + item + please is the polite request pattern.'
          },
          {
            q: '"It is on sale" means the item is:',
            opts: [
              'more expensive',
              'reduced in price',
              'out of stock',
              'broken'
            ],
            ans: 1,
            why: 'On sale = the price has been reduced.'
          }
        ]
      },
      {
        id: 'a1-4-2',
        title: 'Asking for Directions',
        tag: 'speaking',
        icon: 'roadmap',
        mins: 10,
        xp: 10,
        objective: 'Ask where places are and follow simple directions in the street.',
        teach: [
          'The two key questions: "Excuse me, where is the bank?" and "How do I get to the hospital?" Always start with "Excuse me" — it is the magic key that opens every conversation with a stranger.',
          'Follow these words: go straight, turn right, turn left, next to, opposite, between, take the second street. Direction vocabulary is tiny — but it is a guaranteed IELTS map question.',
          'Prepositions of place glue it together: the bank is next to the pharmacy, opposite the mosque, between the school and the park. One preposition = one clear location.',
          'If you are lost, say: "Sorry, could you say that again?" "Could you show me on the map?" Asking for a repeat is not weakness — it is advanced communication.',
          'Rami tip: draw a simple map of your own street and describe it in English: "The shop is next to my house." Maps are the best direction teacher.'
        ],
        examples: [
          {
            en: 'Excuse me, where is the nearest pharmacy?',
            note: 'Excuse me + where is + place: the classic opener.'
          },
          {
            en: 'Go straight, then turn left at the bank.',
            note: 'Instruction + marker: straight, then left at the bank.'
          },
          {
            en: 'The school is opposite the park.',
            note: 'Place + opposite + place = clear location.'
          }
        ],
        words: [
          {
            w: 'straight',
            ar: 'مباشرة',
            ex: 'Go straight for two minutes.'
          },
          {
            w: 'turn left',
            ar: 'انعطف يساراً',
            ex: 'Turn left at the traffic light.'
          },
          {
            w: 'next to',
            ar: 'بجانب',
            ex: 'The bank is next to the café.'
          },
          {
            w: 'between',
            ar: 'بين',
            ex: 'The gate is between the two shops.'
          }
        ],
        quiz: [
          {
            q: 'The best way to approach a stranger for directions is:',
            opts: [
              '"Hey you, bank!"',
              '"Excuse me, where is the bank, please?"',
              '"Bank where?"',
              'Silence and pointing'
            ],
            ans: 1,
            why: '"Excuse me" + a full polite question is the respectful opener.'
          },
          {
            q: '"Turn right" means you:',
            opts: [
              'go forward',
              'go to the right side',
              'go back',
              'stop moving'
            ],
            ans: 1,
            why: 'Turn right = change direction to your right.'
          },
          {
            q: '"The bank is between the school and the park" means the bank:',
            opts: [
              'is inside the park',
              'has the school on one side and the park on the other',
              'is far from both',
              'is opposite them'
            ],
            ans: 1,
            why: 'Between = with one thing on each side.'
          },
          {
            q: 'When you do not understand the directions, say:',
            opts: [
              '"I do not understand. Could you repeat it, please?"',
              '"No."',
              '"Goodbye."',
              '"How?" only'
            ],
            ans: 0,
            why: 'Politely asking for a repeat is exactly right.'
          }
        ]
      },
      {
        id: 'a1-4-3',
        title: 'Weather & Seasons',
        tag: 'vocab',
        icon: 'listen',
        mins: 10,
        xp: 10,
        objective: 'Describe the weather and seasons with accurate, natural words.',
        teach: [
          'The weather question is so common it has a set answer: "How is the weather?" → "It is sunny.", "It is rainy.", "It is hot.", "It is cold." The subject is always IT.',
          'Four seasons in order: spring (sunny and fresh), summer (hot and dry), autumn/fall (cool, leaves fall), winter (cold and rainy). Learn them with one image each.',
          'Add intensity words: a little cold, very hot, extremely sunny, a bit windy. Small words = big accuracy.',
          'Prepare the weather-and-feeling sentence: "I love winter because the rain is refreshing, but I hate the cold." Opinion + reason + contrast = one beautiful sentence.',
          'Rami tip: check tomorrow\'s weather in English. "Tomorrow it will be sunny with a small chance of rain." Practise predicting — the exam will ask you to.'
        ],
        examples: [
          {
            en: 'It is sunny today, but it was rainy yesterday.',
            note: 'Weather with a contrast: today vs yesterday.'
          },
          {
            en: 'Summer in my city is very hot and dry.',
            note: 'Season + place + two adjectives.'
          },
          {
            en: 'I like spring because everything is fresh and green.',
            note: 'Opinion + reason about the season.'
          }
        ],
        words: [
          {
            w: 'sunny',
            ar: 'مشمس',
            ex: 'It is a sunny morning.'
          },
          {
            w: 'rainy',
            ar: 'ممطر',
            ex: 'The roads are empty on rainy days.'
          },
          {
            w: 'windy',
            ar: 'عاصف',
            ex: 'It is too windy to open the umbrella.'
          },
          {
            w: 'season',
            ar: 'فصل من فصول السنة',
            ex: 'Spring is my favourite season.'
          }
        ],
        quiz: [
          {
            q: 'The correct weather sentence is:',
            opts: [
              '"Is sunny."',
              '"It is sunny."',
              '"Sunny it."',
              '"Sun is."'
            ],
            ans: 1,
            why: 'Weather always uses "it": It is sunny.'
          },
          {
            q: 'The season with falling leaves and cool air is:',
            opts: [
              'spring',
              'summer',
              'autumn',
              'winter'
            ],
            ans: 2,
            why: 'Autumn is the cool season of falling leaves.'
          },
          {
            q: '"It is extremely hot" means:',
            opts: [
              'a little hot',
              'very hot',
              'cold',
              'sunny'
            ],
            ans: 1,
            why: 'Extremely = to a very high degree.'
          },
          {
            q: 'Complete: "I love summer ______ the beaches are open."',
            opts: [
              'because',
              'but',
              'so',
              'when'
            ],
            ans: 0,
            why: 'Because introduces the reason you love summer.'
          }
        ]
      },
      {
        id: 'a1-4-4',
        title: 'My Daily Routine',
        tag: 'speaking',
        icon: 'clock',
        mins: 12,
        xp: 10,
        objective: 'Describe a normal day from morning to night in present simple.',
        teach: [
          'Anchor your routine with time: "I wake up at 6:30.", "I have breakfast at 7.", "I go to work at 8." Time + verb phrase = the skeleton of every daily-routine answer.',
          'The verbs of the day: wake up, get up, have breakfast, go to work/school, work, have lunch, come home, watch TV, have dinner, go to bed. That is the whole day in ten verbs.',
          'Sequence words make it flow: first, then, after that, next, finally. "First I get up, then I wash my face, after that I have breakfast." Smooth and clear.',
          'Add one "always/usually" pair: "I usually go to bed at 11, but on Fridays I sometimes stay up late." Frequency adverbs are the secret to sounding natural.',
          'Rami tip: your own day is your best sample answer. Memorise it in English and the exam will give you the exact same topic.'
        ],
        examples: [
          {
            en: 'I wake up at six and get up immediately.',
            note: 'Wake up (open your eyes) vs get up (leave the bed).'
          },
          {
            en: 'First I have breakfast, then I go to university.',
            note: 'First ... then ... connects the steps of the morning.'
          },
          {
            en: 'I usually go to bed at eleven, but I sometimes read first.',
            note: 'Usual pattern + exception = natural English.'
          }
        ],
        words: [
          {
            w: 'wake up',
            ar: 'يستيقظ',
            ex: 'I wake up before the alarm.'
          },
          {
            w: 'routine',
            ar: 'روتين يومي',
            ex: 'My morning routine takes one hour.'
          },
          {
            w: 'usually',
            ar: 'عادةً',
            ex: 'I usually walk to work.'
          },
          {
            w: 'finally',
            ar: 'أخيراً',
            ex: 'Finally, I sleep at midnight.'
          }
        ],
        quiz: [
          {
            q: '"Wake up" and "get up" differ because:',
            opts: [
              'they are the same',
              'waking is opening your eyes; getting up is leaving the bed',
              'get up happens first',
              'wake up is only for children'
            ],
            ans: 1,
            why: 'First you wake (eyes open), then you get up (out of bed).'
          },
          {
            q: 'Which sequence word connects routine steps?',
            opts: [
              '"then"',
              '"because"',
              '"although"',
              '"if"'
            ],
            ans: 0,
            why: '"Then" orders events: first ... then ...'
          },
          {
            q: '"I usually go to bed at 11" means:',
            opts: [
              'always',
              'most of the time',
              'never',
              'one day'
            ],
            ans: 1,
            why: 'Usually = on most days, not always.'
          },
          {
            q: 'A complete routine opener is:',
            opts: [
              '"I wake up at six thirty."',
              '"Waking at six."',
              '"Six thirty wake."',
              '"My day at six."'
            ],
            ans: 0,
            why: 'Subject + verb + time: I wake up at six thirty.'
          }
        ]
      }
    ]
  },
  {
    id: 'a1-sentences',
    title: 'Building Sentences',
    icon: 'write',
    desc: 'Turn single words into real sentences: subject-verb-object, pronouns, possessives and the present simple.',
    lessons: [
      {
        id: 'a1-5-1',
        title: 'Subject + Verb + Object',
        tag: 'grammar',
        icon: 'write',
        mins: 12,
        xp: 10,
        objective: 'Build the basic English sentence pattern and keep its strict word order.',
        teach: [
          'English word order is fixed: Subject + Verb + Object (SVO). "Ali (S) drinks (V) water (O)." Chinese and Arabic allow flexible order; English does not — the position IS the meaning.',
          'Invert the order and the meaning collapses: "Water drinks Ali" is nonsense in English. This is why examiners love SVO questions: they test if you trust the pattern.',
          'Add extra information at the edges, not inside the pattern: "Ali drinks water every morning." Time and place go at the end (or the very start), never between subject and verb.',
          'Practice with a checklist: Who does the action? = subject. What action? = verb. Who receives it? = object. Answer the three and your sentence writes itself.',
          'Rami tip: take any sentence you say today and label it S, V, O in your head. After one week the pattern feels automatic.'
        ],
        examples: [
          {
            en: 'The student reads a book.',
            note: 'S = the student, V = reads, O = a book.'
          },
          {
            en: 'My mother cooks rice for dinner.',
            note: 'SVO, then the extra detail (for dinner) at the end.'
          },
          {
            en: 'Every morning, I drink tea.',
            note: 'Time at the start is fine; the pattern S-V-O stays whole.'
          }
        ],
        words: [
          {
            w: 'subject',
            ar: 'فاعل',
            ex: 'The subject does the action.'
          },
          {
            w: 'object',
            ar: 'مفعول به',
            ex: 'The object receives the action.'
          },
          {
            w: 'pattern',
            ar: 'نمط',
            ex: 'English follows a strict sentence pattern.'
          },
          {
            w: 'order',
            ar: 'ترتيب',
            ex: 'Word order carries the meaning.'
          }
        ],
        quiz: [
          {
            q: 'The correct SVO sentence is:',
            opts: [
              '"Tea I drink."',
              '"I drink tea."',
              '"Drink I tea."',
              '"I tea drink."'
            ],
            ans: 1,
            why: 'S (I) + V (drink) + O (tea) — the only English word order.'
          },
          {
            q: 'In "My mother cooks rice", the OBJECT is:',
            opts: [
              'my mother',
              'cooks',
              'rice',
              'every evening'
            ],
            ans: 2,
            why: 'Rice receives the action — the object.'
          },
          {
            q: 'English word order is:',
            opts: [
              'flexible like Arabic',
              'fixed as Subject-Verb-Object',
              'always Object first',
              'no specific order'
            ],
            ans: 1,
            why: 'English is strictly SVO; position defines meaning.'
          },
          {
            q: 'Which sentence puts the extra detail correctly?',
            opts: [
              '"Ali drinks every morning water."',
              '"Ali drinks water every morning."',
              '"Every morning Ali water drinks."',
              '"Ali every morning water drinks."'
            ],
            ans: 1,
            why: 'Extra detail (every morning) goes after the SVO core.'
          }
        ]
      },
      {
        id: 'a1-5-2',
        title: 'Personal Pronouns',
        tag: 'grammar',
        icon: 'write',
        mins: 12,
        xp: 10,
        objective: 'Use I, you, he, she, it, we and they correctly in sentences.',
        teach: [
          'The seven subject pronouns: I, you, he (one man/boy), she (one woman/girl), it (a thing or animal), we (I + others), they (multiple people or things).',
          'Pronouns replace nouns so we stop repeating: "Omar is my brother. HE is a doctor." The pronoun keeps the sentence smooth and short.',
          'Always write "I" with a capital letter, anywhere in the sentence: "Omar and I are students." — never "Omar and me are students."',
          'Watch agreement: HE IS, SHE IS, IT IS, but WE ARE and THEY ARE. The pronoun picks the verb form — this is the number-one beginner error.',
          'Rami tip: swap a noun for a pronoun in every sentence you write today. If it fits, you understand pronouns.'
        ],
        examples: [
          {
            en: 'Layla is my sister. She is a teacher.',
            note: 'She replaces a single woman after the first mention.'
          },
          {
            en: 'Omar and I are brothers.',
            note: 'Use "I", not "me", as the subject.'
          },
          {
            en: 'The dogs are outside. They are playing.',
            note: 'They replaces a plural noun: the dogs.'
          }
        ],
        words: [
          {
            w: 'pronoun',
            ar: 'ضمير',
            ex: 'A pronoun replaces a noun.'
          },
          {
            w: 'he / she',
            ar: 'هو / هي',
            ex: 'He is my father. She is my mother.'
          },
          {
            w: 'we / they',
            ar: 'نحن / هم',
            ex: 'We study together. They live nearby.'
          },
          {
            w: 'it',
            ar: 'هو/هي (لشيء)',
            ex: 'It is a beautiful city.'
          }
        ],
        quiz: [
          {
            q: '"Nour is my sister. ______ is a nurse."',
            opts: [
              'He',
              'She',
              'It',
              'They'
            ],
            ans: 1,
            why: 'She refers to one woman, Nour.'
          },
          {
            q: 'Choose the correct sentence:',
            opts: [
              '"Me and Omar are students."',
              '"Omar and I are students."',
              '"Omar and me are students."',
              '"I and Omar are student."'
            ],
            ans: 1,
            why: 'As the subject, use "I": Omar and I are students.'
          },
          {
            q: '"The teachers are kind. ______ help every student."',
            opts: [
              'He',
              'She',
              'It',
              'They'
            ],
            ans: 3,
            why: 'They replaces the plural: the teachers.'
          },
          {
            q: 'Which pronoun always takes a capital letter?',
            opts: [
              'we',
              'you',
              'I',
              'it'
            ],
            ans: 2,
            why: 'The pronoun "I" is always capitalised.'
          }
        ]
      },
      {
        id: 'a1-5-3',
        title: 'Possessives: my, your, his, her',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 10,
        objective: 'Show ownership with possessive adjectives and the apostrophe S.',
        teach: [
          'Possessives answer "whose?": my (I), your (you), his (he), her (she), its (it), our (we), their (they). They always come BEFORE the noun: "my book", "her house".',
          'Never confuse "its" and "it\'s": "Its" = belonging to it ("The cat licks its paw"); "it\'s" = it is ("It\'s raining"). One is possession, the other is a contraction.',
          '\'s shows ownership for people and living things: "Omar\'s car", "my mother\'s kitchen". For things, use "of" or a noun + noun: "the door of the house" or "the house door".',
          'The exam trap: "Their" (belonging to them), "there" (a place), and "they\'re" (they are) are three different words that sound the same. Write them separately in your mind.',
          'Rami tip: when you say "my/his/her/their", point to the owner with your hand. Feeling the coords of possession helps your brain file it.'
        ],
        examples: [
          {
            en: 'This is my phone and that is her laptop.',
            note: 'My + your possession noun: my phone, her laptop.'
          },
          {
            en: 'Omar\'s father is a doctor.',
            note: 'Apostrophe S shows the family link: Omar\'s father.'
          },
          {
            en: 'The dog wagged its tail.',
            note: '"Its" = belonging to it (no apostrophe).'
          }
        ],
        words: [
          {
            w: 'my / your',
            ar: 'لي / لك',
            ex: 'My bag is black and your bag is red.'
          },
          {
            w: 'their',
            ar: 'لهم',
            ex: 'Their house is very close.'
          },
          {
            w: 'whose',
            ar: 'لمن',
            ex: 'Whose notebook is this?'
          }
        ],
        quiz: [
          {
            q: 'Choose the correct possessive: "______ mother is a teacher."',
            opts: [
              'I',
              'My',
              'Me',
              'Mine is'
            ],
            ans: 1,
            why: 'Possessives come before nouns: my mother.'
          },
          {
            q: '"The dog is cleaning ______ paw."',
            opts: [
              'its',
              'it\'s',
              'its\'',
              'it'
            ],
            ans: 0,
            why: 'Its (no apostrophe) means belonging to the dog.'
          },
          {
            q: '"______ they are" means.',
            opts: [
              'Their',
              'There',
              'They\'re',
              'Theirs'
            ],
            ans: 2,
            why: 'They\'re = they are — a contraction.'
          },
          {
            q: 'The correct way to show that the phone belongs to Omar is:',
            opts: [
              'Omar phone',
              'the phone Omar',
              'Omar\'s phone',
              'phone of Omar\'s'
            ],
            ans: 2,
            why: 'Apostrophe S for people: Omar\'s phone.'
          }
        ]
      },
      {
        id: 'a1-5-4',
        title: 'Present Simple Basics',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 10,
        objective: 'Talk about facts and habits in the present simple, with correct third-person -s.',
        teach: [
          'Present simple = facts and habits. "Water boils at 100 degrees." (fact). "I drink tea every morning." (habit). No -ing, no will — just the base verb.',
          'The ONLY change is the third person singular: he/she/it adds -s: I work → She works; they go → He goes; we have → It has. Most people make 80% of beginner errors right here.',
          'Negative flips with do/does: "I do not like coffee." "She does not like coffee." Notice: the -s moves onto "does", so the main verb loses it: "She does not like" (not "likes").',
          'Questions also use do/does: "Do you study English?" "Does she work here?" The verb returns to base form: "Does she work" (not "works").',
          'Rami tip: test yourself with facts about your life in the third person: "My sister lives in Nablus. My father works in a clinic." Third person is real life.'
        ],
        examples: [
          {
            en: 'My father works in a hospital.',
            note: 'He + works: third person takes -s.'
          },
          {
            en: 'I do not eat fish, but my brother does.',
            note: 'Negative with do + the main verb stays base form.'
          },
          {
            en: 'Does she speak Arabic? — Yes, she speaks English and Arabic.',
            note: 'Question uses Does; the answer uses the -s form.'
          }
        ],
        words: [
          {
            w: 'habit',
            ar: 'عادة',
            ex: 'Drinking tea is my daily habit.'
          },
          {
            w: 'fact',
            ar: 'حقيقة',
            ex: 'The sun rises in the east — a fact.'
          },
          {
            w: 'twice',
            ar: 'مرتين',
            ex: 'I study twice a week.'
          },
          {
            w: 'never',
            ar: 'أبداً',
            ex: 'I never drink coffee at night.'
          }
        ],
        quiz: [
          {
            q: 'Complete: "She ______ in a bank."',
            opts: [
              'works',
              'work',
              'working',
              'worked'
            ],
            ans: 0,
            why: 'Third person singular takes -s: she works.'
          },
          {
            q: 'The correct negative is:',
            opts: [
              '"She does not likes tea."',
              '"She does not like tea."',
              '"She do not likes tea."',
              '"She not likes tea."'
            ],
            ans: 1,
            why: 'The -s moves to does; the main verb stays base form.'
          },
          {
            q: 'The correct question is:',
            opts: [
              '"Do she works here?"',
              '"Does she works here?"',
              '"Does she work here?"',
              '"She do work here?"'
            ],
            ans: 2,
            why: 'Does + she + base verb = question.'
          },
          {
            q: 'Which sentence describes a daily habit?',
            opts: [
              '"I am sleeping now."',
              '"I go to school every day."',
              '"I have slept."',
              '"I was sleeping."'
            ],
            ans: 1,
            why: '"Every day" + present simple = a habit. Present simple is the habit tense.'
          }
        ]
      }
    ]
  }
];
