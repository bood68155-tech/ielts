/* ============================================================
   IELTS Master — test content data
   ============================================================ */

/* ---------------- LISTENING ---------------- */
const LISTENING_TEST = [
  {
    id: 1,
    title: 'Section 1 · Accommodation Booking',
    subtitle: 'Conversation between two people',
    type: 'conversation',
    script: [
      'WOMAN: Good morning, City Stay Accommodation Service. How can I help you?',
      'MAN: Hello, I\'m calling about the shared apartment you advertised on your website. Is it still available?',
      'WOMAN: Yes, it is. It\'s a two-bedroom flat on Maple Street, and the second bedroom is free from the first of next month. May I take some details?',
      'MAN: Of course. My name is Daniel Kowalski. That\'s K-O-W-A-L-S-K-I.',
      'WOMAN: Thank you, Mr Kowalski. And your current address, please?',
      'MAN: I\'m staying at 42 College Road, at the moment. That\'s in the Northwood area.',
      'WOMAN: Good. And can I have a contact number?',
      'MAN: Yes, my mobile is 07700 900 385.',
      'WOMAN: 07700 900 385 — thank you. Now, the rent is four hundred and eighty pounds per month, plus bills. That includes water and electricity, but internet is extra, at fifteen pounds a month.',
      'MAN: That sounds reasonable. Is there a deposit?',
      'WOMAN: Yes, one month\'s rent, which is refundable if you give a month\'s notice before moving out.',
      'MAN: And when could I move in?',
      'WOMAN: The flat will be ready from the first of July. Would you like to view it on the twenty-fifth of June at five thirty?',
      'MAN: Perfect. One more thing — is the flat near public transport?',
      'WOMAN: Yes, there\'s a bus stop just two minutes away, and the train station is about a fifteen-minute walk.',
      'MAN: Excellent. And what about parking?',
      'WOMAN: There is no parking space at the flat itself, but you can park on the street with a permit, which costs forty pounds a year from the council.',
      'MAN: That\'s fine. I don\'t actually own a car, so it\'s not a problem. Thank you very much for your help.',
      'WOMAN: You\'re welcome. We\'ll confirm the viewing by email. Goodbye.'
    ],
    questions: [
      { id: 'L1-1', type: 'fill', question: 'What is the man\'s surname?', answer: ['kowalski'], explanation: 'He spells his name: "Daniel Kowalski. That\'s K-O-W-A-L-S-K-I."' },
      { id: 'L1-2', type: 'fill', question: 'What is his current address? Write the road name and number.', answer: ['42 college road', 'college road 42', '42 college rd'], explanation: 'He is staying at 42 College Road in the Northwood area.' },
      { id: 'L1-3', type: 'fill', question: 'What is his mobile number?', answer: ['07700 900 385', '07700900385', '07700 900385'], explanation: 'He gives his mobile as 07700 900 385.' },
      { id: 'L1-4', type: 'fill', question: 'How much is the monthly rent? Write the amount in pounds.', answer: ['480', '£480', 'four hundred and eighty pounds'], explanation: 'The rent is four hundred and eighty pounds (£480) per month.' },
      { id: 'L1-5', type: 'mcq', question: 'What is included in the rent?', options: ['Water and electricity', 'Internet and electricity', 'All bills including internet', 'Gas and water'], answer: 'A', explanation: 'The woman says bills "includes water and electricity, but internet is extra."' },
      { id: 'L1-6', type: 'fill', question: 'How much does internet cost per month? Write the amount in pounds.', answer: ['15', '£15', 'fifteen pounds'], explanation: 'Internet is extra, at fifteen pounds (£15) a month.' },
      { id: 'L1-7', type: 'fill', question: 'How much is the deposit?', answer: ['one month\'s rent', '480', '£480', 'a month\'s rent', 'one month rent'], explanation: 'The deposit is one month\'s rent, refundable with a month\'s notice.' },
      { id: 'L1-8', type: 'fill', question: 'When can he move in? (date)', answer: ['1 july', '1st july', 'first july', 'first of july', '1 of july'], explanation: 'The flat will be ready from the first of July.' },
      { id: 'L1-9', type: 'mcq', question: 'When is the viewing arranged?', options: ['25 June at 5:30 pm', '25 July at 5:30 pm', '15 June at 5:00 pm', '20 June at 3:30 pm'], answer: 'A', explanation: 'The viewing is on the 25th of June at five thirty.' },
      { id: 'L1-10', type: 'mcq', question: 'What does the man say about parking?', options: ['He wants to park at the flat', 'He needs a permit', 'He does not have a car', 'The parking is free'], answer: 'C', explanation: 'He says: "I don\'t actually own a car, so it\'s not a problem."' }
    ]
  },
  {
    id: 2,
    title: 'Section 2 · Museum Tour',
    subtitle: 'Monologue — guided tour of a museum',
    type: 'monologue',
    script: [
      'GUIDE: Welcome, everyone, to the Riverside Museum of Science and Technology. My name is Sarah, and I\'ll be your guide for the next hour.',
      'GUIDE: Before we begin, a few practical points. Please keep your group together, and remember that photography is allowed in all areas except the main hall, where some of the exhibits are on loan from private collectors.',
      'GUIDE: We\'ll start in the Energy Gallery on the ground floor. This is our most popular display, and it features a working model of a nineteenth-century steam engine that visitors can operate twice a day — at eleven in the morning and again at three in the afternoon.',
      'GUIDE: The steam engine demonstration lasts about twenty minutes and is free, but you\'ll need to collect a ticket from the information desk because seating is limited to sixty people.',
      'GUIDE: From the Energy Gallery, we\'ll move upstairs to the Transport Gallery. The highlight here is the bicycle collection, which traces the development of the bicycle from the early wooden machines of the 1860s to the modern racing bikes of today.',
      'GUIDE: One of the most valuable items in the Transport Gallery is a 1930s motorcycle that was once owned by a famous racing champion. It\'s kept in a sealed glass case because the museum\'s insurance requires it to be displayed at a constant temperature.',
      'GUIDE: After the Transport Gallery, we\'ll visit the temporary exhibition, which this month is called "The Future of Food". It looks at how technology is changing the way we grow and prepare food, and it runs until the end of September.',
      'GUIDE: The museum shop is next to the main entrance and sells a range of books, models and souvenirs. If you spend more than twenty pounds, you\'ll get a ten percent discount with your entry ticket.',
      'GUIDE: There\'s also a café on the first floor. It\'s open until five o\'clock, and it\'s the only place in the museum where hot drinks are allowed.',
      'GUIDE: Finally, I\'d like to mention our evening lecture series. This month\'s talk is on Thursday evening at seven thirty, and it\'s about the history of space exploration. Tickets are available online or at the door.',
      'GUIDE: Now, if you have any questions, please feel free to ask as we walk. Shall we begin?'
    ],
    questions: [
      { id: 'L2-1', type: 'mcq', question: 'Where is photography not allowed?', options: ['The Transport Gallery', 'The main hall', 'The temporary exhibition', 'The café'], answer: 'B', explanation: 'Photography is allowed everywhere "except the main hall".' },
      { id: 'L2-2', type: 'mcq', question: 'What can visitors do in the Energy Gallery?', options: ['Ride a steam train', 'Operate a model steam engine', 'Watch a film about engines', 'Build a model engine'], answer: 'B', explanation: 'There is "a working model of a nineteenth-century steam engine that visitors can operate".' },
      { id: 'L2-3', type: 'fill', question: 'How long does the steam engine demonstration last? Write the number of minutes.', answer: ['20', 'twenty', 'twenty minutes'], explanation: 'The demonstration "lasts about twenty minutes".' },
      { id: 'L2-4', type: 'mcq', question: 'Why do visitors need a ticket for the demonstration?', options: ['It is very expensive', 'Seating is limited', 'It is only for children', 'It takes place off-site'], answer: 'B', explanation: 'You need a ticket "because seating is limited to sixty people".' },
      { id: 'L2-5', type: 'mcq', question: 'What is the highlight of the Transport Gallery?', options: ['The car collection', 'The bicycle collection', 'The aircraft display', 'The motorcycle collection'], answer: 'B', explanation: '"The highlight here is the bicycle collection."' },
      { id: 'L2-6', type: 'mcq', question: 'Why is the 1930s motorcycle kept in a sealed glass case?', options: ['It is too fragile to touch', 'Insurance requires a constant temperature', 'It is still being restored', 'It is on loan from another museum'], answer: 'B', explanation: 'It is kept sealed "because the museum\'s insurance requires it to be displayed at a constant temperature".' },
      { id: 'L2-7', type: 'fill', question: 'When does the temporary exhibition "The Future of Food" finish? (month)', answer: ['september', 'end of september'], explanation: 'The exhibition "runs until the end of September".' },
      { id: 'L2-8', type: 'mcq', question: 'What discount does the museum shop offer?', options: ['10% off for spending over £20', '20% off with an entry ticket', '10% off for groups', '15% off for members'], answer: 'A', explanation: '"If you spend more than twenty pounds, you\'ll get a ten percent discount with your entry ticket."' },
      { id: 'L2-9', type: 'mcq', question: 'Where can visitors get hot drinks?', options: ['The main hall', 'The museum shop', 'The café on the first floor', 'The Energy Gallery'], answer: 'C', explanation: 'The café is "the only place in the museum where hot drinks are allowed".' },
      { id: 'L2-10', type: 'fill', question: 'What is the subject of this month\'s evening lecture?', answer: ['space exploration', 'the history of space exploration'], explanation: 'The talk is "about the history of space exploration".' }
    ]
  },
  {
    id: 3,
    title: 'Section 3 · Research Project',
    subtitle: 'Discussion between two students and a tutor',
    type: 'discussion',
    script: [
      'TUTOR: Good morning, Anna, good morning, Tom. Sit down. How is the geography field project coming along?',
      'ANNA: Pretty well, actually. We\'ve chosen our topic — we\'re looking at how urban green spaces affect air quality in the city centre.',
      'TUTOR: That\'s a strong topic. What made you choose it?',
      'TOM: We read a study showing that tree cover can reduce local temperatures by up to three degrees in summer, and we wanted to test whether similar effects appear in our own city.',
      'TUTOR: Interesting. And how do you plan to collect your data?',
      'ANNA: We\'re going to use two methods. First, we\'ll take temperature and air quality readings at six locations — three parks and three busy streets — using portable sensors.',
      'TOM: And second, we\'ll interview residents to find out how they use the spaces and whether they\'ve noticed any differences. We\'re aiming for about thirty interviews.',
      'TUTOR: Thirty sounds achievable. Now, a word of caution: the sensors you\'re planning to use measure carbon dioxide and particulate matter, but they don\'t measure nitrogen dioxide, which is another key pollutant. You might want to note that as a limitation.',
      'TOM: Good point. We\'ll add that to our methodology section.',
      'TUTOR: What about the timeline? The final report is due on the fifteenth of May, isn\'t it?',
      'ANNA: Yes. We\'re planning to finish the data collection by the tenth of April, analyse the results over the following two weeks, and spend the first week of May writing up.',
      'TUTOR: That leaves a sensible amount of time for editing. Have you thought about how you\'ll present the findings?',
      'TOM: We\'re considering a bar chart for the temperature comparisons and a map showing the sensor locations. We thought a map would make the spatial pattern much clearer.',
      'TUTOR: A map is a good idea. Just make sure the scale is clear, or the reader won\'t be able to judge distances.',
      'ANNA: We will. We\'re also hoping to include a short video of one of our site visits, but we\'ll decide on that after the first week of data collection.',
      'TUTOR: Fine. And you\'ll need to get ethical approval for the interviews before you start, remember. It usually takes about a week, so apply as soon as possible.',
      'TOM: We\'ll do that this afternoon. Thanks for your time, Dr Evans.'
    ],
    questions: [
      { id: 'L3-1', type: 'mcq', question: 'What is the topic of the students\' project?', options: ['The effect of parks on local wildlife', 'Urban green spaces and air quality', 'Temperature differences between cities', 'Public attitudes to recycling'], answer: 'B', explanation: 'Anna says they are looking at "how urban green spaces affect air quality in the city centre".' },
      { id: 'L3-2', type: 'mcq', question: 'Why did the students choose this topic?', options: ['They read a study about tree cover and temperature', 'Their tutor suggested it', 'It was an easy topic to research', 'They saw a documentary about it'], answer: 'A', explanation: 'Tom says they read a study showing tree cover can reduce local temperatures.' },
      { id: 'L3-3', type: 'fill', question: 'How many locations will the students take readings at? Write the number.', answer: ['6', 'six'], explanation: 'They will take readings "at six locations — three parks and three busy streets".' },
      { id: 'L3-4', type: 'fill', question: 'How many interviews are the students aiming for? Write the number.', answer: ['30', 'thirty'], explanation: 'They are "aiming for about thirty interviews".' },
      { id: 'L3-5', type: 'mcq', question: 'What does the tutor warn that the sensors do NOT measure?', options: ['Carbon dioxide', 'Particulate matter', 'Nitrogen dioxide', 'Temperature'], answer: 'C', explanation: 'The sensors measure carbon dioxide and particulate matter but not nitrogen dioxide.' },
      { id: 'L3-6', type: 'mcq', question: 'When is the final report due?', options: ['10 April', '15 May', 'First week of May', '1 June'], answer: 'B', explanation: 'The tutor says "The final report is due on the fifteenth of May".' },
      { id: 'L3-7', type: 'mcq', question: 'When will the students finish data collection?', options: ['First week of May', '15 May', '10 April', '1 June'], answer: 'C', explanation: 'Anna says they plan to finish data collection "by the tenth of April".' },
      { id: 'L3-8', type: 'mcq', question: 'How will the students present their findings?', options: ['A line graph and a table', 'A bar chart and a map', 'A pie chart and a video', 'A table and a video'], answer: 'B', explanation: 'They are considering "a bar chart for the temperature comparisons and a map showing the sensor locations".' },
      { id: 'L3-9', type: 'mcq', question: 'What advice does the tutor give about the map?', options: ['Use bright colours', 'Include a clear scale', 'Show only parks', 'Add photographs'], answer: 'B', explanation: 'The tutor says "Just make sure the scale is clear".' },
      { id: 'L3-10', type: 'mcq', question: 'What do the students need before starting the interviews?', options: ['A research budget', 'Ethical approval', 'A new sensor', 'Permission from the council'], answer: 'B', explanation: 'The tutor reminds them they "need to get ethical approval for the interviews before you start".' }
    ]
  },
  {
    id: 4,
    title: 'Section 4 · Lecture on Urban Farming',
    subtitle: 'Academic lecture — notes completion',
    type: 'lecture',
    script: [
      'LECTURER: Good afternoon. Today I\'d like to talk about urban farming, and in particular, the question of whether growing food in cities can make a real contribution to feeding a growing global population.',
      'LECTURER: By 2050, it\'s estimated that almost seventy percent of the world\'s population will live in urban areas. That concentration of people creates both a challenge and an opportunity for food production.',
      'LECTURER: One of the main benefits of urban farming is the reduction in what we call "food miles" — the distance food travels from where it\'s produced to where it\'s consumed. In conventional agriculture, a head of lettuce can travel over a thousand miles before it reaches your plate, and much of that journey is powered by fossil fuels.',
      'LECTURER: A second benefit is that urban farms can make use of land that would otherwise be wasted. Rooftops, balconies, and even the spaces between buildings can be transformed into productive growing areas.',
      'LECTURER: However, there are also significant challenges. The most obvious is the lack of space, which limits the scale of production. But a more serious constraint is water. Many cities struggle with water shortages, and farming, even on a small scale, requires a reliable water supply.',
      'LECTURER: Another challenge is soil contamination. Urban soil is often polluted with heavy metals from decades of industrial activity, and this makes traditional soil-based farming risky. This is one reason why many urban farms have turned to hydroponics — growing plants in nutrient-rich water rather than soil.',
      'LECTURER: Hydroponic systems use up to ninety percent less water than traditional farming, and because the plants grow indoors, they can be harvested all year round, regardless of the season.',
      'LECTURER: A newer development is vertical farming, where crops are grown in stacked layers inside tall buildings. The largest vertical farm in the world currently operates in the United Arab Emirates, producing over a million kilograms of leafy greens a year.',
      'LECTURER: Critics point out that vertical farms are extremely energy-intensive, mainly because of the artificial lighting required. But as renewable energy becomes cheaper, the economics may change in their favour.',
      'LECTURER: So, to sum up: urban farming is unlikely to replace conventional agriculture, but it can play a valuable role in improving food security, particularly for fresh produce in densely populated cities. Thank you.'
    ],
    questions: [
      { id: 'L4-1', type: 'fill', question: 'What percentage of the world\'s population will live in urban areas by 2050? Write the number followed by %.', answer: ['70%', '70 percent', 'seventy percent', '70'], explanation: '"Almost seventy percent of the world\'s population will live in urban areas" by 2050.' },
      { id: 'L4-2', type: 'fill', question: 'What term describes the distance food travels to consumers?', answer: ['food miles'], explanation: 'The lecturer introduces the concept of "food miles".' },
      { id: 'L4-3', type: 'fill', question: 'In conventional agriculture, how far can a head of lettuce travel? Write the number of miles.', answer: ['1000', 'a thousand', 'one thousand', 'over a thousand'], explanation: 'A head of lettuce "can travel over a thousand miles before it reaches your plate".' },
      { id: 'L4-4', type: 'mcq', question: 'Which is mentioned as the more serious constraint on urban farming?', options: ['Lack of space', 'Water supply', 'High labour costs', 'Cold weather'], answer: 'B', explanation: 'The lecturer says "a more serious constraint is water".' },
      { id: 'L4-5', type: 'fill', question: 'What contaminates urban soil, according to the lecture?', answer: ['heavy metals'], explanation: 'Urban soil "is often polluted with heavy metals from decades of industrial activity".' },
      { id: 'L4-6', type: 'mcq', question: 'What is hydroponics?', options: ['Growing plants in stacked layers', 'Growing plants in nutrient-rich water', 'Growing plants in greenhouses', 'Growing plants without any water'], answer: 'B', explanation: 'Hydroponics means "growing plants in nutrient-rich water rather than soil".' },
      { id: 'L4-7', type: 'fill', question: 'How much less water do hydroponic systems use compared to traditional farming? Write the number followed by %.', answer: ['90%', '90 percent', 'ninety percent', '90'], explanation: '"Hydroponic systems use up to ninety percent less water than traditional farming."' },
      { id: 'L4-8', type: 'fill', question: 'In which country does the world\'s largest vertical farm operate?', answer: ['united arab emirates', 'uae', 'the uae', 'the united arab emirates'], explanation: 'The largest vertical farm operates in the United Arab Emirates.' },
      { id: 'L4-9', type: 'mcq', question: 'What is the main criticism of vertical farms?', options: ['They use too much land', 'They are energy-intensive', 'They produce poor quality food', 'They require too many workers'], answer: 'B', explanation: 'Critics say vertical farms "are extremely energy-intensive, mainly because of the artificial lighting required".' },
      { id: 'L4-10', type: 'mcq', question: 'What is the lecturer\'s overall conclusion?', options: ['Urban farming will replace conventional agriculture', 'Urban farming can improve food security for fresh produce in cities', 'Urban farming is too expensive to be useful', 'Urban farming only works in hot countries'], answer: 'B', explanation: 'Urban farming "can play a valuable role in improving food security, particularly for fresh produce in densely populated cities".' }
    ]
  }
];

