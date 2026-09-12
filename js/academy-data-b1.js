/* ============================================================
   Rami Academy — B1 Intermediate curriculum (5 units × 4 lessons)
   Every lesson: Rami teaches (teach[]), examples, words, quiz.
   ============================================================ */
const ACADEMY_UNITS_B1 = [
  {
    id: 'b1-grammar',
    title: 'Grammar Depth',
    icon: 'grammar',
    desc: 'The tenses and structures that mark the move from survival to control: perfect, modals, conditionals and passive.',
    lessons: [
      {
        id: 'b1-1-1',
        title: 'Present Perfect vs Past Simple',
        tag: 'grammar',
        icon: 'grammar',
        mins: 15,
        xp: 15,
        objective: 'Decide when a past event connects to now (present perfect) and when it is finished (past simple).',
        teach: [
          'Present perfect = have/has + past participle (done, seen, been, gone): "I have visited Spain." It links the past to NOW — the result or the time frame is still alive.',
          'Past simple = a finished moment, usually with a finished time word: "I visited Spain in 2019." Present perfect hatE finished-time words: never say "I have visited Spain yesterday".',
          'The deciding question: Is the time finished? "Yesterday/last year/in 2010" = past simple. "Ever/never/just/already/yet/recently/so far" = present perfect.',
          'The IELTS trap: experience vs story. The examiner asks "Have you ever...?" to test experience = perfect: "Have you ever studied abroad?" Stories of a specific past moment = simple: "I studied there last year."',
          'Rami tip: narrate your life in two columns — finished dates (past simple) and alive results (present perfect): "I moved in 2021; I have lived here since then." The columns decide everything.'
        ],
        examples: [
          {
            en: 'I have just finished my homework.',
            note: 'Just = a fresh past action connected to now: present perfect.'
          },
          {
            en: 'She has never been abroad.',
            note: 'Never in your life up to now = present perfect.'
          },
          {
            en: 'We went to Jericho last Eid.',
            note: 'Last Eid = a finished time: past simple.'
          }
        ],
        words: [
          {
            w: 'ever',
            ar: 'في أي وقت (السؤال عن تجربة)',
            ex: 'Have you ever tried hiking?'
          },
          {
            w: 'already',
            ar: 'بالفعل',
            ex: 'I have already finished the report.'
          },
          {
            w: 'yet',
            ar: 'بعد (في النفي/السؤال)',
            ex: 'Have you submitted the form yet?'
          },
          {
            w: 'since / for',
            ar: 'منذ / لمدة',
            ex: 'I have lived here since 2019 / for five years.'
          }
        ],
        quiz: [
          {
            q: 'Which sentence is correct?',
            opts: [
              '"I have visited it last year."',
              '"I visited it last year."',
              '"I visited it since last year."',
              '"I visit it last year."'
            ],
            ans: 1,
            why: 'Last year is finished → past simple: visited.'
          },
          {
            q: '"Have you ever ______ sushi?"',
            opts: [
              'ate',
              'eaten',
              'eat',
              'eating'
            ],
            ans: 1,
            why: 'After have/has, use the past participle: eaten.'
          },
          {
            q: 'Since + a point in time, For + a duration. Correct:',
            opts: [
              '"since 2019", "for five years"',
              '"for 2019", "since five years"',
              '"since yesterday five years"',
              'None of the above'
            ],
            ans: 0,
            why: 'Since anchors to a starting moment; for measures the whole span.'
          },
          {
            q: 'The experience-focused question is:',
            opts: [
              '"Have you ever studied abroad?"',
              '"Where did you study in 2015?"',
              '"When did you leave?"',
              '"How long ago?"'
            ],
            ans: 0,
            why: '"Ever...?" asks about life experience → present perfect.'
          }
        ]
      },
      {
        id: 'b1-1-2',
        title: 'Modals: Can, Could, Should, Must',
        tag: 'grammar',
        icon: 'grammar',
        mins: 15,
        xp: 15,
        objective: 'Express ability, advice, obligation and permission with modal verbs.',
        teach: [
          'Modals are helpers that never change: can, could, should, must, may, might, will, would. They take the base verb and never add -s: "She should go" — never "should goes".',
          'Ability: can (now), could (past): "I can swim." "When I was young, I could run fast." Permission: "Can/Could I use your phone?"',
          'Advice: should/shouldn\'t: "You should practise daily." "You shouldn\'t start with Band 9 material." Should = the examiner-friendliest modal.',
          'Obligation: must (strong), have to (necessary by rules): "You must bring your ID." "We have to pay by Sunday." Must not = forbidden; needn\'t = not necessary.',
          'Rami tip: use modals to give yourself advice: "I should speak more. I must stop translating word by word." Advice-to-self = daily modal practice.'
        ],
        examples: [
          {
            en: 'You should review the essays you write.',
            note: 'Should = advice for success.'
          },
          {
            en: 'You must not use your phone during the test.',
            note: 'Must not = strongly forbidden.'
          },
          {
            en: 'When I was a child, I could climb any tree.',
            note: 'Could = past ability.'
          }
        ],
        words: [
          {
            w: 'should',
            ar: 'ينبغي',
            ex: 'You should rest before the exam.'
          },
          {
            w: 'must',
            ar: 'يجب',
            ex: 'Candidates must register early.'
          },
          {
            w: 'could',
            ar: 'استطاع/أمكن',
            ex: 'Could you help me, please?'
          },
          {
            w: 'permission',
            ar: 'إذن',
            ex: 'He gave me permission to leave.'
          }
        ],
        quiz: [
          {
            q: '"She should ______ more carefully."',
            opts: [
              'listen',
              'listens',
              'listening',
              'listened'
            ],
            ans: 0,
            why: 'Modals take the base verb: should listen.'
          },
          {
            q: 'Past ability: correct form is:',
            opts: [
              '"I could swim when I was six."',
              '"I can swim when I was six."',
              '"I should swam when I was six."',
              'All of the above'
            ],
            ans: 0,
            why: 'Could is the past of can for ability.'
          },
          {
            q: 'Strong obligation with a rule:',
            opts: [
              '"You must bring your ID."',
              '"You may bring your ID."',
              '"You might bring your ID."',
              'None of the above'
            ],
            ans: 0,
            why: 'Must = obligation; may and might are possibility.'
          },
          {
            q: 'The best advice for a Band 6 learner is:',
            opts: [
              '"You should practise daily."',
              '"You must stop learning."',
              '"You should give up."',
              '"You could ignore reading."'
            ],
            ans: 0,
            why: 'Should + a positive helpful action = real advice.'
          }
        ]
      },
      {
        id: 'b1-1-3',
        title: 'Zero & First Conditionals',
        tag: 'grammar',
        icon: 'grammar',
        mins: 15,
        xp: 15,
        objective: 'Use if-sentences for general truths (zero) and real future possibilities (first).',
        teach: [
          'Zero conditional = If + base present, base present: "If you heat water, it boils." General facts that are always true. Both halves in present simple.',
          'First conditional = If + present, will + base: "If it rains, we will stay home." A real possible future: condition first, result second.',
          'The result can come first with no comma: "We will stay home if it rains." The "if" half carries the present tense — NEVER "If it will rain".',
          'Test your logic: zero = guaranteed physics; first = likely tomorrow. "If you mix red and blue, you get purple." (zero) "If I finish early, I will call you." (first)',
          'Rami tip: make five "if" promises about your study: "If I study one hour, I will pass." Real life ifs are the ultimate drills.'
        ],
        examples: [
          {
            en: 'If you freeze water, it becomes ice.',
            note: 'Zero conditional: always-true fact, present + present.'
          },
          {
            en: 'If I get a good score, I will apply to university.',
            note: 'First conditional: possible future + result.'
          },
          {
            en: 'We will miss the bus if we do not hurry.',
            note: 'Result first, if-condition second, no comma.'
          }
        ],
        words: [
          {
            w: 'condition',
            ar: 'شرط',
            ex: 'Sleep is the condition for focus.'
          },
          {
            w: 'result',
            ar: 'نتيجة',
            ex: 'Hard work produces a clear result.'
          },
          {
            w: 'possible',
            ar: 'ممكن',
            ex: 'Success is possible with daily practice.'
          },
          {
            w: 'unless',
            ar: 'إلا إذا',
            ex: 'You will not improve unless you practise.'
          }
        ],
        quiz: [
          {
            q: 'Zero conditional: correct sentence is:',
            opts: [
              '"If you heat ice, it melts."',
              '"If you will heat ice, it melts."',
              '"If you heat ice, it melted."',
              'All of the above'
            ],
            ans: 0,
            why: 'General truths use present + present.'
          },
          {
            q: 'First conditional — the correct form is:',
            opts: [
              '"If it rains, we will stay home."',
              '"If it will rain, we stay home."',
              '"If it rained, we stay home."',
              'None of the above'
            ],
            ans: 0,
            why: 'If + present, will + base — never "if it will rain".'
          },
          {
            q: 'The result-first version of "If you study, you will pass" is:',
            opts: [
              '"You will pass if you study."',
              '"You pass if you will study."',
              '"Study if you pass will."',
              'All of the above'
            ],
            ans: 0,
            why: 'Result + if-condition, no comma needed.'
          },
          {
            q: '"If you mix blue and yellow, you get green" is:',
            opts: [
              'zero (always true)',
              'first (possible future)',
              'past',
              'not a conditional'
            ],
            ans: 0,
            why: 'A permanent colour fact = zero conditional.'
          }
        ]
      },
      {
        id: 'b1-1-4',
        title: 'The Passive: present & past',
        tag: 'grammar',
        icon: 'grammar',
        mins: 15,
        xp: 15,
        objective: 'Flip active sentences to the passive and know when IELTS writing prefers it.',
        teach: [
          'Passive = be + past participle: "The bridge was built in 1998." The object of the action (bridge) becomes the subject; the doer follows "by" or disappears.',
          'Two big tenses: present simple passive (is/are + past part: "English is spoken here.") and past passive (was/were + past part: "The report was written yesterday.").',
          'Use the passive when the DOER is unknown, obvious, or unimportant: "The road was repaired." (someone did it — who matters? no one). In reports and essays it sounds objective.',
          'The exam benefit: passive = academic register. "The data were collected" beats "Someone collected the data" in Task 1. "It is believed that..." opens opinions neutrally.',
          'Rami tip: rewrite two sentences of your own essay in the passive today. "I opened the shop" → "The shop was opened." Transfer creates ownership of the pattern.'
        ],
        examples: [
          {
            en: 'English is spoken in over fifty countries.',
            note: 'Present passive: is + spoken.'
          },
          {
            en: 'The new hospital was opened last week.',
            note: 'Past passive: was + opened.'
          },
          {
            en: 'The tests are checked by two examiners.',
            note: 'By + the doer (examiners).'
          }
        ],
        words: [
          {
            w: 'passive',
            ar: 'مبني للمجهول',
            ex: 'The passive puts the object first.'
          },
          {
            w: 'is made of',
            ar: 'مصنوع من',
            ex: 'This table is made of wood.'
          },
          {
            w: 'by',
            ar: 'بواسطة',
            ex: 'The song was written by a poet.'
          },
          {
            w: 'objective',
            ar: 'موضوعي',
            ex: 'The passive sounds more objective.'
          }
        ],
        quiz: [
          {
            q: 'The correct passive is:',
            opts: [
              '"English is spoken in many countries."',
              '"English speaks in many countries."',
              '"English are spoken in many countries."',
              'None of the above'
            ],
            ans: 0,
            why: 'Be (is) + past participle (spoken).'
          },
          {
            q: 'Past passive of "They built the museum in 2000":',
            opts: [
              '"The museum was built in 2000."',
              '"The museum built in 2000."',
              '"The museum is built in 2000."',
              'All of the above'
            ],
            ans: 0,
            why: 'Was + past participle built.'
          },
          {
            q: 'When do we use the passive?',
            opts: [
              'the doer is unknown or unimportant',
              'always for my actions',
              'only in questions',
              'never in English'
            ],
            ans: 0,
            why: 'Passive fits when the doer does not matter or is unknown.'
          },
          {
            q: 'The academic-sounding sentence is:',
            opts: [
              '"The data were collected over two years."',
              '"We collected data over two years."',
              '"They collected the data."',
              'None of the above'
            ],
            ans: 0,
            why: 'The impersonal passive is the objective academic register.'
          }
        ]
      }
    ]
  },
  {
    id: 'b1-workstudy',
    title: 'Work & Study',
    icon: 'write',
    desc: 'Apply, study, email and present — the professional English that exams love to test.',
    lessons: [
      {
        id: 'b1-2-1',
        title: 'Applying for a Job',
        tag: 'writing',
        icon: 'write',
        mins: 15,
        xp: 15,
        objective: 'Write a clear cover letter and talk about your qualifications.',
        teach: [
          'Cover letter formula: why you (introduction) + your key skills + what you can offer + closing line. Four short paragraphs, each one idea.',
          'The opening names the job and your interest: "I am writing to apply for the position of marketing assistant advertised on your website."',
          'Skills language: "I have strong communication skills." "I am experienced in customer service." "I am fluent in Arabic and English." Use "experienced in + -ing", "skilled at + -ing".',
          'Close with action: "I would welcome the opportunity to discuss my application in an interview. Thank you for your time."',
          'Rami tip: write one paragraph about YOUR skills today using the three patterns above. Your CV is the canvas — the language is the paint.'
        ],
        examples: [
          {
            en: 'I am writing to apply for the position of assistant accountant.',
            note: 'The formal application opener.'
          },
          {
            en: 'I am experienced in handling customer complaints.',
            note: 'Experienced in + -ing.'
          },
          {
            en: 'I would welcome the chance to discuss my application.',
            note: 'The polite closing line.'
          }
        ],
        words: [
          {
            w: 'apply for',
            ar: 'يتقدم لـ',
            ex: 'She applied for three jobs.'
          },
          {
            w: 'qualified',
            ar: 'مؤهل',
            ex: 'He is highly qualified for the role.'
          },
          {
            w: 'position',
            ar: 'وظيفة/منصب',
            ex: 'The position requires two years of experience.'
          },
          {
            w: 'experience',
            ar: 'خبرة',
            ex: 'Do you have teaching experience?'
          }
        ],
        quiz: [
          {
            q: 'The correct application opener is:',
            opts: [
              '"I am writing to apply for the position of cashier."',
              '"I want job cashier."',
              '"Give me the job."',
              '"Cashier please."'
            ],
            ans: 0,
            why: 'Formal, clear, names the job — perfect cover-letter opener.'
          },
          {
            q: 'The correct skill phrase is:',
            opts: [
              '"I am experienced in customer service."',
              '"I am experience customer service."',
              '"I experienced customer services."',
              'All of the above'
            ],
            ans: 0,
            why: 'Experienced in + noun or -ing.'
          },
          {
            q: 'The best closing line is:',
            opts: [
              '"Thank you for your time. I look forward to your reply."',
              '"Reply fast."',
              '"Bye."',
              '"Give me the job now."'
            ],
            ans: 0,
            why: 'Thanks + formal future hope = professional close.'
          },
          {
            q: 'Which is a qualification word?',
            opts: [
              'qualified',
              'tired',
              'yellow',
              'slow'
            ],
            ans: 0,
            why: 'Qualified = having the necessary skills/credentials.'
          }
        ]
      },
      {
        id: 'b1-2-2',
        title: 'Study & Academic Vocabulary',
        tag: 'vocab',
        icon: 'vocab',
        mins: 15,
        xp: 15,
        objective: 'Use the academic words that raise scores: analyse, evaluate, improve, overcome.',
        teach: [
          'The five academic verbs of IELTS: analyse (break down), evaluate (judge value), describe (picture), discuss (explore both sides), argue (defend a view). Know precisely what each prompt asks.',
          'Process verbs for study: improve, develop, overcome, achieve, focus on, excel at. "I improved my writing by practising daily." Each is a whole action word.',
          'Replace school words with academic words: "get" → obtain, "think" → consider, "show" → demonstrate, "need" → require, "help" → facilitate. In the essay, one academic verb upgrades a full line.',
          'The collocations that matter: conduct research, reach a conclusion, draw on evidence, make an argument, gain experience, set a goal.',
          'Rami tip: make a two-column page — school word → academic word — and review five pairs every day. The exam tests transfer, not memorisation.'
        ],
        examples: [
          {
            en: 'The essay analyses the causes and evaluates the solutions.',
            note: 'Academic verbs analyse + evaluate.'
          },
          {
            en: 'She focused on improving her vocabulary first.',
            note: 'Focus on + improve: the study process.'
          },
          {
            en: 'The study demonstrates that sleep improves memory.',
            note: 'Demonstrate = the academic show.'
          }
        ],
        words: [
          {
            w: 'analyse',
            ar: 'يحلل',
            ex: 'We analysed the results carefully.'
          },
          {
            w: 'evaluate',
            ar: 'يقيّم',
            ex: 'Examiners evaluate your ideas, not your opinions.'
          },
          {
            w: 'overcome',
            ar: 'يتغلب على',
            ex: 'She overcame her fear of speaking.'
          },
          {
            w: 'evidence',
            ar: 'دليل/بينة',
            ex: 'Strong essays draw on real evidence.'
          }
        ],
        quiz: [
          {
            q: '"Discuss" in a Task 2 prompt means you must:',
            opts: [
              'explore both sides of the issue',
              'only agree',
              'change the topic',
              'give only one example'
            ],
            ans: 0,
            why: 'Discuss = examine arguments on both sides.'
          },
          {
            q: 'The academic upgrade of "think" is:',
            opts: [
              'consider',
              'thinky',
              'like',
              'want'
            ],
            ans: 0,
            why: 'Consider is the academic consider.'
          },
          {
            q: 'The correct collocation is:',
            opts: [
              'reach a conclusion',
              'make a conclusion strong',
              'do a conclusion',
              'hold a conclusion'
            ],
            ans: 0,
            why: 'The fixed collocation is "reach a conclusion".'
          },
          {
            q: 'The best academic sentence is:',
            opts: [
              '"The data show a clear trend."',
              '"The data shows stuff."',
              '"Data big up."',
              'None of the above'
            ],
            ans: 0,
            why: '"Show" is acceptable; the others are informal/ungrammatical.'
          }
        ]
      },
      {
        id: 'b1-2-3',
        title: 'Writing Emails',
        tag: 'writing',
        icon: 'write',
        mins: 15,
        xp: 15,
        objective: 'Write polite, clear emails for request, enquiry and apology.',
        teach: [
          'Email anatomy: a greeting (Dear Mr Khalil / Hello Sara), a clear purpose sentence, body details, a polite close ("Kind regards, Omar").',
          'Requests: "Could you please send me the schedule?" "I would be grateful if you could..." Gentle request forms earn better replies.',
          'Apologies: "I am writing to apologise for the delay." "I am sorry for the misunderstanding." State the apology BEFORE the excuse.',
          'Keep paragraphs short — one idea each. Rewrite dense text into three bullet-short sentences and your email instantly looks professional.',
          'Rami tip: email a real person in English today — even an imaginary request. Purpose + politeness + paragraph = exam-relevant writing muscle.'
        ],
        examples: [
          {
            en: 'Dear Mr Khalil, I am writing to request the application form.',
            note: 'Greeting + purpose in one line.'
          },
          {
            en: 'Could you please confirm the time of the interview?',
            note: 'Could you + please + base verb = soft request.'
          },
          {
            en: 'I apologise for the late reply — I have been abroad.',
            note: 'Apology first, reason second (+ quick note).'
          }
        ],
        words: [
          {
            w: 'grateful',
            ar: 'ممتن',
            ex: 'I would be grateful for your advice.'
          },
          {
            w: 'regards',
            ar: 'مع التحية',
            ex: 'Kind regards, Rami.'
          },
          {
            w: 'attached',
            ar: 'مرفق',
            ex: 'Please find the file attached.'
          },
          {
            w: 'enquiry',
            ar: 'استفسار',
            ex: 'I am writing to make an enquiry.'
          }
        ],
        quiz: [
          {
            q: 'The best email purpose sentence is:',
            opts: [
              '"I am writing to request the schedule."',
              '"Schedule please."',
              '"I need schedule."',
              '"Hello schedule."'
            ],
            ans: 0,
            why: 'Purpose sentences state intent clearly and politely.'
          },
          {
            q: 'A gentle request uses:',
            opts: [
              '"Could you please...?"',
              '"Give me...!"',
              '"You must..."',
              '"Send it fast."'
            ],
            ans: 0,
            why: '"Could you please" is the professional softener.'
          },
          {
            q: 'In an apology email, put ___ first.',
            opts: [
              'the apology',
              'the excuse',
              'a photo',
              'the bill'
            ],
            ans: 0,
            why: 'Apologise before explaining to sound sincere.'
          },
          {
            q: 'The correct closing line is:',
            opts: [
              '"Kind regards, Omar"',
              '"Bye Omar"',
              '"Omar out"',
              '"See ya"'
            ],
            ans: 0,
            why: '"Kind regards" is the formal letter close.'
          }
        ]
      },
      {
        id: 'b1-2-4',
        title: 'Giving a Presentation',
        tag: 'speaking',
        icon: 'speak',
        mins: 15,
        xp: 15,
        objective: 'Open, structure, and close a short presentation with signposting.',
        teach: [
          'The three-part speech: opening hooks + tells the plan, middle delivers 3 points, closing sums up and thanks. Keep to: "Today I will talk about..."',
          'Signposting language moves the listeners: "First, let me explain...", "Next, I\'d like to talk about...", "Finally...", "To sum up...". Signposts are the road map of your talk.',
          'Numbers and data strengthen any point: "According to a recent study, 70% of students..." — attribute your data: According to + source.',
          'Close with a memorable line: "In conclusion, the evidence clearly suggests..." Then: "Thank you for listening. I am happy to take questions."',
          'Rami tip: prepare one 90-second talk on a topic you love and record yourself. Signposts in, nerves out.'
        ],
        examples: [
          {
            en: 'Good morning, everyone. Today I am going to talk about renewable energy.',
            note: 'Greeting + topic in the first sentence.'
          },
          {
            en: 'First, let me explain why solar power is growing so fast.',
            note: 'Signpost: First + what comes next.'
          },
          {
            en: 'In conclusion, renewable energy is not just a trend — it is a necessity.',
            note: 'Closing line with a strong judgement.'
          }
        ],
        words: [
          {
            w: 'signpost',
            ar: 'إشارة توجيهية (بالحديث)',
            ex: 'Signposts help the audience follow you.'
          },
          {
            w: 'introduce',
            ar: 'يقدم/يتحدة عن',
            ex: 'Let me introduce the main issue.'
          },
          {
            w: 'conclusion',
            ar: 'استنتاج/خاتمة',
            ex: 'My conclusion is based on the evidence.'
          },
          {
            w: 'audience',
            ar: 'جمهور',
            ex: 'Keep eye contact with the audience.'
          }
        ],
        quiz: [
          {
            q: 'The best presentation opening is:',
            opts: [
              '"Good morning. Today I will talk about the impact of tourism."',
              '"Umm, so like..."',
              '"The end."',
              '"Questions now."'
            ],
            ans: 0,
            why: 'Greeting + clear topic = a confident opening.'
          },
          {
            q: '"First... Next... Finally..." are called:',
            opts: [
              'signposts',
              'questions',
              'answers',
              'jokes'
            ],
            ans: 0,
            why: 'Sequencing phrases that guide the listener.'
          },
          {
            q: 'The best way to introduce data is:',
            opts: [
              '"According to a recent study, 70% of students..."',
              '"70%."',
              '"I think 70%."',
              'All of the above'
            ],
            ans: 0,
            why: 'Attribute your evidence: According to + source.'
          },
          {
            q: 'A good closing starts with:',
            opts: [
              '"In conclusion..."',
              '"The story now..."',
              '"Wait..."',
              '"So yeah."'
            ],
            ans: 0,
            why: '"In conclusion" signals the final summary.'
          }
        ]
      }
    ]
  },
  {
    id: 'b1-opinions',
    title: 'Opinions & Arguments',
    icon: 'evaluate',
    desc: 'Give opinions, disagree politely, explain causes and effects, and join ideas with discourse markers.',
    lessons: [
      {
        id: 'b1-3-1',
        title: 'Expressing Opinions',
        tag: 'speaking',
        icon: 'speak',
        mins: 15,
        xp: 15,
        objective: 'Give opinions with confidence and a full "opinion + reason + example" shape.',
        teach: [
          'Opinion openers from safe to strong: "In my opinion...", "I believe that...", "I would argue that...". The stronger the phrase, the more confident the speaker.',
          'One opinion is not an answer — the shape is: opinion + reason + example. "I believe virtual classes are effective, because they save travel time, for example, my cousin studies fully online."',
          'Avoid the deadly "I think I think": state your view ONCE and defend it. "I believe this. My first reason is... My second reason is..."',
          'Balance confidence with nuance: "Generally speaking, I believe... although there are exceptions." Nuance = the Band 7+ signature.',
          'Rami tip: pick a daily topic, state one opinion, and defend it with two reasons out loud. One minute a day builds opinion fluency.'
        ],
        examples: [
          {
            en: 'In my opinion, social media connects people across borders.',
            note: 'Opinion opener + the actual claim.'
          },
          {
            en: 'I believe outdoor exercise is healthier, because it brings sunlight and fresh air.',
            note: 'Opinion + because + reasons.'
          },
          {
            en: 'Generally speaking, I agree — although there are exceptions.',
            note: 'Confident but nuanced.'
          }
        ],
        words: [
          {
            w: 'opinion',
            ar: 'رأي',
            ex: 'That is my personal opinion.'
          },
          {
            w: 'believe',
            ar: 'يعتقد',
            ex: 'I believe in studying every day.'
          },
          {
            w: 'generally',
            ar: 'بشكل عام',
            ex: 'Generally, people are healthier outside.'
          },
          {
            w: 'nuance',
            ar: 'دقة/تدرج في الرأي',
            ex: 'A good answer shows nuance.'
          }
        ],
        quiz: [
          {
            q: 'The complete opinion answer shape is:',
            opts: [
              'opinion + reason + example',
              'opinion only',
              'a long story',
              'a definition'
            ],
            ans: 0,
            why: 'State it, justify it, prove it — the three-part answer.'
          },
          {
            q: 'The safest opinion opener is:',
            opts: [
              '"In my opinion..."',
              '"Everyone knows..."',
              '"It is obvious that..."',
              '"Nobody doubts..."'
            ],
            ans: 0,
            why: '"In my opinion" claims less than "everyone knows".'
          },
          {
            q: 'Nuance means your opinion:',
            opts: [
              'acknowledges exceptions',
              'is 100% absolute',
              'has no reasons',
              'ignores the topic'
            ],
            ans: 0,
            why: 'Nuanced answers admit there are limits and exceptions.'
          },
          {
            q: 'The strongest confident opener is:',
            opts: [
              '"I would argue that..."',
              '"I guess..."',
              '"Maybe..."',
              '"I do not know but..."'
            ],
            ans: 0,
            why: '"I would argue" is measured yet confident — ideal for IELTS.'
          }
        ]
      },
      {
        id: 'b1-3-2',
        title: 'Agreeing & Disagreeing Politely',
        tag: 'speaking',
        icon: 'chat',
        mins: 15,
        xp: 15,
        objective: 'Show agreement and disagreement without sounding rude or weak.',
        teach: [
          'Agreement ladder: "I completely agree." "That is exactly my view." "I would go further — I would add that..." Agreement + adding = strong.',
          'Partial agreement: "I agree to some extent, but..." "That is true in part, however..." This is the most-used examiner answer: agree with a limit.',
          'Polite disagreement: "I see your point, but I think..." "I understand your reasoning, yet..." NEVER say "You are wrong" — say "I take a different view."',
          'Disagree and SUBSTITUTE: state their view, state yours, give your first reason. "While online learning is convenient, I believe face-to-face creates a stronger classroom community."',
          'Rami tip: debate one imaginary person today: they say A, you say B, with partial agreement first. "I see their point, but..."'
        ],
        examples: [
          {
            en: 'I completely agree with the idea of free education.',
            note: 'Complete agreement, clearly stated.'
          },
          {
            en: 'I agree to some extent, but the cost is still a problem.',
            note: 'Partial agreement with a limit.'
          },
          {
            en: 'I take a different view: the benefits outweigh the risks.',
            note: 'Polite disagreement + your view.'
          }
        ],
        words: [
          {
            w: 'agree',
            ar: 'يتفق',
            ex: 'I agree with the main argument.'
          },
          {
            w: 'disagree',
            ar: 'يختلف',
            ex: 'I disagree, but I respect your view.'
          },
          {
            w: 'to some extent',
            ar: 'إلى حد ما',
            ex: 'That is true to some extent.'
          },
          {
            w: 'nevertheless',
            ar: 'مع ذلك',
            ex: 'The plan is costly; nevertheless, it works.'
          }
        ],
        quiz: [
          {
            q: 'Polite disagreement starts with:',
            opts: [
              '"I see your point, but..."',
              '"You are wrong."',
              '"No."',
              '"Wrong idea."'
            ],
            ans: 0,
            why: 'Acknowledge first, then present your different view.'
          },
          {
            q: '"I agree to some extent, but..." shows:',
            opts: [
              'partial agreement',
              'total agreement',
              'no opinion',
              'anger'
            ],
            ans: 0,
            why: 'Partial = agree with limits → the most flexible IELTS move.'
          },
          {
            q: 'Do not say "you are wrong". Say:',
            opts: [
              '"I take a different view."',
              '"Wrong, wrong, wrong."',
              '"No way."',
              'None of the above'
            ],
            ans: 0,
            why: '"I take a different view" disagrees with respect.'
          },
          {
            q: 'Strong agreement + add: the best sentence is:',
            opts: [
              '"I completely agree — and I would add that it also saves time."',
              '"Yes."',
              '"Same."',
              'All of the above'
            ],
            ans: 0,
            why: 'Agree strongly, then strengthen the idea with your own addition.'
          }
        ]
      },
      {
        id: 'b1-3-3',
        title: 'Cause & Effect Language',
        tag: 'writing',
        icon: 'write',
        mins: 15,
        xp: 15,
        objective: 'Explain why things happen and what they lead to with precise phrases.',
        teach: [
          'Two directions: cause language ("This happens BECAUSE OF...", "due to", "owing to") and effect language ("as a result", "therefore", "consequently", "this leads to").',
          'Because + clause vs because of + noun: "Because the weather changed" (clause) vs "Because of the weather" (noun). A classic writing error to master.',
          'Report the result chain: "Heavy traffic leads to more pollution, which in turn raises health costs." One line, two links: leads to + in turn.',
          'In Task 2, structure a body: cause sentence → effect sentence → example. "Online shopping has grown because it is convenient. As a result, local shops are closing, for example, three stores in my town shut down last year."',
          'Rami tip: explain one real problem with two causes and one effect in English today. Cause-effect is the thinking engine of the essay.'
        ],
        examples: [
          {
            en: 'The flight was cancelled owing to heavy fog.',
            note: 'Owing to + a noun reason.'
          },
          {
            en: 'Because the roads are narrow, traffic moves slowly.',
            note: 'Because + a full clause.'
          },
          {
            en: 'Demand rose. Consequently, prices increased.',
            note: 'Consequently = the formal "so".'
          }
        ],
        words: [
          {
            w: 'because of',
            ar: 'بسبب',
            ex: 'The event was cancelled because of rain.'
          },
          {
            w: 'therefore',
            ar: 'لذلك',
            ex: 'He missed the bus; therefore, he was late.'
          },
          {
            w: 'lead to',
            ar: 'يؤدي إلى',
            ex: 'Stress can lead to poor sleep.'
          },
          {
            w: 'in turn',
            ar: 'وبالتالي',
            ex: 'More cars cause congestion, which in turn slows buses.'
          }
        ],
        quiz: [
          {
            q: 'Cause + noun (not a clause) uses:',
            opts: [
              'because of',
              'because',
              'so',
              'while'
            ],
            ans: 0,
            why: '"Because of" + a noun phrase: because of the rain.'
          },
          {
            q: 'The result marker is:',
            opts: [
              'therefore',
              'due to',
              'although',
              'because'
            ],
            ans: 0,
            why: 'Therefore introduces the result.'
          },
          {
            q: 'The correct sentence is:',
            opts: [
              '"The trip was cancelled because of the storm."',
              '"The trip was cancelled because the storm."',
              '"The trip was cancelled due storm."',
              'None of the above'
            ],
            ans: 0,
            why: 'Because of + the storm (noun phrase).'
          },
          {
            q: 'The cause-effect chain sentence is:',
            opts: [
              '"Pollution leads to illness, which in turn reduces productivity."',
              '"Pollution and illness are two things."',
              '"I like pollution."',
              'All of the above'
            ],
            ans: 0,
            why: '"Leads to... in turn" shows the two-step result chain.'
          }
        ]
      },
      {
        id: 'b1-3-4',
        title: 'Discourse Markers',
        tag: 'grammar',
        icon: 'grammar',
        mins: 15,
        xp: 15,
        objective: 'Connect your speech and writing with however, therefore, moreover and on the other hand.',
        teach: [
          'Discourse markers are the "traffic signs" of language: however (contrast), therefore (result), moreover (adding), in addition (adding), on the other hand (the other side), for instance (example).',
          'Punctuation: two full main clauses join with a semicolon or two sentences: "It is costly. However, it is effective." Never glue two main clauses with just a comma (a run-on error).',
          'however vs but: BUT joins inside a sentence with a comma; HOWEVER usually starts a new sentence/clause: "It was hard, but I improved." / "It was hard. However, I improved."',
          'Sequence for example-led points: "Some cities have solved this. Amsterdam, for instance, built more cycle lanes." For instance after the claim = elegant.',
          'Rami tip: impose one marker per paragraph today: contrast = however, addition = moreover, example = for instance. Markers are scaffolding — use them deliberately.'
        ],
        examples: [
          {
            en: 'The flat is small. However, it is very bright.',
            note: 'However starts the second clause with a full stop before it.'
          },
          {
            en: 'It was a long journey; nevertheless, we enjoyed it.',
            note: 'Semicolon + nevertheless = formal joining.'
          },
          {
            en: 'Reading improves vocabulary. Moreover, it teaches grammar in context.',
            note: 'Moreover adds a second advantage.'
          }
        ],
        words: [
          {
            w: 'however',
            ar: 'ومع ذلك',
            ex: 'It is expensive. However, it is durable.'
          },
          {
            w: 'therefore',
            ar: 'لذلك',
            ex: 'The evidence is clear; therefore, we accept.'
          },
          {
            w: 'moreover',
            ar: 'علاوة على ذلك',
            ex: 'The method saves time. Moreover, it reduces errors.'
          },
          {
            w: 'for instance',
            ar: 'على سبيل المثال',
            ex: 'Many chores, for instance cooking, are relaxing.'
          }
        ],
        quiz: [
          {
            q: 'The correct formal contrast joining is:',
            opts: [
              '"It is costly. However, it works."',
              '"It is costly, it works."',
              '"Costly, works."',
              'None of the above'
            ],
            ans: 0,
            why: 'Two main clauses need a full stop or semicolon + however.'
          },
          {
            q: '"Moreover" adds:',
            opts: [
              'another point',
              'a contrast',
              'a conclusion',
              'a question'
            ],
            ans: 0,
            why: 'Moreover = an extra supporting idea.'
          },
          {
            q: 'The sentence with correct punctuation is:',
            opts: [
              '"The route is long; nevertheless, it is scenic."',
              '"The route long, nevertheless scenic."',
              '"Long route nevertheless."',
              'All of the above'
            ],
            ans: 0,
            why: 'Semicolon joins the two main clauses before nevertheless.'
          },
          {
            q: '"For instance" introduces:',
            opts: [
              'an example',
              'a reason',
              'a result',
              'an opinion'
            ],
            ans: 0,
            why: 'For instance = a specific example of the claim.'
          }
        ]
      }
    ]
  },
  {
    id: 'b1-narratives',
    title: 'Narrative Skills',
    icon: 'write',
    desc: 'Tell richer stories: past perfect, sequence of tenses, and describing experiences fluently.',
    lessons: [
      {
        id: 'b1-4-1',
        title: 'Past Perfect',
        tag: 'grammar',
        icon: 'grammar',
        mins: 15,
        xp: 15,
        objective: 'Show which past event happened first with had + past participle.',
        teach: [
          'Past perfect = had + past participle: "When I arrived, the train had already left." It marks the EARLIER of two past events.',
          'Use it in stories for clarity: "She was tired because she had worked all night." Reason before the state = had worked.',
          'The exam sentence: "By the time I reached the station, the bus had gone." By the time + past simple + past perfect = a classic storytelling line.',
          'Do not overuse it: past perfect is for the "previous" event, not for every past. If only one action, use past simple.',
          'Rami tip: retell today as: "Before I started English, I HAD never written an essay." Find the "before" in your stories — that is where past perfect hides.'
        ],
        examples: [
          {
            en: 'By the time we got there, the shop had closed.',
            note: 'Two past events; the earlier one (close) = had closed.'
          },
          {
            en: 'I felt nervous because I had never spoken in public.',
            note: 'Reason in past perfect: had never spoken.'
          },
          {
            en: 'After she had finished, she went home.',
            note: 'After + past perfect, then the later past simple.'
          }
        ],
        words: [
          {
            w: 'by the time',
            ar: 'بحلول الوقت الذي',
            ex: 'By the time we arrived, it had ended.'
          },
          {
            w: 'before',
            ar: 'قبل',
            ex: 'She had cooked before we came.'
          },
          {
            w: 'already',
            ar: 'بالفعل',
            ex: 'He had already left by noon.'
          },
          {
            w: 'had gone',
            ar: 'كان قد ذهب',
            ex: 'The tickets had gone quickly.'
          }
        ],
        quiz: [
          {
            q: 'The correct past perfect is:',
            opts: [
              '"The bus had already left when I arrived."',
              '"The bus already left when I arrived."',
              '"The bus was already left when I arrived."',
              'None of the above'
            ],
            ans: 0,
            why: 'Earlier action (leave) takes had + participle.'
          },
          {
            q: 'Past perfect marks the ___ of two past events.',
            opts: [
              'earlier',
              'later',
              'only one',
              'repeated'
            ],
            ans: 0,
            why: 'Had + participle = the event that happened first.'
          },
          {
            q: 'The correct sentence is:',
            opts: [
              '"She was tired because she had worked all night."',
              '"She was tired because she has worked all night."',
              '"She was tired because worked all night."',
              'All of the above'
            ],
            ans: 0,
            why: 'The earlier cause (work) takes past perfect.'
          },
          {
            q: 'Avoid past perfect when:',
            opts: [
              'only one past action is mentioned',
              'two events happen',
              'asking questions',
              'telling stories'
            ],
            ans: 0,
            why: 'One past moment needs only past simple; past perfect adds the "earlier" layer.'
          }
        ]
      },
      {
        id: 'b1-4-2',
        title: 'Storytelling Tenses',
        tag: 'grammar',
        icon: 'write',
        mins: 15,
        xp: 15,
        objective: 'Combine past simple, past continuous and past perfect to tell detailed stories.',
        teach: [
          'The full toolbox: past continuous (background), past simple (main events), past perfect (earlier events). A story uses all three: "I was walking (background) when I saw a friend (event). He had moved away (earlier) but had come back."',
          'Past continuous sets the scene: "It was raining. Everyone was waiting." It describes the situation, not the point of the action.',
          'The "when + suddenly" pattern: "I was talking on the phone when suddenly the internet stopped." Background + interrupt.',
          'Dramatic sequence for stories: "First I ..., then ... After that ..., finally ..." Time markers keep the listener oriented in a multi-tense story.',
          'Rami tip: retell a short film you know in three sentences using all three tenses. "A detective was investigating... he found... she had hidden..." All three tenses = a full story brain.'
        ],
        examples: [
          {
            en: 'I was driving to work when I saw the accident.',
            note: 'Background (was driving) + event (saw).'
          },
          {
            en: 'While she was cooking, the phone rang.',
            note: 'While + past continuous + past simple event.'
          },
          {
            en: 'We were tired because we had travelled all night.',
            note: 'Earliest event in past perfect.'
          }
        ],
        words: [
          {
            w: 'while',
            ar: 'بينما',
            ex: 'While I was waiting, he called.'
          },
          {
            w: 'suddenly',
            ar: 'فجأة',
            ex: 'Suddenly, the lights went out.'
          },
          {
            w: 'background',
            ar: 'خلفية',
            ex: 'Describe the background first.'
          },
          {
            w: 'event',
            ar: 'حدث',
            ex: 'The main event came next.'
          }
        ],
        quiz: [
          {
            q: 'The opening of most stories sets the scene in:',
            opts: [
              'past continuous',
              'present perfect',
              'future will',
              'the imperative'
            ],
            ans: 0,
            why: 'Was/were + -ing paints the background picture.'
          },
          {
            q: 'The correct background+event is:',
            opts: [
              '"I was reading when the door opened."',
              '"I was reading when the door opens."',
              '"I read when the door was opened."',
              'None of the above'
            ],
            ans: 0,
            why: 'Past continuous background + past simple interrupt.'
          },
          {
            q: '"While" usually partners with:',
            opts: [
              'past continuous',
              'present simple',
              'future will',
              'imperative'
            ],
            ans: 0,
            why: 'While + was doing + started... = the interruption pattern.'
          },
          {
            q: 'A complete three-tense story has:',
            opts: [
              'background + events + earlier events',
              'only future',
              'only commands',
              'no verbs'
            ],
            ans: 0,
            why: 'Continuous (scenery) + simple (plot) + perfect (backstory).'
          }
        ]
      },
      {
        id: 'b1-4-3',
        title: 'Describing Experiences',
        tag: 'speaking',
        icon: 'speak',
        mins: 15,
        xp: 15,
        objective: 'Describe what you have done and link your experiences to the present.',
        teach: [
          'Open with experience tense (present perfect), then narrate details (past simple): "I have visited two foreign countries. Last year I went to Turkey and I stayed for a week."',
          'The formula "For me, ..." personalises: "For me, the most memorable experience was volunteering at a children\'s club."',
          'Add feelings and senses to make it alive: "I remember the smell of fresh bread and the sound of children laughing." Senses = Band 7+ speaking.',
          'Connect the past to right now: "That experience taught me patience, and I use it in my work today." The connection makes the answer complete.',
          'Rami tip: prepare one "best experience" story — what happened, how it felt, what it taught you. One story covers many questions.'
        ],
        examples: [
          {
            en: 'I have been to Istanbul twice. The first time, I visited the old city.',
            note: 'Experience (perfect) → detail (simple).'
          },
          {
            en: 'For me, the highlight was meeting people from ten countries.',
            note: 'For me + highlight: the personal core.'
          },
          {
            en: 'It taught me to be brave, and I still remember that lesson today.',
            note: 'Past experience → present lesson.'
          }
        ],
        words: [
          {
            w: 'memorable',
            ar: 'لا يُنسى',
            ex: 'It was a memorable journey.'
          },
          {
            w: 'highlight',
            ar: 'أبرز نقطة',
            ex: 'The highlight of the trip was the desert.'
          },
          {
            w: 'experience',
            ar: 'تجربة',
            ex: 'That experience changed my view.'
          },
          {
            w: 'lesson',
            ar: 'عبرة/درس',
            ex: 'The greatest lesson came from failure.'
          }
        ],
        quiz: [
          {
            q: 'The best experience opener is:',
            opts: [
              '"I have visited Turkey twice."',
              '"I visited Turkey twice last year."',
              '"Turkey, yes, I."',
              'All of the above'
            ],
            ans: 0,
            why: 'Present perfect opens the life-experience; details follow in past simple.'
          },
          {
            q: 'To personalise an experience, start with:',
            opts: [
              '"For me, the highlight was..."',
              '"For everyone..."',
              '"The world famous..."',
              'None of the above'
            ],
            ans: 0,
            why: '"For me" makes the answer personal and native-like.'
          },
          {
            q: 'Sensory details make a story:',
            opts: [
              'alive and vivid',
              'shorter',
              'less clear',
              'more formal'
            ],
            ans: 0,
            why: 'Smells, sounds and sights bring the story to life.'
          },
          {
            q: 'The complete experience answer ends with:',
            opts: [
              'the lesson it taught you',
              'a new question',
              'the alphabet',
              'nothing'
            ],
            ans: 0,
            why: 'Linking the past to a present lesson closes the answer with depth.'
          }
        ]
      },
      {
        id: 'b1-4-4',
        title: 'Reported Speech Basics',
        tag: 'grammar',
        icon: 'grammar',
        mins: 15,
        xp: 15,
        objective: 'Report what people said by shifting tenses and pronouns backwards.',
        teach: [
          'Reported speech pushes the tense one step back: "I am tired" → She said (that) she was tired. Present → past; will → would; can → could.',
          'The backshift ladder: am/is → was, are → were, do/does → did, will → would, can → could, have/has → had, did → had done.',
          'Change the pronouns with the speaker: "I am happy" said Omar → Omar said he was happy. First person becomes third.',
          'Questions in reported speech: order flips back to statement: "Where do you live?" → She asked where I lived. No question mark, no "do".',
          'Rami tip: tell a friend what you said today in reported form: "I said I would arrive at six." Yesterday\'s sentences are today\'s reported speech.'
        ],
        examples: [
          {
            en: 'Rami said (that) he was going to travel.',
            note: 'He was = backshifted from "I am".'
          },
          {
            en: 'She asked where I lived.',
            note: 'Reported wh-question: statement order + backshift.'
          },
          {
            en: 'He told me he would call the next day.',
            note: 'Will → would; tomorrow → the next day.'
          }
        ],
        words: [
          {
            w: 'said',
            ar: 'قال',
            ex: 'He said he was ready.'
          },
          {
            w: 'told',
            ar: 'أخبر',
            ex: 'She told me the news.'
          },
          {
            w: 'asked',
            ar: 'سأل',
            ex: 'He asked where the station was.'
          },
          {
            w: 'backshift',
            ar: 'إرجاع الزمن للخلف',
            ex: 'Reported speech uses backshift.'
          }
        ],
        quiz: [
          {
            q: '"I am busy" → Omar said he ______ busy.',
            opts: [
              'was',
              'is',
              'am',
              'be'
            ],
            ans: 0,
            why: 'Am backshifts to was.'
          },
          {
            q: '"I will come" → She said she ______ come.',
            opts: [
              'would',
              'will',
              'can',
              'did'
            ],
            ans: 0,
            why: 'Will → would in reported speech.'
          },
          {
            q: 'Correct reported question: "Where do you live?" → She asked ______',
            opts: [
              'where I lived',
              'where did I live',
              'where do I live',
              'All of the above'
            ],
            ans: 0,
            why: 'Backshift + statement order: where I lived.'
          },
          {
            q: '"I am tired" said Rami → Rami said:',
            opts: [
              'he was tired',
              'I was tired',
              'he am tired',
              'None of the above'
            ],
            ans: 0,
            why: 'Pronoun shifts to he + backshift to was.'
          }
        ]
      }
    ]
  },
  {
    id: 'b1-ielts',
    title: 'IELTS Foundations',
    icon: 'roadmap',
    desc: 'The first stepping stones to the exam: paragraphs, skim-scan, paraphrase, and listening for detail.',
    lessons: [
      {
        id: 'b1-5-1',
        title: 'Paragraph Writing Basics',
        tag: 'writing',
        icon: 'write',
        mins: 15,
        xp: 15,
        objective: 'Write paragraphs with a clear topic sentence, support, and a smooth ending.',
        teach: [
          'One paragraph = one idea. The topic sentence announces the idea: "Exercise improves mental health in three ways." Everything after must prove it.',
          'Support with reasons + examples: "First, exercise releases stress. For instance, a 30-minute walk calms my mind instantly." Each sentence adds evidence.',
          'The final sentence closes or links: "In short, regular exercise is a simple path to a healthier mind." Or it sets up the next paragraph.',
          'Length control: 3–6 sentences per paragraph in IELTS essays. One idea per paragraph — no wandering.',
          'Rami tip: write one topic sentence for each of your essay ideas today: three ideas, three topic sentences. The topic sentence is the spine.'
        ],
        examples: [
          {
            en: 'Topic sentence: "Social media affects how we spend our time."',
            note: 'The idea + the scope in one line.'
          },
          {
            en: 'Support: "For example, the average user checks their phone 96 times a day."',
            note: 'A concrete example proving the idea.'
          },
          {
            en: 'Closing: "Clearly, time online is time taken from offline life."',
            note: 'The paragraph lands the point.'
          }
        ],
        words: [
          {
            w: 'topic sentence',
            ar: 'الجملة الرئيسية',
            ex: 'Every paragraph starts with a topic sentence.'
          },
          {
            w: 'support',
            ar: 'دعم/إثبات',
            ex: 'Support each claim with evidence.'
          },
          {
            w: 'example',
            ar: 'مثال',
            ex: 'The example makes the idea concrete.'
          },
          {
            w: 'coherent',
            ar: 'مترابط',
            ex: 'A coherent paragraph flows smoothly.'
          }
        ],
        quiz: [
          {
            q: 'The topic sentence does what?',
            opts: [
              'announces the one idea of the paragraph',
              'ends the essay',
              'adds a new topic',
              'lists all words'
            ],
            ans: 0,
            why: 'It states the single controlling idea.'
          },
          {
            q: 'Good support includes:',
            opts: [
              'reasons and concrete examples',
              'new random topics',
              'only adjectives',
              'numbers with no link'
            ],
            ans: 0,
            why: 'Evidence = reason + example tied to the idea.'
          },
          {
            q: 'One paragraph should develop:',
            opts: [
              'one idea',
              'five ideas',
              'all your life story',
              'every argument'
            ],
            ans: 0,
            why: 'Unity: one paragraph, one idea.'
          },
          {
            q: 'A good IELTS body paragraph is roughly:',
            opts: [
              '3–6 sentences',
              '1 sentence',
              '20 sentences',
              '0 sentences'
            ],
            ans: 0,
            why: 'Compact paragraphs keep the essay focused and readable.'
          }
        ]
      },
      {
        id: 'b1-5-2',
        title: 'Skimming & Scanning',
        tag: 'reading',
        icon: 'read',
        mins: 15,
        xp: 15,
        objective: 'Read fast on purpose: skim for the main idea, scan for the answer.',
        teach: [
          'Skim = fast overview: read the title, first sentence of each paragraph, and the conclusion in under a minute. Goal: know what the text argues.',
          'Scan = targeted search: jump straight to keywords like numbers, names, dates and capitalised words, then read only the surrounding 2-3 sentences.',
          'IELTS questions follow passage order: answer for Q4 is almost never before the answer for Q3. Use this to keep your search forward-moving.',
          'Unknown words are often irrelevant. Read the sentence around them; examiners test if you can extract meaning despite gaps.',
          'Rami tip: on your next passage, underline ONE keyword per question BEFORE reading. Your eyes get a search map instead of a mystery.'
        ],
        examples: [
          {
            en: 'Skim first: read the title and every first sentence.',
            note: 'Thirty seconds of smart skimming builds the map.'
          },
          {
            en: 'Scan for "1997" and read only around it.',
            note: 'Keywords are magnets in the scanning phase.'
          },
          {
            en: 'Questions move forward — search forward with them.',
            note: 'Sequence rule saves re-reading.'
          }
        ],
        words: [
          {
            w: 'skim',
            ar: 'قراءة خاطفة',
            ex: 'Skim the passage in one minute.'
          },
          {
            w: 'scan',
            ar: 'قراءة بحثية',
            ex: 'Scan for the date in the text.'
          },
          {
            w: 'keyword',
            ar: 'كلمة مفتاحية',
            ex: 'Underline the keyword of each question.'
          },
          {
            w: 'main idea',
            ar: 'الفكرة الرئيسية',
            ex: 'The main idea is hidden in the first lines.'
          }
        ],
        quiz: [
          {
            q: 'Skimming means:',
            opts: [
              'fast overview of structure and main ideas',
              'translating every word',
              'reading backwards',
              'counting paragraphs'
            ],
            ans: 0,
            why: 'Skim = the 60-second map of the text.'
          },
          {
            q: 'When a question has "1997", you should:',
            opts: [
              'jump to 1997 and read around it',
              'read everything first',
              'skip the question',
              'All of the above'
            ],
            ans: 0,
            why: 'Scanning = locate the keyword, read its surroundings.'
          },
          {
            q: 'IELTS questions usually:',
            opts: [
              'follow passage order',
              'are random',
              'appear in the title only',
              'None of the above'
            ],
            ans: 0,
            why: 'Sequential order lets you move forward efficiently.'
          },
          {
            q: 'An unknown word mid-passage means you should:',
            opts: [
              'ignore it and keep the meaning from context',
              'stop the test',
              'memorise it',
              'All of the above'
            ],
            ans: 0,
            why: 'Context-reading over vocabulary-stopping wins the exam.'
          }
        ]
      },
      {
        id: 'b1-5-3',
        title: 'Paraphrasing & Synonyms',
        tag: 'writing',
        icon: 'write',
        mins: 15,
        xp: 15,
        objective: 'Rewrite ideas in new words — the core skill behind Task 2 introductions.',
        teach: [
          'To paraphrase = say the same idea with new words and new structure: "Many people prefer online shopping" → "A growing number of consumers now choose to buy goods virtually."',
          'Synonyms that matter in IELTS: important → significant/crucial; problem → issue/challenge; many → a growing number of; people → individuals; increase → rise/grow/expand.',
          'Do not change the MEANING while changing the words. Paraphrase tests comprehension, not vocabulary gymnastics — a wrong synonym (education = "schooling" is fine, "training" is not) can break the answer.',
          'The introduction formula: rephrase the question statement, then state your position: "Nowadays, virtual shopping is gaining popularity. In my view, this trend brings both convenience and risks."',
          'Rami tip: take one sentence you wrote today and rewrite it with at least three changes: a synonym, a structure flip, a register upgrade.'
        ],
        examples: [
          {
            en: '"Many students work part-time" → "A considerable number of undergraduates hold part-time jobs."',
            note: 'Synonym + structure = clean paraphrase.'
          },
          {
            en: '"The internet is important" → "The internet has become indispensable."',
            note: 'One precise upgrade replaces the vague word.'
          },
          {
            en: '"People buy more now" → "Purchasing habits have shifted towards higher consumption."',
            note: 'Nominal style = academic register.'
          }
        ],
        words: [
          {
            w: 'paraphrase',
            ar: 'إعادة صياغة',
            ex: 'Paraphrase the question in your introduction.'
          },
          {
            w: 'synonym',
            ar: 'مرادف',
            ex: 'Use synonyms to avoid repetition.'
          },
          {
            w: 'significant',
            ar: 'مهم/جوهري',
            ex: 'A significant number of users...'
          },
          {
            w: 'register',
            ar: 'مستوى اللغة',
            ex: 'Academic register avoids slang.'
          }
        ],
        quiz: [
          {
            q: 'The correct paraphrase of "Many people drive to work" is:',
            opts: [
              '"A large number of employees commute by car."',
              '"People car."',
              '"Many people drive to work" repeated',
              'None of the above'
            ],
            ans: 0,
            why: 'Synonyms + structure change keep the same meaning.'
          },
          {
            q: 'Paraphrasing must NOT:',
            opts: [
              'change the meaning',
              'use synonyms',
              'change the structure',
              'sound different'
            ],
            ans: 0,
            why: 'Meaning is sacred; the form changes, not the idea.'
          },
          {
            q: 'An academic synonym of "important" is:',
            opts: [
              'significant',
              'nice',
              'okay',
              'big'
            ],
            ans: 0,
            why: 'Significant/crucial belong to the academic register.'
          },
          {
            q: 'A Task 2 introduction should:',
            opts: [
              'paraphrase the topic + state your position',
              'answer in one word',
              'give all examples',
              'All of the above'
            ],
            ans: 0,
            why: 'Clean rephrase + clear stance = a strong start.'
          }
        ]
      },
      {
        id: 'b1-5-4',
        title: 'Listening for Detail',
        tag: 'listening',
        icon: 'listen',
        mins: 15,
        xp: 15,
        objective: 'Catch the details that decide your band: numbers, spellings, and confirmations.',
        teach: [
          'Write what you HEAR, not what you think. Names are spelled slowly for you: "It\'s Sara, S-A-R-A." Only write the spelled version.',
          'Numbers try to trick you: "fifteen hundred" = 1500, "double five" = 55, "a dozen" = 12. Train your ears on the small units.',
          'Speakers REFORMULATE: "The room is 40 euros — wait, it is actually 45 including breakfast." The correction is the answer, not the first number.',
          'Predict before you listen: read the question, decide the word TYPE: number, name, date, address, amount. Your ears hunt the type.',
          'Rami tip: while watching any English content, note down every number and name. Detail-catching is a muscle: train it daily.'
        ],
        examples: [
          {
            en: '"My number is oh seven eight, double two, four five."',
            note: 'Write as 078 22 45 — obey the spelling.'
          },
          {
            en: '"The tour costs fifty— no, fifty-five pounds."',
            note: 'The correction (55) is the real answer.'
          },
          {
            en: '"Hotel rooms: a single is $70, a double is $95."',
            note: 'Two units, two numbers — match them exactly.'
          }
        ],
        words: [
          {
            w: 'spelling',
            ar: 'تهجئة',
            ex: 'Listen to the spelling of the name.'
          },
          {
            w: 'reformulate',
            ar: 'إعادة صياغة/تصحيح',
            ex: 'Speakers often correct the first number.'
          },
          {
            w: 'predict',
            ar: 'يتوقع',
            ex: 'Predict the answer type before listening.'
          },
          {
            w: 'unit',
            ar: 'وحدة',
            ex: 'Always note the unit: pounds, euros, per cent.'
          }
        ],
        quiz: [
          {
            q: 'The speaker says "it is double four, one five". You write:',
            opts: [
              '44 15',
              '2 4, 1 5',
              '1111 15',
              '4,4,1,5 as letters'
            ],
            ans: 0,
            why: '"Double four" = 44, then "one five" = 15.'
          },
          {
            q: '"Fifteen hundred" means:',
            opts: [
              '1500',
              '15.00',
              '115',
              '151'
            ],
            ans: 0,
            why: 'Fifteen hundred = 15 × 100 = 1500.'
          },
          {
            q: 'When the speaker corrects themselves, the answer is:',
            opts: [
              'the second (corrected) version',
              'the first version',
              'the average',
              'unimportant'
            ],
            ans: 0,
            why: 'The reformulation is the accurate one.'
          },
          {
            q: 'Before listening, predict the answer TYPE. A question asking "At what time...?" expects:',
            opts: [
              'a time',
              'a colour',
              'a job',
              'a country'
            ],
            ans: 0,
            why: 'Question word + topic predicts the answer type.'
          }
        ]
      }
    ]
  }
];
