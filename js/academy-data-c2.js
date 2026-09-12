/* ============================================================
   Rami Academy — C2 Proficiency curriculum (5 units × 4 lessons)
   Every lesson: Rami teaches (teach[]), examples, words, quiz.
   ============================================================ */
const ACADEMY_UNITS_C2 = [
  {
    id: 'c2-master-grammar',
    title: 'Master Grammar',
    icon: 'grammar',
    desc: 'The final mechanics: nominalisation, modality, the extremes of inversion, register shifts.',
    lessons: [
      {
        id: 'c2-1-1',
        title: 'Nominalisation: The C2 Engine',
        tag: 'grammar',
        icon: 'grammar',
        mins: 22,
        xp: 22,
        objective: 'Turn whole actions into noun phrases — the signature of advanced writing.',
        teach: [
          'Nominalisation compresses a clause into a noun: "We analysed the problem" → "The analysis of the problem..." It makes writing dense, formal and mature.',
          'The transformation family: "the economy grew" → "the growth of the economy"; "they developed" → "the development of"; "she decided" → "her decision that".',
          'Chinese-box sentences: "The effectiveness of measures to address climate change remains debated." Layers of nouns + of-phrases = C2 density.',
          'Balance is everything: pure nominalisation blocks flow. Alternate: one nominal sentence for weight, one plain verb sentence for air.',
          'Rami tip: rewrite one paragraph today with 3 verbs → 3 nouns. Then put a plain verb sentence back between them. Density with oxygen.'
        ],
        examples: [
          {
            en: 'The emergence of remote work transformed urban planning.',
            note: 'Emerge → emergence; work + of-phrase.'
          },
          {
            en: 'Central to the debate is the provision of affordable housing.',
            note: 'Provide → provision; a noun-heavy opener.'
          },
          {
            en: 'Their failure to reach consensus delayed the agreement.',
            note: 'Fail → failure; a whole action in a noun.'
          }
        ],
        words: [
          {
            w: 'nominalisation',
            ar: 'الاسمية/التحويل لاسم',
            ex: 'Nominalisation compresses ideas into nouns.'
          },
          {
            w: 'dense',
            ar: 'كثيف',
            ex: 'Nominal style is dense but must breathe.'
          },
          {
            w: 'compression',
            ar: 'انضغاط',
            ex: 'Compression is the engine of style.'
          },
          {
            w: 'alternate',
            ar: 'يتبادل',
            ex: 'Alternate density with plain verbs.'
          }
        ],
        quiz: [
          {
            q: 'The nominalised form of "the economy grew" is:',
            opts: [
              '"the growth of the economy"',
              '"the economy grow"',
              '"grow economy"',
              'All of the above'
            ],
            ans: 0,
            why: 'The action becomes a noun phrase.'
          },
          {
            q: 'Nominalisation makes writing:',
            opts: [
              'denser and more formal',
              'shorter and casual',
              'looser',
              'None of the above'
            ],
            ans: 0,
            why: 'Density + formality = its purpose.'
          },
          {
            q: 'Pure nominalisation fails because:',
            opts: [
              'it blocks flow with noun-stacks',
              'it is too short',
              'nouns are illegal',
              'All of the above'
            ],
            ans: 0,
            why: 'Noun-stacks suffocate; verbs give air.'
          },
          {
            q: 'The balanced C2 paragraph:',
            opts: [
              'alternates noun-density with plain verbs',
              'uses only nouns',
              'uses only verbs',
              'None of the above'
            ],
            ans: 0,
            why: 'Density with oxygen is the craft.'
          }
        ]
      },
      {
        id: 'c2-1-2',
        title: 'The Full Modality Spectrum',
        tag: 'grammar',
        icon: 'grammar',
        mins: 22,
        xp: 22,
        objective: 'Express certainty, possibility, and obligation with the full range of modals.',
        teach: [
          'The certainty ladder: MUST (deduced certain) → SHOULD (expected) → MAY/COULD (possible) → MIGHT/CANNOT RULE OUT (slight). Choose the rung your evidence supports: "The figures must reflect under-reporting."',
          'The past forms: must have + p.p. (certain about the past), may have (possible), can\'t have (impossible): "She can\'t have missed the announcement." Correct past modality = C2 control.',
          'Modality of habit: "The restaurant would be crowded in summer." Will/would for repeated past behaviour is the highest subtlety.',
          'In argument: hedge with may/arguably; deepen with "it is conceivable that"; commit with "the evidence compels the conclusion that". One spectrum, many registers.',
          'Rami tip: take one claim and walk it up and down the certainty ladder aloud: possible → likely → almost certain. Modality is calculus in words.'
        ],
        examples: [
          {
            en: 'The results must reflect a genuine trend.',
            note: 'Must = a strong logical deduction.'
          },
          {
            en: 'It may have been a scheduling conflict.',
            note: 'May have + p.p. = a polite past possibility.'
          },
          {
            en: 'On summer evenings, the café would fill with regulars.',
            note: 'Would = the habitual past.'
          }
        ],
        words: [
          {
            w: 'certainty',
            ar: 'يقين',
            ex: 'Certainty climbs with the evidence.'
          },
          {
            w: 'conceivable',
            ar: 'محتمل تصوره',
            ex: 'It is conceivable that demand rises.'
          },
          {
            w: 'compel',
            ar: 'يفرض/يُلزم',
            ex: 'The data compel a firm conclusion.'
          },
          {
            w: 'spectrum',
            ar: 'طيف',
            ex: 'Modality runs a full spectrum.'
          }
        ],
        quiz: [
          {
            q: 'The strongest deduction is:',
            opts: [
              'must have been',
              'might have been',
              'could have been',
              'All of the above'
            ],
            ans: 0,
            why: 'Must + have + p.p. = near-certain about the past.'
          },
          {
            q: '"She can\'t have missed it" means:',
            opts: [
              'it is impossible she missed it',
              'she probably missed it',
              'she missed it surely',
              'None of the above'
            ],
            ans: 0,
            why: 'Can\'t have = the impossibility rung.'
          },
          {
            q: 'Past habitual behaviour uses:',
            opts: [
              'would + base verb',
              'must + base',
              'should + base',
              'All of the above'
            ],
            ans: 0,
            why: '"The café would fill" = repeated past.'
          },
          {
            q: 'In argument, the deepest hedge is:',
            opts: [
              '"it is conceivable that..."',
              '"it is a fact..."',
              '"100%..."',
              'None of the above'
            ],
            ans: 0,
            why: 'Conceivable admits possibility with sophistication.'
          }
        ]
      },
      {
        id: 'c2-1-3',
        title: 'Inversion: Its Outer Limits',
        tag: 'grammar',
        icon: 'grammar',
        mins: 22,
        xp: 22,
        objective: 'Handle rare inversions — negative adverbials, so/such, and conditional inversion.',
        teach: [
          'Conditional inversion: "Had I known, I would have stayed." (= If I had known). Removing "if" and inverting = the C2 conditional.',
          'Rare negative adverbs: "Barely had the call ended when...", "Not once did she complain.", "Under no circumstances should you open it."',
          'So/Such emphasis inversion: "So compelling was the evidence that the jury agreed instantly." So + adjective inverted = dramatic focus.',
          'The exam-safety rule: inversion is the spice — one or two per piece. Stack four inversions and even C2 writing feels mannered.',
          'Rami tip: write three conditional sentences and flip two into inversions: "Had I prepared earlier..." Keep the third plain — variety.'
        ],
        examples: [
          {
            en: 'Had I known the cost, I would have declined.',
            note: 'If → Had + subject = conditional inversion.'
          },
          {
            en: 'Not until sunset did the fog lift.',
            note: 'Not until + did + subject.'
          },
          {
            en: 'So intense was the focus that no one moved.',
            note: 'So + adjective + was + subject.'
          }
        ],
        words: [
          {
            w: 'invert',
            ar: 'يقلب',
            ex: 'Invert the subject and auxiliary.'
          },
          {
            w: 'barely',
            ar: 'بالكاد',
            ex: 'Barely had we left when it rained.'
          },
          {
            w: 'mannerism',
            ar: 'تصنع',
            ex: 'Stacked inversions become mannerism.'
          },
          {
            w: 'spice',
            ar: 'توابل/لمسة',
            ex: 'Inversion is the spice of style.'
          }
        ],
        quiz: [
          {
            q: '"Had I known, I would have stayed" means:',
            opts: [
              '"If I had known..."',
              '"Since I knew..."',
              '"I know then..."',
              'All of the above'
            ],
            ans: 0,
            why: 'Had + subject = the inverted form of if + had.'
          },
          {
            q: 'The negative inversion is:',
            opts: [
              '"Not until sunset did the fog lift."',
              '"The fog did not lift until sunset."',
              '"Sunset fog."',
              'None of the above'
            ],
            ans: 0,
            why: 'Negative adverbial + did + subject = inverted.'
          },
          {
            q: 'So-inversion: correct form is:',
            opts: [
              '"So intense was the focus that..."',
              '"So was intense the focus..."',
              '"Focus so intense was..."',
              'All of the above'
            ],
            ans: 0,
            why: 'So + adjective + was + subject + that.'
          },
          {
            q: 'The expert\'s rule for inversions is:',
            opts: [
              'one or two per piece',
              'as many as possible',
              'never use them',
              'only in questions'
            ],
            ans: 0,
            why: 'Rare structures shine when they are rare.'
          }
        ]
      },
      {
        id: 'c2-1-4',
        title: 'Register Shifts with Precision',
        tag: 'grammar',
        icon: 'write',
        mins: 22,
        xp: 22,
        objective: 'Move fluidly between formal, neutral and informal voice within one text.',
        teach: [
          'Register shift = the art of changing tone deliberately: a report that opens formal, uses a precise factual middle, and delivers a measured, human close.',
          'Formal markers: nominalisation, passive, rare verbs (expedite, commence). Neutral: standard verbs (speed up slightly, start). Informal: phrasals, contractions, sentence fragments.',
          'The C2 test is CHOICE WITH REASON: you shift not by accident but because the moment demands — evidence formal, example direct, reflection measured.',
          'Common mistake: accidental register leaks — an essay that slips into "kids" or "stuff". Audit every word against your chosen tone.',
          'Rami tip: write one paragraph in three registers today. Then choose which register fits which sentence of your real essay. Deliberate = mastery.'
        ],
        examples: [
          {
            en: 'Formal: "The committee will expedite the review."',
            note: 'Expedite = the formal speed.'
          },
          {
            en: 'Neutral: "The committee will move the review forward quickly."',
            note: 'A balanced, standard phrasing.'
          },
          {
            en: 'Informal: "The team will push the review through fast."',
            note: 'Phrasal + short = the loose voice.'
          }
        ],
        words: [
          {
            w: 'shift',
            ar: 'تحول',
            ex: 'A deliberate shift changes the tone.'
          },
          {
            w: 'deliberate',
            ar: 'متعمد',
            ex: 'Make register changes deliberate.'
          },
          {
            w: 'leak',
            ar: 'تسرب',
            ex: 'Accidental leaks break the tone.'
          },
          {
            w: 'audit',
            ar: 'يدقق',
            ex: 'Audit your word choices.'
          }
        ],
        quiz: [
          {
            q: 'The formal word for "speed up" is:',
            opts: [
              'expedite',
              'speed',
              'go fast',
              'None of the above'
            ],
            ans: 0,
            why: 'Rare formal verbs carry the register.'
          },
          {
            q: 'A register leak is:',
            opts: [
              'an accidental informal word in a formal text',
              'changing the topic',
              'a long sentence',
              'All of the above'
            ],
            ans: 0,
            why: 'Leaks break the chosen tone.'
          },
          {
            q: 'C2 register control means:',
            opts: [
              'each shift is deliberate and justified',
              'using every register randomly',
              'one tone forever',
              'None of the above'
            ],
            ans: 0,
            why: 'Choice with reason = mastery.'
          },
          {
            q: 'The matching set: formal open + neutral middle + human close is:',
            opts: [
              'a conscious register arc',
              'an accident',
              'a mistake',
              'All of the above'
            ],
            ans: 0,
            why: 'A planned tone journey is advanced craft.'
          }
        ]
      }
    ]
  },
  {
    id: 'c2-discourse',
    title: 'Discourse & Style',
    icon: 'spark',
    desc: 'Figurative language, subtlety, idiomatic precision and discourse-level cohesion.',
    lessons: [
      {
        id: 'c2-2-1',
        title: 'Figurative Language Mastery',
        tag: 'writing',
        icon: 'write',
        mins: 22,
        xp: 22,
        objective: 'Use metaphor and imagery to make arguments unforgettable.',
        teach: [
          'The metaphor engine: "The city is the beating heart of the region." One comparison carries an entire judgement — concrete, vivid, memorable.',
          'Similes are the safe cousin: "Robots in the workplace feel like a double-edged sword." Like/as keep the image explicit and controlled.',
          'The C2 trust: figurative language must serve the argument, not decorate it. An image that clarifies wins; an image that confuses loses.',
          'Avoid mixed metaphors: "Let\'s move the goalposts onto new ground" mixes two images — the classic creative slip.',
          'Rami tip: describe your study journey with ONE sustained metaphor — "building a house" — and use it across three sentences. Discipline builds imagery.'
        ],
        examples: [
          {
            en: 'Education is the ladder out of poverty.',
            note: 'A single comparison carries the claim.'
          },
          {
            en: 'The debate felt like a slow-motion earthquake.',
            note: 'Simile + emotion + scale.'
          },
          {
            en: 'Inflation is the quiet thief of the working class.',
            note: 'Metaphor that judges and memorises.'
          }
        ],
        words: [
          {
            w: 'metaphor',
            ar: 'استعارة',
            ex: 'A metaphor compares without like/as.'
          },
          {
            w: 'simile',
            ar: 'تشبيه',
            ex: 'A simile uses like or as.'
          },
          {
            w: 'vivid',
            ar: 'حي',
            ex: 'Vivid images stay in the memory.'
          },
          {
            w: 'mixed metaphor',
            ar: 'استعارة مختلطة',
            ex: 'Mixed metaphors confuse the image.'
          }
        ],
        quiz: [
          {
            q: 'A metaphor (no like/as):',
            opts: [
              '"Time is a river."',
              '"Time is like a river."',
              '"Time, you know..."',
              'None of the above'
            ],
            ans: 0,
            why: 'Direct comparison without like/as = metaphor.'
          },
          {
            q: 'The figurative image must:',
            opts: [
              'serve and clarify the argument',
              'only decorate',
              'confuse the reader',
              'All of the above'
            ],
            ans: 0,
            why: 'Function first, prettiness second.'
          },
          {
            q: '"Moving the goalposts onto new ground" is:',
            opts: [
              'a mixed metaphor to avoid',
              'perfect imagery',
              'a simile',
              'None of the above'
            ],
            ans: 0,
            why: 'Two images crash into one sentence.'
          },
          {
            q: 'A sustained metaphor is used:',
            opts: [
              'across several connected sentences',
              'once, randomly',
              'never',
              'All of the above'
            ],
            ans: 0,
            why: 'Sustained = disciplined and powerful.'
          }
        ]
      },
      {
        id: 'c2-2-2',
        title: 'Subtlety & Nuance',
        tag: 'reading',
        icon: 'read',
        mins: 22,
        xp: 22,
        objective: 'Read and write with the precision of unspoken shades of meaning.',
        teach: [
          'Nuance = the precise shade between A and B: "dislike" vs "resent" vs "mistrust" — three feelings, three intensities. Mastery is choosing the exact rung.',
          'Ambig-subtlety in reading: "his suggestion was received warmly but not adopted" — implied: appreciated yet resisted. The reader holds both facts at once.',
          'Hedges create nuance: "appears to", "arguably", "to some degree" — each keeps the claim honest at C2 resolution.',
          'The C2 register for nuance: "While X is broadly supported, its implementation remains contested." Opposite truths, elegantly held.',
          'Rami tip: take two words with similar meanings and find the ONE context where only one fits. "Stubborn" vs "determined" — the tone difference is the nuance.'
        ],
        examples: [
          {
            en: 'She accepted the plan without enthusiasm.',
            note: 'Implies reluctance without saying it.'
          },
          {
            en: 'The idea gained traction, though not unanimous support.',
            note: 'Partial progress, exactly shaded.'
          },
          {
            en: 'Broadly supported yet contested in practice.',
            note: 'Opposite truths held together.'
          }
        ],
        words: [
          {
            w: 'nuance',
            ar: 'تدرج دقيق',
            ex: 'Nuance is the shade between words.'
          },
          {
            w: 'subtle',
            ar: 'دقيق/خفيف',
            ex: 'The difference is subtle but vital.'
          },
          {
            w: 'contest',
            ar: 'غير متفق عليه',
            ex: 'The claim remains contested.'
          },
          {
            w: 'traction',
            ar: 'انتشار تدريجي',
            ex: 'The idea gained traction.'
          }
        ],
        quiz: [
          {
            q: 'The most precise feeling-word for "dislike + anger at unfairness" is:',
            opts: [
              'resent',
              'dislike',
              'mistrust',
              'None of the above'
            ],
            ans: 0,
            why: 'Resent = the angered shade of dislike.'
          },
          {
            q: '"Received warmly but not adopted" implies:',
            opts: [
              'appreciated yet resisted',
              'rejected coldly',
              'fully accepted',
              'All of the above'
            ],
            ans: 0,
            why: 'Both facts exist at once — the nuance.'
          },
          {
            q: 'The C2 way to hold two truths is:',
            opts: [
              '"broadly supported yet contested"',
              '"good and bad"',
              '"yes and no"',
              'None of the above'
            ],
            ans: 0,
            why: 'Precise opposites, elegantly balanced.'
          },
          {
            q: '"Determined" and "stubborn" differ mainly in:',
            opts: [
              'tone and judgement',
              'spelling',
              'tense',
              'All of the above'
            ],
            ans: 0,
            why: 'The same trait, valued differently by tone.'
          }
        ]
      },
      {
        id: 'c2-2-3',
        title: 'Idiomatic Precision',
        tag: 'vocab',
        icon: 'idiom',
        mins: 22,
        xp: 22,
        objective: 'Use subtle idioms and fixed expressions with total naturalness.',
        teach: [
          'At C2, idioms shrink and sharpen: "in the grand scheme of things" (long view), "a moot point" (irrelevant debate), "to the letter" (exactly), "on the cusp of" (at the edge of change).',
          'Precision = the idiom fulfils a meaning that plain words stretch for: "on the cusp of a breakthrough" says more than "almost achieving" — economics of expression.',
          'Contextual fit: "a moot point" in an essay signals confident thinking; in an apology it would be cold. Match the idiom to the register.',
          'The anti-cliché eye: skip overused bullets ("at the end of the day", "think outside the box") — examiners heard them ten thousand times.',
          'Rami tip: build a C2 shelf of five subtle expressions and nail each with one sentence this week: "We are on the cusp of renewable dominance."'
        ],
        examples: [
          {
            en: 'We are on the cusp of a digital revolution.',
            note: 'On the cusp = right at the edge of change.'
          },
          {
            en: 'Whether tea or coffee is "better" is a moot point.',
            note: 'A moot point = a debate without a useful answer.'
          },
          {
            en: 'The plan must be followed to the letter.',
            note: 'To the letter = with exact precision.'
          }
        ],
        words: [
          {
            w: 'cusp',
            ar: 'حافة/عتبة',
            ex: 'We are on the cusp of change.'
          },
          {
            w: 'moot',
            ar: 'يعود بلا فائدة',
            ex: 'That argument is now a moot point.'
          },
          {
            w: 'to the letter',
            ar: 'حرفياً/بتفصيل',
            ex: 'Follow the rules to the letter.'
          },
          {
            w: 'cliché',
            ar: 'قول مبتذل',
            ex: 'Skip the clichés examiners know.'
          }
        ],
        quiz: [
          {
            q: '"On the cusp of" means:',
            opts: [
              'right at the edge of a change',
              'long after it happened',
              'unrelated',
              'None of the above'
            ],
            ans: 0,
            why: 'Cusp = the sharp edge of transition.'
          },
          {
            q: 'A "moot point" is:',
            opts: [
              'a debate with no useful conclusion',
              'the most important idea',
              'a funny story',
              'All of the above'
            ],
            ans: 0,
            why: 'Moot = open, but practically irrelevant.'
          },
          {
            q: '"To the letter" means:',
            opts: [
              'with exact precision',
              'by email',
              'in a letter',
              'None of the above'
            ],
            ans: 0,
            why: 'Literally exact, without deviation.'
          },
          {
            q: 'The cliché to avoid in an exam is:',
            opts: [
              '"think outside the box"',
              '"a double-edged sword"',
              '"bottom line"',
              'All of the above'
            ],
            ans: 0,
            why: 'Overused bullets read as low originality.'
          }
        ]
      },
      {
        id: 'c2-2-4',
        title: 'Discourse-Level Cohesion',
        tag: 'grammar',
        icon: 'grammar',
        mins: 22,
        xp: 22,
        objective: 'Use theme-rheme flow so every sentence hands the next one its subject.',
        teach: [
          'The C2 secret is theme-rheme: the sentence opens with what is KNOWN (theme), ends with what is NEW (rheme) — and the next sentence opens with that same NEW. The text threads like a necklace.',
          'Example thread: "Cities face intensifying pressure. This pressure stems from migration. Migration, in turn, reshapes housing demand." Each new fact becomes the next opening.',
          'Paragraph movement: topic sentence states the theme; the body walks the rheme; the closing re-themes for the next paragraph.',
          'The payoff: a reader never has to re-read — the flow carries logic itself. This is the invisible machine behind "coherent" writing.',
          'Rami tip: take a paragraph and underline the last 3 words of each sentence; the next sentence should refer to them. Thread the needle.'
        ],
        examples: [
          {
            en: 'Urbanisation accelerates. This acceleration creates housing pressure.',
            note: 'New idea (pressure) becomes the next subject.'
          },
          {
            en: 'Housing pressure affects young families. Young families, in turn, migrate outward.',
            note: 'Theme-rheme threading across sentences.'
          },
          {
            en: 'Migration reshapes demand. Demand now extends to the suburbs.',
            note: 'One continuous necklace.'
          }
        ],
        words: [
          {
            w: 'theme',
            ar: 'الموضوع المعلوم',
            ex: 'The theme is what the listener already knows.'
          },
          {
            w: 'rheme',
            ar: 'المعلومة الجديدة',
            ex: 'The rheme delivers the new information.'
          },
          {
            w: 'thread',
            ar: 'خيط',
            ex: 'Thread each sentence to the next.'
          },
          {
            w: 'necklace',
            ar: 'قلادة',
            ex: 'The text threads like a necklace.'
          }
        ],
        quiz: [
          {
            q: 'Theme-rheme flow means:',
            opts: [
              'each new idea becomes the next sentence\'s opening',
              'every sentence repeats a word',
              'random order',
              'None of the above'
            ],
            ans: 0,
            why: 'Known → new → new becomes known.'
          },
          {
            q: 'The thread sentence pairs well:',
            opts: [
              '"Pressure stems from migration. Migration reshapes demand."',
              '"Pressure is bad. Also, trees are green."',
              '"A. B. C."',
              'All of the above'
            ],
            ans: 0,
            why: 'The second opens exactly where the first ended.'
          },
          {
            q: 'The payoff of threading is:',
            opts: [
              'the reader never re-reads',
              'longer essays',
              'more vocabulary',
              'None of the above'
            ],
            ans: 0,
            why: 'Invisible logic carries the reader.'
          },
          {
            q: 'The thread practice is:',
            opts: [
              'make the end of each sentence the start of the next',
              'change topics every line',
              'write backwards',
              'All of the above'
            ],
            ans: 0,
            why: 'Necklace discipline creates native flow.'
          }
        ]
      }
    ]
  },
  {
    id: 'c2-research',
    title: 'Research & Synthesis',
    icon: 'library',
    desc: 'Absorb, evaluate and weave source material into academic prose.',
    lessons: [
      {
        id: 'c2-3-1',
        title: 'Summarising Research',
        tag: 'reading',
        icon: 'read',
        mins: 22,
        xp: 22,
        objective: 'Compress a paper into its essence without distortion.',
        teach: [
          'The summary formula: question → method → finding → significance. Four sentences hold any study: what it asked, how, what it found, why it matters.',
          'Compression = deletion with loyalty: keep the KEY finding and the CAVEAT ("although limited to..."); drop methodology details and anecdotes.',
          'Signal the author\'s stance: "the authors argue" vs "the data show" — know whether a claim is the study\'s opinion or its evidence.',
          'Numbers carry precision: keep one decisive statistic, not the whole table. "A decline of 18% was observed."',
          'Rami tip: summarise the next article you read in four sentences using the formula. Compression is a muscle.'
        ],
        examples: [
          {
            en: 'This paper examines how remote work affects productivity, using 5,000 employee surveys, and finds a modest 6% gain.',
            note: 'Question + method + finding in one line.'
          },
          {
            en: 'The authors argue the effect depends on role, though they concede the sample skews urban.',
            note: 'Stance + caveat, loyally kept.'
          },
          {
            en: 'Overall, the study suggests flexibility helps — within limits.',
            note: 'Significance + boundary.'
          }
        ],
        words: [
          {
            w: 'summary',
            ar: 'ملخص',
            ex: 'Summarise without distorting.'
          },
          {
            w: 'caveat',
            ar: 'تحفظ',
            ex: 'Keep the caveat with the finding.'
          },
          {
            w: 'method',
            ar: 'منهجية',
            ex: 'The method shapes the result\'s value.'
          },
          {
            w: 'stance',
            ar: 'موقف',
            ex: 'Separate the author\'s stance from the data.'
          }
        ],
        quiz: [
          {
            q: 'The summary formula is:',
            opts: [
              'question → method → finding → significance',
              'who → when → where → why',
              'first sentence → conclusion',
              'None of the above'
            ],
            ans: 0,
            why: 'The four anchors hold any study.'
          },
          {
            q: 'When summarising, keep:',
            opts: [
              'the finding and its caveat',
              'every table number',
              'the whole methodology',
              'All of the above'
            ],
            ans: 0,
            why: 'Loyal compression = key + boundary.'
          },
          {
            q: '"The authors argue" signals:',
            opts: [
              'the study\'s stance, not raw data',
              'a typo',
              'the conclusion law',
              'None of the above'
            ],
            ans: 0,
            why: 'Argument language = opinion; data language = evidence.'
          },
          {
            q: 'The precise summary keeps:',
            opts: [
              'one decisive statistic',
              'twenty numbers',
              'no numbers',
              'All of the above'
            ],
            ans: 0,
            why: 'One exact figure carries the point.'
          }
        ]
      },
      {
        id: 'c2-3-2',
        title: 'Synthesising Multiple Sources',
        tag: 'writing',
        icon: 'write',
        mins: 22,
        xp: 22,
        objective: 'Build one argument from several studies, not a pile of studies.',
        teach: [
          'The synthesis move: source A and B disagree → your judgement. "While Study A links fast food to obesity, Study B disputes the causal link; the more convincing position is the moderated A view."',
          'Cluster sources by AGREEMENT before writing: three studies supporting, two qualifying. Groups become the body paragraphs, not individual sources.',
          'Synthesis verbs of judgement: "the balance of evidence suggests", "taken together, the findings indicate", "the preponderance of research favours".',
          'The confidence test: point at the strongest source and the weakest, and say why. Selecting IS analysing.',
          'Rami tip: for your next essay, group your five references into two clusters before you write one sentence. Clusters → paragraphs.'
        ],
        examples: [
          {
            en: 'Study A supports the link; Study B qualifies it; the evidence overall favours a partial link.',
            note: 'Agreement → disagreement → judgement.'
          },
          {
            en: 'The balance of evidence suggests a small but real effect.',
            note: 'A weighed conclusion across sources.'
          },
          {
            en: 'While the studies differ on magnitude, none disputes the direction.',
            note: 'Disagreement localised — agreement preserved.'
          }
        ],
        words: [
          {
            w: 'synthesis',
            ar: 'توليف',
            ex: 'Synthesis builds one fabric.'
          },
          {
            w: 'cluster',
            ar: 'مجموعة',
            ex: 'Cluster sources by agreement.'
          },
          {
            w: 'preponderance',
            ar: 'غالبية الأدلة',
            ex: 'The preponderance favours the view.'
          },
          {
            w: 'magnitude',
            ar: 'الحجم/المقدار',
            ex: 'They differ on magnitude, not direction.'
          }
        ],
        quiz: [
          {
            q: 'The synthesis judgement is:',
            opts: [
              '"the balance of evidence suggests..."',
              '"Study A says..."',
              '"source one..."',
              'None of the above'
            ],
            ans: 0,
            why: 'Judgement across sources = synthesis.'
          },
          {
            q: 'Cluster sources by:',
            opts: [
              'agreement before writing',
              'alphabetical order',
              'randomness',
              'All of the above'
            ],
            ans: 0,
            why: 'Agreement groups become paragraphs.'
          },
          {
            q: 'Selecting the strongest source is:',
            opts: [
              'part of the analysis',
              'a waste of time',
              'copying',
              'None of the above'
            ],
            ans: 0,
            why: 'Choosing IS judging.'
          },
          {
            q: 'The best synthesis is:',
            opts: [
              'one fabric from many threads',
              'a list of studies',
              'a single quote',
              'All of the above'
            ],
            ans: 0,
            why: 'Fabric beats pile every time.'
          }
        ]
      },
      {
        id: 'c2-3-3',
        title: 'Critical Evaluation of Papers',
        tag: 'reading',
        icon: 'evaluate',
        mins: 22,
        xp: 22,
        objective: 'Read a study and test its design, sample and conclusions.',
        teach: [
          'The four audits: sample (who/how many?), design (controlled? longitudinal?), measures (what was actually measured?), and conclusions (do they exceed the data?).',
          'The classic flaws: small n (too few people), self-selection (only the motivated joined), correlation-as-causation (again!), survivorship (only the successful remain).',
          'The significance vs size trap: "statistically significant" ≠ "large". A tiny true effect may matter little — read the number, not the asterisk.',
          'Applied evaluation: for each paper ask "would I change my mind?" If evidence only echoes you, find the source that challenges it.',
          'Rami tip: audit one research claim today with the four audits in sixty seconds. Skepticism is a skill, not a mood.'
        ],
        examples: [
          {
            en: 'The sample was only 40 self-selected volunteers.',
            note: 'Small n + self-selection = weak generalisation.'
          },
          {
            en: 'The study is correlational; it cannot prove cause.',
            note: 'Design limits the conclusion.'
          },
          {
            en: 'The effect is significant but tiny — 0.2% — so practical impact is minimal.',
            note: 'Size vs significance, read honestly.'
          }
        ],
        words: [
          {
            w: 'sample',
            ar: 'عينة',
            ex: 'The sample determines the reach.'
          },
          {
            w: 'longitudinal',
            ar: 'طولي (متابعة عبر الزمن)',
            ex: 'A longitudinal design tracks change.'
          },
          {
            w: 'survivorship',
            ar: 'تحيز الناجين',
            ex: 'Survivorship hides the failures.'
          },
          {
            w: 'significant',
            ar: 'دال إحصائياً',
            ex: 'Significant is not the same as large.'
          }
        ],
        quiz: [
          {
            q: 'Self-selected volunteers weaken a study because:',
            opts: [
              'only motivated people joined',
              'they are too many',
              'they are anonymous',
              'None of the above'
            ],
            ans: 0,
            why: 'Motivated volunteers are unrepresentative.'
          },
          {
            q: 'A correlational study:',
            opts: [
              'cannot prove causation',
              'proves causation',
              'ignores data',
              'All of the above'
            ],
            ans: 0,
            why: 'Correlation shows links, not causes.'
          },
          {
            q: '"Statistically significant" means:',
            opts: [
              'the effect likely exists, not that it is large',
              'the effect is enormous',
              'nothing',
              'None of the above'
            ],
            ans: 0,
            why: 'Significance ≠ size.'
          },
          {
            q: 'The best applied test of a study is:',
            opts: [
              '"would this change my mind?"',
              '"did my teacher like it?"',
              '"is it long?"',
              'All of the above'
            ],
            ans: 0,
            why: 'Genuine evidence changes conclusions.'
          }
        ]
      },
      {
        id: 'c2-3-4',
        title: 'Academic Argumentation',
        tag: 'writing',
        icon: 'write',
        mins: 22,
        xp: 22,
        objective: 'Write a defended academic argument: claim, evidence, counter, synthesis.',
        teach: [
          'The academic argument arc: claim → evidence → counter → synthesis. Claim states; evidence proves; counter tests; synthesis restores the strongest form.',
          'Each claim in a paragraph STAYS with its evidence. One claim per paragraph, defended to the last sentence — no abandoned ideas.',
          'The counter is not a courtesy — it is the calibration: after defeating a strong counter, your claim is sharper and more trustworthy.',
          'Synthesis restates the claim at a higher level: "The original question, properly weighed, resolves not to either-or but to when and how." Elevated closure.',
          'Rami tip: write the four moves for your next essay\'s central claim today. Had the arc, the essay writes itself.'
        ],
        examples: [
          {
            en: 'Claim: "Subsidies distort but also enable green energy."',
            note: 'The precise claim to defend.'
          },
          {
            en: 'Evidence: "Germany\'s EEG mechanism raised renewables from 6% to 46%."',
            note: 'Named, dated, quantified proof.'
          },
          {
            en: 'Counter: "Critics note costs; yet the learning-curve savings offset them."',
            note: 'Calibrated counter-defeat.'
          }
        ],
        words: [
          {
            w: 'arc',
            ar: 'قوس',
            ex: 'The argument arc has four moves.'
          },
          {
            w: 'calibrate',
            ar: 'يضبط',
            ex: 'Counter-defeat calibrates the claim.'
          },
          {
            w: 'elevated',
            ar: 'مرفوع/أعمق',
            ex: 'Synthesis closes at a higher level.'
          },
          {
            w: 'defend',
            ar: 'يدافع',
            ex: 'Defend each claim to the last sentence.'
          }
        ],
        quiz: [
          {
            q: 'The four moves of the academic arc are:',
            opts: [
              'claim → evidence → counter → synthesis',
              'intro → joke → outro',
              'question → answer → repeat',
              'None of the above'
            ],
            ans: 0,
            why: 'The defended argument needs all four.'
          },
          {
            q: 'Each paragraph should defend:',
            opts: [
              'one claim fully',
              'five claims briefly',
              'no claims',
              'All of the above'
            ],
            ans: 0,
            why: 'Loyalty to one idea per paragraph.'
          },
          {
            q: 'The counter exists to:',
            opts: [
              'calibrate and sharpen your claim',
              'distract',
              'end the essay',
              'None of the above'
            ],
            ans: 0,
            why: 'Defeat it and your claim grows.'
          },
          {
            q: 'The elevated synthesis closes:',
            opts: [
              'at a higher level — when and how',
              'with a shrug',
              'by repeating the opening',
              'All of the above'
            ],
            ans: 0,
            why: 'Closure above the either-or.'
          }
        ]
      }
    ]
  },
  {
    id: 'c2-fluency-adv',
    title: 'Total Fluency',
    icon: 'speak',
    desc: 'Impromptu speaking, expressiveness, rhetorical devices, and self-repair.',
    lessons: [
      {
        id: 'c2-4-1',
        title: 'Impromptu Speaking',
        tag: 'speaking',
        icon: 'speak',
        mins: 22,
        xp: 22,
        objective: 'Deliver a coherent talk on any topic within 30 seconds of hearing it.',
        teach: [
          'The instant-speech framework: claim → two reasons → example → landing. You hear a topic, and within ten seconds you are already in "my view is... first... second... for instance... so..."',
          'The safe opener that buys your first sentence: "That\'s an interesting point. There are really two sides to it." Then the framework executes.',
          'Train the "either way" skill: you can argue A or B. Preparing both directions in your mind makes any question defensible.',
          'Improvisation = pattern, not luck: rehearse the framework until it is reflex, and the topic is just fuel for the engine.',
          'Rami tip: draw a random topic (home, cities, technology), give 30 seconds of thinking, then speak for 60 seconds using the framework. Repeat daily.'
        ],
        examples: [
          {
            en: 'That is an interesting question. My view is that... First,... Second,... For instance,... So...',
            note: 'The reflex framework under pressure.'
          },
          {
            en: 'There are two sides to this. On the one hand..., on the other...',
            note: 'The balanced instant opener.'
          },
          {
            en: 'If I had to choose, I would argue... because...',
            note: 'Decisive under uncertainty.'
          }
        ],
        words: [
          {
            w: 'impromptu',
            ar: 'ارتجالي',
            ex: 'Impromptu speech is unrehearsed.'
          },
          {
            w: 'framework',
            ar: 'إطار عمل',
            ex: 'A framework saves your first 10 seconds.'
          },
          {
            w: 'reflex',
            ar: 'رد فعل تلقائي',
            ex: 'Make the framework a reflex.'
          },
          {
            w: 'landing',
            ar: 'خاتمة قوية',
            ex: 'End with a clear landing.'
          }
        ],
        quiz: [
          {
            q: 'The instant-speech framework is:',
            opts: [
              'claim → reasons → example → landing',
              'once upon a time',
              'I don\'t know',
              'None of the above'
            ],
            ans: 0,
            why: 'Structure saves improvisation.'
          },
          {
            q: 'The safe opener for instant topics is:',
            opts: [
              '"There are really two sides to this."',
              '"What?"',
              '"Next topic."',
              'All of the above'
            ],
            ans: 0,
            why: 'It buys time and announces order.'
          },
          {
            q: 'Train both directions because:',
            opts: [
              'any question becomes defensible',
              'it wastes time',
              'it confuses',
              'None of the above'
            ],
            ans: 0,
            why: 'Either-way prep wins every prompt.'
          },
          {
            q: 'Improvisation is really:',
            opts: [
              'a rehearsed pattern under pressure',
              'pure randomness',
              'luck',
              'All of the above'
            ],
            ans: 0,
            why: 'Framework as reflex = controlled spontaneity.'
          }
        ]
      },
      {
        id: 'c2-4-2',
        title: 'Expressiveness & Rhetoric',
        tag: 'speaking',
        icon: 'speak',
        mins: 22,
        xp: 22,
        objective: 'Use rhetorical questions, triads and emphasis to make speaking vivid.',
        teach: [
          'The triad rhythm: three parallel items land like a punch: "It is faster, cheaper, and kinder to the planet." Three beats = memorable speech.',
          'Rhetorical questions involve the examiner: "Is that really progress?" Asked and then answered yourself, they build drama without handing over the turn.',
          'Emphasis through contrast: "Not a luxury, but a necessity." The not-but frame makes the point absolute.',
          'The C2 rule: rhetoric every other minute, not every sentence. One triad per answer chain is power; five is performance.',
          'Rami tip: prepare one triad + one rhetorical question for your favourite topic and rehearse delivery. Drama in service of meaning.'
        ],
        examples: [
          {
            en: 'It is faster, cheaper, and fairer for everyone.',
            note: 'The triad lands three beats.'
          },
          {
            en: 'What does this cost us? Everything, if we look away.',
            note: 'Rhetorical question + self-answer.'
          },
          {
            en: 'This is not a bonus — it is a baseline.',
            note: 'Contrast emphasis.'
          }
        ],
        words: [
          {
            w: 'triad',
            ar: 'ثلاثية',
            ex: 'A triad adds rhythm.'
          },
          {
            w: 'rhetorical',
            ar: 'بلاغي',
            ex: 'A rhetorical question needs no answer.'
          },
          {
            w: 'emphasis',
            ar: 'توكيد',
            ex: 'Contrast creates emphasis.'
          },
          {
            w: 'delivery',
            ar: 'أداء',
            ex: 'Delivery multiplies the words.'
          }
        ],
        quiz: [
          {
            q: 'A triad is:',
            opts: [
              'three parallel items that land together',
              'three sentences of silence',
              'a question',
              'None of the above'
            ],
            ans: 0,
            why: 'Three beats = rhythm and punch.'
          },
          {
            q: 'A rhetorical question:',
            opts: [
              'is answered by the speaker',
              'awaits the examiner',
              'ends the talk',
              'All of the above'
            ],
            ans: 0,
            why: 'The speaker asks and answers.'
          },
          {
            q: 'The not-but emphasis is:',
            opts: [
              '"Not a luxury, but a necessity."',
              '"A luxury thing."',
              '"Necessity and luxury."',
              'None of the above'
            ],
            ans: 0,
            why: 'Contrast frames the absolute.'
          },
          {
            q: 'The C2 dosage for rhetoric is:',
            opts: [
              'one triad per answer chain',
              'triads everywhere',
              'never',
              'All of the above'
            ],
            ans: 0,
            why: 'Power in scarcity.'
          }
        ]
      },
      {
        id: 'c2-4-3',
        title: 'Self-Correction & Repair',
        tag: 'speaking',
        icon: 'chat',
        mins: 22,
        xp: 22,
        objective: 'Fix your own slip mid-sentence — the final fluency skill.',
        teach: [
          'Native speakers repair constantly: "I drove — I was driven, actually — and yet..." The repair is a feature, not a flaw: examiners reward the clean restart.',
          'Repair phrases: "Rather than X, I should say Y." "Correction: it\'s the second one." "What I meant to say is..." Each reads as precision.',
          'Repair by expansion: half said a weak word, upgrade instantly: "The effect is big — I mean substantial — and growing." Upgrading midstream shows range.',
          'The rule: repair ONCE, then move on. Repeated re-repairs sound scrambled. One clean correction per slide is native; three is nervous.',
          'Rami tip: record yourself for two minutes and count repairs. Aim for smooth single-corrections, never trailing: "I mean..." then keep going.'
        ],
        examples: [
          {
            en: 'The plan is risky — I mean, miscalibrated — and needs review.',
            note: 'Instant precision upgrade mid-sentence.'
          },
          {
            en: 'Correction: it happened in 2021, not 2020.',
            note: 'A fact repaired cleanly.'
          },
          {
            en: 'What I meant to say is that the burden is shared.',
            note: 'A graceful full-restart after a tangle.'
          }
        ],
        words: [
          {
            w: 'repair',
            ar: 'تصحيح ذاتي',
            ex: 'Repair is a native skill.'
          },
          {
            w: 'upgrade',
            ar: 'ترقية',
            ex: 'Upgrade the weak word instantly.'
          },
          {
            w: 'smooth',
            ar: 'سلس',
            ex: 'Keep the correction smooth.'
          },
          {
            w: 'trailing',
            ar: 'متردد',
            ex: 'Avoid trailing re-repairs.'
          }
        ],
        quiz: [
          {
            q: 'A clean self-repair:',
            opts: [
              'reads as precision, not failure',
              'sounds terrible',
              'loses points always',
              'None of the above'
            ],
            ans: 0,
            why: 'Native repair = the mark of control.'
          },
          {
            q: 'The best repair phrase is:',
            opts: [
              '"What I meant to say is..."',
              '"Oh, wrong, wrong..."',
              '"Never mind."',
              'All of the above'
            ],
            ans: 0,
            why: 'A single clean restart covers the slip.'
          },
          {
            q: 'Upgrading midstream means:',
            opts: [
              'say "big — I mean substantial" to show range',
              'never change words',
              'speak slower',
              'None of the above'
            ],
            ans: 0,
            why: 'Instant upgrades display lexical fluency.'
          },
          {
            q: 'The home stretch rule is:',
            opts: [
              'repair once, then move on',
              'repair three times',
              'apologise repeatedly',
              'All of the above'
            ],
            ans: 0,
            why: 'One correction per slide = native rhythm.'
          }
        ]
      },
      {
        id: 'c2-4-4',
        title: 'Cultural Fluency in English',
        tag: 'speaking',
        icon: 'library',
        mins: 22,
        xp: 22,
        objective: 'Reference culture, idiom and context the way native speakers do.',
        teach: [
          'Cultural fluency = knowing the REFERENCE GAME: "It is a Catch-22" (a paradox trap), "a David and Goliath story" (underdog vs giant), "the elephant in the room" (the obvious unspoken issue).',
          'English-speaking culture runs on literary echoes: Hamlet\'s dilemmas, fairy-tale structures, biblical turns ("a drop in the ocean"). Recognise, reference, move on.',
          'Numbers and measures read culturally: "a drop in the ocean" vs "a needle in a haystack" — know the image, use it for the right scale.',
          'The safe-C2 rule: reference to CLARIFY, never to show off. A reference the examiner has to Google is a failed reference.',
          'Rami tip: collect five cultural references and force each into a spoken sentence about real life this week. Reference + meaning = native texture.'
        ],
        examples: [
          {
            en: 'Trying to fix the whole system at once is a Catch-22.',
            note: 'The paradox trap — either option fails.'
          },
          {
            en: 'The small cafés vs the global chains is a David-and-Goliath story.',
            note: 'The underdog image applies instantly.'
          },
          {
            en: 'The missing budget is the elephant in the room.',
            note: 'The obvious issue nobody names.'
          }
        ],
        words: [
          {
            w: 'reference',
            ar: 'مرجع ثقافي',
            ex: 'Cultural references enrich meaning.'
          },
          {
            w: 'Catch-22',
            ar: 'مأزق متناقض',
            ex: 'Either choice defeats you — a Catch-22.'
          },
          {
            w: 'elephant in the room',
            ar: 'قضية معلنة ولا يتحدث عنها أحد',
            ex: 'Name the elephant in the room.'
          },
          {
            w: 'underdog',
            ar: 'الطرف الأضعف',
            ex: 'The underdogs overcame the champion.'
          }
        ],
        quiz: [
          {
            q: '"A Catch-22" describes:',
            opts: [
              'a paradox where either choice fails',
              'a lucky win',
              'a very tall building',
              'None of the above'
            ],
            ans: 0,
            why: 'The trap with no escape.'
          },
          {
            q: '"A drop in the ocean" means:',
            opts: [
              'an amount too small to matter',
              'a large amount',
              'a seaside town',
              'All of the above'
            ],
            ans: 0,
            why: 'Tiny against the whole.'
          },
          {
            q: 'The safe-C2 rule for references is:',
            opts: [
              'use them to clarify, never to show off',
              'pack in as many as possible',
              'never use them',
              'None of the above'
            ],
            ans: 0,
            why: 'Clarity, not performance.'
          },
          {
            q: 'Cultural fluency requires the speaker to:',
            opts: [
              'know the reference AND its applied meaning',
              'only the spelling',
              'just repeat it',
              'All of the above'
            ],
            ans: 0,
            why: 'Reference + transfer = real fluency.'
          }
        ]
      }
    ]
  },
  {
    id: 'c2-band9',
    title: 'Band 9 Refinement',
    icon: 'roadmap',
    desc: 'The final polish: exactness, concision, naturalness and rhetorical power.',
    lessons: [
      {
        id: 'c2-5-1',
        title: 'Exactness & Precision',
        tag: 'writing',
        icon: 'write',
        mins: 22,
        xp: 22,
        objective: 'Choose the exact word for the exact shade — no more, no less.',
        teach: [
          'Precision = word-to-shade match: "discuss" vs "slightly disagree" vs "challenge" vs "refute" — four different intellectual actions. The examiner scores the exactness.',
          'The thesaurus trap: "prestigious" is not a happy "big"; "mitigate" is not "solve". Range is useless unless the nuance fits the context.',
          'Precise verbs carry the sentence: "the policy curtails, extends, or merely amends" — each is a different legislative act.',
          'Precision in numbers and modifiers: "roughly 70%" vs "over two-thirds" vs "approximately 7 in 10" — each is exact in its own register.',
          'Rami tip: keep a mismatched-word diary: every time you catch a vaguely-inaccurate word, log the precise replacement. Logging sharpens the eye.'
        ],
        examples: [
          {
            en: 'He conceded the point, though he refused to change the policy.',
            note: 'Concede vs refuse — two exact acts.'
          },
          {
            en: 'The measure mitigates, rather than eliminates, the risk.',
            note: 'The precise verb with its exact limit.'
          },
          {
            en: 'The report slightly overstates the decline: it is closer to 45%, not 55%.',
            note: 'Exactness in number and claim.'
          }
        ],
        words: [
          {
            w: 'exact',
            ar: 'دقيق تماماً',
            ex: 'Exact words fit the shade.'
          },
          {
            w: 'concede',
            ar: 'يقر/يسلم',
            ex: 'She conceded the point graciously.'
          },
          {
            w: 'mitigate',
            ar: 'يخفف',
            ex: 'Mitigate is not the same as solve.'
          },
          {
            w: 'overstate',
            ar: 'يبالغ',
            ex: 'Do not overstate the claim.'
          }
        ],
        quiz: [
          {
            q: 'The most precise of these is:',
            opts: [
              'refute a claim',
              'talk about a claim',
              'claim stuff',
              'None of the above'
            ],
            ans: 0,
            why: 'Refute = the exact intellectual act.'
          },
          {
            q: 'The thesaurus trap is:',
            opts: [
              'using a big word that does not fit',
              'using simple words',
              'learning new words',
              'All of the above'
            ],
            ans: 0,
            why: 'Range without fit = noise.'
          },
          {
            q: 'The precise verb for reducing-not-solving is:',
            opts: [
              'mitigate',
              'solve',
              'ignore',
              'None of the above'
            ],
            ans: 0,
            why: 'Mitigate = reduce, exactly.'
          },
          {
            q: '"Approximately 7 in 10" is:',
            opts: [
              'precise in its own register',
              'a guess',
              'a fraction error',
              'All of the above'
            ],
            ans: 0,
            why: 'Numbers have register-exact forms too.'
          }
        ]
      },
      {
        id: 'c2-5-2',
        title: 'Concision: The Art of Cutting',
        tag: 'writing',
        icon: 'write',
        mins: 22,
        xp: 22,
        objective: 'Say more with fewer words — the senior writer\'s signature.',
        teach: [
          'Concision = removing words without removing meaning: "in the event that" → "if"; "at this point in time" → "now"; "the reason why is because" → "because".',
          'The redundancy hunt: "collaborate together", "final outcome", "free gift" — each has a doubled word. Cut one; the meaning survives.',
          'Active voice compresses: "The data were able to support the conclusion" → "The data support the conclusion."',
          'Cutting is CLAIRFYING: "The government, which is the central authority in this matter, holds responsibility" → "The government is responsible." Clarity pays the band.',
          'Rami tip: take your last paragraph and cut 20% of its words without losing a single idea. Call it the 20% diet.'
        ],
        examples: [
          {
            en: 'If — not "in the event that" — demand rises, prices follow.',
            note: 'The long form becomes the short.'
          },
          {
            en: 'The team cooperated (not "collaborated together") to finish.',
            note: 'Redundant doubled words get cut.'
          },
          {
            en: 'The evidence supports the claim. (Not "is able to support".)',
            note: 'Active and exact.'
          }
        ],
        words: [
          {
            w: 'concise',
            ar: 'مختصر',
            ex: 'Concise = meaning without fat.'
          },
          {
            w: 'redundant',
            ar: 'مكرر/زائد',
            ex: 'Cut the redundant words.'
          },
          {
            w: 'active voice',
            ar: 'مبني للمعلوم',
            ex: 'Active voice compresses.'
          },
          {
            w: 'clarity',
            ar: 'وضوح',
            ex: 'Cutting always serves clarity.'
          }
        ],
        quiz: [
          {
            q: 'The concise version of "in the event that" is:',
            opts: [
              '"if"',
              '"whenever it might occur"',
              '"in case that"',
              'None of the above'
            ],
            ans: 0,
            why: 'If does the job in one word.'
          },
          {
            q: 'Redundancy means:',
            opts: [
              'doubled words adding nothing',
              'too few words',
              'long sentences',
              'All of the above'
            ],
            ans: 0,
            why: '"Collaborate together" = one idea in two words.'
          },
          {
            q: 'The compressed sentence is:',
            opts: [
              '"The data support the conclusion."',
              '"The data are able to support the conclusion."',
              '"It is possible for the data to support."',
              'None of the above'
            ],
            ans: 0,
            why: 'Active + exact = compressed.'
          },
          {
            q: 'Cutting words without losing meaning results in:',
            opts: [
              'more clarity and higher bands',
              'a confused text',
              'a longer essay',
              'All of the above'
            ],
            ans: 0,
            why: 'Leaner writing reads sharper.'
          }
        ]
      },
      {
        id: 'c2-5-3',
        title: 'Naturalness: Beyond Textbook English',
        tag: 'writing',
        icon: 'write',
        mins: 22,
        xp: 22,
        objective: 'Sound native by using natural combinations and native rhythm.',
        teach: [
          'Naturalness = what a fluent person actually writes: "ask for clarification" not "request for a clarification"; "make an effort" not "do an effort". The textbook word is not always the native word.',
          'Native rhythm: front-load the important idea: "What surprised me most was the silence" (cleft) moves the drama to the front on purpose.',
          'Natural transitions whisper, they do not shout: "over time", "in practice", "in many cases" glue sentences like native thought.',
          'Naturalness test: ask "would I send this sentence to a native friend?" If it feels wooden, rewrite for the ear, not the dictionary.',
          'Rami tip: read two native paragraphs, underline three phrasings you would never have written, and imitate each once this week. Imitation is the naturalness lab.'
        ],
        examples: [
          {
            en: 'In practice, the reform worked better than the model predicted.',
            note: 'A native whisper-transition, not a shout.'
          },
          {
            en: 'What struck me was how quickly the mood changed.',
            note: 'The cleft front-loads the drama.'
          },
          {
            en: 'Over the years, habits quietly reshape who we are.',
            note: 'Natural rhythm and word order.'
          }
        ],
        words: [
          {
            w: 'natural',
            ar: 'طبيعي',
            ex: 'Natural English flows like thought.'
          },
          {
            w: 'combination',
            ar: 'تركيبة',
            ex: 'Natural combinations beat textbook rules.'
          },
          {
            w: 'whisper',
            ar: 'همس',
            ex: 'Native transitions whisper.'
          },
          {
            w: 'reinforce',
            ar: 'يعزز',
            ex: 'The ear approves what the eye accepts.'
          }
        ],
        quiz: [
          {
            q: 'The native combination is:',
            opts: [
              '"make an effort"',
              '"do an effort"',
              '"perform an effort"',
              'None of the above'
            ],
            ans: 0,
            why: 'Make + effort is the natural pair.'
          },
          {
            q: 'Front-loading drama uses:',
            opts: [
              'cleft sentences',
              'long clauses',
              'no verbs',
              'All of the above'
            ],
            ans: 0,
            why: '"What surprised me was..." put the surprise first.'
          },
          {
            q: 'Native transitions:',
            opts: [
              'whisper with over time / in practice',
              'shout with every paragraph',
              'never appear',
              'None of the above'
            ],
            ans: 0,
            why: 'Natural glue is quiet and repeating.'
          },
          {
            q: 'The naturalness test is:',
            opts: [
              'would you send it to a native friend?',
              'is it in the dictionary?',
              'is it long?',
              'All of the above'
            ],
            ans: 0,
            why: 'The ear is the final judge.'
          }
        ]
      },
      {
        id: 'c2-5-4',
        title: 'The Student Becomes the Master',
        tag: 'exam',
        icon: 'evaluate',
        mins: 22,
        xp: 22,
        objective: 'Deliver your full power under exam pressure — the last 100 metres.',
        teach: [
          'The finish-line frame: you have built skills; the exam now tests their RECALL under pressure. Recall needs routines, not more learning — the plan, the ritual, the scripts.',
          'The three scripts every top scorer carries: a writing checklist (structure → task → cohesion → slips), a speaking entry kit (openers + fillers + repairs), a reading scan map.',
          'Pressure management: 10-second box breathing before each part; reframe anxiety as energy: "I feel ready because I am awake."',
          'The review ritual: after each section, one breath minimum. Athletes recover between rounds; so do Band 9 speakers.',
          'The final truth: the exam measures what you already know. Your job is not to learn more in the last weeks — it is to DELIVER what you have. Trust the training, run the scripts, and finish strong.'
        ],
        examples: [
          {
            en: 'Writing checklist: read the prompt twice → outline → draft → scan for slips.',
            note: 'A recall routine, not new learning.'
          },
          {
            en: 'Speaking kit: one strong opener, three fillers, one repair phrase — ready.',
            note: 'The entry kit for any question.'
          },
          {
            en: 'Box breathing before the Listening part one: in 4, hold 4, out 4, hold 4.',
            note: 'Ten seconds that reset the nerves.'
          }
        ],
        words: [
          {
            w: 'recall',
            ar: 'استدعاء',
            ex: 'The exam tests recall of built skills.'
          },
          {
            w: 'ritual',
            ar: 'روتين',
            ex: 'Rituals turn pressure into routine.'
          },
          {
            w: 'reframe',
            ar: 'يعيد تأطير',
            ex: 'Reframe anxiety as energy.'
          },
          {
            w: 'deliver',
            ar: 'يقدم',
            ex: 'Your job is to deliver what you know.'
          }
        ],
        quiz: [
          {
            q: 'The top scorer\'s real exam skill is:',
            opts: [
              'recall of built skills under pressure',
              'cramming last week',
              'panic',
              'None of the above'
            ],
            ans: 0,
            why: 'Delivery beats new cramming at the end.'
          },
          {
            q: 'A writing checklist exists to:',
            opts: [
              'stop small slips under pressure',
              'add word count',
              'impress',
              'All of the above'
            ],
            ans: 0,
            why: 'Routine recall, not learning.'
          },
          {
            q: 'Anxiety in the exam can be:',
            opts: [
              'reframed as energy',
              'ignored forever',
              'erased entirely',
              'None of the above'
            ],
            ans: 0,
            why: '"I am ready because I am awake."'
          },
          {
            q: 'Between sections, the Band 9 move is:',
            opts: [
              'one breath to reset',
              'checking messages',
              'rehearsing fears',
              'All of the above'
            ],
            ans: 0,
            why: 'Recovery between rounds.'
          }
        ]
      }
    ]
  }
];
