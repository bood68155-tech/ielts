/* ============================================================
   Rami Academy — A2 Elementary curriculum (5 units × 4 lessons)
   Every lesson: Rami teaches (teach[]), examples, words, quiz.
   ============================================================ */
const ACADEMY_UNITS_A2 = [
  {
    id: 'a2-routines',
    title: 'Life & Routines',
    icon: 'clock',
    desc: 'Talk about your present life: habits, actions happening now, and the time around them.',
    lessons: [
      {
        id: 'a2-1-1',
        title: 'Present Simple & Adverbs of Frequency',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 12,
        objective: 'Say how often you do things with always, usually, sometimes and never.',
        teach: [
          'Frequency adverbs answer "how often?". The main ones in order: always (100%), usually (90%), often (70%), sometimes (40%), rarely (10%), never (0%).',
          'Their home is BEFORE the main verb: "I always drink tea." "She often travels." But they go AFTER the verb "to be": "He is always late." Two rules, no exceptions.',
          'Put ONE frequency word per sentence. "I usually sometimes go" is unnatural — choose the closest to your true meaning.',
          'Answer the classic IELTS question "How often do you...?" with both frequency + detail: "I usually exercise three times a week, because it keeps me healthy."',
          'Rami tip: rank your own habits by frequency out loud; "I always check my phone, I rarely walk." Comparing frequencies trains the adverb ladder.'
        ],
        examples: [
          {
            en: 'I always read before I sleep.',
            note: 'Always before the main verb "read".'
          },
          {
            en: 'She is never late for class.',
            note: 'After "is" (to be), before no verb — the exception rule.'
          },
          {
            en: 'I sometimes feel nervous before speaking, but I usually recover quickly.',
            note: 'One frequency per clause keeps it clean.'
          }
        ],
        words: [
          {
            w: 'always',
            ar: 'دائماً',
            ex: 'I always wash my hands before eating.'
          },
          {
            w: 'usually',
            ar: 'عادةً',
            ex: 'We usually have dinner at eight.'
          },
          {
            w: 'sometimes',
            ar: 'أحياناً',
            ex: 'Sometimes I walk to work.'
          },
          {
            w: 'never',
            ar: 'أبداً',
            ex: 'I never skip breakfast.'
          }
        ],
        quiz: [
          {
            q: 'The strongest frequency word is:',
            opts: [
              'usually',
              'always',
              'sometimes',
              'never'
            ],
            ans: 1,
            why: 'Always = 100% of the time — the top of the ladder.'
          },
          {
            q: 'Correct placement: "She is ______ tired in the morning."',
            opts: [
              'usually',
              'is',
              'usually is',
              'be'
            ],
            ans: 0,
            why: 'After the verb "to be": She is usually tired.'
          },
          {
            q: 'Correct placement: "I ______ drink coffee."',
            opts: [
              'drink always',
              'always drink',
              'always am drinking',
              'drink often always'
            ],
            ans: 1,
            why: 'Frequency goes before the main verb: I always drink coffee.'
          },
          {
            q: 'A natural answer to "How often do you exercise?" is:',
            opts: [
              '"Yes."',
              '"I usually exercise three times a week."',
              '"Exercise."',
              '"Every do."'
            ],
            ans: 1,
            why: 'Frequency adverb + detail is the complete answer shape.'
          }
        ]
      },
      {
        id: 'a2-1-2',
        title: 'Present Continuous: actions now',
        tag: 'grammar',
        icon: 'listen',
        mins: 12,
        xp: 12,
        objective: 'Describe actions happening right now and compare them with daily habits.',
        teach: [
          'Present continuous = be + verb-ing, for NOW: "I am studying English now." The helper is "am/is/are", so "I be studying" is wrong — it must be "I am studying".',
          'Use it for temporary situations, not just the moment: "She is living in Amman this month." The action has a start and a future end.',
          'Contrast is the exam skill: habit vs now. "I usually drink tea, but today I am drinking coffee." Present simple for the habit, continuous for this unusual moment.',
          'Yes/no questions swap the helper to the front: "Are you listening?" "Is it raining?" Short answer: "Yes, I am." / "No, it isn\'t."',
          'Rami tip: describe what you are doing RIGHT NOW in your head: "I am sitting, I am reading English." Now-training = natural continuous.'
        ],
        examples: [
          {
            en: 'I am studying English at the moment.',
            note: 'Now = am + studying.'
          },
          {
            en: 'We usually eat at home, but tonight we are eating out.',
            note: 'Habit (simple) vs this one evening (continuous).'
          },
          {
            en: 'Is it raining outside? — Yes, it is.',
            note: 'Question with the helper "is" first.'
          }
        ],
        words: [
          {
            w: 'at the moment',
            ar: 'الآن',
            ex: 'I am working at the moment.'
          },
          {
            w: 'right now',
            ar: 'في هذه اللحظة',
            ex: 'They are playing right now.'
          },
          {
            w: 'temporary',
            ar: 'مؤقت',
            ex: 'This situation is only temporary.'
          },
          {
            w: 'nowadays',
            ar: 'في هذه الأيام',
            ex: 'Nowadays people are spending more time online.'
          }
        ],
        quiz: [
          {
            q: 'Complete: "I ______ reading a great novel."',
            opts: [
              'am',
              'be',
              'is',
              'are'
            ],
            ans: 0,
            why: 'The helper for I is am: I am reading.'
          },
          {
            q: 'The present continuous timeline is:',
            opts: [
              'action always',
              'action happening now or temporarily',
              'finished action',
              'future plan only'
            ],
            ans: 1,
            why: 'Continuous = in progress now or for a temporary period.'
          },
          {
            q: 'The correct habit-vs-now contrast is:',
            opts: [
              '"I usually drink tea but today I am drinking coffee."',
              '"I am usually drunk tea."',
              '"I drinking tea always."',
              'None of the above'
            ],
            ans: 0,
            why: 'Simple for the habit + continuous for the special moment.'
          },
          {
            q: 'The correct question is:',
            opts: [
              '"Is you listening?"',
              '"Are you listening?"',
              '"You are listening?"',
              '"You listening?"'
            ],
            ans: 1,
            why: 'Are + you + base-ing: Are you listening?'
          }
        ]
      },
      {
        id: 'a2-1-3',
        title: 'Prepositions of Time: at, on, in',
        tag: 'grammar',
        icon: 'clock',
        mins: 12,
        xp: 12,
        objective: 'Choose at, on and in correctly for clock times, days and longer periods.',
        teach: [
          'The golden rule: at = a precise point, on = a day, in = a longer period. "At 8 o\'clock", "on Monday", "in July". One preposition per time size.',
          'Extend it: at night, at noon, at the weekend; on Friday, on my birthday, on New Year\'s Day; in the morning, in 2020, in summer, in the past.',
          'The tricky pair: in + morning/afternoon/evening, BUT at + night. "In the morning" but "at night" — classic exam trap.',
          'Leave out prepositions before: this, next, last, every. "I see him every day" (not "on every day"), "next week" (not "on next week").',
          'Rami tip: for a week, date each day with a preposition: "At 7 in the morning, on Thursday in March." Drill the mixed pattern.'
        ],
        examples: [
          {
            en: 'The meeting starts at nine o\'clock on Monday.',
            note: 'At (exact time) + on (day).'
          },
          {
            en: 'I was born in 2005 in summer.',
            note: 'In before years and seasons.'
          },
          {
            en: 'In the morning I am sharp; at night I am tired.',
            note: 'In + morning, but at + night.'
          }
        ],
        words: [
          {
            w: 'at',
            ar: 'في (نقطة زمنية)',
            ex: 'The bus leaves at noon.'
          },
          {
            w: 'on',
            ar: 'في (يوم محدد)',
            ex: 'We travel on Friday.'
          },
          {
            w: 'in',
            ar: 'في (فترة أطول)',
            ex: 'I will finish in June.'
          },
          {
            w: 'next week',
            ar: 'الأسبوع القادم',
            ex: 'The exam is next week.'
          }
        ],
        quiz: [
          {
            q: '"The class starts ______ 8 o\'clock."',
            opts: [
              'at',
              'on',
              'in',
              'by'
            ],
            ans: 0,
            why: 'Exact clock times take "at".'
          },
          {
            q: 'Correct: "I have a test ______ Friday."',
            opts: [
              'at',
              'on',
              'in',
              'to'
            ],
            ans: 1,
            why: 'Days of the week take "on".'
          },
          {
            q: '"I relax ______ night."',
            opts: [
              'at',
              'on',
              'in',
              'the'
            ],
            ans: 0,
            why: '"At night" is the fixed form, even though "in" works for other periods.'
          },
          {
            q: 'Which sentence is correct?',
            opts: [
              '"I see him on every day."',
              '"I see him every day."',
              '"I see him in every day."',
              '"I see him at every day."'
            ],
            ans: 1,
            why: 'No preposition before "every": I see him every day.'
          }
        ]
      },
      {
        id: 'a2-1-4',
        title: 'Talking about Hobbies',
        tag: 'speaking',
        icon: 'spark',
        mins: 12,
        xp: 12,
        objective: 'Describe your hobbies with the right verbs, reasons, and a natural answer shape.',
        teach: [
          'Hobby verbs are gerund-friendly: I enjoy + -ing (reading), I love + -ing (cooking), I am keen on + -ing (photography), I spend my free time + -ing (swimming).',
          'Answer the "why?" with one solid reason: "I enjoy reading because it opens my mind and relaxes me." Reason = benefit for the mind + benefit for the heart.',
          'Give a whole answer shape: what + how often + why + small detail. "I play football twice a week with my friends because I love both sport and team spirit. Last week we won our match!"',
          'Compare to learn nuance: "I used to swim in summer, but now I prefer hiking." Used to + but + now/prefer = a Band 6-worthy sentence.',
          'Rami tip: name three things you truly enjoy and say the reason in English today. Real passion makes real fluency.'
        ],
        examples: [
          {
            en: 'I enjoy listening to music while I work.',
            note: 'Enjoy + -ing: listening.'
          },
          {
            en: 'I play chess because it trains my concentration.',
            note: 'Hobby + reason: why I do it.'
          },
          {
            en: 'I used to love cycling, but now I prefer walking.',
            note: 'Past hobby → present preference.'
          }
        ],
        words: [
          {
            w: 'hobby',
            ar: 'هواية',
            ex: 'Reading history is my favourite hobby.'
          },
          {
            w: 'keen on',
            ar: 'مولع بـ',
            ex: 'I am keen on photography.'
          },
          {
            w: 'spend time',
            ar: 'يقضي وقتاً',
            ex: 'I spend my free time painting.'
          },
          {
            w: 'prefer',
            ar: 'يفضل',
            ex: 'I prefer outdoor sports.'
          }
        ],
        quiz: [
          {
            q: 'The grammatically correct hobby sentence is:',
            opts: [
              '"I enjoy to read."',
              '"I enjoy reading."',
              '"I enjoy read."',
              '"I enjoy reads."'
            ],
            ans: 1,
            why: 'Enjoy always takes -ing: enjoy reading.'
          },
          {
            q: 'The complete answer shape is:',
            opts: [
              'what + how often + why + detail',
              'only the hobby name',
              'a single verb',
              'just a reason'
            ],
            ans: 0,
            why: 'A full hobby answer layers: what, frequency, reason, detail.'
          },
          {
            q: '"I used to swim, but now I prefer hiking" shows:',
            opts: [
              'a change over time',
              'a daily habit',
              'a future plan',
              'a fact about water'
            ],
            ans: 0,
            why: 'Used to = past habit; but now = the change.'
          },
          {
            q: 'A natural reason for a hobby is:',
            opts: [
              '"because it relaxes me"',
              '"because why not"',
              '"because I must"',
              '"because it is Tuesday"'
            ],
            ans: 0,
            why: 'A hobby reason names a benefit — relaxation is a strong one.'
          }
        ]
      }
    ]
  },
  {
    id: 'a2-places',
    title: 'Describing the World',
    icon: 'spark',
    desc: 'Describe people and places with adjectives, comparisons and position expressions.',
    lessons: [
      {
        id: 'a2-2-1',
        title: 'Adjectives & Opposites',
        tag: 'vocab',
        icon: 'vocab',
        mins: 12,
        xp: 12,
        objective: 'Use descriptive adjectives and their opposites to paint clear pictures.',
        teach: [
          'Adjectives describe nouns — before the noun: "a beautiful city", or after to be: "The city is beautiful." Order: opinion + size + colour: "a beautiful big white house."',
          'Learn opposites in pairs so every word doubles: big/small, hot/cold, new/old, cheap/expensive, easy/difficult, fast/slow, strong/weak, quiet/noisy.',
          'In speaking, one precise adjective beats three vague ones. Instead of "very very nice", say "stunning", "cozy", "spacious", "bustling".',
          'Use adjectives to compare in your mind: "The old city is peaceful, but the new city is bustling." Opposites create the contrast that makes descriptions interesting.',
          'Rami tip: describe your desk with five adjectives and their opposites now: "small but tidy; cheap but reliable." Location is everything — start there.'
        ],
        examples: [
          {
            en: 'My new phone is fast and reliable.',
            note: 'Two accurate adjectives, one opinion each.'
          },
          {
            en: 'The old city is quiet in the morning but noisy at night.',
            note: 'Opposites (quiet/noisy) across time = vivid.'
          },
          {
            en: 'She lives in a small cozy flat near the university.',
            note: 'Opinion + size: small, cozy.'
          }
        ],
        words: [
          {
            w: 'quiet',
            ar: 'هادئ',
            ex: 'The library is always quiet.'
          },
          {
            w: 'busy',
            ar: 'مزدحم',
            ex: 'The market is very busy on Fridays.'
          },
          {
            w: 'expensive',
            ar: 'غالي',
            ex: 'Rent here is expensive.'
          },
          {
            w: 'peaceful',
            ar: 'مسالم/هادئ',
            ex: 'The garden is peaceful at sunrise.'
          }
        ],
        quiz: [
          {
            q: 'The correct adjective order is:',
            opts: [
              '"a white beautiful big house"',
              '"a beautiful big white house"',
              '"a big white beautiful house"',
              '"a white big beautiful house"'
            ],
            ans: 1,
            why: 'Opinion (beautiful) + size (big) + colour (white) before the noun.'
          },
          {
            q: 'The opposite of "cheap" is:',
            opts: [
              'expensive',
              'new',
              'small',
              'easy'
            ],
            ans: 0,
            why: 'Cheap ↔ expensive — the price pair.'
          },
          {
            q: 'Instead of "very very nice", a stronger adjective is:',
            opts: [
              'okay',
              'stunning',
              'normal',
              'so-so'
            ],
            ans: 1,
            why: 'Stunning is a precise, strong adjective.'
          },
          {
            q: 'The more precise sentence is:',
            opts: [
              '"The flat is good."',
              '"The flat is small but cozy."',
              '"The flat is fine."',
              '"The flat is nice, you know."'
            ],
            ans: 1,
            why: 'Small + cozy paint a real picture; "good" carries no image.'
          }
        ]
      },
      {
        id: 'a2-2-2',
        title: 'Comparatives & Superlatives',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 12,
        objective: 'Compare two things and rank three or more with -er/-est and more/most.',
        teach: [
          'Comparatives (two): add -er for short words (big → bigger, fast → faster), use MORE for long words (beautiful → more beautiful). Then add "than": "Cairo is bigger than Amman."',
          'Superlatives (three or more): add -est (big → the biggest), or THE MOST (beautiful → the most beautiful): "This is the most beautiful city in the area."',
          'The triple trap: better (good), worse (bad), farther/further (far) break every rule. Never say "more better" — that is one of the loudest beginner errors in IELTS.',
          'Answer the exam prompt "Compare X and Y" with three moves: one similarity, one difference, your personal preference. "Both are historic, but X is livelier; I prefer X because..."',
          'Rami tip: rank three things today: three cities, three foods, three exam skills. Saying the ladder out loud builds automatic -er/-est.'
        ],
        examples: [
          {
            en: 'This exam is harder than the last one.',
            note: 'Short word + er + than: harder than.'
          },
          {
            en: 'That was the most interesting lecture this year.',
            note: 'Long word superlative: the most interesting.'
          },
          {
            en: 'Her English is much better now, and my writing is worse!',
            note: 'Irregular pair: better and worse.'
          }
        ],
        words: [
          {
            w: 'than',
            ar: 'من (للمقارنة)',
            ex: 'This route is shorter than that one.'
          },
          {
            w: 'better',
            ar: 'أفضل',
            ex: 'Practice makes you better.'
          },
          {
            w: 'the best',
            ar: 'الأفضل',
            ex: 'This is the best café in town.'
          },
          {
            w: 'as ... as',
            ar: 'بنفس درجة',
            ex: 'She is as tall as her brother.'
          }
        ],
        quiz: [
          {
            q: 'Correct comparative: "Today is ______ colder yesterday."',
            opts: [
              'more cold than',
              'colder than',
              'coldest than',
              'very cold than'
            ],
            ans: 1,
            why: 'Short word + -er + than: colder than.'
          },
          {
            q: 'The superlative of "interesting" is:',
            opts: [
              'interestinger',
              'more interesting',
              'the most interesting',
              'interestingest'
            ],
            ans: 2,
            why: 'Long adjectives build superlatives with the most.'
          },
          {
            q: 'NEVER say:',
            opts: [
              'better than',
              'more better than',
              'the best of',
              'worse than'
            ],
            ans: 1,
            why: 'Better is already comparative — "more better" is a double comparison (a top error).'
          },
          {
            q: '"She is as tall ______ her brother" — the missing word is:',
            opts: [
              'than',
              'as',
              'like',
              'so'
            ],
            ans: 1,
            why: 'Equal comparison = as ... as: as tall as.'
          }
        ]
      },
      {
        id: 'a2-2-3',
        title: 'there is / there are & Places in Town',
        tag: 'grammar',
        icon: 'roadmap',
        mins: 12,
        xp: 12,
        objective: 'Say what exists in a place and describe a town or neighbourhood.',
        teach: [
          'There is = one thing exists; there are = many exist: "There is a bank on the corner." "There are two schools nearby." The verb matches the noun that follows.',
          'Questions and negatives flip it: "Is there a pharmacy here?" "There is not (isn\'t) a pool." "Are there any parks? — Yes, there are."',
          'Town places: bank, school, hospital, pharmacy, market, supermarket, post office, mosque, park, restaurant, café, bus station. Learn them in pairs: "the market next to the bus station".',
          'Describe your own town in a formula: What + how many + where. "There is a big market in the centre and there are two parks near my house."',
          'Rami tip: count the places within five minutes of your home in English: "There is a bakery, there are three shops..." Existence grammar is a map of your life.'
        ],
        examples: [
          {
            en: 'There is a cinema opposite the station.',
            note: 'One thing: There is + a + place.'
          },
          {
            en: 'There are three cafés on this street.',
            note: 'Multiple: There are + number + place.'
          },
          {
            en: 'Is there a pharmacy near here? — Yes, there is one.',
            note: 'Question + short yes answer.'
          }
        ],
        words: [
          {
            w: 'pharmacy',
            ar: 'صيدلية',
            ex: 'There is a pharmacy next to the clinic.'
          },
          {
            w: 'market',
            ar: 'سوق',
            ex: 'The market is open every morning.'
          },
          {
            w: 'post office',
            ar: 'مكتب بريد',
            ex: 'Where is the nearest post office?'
          },
          {
            w: 'centre',
            ar: 'مركز',
            ex: 'The library is in the town centre.'
          }
        ],
        quiz: [
          {
            q: 'Correct: "______ a hospital near the station."',
            opts: [
              'There is',
              'There are',
              'Is there',
              'Are there'
            ],
            ans: 0,
            why: 'One hospital → There is.'
          },
          {
            q: 'Correct: "______ two bakeries on this road."',
            opts: [
              'There is',
              'There are',
              'It is',
              'This are'
            ],
            ans: 1,
            why: 'Two bakeries (plural) → There are.'
          },
          {
            q: 'The correct question is:',
            opts: [
              '"Is there a mosque here?"',
              '"Are there a mosque?"',
              '"There is mosque?"',
              '"Is a mosque here?"'
            ],
            ans: 0,
            why: 'Question: Is + there + a + noun.'
          },
          {
            q: 'A complete town description starts with:',
            opts: [
              '"there is a market in the centre"',
              '"the market in centre is"',
              '"market centre there"',
              '"there market centre"'
            ],
            ans: 0,
            why: 'There is/are + place + position is the natural opener.'
          }
        ]
      },
      {
        id: 'a2-2-4',
        title: 'Describing a Person',
        tag: 'speaking',
        icon: 'speak',
        mins: 12,
        xp: 12,
        objective: 'Describe anyone — appearance, personality and life — in structured English.',
        teach: [
          'The three-layer description: appearance (their look), personality (their character), and life (what they do). Answer Layers in exactly this order and you never run dry.',
          'Appearance words: tall, short, medium height; long/short hair, curly/straight hair; glasses; young, middle-aged, elderly. Keep it simple — accuracy beats exotic words.',
          'Personality words: kind, generous, funny, serious, patient, hard-working, shy, confident, friendly, honest. Back every one with a tiny example: "She is generous — she shares everything."',
          'Life layer: job, studies, hobbies, family. "My father is an engineer. He works long hours, but he still finds time for us."',
          'Rami tip: describe one person you love in three sentences, one per layer. Your warmest topics produce your most fluent English.'
        ],
        examples: [
          {
            en: 'My brother is tall with short black hair.',
            note: 'Appearance in one clear sentence.'
          },
          {
            en: 'He is very patient and never loses his temper.',
            note: 'Personality + proof: patient, never angry.'
          },
          {
            en: 'He works as a teacher and loves football.',
            note: 'Life layer: job + interest.'
          }
        ],
        words: [
          {
            w: 'appearance',
            ar: 'مظهر خارجي',
            ex: 'Her appearance changes with her mood.'
          },
          {
            w: 'generous',
            ar: 'كريم',
            ex: 'He is generous with both money and time.'
          },
          {
            w: 'patient',
            ar: 'صبور',
            ex: 'A good teacher is always patient.'
          },
          {
            w: 'confident',
            ar: 'واثق',
            ex: 'She feels confident before exams.'
          }
        ],
        quiz: [
          {
            q: 'The best order to describe a person is:',
            opts: [
              'appearance → personality → life',
              'life → appearance → personality',
              'random facts',
              'only appearance'
            ],
            ans: 0,
            why: 'The three-layer method (look, character, life) is the natural exam shape.'
          },
          {
            q: 'An appearance word is:',
            opts: [
              'generous',
              'tall',
              'patient',
              'honest'
            ],
            ans: 1,
            why: 'Tall describes physical appearance; the rest are personality.'
          },
          {
            q: '"She is generous, so she shares her lunch." This proves:',
            opts: [
              'her appearance',
              'her personality with an example',
              'her job',
              'her age'
            ],
            ans: 1,
            why: 'A behaviour example backs up a personality claim.'
          },
          {
            q: 'The strongest personality sentence is:',
            opts: [
              '"He is very good."',
              '"He is patient — he waits calmly for everyone."',
              '"He is nice, you know."',
              '"He good man."'
            ],
            ans: 1,
            why: 'Personality + proof makes it vivid and credible.'
          }
        ]
      }
    ]
  },
  {
    id: 'a2-past',
    title: 'The Past',
    icon: 'write',
    desc: 'Tell stories safely in the past: was/were, regular and irregular verbs, and describing past events.',
    lessons: [
      {
        id: 'a2-3-1',
        title: 'Past Simple: was / were',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 12,
        objective: 'Use was and were to describe people and places in the past.',
        teach: [
          'The past of "to be" has only two forms: WAS (I, he, she, it) and WERE (you, we, they). "I was happy." "They were tired." Two forms — the simplest past in English.',
          'Negatives: was not (wasn\'t), were not (weren\'t): "The shops were not open." "She wasn\'t at home." Questions flip: "Were you at school?" "Was it cold?"',
          'It is the memory tense: "When I was a child, the streets were quieter." Children, old places, past moods — all live in was/were.',
          'Linking the past to feeling: "I was excited about my first trip." Excitement about past events = was + happy adjective.',
          'Rami tip: write three past sentences about your childhood today. "I was small, my room was blue, my friends were fast." Fill the memory with was/were.'
        ],
        examples: [
          {
            en: 'I was at the library all morning.',
            note: 'I + was + place.'
          },
          {
            en: 'They were proud of their results.',
            note: 'They + were + adjective.'
          },
          {
            en: 'Was the weather nice yesterday? — Yes, it was sunny.',
            note: 'Question + short answer with was.'
          }
        ],
        words: [
          {
            w: 'was',
            ar: 'كان (مفرد)',
            ex: 'It was a beautiful evening.'
          },
          {
            w: 'were',
            ar: 'كانوا',
            ex: 'We were young then.'
          },
          {
            w: 'ago',
            ar: 'منذ',
            ex: 'Two years ago, I was a student.'
          },
          {
            w: 'yesterday',
            ar: 'أمس',
            ex: 'Yesterday was a busy day.'
          }
        ],
        quiz: [
          {
            q: 'Complete: "I ______ at home last night."',
            opts: [
              'was',
              'were',
              'am',
              'be'
            ],
            ans: 0,
            why: 'I always takes was in the past.'
          },
          {
            q: 'Complete: "You ______ very kind to help."',
            opts: [
              'was',
              'were',
              'is',
              'are'
            ],
            ans: 1,
            why: 'You takes were in the past.'
          },
          {
            q: 'The correct negative is:',
            opts: [
              '"She wasn\'t ready."',
              '"She weren\'t ready."',
              '"She not was ready."',
              '"She was no ready."'
            ],
            ans: 0,
            why: 'Wasn\'t is the contraction of was not.'
          },
          {
            q: 'The correct question is:',
            opts: [
              '"Were they at school?"',
              '"Was they at school?"',
              '"They were at school?"',
              '"They was at school?"'
            ],
            ans: 0,
            why: 'Question: Were + they + place?'
          }
        ]
      },
      {
        id: 'a2-3-2',
        title: 'Past Simple: Regular Verbs',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 12,
        objective: 'Describe finished actions with regular past simple verbs and -ed.',
        teach: [
          'Regular past = add -ed to the base: work → worked, play → played, open → opened. Finished times trigger it: yesterday, last week, in 2010, an hour ago.',
          'Spelling traps: verbs ending in -e just add -d (live → lived); consonant + y becomes -ied (study → studied); a short vowel + consonant doubles (stop → stopped, plan → planned).',
          'Pronunciation of -ed has three sounds: /t/ (worked), /d/ (played), /Id/ (wanted). Roughly: silent after k/p/f/s — voiced after vowels and -l,-n,-g — "ed" as a syllable after t/d.',
          'Questions and negatives hand the job to DID: "Did you work?" "I did not work." The main verb stays base (worked? No — "did you work", not "did you worked").',
          'Rami tip: yesterday-test every hook you write today: if it happened yesterday, it takes -ed. The date decides the verb.'
        ],
        examples: [
          {
            en: 'I studied for three hours last night.',
            note: 'Study → studied: consonant + y becomes -ied.'
          },
          {
            en: 'She planned her trip in March.',
            note: 'Plan → planned: double the final consonant.'
          },
          {
            en: 'Did they book the hotel? — Yes, they booked it.',
            note: 'Question with did + base verb; answer with -ed.'
          }
        ],
        words: [
          {
            w: 'last week',
            ar: 'الأسبوع الماضي',
            ex: 'I visited my grandmother last week.'
          },
          {
            w: 'booked',
            ar: 'حجز',
            ex: 'We booked a table for Friday.'
          },
          {
            w: 'studied',
            ar: 'درس',
            ex: 'He studied law in Jerusalem.'
          },
          {
            w: 'happened',
            ar: 'حدث',
            ex: 'What happened yesterday?'
          }
        ],
        quiz: [
          {
            q: 'The past of "study" is:',
            opts: [
              'studyed',
              'studied',
              'studyd',
              'studd'
            ],
            ans: 1,
            why: 'Consonant + y → -ied: studied.'
          },
          {
            q: 'The past of "plan" is:',
            opts: [
              'planed',
              'planned',
              'plannedd',
              'plans'
            ],
            ans: 1,
            why: 'Short vowel + consonant doubles: planned.'
          },
          {
            q: '"Did she worked yesterday?" is:',
            opts: [
              'correct',
              'wrong — "Did she work yesterday?"',
              'correct only in questions',
              'future tense'
            ],
            ans: 1,
            why: 'After "did", the main verb stays base: did she work.'
          },
          {
            q: 'Which time word forces the past simple?',
            opts: [
              'tomorrow',
              'yesterday',
              'now',
              'usually'
            ],
            ans: 1,
            why: 'Yesterday is a finished past time → past simple.'
          }
        ]
      },
      {
        id: 'a2-3-3',
        title: 'Past Simple: Irregular Verbs',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 12,
        objective: 'Master the 20 most useful irregular verbs in the past.',
        teach: [
          'Irregular verbs do not take -ed — they change their shape: go → went, see → saw, eat → ate, come → came, buy → bought, take → took, make → made, have → had.',
          'The 20 most useful for IELTS: go/went, have/had, do/did, say/said, see/saw, make/made, come/came, take/took, know/knew, get/got, give/gave, find/found, think/thought, tell/told, buy/bought, eat/ate, drink/drank, write/wrote, read/read, run/ran.',
          'Read is the trickiest: the spelling never changes, but the sound does — "red" in the past. "I read a book yesterday" sounds like "red".',
          'Storytelling glue: "Yesterday I got up, made coffee, went to work, saw my friend, and ate lunch with him." Irregular past verbs ARE the story.',
          'Rami tip: a mini-story in five irregular verbs every evening: "I got up... I went... I saw... I bought... I ate." Repetition builds the shapes.'
        ],
        examples: [
          {
            en: 'I went to the mountains last summer.',
            note: 'Go → went: a complete shape change.'
          },
          {
            en: 'She bought a new laptop on Monday.',
            note: 'Buy → bought: watch the -ought spelling.'
          },
          {
            en: 'We ate dinner and then saw a film.',
            note: 'A story chain: ate, then saw.'
          }
        ],
        words: [
          {
            w: 'went',
            ar: 'ذهب',
            ex: 'We went to the beach.'
          },
          {
            w: 'saw',
            ar: 'رأى',
            ex: 'I saw an old friend in the market.'
          },
          {
            w: 'took',
            ar: 'أخذ',
            ex: 'He took the train to Jaffa.'
          },
          {
            w: 'wrote',
            ar: 'كتب',
            ex: 'She wrote a long letter.'
          }
        ],
        quiz: [
          {
            q: 'The past of "go" is:',
            opts: [
              'goed',
              'went',
              'gone',
              'goad'
            ],
            ans: 1,
            why: 'Go is irregular: went.'
          },
          {
            q: 'The past of "buy" is:',
            opts: [
              'buied',
              'bought',
              'buyed',
              'brought'
            ],
            ans: 1,
            why: 'Buy → bought (and bring → brought — different verbs!).'
          },
          {
            q: '"I read a book yesterday" — the past read sounds like:',
            opts: [
              'reed',
              'red',
              'readed',
              'r-e-d-ay'
            ],
            ans: 1,
            why: 'The past "read" is spelled the same but pronounced "red".'
          },
          {
            q: 'The correct past sentence is:',
            opts: [
              '"She taked the bus."',
              '"She took the bus."',
              '"She taken the bus."',
              '"She takes the bus."'
            ],
            ans: 1,
            why: 'Take → took in the past.'
          }
        ]
      },
      {
        id: 'a2-3-4',
        title: 'Describing a Past Holiday',
        tag: 'speaking',
        icon: 'write',
        mins: 15,
        xp: 12,
        objective: 'Tell a complete past experience story: where, when, what you did, and how you felt.',
        teach: [
          'The story skeleton: When + where + who + what + feeling. "Last summer, I went to the coast with my family. We stayed in a small hotel, swam every day, and I felt truly relaxed."',
          'Give your story a time anchor in the first sentence: last summer, two years ago, last Eid. The listener instantly knows the tense and the timeline.',
          'Sequence with time words: first, then, after that, suddenly, finally. "First we took the bus; then we found our hotel; after that we walked to the sea."',
          'End with a feeling or a lesson: "It was the best trip because I got to know my cousins better." Feelings make stories memorable — never end flat.',
          'Rami tip: write YOUR last holiday in four sentences using the skeleton above. Your own story is your best Band-currency.'
        ],
        examples: [
          {
            en: 'Last summer, I visited the coast with my cousins.',
            note: 'Time anchor + who + where in sentence one.'
          },
          {
            en: 'First we took a bus, then we swam all afternoon.',
            note: 'Sequence: first ... then ...'
          },
          {
            en: 'I felt so relaxed that I did not want to come back!',
            note: 'Feeling + the natural exaggeration of a good memory.'
          }
        ],
        words: [
          {
            w: 'abroad',
            ar: 'الخارج',
            ex: 'He travelled abroad for work.'
          },
          {
            w: 'spent',
            ar: 'قضى/أنفق',
            ex: 'We spent two weeks by the sea.'
          },
          {
            w: 'exciting',
            ar: 'مثير',
            ex: 'The city tour was really exciting.'
          },
          {
            w: 'relaxed',
            ar: 'مرتاح',
            ex: 'I felt completely relaxed there.'
          }
        ],
        quiz: [
          {
            q: 'The strongest first sentence for a holiday story is:',
            opts: [
              '"Last summer, I visited the coast with my family."',
              '"Holiday."',
              '"I was very happy in the place that I went."',
              '"Yesterday I sleep."'
            ],
            ans: 0,
            why: 'Time + action + who + where = the clear story anchor.'
          },
          {
            q: 'The correct story sequence marker is:',
            opts: [
              'first → then → after that',
              'because → but',
              'at → on',
              'which → whose'
            ],
            ans: 0,
            why: 'First, then, after that order events in time.'
          },
          {
            q: 'A good story ends with:',
            opts: [
              'a feeling or lesson',
              'the definition of a word',
              'the alphabet',
              'nothing'
            ],
            ans: 0,
            why: 'Ending with a feeling or insight makes the story memorable.'
          },
          {
            q: 'Which sentence uses the past correctly?',
            opts: [
              '"We goed to the beach."',
              '"We went to the beach."',
              '"We gone to the beach."',
              '"We gos to the beach."'
            ],
            ans: 1,
            why: 'Go in the past = went.'
          }
        ]
      }
    ]
  },
  {
    id: 'a2-plans',
    title: 'Plans & Travel',
    icon: 'roadmap',
    desc: 'Talk about the future with going to and will, and survive travel: transport, booking and asking.',
    lessons: [
      {
        id: 'a2-4-1',
        title: 'Future: going to',
        tag: 'grammar',
        icon: 'roadmap',
        mins: 12,
        xp: 12,
        objective: 'Talk about plans with going to + base verb.',
        teach: [
          'Going to = plans and intentions: am/is/are + going to + base verb. "I am going to study medicine." It names the plan BEFORE it happens.',
          'Match the helper: I am going to, he/she/it is going to, you/we/they are going to: "We are going to travel next week."',
          'Negatives and questions: "I am not going to sleep late." "Are you going to attend the course? — Yes, I am." The helper flips for questions.',
          'Contrast with present continuous for plans: both work for arrangements! "I am meeting him tomorrow" ≈ "I am going to meet him tomorrow." Going to is more about intention, continuous about appointment.',
          'Rami tip: announce two real plans right now: "I am going to finish this unit. I am going to practise speaking at 7." Plans + English = a better tomorrow.'
        ],
        examples: [
          {
            en: 'I am going to apply for a scholarship.',
            note: 'Am + going to + base verb apply.'
          },
          {
            en: 'They are going to move to a bigger flat.',
            note: 'They + are + going to + move.'
          },
          {
            en: 'Are you going to take the test in June? — Yes, I am.',
            note: 'Question + short answer.'
          }
        ],
        words: [
          {
            w: 'plan',
            ar: 'خطة',
            ex: 'My plan is to study abroad.'
          },
          {
            w: 'intend',
            ar: 'ينوي',
            ex: 'I intend to improve my speaking.'
          },
          {
            w: 'next month',
            ar: 'الشهر القادم',
            ex: 'We are going to visit family next month.'
          },
          {
            w: 'goal',
            ar: 'هدف',
            ex: 'My goal is a strong band score.'
          }
        ],
        quiz: [
          {
            q: 'Correct: "I ______ going to buy a laptop."',
            opts: [
              'am',
              'is',
              'are',
              'be'
            ],
            ans: 0,
            why: 'I takes am before going to.'
          },
          {
            q: 'Correct: "She ______ going to start a course."',
            opts: [
              'am',
              'is',
              'are',
              'be'
            ],
            ans: 1,
            why: 'She takes is: she is going to start.'
          },
          {
            q: 'The correct question is:',
            opts: [
              '"Are you going to stay?"',
              '"You is going to stay?"',
              '"Are you go to stay?"',
              '"Will going to stay?"'
            ],
            ans: 0,
            why: 'Are + subject + going to + base verb.'
          },
          {
            q: '"Going to" is used for:',
            opts: [
              'plans and intentions',
              'finished actions',
              'facts about the past',
              'commands'
            ],
            ans: 0,
            why: 'Going to names future plans and intentions.'
          }
        ]
      },
      {
        id: 'a2-4-2',
        title: 'Future: will & Predictions',
        tag: 'grammar',
        icon: 'spark',
        mins: 12,
        xp: 12,
        objective: 'Use will for spontaneous decisions, promises and predictions.',
        teach: [
          'Will + base verb = future decisions at the moment, promises, and predictions: "I will help you." "It will rain tomorrow." Keep the base verb after will — "will helps" is wrong, always "will help".',
          'Contractions are your speaking friend: I\'ll, you\'ll, he\'ll, she\'ll, it\'ll, we\'ll, they\'ll — and negatives won\'t, shan\'t. "I\'ll call you later."',
          'Will for offers: "I will open the door for you." Will for promises: "I will never forget this." Will for predictions: "The future will be digital."',
          'Decision vs plan: A NEW decision = will; A PRIOR plan = going to. "A: There is no coffee! B: I will buy some." (spontaneous) vs "I am going to buy coffee." (already decided).',
          'Rami tip: predict your own tomorrow now with will: "Tomorrow I will wake at 6, will study, and will rest in the evening." Prediction practice sharpens fluency.'
        ],
        examples: [
          {
            en: 'I will help you carry these bags.',
            note: 'Will + base verb = offer/decision on the spot.'
          },
          {
            en: 'It will probably rain this evening.',
            note: 'Will + probably = a hedged prediction.'
          },
          {
            en: 'I\'ll call you as soon as I arrive.',
            note: 'Contraction I\'ll + base verb call.'
          }
        ],
        words: [
          {
            w: 'promise',
            ar: 'وعد',
            ex: 'I promise I will be there.'
          },
          {
            w: 'probably',
            ar: 'على الأرجح',
            ex: 'He will probably pass.'
          },
          {
            w: 'soon',
            ar: 'قريباً',
            ex: 'The results will come out soon.'
          },
          {
            w: 'tomorrow',
            ar: 'غداً',
            ex: 'I will see you tomorrow.'
          }
        ],
        quiz: [
          {
            q: '"I will helps you" is:',
            opts: [
              'correct',
              'wrong — "I will help you"',
              'past tense',
              'formal English'
            ],
            ans: 1,
            why: 'Will always takes the base verb: will help.'
          },
          {
            q: 'A spontaneous decision uses:',
            opts: [
              'will',
              'was',
              'has',
              'did'
            ],
            ans: 0,
            why: 'Will marks decisions made in the moment.'
          },
          {
            q: 'The contraction of "I will" is:',
            opts: [
              'I\'ll',
              'I\'l',
              'Il',
              'I will\'t'
            ],
            ans: 0,
            why: 'I\'ll = I will.'
          },
          {
            q: 'The natural prediction is:',
            opts: [
              '"It will probably rain."',
              '"It will rains."',
              '"Will it rains."',
              '"It raining will."'
            ],
            ans: 0,
            why: 'Will + probably + base verb: it will probably rain.'
          }
        ]
      },
      {
        id: 'a2-4-3',
        title: 'Transport & Travel Words',
        tag: 'vocab',
        icon: 'roadmap',
        mins: 12,
        xp: 12,
        objective: 'Arrive anywhere: buses, trains, taxis, tickets and travel questions.',
        teach: [
          'Transport basics: bus, bus stop, bus station, train, train station/railway, taxi, car, plane, airport, ferry, bicycle. Group them by "where they operate": road, rail, air, sea.',
          'Ticket language: a single ticket, a return ticket, a one-way ticket, first class, a platform, to catch/board, to get off. "Two single tickets to Ramallah, please."',
          'The questions of travel: "When does the bus leave?" "What platform does the train go from?" "How long does it take?" "How much is a ticket?" All follow the same polite formula: question word + does + subject + verb.',
          '"How long does it take?" is the question learners forget — memorise it: answer with time: "It takes about one hour."',
          'Rami tip: rehearse your own daily commute in English: "I take the bus at 7, get off at the station, and walk ten minutes." Your city is your vocabulary class.'
        ],
        examples: [
          {
            en: 'A single ticket to the centre, please.',
            note: 'One direction: a single ticket.'
          },
          {
            en: 'What platform does the train leave from?',
            note: 'The exact platform question.'
          },
          {
            en: 'It takes about forty minutes by road.',
            note: 'The classic answered time question.'
          }
        ],
        words: [
          {
            w: 'platform',
            ar: 'رصيف القطار',
            ex: 'The train leaves from platform three.'
          },
          {
            w: 'ticket',
            ar: 'تذكرة',
            ex: 'I bought a ticket online.'
          },
          {
            w: 'journey',
            ar: 'رحلة/مشوار',
            ex: 'The journey took five hours.'
          },
          {
            w: 'arrive',
            ar: 'يصل',
            ex: 'We arrive at noon.'
          }
        ],
        quiz: [
          {
            q: 'A ticket for both directions (go and return) is:',
            opts: [
              'single',
              'return',
              'monthly',
              'first'
            ],
            ans: 1,
            why: 'A return ticket covers go and come back.'
          },
          {
            q: '"How long does it take?" asks about:',
            opts: [
              'price',
              'time needed',
              'the driver',
              'the colour'
            ],
            ans: 1,
            why: '"How long" = duration in time.'
          },
          {
            q: 'Correct: "The bus ______ from platform two."',
            opts: [
              'leaves',
              'leave',
              'leaving',
              'will leaves'
            ],
            ans: 0,
            why: 'The bus (3rd person singular) → leaves.'
          },
          {
            q: 'The polite way to buy transport tickets is:',
            opts: [
              '"Two tickets, please."',
              '"Ticket now."',
              '"Give two."',
              '"I am want tickets."'
            ],
            ans: 0,
            why: 'Number + tickets + please is short, clear and polite.'
          }
        ]
      },
      {
        id: 'a2-4-4',
        title: 'Booking & Ordering',
        tag: 'speaking',
        icon: 'speak',
        mins: 12,
        xp: 12,
        objective: 'Book a table or a room, confirm details, and make arrangements over the phone.',
        teach: [
          'Booking = polite intention + details: "I would like to book a table for tonight, please." "I\'d like to reserve a room for two nights."',
          'Give every piece of information calmly: your name, the date, the time, the number of people. Spell your name — it is the most-asked detail in IELTS Listening.',
          'Confirm like a professional: "That is a table for four at 7:30 on Friday for Omar, is that right?" "Yes, that is correct." Confirmation halves the risk of mistakes.',
          'Handle changes politely: "Could I change the time to 8?" "I am sorry, do you have a table outside?" Requests with could = smooth service English.',
          'Rami tip: act out a phone booking with yourself: you call, you give details, you confirm, you hang up. Scripting the routine makes it automatic.'
        ],
        examples: [
          {
            en: 'I would like to reserve a table for four, please.',
            note: 'Booking + number of people + please.'
          },
          {
            en: 'That is for Omar, spelled O-M-A-R, at 8 o\'clock.',
            note: 'Spelling your name = the professional touch.'
          },
          {
            en: 'Could I change the reservation to Friday?',
            note: 'Could + change request = polite.'
          }
        ],
        words: [
          {
            w: 'reserve / book',
            ar: 'يَحجز',
            ex: 'We reserved a room with a sea view.'
          },
          {
            w: 'available',
            ar: 'متاح',
            ex: 'Is a table available at 9?'
          },
          {
            w: 'confirm',
            ar: 'يؤكد',
            ex: 'Please confirm the date by email.'
          },
          {
            w: 'arrangement',
            ar: 'ترتيب',
            ex: 'Let us fix the arrangements now.'
          }
        ],
        quiz: [
          {
            q: 'The correct booking opener is:',
            opts: [
              '"I would like to book a table for two, please."',
              '"Book now table."',
              '"I book."',
              '"Table please you."'
            ],
            ans: 0,
            why: 'Polite intention + detail (table for two) + please.'
          },
          {
            q: '"Could I change the time to 8?" is:',
            opts: [
              'aggressive',
              'a polite request',
              'a command',
              'incorrect English'
            ],
            ans: 1,
            why: 'Could + request = polite and standard.'
          },
          {
            q: 'When confirming your name on the phone, you:',
            opts: [
              'speak faster',
              'spell it letter by letter',
              'say only the first letter',
              'guess'
            ],
            ans: 1,
            why: 'Spelling the name (O-M-A-R) is the professional habit.'
          },
          {
            q: '"Is there a table available at 9?" asks about:',
            opts: [
              'the price',
              'availability at a time',
              'the menu',
              'the location'
            ],
            ans: 1,
            why: 'Available = free/open for you at that time.'
          }
        ]
      }
    ]
  },
  {
    id: 'a2-communication',
    title: 'Communication Skills',
    icon: 'chat',
    desc: 'Phones, invitations, requests and linked sentences — the glue of real conversation.',
    lessons: [
      {
        id: 'a2-5-1',
        title: 'Phone English',
        tag: 'speaking',
        icon: 'chat',
        mins: 12,
        xp: 12,
        objective: 'Start, hold, and end telephone conversations clearly and professionally.',
        teach: [
          'Open with identification and intent: "Hello, this is Omar. I am calling about the course." Never say "I am Omar" on the phone — say "this is".',
          'The key transfer requests: "Could I speak to Mr Khalil, please?" "Is Nour available?" "Can I leave a message?" Three phrases cover 80% of phone life.',
          'Deal with difficulty: "Sorry, the line is bad. Could you speak loudly, please?" "Could you repeat that?" Honesty about the connection is natural.',
          'End with intent and thanks: "Thanks for your time. I will email you the details." A clear next step ends any call professionally.',
          'Rami tip: rehearse one imaginary call today — you call a school, ask for a brochure, leave your name. Telephone English is scripted, so script it.'
        ],
        examples: [
          {
            en: 'Hello, this is Rami. May I speak to the manager?',
            note: 'Identify with "this is", then state your request.'
          },
          {
            en: 'Could I leave a message, please?',
            note: 'The golden message phrase.'
          },
          {
            en: 'Thanks for your help. I will send the form today.',
            note: 'Thanks + a clear next step closes well.'
          }
        ],
        words: [
          {
            w: 'call',
            ar: 'يتصل',
            ex: 'I will call you tonight.'
          },
          {
            w: 'message',
            ar: 'رسالة',
            ex: 'Leave a message if I miss your call.'
          },
          {
            w: 'available',
            ar: 'متفرغ',
            ex: 'She is not available right now.'
          },
          {
            w: 'hold on',
            ar: 'انتظر (بالهاتف)',
            ex: 'Hold on, please, while I check.'
          }
        ],
        quiz: [
          {
            q: 'The correct phone opener is:',
            opts: [
              '"This is Omar calling."',
              '"I am Omar calling."',
              '"Omar is me."',
              '"Here Omar."'
            ],
            ans: 0,
            why: 'On the phone, identify yourself with "this is".'
          },
          {
            q: 'To speak to someone on the phone, say:',
            opts: [
              '"Could I speak to Mr Khalil, please?"',
              '"Give me Mr Khalil."',
              '"I want speak."',
              '"Where is Mr Khalil now?"'
            ],
            ans: 0,
            why: '"Could I speak to...?" is the polite standard.'
          },
          {
            q: 'If the line is bad, the honest phrase is:',
            opts: [
              '"Sorry, the line is bad. Could you repeat that?"',
              '"Bad."',
              '"Speak big."',
              'Silence'
            ],
            ans: 0,
            why: 'Naming the problem + asking politely = clear communication.'
          },
          {
            q: 'A professional way to end a call is:',
            opts: [
              '"Thanks. I will email the details."',
              '"Bye." and hang up',
              '"Done."',
              'No closing'
            ],
            ans: 0,
            why: 'Thanks + a clear next step ends on a positive note.'
          }
        ]
      },
      {
        id: 'a2-5-2',
        title: 'Invitations & Arrangements',
        tag: 'speaking',
        icon: 'chat',
        mins: 12,
        xp: 12,
        objective: 'Invite, accept, decline, and fix meeting arrangements politely.',
        teach: [
          'Invite with warmth: "Would you like to come to my place on Friday?" "How about a coffee after class?" Two invite forms: would you like (formal-ish) and how about (friendly).',
          'Accept with enthusiasm: "I would love to!" "Great idea, count me in!" Add a detail to prove it: "I\'d love to — I am free at six."',
          'Decline WITHOUT hurting: "That sounds lovely, but I am afraid I am busy." "Thanks for asking, but I have another plan." Apologise + thank + give a soft reason = perfect decline.',
          'Fix details after accepting: "Shall we meet at the café at seven?" "What about Saturday instead?" Shall we = a gentle suggestion.',
          'Rami tip: invite a friend (in English!) to a real or imaginary event today. Your social life is your best grammar drill.'
        ],
        examples: [
          {
            en: 'Would you like to join us for dinner on Friday?',
            note: 'Formal-friendly invitation: would you like + to + verb.'
          },
          {
            en: 'I would love to! What time shall we meet?',
            note: 'Enthusiastic accept + fixing the time.'
          },
          {
            en: 'Thanks for the invitation, but I am afraid I have another arrangement.',
            note: 'Soft decline: thank + apologise + reason.'
          }
        ],
        words: [
          {
            w: 'invite',
            ar: 'يدعو',
            ex: 'They invited the whole class.'
          },
          {
            w: 'join',
            ar: 'ينضم',
            ex: 'Do you want to join us?'
          },
          {
            w: 'arrangement',
            ar: 'ترتيب',
            ex: 'Let me check my arrangement.'
          },
          {
            w: 'suggestion',
            ar: 'اقتراح',
            ex: 'That is a good suggestion.'
          }
        ],
        quiz: [
          {
            q: 'The most natural invitation is:',
            opts: [
              '"Would you like to come for coffee?"',
              '"You come coffee."',
              '"Come now."',
              '"Coffee with me yes."'
            ],
            ans: 0,
            why: 'Would you like + to + verb = a natural polite invitation.'
          },
          {
            q: 'The best acceptance is:',
            opts: [
              '"I would love to!"',
              '"Okay."',
              '"Maybe, I do not know."',
              '"If I want."'
            ],
            ans: 0,
            why: '"I would love to" is warm and clear.'
          },
          {
            q: 'A kind decline includes:',
            opts: [
              'thanks + a soft reason',
              'a long criticism',
              'silence',
              'a new invitation'
            ],
            ans: 0,
            why: 'Thank them and give a gentle reason — never just say no.'
          },
          {
            q: 'To suggest a meeting time, say:',
            opts: [
              '"Shall we meet at seven?"',
              '"Meet seven."',
              '"We meeting seven yes?"',
              'All of the above'
            ],
            ans: 0,
            why: '"Shall we...?" is the natural gentle suggestion.'
          }
        ]
      },
      {
        id: 'a2-5-3',
        title: 'Polite Requests & Offers',
        tag: 'speaking',
        icon: 'speak',
        mins: 12,
        xp: 12,
        objective: 'Ask for help and offer help with the right level of politeness.',
        teach: [
          'The politeness ladder from direct to gentle: "Open the window." (command) → "Please open the window." → "Could you open the window, please?" → "Would you mind opening the window?"',
          'Asking for things: "Could I have...?" "Can you...?" "Do you mind if I...?" Match the level to the situation: friends are direct, strangers are gentle.',
          'Offering help: "Can I help you with that?" "Shall I open the door?" "Would you like some tea?" Offers always respect the other person\'s choice.',
          'The magic "would you mind" takes -ing: "Would you mind waiting a moment?" NEVER "would you mind to wait".',
          'Rami tip: today, soften every request you make. "Give it" becomes "Could you give it to me, please?" Gentleness is a language graduation.'
        ],
        examples: [
          {
            en: 'Could you pass the salt, please?',
            note: 'Could you + base verb = polite request.'
          },
          {
            en: 'Would you mind closing the window?',
            note: 'Would you mind + -ing verb.'
          },
          {
            en: 'Can I help you carry those bags?',
            note: 'Can I help + offer: a natural offer of help.'
          }
        ],
        words: [
          {
            w: 'offer',
            ar: 'يعرض',
            ex: 'She offered to drive me home.'
          },
          {
            w: 'mind',
            ar: 'يأبه/يعترض',
            ex: 'Do you mind if I sit here?'
          },
          {
            w: 'polite',
            ar: 'مهذب',
            ex: 'A polite question gets a better answer.'
          },
          {
            w: 'relaxed',
            ar: 'مرتاح/في جو مريح',
            ex: 'With friends, keep it relaxed.'
          }
        ],
        quiz: [
          {
            q: 'The most polite request is:',
            opts: [
              '"Would you mind helping me?"',
              '"Help me!"',
              '"You must help."',
              '"Help. Now."'
            ],
            ans: 0,
            why: '"Would you mind" is the gentlest on the ladder.'
          },
          {
            q: 'After "would you mind" we use:',
            opts: [
              'a verb + -ing',
              'the base verb',
              'the past verb',
              'very'
            ],
            ans: 0,
            why: 'Mind + -ing: "Would you mind waiting?"'
          },
          {
            q: 'A friendly offer of help is:',
            opts: [
              '"Can I help you with that?"',
              '"You need help!",",',
              '"Do help."',
              'None of the above'
            ],
            ans: 0,
            why: '"Can I help" = a respectful offer.'
          },
          {
            q: 'The correct sentence is:',
            opts: [
              '"Could you open the window, please?"',
              '"Could you to open the window?"',
              '"Could opening window?"',
              'All of the above'
            ],
            ans: 0,
            why: 'Could you + base verb + please.'
          }
        ]
      },
      {
        id: 'a2-5-4',
        title: 'Linking Words: and, but, or, so, because',
        tag: 'grammar',
        icon: 'grammar',
        mins: 12,
        xp: 12,
        objective: 'Join ideas into longer, natural sentences with five small connectors.',
        teach: [
          'Five connectors cover the basics: AND (two same things), BUT (contrast), OR (choice), SO (result), BECAUSE (reason). Each one glues two ideas into one sentence.',
          '"I was tired, so I slept early." (result) vs "I slept early because I was tired." (reason). SO and BECAUSE are two sides of the same coin — choose one per sentence.',
          'Contrast with BUT: "The hotel was small, but it was very clean." Opposites in one sentence = instant sophistication.',
          'Comma rules are simple here: with so and but, put a comma before them: "I wanted to go, but I had no time." With because, usually no comma.',
          'Rami tip: today, join your sentences. Instead of "I woke up. I drank tea." say "I woke up and I drank tea." Connectors double your sentence power.'
        ],
        examples: [
          {
            en: 'I studied hard, so I passed the test.',
            note: 'So = the result: passing follows the hard work.'
          },
          {
            en: 'She stayed home because the weather was terrible.',
            note: 'Because = the reason.'
          },
          {
            en: 'The flat is small, but it is very bright.',
            note: 'But = the surprise contrast.'
          }
        ],
        words: [
          {
            w: 'so',
            ar: 'لذلك',
            ex: 'It was late, so I took a taxi.'
          },
          {
            w: 'but',
            ar: 'لكن',
            ex: 'I like tea, but I prefer coffee in winter.'
          },
          {
            w: 'because',
            ar: 'لأن',
            ex: 'We cancelled because of the storm.'
          },
          {
            w: 'or',
            ar: 'أو',
            ex: 'Do you want tea or coffee?'
          }
        ],
        quiz: [
          {
            q: 'Choose the correct link: "I was hungry, ______ I made a sandwich."',
            opts: [
              'but',
              'so',
              'or',
              'and'
            ],
            ans: 1,
            why: 'Hunger → sandwich = a result: so.'
          },
          {
            q: 'Choose the correct link: "______ it was raining, we stayed in."',
            opts: [
              'Because',
              'But',
              'So',
              'Or'
            ],
            ans: 0,
            why: 'The rain is the reason → because.'
          },
          {
            q: 'The contrast sentence is:',
            opts: [
              '"It was late, so I slept."',
              '"The room was small, but it was cozy."',
              '"I drink tea and coffee."',
              '"Do you want tea or juice?"'
            ],
            ans: 1,
            why: 'But joins two opposite ideas: small vs cozy.'
          },
          {
            q: 'Correct punctuation before "but":',
            opts: [
              'a comma',
              'always a full stop',
              'never anything',
              'a question mark'
            ],
            ans: 0,
            why: '"..., but ..." — comma before the contrast connector.'
          }
        ]
      }
    ]
  }
];
