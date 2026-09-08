/* ============================================================
   IELTS PA — Band 4-9 Academic Curriculum Hub
   4 levels (Foundation → Expert), 6 skill units per level,
   18 guided lessons with checkpoints and XP rewards.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const state = { view: 'home', levelKey: null, lesson: null, answers: {} };

  const UNIT_META = {
    grammar:    { label: 'Grammar',    icon: '🧩', skillKey: 'grammar' },
    vocabulary: { label: 'Vocabulary', icon: '📖', skillKey: 'vocabulary' },
    reading:    { label: 'Reading',    icon: '📚', skillKey: 'reading' },
    listening:  { label: 'Listening',  icon: '🎧', skillKey: 'listening' },
    writing:    { label: 'Writing',    icon: '✍️', skillKey: 'writing' },
    speaking:   { label: 'Speaking',   icon: '🎤', skillKey: 'speaking' }
  };

  const LEVELS = [
    {
      id: 'band4',
      name: 'Band 4',
      label: 'Foundation',
      tagline: 'Build the basics',
      desc: 'Start here if you can read simple texts but struggle with complex ones. Every lesson is short and step-by-step.',
      units: [
        {
          key: 'grammar',
          lessons: [
            {
              title: 'Simple Sentence Structures', mins: 12,
              objective: 'Build clear subject-verb-object sentences that an examiner can understand instantly.',
              learn: [
                'Every IELTS answer relies on the S-V-O skeleton: subject + verb + object. "People need housing." is a complete sentence; "Need housing." is not.',
                'Articles carry meaning: "the government" (specific) vs "a government" (one of many). Missing articles are the most common low-band error.',
                'Word order is strict in English. Time usually comes at the end: "I study IELTS at night", not "I at night study IELTS".',
                'Keep early sentences short and correct. Band 4 accuracy beats Band 6 ambition that collapses.'
              ],
              tip: 'Write three simple sentences about your hometown before every study session this week.',
              cp: 'Quick-check: fix word order, articles and plurals in the 3 micro-questions.',
              xp: 15,
              tasks: [
                { q: 'Which sentence is grammatically correct?', opts: ['She go to the market yesterday.', 'She went to the market yesterday.', 'She going to the market yesterday.', 'She gone to the market yesterday.'], a: 1, why: 'Only "went" is the correct past simple form of "go".' },
                { q: 'Choose the correct sentence.', opts: ['The park has new playground a.', 'Park has a new the playground.', 'The park has a new playground.', 'A new playground has park the.'], a: 2, why: '"The park" is specific, "a new playground" is one of many — correct article + word order.' },
                { q: 'Fix the error: "There are many childs in the school."', opts: ['There are many children in the school.', 'There is many childs in the school.', 'There are many childs in school the.', 'There are many child in the school.'], a: 0, why: '"Childs" does not exist — the irregular plural is "children".' }
              ]
            },
            {
              title: 'Tense Foundations: Present & Past', mins: 14,
              objective: 'Use present simple for habits and past simple for descriptions — the core of Part 1 speaking and Task 1 writing.',
              learn: [
                'Present simple = routine and facts: "I study English every morning." It never takes -s for I/you/we/they.',
                'Past simple = finished actions: "The population rose between 2000 and 2010." Time markers (yesterday, last year, in 2005) force the past.',
                'Common traps: "I studyed" is wrong (→ studied); "costed" is wrong (→ cost); "teached" is wrong (→ taught).',
                'For charts, the data period decides the tense. Data that finished in 2010 → past; data still ongoing → present perfect or present.'
              ],
              tip: 'Describe your daily routine in past tense as if it were yesterday — it trains both tenses at once.',
              cp: 'Quick-check: choose the correct verb form in 3 timed-style sentences.',
              xp: 15,
              tasks: [
                { q: 'My parents ___ in the same factory for twenty years.', opts: ['work', 'works', 'working', 'worked'], a: 3, why: '"For twenty years" describes a finished period → past simple "worked".' },
                { q: 'On the chart, the unemployment rate ___ sharply in 2009.', opts: ['falls', 'fell', 'falling', 'fallen'], a: 1, why: '"in 2009" is a finished time → past simple "fell".' },
                { q: 'Which sentence is correct?', opts: ['She don\'t like fast food.', 'She doesn\'t likes fast food.', 'She doesn\'t like fast food.', 'She no like fast food.'], a: 2, why: 'Third person takes "doesn\'t" + base form: "doesn\'t like".' }
              ]
            }
          ]
        },
        {
          key: 'vocabulary',
          lessons: [
            {
              title: 'Everyday Topic Words', mins: 12,
              objective: 'Learn the 30 highest-frequency words for the topics examiners actually use: work, education, family and transport.',
              learn: [
                'Examiners reuse a small set of topics: work, education, family, housing, transport and health. Prepare word banks for each.',
                'Learn synonyms in pairs so you can paraphrase the question: important = significant = crucial; problem = issue = challenge.',
                'Collocations matter more than single words: make a decision (not do a decision), take a test, commute to work.',
                'Say "traffic congestion" instead of "traffic"; "public transport" instead of "bus or train". Two-word answers impress examiners.',
                'Do not use words you cannot pronounce. If you cannot say it, it cannot boost your speaking band.'
              ],
              tip: 'Make one "topic page" per topic: 6 nouns, 4 verbs, 3 collocations. Review before Part 1 speaking practice.',
              cp: 'Quick-check: pick the correct word or collocation in 3 personal-topic sentences.',
              xp: 15,
              tasks: [
                { q: 'Which collocation is correct?', opts: ['make a decision', 'do a decision', 'create a decision', 'put a decision'], a: 0, why: 'The fixed collocation is "make a decision".' },
                { q: 'A stronger way to say "there is a lot of traffic" is:', opts: ['there are many cars', 'traffic is very full', 'there is heavy traffic congestion', 'the way is busy car'], a: 2, why: '"Heavy traffic congestion" is the natural, higher-level phrase.' },
                { q: 'Which paraphrase of "important" fits an academic essay?', opts: ['nice', 'significant', 'good', 'cool'], a: 1, why: '"Significant" is the academic register; the others are informal.' }
              ]
            }
          ]
        },
        {
          key: 'reading',
          lessons: [
            {
              title: 'Skimming and Scanning', mins: 15,
              objective: 'Read fast on purpose: skim for the main idea, scan for the answer, never read every word.',
              learn: [
                'Skim first: read the title, the first sentence of each paragraph and the conclusion in under one minute. You should know what the text is about.',
                'Scan second: when a question names a number, name or date, let your eyes jump to that keyword and read only the surrounding sentence.',
                'Questions follow the passage order in IELTS. If Question 4 was found at the top of paragraph three, Question 5 is almost never behind it.',
                'Do not panic when you meet unknown words — most can be ignored, and their meaning is usually clear from context.',
                'Time budget: 20 minutes per passage. Spend most of it on questions, not on the passage.'
              ],
              tip: 'Before answering, underline one keyword in every question. Your eyes now know exactly what to hunt for.',
              cp: 'Quick-check: 3 skimming/scanning strategy questions you must apply in the next Reading Hub passage.',
              xp: 15,
              tasks: [
                { q: 'The best first move with a new passage is to:', opts: ['translate every word', 'read the title and first lines of each paragraph', 'answer questions immediately', 'count the paragraphs'], a: 1, why: 'Skimming the title and topic sentences gives the map of the text — the key to speed.' },
                { q: 'A question contains the number "1997". Where do you look first?', opts: ['the first paragraph', 'the last paragraph', 'anywhere the number appears, then the sentence around it', 'the title'], a: 2, why: 'Scanning means jumping to the number and reading only its surrounding sentence.' },
                { q: 'Why do IELTS questions usually follow passage order?', opts: ['So you can skip the passage', 'Because answers are arranged alphabetically', 'To help you locate answers in sequence rather than randomly', 'They do not follow any order'], a: 2, why: 'Sequential questions let you move forward through the passage without re-reading.' }
              ]
            }
          ]
        },
        {
          key: 'listening',
          lessons: [
            {
              title: 'Numbers, Dates and Names', mins: 14,
              objective: 'Catch the details that push your band up: prices, dates, phone numbers and spellings.',
              learn: [
                'Listen for the number, then the unit: "It costs seventeen fifty" may mean $17.50. Units change the meaning completely.',
                'Dates are said in three ways: "the second of May", "May the second", "2 May". Know them all by ear.',
                'Names are spelled for you: "It\'s John — J-O-H-N." Only write what is spelled. Giving a name without spelling is rare.',
                'Numbers over 1000 are tricky: "fifteen hundred" = 1500; "a dozen" = 12; "double four" = 44.',
                'After the answer, the speaker usually confirms it. Keep listening — even if you think you are done.'
              ],
              tip: 'While listening to any English media, write down every number you hear. Five minutes a day sharpens number-catch.',
              cp: 'Quick-check: 3 number/date/name listening-reasoning questions.',
              xp: 15,
              tasks: [
                { q: 'The speaker says "the third of April". Which written form matches?', opts: ['3 May', '3 April', '13 April', '4 March'], a: 1, why: '"The third of April" = 3 April. Watch the month, not just the number.' },
                { q: '"The flight costs eleven eighty" most likely means:', opts: ['£1180', '£11.80', '£1.18', '£118'], a: 1, why: '"Eleven eighty" after a currency is £11.80 — eleven pounds and eighty pence.' },
                { q: 'The speaker says "my mobile is oh seven double four, one four two". You write:', opts: ['0744 142', '0774 142', '0444 142', '0741 142'], a: 0, why: '"Oh seven double four" = 0744, then "one four two" = 142.' }
              ]
            }
          ]
        },
        {
          key: 'writing',
          lessons: [
            {
              title: 'Describing a Simple Chart', mins: 16,
              objective: 'Write the opening line and overview of Task 1 so the examiner immediately sees structure.',
              learn: [
                'Sentence 1 = paraphrase the question: "The line graph shows the percentage of the workforce in part-time jobs." Do not copy the question word for word.',
                'Sentence 2 = the overview: the single biggest trend. "Overall, the figures for men fell while those for women rose."',
                'Use change verbs, not guessing: rose, fell, remained stable, reached a peak, fluctuated.',
                'With decades of data still being collected, use past tense for completed periods and "has/have" for ongoing ones.',
                'Keep it to one paragraph for the description here: two sentences are enough for a Band 4 start.'
              ],
              tip: 'For every chart you meet, force yourself to write exactly two sentences before reading anything else: the paraphrase and the overview.',
              cp: 'Quick-check: 3 building-block questions about Task 1 sentence 1 and the overview.',
              xp: 15,
              tasks: [
                { q: 'The best paraphrase of "The chart shows the number of people working from home" is:', opts: ['The chart shows the number of people working from home.', 'The graph illustrates how many employees worked remotely.', 'Working from home the chart.', 'There is a chart of home workers people.'], a: 1, why: 'A paraphrase changes the words and grammar while keeping the meaning.' },
                { q: 'Which sentence is an overview?', opts: ['The chart begins in 2000.', 'Overall, unemployment fell steadily while inflation rose.', 'The horizontal axis shows the years.', 'The data comes from three countries.'], a: 1, why: 'An overview states the single biggest trend in one clear sentence.' },
                { q: 'For data from 2000 to 2010 (ended), you should use:', opts: ['future tense', 'past tense', 'present perfect only', 'imperatives'], a: 1, why: 'Finished periods require the past tense: "rose", "fell", "remained".' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'band6',
      name: 'Band 6',
      label: 'Core',
      tagline: 'Solidify your skills',
      desc: 'A safe Band 5.5-6.0 plans on building complex sentences and controlling the four skills under time pressure.',
      units: [
        {
          key: 'grammar',
          lessons: [
            {
              title: 'Complex Sentences and Clauses', mins: 16,
              objective: 'Join ideas with because, although and while, and attach relative clauses to boost your grammar score.',
              learn: [
                'Link two ideas with so, because, although: "Although the cost is high, the benefits are clear." One sentence, two ideas, higher band.',
                'Relative clauses add description: "Students who study daily improve faster." The clause begins with who/which/that.',
                'Never leave a clause stranded: "Because I was tired." is not a sentence. It must attach to a main clause.',
                'Comma rules: put a comma after an introductory clause — "While the north declined, the south grew."',
                'Aim for the mix rule: for every complex sentence, keep one simple one. Balance, not complexity, wins.'
              ],
              tip: 'Rewrite three simple sentences as complex ones using although, which and because — then say them aloud.',
              cp: 'Quick-check: 3 clause-joining questions that mirror Task 2 grammar.',
              xp: 15,
              tasks: [
                { q: 'Which sentence is correctly joined?', opts: ['Although it rained, the match continued.', 'Although it rained the match continued.', 'It rained although the match continued.', 'Although the match the rain continued.'], a: 0, why: '"Although" opens the subordinate clause and a comma separates the two parts.' },
                { q: 'Add a relative clause: "The book ___ I borrowed was fascinating."', opts: ['who', 'which', 'where', 'when'], a: 1, why: '"Which" refers to the thing (the book).' },
                { q: 'Which is a fragment (not a complete sentence)?', opts: ['Because the evidence was unclear.', 'The evidence was unclear.', 'The results surprised everyone.', 'We repeated the study twice.'], a: 0, why: '"Because..." starts a subordinate clause with no main clause to attach to.' }
              ]
            }
          ]
        },
        {
          key: 'vocabulary',
          lessons: [
            {
              title: 'Academic Word Families', mins: 15,
              objective: 'Learn word families so one root gives you noun, verb, adjective and adverb forms for free.',
              learn: [
                'One root, many forms: economy → economic → economist → economically. English suits this trick: learn the family, not one word.',
                'IELTS loves nominalisation — turning verbs into nouns: "We analysed" → "The analysis of the data revealed...".',
                'Prefixes change meaning: un- (not), over- (too much), pre- (before), re- (again). "Overestimate" = estimate too high.',
                'Academic verbs to swap in: get → obtain, show → demonstrate, happen → occur, need → require.',
                'Keep a root-word tree: write the root in the middle and four branches for its forms.'
              ],
              tip: 'For every new academic verb, list all four forms in under 30 seconds. That single habit doubles your usable vocabulary.',
              cp: 'Quick-check: 3 word-family and academic-register questions.',
              xp: 15,
              tasks: [
                { q: 'Which word completes the sentence: "The ___ of the economy was faster than expected."', opts: ['economic', 'growth', 'economist', 'economically'], a: 1, why: 'The noun "growth" fits here; the other options are adjective/adverb/agent forms.' },
                { q: 'An academic way to say "the results show the problem is big" is:', opts: ['the results show it is massive', 'the findings demonstrate the scale of the problem', 'the results are very big', 'we can see it is enormous'], a: 1, why: '"Findings" and "demonstrate" are academic verbs; "scale of the problem" is more precise than "big".' },
                { q: 'Which is the correct noun form of "to occur"?', opts: ['occurage', 'occuring', 'occurrence', 'occurive'], a: 2, why: 'The noun is "occurrence" — a frequent IELTS spelling trap.' }
              ]
            }
          ]
        },
        {
          key: 'reading',
          lessons: [
            {
              title: 'Main Idea and True/False/Not Given', mins: 17,
              objective: 'Identify the main idea of any paragraph and master the most feared question type in IELTS Reading.',
              learn: [
                'The main idea usually lives in the first sentence (topic sentence), supported by the rest of the paragraph.',
                'True/False/Not Given: True = the passage says it directly. False = the passage contradicts it. Not Given = you would have to guess.',
                'Paraphrase is the exam\'s favourite trick: the passage says "car ownership quadrupled", the question says "four times more people owned cars" → True.',
                'Three-word test for Not Given: could you answer "yes" or "no" with total certainty? If not, it is Not Given.',
                'Numbers decide everything: if the passage gives a figure that contradicts the statement → False, even if the topic is mentioned.'
              ],
              tip: 'For each statement, write T/F/NG and the passage words that prove it. If you cannot point to proof, it is NG.',
              cp: 'Quick-check: 3 main-idea and TFNG decision questions.',
              xp: 15,
              tasks: [
                { q: 'Passage: "The factory employed 2,000 workers." Statement: "The factory employed fewer than 3,000 workers."', opts: ['True', 'False', 'Not Given'], a: 0, why: '2,000 is fewer than 3,000, and the passage states it directly → True.' },
                { q: 'Passage: "Car ownership quadrupled between 1990 and 2010." Statement: "Four times more people owned cars after 2010."', opts: ['True', 'False', 'Not Given'], a: 1, why: 'The statement says ownership grew fourfold AFTER 2010; the passage says the quadrupling happened DURING 1990–2010 → False.' },
                { q: 'Passage: "The government is considering a congestion charge." Statement: "The government has introduced a congestion charge."', opts: ['True', 'False', 'Not Given'], a: 1, why: '"Considering" (only planned) contradicts "has introduced" (done) → False.' }
              ]
            }
          ]
        },
        {
          key: 'listening',
          lessons: [
            {
              title: 'Section 2: Factual Multiple Choice', mins: 15,
              objective: 'Handle Section 2 — the factual talk or guide — with a preview-and-predict strategy for multiple choice.',
              learn: [
                'Before the audio starts, read the questions and predict: what kind of answer, what topic, what numbers?',
                'One correct option is designed to be tempting but wrong — the distractor. Match meaning, not similar words.',
                'Answers often say the SAME idea in different words. If the audio repeats the option word for word, be suspicious.',
                'Section 2 is usually one speaker giving information (tours, facilities, services). Focus on names, times, prices and features.',
                'If you miss a question, let it go instantly. One lost mark beats losing the next three while you panic.'
              ],
              tip: 'When you read an option, write one keyword above it. When the audio mentions your keyword, that option is being tested.',
              cp: 'Quick-check: 3 Section 2 strategy and distractor questions.',
              xp: 15,
              tasks: [
                { q: 'The best preparation in the 30 seconds of silence before a talk is to:', opts: ['relax and do nothing', 'read and predict the questions', 'write down every answer you expect', 'look at the next section'], a: 1, why: 'Previewing the questions is the single highest-value use of the pause.' },
                { q: 'The audio says "the pool stays open until late on Fridays". The correct option is:', opts: ['The pool closes early on Fridays.', 'The pool is open late on Fridays.', 'The pool is closed on Fridays.', 'The pool opens on Friday evenings only.'], a: 1, why: '"Until late" = "open late" — the same idea in different words.' },
                { q: 'Which phrase signals a distractor (a tempting wrong answer)?', opts: ['"However, the actual price is..."', '"The price is exactly...', '"First of all...', '"In the brochure..."'], a: 0, why: '"However" often corrects the figure just mentioned — the first number is usually the trap.' }
              ]
            }
          ]
        },
        {
          key: 'speaking',
          lessons: [
            {
              title: 'Part 1: Fluency and Range', mins: 15,
              objective: 'Extend every Part 1 answer to two or three sentences: answer + reason + example.',
              learn: [
                'Never answer in one word. The examiner expects three to four sentences minimum per Part 1 question.',
                'Formula: answer → reason ("because") → example or result. "I walk to work. Because the traffic is terrible. For example, yesterday the bus took an hour."',
                'Fluency beats speed. Speak steadily with natural pauses; hesitation and rushes both cost marks.',
                'Use everyday linkers: well, actually, to be honest, literally. They make you sound like a person, not a robot.',
                'One strong topic word per answer lifts your vocabulary score: commute, neighbourhood, commute, colleague.'
              ],
              tip: 'Record a one-minute answer describing your morning routine, then replay it and count the "um"s.',
              cp: 'Quick-check: 3 Part 1 fluency and range questions.',
              xp: 15,
              tasks: [
                { q: 'For "Do you live in a house or a flat?", a Band 6 answer:', opts: ['"Flat."', '"I live in a flat, because it is close to my workplace. Actually, I can walk there in ten minutes."', '"Yes."', '"I do not know."'], a: 1, why: 'Answer + reason + extra detail = the extension examiners reward.' },
                { q: 'Which linker is natural in Part 1?', opts: ['"Moreover, I like it."', '"Furthermore, bread is nice."', '"Well, to be honest, I prefer the morning."', '"Notwithstanding, I go."'], a: 2, why: 'Everyday linkers (well, to be honest) fit spoken English; moreover/furthermore belong in essays.' },
                { q: 'A higher-vocabulary way to say "I go to work every day by bus" is:', opts: ['I take the vehicle daily.', 'I commute by bus every day.', 'I bus to office.', 'I transport every morning.'], a: 1, why: '"Commute" is the precise, natural academic-spoken word.' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'band7',
      name: 'Band 7',
      label: 'Advanced',
      tagline: 'Break through the 6.5 wall',
      desc: 'The Band 6.5-7.0 leap comes from precise lexis, coherent paragraph logic and unforced complex structures.',
      units: [
        {
          key: 'vocabulary',
          lessons: [
            {
              title: 'Collocation and Register', mins: 16,
              objective: 'Sound like an academic by using fixed collocations and controlled formality — the fastest Band 7 vocabulary win.',
              learn: [
                'Collocations are pairings natives just know: heavy rain, high cost, strong evidence. Learn them as chunks, not single words.',
                'Register = formality. In Task 2 write "obtain", "purchase", "substantial"; speak "get", "buy", "big". Mixing them up drops your score.',
                'Hedge instead of overclaiming: "tends to", "is likely to", "to a large extent". Academic English avoids absolute certainty.',
                'Perfect essays are built from linking phrases: "On the one hand...", "This suggests that...", "In light of these arguments...".',
                'Beware translation traps: "make a photo" → "take a photo"; "open the light" → "turn on the light".'
              ],
              tip: 'Notice collocations when you read: underline the whole phrase, not the hard word. Copy three phrases a day into your word bank.',
              cp: 'Quick-check: 3 collocation and register questions.',
              xp: 15,
              tasks: [
                { q: 'Which collocation is natural English?', opts: ['do a mistake', 'make a mistake', 'create a mistake', 'produce a mistake'], a: 1, why: 'The fixed phrase is "make a mistake".' },
                { q: 'The most academic phrasing is:', opts: ['the price of houses is really big', 'property prices were substantial', 'homes cost loads', 'flats are not cheap at all'], a: 1, why: '"Substantial" is formal register; the others are spoken/informal.' },
                { q: 'A Band 7 hedge for "Pollution always causes cancer" is:', opts: ['Pollution always causes cancer.', 'Every cancer comes from pollution.', 'Pollution may contribute to certain cancers.', 'Nobody knows anything about pollution.'], a: 2, why: 'Academic claims are cautious: "may contribute" is defensible, "always causes" is not.' }
              ]
            }
          ]
        },
        {
          key: 'reading',
          lessons: [
            {
              title: 'Matching Headings', mins: 18,
              objective: 'Match a list of headings to paragraphs by finding the MAIN idea — a top Band 7 discriminating skill.',
              learn: [
                'Read each paragraph and write its main idea in five words of your own BEFORE looking at the heading list.',
                'The main idea usually appears in the first sentence, but sometimes the paragraph opens with an example, so read the whole paragraph.',
                'Headings paraphrase the text. If a heading repeats the paragraph\'s exact words, it is probably there to trap you.',
                'Cross off headings as you use them; every heading is used once (or zero) and no heading is used twice.',
                'Do the easiest paragraphs first: those with names, definitions or numbers are usually the clearest.'
              ],
              tip: 'Cover the heading list completely while reading. Decide the main idea first, then reveal the headings and match.',
              cp: 'Quick-check: 3 main-idea and heading-logic questions.',
              xp: 15,
              tasks: [
                { q: 'A paragraph says: "Bees pollinate three quarters of the crops we eat. Without them, fields of fruit and vegetables would empty." The best heading is:', opts: ['The life cycle of a bee', 'Why bees matter to food supply', 'The dangers of beekeeping', 'Bee diseases'], a: 1, why: 'The main idea is importance for food, not bee biology.' },
                { q: 'A paragraph begins with an example before its point. What is the risk of only reading the first line?', opts: ['No risk at all', 'You may mistake an example for the main idea', 'The example is always the answer', 'Headings must match the last line'], a: 1, why: 'Openers can be examples or background; read the full paragraph.' },
                { q: 'A heading copies the exact phrase "extreme weather" from the paragraph. This usually means:', opts: ['It is definitely correct', 'It is a trap — check for paraphrase', 'It must be rejected', 'It is always Not Given'], a: 1, why: 'Exact-word matches are often distractors; the true heading paraphrases the idea.' }
              ]
            }
          ]
        },
        {
          key: 'listening',
          lessons: [
            {
              title: 'Section 3: Academic Discussion', mins: 17,
              objective: 'Follow a recorded academic discussion where two speakers negotiate, disagree and revise opinions.',
              learn: [
                'Section 3 = two or more speakers on a campus topic. Deciding WHOSE opinion is asked is half the battle.',
                'Attitude words tell you where they stand: "I\'m convinced", "I doubt", "I\'m not sure", "Definitely!".',
                'Speakers often change their minds: "At first I thought X, but then I realised Y." Listen to the final position.',
                'Rephrasing is constant: a speaker will say an idea, then immediately offer it in simpler or stronger words.',
                'Predict your answer choice before you hear the detail: you will recognise the same idea in the audio instantly.'
              ],
              tip: 'When a question says "what does Anna think?", follow ONLY Anna. Ignore what the other speaker adds — it is the trap.',
              cp: 'Quick-check: 3 Section 3 attitude-tracking questions.',
              xp: 15,
              tasks: [
                { q: 'Anna: "I used to hate group projects, but now, well, I actually learn a lot from them."', opts: ['Anna still hates group projects', 'Anna now sees value in group projects', 'Anna never tried group projects', 'Anna leads every group project'], a: 1, why: 'The final position is the valuable one: "but now... I actually learn a lot."' },
                { q: 'Which phrase announces a speaker is NOT certain?', opts: ['"I\'m absolutely certain that...', '"There is no doubt that...', '"I\'m not entirely convinced that...', '"Clearly we all agree that...'], a: 2, why: '"Not entirely convinced" hedges uncertainty — the examiner tests attitude words.' },
                { q: 'Two speakers discuss essays. Who says: "The introduction just wastes space, we should skip it entirely."', opts: ['A speaker being literal', 'A speaker exaggerating to make a point', 'The examiner', 'The student being praised'], a: 1, why: 'Speakers overstate for emphasis; the real claim is "introductions are often too long".' }
              ]
            }
          ]
        },
        {
          key: 'writing',
          lessons: [
            {
              title: 'Task 2 Essay Structure', mins: 19,
              objective: 'Deploy the four-paragraph machine consistently: introduction, two body paragraphs, and a conclusion with no new ideas.',
              learn: [
                'Introduction = paraphrase the question + a clear thesis that states your position in one sentence.',
                'Each body paragraph = one main idea + topic sentence + explanation + example. One example per paragraph is non-negotiable.',
                'Integrate your "why": "This is largely because..." / "The consequence is that..." connect your argument to the examiner.',
                'The conclusion = restate your position and summarise the two main ideas. Introducing a third idea here costs you coherence.',
                'Word budget: 250-280 words. Introduction ~40, each body ~90, conclusion ~40.'
              ],
              tip: 'Before writing, sketch: Thesis / Point 1 / Point 2 / Conclusion. Four lines of plan in two minutes beats four rewrites.',
              cp: 'Quick-check: 3 Task 2 structure and coherence questions.',
              xp: 15,
              tasks: [
                { q: 'Which is a proper thesis statement?', opts: ['This essay will discuss the topic.', 'In my view, free education is worth the cost.', 'Many people think different things.', 'There are many arguments.'], a: 1, why: 'A thesis states YOUR clear position, not a vague promise to discuss.' },
                { q: 'A body paragraph on "schools should teach finance" should include:', opts: ['a new unrelated idea, a topic sentence and a conclusion', 'a topic sentence, explanation and one example', 'only statistics', 'the whole essay plan again'], a: 1, why: 'Topic sentence + explain + one example is the Band 7 recipe.' },
                { q: 'The worst way a conclusion can begin is:', opts: ['In conclusion, I believe that...', 'To summarise, the evidence points to...', 'Introducing a brand new argument such as...', 'Overall, the benefits outweigh the drawbacks.'], a: 2, why: 'New arguments belong nowhere — especially not in the conclusion.' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'band8',
      name: 'Band 8',
      label: 'Expert',
      tagline: 'Polishing to mastery',
      desc: 'Band 7.5-8.0 answers do everything well at once. These lessons sharpen the advanced grammar and thinking that separate the top bands.',
      units: [
        {
          key: 'grammar',
          lessons: [
            {
              title: 'Advanced Structures for Band 8', mins: 18,
              objective: 'Add inversion, participle clauses and cleft sentences to sound naturally sophisticated — without risking accuracy.',
              learn: [
                'Inversion for emphasis: "Not only did sales rise, but profits doubled." Flip subject and verb after negative-openers.',
                'Participle clauses condense ideas: "Having reviewed the data, we revised the plan." (= after we reviewed...).',
                'Cleft sentences push focus: "What matters most is the long-term cost." Instead of "The long-term cost matters most."',
                'Nominalisation: "The failure of the policy was predictable" (from "the policy failed predictably").',
                'Elegance fails if accuracy fails: one perfect structure you control beats three fancy ones you do not.'
              ],
              tip: 'Choose ONE advanced structure per essay and use it exactly once. Overuse is the classic Band 7 killer.',
              cp: 'Quick-check: 3 advanced-structure transformation questions.',
              xp: 15,
              tasks: [
                { q: 'Complete the inversion: "Not only ___ , but it also created jobs."', opts: ['the scheme saved money', 'did the scheme save money', 'the scheme did saved money', 'saved the scheme money'], a: 1, why: 'After "Not only", the subject and verb invert: "did the scheme save".' },
                { q: 'Which sentence uses a participle clause?', opts: ['Having surveyed 200 families, the researchers published their findings.', 'The researchers surveyed 200 families and published their findings.', 'The survey was finished and then they published.', 'They want to publish their survey.'], a: 0, why: '"Having surveyed..." is the participle clause that condenses the first action.' },
                { q: 'Rewrite using a cleft: the correct version of "Evidence matters most."', opts: ['What matters most is evidence.', 'Matters most evidence why.', 'Evidence is what matters mostly.', 'It is evidence that matters most.'], a: 0, why: 'The cleft pattern "What... is..." refocuses the sentence on evidence.' }
              ]
            }
          ]
        },
        {
          key: 'reading',
          lessons: [
            {
              title: 'Banded Reading: Attitude and Inference', mins: 18,
              objective: 'Read between the lines for the writer\'s attitude and implied meanings — the questions that decide Band 8.',
              learn: [
                'Top-band questions ask what the writer THINKS, not just what is said: "The author suggests that...".',
                'Attitude words carry it: "unfortunately", "remarkably", "wisely". One adjective can reveal the writer\'s stance.',
                'Inference = what must logically follow, not what you personally believe. If the text makes the claim possible but not certain, it is implied only.',
                'Balance speed and accuracy: the first passage may be easier — do it quickly and bank time for the hard passage.',
                'When two options both sound true, choose the one the passage actually supports; the other usually overstates.'
              ],
              tip: 'Read the final paragraph of a passage first. The writer\'s overall attitude is almost always stated or implied there.',
              cp: 'Quick-check: 3 attitude and inference questions.',
              xp: 15,
              tasks: [
                { q: 'Passage: "Surprisingly, the scheme delivered results within a year." The author\'s attitude is:', opts: ['angry', 'impressed by the speed', 'bored', 'doubtful'], a: 1, why: '"Surprisingly" + "within a year" signals positive surprise at the speed.' },
                { q: 'Passage: "Unless funding is renewed, the programme will close." It is implied that:', opts: ['the programme will definitely close', 'the programme\'s future depends on funding', 'funding is guaranteed', 'the programme has no staff'], a: 1, why: 'The condition states the programme survives only if funding continues — an implication, not a certainty.' },
                { q: 'The writer\'s word "wisely" before "the committee delayed the vote" suggests the writer:', opts: ['supports the delay', 'opposes the delay', 'will vote against waiting', 'has no opinion'], a: 0, why: '"Wisely" is a positive judgement — the writer approves of the delay.' }
              ]
            }
          ]
        },
        {
          key: 'speaking',
          lessons: [
            {
              title: 'Part 3: Abstract Questions', mins: 18,
              objective: 'Answer abstract comparison and opinion questions with structure, evidence and hedging — the Band 8 speaking signature.',
              learn: [
                'Part 3 moves from "you" to "society". Answer generally, not personally: "Older people often prefer..., whereas younger generations...".',
                'Structure your answer: give the view → give the reason → give the exception. "Generally yes, because... However, in some cases...".',
                'Compare before judging: "This depends heavily on... On the one hand..., on the other hand...".',
                'Use abstract vocabulary: inequality, sustainability, mobility, cultural identity, incentives.',
                'Hedge with confidence: "I would tend to argue that", "It is often the case that". Absolute certainty sounds unexamined.'
              ],
              tip: 'End every Part 3 answer with a one-sentence generalisation: "So the deeper issue is how society allocates..." — examiners notice it.',
              cp: 'Quick-check: 3 Part 3 abstract-answer questions.',
              xp: 15,
              tasks: [
                { q: 'For "How has technology changed the way people learn?", a Band 8 start is:', opts: ['"I like learning with my phone."', '"In general terms, technology has shifted learning from classrooms to self-directed, online spaces, though this varies by region."', '"Everything is better now."', '"Technology, you know, is everywhere."'], a: 1, why: 'It answers generally, names the shift, and qualifies it — the abstract Band 8 shape.' },
                { q: 'Which phrase hedges without sounding weak?', opts: ['"I would tentatively suggest that..."', '"I know for a fact that..."', '"Everyone can see that..."', '"Obviously, it is true..."'], a: 0, why: '"I would tentatively suggest" is measured and academic — assertiveness with nuance.' },
                { q: 'A comparison answer should:', opts: ['only describe one side', 'weigh two sides and give your judgement', 'tell a personal story about yourself', 'change the subject'], a: 1, why: 'Part 3 tests comparison and judgement, not autobiography.' }
              ]
            }
          ]
        }
      ]
    }
  ];

  /* ---------- data helpers ---------- */
  function getLessons() {
    const out = [];
    LEVELS.forEach((L) => {
      L.units.forEach((U) => {
        U.lessons.forEach((lesson, i) => {
          out.push({
            ...lesson,
            id: L.id + '/' + U.key + '/' + i,
            n: out.length,
            levelKey: L.id,
            levelName: L.name,
            levelLabel: L.label,
            unitKey: U.key,
            unitLabel: UNIT_META[U.key].label,
            unitIcon: UNIT_META[U.key].icon,
            skillKey: UNIT_META[U.key].skillKey
          });
        });
      });
    });
    return out;
  }
  const LESSONS = getLessons();
  const LESSON_COUNT = LESSONS.length;

  function levelFrom(id) { return LEVELS.find((L) => L.id === id); }
  function unitsWithLessons(L) { return L.units.map((U) => ({ meta: UNIT_META[U.key], lessons: U.lessons, count: U.lessons.length })); }

  /* ---------- persistence ---------- */
  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('curriculum', null);
    if (!c) { c = { done: {} }; window.IELTS_AUTH.setScoped('curriculum', c); }
    return window.IELTS_AUTH.getScoped('curriculum', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('curriculum', c); }
  function progress(c) { const d = c ? Object.keys(c.done || {}).length : 0; return { done: d, total: LESSON_COUNT }; }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; state.levelKey = null; state.lesson = null; state.answers = {}; });

  /* ---------- actions ---------- */
  function answer(n, t, i) {
    state.answers[n + '-' + t] = i;
    const el = document.getElementById('ck-' + n + '-' + t);
    if (el) el.innerHTML = renderTask(n, LESSONS[n], t, i);
  }

  function check(n) {
    const L = LESSONS[n];
    if (!L) return;
    const id = L.id;
    if (window.IELTS_AUTH.completeClaim('curriculum-' + id)) {
      window.IELTS_AUTH.addXp(L.xp);
      window.IELTS_AUTH.addActivity('curriculum', 'Completed lesson: ' + L.title + ' (' + L.levelName + ')', L.xp);
      if (window.IELTS_BAND && window.IELTS_BAND.recordMastery) window.IELTS_BAND.recordMastery(L.skillKey, 25);
      window.toast && window.toast('✅ Lesson complete! +' + L.xp + ' XP');
    }
    const c = cache();
    if (c) { c.done[id] = Date.now(); save(c); }
    render();
  }

  /* ---------- render ---------- */
  function render() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'lesson') return renderLesson();
    if (state.view === 'level') return renderLevel();
    renderHome();
  }
  function open(levelKey) { state.view = 'level'; state.levelKey = levelKey; state.lesson = null; render(); }
  function openLesson(n) { state.view = 'lesson'; state.lesson = n; state.answers = {}; render(); }
  function back() { if (state.view === 'lesson' && state.levelKey) state.view = 'level'; else { state.view = 'home'; state.levelKey = null; } render(); }

  function renderHome() {
    const c = cache() || { done: {} };
    const p = progress(c);
    $('#curriculum-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 class="text-xl font-extrabold text-[#f5f0e6]">📘 Academic Curriculum</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">A guided Band 4 → 8 path. Complete lessons, earn XP and move between skills at your own pace.</p>
          </div>
          <div class="text-right">
            <p class="text-2xl font-extrabold text-[#d4af37]">${p.done}<span class="text-sm text-[#f5f0e6]/50">/${p.total}</span></p>
            <p class="text-[10px] font-bold text-[#f5f0e6]/50 uppercase tracking-wide">Lessons done</p>
          </div>
        </div>
        <div class="w-full h-2 bg-[rgba(212,175,55,0.15)] rounded-full mt-4 overflow-hidden">
          <div class="h-full bg-[#d4af37] rounded-full transition-all" style="width:${Math.round((p.done / p.total) * 100)}%"></div>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        ${LEVELS.map((L) => {
          const ch = unitsWithLessons(L);
          const count = ch.reduce((a, x) => a + x.count, 0);
          const done = ch.reduce((a, U) => a + U.lessons.filter((ls) => { const ll = LESSONS.find((k) => k.levelKey === L.id && k.unitKey === U.meta.skillKey && k.title === ls.title); return ll && c.done[ll.id]; }).length, 0);
          return `
          <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.2)] rounded-2xl p-5 cursor-pointer hover:border-[#d4af37] transition" onclick="IELTS_CURRICULUM.open('${L.id}')">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-3">
                <div class="w-11 h-11 rounded-xl bg-[rgba(212,175,55,0.12)] border border-[rgba(212,175,55,0.3)] flex items-center justify-center text-lg font-extrabold text-[#d4af37]">${done === count ? '✅' : L.label.slice(0, 1)}</div>
                <div>
                  <h3 class="text-lg font-extrabold text-[#f5f0e6]">${esc(L.label)} · ${esc(L.name)}</h3>
                  <p class="text-xs text-[#f5f0e6]/55">${esc(L.tagline)} · ${count} lessons</p>
                </div>
              </div>
              <span class="text-xs font-bold text-[#f5f0e6]/70">${done}/${count}</span>
            </div>
            <p class="text-sm text-[#f5f0e6]/60 mt-2 leading-relaxed">${esc(L.desc)}</p>
            <div class="flex flex-wrap gap-2 mt-4">
              ${ch.map((U) => `<span class="text-[10px] font-bold px-2 py-1 rounded border border-[rgba(212,175,55,0.25)] text-[#f5f0e6]/75">${U.meta.icon} ${U.meta.label} · ${U.count}</span>`).join('')}
            </div>
          </div>`;
        }).join('')}
      </div>
      <p class="text-center text-xs text-[#f5f0e6]/40 mt-6">Checkpoints unlock on every lesson — quiz yourself, then mark it complete for XP.</p>`;
  }

  function renderLevel() {
    const L = levelFrom(state.levelKey);
    if (!L) { renderHome(); return; }
    const c = cache() || { done: {} };
    const ch = unitsWithLessons(L);
    $('#curriculum-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p class="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">${esc(L.label)}</p>
            <h2 class="text-xl font-extrabold text-[#f5f0e6]">${esc(L.name)} — ${esc(L.tagline)}</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">${esc(L.desc)}</p>
          </div>
          <button class="btn-secondary text-sm" onclick="IELTS_CURRICULUM.back()">← All levels</button>
        </div>
      </div>
      ${ch.map((U) => {
        const done = U.lessons.filter((ls) => { const ll = LESSONS.find((k) => k.levelKey === L.id && k.unitKey === U.meta.skillKey && k.title === ls.title); return ll && c.done[ll.id]; }).length;
        return `
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-5 mb-4">
          <div class="flex items-center justify-between mb-3">
            <h3 class="font-extrabold text-[#f5f0e6]">${U.meta.icon} ${U.meta.label}</h3>
            <span class="text-xs font-bold text-[#f5f0e6]/60">${done}/${U.count}</span>
          </div>
          <div class="space-y-2">
            ${U.lessons.map((ls) => {
              const ll = LESSONS.find((k) => k.levelKey === L.id && k.unitKey === U.meta.skillKey && k.title === ls.title);
              const isDone = ll && c.done[ll.id];
              return `
              <div class="flex items-center gap-3 rounded-xl border ${isDone ? 'border-emerald-400/30 bg-emerald-400/5' : 'border-[rgba(212,175,55,0.2)] hover:border-[#d4af37]'} p-3 cursor-pointer transition" onclick="IELTS_CURRICULUM.openLesson(${ll.n})">
                <div class="w-8 h-8 rounded-lg ${isDone ? 'bg-emerald-400/15 text-emerald-300' : 'bg-[rgba(212,175,55,0.12)] text-[#d4af37]'} flex items-center justify-center text-sm">${isDone ? '✓' : '▶'}</div>
                <div class="flex-1">
                  <p class="text-sm font-semibold text-[#f5f0e6]">${esc(ls.title)}</p>
                  <p class="text-xs text-[#f5f0e6]/50">${esc(ls.objective)}</p>
                </div>
                <div class="text-right shrink-0">
                  <p class="text-xs font-bold text-[#f5f0e6]/70">${ls.mins} min</p>
                  <p class="text-[10px] text-[#d4af37]">+${ls.xp} XP</p>
                </div>
              </div>`;
            }).join('')}
          </div>
        </div>`;
      }).join('')}`;
  }

  function renderTask(n, L, t, chosen) {
    const task = L.tasks[t];
    const sel = chosen != null ? chosen : (state.answers[n + '-' + t] != null ? state.answers[n + '-' + t] : null);
    const answered = sel != null;
    const correct = answered && sel === task.a;
    return `
      <div class="mb-3 rounded-lg border p-3 ${answered ? (correct ? 'border-emerald-400/40 bg-emerald-400/5' : 'border-red-400/40 bg-red-400/5') : 'border-[rgba(212,175,55,0.2)]'}">
        <p class="text-sm text-[#f5f0e6] font-semibold mb-2">${t + 1}. ${esc(task.q)}</p>
        <div class="flex flex-wrap gap-2">
          ${task.opts.map((o, i) => `
            <button onclick="IELTS_CURRICULUM.answer(${n},${t},${i})" class="px-3 py-1.5 rounded-lg text-xs border transition ${answered ? (i === task.a ? 'border-emerald-400/60 text-emerald-300 bg-emerald-400/10' : (i === sel ? 'border-red-400/60 text-red-300 bg-red-400/10' : 'border-[rgba(212,175,55,0.15)] text-[#f5f0e6]/50')) : 'border-[rgba(212,175,55,0.25)] text-[#f5f0e6]/85 hover:border-[#d4af37] hover:text-[#f5f0e6]'}">${esc(o)}</button>`).join('')}
        </div>
        ${answered ? `<p class="text-xs mt-2 leading-relaxed ${correct ? 'text-emerald-300' : 'text-red-300'}">${correct ? '✅ Correct — ' : '❌ The answer is: ' + esc(task.opts[task.a]) + ' — '}${esc(task.why)}</p>` : ''}
      </div>`;
  }

  function renderLesson() {
    const n = state.lesson;
    const L = LESSONS[n];
    if (!L) { renderHome(); return; }
    const c = cache() || { done: {} };
    const isDone = !!c.done[L.id];
    $('#curriculum-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <div class="flex items-center justify-between gap-3 flex-wrap">
          <div>
            <p class="text-[10px] font-bold text-[#d4af37] uppercase tracking-widest">${L.levelName} · ${L.unitIcon} ${L.unitLabel}</p>
            <h2 class="text-xl font-extrabold text-[#f5f0e6] mt-1">${esc(L.title)}</h2>
            <p class="text-sm text-[#f5f0e6]/60 mt-1">${esc(L.objective)}</p>
          </div>
          <div class="flex items-center gap-2 flex-wrap">
            ${isDone ? '<span class="text-xs font-bold text-emerald-300 border border-emerald-400/40 px-2 py-1 rounded">✓ Completed</span>' : ''}
            <span class="text-xs font-bold text-[#f5f0e6]/70 border border-[rgba(212,175,55,0.25)] px-2 py-1 rounded">${L.mins} min · +${L.xp} XP</span>
            <button class="btn-secondary text-sm" onclick="IELTS_CURRICULUM.back()">← Back</button>
          </div>
        </div>
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-5">
          <p class="text-xs font-bold text-[#d4af37] mb-3">WHAT YOU\u2019LL LEARN</p>
          <ul class="space-y-2">
            ${L.learn.map((x) => `<li class="text-sm text-[#f5f0e6]/85 flex gap-2"><span class="text-[#d4af37] shrink-0">•</span><span>${esc(x)}</span></li>`).join('')}
          </ul>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-5">
          <p class="text-xs font-bold text-[#d4af37] mb-3">🎯 COACH\u2019S TIP</p>
          <p class="text-sm text-[#f5f0e6]/85 leading-relaxed">${esc(L.tip)}</p>
          <div class="mt-4 pt-4 border-t border-[rgba(212,175,55,0.15)]">
            <p class="text-xs font-bold text-[#d4af37] mb-1">NEXT SKILL IN THIS LEVEL</p>
            <p class="text-sm text-[#f5f0e6]/70">${skillNextHints(state.levelKey, L)}</p>
          </div>
        </div>
      </div>
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-5 mb-6">
        <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
          <p class="text-xs font-bold text-[#d4af37]">CHECKPOINT</p>
          <p class="text-xs text-[#f5f0e6]/55">${esc(L.cp)}</p>
        </div>
        ${L.tasks.map((tk, t) => `<div id="ck-${n}-${t}">${renderTask(n, L, t)}</div>`).join('')}
        <div class="flex items-center justify-between mt-4 flex-wrap gap-3">
          <p class="text-sm text-[#f5f0e6]/70">${isDone ? 'You already earned the XP for this lesson.' : 'Answer the micro-questions, then complete the lesson.'}</p>
          <button class="btn-primary text-sm" onclick="IELTS_CURRICULUM.check(${n})">${isDone ? '✓ Completed' : '✅ Mark Lesson Complete (+' + L.xp + ' XP)'}</button>
        </div>
      </div>`;
  }

  function skillNextHints(levelKey, L) {
    const lv = levelFrom(levelKey);
    if (!lv) return '';
    const keys = lv.units.map((U) => U.key);
    const idx = keys.indexOf(L.unitKey);
    const next = keys[idx + 1] ? lv.units[idx + 1] : lv.units[0];
    const nxt = next.lessons[0];
    if (!nxt) return 'Practice this skill in the engines above before moving up a band.';
    return 'Up next: ' + UNIT_META[next.key].icon + ' ' + esc(nxt.title) + '.';
  }

  window.IELTS_CURRICULUM = { render, open, openLesson, back, check, answer, getLessons };
})();