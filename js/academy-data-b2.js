/* ============================================================
   Rami Academy — B2 Upper-Intermediate curriculum (5 units × 4 lessons)
   Every lesson: Rami teaches (teach[]), examples, words, quiz.
   ============================================================ */
const ACADEMY_UNITS_B2 = [
  {
    id: 'b2-complex',
    title: 'Complex Grammar',
    icon: 'grammar',
    desc: 'Conditionals, wishes, advanced relatives and inversion — the structures of real control.',
    lessons: [
      {
        id: 'b2-1-1',
        title: 'All Conditionals Review',
        tag: 'grammar',
        icon: 'grammar',
        mins: 18,
        xp: 18,
        objective: 'Master the zero, first, second and third conditionals and choose the right one.',
        teach: [
          'The four-condition revolution for IELTS: zero (facts, present+present), first (real future, if+present+will), second (unreal now, if+past+would), third (unmade past, if+had+would have). One Level of reality = one conditional.',
          'Second conditional is the Band 6→7 bridge: "If I started a business, I would..." Unreal now: if + past, would + base. NO "was" — for hypotheticals use "were" for everyone: "If he were rich, he would travel."',
          'Third conditional = regret/imagined past: "If I had practised more, I would have passed." If + had + p.p., would have + p.p. This structure alone distinguishes Band 7 from Band 6.',
          'Mixed conditionals keep examiners impressed: "If I had studied harder (past), I would be at university now (present)." Past condition, present result.',
          'Rami tip: build four sentences about YOUR life, one per conditional. "If I study, I will pass. If I were richer, I would travel. If I had prepared, I would have scored 8." Real life = real conditionals.'
        ],
        examples: [
          {
            en: 'If I were the minister, I would invest in education.',
            note: 'Second conditional: unreal present, were + would.'
          },
          {
            en: 'If they had left earlier, they would have avoided the traffic.',
            note: 'Third conditional: unmade past, had left + would have avoided.'
          },
          {
            en: 'If you apply now, you will get a reply quickly.',
            note: 'First conditional: real future, present + will.'
          }
        ],
        words: [
          {
            w: 'hypothetical',
            ar: 'افتراضي',
            ex: 'Hypothetical situations use the second conditional.'
          },
          {
            w: 'regret',
            ar: 'ندم',
            ex: 'The third conditional expresses regret.'
          },
          {
            w: 'situation',
            ar: 'موقف/حالة',
            ex: 'Each situation needs the right conditional.'
          },
          {
            w: 'imagine',
            ar: 'يتخيل',
            ex: 'Imagine if you had started earlier.'
          }
        ],
        quiz: [
          {
            q: '"If I ______ rich, I would travel the world."',
            opts: [
              'was',
              'were',
              'am',
              'be'
            ],
            ans: 1,
            why: 'Unreal conditions use "were" for all subjects.'
          },
          {
            q: 'Third conditional: correct is:',
            opts: [
              '"If I had studied, I would have passed."',
              '"If I studied, I would pass."',
              '"If I have studied, I would have passed."',
              'None of the above'
            ],
            ans: 0,
            why: 'If + had + p.p., would have + p.p.'
          },
          {
            q: 'Second vs third: which is about the PAST?',
            opts: [
              'third: if had + would have',
              'second: if were + would',
              'first: if + will',
              'zero: facts'
            ],
            ans: 0,
            why: 'The third conditional rewrites the unreal past.'
          },
          {
            q: 'A mixed conditional links:',
            opts: [
              'a past condition to a present result',
              'a present fact to the future',
              'three past events',
              'nothing'
            ],
            ans: 0,
            why: 'Mixed: had + p.p. condition → would + base present result.'
          }
        ]
      },
      {
        id: 'b2-1-2',
        title: 'Wishes & Regrets',
        tag: 'grammar',
        icon: 'grammar',
        mins: 18,
        xp: 18,
        objective: 'Express wishes about now, and regrets about the past with I wish / if only.',
        teach: [
          '"I wish" + past = a wish about NOW: "I wish I spoke English better." It is unreal now — same shape as the second conditional.',
          '"I wish" + had + past participle = regret in the PAST: "I wish I had studied more." The regret is the third conditional in disguise.',
          '"If only" is the emotional twin: "If only the weather were nicer!" It intensifies the wish — band-7 examiners love the natural surge.',
          'Common mistakes: never "I wish I will", never "I wish I am". After "wish" the verb always steps back one tense: wish + past (now), wish + past perfect (earlier).',
          'Rami tip: write three real wishes: two for now, one regret about the past. "I wish I were taller. I wish I had more time. I wish I had started English at six."'
        ],
        examples: [
          {
            en: 'I wish I had more free time.',
            note: 'Wish + past = unreal now.'
          },
          {
            en: 'If only I had prepared for the interview!',
            note: 'If only + had + p.p. = past regret with emotion.'
          },
          {
            en: 'I wish it were Saturday tomorrow.',
            note: '"Were" for the unreal, even with "it".'
          }
        ],
        words: [
          {
            w: 'wish',
            ar: 'يتمنى',
            ex: 'I wish the exam were easier.'
          },
          {
            w: 'if only',
            ar: 'ليت',
            ex: 'If only I had listened earlier.'
          },
          {
            w: 'regret',
            ar: 'ندم',
            ex: 'He regrets not taking the course.'
          },
          {
            w: 'unreal',
            ar: 'غير واقعي',
            ex: 'Wishes describe unreal situations.'
          }
        ],
        quiz: [
          {
            q: '"I wish I ______ speak French" — about now:',
            opts: [
              'could',
              'can',
              'will',
              'am'
            ],
            ans: 0,
            why: 'Wish + past (could) = unreal present ability.'
          },
          {
            q: '"I wish I ______ the news earlier."',
            opts: [
              'had watched',
              'watch',
              'will watch',
              'All of the above'
            ],
            ans: 0,
            why: 'Past regret = wish + had + p.p.'
          },
          {
            q: 'The emotionally stronger wish is:',
            opts: [
              '"If only I had known!"',
              '"I want to know."',
              '"I did not know."',
              'None of the above'
            ],
            ans: 0,
            why: 'If only + past perfect = intense regret.'
          },
          {
            q: 'NEVER say after "I wish":',
            opts: [
              'I wish I will pass',
              'I wish I passed',
              'I wish I had passed',
              'I wish I could pass'
            ],
            ans: 0,
            why: 'Wish never takes "will" — the verb must step back.'
          }
        ]
      },
      {
        id: 'b2-1-3',
        title: 'Relative Clauses: which, who, that, whose',
        tag: 'grammar',
        icon: 'grammar',
        mins: 18,
        xp: 18,
        objective: 'Add information to nouns with relative clauses — defining and non-defining.',
        teach: [
          'Relative clauses add a second idea into one sentence: "The essay which I wrote yesterday is short." which (things), who (people), that (things/people), whose (possession), where (places).',
          'Defining clauses — NO commas — narrow the noun: "Students who study daily pass faster." You NEED the clause to know WHICH students. Non-defining — WITH commas — add extra detail: "My brother, who lives in Amman, is an engineer."',
          'The pronoun decides: things → which; people → who; possession → whose; place → where: "This is the city where I grew up."',
          'The exam error to erase: "the book who..." — never: people take who, things take which/what. "What" never follows a noun (say "the thing that/which", not "the thing what").',
          'Rami tip: upgrade two short sentences into one relative-clause sentence today: "I have a brother. He writes poems." → "I have a brother who writes poems." Merging = mastery.'
        ],
        examples: [
          {
            en: 'The student who scored the highest received a prize.',
            note: 'Who for a person — defining (no commas).'
          },
          {
            en: 'My phone, which I bought last month, is already slow.',
            note: 'Which for the thing + commas = extra detail.'
          },
          {
            en: 'This is the café where we first met.',
            note: 'Where for the place.'
          }
        ],
        words: [
          {
            w: 'relative clause',
            ar: 'جملة وصفية موصولة',
            ex: 'A relative clause adds information to a noun.'
          },
          {
            w: 'whose',
            ar: 'الذي يملك',
            ex: 'The author whose book I read visited us.'
          },
          {
            w: 'defining',
            ar: 'محددة',
            ex: 'A defining clause has no commas.'
          },
          {
            w: 'non-defining',
            ar: 'غير محددة',
            ex: 'A non-defining clause adds extra detail.'
          }
        ],
        quiz: [
          {
            q: 'People take the pronoun:',
            opts: [
              'who',
              'which',
              'what',
              'where'
            ],
            ans: 0,
            why: 'Who/whom for people; which for things.'
          },
          {
            q: '"The book ______ I borrowed was fascinating."',
            opts: [
              'which',
              'who',
              'whom',
              'whose'
            ],
            ans: 0,
            why: 'A book (thing) → which/that.'
          },
          {
            q: 'A defining clause (no commas) is required when:',
            opts: [
              'the noun is not fully identified yet',
              'the detail is extra',
              'it is the last sentence',
              'All of the above'
            ],
            ans: 0,
            why: 'Defining clauses pin down which one — commas would turn it into bonus info.'
          },
          {
            q: 'Correct: "The writer ______ books I love just released a novel."',
            opts: [
              'whose',
              'which',
              'what',
              'where'
            ],
            ans: 0,
            why: 'Whose = possession: the writer\'s books.'
          }
        ]
      },
      {
        id: 'b2-1-4',
        title: 'Inversion & Emphasis',
        tag: 'grammar',
        icon: 'grammar',
        mins: 18,
        xp: 18,
        objective: 'Make sentences emphatic with inversion after negative and "only" expressions.',
        teach: [
          'Inversion = verb before subject for dramatic emphasis after negatives: "Never have I seen such a view." Normal: "I have never seen...". The band-flipping switch.',
          'Common inverters: never, rarely, seldom, hardly, not only...but also, no sooner...than, only then, only when, not until. "Not only did she sing, but she also danced."',
          'The did-help trick with past simple: "Rarely did we visit the coast." In late = the auxiliary (did/have/is) moves; the main verb stays base.',
          'The exam-safe pair: hardly/scarcely...when and no sooner...than: "No sooner had I left than the rain started." Both signal "one thing right after another".',
          'Rami tip: write two emphatic sentences about your goals: "Not only do I study English, but I also practise daily." Drama in grammar = control in speech.'
        ],
        examples: [
          {
            en: 'Never have I felt so proud.',
            note: 'Negative opener + have + subject.'
          },
          {
            en: 'Not only was it cheap, but it was also healthy.',
            note: 'Not only + was + subject... but also.'
          },
          {
            en: 'No sooner had we arrived than the show began.',
            note: 'No sooner...than = immediate sequence.'
          }
        ],
        words: [
          {
            w: 'inversion',
            ar: 'قلب/تقديم الخبر',
            ex: 'Inversion puts the verb before the subject.'
          },
          {
            w: 'emphasis',
            ar: 'تركيز',
            ex: 'Emphasis changes the tone of a sentence.'
          },
          {
            w: 'rarely',
            ar: 'نادراً',
            ex: 'Rarely do we eat out.'
          },
          {
            w: 'not only',
            ar: 'ليس فقط',
            ex: 'Not only did he pass — he excelled.'
          }
        ],
        quiz: [
          {
            q: 'The correct inversion is:',
            opts: [
              '"Never have I seen such talent."',
              '"Never I have seen such talent."',
              '"Never have seen I such talent."',
              'None of the above'
            ],
            ans: 0,
            why: 'Negative + auxiliary + subject + main verb.'
          },
          {
            q: 'The inverted form of "I rarely visit" is:',
            opts: [
              '"Rarely do I visit."',
              '"Rarely I visit."',
              '"Rarely visit I."',
              'All of the above'
            ],
            ans: 0,
            why: 'With past simple, inversion uses the did-helper: rarely do I visit.'
          },
          {
            q: 'The complete structure is:',
            opts: [
              '"Not only did she sing, but she also danced."',
              '"Not only she sang, but also danced."',
              '"Not only sang she."',
              'None of the above'
            ],
            ans: 0,
            why: 'Not only + did + subject + base verb... but also.'
          },
          {
            q: '"No sooner..." pairs with:',
            opts: [
              'than',
              'when',
              'because',
              'so'
            ],
            ans: 0,
            why: 'The fixed pair: no sooner...than.'
          }
        ]
      }
    ]
  },
  {
    id: 'b2-media',
    title: 'Media & Society',
    icon: 'library',
    desc: 'Read the news critically: analyse arguments, spot bias, and argue with evidence.',
    lessons: [
      {
        id: 'b2-2-1',
        title: 'Understanding the News',
        tag: 'reading',
        icon: 'read',
        mins: 18,
        xp: 18,
        objective: 'Read news texts for structure, source and reliability.',
        teach: [
          'News follows the inverted pyramid: headline → summary lead → details → background. The first paragraph answers who, what, when, where, why in one block.',
          'Verbs in headlines are loaded: "rock", "soar", "plunge" replace "rise and fall" with emotion. Reading for neutrality means noticing these choices.',
          'Attribution = trust signal: "According to the report", "experts warn", "the ministry confirmed". A report with sources is stronger than one with vague claims.',
          'The exam reflex: distinguish FACT (verifiable) from OPINION (judgement): "The price rose 5%" (fact) vs "The price rose absurdly" (opinion disguised).',
          'Rami tip: next article you read — underline the lead, circle the sources, and label one fact + one opinion. Thirty seconds of analysis = lifelong critical literacy.'
        ],
        examples: [
          {
            en: 'Headline: "Oil Prices Soar as Demand Rebounds".',
            note: '"Soar" is emotional for "rose sharply".'
          },
          {
            en: 'The lead: "Oil prices jumped 8% this week, the ministry said."',
            note: 'Fact + attribution = verifiable news.'
          },
          {
            en: 'Quote: "The surge is a golden opportunity for exporters," an analyst argued.',
            note: '"Argued" = opinion attributed to a person.'
          }
        ],
        words: [
          {
            w: 'headline',
            ar: 'عنوان',
            ex: 'The headline creates the first impression.'
          },
          {
            w: 'source',
            ar: 'مصدر',
            ex: 'Reliable articles name their sources.'
          },
          {
            w: 'attribution',
            ar: 'إسناد',
            ex: 'Attribution shows who said the claim.'
          },
          {
            w: 'biased',
            ar: 'منحاز',
            ex: 'Check whether the report is biased.'
          }
        ],
        quiz: [
          {
            q: 'The most information-dense paragraph in news is:',
            opts: [
              'the first (the lead)',
              'the last',
              'the middle photo caption',
              'the footer'
            ],
            ans: 0,
            why: 'The lead answers who/what/when/where/why in one block.'
          },
          {
            q: 'A trust signal in reporting is:',
            opts: [
              'attribution to sources',
              'no names',
              'exclamation marks',
              'vague claims'
            ],
            ans: 0,
            why: 'Attribution = the claim is traceable to someone.'
          },
          {
            q: '"Experts warn that..." shows:',
            opts: [
              'an opinion attributed to experts',
              'a verifiable number',
              'a joke',
              'the conclusion'
            ],
            ans: 0,
            why: 'Warn + experts = judgement attributed to a source.'
          },
          {
            q: 'The phrase "soared" instead of "rose" adds:',
            opts: [
              'emotion and emphasis',
              'a number',
              'a source',
              'nothing'
            ],
            ans: 0,
            why: 'Loaded verbs carry tone — critical readers notice.'
          }
        ]
      },
      {
        id: 'b2-2-2',
        title: 'Analysing Arguments',
        tag: 'reading',
        icon: 'evaluate',
        mins: 18,
        xp: 18,
        objective: 'Break any argument into claim, reason, and evidence — then test it.',
        teach: [
          'Every argument has three parts: a CLAIM (what they say), a REASON (why), and EVIDENCE (proof). "We should build cycle lanes (claim) because they cut emissions (reason): Amsterdam proved it (evidence)."',
          'Test the LINK between evidence and claim: does the example truly support the point? If the "evidence" is one-person experience, the argument is weak — generalise with "studies find".',
          'Spot logical slips: overgeneralisation ("Everyone knows"), false cause (A happened then B, so A caused B), and either/or framing ("Either we ban cars or the city collapses").',
          'The Skill of steelmanning: restate the opposite argument as strongly as you can before answering. Understanding the best version = defeating it fairly.',
          'Rami tip: take one social debate and map it: claim → reason → evidence → weak spot. Mapping beats memorising opinions.'
        ],
        examples: [
          {
            en: 'Claim: "Remote work boosts focus."',
            note: 'The position to be tested.'
          },
          {
            en: 'Reason: "It removes commuting stress."',
            note: 'The why-behind-the-claim.'
          },
          {
            en: 'Evidence: "A 2023 survey found 58% of workers report higher focus at home."',
            note: 'Concrete, dated, attributable proof.'
          }
        ],
        words: [
          {
            w: 'claim',
            ar: 'ادعاء',
            ex: 'The article\'s central claim is clear.'
          },
          {
            w: 'evidence',
            ar: 'دليل',
            ex: 'Strong arguments cite strong evidence.'
          },
          {
            w: 'logical',
            ar: 'منطقي',
            ex: 'Is the connection logical?'
          },
          {
            w: 'counter the argument',
            ar: 'يناقض الحجة',
            ex: 'Evidence can counter the whole argument.'
          }
        ],
        quiz: [
          {
            q: 'The strongest part of an argument is its:',
            opts: [
              'evidence, dated and attributed',
              'forceful tone',
              'length',
              'famous writer'
            ],
            ans: 0,
            why: 'Dated, specific, sourced evidence convinces.'
          },
          {
            q: 'A weak argument often relies on:',
            opts: [
              'a single personal anecdote',
              'several studies',
              'official data',
              'expert quotes'
            ],
            ans: 0,
            why: 'One person\'s story is not a general proof.'
          },
          {
            q: '"Everyone knows that..." is:',
            opts: [
              'an overgeneralisation',
              'strong evidence',
              'a study',
              'a source'
            ],
            ans: 0,
            why: '"Everyone knows" asserts without proof.'
          },
          {
            q: 'Steelmanning means:',
            opts: [
              'arguing against the strongest version of the opposing view',
              'attacking a weak version',
              'agreeing with everyone',
              'All of the above'
            ],
            ans: 0,
            why: 'Engaging the best form of the rival argument is the fair test.'
          }
        ]
      },
      {
        id: 'b2-2-3',
        title: 'Critical Thinking & Bias',
        tag: 'reading',
        icon: 'evaluate',
        mins: 18,
        xp: 18,
        objective: 'Detect bias, evaluate language choices, and separate information from persuasion.',
        teach: [
          'Bias hides in word choice: "terrorist" vs "gunman", "sobering" vs "surprising" — the SAME event with different tone. Look at the adjectives and loaded nouns.',
          'Selection bias: what is LEFT OUT? A story may present three benefits and hide the costs. Ask: "What would the other side say?"',
          'Confirmation bias travels with us: we trust sources that echo our views. Test every claim against one source you disagree with.',
          'The journalist\'s tool is BALANCE: does the piece quote both sides fairly? One-sided sourcing = persuasion wearing a fact costume.',
          'Rami tip: read one opinion column and list five tone words that reveal the writer\'s stance. Detecting tone = detecting bias.'
        ],
        examples: [
          {
            en: '"The reform is a risky gamble."',
            note: '"Risky gamble" = a judgement hiding in nouns.'
          },
          {
            en: 'The report praises three benefits but omits the costs.',
            note: 'Selection bias at work.'
          },
          {
            en: 'The article quotes officials — but never residents.',
            note: 'One-sided sourcing shows the stance.'
          }
        ],
        words: [
          {
            w: 'bias',
            ar: 'تحيز',
            ex: 'Word choice reveals bias.'
          },
          {
            w: 'tone',
            ar: 'نبرة',
            ex: 'The tone is clearly negative.'
          },
          {
            w: 'balance',
            ar: 'توازن',
            ex: 'Balanced articles quote both sides.'
          },
          {
            w: 'persuasion',
            ar: 'إقناع',
            ex: 'Persuasion is the aim behind the text.'
          }
        ],
        quiz: [
          {
            q: '"Gamble" instead of "experiment" reveals:',
            opts: [
              'a negative stance',
              'a fact',
              'a number',
              'a source'
            ],
            ans: 0,
            why: 'Loaded nouns carry the writer\'s judgement.'
          },
          {
            q: 'Selection bias means the text:',
            opts: [
              'leaves out inconvenient facts',
              'includes every fact',
              'quotes both sides',
              'shows numbers'
            ],
            ans: 0,
            why: 'Omitting the other side is a silent bias.'
          },
          {
            q: 'A balanced article:',
            opts: [
              'gives both sides fair space',
              'only praises',
              'only attacks',
              'uses no sources'
            ],
            ans: 0,
            why: 'Balance = fair treatment of both positions.'
          },
          {
            q: 'To fight confirmation bias, you should:',
            opts: [
              'test claims against a source you disagree with',
              'read only what you agree with',
              'avoid news',
              'memorise headlines'
            ],
            ans: 0,
            why: 'Challenging your own views is the cure.'
          }
        ]
      },
      {
        id: 'b2-2-4',
        title: 'Building Counter-Arguments',
        tag: 'writing',
        icon: 'write',
        mins: 18,
        xp: 18,
        objective: 'Acknowledge the opposite view, then overturn it with evidence — the Band 7+ essay move.',
        teach: [
          'The counter-argument paragraph = their view + your refutation: "Opponents argue that online learning lacks personal contact. However, research shows that interactive platforms create strong peer communities."',
          'Openers: "It is often argued that...", "A common objection is...", "Some claim that...". Then defeat with "However / Nevertheless / Yet".',
          'Refutation techniques: question the evidence ("This claim rests on outdated data"), or find the exception ("While true for some regions, it does not hold globally").',
          'End the paragraph by returning to YOUR side: "Therefore, despite the objection, the benefits remain overwhelming." Re-entry = the decisive move.',
          'Rami tip: write their-best-objection to your essay claim, then defeat it in two sentences. The counter-attack is where essays win bands.'
        ],
        examples: [
          {
            en: 'Some argue that television educates as well as any school.',
            note: 'Introducing the opposing claim fairly.'
          },
          {
            en: 'However, passive viewing rarely matches active learning.',
            note: 'The refutation follows immediately.'
          },
          {
            en: 'While true for documentaries, it does not hold for most channels.',
            note: 'Limiting the opponent\'s truth.'
          }
        ],
        words: [
          {
            w: 'counter-argument',
            ar: 'حجة معاكسة',
            ex: 'The counter-argument strengthens your case.'
          },
          {
            w: 'refute',
            ar: 'دحض',
            ex: 'Refute the point with evidence.'
          },
          {
            w: 'acknowledge',
            ar: 'يعترف',
            ex: 'Acknowledge the other side fairly.'
          },
          {
            w: 'objection',
            ar: 'اعتراض',
            ex: 'Address the common objection.'
          }
        ],
        quiz: [
          {
            q: 'The correct counter-argument opener is:',
            opts: [
              '"It is often argued that..."',
              '"Everyone agrees..."',
              '"Nobody doubts..."',
              '"The truth is..."'
            ],
            ans: 0,
            why: '"It is often argued" introduces the opponent fairly.'
          },
          {
            q: 'After presenting the opposing view, you should:',
            opts: [
              'refute it with evidence',
              'abandon your essay',
              'agree completely',
              'silently ignore it'
            ],
            ans: 0,
            why: 'Acknowledge, then overturn — never merely mention.'
          },
          {
            q: 'The refutation opener is:',
            opts: [
              '"However, ..."',
              '"The end, ..."',
              '"So, ..."',
              '"And, ..."'
            ],
            ans: 0,
            why: 'However/Nevertheless open the counter-attack.'
          },
          {
            q: 'The perfect counter-argument paragraph ends by:',
            opts: [
              'returning to your own position',
              'changing the topic',
              'quoting a poem',
              'apologising'
            ],
            ans: 0,
            why: 'Re-enter your side after the refutation for a decisive close.'
          }
        ]
      }
    ]
  },
  {
    id: 'b2-academic',
    title: 'Academic Writing 1',
    icon: 'write',
    desc: 'Task 2 essays, complex sentences, hedging and cohesive devices — the mechanics of Band 7 writing.',
    lessons: [
      {
        id: 'b2-3-1',
        title: 'IELTS Task 2 Essay Structure',
        tag: 'writing',
        icon: 'write',
        mins: 18,
        xp: 18,
        objective: 'Build a four-paragraph Task 2 essay: intro, two body paragraphs, conclusion.',
        teach: [
          'Task 2 anatomy: Introduction (paraphrase + position) → Body 1 (first argument + example) → Body 2 (second argument + example) → Conclusion (restate + final judgement). Four paragraphs, ~280 words.',
          'The introduction formula: "While some argue X, I believe Y." One sentence to paraphrase, one to position. Never write a list of examples in the intro.',
          'Body paragraphs follow: topic sentence → explanation → example → mini-link back. "The main benefit is X. This is because... For instance... Therefore..."',
          'The conclusion is NOT new information: "In conclusion, although X has merits, Y provides the more balanced outcome." Restate — never introduce.',
          'Rami tip: outline four paragraphs for every practice essay BEFORE writing. Outlining time is paid back double in clarity.'
        ],
        examples: [
          {
            en: 'Intro: "Many argue that university should be free. In my view, while free tuition aids access, it must be funded sustainably."',
            note: 'Paraphrase + clear position.'
          },
          {
            en: 'Body: "The first benefit is accessibility. Free tuition removes financial barriers. For example, Norway reports high participation among low-income students."',
            note: 'Topic + why + concrete example.'
          },
          {
            en: 'Conclusion: "In conclusion, despite fiscal challenges, free higher education remains the fairest path to opportunity."',
            note: 'Restates without new ideas.'
          }
        ],
        words: [
          {
            w: 'introduction',
            ar: 'مقدمة',
            ex: 'The introduction states your position.'
          },
          {
            w: 'body paragraph',
            ar: 'فقرة أساسية',
            ex: 'Each body paragraph develops one argument.'
          },
          {
            w: 'conclusion',
            ar: 'خاتمة',
            ex: 'The conclusion restates the main argument.'
          },
          {
            w: 'position',
            ar: 'موقف',
            ex: 'State your position clearly early.'
          }
        ],
        quiz: [
          {
            q: 'A typical Task 2 essay has:',
            opts: [
              '4 paragraphs: intro, 2 bodies, conclusion',
              '1 long paragraph',
              '10 tiny paragraphs',
              'no conclusion'
            ],
            ans: 0,
            why: 'Intro + two supporting bodies + conclusion.'
          },
          {
            q: 'The introduction should:',
            opts: [
              'paraphrase + state the position',
              'list all examples',
              'argue everything',
              'write the conclusion'
            ],
            ans: 0,
            why: 'Rephrase the topic, then declare your stance.'
          },
          {
            q: 'Each body paragraph develops:',
            opts: [
              'one argument with an example',
              'five random ideas',
              'the conclusion',
              'only vocabulary'
            ],
            ans: 0,
            why: 'One idea per body, supported by evidence.'
          },
          {
            q: 'The conclusion must NOT:',
            opts: [
              'introduce new information',
              'restate the position',
              'summarise briefly',
              'None of the above'
            ],
            ans: 0,
            why: 'Conclusions wrap up; new ideas ruin the closure.'
          }
        ]
      },
      {
        id: 'b2-3-2',
        title: 'Complex Sentence Structures',
        tag: 'grammar',
        icon: 'grammar',
        mins: 18,
        xp: 18,
        objective: 'Mix clauses, relatives and connectors so your sentence variety lifts the band.',
        teach: [
          'Band 7+ Writing needs variety: short for punch, long for thinking. Mix simple ("Communities benefit."), compound ("Cities grow, and services multiply."), and complex ("Because services multiply, cities grow.").',
          'The complex recipe = main clause + one subordinate: because/although/if/which/when. "Although remote work saves time, it weakens team bonds." One idea + one dependency.',
          'Relative clauses weave detail: "The policy, which took ten years to prepare, finally passed." Detail rides inside without a new sentence.',
          'The examiner\'s test is CONTROL, not length: a 40-word tangled sentence loses marks. Break complex ideas into two clear sentences.',
          'Rami tip: take your last essay and rewrite three simple sentences as complex ones, then shorten the longest one. Balance = the craft.'
        ],
        examples: [
          {
            en: 'Although tourism boosts income, it can damage local culture.',
            note: 'Although + main clause = balanced complexity.'
          },
          {
            en: 'The reform, which many doubted, has proven effective.',
            note: 'A relative clause rides inside the sentence.'
          },
          {
            en: 'Simple for effect: "The result was clear."',
            note: 'Punch sentences punctuate complex sections.'
          }
        ],
        words: [
          {
            w: 'clause',
            ar: 'جملة فرعية',
            ex: 'A complex sentence has a main and a subordinate clause.'
          },
          {
            w: 'subordinate',
            ar: 'تابعة',
            ex: 'The subordinate clause depends on the main one.'
          },
          {
            w: 'compound',
            ar: 'مركبة (جملة)',
            ex: 'Compounds join equal ideas with and/but/so.'
          },
          {
            w: 'variety',
            ar: 'تنويع',
            ex: 'Sentence variety lifts the writing band.'
          }
        ],
        quiz: [
          {
            q: 'A complex sentence contains:',
            opts: [
              'a main clause + a subordinate clause',
              'only verbs',
              'one word',
              'no clauses'
            ],
            ans: 0,
            why: 'Complexity = main + dependent clause.'
          },
          {
            q: 'The sentence "Although it is costly, it works" uses:',
            opts: [
              'although + two clauses',
              'two main clauses only',
              'no verbs',
              'All of the above'
            ],
            ans: 0,
            why: 'Although makes the first part subordinate.'
          },
          {
            q: 'A 40-word tangled sentence:',
            opts: [
              'loses control and clarity',
              'is guaranteed Band 9',
              'never fails',
              'is required'
            ],
            ans: 0,
            why: 'Length without control breaks coherence.'
          },
          {
            q: 'The best writing style is:',
            opts: [
              'a mix of short and complex sentences',
              'only short ones',
              'only long ones',
              'no sentences'
            ],
            ans: 0,
            why: 'Variety + control = the craft.'
          }
        ]
      },
      {
        id: 'b2-3-3',
        title: 'Hedging & Stance',
        tag: 'writing',
        icon: 'write',
        mins: 18,
        xp: 18,
        objective: 'Make claims precise and defensible with hedging language.',
        teach: [
          'Hedging = softening claims for academic honesty: "It seems that...", "The evidence suggests...", "This is likely to...". Strong essays hedge where the data is incomplete.',
          'Hedges for research findings: "Studies indicate", "Research implies", "Data suggest". Compare with overclaims: "Research proves" — almost nothing is *proven* in social science.',
          'The stance spectrum: fully definite (clearly, undoubtedly), moderate (likely, tends to), cautious (appears, may). Choose the level your evidence supports.',
          'Exam balance: over-hedging sounds weak ("There might possibly be an issue"); under-hedging sounds naive ("This is definitely true"). Match claim strength to evidence.',
          'Rami tip: rewrite one absolute claim you made with a hedge: "Social media destroys concentration" → "Research suggests social media can reduce sustained concentration."'
        ],
        examples: [
          {
            en: 'The data suggest that early start improves decision-making.',
            note: 'Suggest = cautious but respectable.'
          },
          {
            en: 'It is unlikely that one policy solves every case.',
            note: 'Unlikely + qualify = precise and defensible.'
          },
          {
            en: 'Clearly, the benefits outweigh the risks when properly managed.',
            note: 'Firm stance with a condition attached.'
          }
        ],
        words: [
          {
            w: 'hedge',
            ar: 'تخفيف ادعاء',
            ex: 'Hedge claims you cannot fully prove.'
          },
          {
            w: 'suggest',
            ar: 'يشير إلى',
            ex: 'The results suggest a trend.'
          },
          {
            w: 'likely',
            ar: 'مرجح',
            ex: 'The change is likely to continue.'
          },
          {
            w: 'overclaim',
            ar: 'ادعاء مبالغ فيه',
            ex: 'Avoid overclaiming without evidence.'
          }
        ],
        quiz: [
          {
            q: 'The academic hedge in this list is:',
            opts: [
              '"The evidence suggests..."',
              '"It is a fact..."',
              '"Everyone knows..."',
              'None of the above'
            ],
            ans: 0,
            why: 'Suggest = measured, evidence-based language.'
          },
          {
            q: 'Too much hedging makes you sound:',
            opts: [
              'weak and uncertain',
              'powerful',
              'clever',
              'funny'
            ],
            ans: 0,
            why: 'Every sentence hedged loses conviction.'
          },
          {
            q: 'The perfect stance has:',
            opts: [
              'claim strength matched to evidence',
              'no verbs',
              'only adjectives',
              'All of the above'
            ],
            ans: 0,
            why: 'Strong evidence = stronger claims; weak evidence = caution.'
          },
          {
            q: '"Studies indicate that..." is better than "Research proves..." because:',
            opts: [
              'social science rarely proves absolutes',
              'it is shorter',
              'prove is wrong English',
              'None of the above'
            ],
            ans: 0,
            why: 'Indicate/suggest match the real strength of the evidence.'
          }
        ]
      },
      {
        id: 'b2-3-4',
        title: 'Cohesive Devices',
        tag: 'grammar',
        icon: 'grammar',
        mins: 18,
        xp: 18,
        objective: 'Link paragraphs and ideas smoothly with cohesive devices — the glue of coherence.',
        teach: [
          'Coherence = the flow of ideas; cohesion = the glue. Glue types: sequence (firstly, secondly, finally), addition (moreover, furthermore), contrast (however, on the other hand), result (therefore, as a result), example (for instance, such as).',
          'Paragraph-internal links: reference words this/these/that point back: "Cities face crowding. This problem requires..." The "this + noun" trick ties sentences without repetition.',
          'Avoid the marking crime: starting every sentence with "Firstly/Secondly/Thirdly" — mix and vary; the marker list feels robotic in excess.',
          'Lexical cohesion = repeating key words as synonyms: "pollution → emissions → carbon output". Synonym chains prove vocabulary range AND cohesion.',
          'Rami tip: in your next essay, circle every connector and reference word. If a paragraph has none, the glue is missing — fix it.'
        ],
        examples: [
          {
            en: 'Cities are crowded. This problem accelerates as populations grow.',
            note: '"This + noun" ties the two sentences.'
          },
          {
            en: 'Moreover, the cost of land keeps rising.',
            note: 'Moreover adds a further point.'
          },
          {
            en: 'In contrast, rural life offers more space.',
            note: 'In contrast sets up the other side.'
          }
        ],
        words: [
          {
            w: 'cohesion',
            ar: 'ترابط لغوي',
            ex: 'Cohesion links your ideas together.'
          },
          {
            w: 'reference',
            ar: 'إحالة',
            ex: 'This/these create backwards reference.'
          },
          {
            w: 'synonym chain',
            ar: 'سلسلة مرادفات',
            ex: 'Synonyms build lexical cohesion.'
          },
          {
            w: 'coherence',
            ar: 'اتساق',
            ex: 'Coherence is the overall flow of meaning.'
          }
        ],
        quiz: [
          {
            q: '"This problem accelerates..." — the word "This" is:',
            opts: [
              'a cohesive reference back',
              'a new topic',
              'a verb',
              'a conclusion'
            ],
            ans: 0,
            why: 'This + noun refers back to the earlier idea.'
          },
          {
            q: 'The worst error in using markers is:',
            opts: [
              'starting every sentence with Firstly/Secondly/Thirdly',
              'never repeating yourself',
              'using synonyms',
              'All of the above'
            ],
            ans: 0,
            why: 'Robotic marker lists break natural flow.'
          },
          {
            q: '"Pollution → emissions → carbon output" is a:',
            opts: [
              'synonym chain for lexical cohesion',
              'grammar error',
              'new paragraph',
              'a number'
            ],
            ans: 0,
            why: 'Repeated key ideas in different words glue the text.'
          },
          {
            q: 'The result connector is:',
            opts: [
              'therefore',
              'for instance',
              'on the other hand',
              'firstly'
            ],
            ans: 0,
            why: 'Therefore introduces the outcome.'
          }
        ]
      }
    ]
  },
  {
    id: 'b2-professional',
    title: 'Professional English',
    icon: 'chat',
    desc: 'Meetings, negotiations, professional emails and register — English at work.',
    lessons: [
      {
        id: 'b2-4-1',
        title: 'Meetings & Discussion',
        tag: 'speaking',
        icon: 'speak',
        mins: 18,
        xp: 18,
        objective: 'Run and join meetings with structured, professional English.',
        teach: [
          'Chairing openers: "Let\'s get started." "Shall we look at the agenda?" "I propose we begin with item one." The chair sets order and time.',
          'Giving the floor: "What are your thoughts on this, Sara?" "Over to you." "Does anyone have a different view?" Turn-taking keeps meetings alive.',
          'Agreeing in a meeting: "I\'m with you on that." "That aligns with our target." Disagreeing professionally: "I see it differently — may I explain?"',
          'Closing and action points: "Let\'s summarise the action items. Rami will send the draft by Friday." Every meeting ends with decisions + owners + dates.',
          'Rami tip: rehearse one meeting line today — "Shall we move on?" — and say it in your real-life meeting. Professional English is practised, not studied.'
        ],
        examples: [
          {
            en: 'Shall we look at the agenda for today?',
            note: 'Chair opening with a warm suggestion.'
          },
          {
            en: 'What are your thoughts on this proposal, Omar?',
            note: 'Inviting a specific person to speak.'
          },
          {
            en: 'Let\'s agree on the action items before we close.',
            note: 'Leading the meeting to decisions.'
          }
        ],
        words: [
          {
            w: 'agenda',
            ar: 'جدول أعمال',
            ex: 'The agenda has four items.'
          },
          {
            w: 'chair',
            ar: 'يرأس الجلسة',
            ex: 'Who will chair the meeting?'
          },
          {
            w: 'action item',
            ar: 'بند إجرائي',
            ex: 'The action item is assigned to you.'
          },
          {
            w: 'minutes',
            ar: 'محضر اجتماع',
            ex: 'The minutes record every decision.'
          }
        ],
        quiz: [
          {
            q: 'The chair\'s warmest opener is:',
            opts: [
              '"Shall we get started?"',
              '"Start!"',
              '"Begin now."',
              '"You first."'
            ],
            ans: 0,
            why: 'Shall we + suggestion = polite leadership.'
          },
          {
            q: 'To invite ideas, say:',
            opts: [
              '"What are your thoughts?"',
              '"Say something."',
              '"Talk."',
              '"Opinion now."'
            ],
            ans: 0,
            why: 'Open questions invite genuine contribution.'
          },
          {
            q: 'Professional disagreement sounds like:',
            opts: [
              '"I see it differently — may I explain?"',
              '"You are wrong."',
              '"No."',
              '"Impossible."'
            ],
            ans: 0,
            why: 'Name the difference, ask to explain — respect preserved.'
          },
          {
            q: 'A meeting should end with:',
            opts: [
              'action items + owners + dates',
              'an argument',
              'silence',
              'jokes'
            ],
            ans: 0,
            why: 'Closure = clear next steps.'
          }
        ]
      },
      {
        id: 'b2-4-2',
        title: 'Negotiation Language',
        tag: 'speaking',
        icon: 'chat',
        mins: 18,
        xp: 18,
        objective: 'Make offers, push back, and reach agreements with professional phrasing.',
        teach: [
          'Opening a negotiation: "We believe a fair price would be..." "Could we meet somewhere in the middle?" Frame your number as fair, not fixed.',
          'Concessions must trade for value: "If we reduce the price, could you increase the order size?" Never give a concession for free — DNA of negotiation.',
          'Pushing back politely: "That is below our range, I\'m afraid." "We would struggle with that deadline." Honest limits + soft tone = strong position.',
          'Closing the deal: "I think we can agree on this." "Let me confirm the terms and send the contract." Words of commitment finalise negotiation.',
          'Rami tip: rehearse a price negotiation scene out loud — your offer, their objection, your trade. Rehearsal turns nerves into strategy.'
        ],
        examples: [
          {
            en: 'Could we meet somewhere in the middle at $950?',
            note: 'A classic compromise move.'
          },
          {
            en: 'If we accept the shorter timeline, would you include delivery?',
            note: 'Concession traded for value.'
          },
          {
            en: 'That is slightly above our budget, I\'m afraid.',
            note: 'Soft push-back with a real limit.'
          }
        ],
        words: [
          {
            w: 'negotiate',
            ar: 'يتفاوض',
            ex: 'We negotiated a better price.'
          },
          {
            w: 'offer',
            ar: 'عرض',
            ex: 'The offer is valid for a week.'
          },
          {
            w: 'concede',
            ar: 'يتنازل',
            ex: 'Concede only in exchange for value.'
          },
          {
            w: 'agreement',
            ar: 'اتفاق',
            ex: 'The agreement covers delivery too.'
          }
        ],
        quiz: [
          {
            q: 'The smart concession rule is:',
            opts: [
              'trade every concession for value',
              'give everything free',
              'never compromise',
              'hide all limits'
            ],
            ans: 0,
            why: 'Concessions swap for benefits — never giveaways.'
          },
          {
            q: 'A polite push-back is:',
            opts: [
              '"That is beyond our range, I\'m afraid."',
              '"No way."',
              '"Never."',
              '"Forget it."'
            ],
            ans: 0,
            why: 'Firm limit + soft tone = professional refusal.'
          },
          {
            q: '"Could we meet in the middle?" is a move toward:',
            opts: [
              'compromise',
              'war',
              'aggression',
              'silence'
            ],
            ans: 0,
            why: 'Meeting in the middle = finding common ground.'
          },
          {
            q: 'The deal-closing sentence is:',
            opts: [
              '"I think we can agree on this."',
              '"Maybe."',
              '"Let me disappear."',
              'None of the above'
            ],
            ans: 0,
            why: 'Commitment language finalises the agreement.'
          }
        ]
      },
      {
        id: 'b2-4-3',
        title: 'Professional Emails',
        tag: 'writing',
        icon: 'write',
        mins: 18,
        xp: 18,
        objective: 'Write clear, persuasive, professional email correspondence.',
        teach: [
          'Subject lines are headlines: "Proposal Attached – Request for Feedback". A clear subject gets opened; "Hello" does not.',
          'The soft-request line: "I would appreciate your feedback by Friday." "Could you kindly confirm by noon?" Appreciate + kindly = professional polish.',
          'Handle conflict in writing with care: "I understand your concern, and I suggest we..." Never attack — distance the problem from the person.',
          'Email etiquette: one clear ask per email, thanks at the end, signature block: "Best regards, Rami (IELTS Academy)".',
          'Rami tip: write a professional reply (even imaginary) to a difficult message today. Practice = polish.'
        ],
        examples: [
          {
            en: 'Subject: Quarterly Report – Action Required',
            note: 'Subject = headline of the email.'
          },
          {
            en: 'I would appreciate your input by the end of the day.',
            note: 'Appreciate = polite request.'
          },
          {
            en: 'I understand the concern; shall we discuss it briefly tomorrow?',
            note: 'Conflict handled with distance and a solution.'
          }
        ],
        words: [
          {
            w: 'subject line',
            ar: 'سطر الموضوع',
            ex: 'Write a clear subject line.'
          },
          {
            w: 'appreciate',
            ar: 'يقدر/يقدّر',
            ex: 'I appreciate your patience.'
          },
          {
            w: 'kindly',
            ar: 'بلطف/يرجى',
            ex: 'Kindly confirm the timing.'
          },
          {
            w: 'follow-up',
            ar: 'متابعة',
            ex: 'I will send a follow-up next week.'
          }
        ],
        quiz: [
          {
            q: 'The most effective subject line is:',
            opts: [
              '"Proposal Attached – Feedback Needed"',
              '"Hello"',
              '"?"',
              '"Read this"'
            ],
            ans: 0,
            why: 'A subject states the content and the ask.'
          },
          {
            q: 'A polished request uses:',
            opts: [
              '"I would appreciate..."',
              '"I need..."',
              '"Give me..."',
              'All of the above'
            ],
            ans: 0,
            why: 'Appreciate/kindly signal professional polish.'
          },
          {
            q: 'In email conflict, best practice is:',
            opts: [
              'distance the problem from the person',
              'attack directly',
              'ignore the issue',
              'shout'
            ],
            ans: 0,
            why: 'Discuss the issue, not the person — protect the relationship.'
          },
          {
            q: 'One email should contain:',
            opts: [
              'one clear main ask',
              'ten requests',
              'no verbs',
              'only jokes'
            ],
            ans: 0,
            why: 'Clarity = one purpose per message.'
          }
        ]
      },
      {
        id: 'b2-4-4',
        title: 'Formal & Informal Register',
        tag: 'grammar',
        icon: 'write',
        mins: 18,
        xp: 18,
        objective: 'Switch between formal and informal English without tripping.',
        teach: [
          'Register = the level of formality matching the situation. Formal: official reports, academic essays, job letters. Informal: friends, chats, social media. The exam has both (Task 1 letters need an informal choice sometimes!).',
          'Formal signals: no contractions (do not, would like), no slang (request vs ask politely, commence vs start), passive voice, linking devices (however, moreover).',
          'Informal signals: contractions (I\'ll, don\'t), phrasal verbs (work out, give up), idioms, short sentences: "Hey! Can you drop this off?"',
          'Matching mistakes sound like jokes in an essay: "a bunch of issues" in an essay vs "I would be grateful for your consideration" in a text message.',
          'Rami tip: take one idea and write it two ways today — formal for an essay, informal for a friend. Register switching = language adulthood.'
        ],
        examples: [
          {
            en: 'Formal: "The committee has decided to postpone the event."',
            note: 'Passive + no contractions + formal verb.'
          },
          {
            en: 'Informal: "They cancelled the event, sadly."',
            note: 'Active, simple, friendly.'
          },
          {
            en: 'Formal: "Please find the attached file." / Informal: "Here\'s the file!"',
            note: 'The same idea, two registers.'
          }
        ],
        words: [
          {
            w: 'register',
            ar: 'مستوى لغوي',
            ex: 'Choose the register that fits.'
          },
          {
            w: 'formal',
            ar: 'رسمي',
            ex: 'Essays use formal language.'
          },
          {
            w: 'informal',
            ar: 'غير رسمي',
            ex: 'Messages between friends are informal.'
          },
          {
            w: 'contraction',
            ar: 'اختصار (don\'t, I\'ll)',
            ex: 'Formal texts avoid contractions.'
          }
        ],
        quiz: [
          {
            q: 'Formal English usually avoids:',
            opts: [
              'contractions and slang',
              'nouns',
              'verbs',
              'sentences'
            ],
            ans: 0,
            why: 'Contractions and slang mark the informal end.'
          },
          {
            q: 'The formal version of "a bunch of problems" is:',
            opts: [
              '"a number of issues"',
              '"some stuff went wrong"',
              '"lots of trouble"',
              'None of the above'
            ],
            ans: 0,
            why: 'Issue + number = measured formal phrasing.'
          },
          {
            q: 'The informal version of "It was a pleasure to receive your message" is:',
            opts: [
              '"Great to hear from you!"',
              '"Your message received."',
              '"Greetings conveyed."',
              'All of the above'
            ],
            ans: 0,
            why: 'Fun contractions and warmth = informal.'
          },
          {
            q: 'The wrong-register sentence is:',
            opts: [
              '"In an exam, you should not use slang."',
              '"gonna in an essay"',
              '"Essays need structure."',
              'None of the above'
            ],
            ans: 1,
            why: 'Slang like "gonna" breaks formal register.'
          }
        ]
      }
    ]
  },
  {
    id: 'b2-style',
    title: 'Style & Nuance',
    icon: 'spark',
    desc: 'Collocations, phrasal verbs, idioms and exact word choice — the polish of B2.',
    lessons: [
      {
        id: 'b2-5-1',
        title: 'Collocations & Fixed Phrases',
        tag: 'vocab',
        icon: 'vocab',
        mins: 18,
        xp: 18,
        objective: 'Use word pairs that native speakers choose together: make a decision, heavy rain.',
        teach: [
          'Collocations = words that naturally travel together: heavy rain (not strong rain), make a decision (not do a decision), do business, take a break, pay attention. Mixing them marks you instantly as a learner.',
          'The golden verb pairs: make (a decision, a mistake, progress, an effort), do (business, homework, harm), take (a break, a photo, responsibility, time), have (a chat, a doubt, a point).',
          'Adjective+noun pairs: strong coffee, fast food, high cost, key factor, great success, deep sleep. One pair = instant naturalness.',
          'The exam reward: "traffic congestion" beats "traffic"; "public transport" beats "bus". Two-word collocations are the Band 6→7 vocabulary lever.',
          'Rami tip: build a "pair page": every new noun you learn, ask which verb and adjective it pairs with. "Decision: make a decision, key decision."'
        ],
        examples: [
          {
            en: 'We made a quick decision at the meeting.',
            note: 'Make + decision — the fixed pair.'
          },
          {
            en: 'Heavy traffic delayed the bus.',
            note: 'Heavy + traffic, never "strong traffic".'
          },
          {
            en: 'She took a short break between tasks.',
            note: 'Take + break — the natural verb.'
          }
        ],
        words: [
          {
            w: 'collocation',
            ar: 'تلازم لفظي',
            ex: 'Collocations are word partnerships.'
          },
          {
            w: 'make a decision',
            ar: 'يتخذ قراراً',
            ex: 'I made the final decision yesterday.'
          },
          {
            w: 'heavy traffic',
            ar: 'ازدحام مروري',
            ex: 'The bridge suffers heavy traffic.'
          },
          {
            w: 'take a break',
            ar: 'يأخذ استراحة',
            ex: 'Let\'s take a short break.'
          }
        ],
        quiz: [
          {
            q: 'The correct collocation is:',
            opts: [
              '"make a decision"',
              '"do a decision"',
              '"create a decision"',
              '"build a decision"'
            ],
            ans: 0,
            why: 'Make + decision is the fixed pair.'
          },
          {
            q: 'The natural weather word before "rain" is:',
            opts: [
              'heavy',
              'strong',
              'big',
              'tall'
            ],
            ans: 0,
            why: 'Heavy rain is the collocation.'
          },
          {
            q: 'Which is a fixed collocation?',
            opts: [
              'take a break',
              'take a table',
              'take a moon',
              'All of the above'
            ],
            ans: 0,
            why: 'Take + break rides together naturally.'
          },
          {
            q: 'The exam upgrade of "traffic" is:',
            opts: [
              '"traffic congestion"',
              '"traffic stuff"',
              '"car thing"',
              '"drive"'
            ],
            ans: 0,
            why: 'Two-word collocations carry more weight in IELTS.'
          }
        ]
      },
      {
        id: 'b2-5-2',
        title: 'Phrasal Verbs (Advanced)',
        tag: 'vocab',
        icon: 'vocab',
        mins: 18,
        xp: 18,
        objective: 'Understand and use high-value phrasal verbs: carry out, deal with, put off.',
        teach: [
          'Phrasal verbs = verb + particle with a new meaning: carry out (perform), deal with (manage), put off (postpone), look into (investigate), come up with (produce an idea).',
          'The exam-safe ones for writing: carry out research, point out (mention), figure out (understand), set up (establish), turn out (result). In speaking they sound native.',
          'Separable vs inseparable: "look the word up" AND "look up the word" both work with object pronouns: "look it up" — the pronoun MUST go in the middle.',
          'Formal vs informal: phrasal verbs are often informal. In essays, translate: put off → postpone, carry out → conduct, come up with → devise. The register decides.',
          'Rami tip: keep a phrasal shelf: 10 verbs × 2 meanings each, reviewed weekly. "Put off = postpone" and "put off = discourage" — same pair, two lives.'
        ],
        examples: [
          {
            en: 'The team carried out a thorough investigation.',
            note: 'Carry out = conduct/perform.'
          },
          {
            en: 'We need to deal with the data carefully.',
            note: 'Deal with = manage/handle.'
          },
          {
            en: 'They put off the meeting until Friday.',
            note: 'Put off = postpone.'
          }
        ],
        words: [
          {
            w: 'carry out',
            ar: 'ينفذ',
            ex: 'We carried out a survey.'
          },
          {
            w: 'deal with',
            ar: 'يعالج',
            ex: 'She deals with complaints daily.'
          },
          {
            w: 'put off',
            ar: 'يؤجل',
            ex: 'Do not put off your practice.'
          },
          {
            w: 'come up with',
            ar: 'يبتكر',
            ex: 'He came up with a clever solution.'
          }
        ],
        quiz: [
          {
            q: '"Carry out a survey" means:',
            opts: [
              'conduct a survey',
              'cancel a survey',
              'carry a paper',
              'None of the above'
            ],
            ans: 0,
            why: 'Carry out = conduct/perform.'
          },
          {
            q: 'The pronoun comes in the middle: correct is:',
            opts: [
              '"look it up"',
              '"look up it"',
              '"look it up up"',
              'All of the above'
            ],
            ans: 0,
            why: 'Object pronouns sit between verb and particle.'
          },
          {
            q: 'The formal writing translation of "put off" is:',
            opts: [
              'postpone',
              'delay-check',
              'drop',
              'None of the above'
            ],
            ans: 0,
            why: 'Academic register prefers postpone.'
          },
          {
            q: 'In an essay, prefer:',
            opts: [
              '"conduct research" over "carry out research"',
              '"carry out research" over "conduct research"',
              'either equally',
              'All of the above'
            ],
            ans: 0,
            why: 'Conduct fits the academic register more formally.'
          }
        ]
      },
      {
        id: 'b2-5-3',
        title: 'Idioms That Work in the Exam',
        tag: 'vocab',
        icon: 'idiom',
        mins: 18,
        xp: 18,
        objective: 'Use a small set of exam-safe idioms — not every idiom, just the right ones.',
        teach: [
          'The exam-safe five: the tip of the iceberg (a small visible part of a big issue), a double-edged sword (something with benefits and risks), on the same page (agreeing), break the ice (start conversation), cost an arm and a leg (very expensive).',
          'Use idioms SPARINGLY: one in Speaking Part 3 or Writing Task 2 is enough. Ten forced idioms in one essay = cliché noise.',
          'Fit the meaning exactly: "the tip of the iceberg" for a big hidden problem; "a double-edged sword" for dual-effect topics (technology, tourism).',
          'In writing, weave idioms into the argument: "Social media is a double-edged sword: it unites people yet fragments attention." The idiom carries the claim.',
          'Rami tip: master five idioms at a time — meaning, example, and your own sentence. "This exam feels like the tip of the iceberg for my career."'
        ],
        examples: [
          {
            en: 'The rising prices are just the tip of the iceberg.',
            note: 'A visible part of a larger hidden problem.'
          },
          {
            en: 'Artificial intelligence is a double-edged sword.',
            note: 'Good and bad at once.'
          },
          {
            en: 'Meeting new people helped break the ice.',
            note: 'Break the ice = start a conversation easily.'
          }
        ],
        words: [
          {
            w: 'iceberg',
            ar: 'جبل جليدي',
            ex: 'The scandal was the tip of the iceberg.'
          },
          {
            w: 'double-edged',
            ar: 'ذو حدين',
            ex: 'Fast food is a double-edged sword.'
          },
          {
            w: 'break the ice',
            ar: 'يكسر حاجز الجمود',
            ex: 'A smile breaks the ice quickly.'
          },
          {
            w: 'appropriate',
            ar: 'مناسب',
            ex: 'Use each idiom in the right context.'
          }
        ],
        quiz: [
          {
            q: '"A double-edged sword" best fits:',
            opts: [
              'a topic with benefits and risks',
              'a cheap product',
              'a happy day',
              'None of the above'
            ],
            ans: 0,
            why: 'The idiom = two sides, good and bad.'
          },
          {
            q: '"The tip of the iceberg" means:',
            opts: [
              'the visible part of a much bigger problem',
              'a delicious snack',
              'the beginning of a list',
              'All of the above'
            ],
            ans: 0,
            why: 'It signals hidden depth below the surface.'
          },
          {
            q: 'The correct number of idioms per essay is:',
            opts: [
              'one or two, well-placed',
              'ten to impress',
              'zero always',
              'fifty'
            ],
            ans: 0,
            why: 'Sparse and precise beats a cliché flood.'
          },
          {
            q: 'The best usage is:',
            opts: [
              '"Social media is a double-edged sword: it connects yet isolates."',
              '"This test is a double-edged sword because it is a test."',
              'None of the above',
              'All of the above'
            ],
            ans: 0,
            why: 'The idiom carries a real claim about the topic.'
          }
        ]
      },
      {
        id: 'b2-5-4',
        title: 'Nuanced Word Choice',
        tag: 'vocab',
        icon: 'grammar',
        mins: 18,
        xp: 18,
        objective: 'Choose exact words over vague ones and let register raise your score.',
        teach: [
          'The vague-word trap: good, bad, big, nice, things, want. Upgrade: good → beneficial/substantial, bad → detrimental/harmful, big → significant, nice → pleasant/delightful, things → factors/issues/matters.',
          'Nouns name precisely: "a thing that increases" → "an incentive"; "the thing that stops progress" → "a barrier". The exact noun replaces the lazy "thing".',
          'Choose verbs of strength: increases → rises/soars/expands; decreases → declines/contracts/drops; causes → triggers/generates. In Task 1 every verb should be precise.',
          'Context rules: "cheap" (informal) vs "affordable" (positive) vs "of low quality" (negative). The nuance changes the tone of the whole sentence.',
          'Rami tip: in your next draft, circle every vague word and replace one with the exact word. "Good for health" → "beneficial to cardiovascular health".'
        ],
        examples: [
          {
            en: 'The intervention produced a substantial benefit.',
            note: 'Substantial beats "good".'
          },
          {
            en: 'Rising demand triggered higher prices.',
            note: 'Triggered = a precise causal verb.'
          },
          {
            en: 'The campaign faced a major barrier: funding.',
            note: 'Barrier = the exact noun for a block.'
          }
        ],
        words: [
          {
            w: 'beneficial',
            ar: 'مفيد',
            ex: 'Exercise is beneficial to memory.'
          },
          {
            w: 'substantial',
            ar: 'كبير/جوهري',
            ex: 'We saw substantial progress.'
          },
          {
            w: 'barrier',
            ar: 'عائق',
            ex: 'Cost is a real barrier to access.'
          },
          {
            w: 'trigger',
            ar: 'يُطلق/يسبب',
            ex: 'Stress can trigger poor decisions.'
          }
        ],
        quiz: [
          {
            q: 'The upgraded version of "good" is:',
            opts: [
              'beneficial',
              'gooder',
              'nice',
              'fine'
            ],
            ans: 0,
            why: 'Beneficial names the positive value precisely.'
          },
          {
            q: 'The exact noun for "a thing that blocks progress" is:',
            opts: [
              'a barrier',
              'a stuff',
              'a blocky',
              'None of the above'
            ],
            ans: 0,
            why: 'Barrier = the specific word.'
          },
          {
            q: 'In Task 1, "went up" should be:',
            opts: [
              'rose / increased',
              'went up up',
              'climbed up up',
              'All of the above'
            ],
            ans: 0,
            why: 'Precise trend verbs: rise, increase, soar.'
          },
          {
            q: '"Affordable" has a ___ tone compared to "cheap".',
            opts: [
              'more positive',
              'more negative',
              'identical',
              'None of the above'
            ],
            ans: 0,
            why: 'Affordable = positive value; cheap can seem low quality.'
          }
        ]
      }
    ]
  }
];
