/* ============================================================
   Rami Academy — C1 Advanced curriculum (5 units × 4 lessons)
   Every lesson: Rami teaches (teach[]), examples, words, quiz.
   ============================================================ */
const ACADEMY_UNITS_C1 = [
  {
    id: 'c1-precision',
    title: 'Precision Grammar',
    icon: 'grammar',
    desc: 'The advanced machinery of English: subjunctives, clefts, causatives, ellipsis.',
    lessons: [
      {
        id: 'c1-1-1',
        title: 'Subjunctive & Hypotheticals',
        tag: 'grammar',
        icon: 'grammar',
        mins: 20,
        xp: 20,
        objective: 'Use the subjunctive after recommend/insist/suggest and hypothetical past forms.',
        teach: [
          'The present subjunctive = the base verb after demand, recommend, insist, suggest, propose: "I recommend that she study abroad." (NOT studies). The recommendation moves the verb to base form.',
          'It appears in formal writing and reporting: "The committee proposed that the policy be reviewed." Passive subjunctive: be + past participle.',
          'Hypothetical past forms: "If it were not for your help, I would be lost." Were-not-for = a formal hypothetical: the whole situation rests on one condition.',
          'The examiner\'s ear catches: "I suggest that he contact the office" (correct) vs "I suggest that he contacts" (wrong). One base verb = the mark of control.',
          'Rami tip: write three sentences using recommend/suggest + base verb in formal contexts: "Officials suggested that taxes be lowered." Formal grammar needs practice voice.'
        ],
        examples: [
          {
            en: 'I recommend that she apply immediately.',
            note: 'Recommend + base verb apply (no -s).'
          },
          {
            en: 'The report suggested that the strategy be revised.',
            note: 'Suggested + be + past participle.'
          },
          {
            en: 'If it were not for social media, the protest might never have formed.',
            note: 'Were-not-for = formal hypothetical foundation.'
          }
        ],
        words: [
          {
            w: 'subjunctive',
            ar: 'صيغة افتراضية',
            ex: 'The subjunctive uses the base verb.'
          },
          {
            w: 'recommend',
            ar: 'يوصي',
            ex: 'Experts recommend that we act now.'
          },
          {
            w: 'insist',
            ar: 'يصر',
            ex: 'She insisted that he stay.'
          },
          {
            w: 'formal context',
            ar: 'سياق رسمي',
            ex: 'The subjunctive thrives in formal writing.'
          }
        ],
        quiz: [
          {
            q: 'The correct subjunctive is:',
            opts: [
              '"I suggest that she study hard."',
              '"I suggest that she studies hard."',
              '"I suggest that she studying hard."',
              'All of the above'
            ],
            ans: 0,
            why: 'Suggest + base verb: study, not studies.'
          },
          {
            q: 'The formal passive subjunctive is:',
            opts: [
              '"that the report be reviewed"',
              '"that the report is reviewed"',
              '"that report reviews"',
              'None of the above'
            ],
            ans: 0,
            why: 'Propose that + be + past participle.'
          },
          {
            q: '"If it were not for you, I ______ lost."',
            opts: [
              'would be',
              'am',
              'was',
              'All of the above'
            ],
            ans: 0,
            why: 'Were-not-for = conditional: would + base.'
          },
          {
            q: 'The subjunctive most lives in:',
            opts: [
              'formal writing and reporting',
              'text messages',
              'sports commentary',
              'None of the above'
            ],
            ans: 0,
            why: 'Academic/reporting contexts keep it alive.'
          }
        ]
      },
      {
        id: 'c1-1-2',
        title: 'Cleft Sentences & Focus',
        tag: 'grammar',
        icon: 'grammar',
        mins: 20,
        xp: 20,
        objective: 'Put emphasis where you want it with It was... that / What... is.',
        teach: [
          'Cleft sentences rearrange to FOCUS one piece: "It was the teacher who changed my life." The emphasis rests on the teacher — everything else slides to the edge.',
          'The building blocks: "It is/was + focused item + who/that + rest." "What ... is/was ...": "What impressed me most was her honesty."',
          'Use them for dramatic clarity in speaking: "What I love about reading is the escape it gives me." The "what + is" frame automatically focuses.',
          'In writing, clefts add rhetorical power: "It is not the cost that deters students — it is the fear." Contrast through clefts = Band 8 style.',
          'Rami tip: take a flat sentence and make two clefts: "She saved the day." → "It was she who saved the day." / "What she did was save the day."'
        ],
        examples: [
          {
            en: 'It was Rami who suggested the idea.',
            note: 'Focus on Rami: It was + who.'
          },
          {
            en: 'What matters most is consistency.',
            note: 'What + is = focused subject.'
          },
          {
            en: 'It is the cost, not the quality, that worries students.',
            note: 'Contrast inside a cleft = rhetorical force.'
          }
        ],
        words: [
          {
            w: 'cleft',
            ar: 'جملة توكيدية',
            ex: 'Clefts put the focus in the right slot.'
          },
          {
            w: 'emphasis',
            ar: 'توكيد',
            ex: 'Use clefts for strong emphasis.'
          },
          {
            w: 'focus',
            ar: 'تركيز/محور',
            ex: 'What draws focus is the conclusion.'
          },
          {
            w: 'rhetorical',
            ar: 'بلاغي',
            ex: 'Clefts give rhetorical power.'
          }
        ],
        quiz: [
          {
            q: 'The cleft sentence is:',
            opts: [
              '"It was the exam that terrified me."',
              '"The exam terrified me."',
              '"Terror the exam."',
              'All of the above'
            ],
            ans: 0,
            why: 'It was + focus + that = a cleft.'
          },
          {
            q: '"What ______ me most was the honesty."',
            opts: [
              'impressed',
              'impress',
              'impressing',
              'None of the above'
            ],
            ans: 0,
            why: 'What + verb past + was = the frame.'
          },
          {
            q: 'Clefts are powerful for:',
            opts: [
              'choosing where the emphasis falls',
              'writing shorter',
              'avoiding verbs',
              'All of the above'
            ],
            ans: 0,
            why: 'Focus control is their whole purpose.'
          },
          {
            q: 'The contrast cleft is:',
            opts: [
              '"It is cost, not quality, that deters buyers."',
              '"Cost deters buyers."',
              'None of the above',
              'All of the above'
            ],
            ans: 0,
            why: 'Cleft + not = a contrasting emphasis.'
          }
        ]
      },
      {
        id: 'c1-1-3',
        title: 'Advanced Passives & Causatives',
        tag: 'grammar',
        icon: 'grammar',
        mins: 20,
        xp: 20,
        objective: 'Handle get/have something done and impersonal passive reporting.',
        teach: [
          'The causative: have/get + object + past participle = arrange for something: "I had my car serviced." You did not fix it — you arranged it.',
          'Causative details: "We had the office repainted." "She got her hair cut." The -done form hides the doer, exposing the shared action.',
          'Impersonal passive for academic reporting: "It is believed that...", "It is said that...", "The study is thought to..." Makes your source sound objective and formal.',
          'The exam link: citing research: "A vaccine is being developed" (passive) + "Scientists had the trial extended" (causative motive). Both score in Task 2.',
          'Rami tip: audit your week: "I had my laptop repaired. I got my hair cut." The causative is your own diary.'
        ],
        examples: [
          {
            en: 'I had my laptop repaired last week.',
            note: 'Had + object + past participle.'
          },
          {
            en: 'She is having the new office decorated.',
            note: 'Having + object being worked on.'
          },
          {
            en: 'It is believed that the economy will recover.',
            note: 'Impersonal passive = formal reporting.'
          }
        ],
        words: [
          {
            w: 'causative',
            ar: 'سببية (أمر بفعل)',
            ex: 'The causative arranges an action.'
          },
          {
            w: 'served',
            ar: 'صيانة',
            ex: 'I had the car serviced.'
          },
          {
            w: 'impersonal',
            ar: 'غير شخصي',
            ex: 'It is said = impersonal passive.'
          },
          {
            w: 'arrange',
            ar: 'يرتب',
            ex: 'He arranged for the roof to be fixed.'
          }
        ],
        quiz: [
          {
            q: 'The causative is:',
            opts: [
              '"I had my watch repaired."',
              '"I repaired my watch."',
              '"I will repair my watch."',
              'None of the above'
            ],
            ans: 0,
            why: 'Had + object + past participle = arranged action.'
          },
          {
            q: 'The impersonal passive is:',
            opts: [
              '"It is believed that..."',
              '"I believe that..."',
              '"Everyone believes..."',
              'All of the above'
            ],
            ans: 0,
            why: 'It + is + participle = objective reporting.'
          },
          {
            q: 'Correct causative: "She ______ her photos printed."',
            opts: [
              'had',
              'has to',
              'is',
              'None of the above'
            ],
            ans: 0,
            why: 'Had + object + printed.'
          },
          {
            q: 'The academic advantage of "It is thought that..." is:',
            opts: [
              'objectivity and formality',
              'sounding angry',
              'shorter',
              'All of the above'
            ],
            ans: 0,
            why: 'Impersonal passives distance the claim from the writer.'
          }
        ]
      },
      {
        id: 'c1-1-4',
        title: 'Ellipsis & Substitution',
        tag: 'grammar',
        icon: 'grammar',
        mins: 20,
        xp: 20,
        objective: 'Leave out repeated words (ellipsis) and replace them (substitution) for native flow.',
        teach: [
          'Ellipsis = dropping repeated words when meaning survives: "He speaks French, and she ___ (speaks French) too." The listener fills the gap.',
          'In lists and pairs: "I ordered tea; she ___ coffee." The second verb vanishes — light, native rhythm.',
          'Substitution = replacing nouns with one/ones, do/does/did, so/not: "I need a new pen; the old ___ (one) is broken." "She said she would help, and she did."',
          'The exam payoff: ellipsis and substitution stop repetition and raise cohesion: "Some prefer cities. Others (prefer) ___ the countryside."',
          'Rami tip: in your writing, find repeated phrases and cut or replace the second occurrence: "She likes jazz. I do too." Compression = sophistication.'
        ],
        examples: [
          {
            en: 'I bought the black phone; he bought the silver one.',
            note: 'One replaces "phone".'
          },
          {
            en: 'She promised to call — and she did.',
            note: 'Did replaces the whole promise action.'
          },
          {
            en: 'They enjoyed the trip; we did too.',
            note: 'Did too = substitution of the verb phrase.'
          }
        ],
        words: [
          {
            w: 'ellipsis',
            ar: 'حذف',
            ex: 'Ellipsis drops what is repetitive.'
          },
          {
            w: 'substitution',
            ar: 'استبدال',
            ex: 'One/ones substitute nouns.'
          },
          {
            w: 'compress',
            ar: 'يختصر',
            ex: 'Compress repeated phrases naturally.'
          },
          {
            w: 'flow',
            ar: 'تدفق',
            ex: 'Ellipsis improves the sentence flow.'
          }
        ],
        quiz: [
          {
            q: 'The substitution in "the silver one" replaces:',
            opts: [
              'the word "phone"',
              'the word "silver"',
              'nothing',
              'None of the above'
            ],
            ans: 0,
            why: 'One stands in for the previously mentioned noun.'
          },
          {
            q: 'Ellipsis is used to:',
            opts: [
              'drop repeated words when the meaning stays',
              'add more words',
              'confuse the reader',
              'All of the above'
            ],
            ans: 0,
            why: 'Compression without losing meaning is the goal.'
          },
          {
            q: '"She promised to help, and she did" — "did" substitutes:',
            opts: [
              'the whole helping action',
              'a noun',
              'an adjective',
              'None of the above'
            ],
            ans: 0,
            why: 'Do/does/did replace verb phrases.'
          },
          {
            q: 'The exam benefit of ellipsis is:',
            opts: [
              'less repetition and better cohesion',
              'longer essays',
              'more mistakes',
              'All of the above'
            ],
            ans: 0,
            why: 'Varied, non-repetitive writing scores cohesion.'
          }
        ]
      }
    ]
  },
  {
    id: 'c1-critical',
    title: 'Critical Analysis',
    icon: 'evaluate',
    desc: 'Evaluate evidence, infer meaning, describe data and synthesise arguments.',
    lessons: [
      {
        id: 'c1-2-1',
        title: 'Evaluating Evidence',
        tag: 'reading',
        icon: 'read',
        mins: 20,
        xp: 20,
        objective: 'Judge the strength and relevance of evidence in any argument.',
        teach: [
          'Evidence quality has four tests: relevance (does it touch the claim?), recency (is it up to date?), reliability (is the source credible?), representativeness (is the sample enough?).',
          'Distinguish correlation from causation: "Ice cream sales and drownings both rise in summer" — linked, not caused. The exam loves this precise distinction.',
          'Watch the data source: a study funded by the product maker carries bias risk; a peer-reviewed journal does not. The WHO/UN data vs a company blog = clear priority.',
          'Quantified evidence beats anecdotes: "58% of students reported..." is strong; "I know a student who..." is not. Both can appear — rank them.',
          'Rami tip: score the next three claims you read with the four tests in your head. One minute per article sharpens the brain.'
        ],
        examples: [
          {
            en: 'The study is recent (2023), peer-reviewed, and sampled 5,000 people.',
            note: 'Recency + reliability + representativeness = strong.'
          },
          {
            en: 'Citing higher ice-cream sales as the "cause" of drowning confuses correlation with causation.',
            note: 'The classic logic trap.'
          },
          {
            en: 'A company-funded study found its own product "highly effective".',
            note: 'Funding bias = lower reliability.'
          }
        ],
        words: [
          {
            w: 'reliable',
            ar: 'موثوق',
            ex: 'Peer-reviewed sources are more reliable.'
          },
          {
            w: 'representative',
            ar: 'تمثيلي',
            ex: 'A representative sample matters.'
          },
          {
            w: 'correlation',
            ar: 'ارتباط',
            ex: 'Correlation is not causation.'
          },
          {
            w: 'credible',
            ar: 'جدير بالثقة',
            ex: 'The source is credible and current.'
          }
        ],
        quiz: [
          {
            q: 'The strongest evidence is:',
            opts: [
              'recent, peer-reviewed, representative',
              'old and one-person',
              'funded by the claimant',
              'None of the above'
            ],
            ans: 0,
            why: 'Fresh, credible, and well-sampled = trustworthy.'
          },
          {
            q: '"Ice cream sales rise with drownings" is:',
            opts: [
              'correlation, not proof of cause',
              'proof that ice cream causes drownings',
              'irrelevant',
              'All of the above'
            ],
            ans: 0,
            why: 'Linked patterns do not prove one causes the other.'
          },
          {
            q: 'A company-funded study about its own product carries:',
            opts: [
              'a bias risk',
              'no risk',
              'perfect objectivity',
              'None of the above'
            ],
            ans: 0,
            why: 'The funder\'s interest may shape the findings.'
          },
          {
            q: 'Compared to an anecdote, quantified data from a study is:',
            opts: [
              'stronger evidence',
              'weaker',
              'the same',
              'All of the above'
            ],
            ans: 0,
            why: 'Numbers from a proper sample generalise better.'
          }
        ]
      },
      {
        id: 'c1-2-2',
        title: 'Inferring & Implicature',
        tag: 'reading',
        icon: 'read',
        mins: 20,
        xp: 20,
        objective: 'Read between the lines: draw conclusions that the text implies but never states.',
        teach: [
          'Inference = understanding what is implied, not written: "The queue stretched around the block" implies extreme popularity — without using the word.',
          'The examiner\'s "implied meaning" task: base every inference on textual evidence. An inference without a textual anchor is a guess; cite the phrase that lets you infer.',
          'Implicature runs on shared context: "The meeting went over time, so we missed lunch" implies annoyance about the delay — the emotion is not stated.',
          'Negative inference: "He said he would help, but not tonight" implies the speaker suspects hesitation — the "but" carries unspoken doubt.',
          'Rami tip: after each passage, ask: "What does the writer BELIEVE but never says?" The unspoken belief is the inference question.'
        ],
        examples: [
          {
            en: '"The café was packed at noon" implies it is very popular.',
            note: 'The evidence: packed. The inference: popularity.'
          },
          {
            en: '"The proposals kept changing" implies weak planning.',
            note: 'Changes imply the lack of a stable plan.'
          },
          {
            en: '"She smiled, but her eyes were tired" implies hidden exhaustion.',
            note: 'Contrast implies the unstated feeling.'
          }
        ],
        words: [
          {
            w: 'infer',
            ar: 'يستنتج',
            ex: 'Readers infer what is implied.'
          },
          {
            w: 'imply',
            ar: 'يومئ/إيحاء',
            ex: 'The tone implies deeper doubt.'
          },
          {
            w: 'context',
            ar: 'سياق',
            ex: 'Context carries the implicature.'
          },
          {
            w: 'indirect',
            ar: 'غير مباشر',
            ex: 'The message is indirect but clear.'
          }
        ],
        quiz: [
          {
            q: 'Inference is:',
            opts: [
              'meaning implied but not stated',
              'the literal dictionary meaning',
              'a new word',
              'a fact'
            ],
            ans: 0,
            why: 'Inference reads the unspoken implication.'
          },
          {
            q: 'A good inference must be:',
            opts: [
              'anchored in the text',
              'a wild guess',
              'always negative',
              'None of the above'
            ],
            ans: 0,
            why: 'Evidence-based inference, never guessing.'
          },
          {
            q: '"The room was eerily quiet" implies:',
            opts: [
              'a tense or unusual atmosphere',
              'a fun party',
              'a classroom',
              'All of the above'
            ],
            ans: 0,
            why: '"Eerily" carries unease — the implied mood.'
          },
          {
            q: '"He agreed, but with hesitation" implies:',
            opts: [
              'hidden doubt',
              'total confidence',
              'anger only',
              'None of the above'
            ],
            ans: 0,
            why: 'Hesitation after agreement hints at doubt.'
          }
        ]
      },
      {
        id: 'c1-2-3',
        title: 'Describing Data & Trends',
        tag: 'writing',
        icon: 'write',
        mins: 20,
        xp: 20,
        objective: 'Write accurate, fluent descriptions of charts and data for Task 1.',
        teach: [
          'The four data moves: overall trend (overview), the peak and the low point, the rate of change (sharp/steady/gradual), and the comparisons between lines.',
          'Trend verbs with precision: rise, increase, climb, soar (fast up); fall, decline, drop, plunge (fast down); remain stable, fluctuate. Match speed to the actual data.',
          'Prepositions of change: increased BY 20% (amount), increased TO 50% (final level), increased FROM 30% TO 50% (range), increased dramatically/steadily (speed).',
          'The overview rule: one sentence summing the biggest picture: "Overall, renewable energy rose steadily while fossil fuels declined." Put it near the start — the fastest band-reward.',
          'Rami tip: for every chart, write the overview FIRST, then the details. Overview-first writers score cohesion instantly.'
        ],
        examples: [
          {
            en: 'Overall, internet usage rose steadily across all age groups.',
            note: 'The overview = the broadest truth.'
          },
          {
            en: 'Sales increased sharply from 20% to 58% between 2010 and 2020.',
            note: 'from X to Y + the speed (sharply).'
          },
          {
            en: 'Unemployment remained stable at 5% for most of the decade.',
            note: 'Remain stable + the exact level.'
          }
        ],
        words: [
          {
            w: 'overview',
            ar: 'نظرة عامة',
            ex: 'Write the overview before the details.'
          },
          {
            w: 'steady',
            ar: 'ثابت',
            ex: 'The line rose steadily.'
          },
          {
            w: 'fluctuate',
            ar: 'يتذبذب',
            ex: 'Prices fluctuated around 10%.'
          },
          {
            w: 'peak',
            ar: 'ذروة',
            ex: 'The peak reached 90% in 2018.'
          }
        ],
        quiz: [
          {
            q: 'The biggest band-reward sentence in Task 1 is:',
            opts: [
              'the overview of the main trend',
              'the first punctuation',
              'the bibliography',
              'All of the above'
            ],
            ans: 0,
            why: 'A clear overview scores task achievement instantly.'
          },
          {
            q: '"Increased BY 20%" means:',
            opts: [
              'the amount of increase',
              'the final value',
              'the start value',
              'None of the above'
            ],
            ans: 0,
            why: 'By = the size of the change.'
          },
          {
            q: 'The precise verb for a fast rise is:',
            opts: [
              'soar',
              'hover',
              'drift',
              'creep'
            ],
            ans: 0,
            why: 'Soar = a sharp, dramatic rise.'
          },
          {
            q: 'Correct: "The temperature ______ between 20 and 30."',
            opts: [
              'fluctuated',
              'soared',
              'remained',
              'All of the above'
            ],
            ans: 0,
            why: 'Fluctuate describes movement within a range.'
          }
        ]
      },
      {
        id: 'c1-2-4',
        title: 'Synthesising Arguments',
        tag: 'writing',
        icon: 'write',
        mins: 20,
        xp: 20,
        objective: 'Combine sources and viewpoints into one coherent argument.',
        teach: [
          'Synthesis = weaving multiple viewpoints into a NEW whole: source A (benefits) + source B (risks) + YOUR judgement = one position. Not a list — a fabric.',
          'The synthesis shape: their view + your view + your reason + downstream implication. "While economists emphasise efficiency, sociologists warn of inequality; I would argue the answer is targeted regulation."',
          'Synthesis verbs: "combining the evidence suggests...", "taken together, these studies indicate..." They signal that you SEE the whole picture.',
          'Avoid the summary trap: synthesis is NOT repeating sources one by one. It actively overlaps, contrasts, and judges them.',
          'Rami tip: for your next essay, force the sentence "While X argues..., Y warns..., overall I would say..." Synthesis = the highest essay tier.'
        ],
        examples: [
          {
            en: 'While economists stress growth, sociologists caution about inequality.',
            note: 'Two sources, different lenses, together.'
          },
          {
            en: 'Taken together, the studies indicate that policy must act on both fronts.',
            note: 'Synthesis + judgement.'
          },
          {
            en: 'The evidence on both sides points to a balanced, regulated approach.',
            note: 'The fabric of the final position.'
          }
        ],
        words: [
          {
            w: 'synthesise',
            ar: 'يولّف',
            ex: 'Synthesise the sources into one argument.'
          },
          {
            w: 'viewpoint',
            ar: 'وجهة نظر',
            ex: 'Each viewpoint adds a piece.'
          },
          {
            w: 'combining',
            ar: 'جمع',
            ex: 'Combining the data reveals the pattern.'
          },
          {
            w: 'judge',
            ar: 'يحكم',
            ex: 'Your judgement completes the synthesis.'
          }
        ],
        quiz: [
          {
            q: 'Synthesis is:',
            opts: [
              'weaving sources into one new argument',
              'copying sources',
              'listing facts',
              'None of the above'
            ],
            ans: 0,
            why: 'It combines and judges, never simply repeats.'
          },
          {
            q: 'The synthesis sentence that signals the whole picture is:',
            opts: [
              '"Taken together, these studies indicate..."',
              '"Source A says..."',
              '"Source B says..."',
              'All of the above'
            ],
            ans: 0,
            why: 'Taken together marks the judgement across sources.'
          },
          {
            q: 'To avoid the summary trap:',
            opts: [
              'actively overlap, contrast and judge the views',
              'repeat them one by one',
              'ignore half',
              'None of the above'
            ],
            ans: 0,
            why: 'Synthesis = active weighing, not passive listing.'
          },
          {
            q: 'The strongest synthesis sentence is:',
            opts: [
              '"While economists stress growth, sociologists warn of inequality, so targeted policy is needed."',
              '"Economists say growth. Sociologists say inequality."',
              'All of the above',
              'None of the above'
            ],
            ans: 0,
            why: 'Contrast + judgement = one fabric.'
          }
        ]
      }
    ]
  },
  {
    id: 'c1-advanced-w',
    title: 'Advanced Writing',
    icon: 'write',
    desc: 'Reports, synthesis essays, academic register and referencing — the writing at C1.',
    lessons: [
      {
        id: 'c1-3-1',
        title: 'Writing Formal Reports',
        tag: 'writing',
        icon: 'write',
        mins: 20,
        xp: 20,
        objective: 'Structure and phrase professional reports with precision.',
        teach: [
          'Report anatomy for IELTS Task 1: introductory paraphrase → overview → detail paragraphs (grouped logically) → comparisons. Never invent data opinions.',
          'Language of reports is objective: "The data indicate", "A clear correlation appears", "The figures suggest". No "I think" in a report — the data speaks.',
          'Group logically: by time (early vs late period), by category (transport vs housing), or by trend (rising vs falling) — grouping IS the structure.',
          'Compare with solutions: "While X rose steadily, Y fluctuated sharply." The comparison sentence is a Task 1 signature.',
          'Rami tip: for every report, write the overview and ONE comparison sentence immediately. The rest of the details plug around them.'
        ],
        examples: [
          {
            en: 'The data indicate a steady rise in cycling over the period.',
            note: 'Objective report verb: indicate.'
          },
          {
            en: 'While bus use declined, private car use soared.',
            note: 'The comparison sentence.'
          },
          {
            en: 'Peak levels reached 40% in 2020 before easing.',
            note: 'Peak + time + easing = precise reporting.'
          }
        ],
        words: [
          {
            w: 'objective',
            ar: 'موضوعي',
            ex: 'Reports stay objective.'
          },
          {
            w: 'comparison',
            ar: 'مقارنة',
            ex: 'The comparison highlights the differences.'
          },
          {
            w: 'indicate',
            ar: 'يشير',
            ex: 'The figures indicate a shift.'
          },
          {
            w: 'trend',
            ar: 'اتجاه',
            ex: 'The trend turns upwards.'
          }
        ],
        quiz: [
          {
            q: 'A report should express:',
            opts: [
              'objective data, not personal opinion',
              '"I think" everywhere',
              'poetry',
              'All of the above'
            ],
            ans: 0,
            why: 'The data speaks — the writer reports.'
          },
          {
            q: 'The best grouping strategy is:',
            opts: [
              'by time, category or trend',
              'random order',
              'alphabet',
              'None of the above'
            ],
            ans: 0,
            why: 'Logical grouping is the report\'s structure.'
          },
          {
            q: 'The comparison sentence uses:',
            opts: [
              '"While X rose, Y declined."',
              '"X big, Y small."',
              '"Stuff went up."',
              'All of the above'
            ],
            ans: 0,
            why: 'While + contrast = the Task 1 signature.'
          },
          {
            q: 'Correct report wording:',
            opts: [
              '"The figures suggest a gradual fall."',
              '"I think it fell."',
              '"Numbers kinda down."',
              'None of the above'
            ],
            ans: 0,
            why: 'Suggest/indicate = the objective register.'
          }
        ]
      },
      {
        id: 'c1-3-2',
        title: 'Synthesis Essays',
        tag: 'writing',
        icon: 'write',
        mins: 20,
        xp: 20,
        objective: 'Write essays that compare, contrast and evaluate — the highest essay form.',
        teach: [
          'The synthesis essay question: "Discuss both views and give your opinion." Structure: intro → view A → view B → your synthesised judgement.',
          'Each view gets fairness: state the logic of A, the logic of B, WITHOUT caricature. Steelman both, then judge.',
          'The judgement paragraph is the climax: "Both views hold merit, yet on balance, I align with A because..." The "on balance" = your weighed verdict.',
          'Elevate the synthesis with the bridge: "The deeper question is not which, but when." Abstract bridging raises an essay to C1.',
          'Rami tip: before writing, produce the bridge sentence: "The real issue behind this debate is ______." The bridge is your thesis.'
        ],
        examples: [
          {
            en: 'View A: "Proponents argue free tuition democratises access."',
            note: 'The steelman of side A.'
          },
          {
            en: 'View B: "Opponents warn it strains public budgets."',
            note: 'The steelman of side B.'
          },
          {
            en: 'My view: "On balance, a targeted scholarship model captures BOTH objectives."',
            note: 'The synthesised judgement.'
          }
        ],
        words: [
          {
            w: 'proponent',
            ar: 'مؤيد',
            ex: 'Proponents stress the benefits.'
          },
          {
            w: 'on balance',
            ar: 'في النهاية/ترجيحاً',
            ex: 'On balance, the evidence favours X.'
          },
          {
            w: 'merit',
            ar: 'استحقاق/ميزة',
            ex: 'Both views carry merit.'
          },
          {
            w: 'climax',
            ar: 'ذروة',
            ex: 'The judgement paragraph is the climax.'
          }
        ],
        quiz: [
          {
            q: 'The "discuss both views" essay needs:',
            opts: [
              'fair treatment of both sides + your judgement',
              'only your side',
              'only the other side',
              'All of the above'
            ],
            ans: 0,
            why: 'Balance first, then judgement.'
          },
          {
            q: 'Steelmanning means:',
            opts: [
              'presenting each view at its strongest',
              'mocking the opponent',
              'ignoring one view',
              'None of the above'
            ],
            ans: 0,
            why: 'Fair strength makes your judgement credible.'
          },
          {
            q: 'The bridge sentence does what?',
            opts: [
              'names the deeper question behind the debate',
              'adds a random fact',
              'ends the essay',
              'All of the above'
            ],
            ans: 0,
            why: 'The bridge elevates the discussion to abstraction.'
          },
          {
            q: 'The best judgement phrase is:',
            opts: [
              '"On balance, I favour..."',
              '"I support everyone."',
              '"No opinion."',
              'None of the above'
            ],
            ans: 0,
            why: 'On balance = a weighed, credible verdict.'
          }
        ]
      },
      {
        id: 'c1-3-3',
        title: 'Academic Register Mastery',
        tag: 'writing',
        icon: 'write',
        mins: 20,
        xp: 20,
        objective: 'Elevate every sentence with the precise features of academic English.',
        teach: [
          'Academic register features: nominalisation (verbs → nouns: "we analysed" → "the analysis of"), impersonal passives, precise modifiers, no slang, no contractions.',
          'Nominalisation is the elevator: "Because the economy grew" → "The growth of the economy..." It adds density and formality.',
          'Precise modifiers instead of very: "very important" → "extremely significant"; "very big" → "exceptionally substantial". Precision > intensity.',
          'The hedged-academic voice: "It is reasonable to conclude that..." "The evidence appears to support..." Measured verbs carry authority.',
          'Rami tip: upgrade one paragraph today: change two verbs to nouns and replace one "very" with an exact modifier.'
        ],
        examples: [
          {
            en: '"The analysis of the data revealed a clear pattern."',
            note: 'Nominalisation: analysis, not analysed.'
          },
          {
            en: '"It can be argued that investment in education yields long-term returns."',
            note: 'Impersonal + hedged.'
          },
          {
            en: '"The results are exceptionally consistent across regions."',
            note: 'Precise modifier: exceptionally consistent.'
          }
        ],
        words: [
          {
            w: 'nominalisation',
            ar: 'التحويل إلى اسم',
            ex: 'Nominalisation adds formality.'
          },
          {
            w: 'precise',
            ar: 'دقيق',
            ex: 'Choose precise modifiers.'
          },
          {
            w: 'density',
            ar: 'كثافة',
            ex: 'Nominalisation adds density.'
          },
          {
            w: 'impersonal',
            ar: 'غير شخصي',
            ex: 'Impersonal voice builds authority.'
          }
        ],
        quiz: [
          {
            q: 'The academic translation of "we analysed" is:',
            opts: [
              '"the analysis of"',
              '"we checked"',
              '"we looked at"',
              'All of the above'
            ],
            ans: 0,
            why: 'Nominalisation = academic style.'
          },
          {
            q: 'The best modifier for "very important" is:',
            opts: [
              '"extremely significant"',
              '"very very important"',
              '"kinda important"',
              'None of the above'
            ],
            ans: 0,
            why: 'Precise, measured modifiers beat "very".'
          },
          {
            q: 'Academic English avoids:',
            opts: [
              'contractions and slang',
              'nouns',
              'verbs',
              'sentences'
            ],
            ans: 0,
            why: 'No won\'t/don\'t, no colloquial words.'
          },
          {
            q: 'The hedged academic claim is:',
            opts: [
              '"It is reasonable to conclude that..."',
              '"It is 100% true..."',
              '"Everyone knows..."',
              'All of the above'
            ],
            ans: 0,
            why: 'Measured verbs convey authority without overclaim.'
          }
        ]
      },
      {
        id: 'c1-3-4',
        title: 'Referencing & Citation',
        tag: 'writing',
        icon: 'write',
        mins: 20,
        xp: 20,
        objective: 'Mention sources naturally in essays and paragraphs.',
        teach: [
          'Cite with verbs that match strength: "According to the WHO...", "Research by Smith (2020) found...", "Studies indicate...". The verb sets the tone.',
          'The integrated reference: "As Smith (2020) argues, urban density does not necessarily reduce quality of life." The source rides inside the argument.',
          'Reference TYPE matters: specific (Smith 2020), general (a common view), institutional (the World Bank). IELTS rewards the institutional-style citation in Task 2.',
          'Do not over-cite: one strong attribution per point is enough; a plaque of names looks copied, not argued.',
          'Rami tip: put one "According to a recent study..." into your next Task 2 body. One credible source = one point proven.'
        ],
        examples: [
          {
            en: 'According to the World Bank, urban poverty has declined steadily.',
            note: 'Institutional citation with data.'
          },
          {
            en: 'As Johnson (2023) argues, remote work reshapes the housing market.',
            note: 'Integrated named source.'
          },
          {
            en: 'Recent studies indicate a strong link between sleep and academic performance.',
            note: 'General but attributed.'
          }
        ],
        words: [
          {
            w: 'cite',
            ar: 'يستشهد',
            ex: 'Cite the source of the claim.'
          },
          {
            w: 'according to',
            ar: 'وفقاً لـ',
            ex: 'According to the report, demand rose.'
          },
          {
            w: 'institutional',
            ar: 'مؤسسي',
            ex: 'Institutional sources carry weight.'
          },
          {
            w: 'attribute',
            ar: 'يُنسب',
            ex: 'Attribute every claim properly.'
          }
        ],
        quiz: [
          {
            q: 'The natural citation opener is:',
            opts: [
              '"According to the World Bank..."',
              '"Some guy said..."',
              '"I remember..."',
              'None of the above'
            ],
            ans: 0,
            why: 'Naming a credible institution = academic citation.'
          },
          {
            q: 'The strongest citation verb is:',
            opts: [
              'indicate / demonstrate',
              'totally says',
              'shout',
              'All of the above'
            ],
            ans: 0,
            why: 'Academic verbs match evidence to claim.'
          },
          {
            q: 'The reference that reads most academic is:',
            opts: [
              '"Research by Smith (2020) found..."',
              '"Smith likes it."',
              '"Someone wrote about it."',
              'None of the above'
            ],
            ans: 0,
            why: 'Named, dated, integrated.'
          },
          {
            q: 'Over-citing looks like:',
            opts: [
              'copying, not arguing',
              'expertise',
              'winning',
              'All of the above'
            ],
            ans: 0,
            why: 'Balance: one source per point.'
          }
        ]
      }
    ]
  },
  {
    id: 'c1-fluency',
    title: 'Oral Fluency',
    icon: 'speak',
    desc: 'Ids, topic depth, pronunciation and fluency devices — the spoken C1.',
    lessons: [
      {
        id: 'c1-4-1',
        title: 'Idioms for Natural Speaking',
        tag: 'speaking',
        icon: 'idiom',
        mins: 20,
        xp: 20,
        objective: 'Use idioms that sound native without sounding forced.',
        teach: [
          'Fluency idioms that light up Part 3: "bottom line" (the essential point), "sums it up" (captures the whole), "in the long run" (eventually), "no wonder" (unsurprisingly).',
          'The rule: idioms are seasoning, not the meal. One or two across a whole answer chain is native; six is a recital.',
          'Match idioms to register: "cutting corners" (informal) fits chat not essays; "in the long run" fits both — choose accordingly.',
          'Anchor your idioms with a paraphrase right after: "It is the tip of the iceberg — in other words, we only see a small part." Self-explanatory fluency.',
          'Rami tip: collect three idioms per week and force each into a spoken sentence until it feels ordinary. Native = rehearsed enough to forget rehearsal.'
        ],
        examples: [
          {
            en: 'The bottom line is that we need more practice.',
            note: 'Bottom line = the core point.'
          },
          {
            en: 'That sums it up perfectly, I think.',
            note: 'Sums it up = captures the whole.'
          },
          {
            en: 'In the long run, daily reading pays off.',
            note: 'In the long run = eventual result.'
          }
        ],
        words: [
          {
            w: 'bottom line',
            ar: 'الخلاصة',
            ex: 'The bottom line is clear.'
          },
          {
            w: 'sums up',
            ar: 'يلخص',
            ex: 'That sums up my view.'
          },
          {
            w: 'in the long run',
            ar: 'على المدى الطويل',
            ex: 'In the long run, it helps.'
          },
          {
            w: 'idiomatic',
            ar: 'اصطلاحي',
            ex: 'Idiomatic speech sounds native.'
          }
        ],
        quiz: [
          {
            q: '"The bottom line is..." means:',
            opts: [
              'the essential point',
              'the last sentence',
              'a bank statement',
              'None of the above'
            ],
            ans: 0,
            why: 'It signals the core conclusion.'
          },
          {
            q: '"That sums it up" means:',
            opts: [
              'it captures the whole idea',
              'it adds numbers',
              'it repeats me',
              'All of the above'
            ],
            ans: 0,
            why: 'Sum up = give the essence.'
          },
          {
            q: 'The right idiom-to-register match is:',
            opts: [
              '"in the long run" for essays too',
              '"cutting corners" for essays',
              'idioms never fit',
              'None of the above'
            ],
            ans: 0,
            why: 'Some idioms survive academic register; others do not.'
          },
          {
            q: 'The natural number of idioms per answer chain is:',
            opts: [
              'one or two',
              'ten',
              'zero always',
              'All of the above'
            ],
            ans: 0,
            why: 'Seasoning, not the meal.'
          }
        ]
      },
      {
        id: 'c1-4-2',
        title: 'Topic Depth in Speaking',
        tag: 'speaking',
        icon: 'speak',
        mins: 20,
        xp: 20,
        objective: 'Give deep, developed answers that go beyond one-sentence opinions.',
        teach: [
          'Depth building blocks: opinion → reason → example → consequence → broader context. "I support it because... For example... This means... And beyond one city, the same logic applies across regions."',
          'The consequence link is what most test-takers miss: after the example, add the effect: "So the result is..." Consequences show thinking, not just knowledge.',
          'Widen to society/culture: directly after the personal point, zoom out: "On a wider level, this reflects how..." Zooming out = Band 7+ insight.',
          'Complexity over speed: depth is not more words, it is more layers. A layered 40-second answer beats a fast 10-second one.',
          'Rami tip: develop one topic with the five blocks in writing first, then say it aloud. Depth is built, then spoken.'
        ],
        examples: [
          {
            en: 'Opinion: "I believe urban cycling should be expanded."',
            note: 'The claim.'
          },
          {
            en: 'Example: "In Copenhagen, bike lanes cut congestion sharply."',
            note: 'The proof.'
          },
          {
            en: 'Consequence: "So cities become quieter, healthier and more equal."',
            note: 'The ripple — depth.'
          }
        ],
        words: [
          {
            w: 'depth',
            ar: 'عمق',
            ex: 'Depth means layers of thought.'
          },
          {
            w: 'consequence',
            ar: 'نتيجة',
            ex: 'Follow the point to its consequence.'
          },
          {
            w: 'broaden',
            ar: 'يوسع',
            ex: 'Broaden the point to society.'
          },
          {
            w: 'insight',
            ar: 'بصيرة',
            ex: 'Insight separates 6 from 7.'
          }
        ],
        quiz: [
          {
            q: 'The deepest answer structure is:',
            opts: [
              'opinion → reason → example → consequence',
              'opinion only',
              'a list of facts',
              'None of the above'
            ],
            ans: 0,
            why: 'Layers deepen the answer.'
          },
          {
            q: 'The most-missed depth link is:',
            opts: [
              'the consequence after the example',
              'the first sentence',
              'the vocabulary',
              'All of the above'
            ],
            ans: 0,
            why: 'Consequences show real thinking.'
          },
          {
            q: '"On a wider level, this reflects..." does:',
            opts: [
              'zooms out to society',
              'repeats the opinion',
              'ends abruptly',
              'None of the above'
            ],
            ans: 0,
            why: 'Broad context = the Band 7+ zoom out.'
          },
          {
            q: 'Depth means:',
            opts: [
              'more layers, not more words',
              'more speed',
              'louder voice',
              'All of the above'
            ],
            ans: 0,
            why: 'Layered thinking wins over raw length.'
          }
        ]
      },
      {
        id: 'c1-4-3',
        title: 'Pronunciation & Word Stress',
        tag: 'speaking',
        icon: 'speak',
        mins: 20,
        xp: 20,
        objective: 'Stress the right syllable and speak with natural rhythm.',
        teach: [
          'Syllables have one stressed heart: phoTOgraph, phoTOgraphy, photoGRAPHic — the stress MOVES with the word family. Wrong stress = wrong word to the examiner\'s ear.',
          'Sentence rhythm: content words (nouns, verbs, adjectives) are stressed; structure words (the, of, to) are weak and fast: "I WANT to GO to the CITY."',
          'Words that change meaning with stress: record (noun REcord) vs record (verb reCORD), present (PREsent) vs present (preSENT). Listen for the noun-verb shift.',
          'Natural linking: English connects sounds: "an apple" sounds like "a-napple"; "a lot of" sounds like "alotta". Sentence rhythm, not robot pauses.',
          'Rami tip: shadow-cast one minute of audio daily: repeat each sentence immediately, copying stress and rhythm. Shadowing builds the native inner rhythm.'
        ],
        examples: [
          {
            en: 'I\'ll REcord the meeting. (verb: reCORD → REcord)',
            note: 'Stress placement marks verb tense/function.'
          },
          {
            en: 'The REcord shows the highest sales. (noun)',
            note: 'Noun stress sits on the first syllable.'
          },
          {
            en: 'She INvited me to the CONcert.',
            note: 'Content words stressed; "to the" become weak.'
          }
        ],
        words: [
          {
            w: 'stress',
            ar: 'نبرة',
            ex: 'Stress the correct syllable.'
          },
          {
            w: 'syllable',
            ar: 'مقطع صوتي',
            ex: 'Count the syllables aloud.'
          },
          {
            w: 'rhythm',
            ar: 'إيقاع',
            ex: 'Rhythm comes from stress.'
          },
          {
            w: 'shadowing',
            ar: 'التقليد الصوتي',
            ex: 'Shadowing trains native rhythm.'
          }
        ],
        quiz: [
          {
            q: 'The stressed syllable in "photography" is:',
            opts: [
              'PHO',
              'to',
              'TOG',
              'phy'
            ],
            ans: 2,
            why: 'It is pho-TOG-raphy.'
          },
          {
            q: 'The noun "record" is stressed:',
            opts: [
              'on the first syllable',
              'on the second',
              'never',
              'None of the above'
            ],
            ans: 0,
            why: 'RE-cord (noun) vs re-CORD (verb).'
          },
          {
            q: 'Sentence rhythm stresses:',
            opts: [
              'content words, not structure words',
              'every word equally',
              'only verbs',
              'All of the above'
            ],
            ans: 0,
            why: 'Nouns/verbs/adjectives carry stress.'
          },
          {
            q: 'The best training for rhythm is:',
            opts: [
              'shadowing native audio daily',
              'reading silently',
              'memorising word lists',
              'None of the above'
            ],
            ans: 0,
            why: 'Immediate repetition trains the ear and mouth.'
          }
        ]
      },
      {
        id: 'c1-4-4',
        title: 'Fluency Devices That Work',
        tag: 'speaking',
        icon: 'speak',
        mins: 20,
        xp: 20,
        objective: 'Buy thinking time and connect ideas without "ummm" destroying fluency.',
        teach: [
          'The native way to buy time: "That is a good question." "Let me think about that for a moment." "There are several angles to consider." Phrases like these count AS fluency, not against it.',
          'Reformulation restarts: "What I mean is...", "Or rather...", "To put it differently..." — brilliant when you half-say something.',
          'Signposting your answer: "I would give two reasons. First,... Second,..." Announcing the shape = the examiner knows you can structure on the fly.',
          'Avoid "so... ummm... like" filler loops. Replace with one honest pause + a real device. One "well" is native; eight "wells" is noise.',
          'Rami tip: choose three devices and over-train them this week: "That\'s a good question. There are really two sides. First,..." Routines remove panic.'
        ],
        examples: [
          {
            en: 'That is a good question. Let me think for a moment.',
            note: 'Honest time-buying = fluency, not silence.'
          },
          {
            en: 'What I mean is, the real issue is cost, not quality.',
            note: 'Reformulation after a partial thought.'
          },
          {
            en: 'I would give two reasons. First... Second...',
            note: 'Announced structure = confident delivery.'
          }
        ],
        words: [
          {
            w: 'device',
            ar: 'أداة لغوية',
            ex: 'Fluency devices connect your ideas.'
          },
          {
            w: 'reformulate',
            ar: 'يعيد الصياغة',
            ex: 'Reformulate when you half-say it.'
          },
          {
            w: 'pause',
            ar: 'توقف',
            ex: 'A natural pause beats a filler.'
          },
          {
            w: 'signpost',
            ar: 'إشارة',
            ex: 'Signposting shows your structure.'
          }
        ],
        quiz: [
          {
            q: 'The native time-buyer is:',
            opts: [
              '"That is a good question. Let me think."',
              '"Ummm..."',
              '"What?"',
              'All of the above'
            ],
            ans: 0,
            why: 'Honest phrases count as fluency.'
          },
          {
            q: 'Reformulation phrase:',
            opts: [
              '"What I mean is..."',
              '"Like, you know..."',
              '"Sooo..."',
              'None of the above'
            ],
            ans: 0,
            why: 'Reformulation repairs and clarifies.'
          },
          {
            q: 'Announcing your structure does what?',
            opts: [
              'shows the examiner you can organise',
              'wastes time',
              'sounds robotic',
              'All of the above'
            ],
            ans: 0,
            why: 'Signposted answers read as controlled fluency.'
          },
          {
            q: 'The right number of "well" fillers is:',
            opts: [
              'one or two max',
              'eight',
              'zero forever',
              'None of the above'
            ],
            ans: 0,
            why: 'Sparse fillers are natural; floods are noise.'
          }
        ]
      }
    ]
  },
  {
    id: 'c1-band8',
    title: 'IELTS Band 8 Engineering',
    icon: 'exam',
    desc: 'The levers that push writing and speaking from 7 to 8: cohesion, complexity, lexical precision, mindset.',
    lessons: [
      {
        id: 'c1-5-1',
        title: 'Cohesion Worth Band 8',
        tag: 'writing',
        icon: 'write',
        mins: 20,
        xp: 20,
        objective: 'Chain every paragraph logically so the whole argument builds.',
        teach: [
          'Band 8 cohesion = paragraphs that BUILD, not just list: the second paragraph answers a question raised by the first. Ask: "What did paragraph one leave open?"',
          'Link endings to beginnings: "As noted above, the cost is unavoidable — now let us consider who should bear it." Explicit internal references.',
          'Macro-cohesion: the introduction\'s promise is kept point by point — each body delivers exactly what the intro announced.',
          'Transition variety: instead of "However" every time, rotate: "By contrast", "That said", "Still", "Equally importantly". Variety = sophistication.',
          'Rami tip: outline your essay and draw a line between each paragraph with its logical job: raise → question → answer → weigh. The lines are cohesion.'
        ],
        examples: [
          {
            en: 'Having established the cost, the question becomes who pays.',
            note: 'The bridge from paragraph one to two.'
          },
          {
            en: 'By contrast, the private sector moves far faster.',
            note: 'Rotated contrast marker.'
          },
          {
            en: 'As promised in the introduction, the evidence now weighs both sides.',
            note: 'Macro-cohesion: the intro lives.'
          }
        ],
        words: [
          {
            w: 'macro-cohesion',
            ar: 'ترابط كلي',
            ex: 'Macro-cohesion links paragraph to paragraph.'
          },
          {
            w: 'bridge',
            ar: 'جسر',
            ex: 'The bridge opens the next paragraph.'
          },
          {
            w: 'logical job',
            ar: 'وظيفة منطقية',
            ex: 'Each paragraph has a logical job.'
          },
          {
            w: 'rotate',
            ar: 'يبدل',
            ex: 'Rotate your transitions.'
          }
        ],
        quiz: [
          {
            q: 'Band 8 paragraphs:',
            opts: [
              'build on each other logically',
              'stand alone randomly',
              'repeat the point',
              'All of the above'
            ],
            ans: 0,
            why: 'Paragraphs answer the previous one\'s open question.'
          },
          {
            q: 'The bridge sentence does what?',
            opts: [
              'connects the end of one paragraph to the start of the next',
              'ends the essay',
              'adds vocabulary',
              'None of the above'
            ],
            ans: 0,
            why: 'Bridges create paragraph-level flow.'
          },
          {
            q: '"As promised in the introduction" shows:',
            opts: [
              'macro-cohesion',
              'a memory lapse',
              'a new topic',
              'All of the above'
            ],
            ans: 0,
            why: 'It honours the intro\'s plan.'
          },
          {
            q: 'The transition variety fix is:',
            opts: [
              'rotate by contrast / that said / still',
              'use However five times',
              'use no markers',
              'None of the above'
            ],
            ans: 0,
            why: 'Variety reads as mature control.'
          }
        ]
      },
      {
        id: 'c1-5-2',
        title: 'Complexity Without Splintering',
        tag: 'writing',
        icon: 'grammar',
        mins: 20,
        xp: 20,
        objective: 'Write complex sentences that stay perfectly controlled.',
        teach: [
          'The Band 8 sentence = grammatically complex but never tangled: one clear main clause + two dependents, stress-tested for clarity.',
          'The splinter test: if you must read the sentence twice to parse it, it is too long. Split it. Clarity is the fence around complexity.',
          'Complexity batteries: subordination (because/although), relative clauses, participle phrases ("Having analysed the data, we conclude..."), and apposition ("the capital, a city of contrasts,").',
          'Rhythm control: alternate short and long. A complex idea gets its long sentence; the verdict gets its short punch: "The evidence is simply insufficient."',
          'Rami tip: for each long sentence you write, add a six-word verdict sentence next to it. Contrast in length = Band 8 rhythm.'
        ],
        examples: [
          {
            en: 'Having weighed the evidence, the committee reached a balanced verdict.',
            note: 'Participle phrase opening + main clause.'
          },
          {
            en: 'Although the reform is costly, it is, in the long run, cheaper than complacency.',
            note: 'Subordination + parenthetical = complex but clear.'
          },
          {
            en: 'The conclusion is simple: the policy fails on its own terms.',
            note: 'Short verdict after complexity.'
          }
        ],
        words: [
          {
            w: 'splinter',
            ar: 'انكسار/تشابك',
            ex: 'A splintered sentence breaks clarity.'
          },
          {
            w: 'subordination',
            ar: 'تبعية',
            ex: 'Subordination adds depth safely.'
          },
          {
            w: 'participle',
            ar: 'اسم فاعل',
            ex: 'Participle phrases open sentences.'
          },
          {
            w: 'verdict',
            ar: 'حكم',
            ex: 'The short verdict lands the point.'
          }
        ],
        quiz: [
          {
            q: 'The Band 8 sentence is:',
            opts: [
              'complex yet always clear',
              'as long as possible',
              'never complex',
              'All of the above'
            ],
            ans: 0,
            why: 'Complexity lives inside clarity.'
          },
          {
            q: 'The splinter test says:',
            opts: [
              'if you must reread it, split it',
              'write longer sentences',
              'never edit',
              'None of the above'
            ],
            ans: 0,
            why: 'Clarity fences off complexity.'
          },
          {
            q: 'A participle opener is:',
            opts: [
              '"Having analysed the data, we conclude..."',
              '"And so..."',
              '"Very..."',
              'All of the above'
            ],
            ans: 0,
            why: 'Having + past participle opens formally.'
          },
          {
            q: 'The rhythm trick is:',
            opts: [
              'alternate long and short sentences',
              'all long sentences',
              'all short',
              'None of the above'
            ],
            ans: 0,
            why: 'Contrast in length = the skilled voice.'
          }
        ]
      },
      {
        id: 'c1-5-3',
        title: 'Lexical Resource at Band 8',
        tag: 'vocab',
        icon: 'vocab',
        mins: 20,
        xp: 20,
        objective: 'Deploy precise, varied, natural words — the vocabulary lever to 8.',
        teach: [
          'Band 8 vocabulary = precision over rarity: "curtail", "mitigate", "encompass" when exact; not obscure words forced in. Worse than a common word is a wrong rare one.',
          'Collocations ARE the marks: "pose a threat", "bridge the gap", "yield results", "undermine confidence" — a correct pair beats a big single word.',
          'Lexical cohesion: run a theme\'s synonyms through the essay: challenge → obstacle → hurdle. Variety with a consistent thread.',
          'Idiom in writing: sparing. One well-placed "a double-edged sword" beats five crowded idioms.',
          'Rami tip: build a personal Band-8 shelf: 10 collocations + 5 precise verbs + 3 reliable idioms, and reuse them across essays until automatic.'
        ],
        examples: [
          {
            en: 'The policy aims to mitigate the effects of climate change.',
            note: 'Mitigate = precise, exact action verb.'
          },
          {
            en: 'Distance learning can bridge the gap between rural and urban schools.',
            note: 'The collocation "bridge the gap".'
          },
          {
            en: 'Fluctuating prices undermine consumer confidence.',
            note: 'Undermine + confidence = a natural pair.'
          }
        ],
        words: [
          {
            w: 'precise',
            ar: 'دقيق',
            ex: 'Precision beats rarity.'
          },
          {
            w: 'undermine',
            ar: 'يقوض',
            ex: 'The scandal undermined trust.'
          },
          {
            w: 'yield',
            ar: 'يُنتج',
            ex: 'The method yields clear results.'
          },
          {
            w: 'encompass',
            ar: 'يشمل',
            ex: 'The term encompasses many skills.'
          }
        ],
        quiz: [
          {
            q: 'Band 8 vocabulary means:',
            opts: [
              'precision and natural collocation',
              'the rarest words possible',
              'more words per sentence',
              'All of the above'
            ],
            ans: 0,
            why: 'Exact and natural beats rare and forced.'
          },
          {
            q: 'The mark-winning collocation is:',
            opts: [
              '"pose a threat"',
              '"make a threat to be"',
              '"big threat do"',
              'None of the above'
            ],
            ans: 0,
            why: 'Correct word pairs are the score lever.'
          },
          {
            q: '"Bridge the gap" means:',
            opts: [
              'reduce the difference between two things',
              'build a bridge',
              'close a road',
              'All of the above'
            ],
            ans: 0,
            why: 'It is the fixed collocation for reducing gaps.'
          },
          {
            q: 'Idioms in writing should be:',
            opts: [
              'sparing and well-placed',
              'everywhere',
              'never used',
              'None of the above'
            ],
            ans: 0,
            why: 'One precise idiom beats an idiom pile.'
          }
        ]
      },
      {
        id: 'c1-5-4',
        title: 'Exam Mindset: From 7 to 8',
        tag: 'exam',
        icon: 'evaluate',
        mins: 20,
        xp: 20,
        objective: 'Manage the mental game — timing, error-spotting, and calm fluency.',
        teach: [
          'The 7→8 gap is often mental: Band 7 answers are correct; Band 8 answers are CORRECT AND CONTROLLED. Control = checking every -s, every article, every tense link.',
          'Time architecture in Writing: 5 min planning, 30 min drafting, 5 min error-hunting. The final 5 minutes lift a 7 to an 8 by killing small slips.',
          'In Speaking, recovery beats perfection: stumble → restart cleanly ("What I meant to say is...") → the examiner forgets the slip, remembers the recovery.',
          'Self-review drinks: read your essay backwards sentence by sentence — grammar errors surface that forward reading hides.',
          'Rami tip: build the exam ritual now: same seat, same timing, one warm-up. Rituals convert pressure into routine.'
        ],
        examples: [
          {
            en: 'Plan 5 → draft 30 → proofread 5. The proofread is where 8 is won.',
            note: 'Time architecture for Writing.'
          },
          {
            en: 'Stumble, then recover: "What I meant to say is... actually..."',
            note: 'Recovery reads as fluency.'
          },
          {
            en: 'Reading the essay backwards exposes the small slips.',
            note: 'A concrete error-hunting tactic.'
          }
        ],
        words: [
          {
            w: 'ritual',
            ar: 'طقس/عادة',
            ex: 'A ritual converts pressure to routine.'
          },
          {
            w: 'proofread',
            ar: 'تدقيق',
            ex: 'Proofread for grammar and slips.'
          },
          {
            w: 'recover',
            ar: 'يتعافى/يصحح',
            ex: 'A clean recovery beats perfectionism.'
          },
          {
            w: 'control',
            ar: 'إتقان/ضبط',
            ex: 'Band 8 is correctness under control.'
          }
        ],
        quiz: [
          {
            q: 'The best writing time split is:',
            opts: [
              '5 plan / 30 draft / 5 proofread',
              '40 draft / 0 plan',
              '10 plan / 0 proof',
              'All of the above'
            ],
            ans: 0,
            why: 'The proofread minute-lift is where 8 appears.'
          },
          {
            q: 'A speaking stumble should be:',
            opts: [
              'recovered with a clean restart',
              'ignored forever',
              'apologised for twice',
              'None of the above'
            ],
            ans: 0,
            why: 'Clean recovery reads as native fluency.'
          },
          {
            q: 'Reading the essay backwards helps you:',
            opts: [
              'spot grammar slips',
              'write longer',
              'memorise',
              'All of the above'
            ],
            ans: 0,
            why: 'Backwards reading exposes hidden errors.'
          },
          {
            q: 'The mental 7→8 gap is:',
            opts: [
              'control over correctness',
              'faster typing',
              'longer paragraphs',
              'None of the above'
            ],
            ans: 0,
            why: 'Correctness + control = the 8 band.'
          }
        ]
      }
    ]
  }
];