/* ---------------- READING ---------------- */
const READING_TEST = [
  {
    id: 1,
    title: 'Passage 1 · The Rise of Remote Work',
    intro: 'Read the passage and answer questions 1–13.',
    paragraphs: [
      'For much of the twentieth century, the daily commute was an unchallenged part of professional life. Employees travelled to a central office, worked at a fixed desk, and returned home at the end of the day. The personal computer and the internet changed the tools people used, but they did not immediately change where they used them. It was not until the 2010s that advances in cloud computing, video conferencing and instant messaging made working from home a practical option for a significant number of workers.',
      'The first wave of widespread remote work was driven less by choice than by necessity. During the global health crisis of 2020, millions of employees were suddenly required to work from home. Many employers, expecting a sharp drop in productivity, were surprised to find that output often held steady — and in some cases improved. Surveys conducted during this period suggested that a majority of employees wanted to continue working remotely at least part of the time, and that many would consider changing jobs if their employer insisted on a full return to the office.',
      'Employers soon discovered both advantages and disadvantages to remote arrangements. On the positive side, companies could reduce spending on office space, and they could recruit talent from a much wider geographical area, no longer limited to candidates willing to relocate. On the negative side, some managers found it harder to monitor performance, and a number of employees reported feelings of isolation and difficulty separating work from personal life.',
      'Research on productivity has produced mixed results. A widely cited study found that call-centre workers became more productive at home, completing more calls per hour. However, other studies have suggested that collaborative work — tasks that require spontaneous discussion and problem-solving with colleagues — tends to suffer when people work apart. One experiment at a large technology firm found that engineers produced code at a similar rate whether they worked in the office or remotely, but that the informal sharing of knowledge, which often happens in corridors and at lunch tables, declined noticeably.',
      'The future of work is likely to be hybrid: a mixture of office and remote days. Companies are experimenting with different patterns, from "remote-first" policies, where the office is optional, to "three days in, two days out" schedules. What is clear is that the debate is no longer about whether remote work is possible, but about how to design work so that both individuals and organisations benefit from the flexibility that technology now makes available.'
    ],
    questions: [
      { id: 'R1-1', type: 'tfng', question: 'The personal computer immediately changed where people worked.', options: ['True', 'False', 'Not Given'], answer: 'False', explanation: 'Para 1: computers "changed the tools people used, but they did not immediately change where they used them."' },
      { id: 'R1-2', type: 'tfng', question: 'Most employers expected remote work to reduce productivity.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'Para 2: "Many employers... expecting a sharp drop in productivity".' },
      { id: 'R1-3', type: 'tfng', question: 'Some employees would leave their job to keep working remotely.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'Para 2: "many would consider changing jobs if their employer insisted on a full return to the office."' },
      { id: 'R1-4', type: 'tfng', question: 'Remote work saved companies money on salaries.', options: ['True', 'False', 'Not Given'], answer: 'Not Given', explanation: 'Companies reduced spending on office space, but salaries are not mentioned.' },
      { id: 'R1-5', type: 'tfng', question: 'Some remote employees found it hard to separate work and personal life.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'Para 3: employees reported "difficulty separating work from personal life".' },
      { id: 'R1-6', type: 'tfng', question: 'Call-centre workers made fewer calls per hour when working from home.', options: ['True', 'False', 'Not Given'], answer: 'False', explanation: 'Para 4: call-centre workers "became more productive at home, completing more calls per hour."' },
      { id: 'R1-7', type: 'tfng', question: 'Engineers at a large technology firm wrote code faster at home than in the office.', options: ['True', 'False', 'Not Given'], answer: 'Not Given', explanation: 'Engineers produced code at "a similar rate" — speed is compared, not stated as faster.' },
      { id: 'R1-8', type: 'tfng', question: 'Informal sharing of knowledge declined when engineers worked remotely.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'The experiment found informal knowledge sharing "declined noticeably".' },
      { id: 'R1-9', type: 'mcq', question: 'According to paragraph 1, what made remote work practical for many workers?', options: ['Cheaper home computers', 'Advances in cloud computing and video conferencing', 'Government regulations', 'New office designs'], answer: 'B', explanation: 'Para 1 lists "advances in cloud computing, video conferencing and instant messaging".' },
      { id: 'R1-10', type: 'mcq', question: 'The 2020 shift to remote work was mainly caused by', options: ['employee preference', 'technological breakthroughs', 'a global health crisis', 'lower office costs'], answer: 'C', explanation: 'Para 2: "The first wave... was driven less by choice than by necessity" during "the global health crisis of 2020".' },
      { id: 'R1-11', type: 'mcq', question: 'Which is NOT mentioned as a benefit of remote work for employers?', options: ['Reduced spending on office space', 'Access to a wider talent pool', 'Lower energy bills for employees', 'Recruitment beyond local candidates'], answer: 'C', explanation: 'Only employer benefits are listed; employees\' energy bills are not mentioned.' },
      { id: 'R1-12', type: 'mcq', question: 'What does the research suggest about collaborative work?', options: ['It improves with remote work', 'It is unaffected by location', 'It tends to suffer when people work apart', 'It is more efficient in call centres'], answer: 'C', explanation: 'Para 4: collaborative tasks "tends to suffer when people work apart".' },
      { id: 'R1-13', type: 'mcq', question: 'The author concludes that the future of work will probably be', options: ['fully remote', 'fully in the office', 'hybrid', 'the same as before 2020'], answer: 'C', explanation: 'Para 5: "The future of work is likely to be hybrid".' }
    ]
  },
  {
    id: 2,
    title: 'Passage 2 · Sleep and Memory',
    intro: 'Read the passage and answer questions 14–26.',
    paragraphs: [
      'Sleep has long been recognised as essential for physical recovery, but its role in learning and memory is only now being fully understood. Researchers have discovered that the brain does not simply switch off during sleep; instead, it carries out a series of active processes that consolidate the information we have encountered during the day.',
      'The most important of these processes appears to occur during slow-wave sleep, the deepest stage of non-rapid eye movement sleep. During this stage, the brain replays patterns of neural activity that occurred while we were learning. This replay, which scientists have observed directly in laboratory animals, strengthens the connections between neurons, effectively transferring memories from the hippocampus — where they are initially stored — to the neocortex, where they become long-term.',
      'The practical implications are significant. Studies of students have shown that those who sleep after studying a new set of vocabulary recall it more accurately the next day than those who stay awake. The improvement is particularly noticeable for procedural skills, such as learning to play a musical instrument or mastering a new sport. In one classic experiment, participants who were trained on a finger-tapping task and then allowed to sleep improved their speed by twenty percent overnight, while those who were kept awake showed no improvement at all.',
      'Timing also matters. Research suggests that the benefits of sleep for memory depend on the quality and structure of the sleep that follows learning, not simply the total number of hours. A short nap of around sixty to ninety minutes, which includes a period of slow-wave sleep, can produce measurable improvements in recall. Longer naps do not necessarily add further benefit, and very short naps of less than twenty minutes may be too brief to include the deep sleep needed for consolidation.',
      'Not all memories benefit equally. Emotional memories appear to be strengthened during rapid eye movement (REM) sleep, the stage associated with dreaming, whereas factual and procedural memories rely more heavily on slow-wave sleep. This division of labour means that a full night\'s sleep, with its natural cycle of slow-wave and REM stages, is more valuable than either stage in isolation.',
      'There is also a growing body of evidence that sleep before learning is just as important as sleep after it. A well-rested brain is better able to absorb new information, and researchers have found that sleep deprivation impairs the function of the hippocampus, the very structure most involved in forming new memories. For anyone preparing for an important examination, the message is clear: a good night\'s sleep is not a luxury but an essential part of the revision process.'
    ],
    questions: [
      { id: 'R2-14', type: 'mcq', question: 'What does the brain do during slow-wave sleep?', options: ['It shuts down completely', 'It replays patterns of neural activity from learning', 'It produces new neurons', 'It processes emotional memories only'], answer: 'B', explanation: 'Para 2: "the brain replays patterns of neural activity that occurred while we were learning."' },
      { id: 'R2-15', type: 'mcq', question: 'Where are memories initially stored?', options: ['In the neocortex', 'In the hippocampus', 'In the cerebellum', 'In the brain stem'], answer: 'B', explanation: 'Memories are "initially stored" in the hippocampus, then transferred to the neocortex.' },
      { id: 'R2-16', type: 'mcq', question: 'In the finger-tapping experiment, participants who slept', options: ['performed worse the next day', 'improved their speed by twenty percent', 'showed no improvement', 'improved their accuracy but not speed'], answer: 'B', explanation: 'Those allowed to sleep "improved their speed by twenty percent overnight".' },
      { id: 'R2-17', type: 'fill', question: 'Which stage of sleep strengthens emotional memories? Write the three-letter abbreviation.', answer: ['rem'], explanation: 'Emotional memories "appear to be strengthened during rapid eye movement (REM) sleep".' },
      { id: 'R2-18', type: 'mcq', question: 'According to the passage, what does memory consolidation depend on?', options: ['Only the total hours of sleep', 'The quality and structure of sleep', 'The time of day you sleep', 'Physical exercise'], answer: 'B', explanation: 'Para 4: benefits "depend on the quality and structure of the sleep that follows learning".' },
      { id: 'R2-19', type: 'fill', question: 'A nap of around how many minutes can improve recall? Write the range with a hyphen (e.g. 10-20).', answer: ['60-90', 'sixty to ninety', '60 to 90', 'sixty-ninety'], explanation: '"A short nap of around sixty to ninety minutes... can produce measurable improvements."' },
      { id: 'R2-20', type: 'mcq', question: 'Why may very short naps be ineffective?', options: ['They are too refreshing', 'They may be too brief to include deep sleep', 'They interrupt the night cycle', 'They only include REM sleep'], answer: 'B', explanation: 'Very short naps "may be too brief to include the deep sleep needed for consolidation".' },
      { id: 'R2-21', type: 'mcq', question: 'Sleep before learning is important because', options: ['it strengthens existing memories', 'a well-rested brain absorbs new information better', 'it increases dream frequency', 'it reduces study time'], answer: 'B', explanation: 'Para 6: "A well-rested brain is better able to absorb new information."' },
      { id: 'R2-22', type: 'tfng', question: 'Sleep deprivation impairs the hippocampus, which forms new memories.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'Para 6: "sleep deprivation impairs the function of the hippocampus, the very structure most involved in forming new memories."' },
      { id: 'R2-23', type: 'tfng', question: 'Students who study at night remember more than those who study in the morning.', options: ['True', 'False', 'Not Given'], answer: 'Not Given', explanation: 'Time of day of studying is not discussed.' },
      { id: 'R2-24', type: 'tfng', question: 'A full night\'s sleep is more valuable than slow-wave or REM sleep alone.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'Para 5: "a full night\'s sleep... is more valuable than either stage in isolation."' },
      { id: 'R2-25', type: 'mcq', question: 'The main purpose of the passage is to', options: ['describe the causes of insomnia', 'explain the role of sleep in learning and memory', 'compare different types of memory', 'promote the use of naps in schools'], answer: 'B', explanation: 'The passage explains how sleep consolidates memories and supports learning.' },
      { id: 'R2-26', type: 'tfng', question: 'The author believes sleep is an essential part of revision for exams.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'Para 6: "a good night\'s sleep is... an essential part of the revision process."' }
    ]
  },
  {
    id: 3,
    title: 'Passage 3 · The Psychology of Habit Formation',
    intro: 'Read the passage and answer questions 27–40.',
    paragraphs: [
      'Habits are the invisible architecture of daily life. Psychologists estimate that roughly forty percent of the actions we perform each day are habits rather than conscious decisions. Understanding how habits form, and why they are so hard to break, has become a central question in behavioural science.',
      'A habit consists of three components: a cue, a routine and a reward. The cue is a trigger — a time of day, a location, an emotional state — that signals the brain to initiate a behaviour. The routine is the behaviour itself, whether that is reaching for a phone, pouring a coffee or lacing up running shoes. The reward is the positive outcome that follows, which reinforces the entire loop. Over time, the brain begins to anticipate the reward at the mere sight of the cue, and the behaviour becomes automatic.',
      'This loop is managed by a region of the brain called the basal ganglia, which stores habits and retrieves them without conscious effort. This efficiency is one reason why habits are so durable: the brain can execute a well-learned behaviour while the conscious mind is occupied elsewhere. A person driving to work along a familiar route may arrive with no memory of the journey, because the basal ganglia handled most of the driving.',
      'The duration of habit formation has been the subject of a widely cited study from University College London. Participants were asked to perform a simple health-related behaviour — drinking a glass of water at the same time each day — and to record how automatic the behaviour felt. On average, it took sixty-six days for the behaviour to become automatic, although the range was enormous: from eighteen days to two hundred and fifty-four days. The popular belief that habits form in twenty-one days appears to be a myth, based on a misinterpretation of a 1960s plastic-surgery study, which concerned how long it took patients to adjust to their new appearance, not how long it took them to form a habit.',
      'So why do bad habits persist even when we consciously want to change them? One answer is that habits are stored separately from conscious intentions. Telling yourself you will not eat chocolate does not erase the association your brain has built between the cue (the vending machine at work) and the reward (the sugar rush). Changing a habit therefore usually requires altering the cue-routine-reward loop itself, rather than simply trying to suppress the behaviour through willpower alone.',
      'Research suggests several strategies that make habit change more effective. First, habits are easier to build when they are tied to an existing routine — a technique known as habit stacking, in which a new behaviour is attached to an established one, such as doing stretches immediately after brushing your teeth. Second, consistency of context matters more than the timing of the behaviour: performing a habit in the same location each time strengthens the association between place and action. Third, small rewards delivered immediately after the routine are more effective than larger, delayed rewards, because the brain values immediate reinforcement. Finally, researchers warn against expecting perfection; missing a single day has almost no effect on long-term habit formation, whereas repeated lapses can undo weeks of progress.'
    ],
    questions: [
      { id: 'R3-27', type: 'fill', question: 'What percentage of daily actions are estimated to be habits? Write the number followed by %.', answer: ['40%', '40 percent', 'forty percent', '40'], explanation: 'Psychologists estimate "roughly forty percent of the actions we perform each day are habits".' },
      { id: 'R3-28', type: 'mcq', question: 'What are the three components of a habit?', options: ['Cue, routine and reward', 'Trigger, action and result', 'Start, middle and end', 'Desire, behaviour and outcome'], answer: 'A', explanation: 'Para 2: "a cue, a routine and a reward".' },
      { id: 'R3-29', type: 'mcq', question: 'Which brain region stores and retrieves habits?', options: ['The hippocampus', 'The basal ganglia', 'The amygdala', 'The neocortex'], answer: 'B', explanation: 'Para 3: "a region of the brain called the basal ganglia, which stores habits".' },
      { id: 'R3-30', type: 'mcq', question: 'The example of driving along a familiar route illustrates that habits', options: ['are impossible to change', 'require constant attention', 'can operate without conscious effort', 'are always health-related'], answer: 'C', explanation: 'The driver may arrive "with no memory of the journey, because the basal ganglia handled most of the driving."' },
      { id: 'R3-31', type: 'fill', question: 'On average, how many days did it take for the UCL study participants to form a habit? Write the number.', answer: ['66', 'sixty-six', 'sixty six'], explanation: 'On average it "took sixty-six days for the behaviour to become automatic".' },
      { id: 'R3-32', type: 'mcq', question: 'The belief that habits form in 21 days comes from', options: ['a University College London study', 'a misinterpretation of a 1960s plastic-surgery study', 'a survey of gym members', 'a popular book about willpower'], answer: 'B', explanation: 'Para 4: the 21-day belief is "based on a misinterpretation of a 1960s plastic-surgery study".' },
      { id: 'R3-33', type: 'mcq', question: 'Why do bad habits persist despite conscious intentions to change?', options: ['People lack willpower', 'Habits are stored separately from conscious intentions', 'The basal ganglia cannot change', 'Rewards are too large'], answer: 'B', explanation: 'Para 5: "habits are stored separately from conscious intentions."' },
      { id: 'R3-34', type: 'fill', question: 'What is the name of the technique where a new habit is attached to an existing one?', answer: ['habit stacking', 'habit-stacking'], explanation: 'Para 6: "a technique known as habit stacking".' },
      { id: 'R3-35', type: 'mcq', question: 'According to the passage, what matters more than the timing of a habit?', options: ['The size of the reward', 'Consistency of context', 'The number of repetitions', 'The time of day'], answer: 'B', explanation: 'Para 6: "consistency of context matters more than the timing of the behaviour".' },
      { id: 'R3-36', type: 'mcq', question: 'What kind of rewards are most effective for building habits?', options: ['Large rewards delivered later', 'Small rewards delivered immediately', 'Social rewards only', 'Monetary rewards'], answer: 'B', explanation: 'Para 6: "small rewards delivered immediately after the routine are more effective than larger, delayed rewards".' },
      { id: 'R3-37', type: 'tfng', question: 'Missing one day of a new habit has almost no effect on long-term formation.', options: ['True', 'False', 'Not Given'], answer: 'True', explanation: 'Para 6: "missing a single day has almost no effect on long-term habit formation".' },
      { id: 'R3-38', type: 'tfng', question: 'The basal ganglia requires conscious effort to retrieve habits.', options: ['True', 'False', 'Not Given'], answer: 'False', explanation: 'Para 3: the basal ganglia "retrieves them without conscious effort".' },
      { id: 'R3-39', type: 'tfng', question: 'All participants in the UCL study formed habits within 66 days.', options: ['True', 'False', 'Not Given'], answer: 'False', explanation: 'The range was 18 to 254 days, so some took much longer than 66 days.' },
      { id: 'R3-40', type: 'mcq', question: 'Which statement best summarises the passage?', options: ['Habits form quickly and are easy to change', 'Habits are automatic loops that can be reshaped by changing cues, routines and rewards', 'Willpower alone is the most effective way to change habits', 'Habits are controlled entirely by conscious thought'], answer: 'B', explanation: 'The passage explains the cue-routine-reward loop and strategies to reshape it.' }
    ]
  }
];

/* ---------------- WRITING ---------------- */
const WRITING_TASKS = [
  {
    id: 1,
    name: 'Task 1',
    label: 'Academic — describe a chart',
    minutes: 20,
    wordLimit: 150,
    prompt: 'The chart below shows the number of international students enrolled at three UK universities from 2015 to 2020. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    chart: {
      type: 'Bar chart',
      title: 'International student enrolment (thousands), 2015–2020',
      rows: [
        { label: '2015', values: [18, 12, 8] },
        { label: '2016', values: [20, 13, 9] },
        { label: '2017', values: [24, 12, 11] },
        { label: '2018', values: [27, 14, 12] },
        { label: '2019', values: [31, 15, 14] },
        { label: '2020', values: [29, 17, 15] }
      ],
      series: ['University of Ashford', 'Weston University', 'Lakeside College']
    },
    sampleAnswer: 'The bar chart compares the number of international students enrolled at three UK universities — Ashford, Weston and Lakeside — over the six-year period from 2015 to 2020.\n\nOverall, all three universities experienced growth in international enrolment over the period, although the rate of increase varied considerably. Ashford remained the most popular destination throughout, while Lakeside consistently attracted the fewest students.\n\nIn 2015, Ashford enrolled 18,000 international students, a figure that rose steadily to a peak of 31,000 in 2019, before falling slightly to 29,000 in 2020. Weston began the period at 12,000 students and grew more modestly, reaching 17,000 by 2020, with a small dip in 2017. Lakeside saw the most gradual rise, from 8,000 in 2015 to 15,000 in 2020.\n\nIn conclusion, while all three universities increased their international intake over the period, Ashford\'s dominance was maintained throughout, and only Ashford experienced a decline, which occurred in the final year.'
  },
  {
    id: 2,
    name: 'Task 2',
    label: 'Academic — essay',
    minutes: 40,
    wordLimit: 250,
    prompt: 'Some people believe that the government should invest more money in public transport to reduce traffic congestion and pollution. Others argue that the most effective solution is to discourage the use of private cars altogether. Discuss both views and give your own opinion.',
    chart: null,
    sampleAnswer: 'Traffic congestion and air pollution are among the most pressing problems facing modern cities, and there is considerable debate about how governments should respond. While some argue for increased investment in public transport, others believe that restricting private car use is the only effective solution. In my view, both approaches have merit, but a combination of the two is likely to be most successful.\n\nOn the one hand, investing in public transport is an attractive option because it improves the quality of life for everyone without removing people\'s freedom to travel. Expanding rail networks, bus services and cycle lanes encourages commuters to switch voluntarily from cars to more sustainable modes of transport. Better services also benefit those who cannot drive, such as the elderly and people on low incomes, making cities more inclusive. Furthermore, investment in public transport creates jobs and stimulates economic growth, which strengthens the case for government spending in this area.\n\nOn the other hand, there are those who argue that voluntary switching alone will never be enough, and that governments must take stronger action to reduce car use. Measures such as congestion charges, higher fuel taxes and restricted parking make driving more expensive and inconvenient, which directly reduces the number of cars on the road. Critics of this view point out that such policies often penalise lower-income drivers, who may have no practical alternative to the car, particularly in rural areas where public transport is limited.\n\nIn my opinion, the most effective strategy is to combine the two approaches. Governments should fund convenient, affordable public transport so that leaving the car at home becomes an attractive choice, while at the same time introducing modest restrictions on car use in city centres. This balanced approach addresses both the supply of alternatives and the demand for car travel, and it is more likely to be accepted by the public than either measure on its own.\n\nIn conclusion, although investment in public transport and restrictions on private cars are often presented as competing solutions, they are in fact complementary. A strategy that combines improved services with carefully targeted restrictions offers the best hope of reducing congestion and pollution in the long term.'
  }
];

/* ---------------- SPEAKING ---------------- */
const SPEAKING_TEST = {
  part1: [
    {
      id: 'S1-1',
      question: 'Let\'s talk about where you live. Do you live in a house or an apartment?',
      sampleAnswer: 'I currently live in a small apartment in the city centre, close to my university. It\'s not very big — just two rooms — but it\'s convenient because everything I need, like shops and the library, is within walking distance.'
    },
    {
      id: 'S1-2',
      question: 'What do you like most about where you live?',
      sampleAnswer: 'I think the best thing is the location. I can get to most places in under twenty minutes, which saves me a lot of time. Also, the neighbourhood is quite lively, so there are always cafés and restaurants to go to with friends.'
    },
    {
      id: 'S1-3',
      question: 'Do you enjoy cooking? Why or why not?',
      sampleAnswer: 'I do enjoy cooking, although I\'m not particularly good at it. I find it relaxing after a long day, and I prefer home-cooked food because I know exactly what goes into it. I\'m trying to learn a few new dishes each month, mostly things my grandmother used to make.'
    },
    {
      id: 'S1-4',
      question: 'What kind of music do you like to listen to?',
      sampleAnswer: 'I mostly listen to pop and acoustic music, but my taste changes depending on my mood. When I\'m studying, I prefer instrumental music because lyrics can be distracting. I also like going to live concerts when I get the chance, although tickets are often quite expensive.'
    },
    {
      id: 'S1-5',
      question: 'Do you prefer to spend your free time indoors or outdoors?',
      sampleAnswer: 'It really depends on the weather and how much energy I have. On weekdays I tend to stay indoors and relax, but at the weekend I love being outdoors — hiking, cycling or just walking in the park. I think spending time outside helps me clear my head and recharge.'
    }
  ],
  part2: {
    title: 'Part 2 · Individual long turn',
    intro: 'You will have one minute to prepare and can make notes. You should then speak for one to two minutes.',
    prepSeconds: 60,
    speakSeconds: 120,
    cueCard: {
      topic: 'Describe a skill that you think is important for young people to learn.',
      bullets: [
        'what the skill is',
        'why it is important',
        'how young people can learn it',
        'and explain whether you think it is more important now than in the past.'
      ]
    },
    sampleAnswer: 'The skill I\'d like to talk about is financial literacy — the ability to manage money wisely. I think it\'s one of the most valuable skills a young person can learn, yet it\'s rarely taught properly in schools.\n\nIt\'s important for several reasons. First, we live in a world where financial decisions are everywhere — from choosing a phone contract to taking out a student loan or saving for a home. If young people don\'t understand concepts like interest, budgeting and debt, they can easily make mistakes that affect them for years. Second, the rise of online shopping and easy credit means it\'s never been easier to spend money without really thinking about it.\n\nYoung people can learn this skill in practical ways. Schools could introduce basic budgeting as part of the curriculum, but I think the best learning happens at home — for example, giving children a small allowance and letting them decide how to spend and save it. There are also excellent apps and online courses that make personal finance engaging and interactive.\n\nAs for whether it\'s more important now than in the past, I\'d say yes, definitely. Financial products are far more complex today, and young people are exposed to money decisions much earlier, especially through the internet. In the past, most people simply put their savings in a bank account and didn\'t think much about it. Today, everyone needs to understand things like interest rates, inflation and online security.\n\nSo, in short, I believe financial literacy is an essential life skill that will only become more important as the financial world becomes more complicated.'
  },
  part3: [
    {
      id: 'S3-1',
      question: 'Why do you think some skills are valued more than others in modern society?',
      sampleAnswer: 'I think the value of a skill is closely linked to the economy and technology of the time. Skills that are in short supply and hard to automate, like critical thinking and creativity, tend to be valued highly. On the other hand, skills that machines can now perform are often undervalued, which is unfortunate because many of them still matter for everyday life. So I\'d say market forces, more than anything else, determine which skills society rewards.'
    },
    {
      id: 'S3-2',
      question: 'Do you think the education system prepares young people well for the future?',
      sampleAnswer: 'To be honest, I think there\'s a gap between what schools teach and what the future actually requires. Schools focus heavily on memorising facts and passing exams, but the future of work will demand adaptability, digital skills and emotional intelligence. That said, many schools are starting to introduce coding, project-based learning and soft skills, so I do think progress is being made, just slowly.'
    },
    {
      id: 'S3-3',
      question: 'Some people believe that traditional skills, such as handicrafts, are disappearing. Is this a problem?',
      sampleAnswer: 'I think it is a problem, but perhaps not in the way people usually mean. Handicrafts carry cultural knowledge and history, and when they disappear, we lose part of our identity. On the practical side, handmade goods are often higher quality than mass-produced ones. However, I don\'t think these skills will vanish completely, because there\'s a growing appreciation for authentic, handcrafted products, and social media has given artisans a global audience. So while they may not be mainstream, they\'re finding new ways to survive.'
    },
    {
      id: 'S3-4',
      question: 'What skills do you think will be most important in the next twenty years?',
      sampleAnswer: 'I\'d say the ability to learn and relearn will be the most important skill of all, because the pace of change is so fast that specific knowledge becomes outdated quickly. Beyond that, digital literacy is essential — not just using technology, but understanding it critically. And I\'d add interpersonal skills: as more work becomes automated, the human skills of empathy, communication and collaboration will be what truly set people apart.'
    }
  ]
};

/* ---------------- LEARNING LEVELS ---------------- */
const LEVELS = [
  {
    id: 'beginner',
    name: 'Beginner',
    icon: '🌱',
    minXp: 0,
    color: 'emerald',
    desc: 'Start here. Build your foundation with the first two Listening sections, one Reading passage, Writing Task 1 and Speaking Part 1.'
  },
  {
    id: 'intermediate',
    name: 'Intermediate',
    icon: '🚀',
    minXp: 300,
    color: 'sky',
    desc: 'Take on longer passages, more Listening sections, Writing Task 2 and Speaking Part 2.'
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: '🏆',
    minXp: 700,
    color: 'violet',
    desc: 'The full test experience: all four Listening sections, all Reading passages and the complete Speaking exam.'
  }
];

/* How many items of each skill each level unlocks (index-based counts) */
const LEVEL_UNLOCKS = {
  listening: { beginner: 2, intermediate: 3, advanced: 4 },
  reading: { beginner: 1, intermediate: 2, advanced: 3 },
  writing: { beginner: 1, intermediate: 2, advanced: 2 },
  speaking: { beginner: 1, intermediate: 2, advanced: 3 }
};

/* XP rewards for completing activities */
const XP_REWARDS = {
  listening: 20,  // per section checked
  reading: 25,    // per passage checked
  writing: 10,    // per word-count check
  speaking: 10,   // per part practised
  exam: 2         // per correct answer in weekly exam
};

/* ---------------- WEEKLY EXAM POOL ---------------- */
const WEEKLY_EXAM_POOL = [
  { id: 'W1', type: 'mcq', question: 'The lecture was so ______ that many students fell asleep.', options: ['tedious', 'fascinating', 'engaging', 'lively'], answer: 'A', explanation: 'Tedious means boring and long — the opposite of fascinating or engaging.' },
  { id: 'W2', type: 'mcq', question: 'Choose the word closest in meaning to “significant”.', options: ['small', 'important', 'sudden', 'obvious'], answer: 'B', explanation: 'Significant means important or meaningful.' },
  { id: 'W3', type: 'mcq', question: 'The government introduced new ______ to reduce traffic in the city centre.', options: ['measure', 'measures', 'measuring', 'measured'], answer: 'B', explanation: 'The plural “measures” is needed: new measures = new actions/policies.' },
  { id: 'W4', type: 'fill', question: 'Complete the sentence: “She has lived in this city ______ 2015.”', answer: ['since'], explanation: 'Use “since” with a point in time (2015); “for” is used with a duration.' },
  { id: 'W5', type: 'mcq', question: 'Which sentence is grammatically correct?', options: ['He suggested to go to the museum.', 'He suggested going to the museum.', 'He suggested go to the museum.', 'He suggested to going the museum.'], answer: 'B', explanation: 'The verb “suggest” is followed by a gerund: suggest + -ing.' },
  { id: 'W6', type: 'mcq', question: '______ the heavy rain, the match continued as planned.', options: ['Despite', 'Although', 'Because', 'However'], answer: 'A', explanation: '“Despite” is a preposition followed by a noun phrase (the heavy rain).' },
  { id: 'W7', type: 'fill', question: 'Complete: “If I had studied harder, I ______ have passed the exam.”', answer: ['would'], explanation: 'Third conditional: if + past perfect, would have + past participle.' },
  { id: 'W8', type: 'mcq', question: 'Choose the correct form: “Neither of the answers ______ correct.”', options: ['is', 'are', 'were', 'be'], answer: 'A', explanation: 'With “neither of” + plural noun, the verb is singular: is.' },
  { id: 'W9', type: 'mcq', question: 'The word “deteriorate” is closest in meaning to ______.', options: ['improve', 'worsen', 'accelerate', 'stabilise'], answer: 'B', explanation: 'Deteriorate means to become progressively worse.' },
  { id: 'W10', type: 'fill', question: 'Complete: “The results were ______ because the sample size was too small.”', answer: ['unreliable', 'not reliable', 'invalid'], explanation: 'A small sample size makes results unreliable or invalid.' },
  { id: 'W11', type: 'mcq', question: 'By the time we arrived, the meeting ______.', options: ['already started', 'had already started', 'has already started', 'was already starting'], answer: 'B', explanation: 'Past perfect is used for an action completed before another past action.' },
  { id: 'W12', type: 'mcq', question: 'Choose the correct sentence:', options: ['The book who I borrowed was fascinating.', 'The book which I borrowed was fascinating.', 'The book whom I borrowed was fascinating.', 'The book what I borrowed was fascinating.'], answer: 'B', explanation: '“Which” is used for things; “who/whom” for people.' },
  { id: 'W13', type: 'fill', question: 'Complete: “The company’s profits increased ______ twenty percent last year.”', answer: ['by'], explanation: 'Use “by” to state the amount of change: increased by 20%.' },
  { id: 'W14', type: 'mcq', question: 'Which word best completes: “She is ______ to succeed because she works extremely hard.”', options: ['likely', 'liking', 'liked', 'like'], answer: 'A', explanation: '“Likely” is an adjective meaning probable.' },
  { id: 'W15', type: 'mcq', question: 'The antonym of “abundant” is ______.', options: ['plentiful', 'scarce', 'ample', 'sufficient'], answer: 'B', explanation: 'Abundant means plentiful; scarce is its opposite.' },
  { id: 'W16', type: 'fill', question: 'Complete: “Urban farming can make use of land that would otherwise be ______.”', answer: ['wasted', 'unused', 'neglected'], explanation: 'The passage uses “wasted” — land that would otherwise be wasted.' },
  { id: 'W17', type: 'mcq', question: 'Choose the correct passive form: “The bridge ______ in 1998.”', options: ['built', 'was built', 'is built', 'has built'], answer: 'B', explanation: 'Past simple passive: was/were + past participle.' },
  { id: 'W18', type: 'mcq', question: '“Comprehensive” most nearly means ______.', options: ['brief', 'complete', 'complicated', 'comfortable'], answer: 'B', explanation: 'Comprehensive means including everything; complete or thorough.' },
  { id: 'W19', type: 'fill', question: 'Complete: “Many students find it difficult to ______ on their studies with so many distractions.”', answer: ['concentrate', 'focus'], explanation: 'Concentrate/focus on = give full attention to.' },
  { id: 'W20', type: 'mcq', question: 'I look forward to ______ from you soon.', options: ['hear', 'hearing', 'heard', 'hears'], answer: 'B', explanation: '“Look forward to” is followed by a gerund (-ing form).' },
  { id: 'W21', type: 'mcq', question: 'Which word fits: “The two countries signed a trade ______.”', options: ['agreement', 'agree', 'agreed', 'agreeing'], answer: 'A', explanation: 'A trade agreement is the noun collocation.' },
  { id: 'W22', type: 'fill', question: 'Complete: “Sleep is essential for ______ memories, not just for physical recovery.”', answer: ['consolidating', 'forming', 'strengthening', 'storing'], explanation: 'The reading passage explains sleep consolidates memories.' },
  { id: 'W23', type: 'mcq', question: 'Choose the correct form: “If it ______ tomorrow, we will cancel the picnic.”', options: ['rains', 'will rain', 'rained', 'would rain'], answer: 'A', explanation: 'First conditional: if + present simple, will + base verb.' },
  { id: 'W24', type: 'mcq', question: 'The word “crucial” is closest in meaning to ______.', options: ['optional', 'essential', 'unusual', 'difficult'], answer: 'B', explanation: 'Crucial means extremely important or essential.' },
  { id: 'W25', type: 'fill', question: 'Complete: “The experiment was repeated three times to ______ the results.”', answer: ['verify', 'confirm', 'validate', 'check'], explanation: 'Verify/confirm = to check that something is true or accurate.' },
  { id: 'W26', type: 'mcq', question: 'Which sentence uses the correct article?', options: ['She is an university student.', 'She is a university student.', 'She is the university student.', 'She is university student.'], answer: 'B', explanation: '“University” begins with a “y” sound, so the article is “a”, not “an”.' },
  { id: 'W27', type: 'mcq', question: 'Choose the correct word: “The museum ______ thousands of visitors every year.”', options: ['attracts', 'attract', 'attracting', 'attracted'], answer: 'A', explanation: 'Present simple third person singular: attracts.' },
  { id: 'W28', type: 'fill', question: 'Complete: “Regular exercise can ______ your overall health.”', answer: ['improve', 'boost', 'enhance'], explanation: 'Improve/boost/enhance all fit: exercise improves health.' },
  { id: 'W29', type: 'mcq', question: 'The phrase “in the long run” means ______.', options: ['over a short period', 'eventually, over time', 'immediately', 'never'], answer: 'B', explanation: '“In the long run” = after a long period of time, eventually.' },
  { id: 'W30', type: 'mcq', question: 'Choose the correct sentence:', options: ['Despite of the noise, she slept well.', 'Despite the noise, she slept well.', 'Although the noise, she slept well.', 'Despite the noise, but she slept well.'], answer: 'B', explanation: '“Despite” is used directly with a noun phrase, without “of”.' }
];

/* ---- Expose to window for the app script ---- */
window.IELTS_DATA = { LISTENING_TEST, READING_TEST, WRITING_TASKS, SPEAKING_TEST, LEVELS, LEVEL_UNLOCKS, XP_REWARDS, WEEKLY_EXAM_POOL };
