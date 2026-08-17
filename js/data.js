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

/* ---------------- LEARNING LEVELS (CEFR A1–C2) ---------------- */
/* Progressive Common European Framework levels. XP unlocks each one:
   A1 → A2 → B1 → B2 → C1 → C2. Every level unlocks more practice
   content and a new shelf of graded reading passages. */
const LEVELS = [
  {
    id: 'a1',
    name: 'A1 Beginner',
    shortName: 'A1',
    icon: '🌱',
    minXp: 0,
    color: 'emerald',
    desc: 'Everyday basics — understand and use familiar words and simple sentences about yourself and daily life.'
  },
  {
    id: 'a2',
    name: 'A2 Elementary',
    shortName: 'A2',
    icon: '🌿',
    minXp: 100,
    color: 'sky',
    desc: 'Short, simple texts and conversations about familiar topics like work, shopping and travel.'
  },
  {
    id: 'b1',
    name: 'B1 Intermediate',
    shortName: 'B1',
    icon: '🚀',
    minXp: 250,
    color: 'amber',
    desc: 'Handle everyday situations and the main points of clear texts — the IELTS 4.5–6.0 band territory.'
  },
  {
    id: 'b2',
    name: 'B2 Upper-Intermediate',
    shortName: 'B2',
    icon: '⚡',
    minXp: 450,
    color: 'orange',
    desc: 'Understand complex texts and express yourself fluently — the IELTS 6.5–7.5 band territory.'
  },
  {
    id: 'c1',
    name: 'C1 Advanced',
    shortName: 'C1',
    icon: '🏆',
    minXp: 700,
    color: 'violet',
    desc: 'Long, demanding texts with implied meaning and flexible, natural expression — IELTS 8.0 territory.'
  },
  {
    id: 'c2',
    name: 'C2 Proficiency',
    shortName: 'C2',
    icon: '👑',
    minXp: 1000,
    color: 'rose',
    desc: 'Near-native mastery — understand virtually everything and express yourself with precision and nuance.'
  }
];

/* How many items of each skill each level unlocks (index-based counts) */
const LEVEL_UNLOCKS = {
  listening: { a1: 1, a2: 2, b1: 2, b2: 3, c1: 3, c2: 4 },
  reading: { a1: 1, a2: 1, b1: 2, b2: 2, c1: 3, c2: 3 },
  writing: { a1: 1, a2: 1, b1: 1, b2: 2, c1: 2, c2: 2 },
  speaking: { a1: 1, a2: 1, b1: 2, b2: 2, c1: 3, c2: 3 }
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

/* ---------------- ZERO-TO-HERO TRAINING MODULES ---------------- */
/* Structured skill training: Vocabulary, Listening and Speaking.
   Each module has 5 progressive stages (zero-to-hero). */
const TRAINING_MODULES = [
  {
    id: 'vocabulary',
    name: 'Vocabulary',
    icon: '📚',
    color: 'amber',
    xpPerStage: 15,
    desc: 'Build a strong academic word bank step by step — from everyday essentials to band-9 collocations.',
    stages: [
      {
        id: 'vocab-1',
        title: 'Step 1 · Everyday Essentials',
        focus: 'Common words for daily life and general IELTS topics.',
        words: [
          { word: 'accommodation', meaning: 'a place to live or stay', example: 'The city has affordable accommodation near the university.' },
          { word: 'commute', meaning: 'the journey to and from work or school', example: 'My daily commute takes about forty minutes.' },
          { word: 'facilities', meaning: 'services or equipment provided for a purpose', example: 'The gym has excellent facilities.' },
          { word: 'neighbourhood', meaning: 'an area of a town or city', example: 'We live in a quiet neighbourhood.' },
          { word: 'convenient', meaning: 'easy and suitable for your needs', example: 'The flat is convenient for the shops.' },
          { word: 'expenses', meaning: 'money that you spend', example: 'Travel expenses can add up quickly.' },
          { word: 'rent', meaning: 'money paid regularly to live in a property', example: 'The rent is £480 per month.' },
          { word: 'utilities', meaning: 'services such as water, electricity and gas', example: 'Rent excludes utilities such as electricity.' }
        ],
        quiz: [
          { q: 'Which word means "a place to live or stay"?', options: ['Transportation', 'Accommodation', 'Environment', 'Education'], answer: 'B', explanation: 'Accommodation is a place where you live or stay, such as a flat or hotel.' },
          { q: 'Which word describes the journey to and from work?', options: ['Commute', 'Rent', 'Facility', 'Utility'], answer: 'A', explanation: 'A commute is the regular journey between home and work.' },
          { q: 'What does "convenient" mean?', options: ['Expensive', 'Crowded', 'Easy and suitable', 'Far away'], answer: 'C', explanation: 'Convenient means easy to use or suitable for your needs.' },
          { q: 'Which word means "services such as water, electricity and gas"?', options: ['Expenses', 'Utilities', 'Facilities', 'Neighbours'], answer: 'B', explanation: 'Utilities are the basic services like water, electricity and gas.' },
          { q: 'Complete: "My daily ______ takes about forty minutes."', options: ['Rent', 'Commute', 'Utility', 'Expense'], answer: 'B', explanation: 'A daily commute is your regular journey to work or school.' }
        ]
      },
      {
        id: 'vocab-2',
        title: 'Step 2 · Education & Study',
        focus: 'The academic vocabulary you need for campus life and study topics.',
        words: [
          { word: 'curriculum', meaning: 'the set of subjects taught', example: 'The curriculum includes science, maths and the arts.' },
          { word: 'assignment', meaning: 'a piece of work given to students', example: 'I have three assignments due this week.' },
          { word: 'lecture', meaning: 'a formal talk given to a large group', example: 'The lecture on economics was fascinating.' },
          { word: 'seminar', meaning: 'a small class for discussion', example: 'We discuss the reading in weekly seminars.' },
          { word: 'deadline', meaning: 'the latest time something must be finished', example: 'The deadline for the essay is Friday.' },
          { word: 'plagiarism', meaning: 'copying someone else\'s work as your own', example: 'Plagiarism is treated very seriously.' },
          { word: 'tutorial', meaning: 'a small teaching session with a tutor', example: 'I have a tutorial with my tutor tomorrow.' },
          { word: 'research', meaning: 'careful study to discover new facts', example: 'Her research focuses on climate change.' }
        ],
        quiz: [
          { q: 'Which word means "the set of subjects taught at a school"?', options: ['Deadline', 'Curriculum', 'Tutorial', 'Seminar'], answer: 'B', explanation: 'The curriculum is the range of subjects taught.' },
          { q: 'A piece of work given to students is called an ______.', options: ['Assignment', 'Lecture', 'Expense', 'Utility'], answer: 'A', explanation: 'Assignments are tasks set for students to complete.' },
          { q: 'What does "plagiarism" mean?', options: ['Studying late at night', 'Copying someone else\'s work as your own', 'Giving a presentation', 'Working in a group'], answer: 'B', explanation: 'Plagiarism is using another person\'s work without permission.' },
          { q: 'Which word means "the latest time something must be finished"?', options: ['Curriculum', 'Research', 'Deadline', 'Seminar'], answer: 'C', explanation: 'A deadline is the time by which work must be submitted.' },
          { q: 'Complete: "We discuss the reading in weekly ______."', options: ['Lectures', 'Seminars', 'Deadlines', 'Rents'], answer: 'B', explanation: 'Seminars are small discussion-based classes.' }
        ]
      },
      {
        id: 'vocab-3',
        title: 'Step 3 · Work & Career',
        focus: 'Professional vocabulary for job and workplace questions.',
        words: [
          { word: 'apply for', meaning: 'to make a formal request for a job or course', example: 'I applied for the marketing position.' },
          { word: 'experience', meaning: 'knowledge gained from doing something', example: 'She has five years of teaching experience.' },
          { word: 'qualifications', meaning: 'official proofs of your skills or education', example: 'He has strong qualifications in engineering.' },
          { word: 'promotion', meaning: 'a move to a higher position at work', example: 'She received a promotion last month.' },
          { word: 'salary', meaning: 'the regular pay you receive for work', example: 'The salary is competitive.' },
          { word: 'training', meaning: 'learning the skills needed for a job', example: 'New staff get two weeks of training.' },
          { word: 'vacancy', meaning: 'an available job position', example: 'There is a vacancy in the sales team.' },
          { word: 'colleague', meaning: 'a person you work with', example: 'My colleagues are very supportive.' }
        ],
        quiz: [
          { q: 'Which phrase means "to make a formal request for a job"?', options: ['Apply for', 'Give up', 'Turn down', 'Look after'], answer: 'A', explanation: 'You apply for a job by formally requesting it.' },
          { q: 'A move to a higher position at work is a ______.', options: ['Salary', 'Vacancy', 'Promotion', 'Training'], answer: 'C', explanation: 'A promotion means moving up in your career.' },
          { q: 'What is a "vacancy"?', options: ['A holiday from work', 'An available job position', 'A type of training', 'A work colleague'], answer: 'B', explanation: 'A vacancy is a job position that is available.' },
          { q: 'Which word means "a person you work with"?', options: ['Colleague', 'Customer', 'Manager', 'Neighbour'], answer: 'A', explanation: 'A colleague is someone who works with you.' },
          { q: 'Complete: "New staff get two weeks of ______."', options: ['Vacancy', 'Promotion', 'Training', 'Salary'], answer: 'C', explanation: 'Training is the process of learning job skills.' }
        ]
      },
      {
        id: 'vocab-4',
        title: 'Step 4 · Health & Environment',
        focus: 'High-frequency words for health and environmental issues.',
        words: [
          { word: 'pollution', meaning: 'harmful substances in the air, water or land', example: 'Air pollution is a serious problem in big cities.' },
          { word: 'sustainable', meaning: 'able to continue without harming the environment', example: 'We need sustainable sources of energy.' },
          { word: 'obesity', meaning: 'the state of being very overweight', example: 'Obesity rates have risen sharply.' },
          { word: 'nutrition', meaning: 'the food you need to stay healthy', example: 'Good nutrition is essential for children.' },
          { word: 'epidemic', meaning: 'a disease spreading quickly among many people', example: 'The flu epidemic hit the city hard.' },
          { word: 'recycling', meaning: 'turning waste into new products', example: 'Recycling reduces the amount of landfill waste.' },
          { word: 'emissions', meaning: 'gases released into the atmosphere', example: 'Car emissions contribute to global warming.' },
          { word: 'well-being', meaning: 'general health and happiness', example: 'Regular exercise improves your well-being.' }
        ],
        quiz: [
          { q: 'Which word means "able to continue without harming the environment"?', options: ['Sustainable', 'Polluted', 'Crowded', 'Expensive'], answer: 'A', explanation: 'Sustainable practices meet present needs without harming the future.' },
          { q: 'Gases released into the atmosphere are called ______.', options: ['Emissions', 'Recycling', 'Nutrition', 'Obesity'], answer: 'A', explanation: 'Emissions are gases, often from cars or factories.' },
          { q: 'What is "recycling"?', options: ['Burning waste', 'Turning waste into new products', 'Throwing rubbish in the sea', 'Growing food in cities'], answer: 'B', explanation: 'Recycling converts waste materials into new products.' },
          { q: 'A disease spreading quickly among many people is an ______.', options: ['Epidemic', 'Exhibition', 'Emission', 'Appointment'], answer: 'A', explanation: 'An epidemic is a rapid spread of disease through a population.' },
          { q: 'Complete: "Good ______ is essential for children to grow."', options: ['Pollution', 'Nutrition', 'Emission', 'Rent'], answer: 'B', explanation: 'Nutrition is the food and nourishment needed for health.' }
        ]
      },
      {
        id: 'vocab-5',
        title: 'Step 5 · Band-9 Collocations & Academic Verbs',
        focus: 'The sophisticated language that lifts your writing and speaking to band 9.',
        words: [
          { word: 'significant impact', meaning: 'a large and important effect', example: 'Social media has a significant impact on teenagers.' },
          { word: 'crucial role', meaning: 'an extremely important part', example: 'Sleep plays a crucial role in forming memories.' },
          { word: 'address an issue', meaning: 'to deal with a problem', example: 'The government must address the housing issue.' },
          { word: 'implement', meaning: 'to put a plan or policy into action', example: 'The school implemented a new timetable.' },
          { word: 'considerable', meaning: 'large in amount or degree', example: 'There is considerable evidence to support this.' },
          { word: 'predominant', meaning: 'most common or main', example: 'English is the predominant language of the internet.' },
          { word: 'facilitate', meaning: 'to make something easier', example: 'Technology facilitates communication across borders.' },
          { word: 'alleviate', meaning: 'to make something less severe', example: 'New roads will alleviate congestion in the city.' }
        ],
        quiz: [
          { q: 'Which collocation means "a large and important effect"?', options: ['Significant impact', 'Small change', 'Crucial role', 'Minor detail'], answer: 'A', explanation: 'A significant impact is a large and important effect.' },
          { q: 'What does "implement" mean?', options: ['To cancel', 'To put a plan into action', 'To delay', 'To ignore'], answer: 'B', explanation: 'To implement a plan is to start putting it into practice.' },
          { q: '"The government must address the housing issue" — what does address mean here?', options: ['To write a speech', 'To deal with a problem', 'To build houses', 'To ignore'], answer: 'B', explanation: 'To address an issue means to deal with it or tackle it.' },
          { q: 'Which word means "to make something less severe"?', options: ['Alleviate', 'Facilitate', 'Implement', 'Predominate'], answer: 'A', explanation: 'To alleviate is to reduce the severity of a problem.' },
          { q: 'Complete: "Sleep plays a ______ role in forming memories."', options: ['Significant impact', 'Crucial', 'Considerable', 'Predominant'], answer: 'B', explanation: 'The natural collocation is "plays a crucial role".' }
        ]
      }
    ]
  },
  {
    id: 'listening',
    name: 'Listening',
    icon: '🎧',
    color: 'sky',
    xpPerStage: 20,
    desc: 'Hone your ear for numbers, directions, opinions, facts and inference — the core skills of the Listening test.',
    stages: [
      {
        id: 'listening-1',
        title: 'Step 1 · Numbers & Spelling',
        focus: 'Catch prices, membership numbers, times and small details.',
        script: [
          'RECEPTIONIST: Good afternoon, City Sports Club. How can I help you?',
          'MEMBER: Hello, I would like to book a tennis court for Saturday afternoon.',
          'RECEPTIONIST: Courts cost twelve pounds per hour for members. What time would suit you?',
          'MEMBER: Two thirty, please. My membership number is 7-4-8-2-9.',
          'RECEPTIONIST: Thank you. Court number 3 is booked for 2:30 on Saturday. Please arrive ten minutes early.'
        ],
        questions: [
          { id: 'TL1-1', type: 'mcq', question: 'How much does a tennis court cost per hour for members?', options: ['£10', '£12', '£15', '£20'], answer: 'B', explanation: 'The receptionist says courts cost twelve pounds per hour for members.' },
          { id: 'TL1-2', type: 'fill', question: 'What is the member\'s membership number?', answer: ['74829', '7 4 8 2 9'], explanation: 'The member spells it: 7-4-8-2-9.' },
          { id: 'TL1-3', type: 'mcq', question: 'Which court is booked for the member?', options: ['Court 1', 'Court 2', 'Court 3', 'Court 4'], answer: 'C', explanation: 'The receptionist confirms court number 3.' },
          { id: 'TL1-4', type: 'fill', question: 'How many minutes early should the member arrive? Write the number.', answer: ['10', 'ten'], explanation: 'The receptionist asks the member to arrive ten minutes early.' }
        ]
      },
      {
        id: 'listening-2',
        title: 'Step 2 · Directions & Places',
        focus: 'Follow instructions and note the position of places.',
        script: [
          'TOURIST: Excuse me, could you tell me how to get to the art gallery?',
          'LOCAL: Certainly. Go straight down this street until you reach the traffic lights, then turn left.',
          'LOCAL: The gallery is on the right, opposite the library and next to the museum.',
          'TOURIST: Is it far from here?',
          'LOCAL: It is about a ten-minute walk. There is also a bus stop right outside the library.'
        ],
        questions: [
          { id: 'TL2-1', type: 'mcq', question: 'At the traffic lights, which way should the tourist turn?', options: ['Left', 'Right', 'Straight on', 'Back'], answer: 'A', explanation: 'The local says "turn left" at the traffic lights.' },
          { id: 'TL2-2', type: 'mcq', question: 'Where is the art gallery?', options: ['Opposite the museum', 'Opposite the library, next to the museum', 'Next to the traffic lights', 'Behind the bus stop'], answer: 'B', explanation: 'The gallery is "opposite the library and next to the museum".' },
          { id: 'TL2-3', type: 'fill', question: 'How long is the walk to the gallery? Write the number of minutes.', answer: ['10', 'ten'], explanation: 'The local says it is about a ten-minute walk.' },
          { id: 'TL2-4', type: 'mcq', question: 'Where is the bus stop?', options: ['Inside the museum', 'Outside the library', 'Opposite the gallery', 'At the traffic lights'], answer: 'B', explanation: 'There is a bus stop "right outside the library".' }
        ]
      },
      {
        id: 'listening-3',
        title: 'Step 3 · Opinions & Attitudes',
        focus: 'Identify what speakers like, dislike and would prefer.',
        script: [
          'INTERVIEWER: So, Maria, what do you think of the new study schedule?',
          'MARIA: Overall, I think it is a big improvement. Having a fixed revision hour every evening helps me stay consistent, though I would prefer it to start a little later.',
          'INTERVIEWER: And how do you feel about the group projects?',
          'MARIA: To be honest, I am not keen on them. I prefer working alone because I can concentrate better.'
        ],
        questions: [
          { id: 'TL3-1', type: 'mcq', question: 'What does Maria think of the new study schedule?', options: ['It is too long', 'It is a big improvement', 'It is a waste of time', 'It is unchanged'], answer: 'B', explanation: 'Maria calls the new schedule "a big improvement".' },
          { id: 'TL3-2', type: 'mcq', question: 'What would Maria prefer about the revision hour?', options: ['It should be longer', 'It should start later', 'It should be shorter', 'It should be optional'], answer: 'B', explanation: 'She would prefer the revision hour to start a little later.' },
          { id: 'TL3-3', type: 'mcq', question: 'How does Maria feel about the group projects?', options: ['She loves them', 'She is not keen on them', 'She has no opinion', 'She wants more of them'], answer: 'B', explanation: 'Maria says "I am not keen on them" — she does not like them.' },
          { id: 'TL3-4', type: 'mcq', question: 'Why does Maria prefer working alone?', options: ['She has no friends', 'She can concentrate better', 'It is faster', 'She dislikes her group'], answer: 'B', explanation: 'She prefers working alone because she can concentrate better.' }
        ]
      },
      {
        id: 'listening-4',
        title: 'Step 4 · Facts & Figures',
        focus: 'Note specific numbers and amounts from a short lecture.',
        script: [
          'LECTURER: Today we are looking at the honeybee. A single honeybee colony can contain up to sixty thousand workers.',
          'LECTURER: Interestingly, a bee will visit up to five thousand flowers in a single day, while the queen can lay up to two thousand eggs per day.',
          'LECTURER: Beekeepers report that colonies in warmer climates produce around thirty kilograms of honey per year, roughly double the amount produced in cooler regions.'
        ],
        questions: [
          { id: 'TL4-1', type: 'fill', question: 'How many workers can a honeybee colony contain? Write the number in thousands.', answer: ['60000', 'sixty thousand', '60 thousand', '60,000'], explanation: 'A colony can contain up to sixty thousand workers.' },
          { id: 'TL4-2', type: 'fill', question: 'How many flowers can a bee visit in a single day? Write the number.', answer: ['5000', 'five thousand'], explanation: 'A bee can visit up to five thousand flowers in a day.' },
          { id: 'TL4-3', type: 'fill', question: 'How many eggs can the queen lay per day? Write the number.', answer: ['2000', 'two thousand'], explanation: 'The queen can lay up to two thousand eggs per day.' },
          { id: 'TL4-4', type: 'mcq', question: 'How much honey do colonies produce per year in cooler regions?', options: ['30 kg', '15 kg', '60 kg', '45 kg'], answer: 'B', explanation: 'Warmer climates produce around 30 kg — double the cooler regions, so cooler regions produce about 15 kg.' }
        ]
      },
      {
        id: 'listening-5',
        title: 'Step 5 · Inference & Purpose',
        focus: 'Understand why a speaker says something and what they suggest.',
        script: [
          'ADVISOR: Good morning, Daniel. I have looked over your university application.',
          'DANIEL: Great — what did you make of it?',
          'ADVISOR: Your personal statement is strong, but the references are a little weak. You asked Mr Brown, your physics teacher, but you took that class two years ago and he barely remembers you.',
          'ADVISOR: I would suggest asking your current chemistry teacher instead — she can speak much more specifically about your recent work.',
          'DANIEL: That makes sense. I will email her today.',
          'ADVISOR: Good. And one more thing — you might want to retake your English exam. Your score meets the minimum, but a higher band would make your application far more competitive.'
        ],
        questions: [
          { id: 'TL5-1', type: 'mcq', question: 'Why does the advisor think the references are weak?', options: ['Mr Brown is a poor teacher', 'The physics teacher barely remembers Daniel', 'The references are too long', 'Daniel wrote them himself'], answer: 'B', explanation: 'Mr Brown "barely remembers" Daniel because the class was two years ago.' },
          { id: 'TL5-2', type: 'mcq', question: 'Who does the advisor suggest Daniel should ask instead?', options: ['His physics teacher', 'His chemistry teacher', 'His maths teacher', 'The head teacher'], answer: 'B', explanation: 'The advisor suggests the current chemistry teacher, who knows Daniel\'s recent work.' },
          { id: 'TL5-3', type: 'mcq', question: 'What does the advisor suggest about the English exam?', options: ['It is not needed', 'Daniel should retake it', 'It should be cancelled', 'The score is perfect'], answer: 'B', explanation: 'A higher band would make the application "far more competitive".' },
          { id: 'TL5-4', type: 'mcq', question: 'What is the advisor\'s overall purpose?', options: ['To reject the application', 'To help Daniel improve his application', 'To compare two teachers', 'To discuss exam dates'], answer: 'B', explanation: 'The advisor gives suggestions to strengthen the application.' }
        ]
      }
    ]
  },
  {
    id: 'speaking',
    name: 'Speaking',
    icon: '🗣️',
    color: 'emerald',
    xpPerStage: 15,
    desc: 'Train your fluency and structure — from single sentences to a full two-minute hero talk.',
    stages: [
      {
        id: 'speaking-1',
        title: 'Step 1 · Speak in Sentences',
        focus: 'Answer in complete sentences with one detail.',
        topic: 'Your hometown',
        tip: 'Answer in complete sentences. Give one piece of information, then add one detail.',
        prompts: [
          { prompt: 'Where are you from?', tip: 'Name the place, then add one detail about it.', sample: 'I am from Alexandria, a coastal city in Egypt. It is famous for its long seafront and friendly atmosphere.' },
          { prompt: 'What is your hometown like?', tip: 'Use two adjectives and give one example.', sample: 'It is lively and crowded, especially in summer. For example, the Corniche is packed with families every evening.' },
          { prompt: 'Do you like living there?', tip: 'Give your opinion and one reason.', sample: 'Yes, I do, because everything I need is close by and the sea is only ten minutes away.' }
        ]
      },
      {
        id: 'speaking-2',
        title: 'Step 2 · Fluency: Giving Reasons',
        focus: 'Keep talking by explaining why.',
        topic: 'Your daily routine',
        tip: 'Use linking words: because, so, as a result, that is why.',
        prompts: [
          { prompt: 'What time do you usually wake up?', tip: 'Give the time, then explain why it suits you.', sample: 'I usually wake up at six thirty because I like to start the day quietly, before the rest of the house is up. That is why I can fit in some reading before breakfast.' },
          { prompt: 'What do you do in the evenings?', tip: 'Describe your routine and give a reason for it.', sample: 'In the evenings I relax by watching a series or going for a short walk, because it helps me unwind after a long day. As a result, I sleep much better.' },
          { prompt: 'Do you prefer mornings or evenings?', tip: 'State a preference and justify it.', sample: 'I definitely prefer mornings, because I have the most energy then and I can get a lot done before noon. In the evening I am usually too tired to study.' }
        ]
      },
      {
        id: 'speaking-3',
        title: 'Step 3 · Structure: Describe & Compare',
        focus: 'Use comparatives to describe and contrast.',
        topic: 'Two places you know well',
        tip: 'Use comparatives: more, less, -er, not as … as.',
        prompts: [
          { prompt: 'Describe your favourite café.', tip: 'Talk about the atmosphere, the coffee and the location.', sample: 'My favourite café is a small place near the library. It is quieter than most coffee shops, the coffee is fresher, and the staff remember my order, which makes it feel very welcoming.' },
          { prompt: 'How is it different from a busy chain café?', tip: 'Use comparatives to contrast the two.', sample: 'It is much less crowded than a chain café, so I can find a seat easily. The prices are slightly higher, but the quality is better, so it is worth it.' },
          { prompt: 'Which do you prefer and why?', tip: 'Give a clear preference and two reasons.', sample: 'I prefer the small café because it is more comfortable for studying and the atmosphere is friendlier. I go there at least three times a week.' }
        ]
      },
      {
        id: 'speaking-4',
        title: 'Step 4 · Confidence: Opinions & Examples',
        focus: 'State an opinion and support it with an example.',
        topic: 'Modern technology',
        tip: 'State your opinion first, then support it with a personal example.',
        prompts: [
          { prompt: 'Is technology making life easier?', tip: 'Give your opinion, then one example.', sample: 'Overall, yes, technology is making life easier. For example, I can video-call my family abroad for free, which was impossible for my parents\' generation.' },
          { prompt: 'What is your favourite device and why?', tip: 'Name the device and give two reasons.', sample: 'My favourite device is my smartphone, because it combines so many tools in one — a camera, a map, a diary and a library. I use it every day for both study and entertainment.' },
          { prompt: 'Do people spend too much time online?', tip: 'Give your opinion and a balanced example.', sample: 'I think many people do. For instance, I notice my friends checking their phones during meals instead of talking. That said, the internet also lets us learn new skills, so it depends on how we use it.' }
        ]
      },
      {
        id: 'speaking-5',
        title: 'Step 5 · The Hero Talk',
        focus: 'Deliver a structured two-minute answer.',
        topic: 'Describe a skill you learned that took a lot of effort',
        tip: 'Follow the structure: introduction → what it was → how you learned → why it mattered.',
        prompts: [
          { prompt: 'Introduce the skill and why you wanted to learn it.', tip: 'Start with a clear sentence naming the skill and your motivation.', sample: 'The skill I would like to talk about is public speaking. I wanted to learn it because I used to freeze whenever I had to present in class, and I knew it would be essential for university and my future career.' },
          { prompt: 'Explain how you practised and what was difficult.', tip: 'Describe your method and one challenge you overcame.', sample: 'I practised by joining a speaking club where we delivered short talks every week. At first it was really difficult — I spoke too fast and forgot my points. To fix this, I recorded myself and watched the videos to spot my mistakes.' },
          { prompt: 'Describe the result and why the effort was worth it.', tip: 'Finish with the outcome and the lesson you learned.', sample: 'After six months, I gave a ten-minute presentation to over a hundred students without notes. It felt amazing. The effort was absolutely worth it because I gained confidence that now helps me in exams, interviews and everyday conversations.' }
        ]
      }
    ]
  }
];

/* ---------------- GRADED READING LIBRARY (A1–C2) ---------------- */
/* Two passages per CEFR level. Each passage has a graded text, a
   glossary (word + English meaning + Arabic translation) and 4–5
   comprehension questions. Passages power the Level Reading tool. */
const GRADED_READING = [
  /* ===================== A1 ===================== */
  {
    id: 'GR-A1-1',
    level: 'a1',
    title: 'My Morning Routine',
    minutes: 1,
    text: [
      'I wake up at seven o\'clock every morning. First, I open the window and look outside. The sun is bright and the sky is blue.',
      'Then I go to the kitchen and make breakfast. I eat bread and eggs and I drink a cup of tea. My mother makes coffee for my father.',
      'After breakfast, I brush my teeth and wash my face. I put on my clothes and take my bag. I go to school by bus at eight o\'clock. I am never late.'
    ],
    words: [
      { word: 'wake up', meaning: 'to stop sleeping', ar: 'يستيقظ', example: 'I wake up at seven every morning.' },
      { word: 'bright', meaning: 'full of light', ar: 'مُشرق', example: 'The sun is bright today.' },
      { word: 'kitchen', meaning: 'the room where you cook', ar: 'مطبخ', example: 'We eat breakfast in the kitchen.' },
      { word: 'brush', meaning: 'to clean with a brush', ar: 'يفرّش', example: 'I brush my teeth after breakfast.' },
      { word: 'never', meaning: 'not at any time', ar: 'أبداً', example: 'I am never late for school.' }
    ],
    questions: [
      { type: 'mcq', question: 'What time does the writer wake up?', options: ['Six o\'clock', 'Seven o\'clock', 'Eight o\'clock', 'Nine o\'clock'], answer: 'B', explanation: 'The text says “I wake up at seven o\'clock every morning.”' },
      { type: 'mcq', question: 'What does the writer drink at breakfast?', options: ['Coffee', 'Milk', 'Tea', 'Juice'], answer: 'C', explanation: '“I drink a cup of tea.”' },
      { type: 'mcq', question: 'Who makes coffee for the father?', options: ['The writer', 'The mother', 'The sister', 'The father'], answer: 'B', explanation: '“My mother makes coffee for my father.”' },
      { type: 'mcq', question: 'How does the writer go to school?', options: ['By bus', 'By car', 'By bike', 'On foot'], answer: 'A', explanation: '“I go to school by bus at eight o\'clock.”' }
    ]
  },
  {
    id: 'GR-A1-2',
    level: 'a1',
    title: 'My Family',
    minutes: 1,
    text: [
      'I live with my family in a small flat. My family has four people: my father, my mother, my brother and me.',
      'My father is a doctor. He works in a hospital near our home. My mother is a teacher. She teaches English at a school.',
      'My brother is twelve years old. He is a student. He likes football and music. On Friday, we all eat dinner together at home. I love my family.'
    ],
    words: [
      { word: 'flat', meaning: 'a home in a building (apartment)', ar: 'شقة', example: 'We live in a small flat.' },
      { word: 'doctor', meaning: 'a person who treats sick people', ar: 'طبيب', example: 'My father is a doctor.' },
      { word: 'hospital', meaning: 'a place where sick people stay', ar: 'مستشفى', example: 'He works in a hospital.' },
      { word: 'teacher', meaning: 'a person who teaches', ar: 'معلّم', example: 'My mother is a teacher.' },
      { word: 'together', meaning: 'with each other', ar: 'معاً', example: 'We eat dinner together.' }
    ],
    questions: [
      { type: 'mcq', question: 'How many people are in the writer\'s family?', options: ['Three', 'Four', 'Five', 'Six'], answer: 'B', explanation: '“My family has four people.”' },
      { type: 'mcq', question: 'Where does the father work?', options: ['In a school', 'In a hospital', 'In a bank', 'At home'], answer: 'B', explanation: '“He works in a hospital near our home.”' },
      { type: 'mcq', question: 'What does the mother teach?', options: ['Maths', 'Science', 'English', 'History'], answer: 'C', explanation: '“She teaches English at a school.”' },
      { type: 'mcq', question: 'What does the brother like?', options: ['Football and music', 'Books and films', 'Cooking and art', 'Games and swimming'], answer: 'A', explanation: '“He likes football and music.”' }
    ]
  },
  /* ===================== A2 ===================== */
  {
    id: 'GR-A2-1',
    level: 'a2',
    title: 'A Day in Cairo',
    minutes: 2,
    text: [
      'Last weekend I visited Cairo with my cousin. We left home early in the morning because the city is very busy during the day. The traffic was heavy, but we arrived at the museum before ten o\'clock.',
      'The museum was amazing. We saw old statues, gold masks and many things from ancient Egypt. My favourite part was the room with the mummies. We took lots of photos, but we could not use the flash because it is bad for the old things.',
      'In the afternoon we crossed the river and walked in a big park near the water. We bought sandwiches and juice from a small shop and had lunch under a tree. In the evening, we watched the lights of the city from a high tower. It was a perfect day.'
    ],
    words: [
      { word: 'cousin', meaning: 'the child of your aunt or uncle', ar: 'ابن العم/الخال', example: 'I visited Cairo with my cousin.' },
      { word: 'traffic', meaning: 'cars moving on the roads', ar: 'حركة المرور', example: 'The traffic was heavy in the morning.' },
      { word: 'ancient', meaning: 'very old, from long ago', ar: 'قديم', example: 'We saw things from ancient Egypt.' },
      { word: 'statue', meaning: 'a figure made of stone or metal', ar: 'تمثال', example: 'We saw old statues in the museum.' },
      { word: 'flash', meaning: 'a bright light from a camera', ar: 'فلاش', example: 'We could not use the flash.' },
      { word: 'tower', meaning: 'a tall narrow building', ar: 'برج', example: 'We watched the lights from a high tower.' }
    ],
    questions: [
      { type: 'mcq', question: 'Why did the writer leave home early?', options: ['The museum opens early', 'The city is busy during the day', 'The bus was leaving', 'The weather was hot'], answer: 'B', explanation: '“We left home early… because the city is very busy during the day.”' },
      { type: 'mcq', question: 'What could the visitors not do in the museum?', options: ['Take photos', 'Use the flash', 'Touch the statues', 'Sit down'], answer: 'B', explanation: '“We could not use the flash because it is bad for the old things.”' },
      { type: 'mcq', question: 'Where did the writer have lunch?', options: ['In a restaurant', 'In the museum', 'Under a tree in a park', 'On the tower'], answer: 'C', explanation: '“We… had lunch under a tree” in a park near the water.' },
      { type: 'mcq', question: 'What did the writer do in the evening?', options: ['Went home', 'Watched the city lights', 'Went shopping', 'Visited another museum'], answer: 'B', explanation: '“In the evening, we watched the lights of the city from a high tower.”' }
    ]
  },
  {
    id: 'GR-A2-2',
    level: 'a2',
    title: 'A New Sport',
    minutes: 2,
    text: [
      'Last month, my friend Ali asked me to try a new sport with him. I did not want to go at first because I am not very sporty. But Ali said it was easy and fun, so I said yes.',
      'We went to a small hall near our school. The sport was table tennis. Ali played very well, but I could not hit the ball. I laughed a lot and the teacher helped me. After one hour, I could hit the ball ten times without stopping.',
      'Now I play table tennis every week. It is good exercise and it helps me think quickly. I am happy that I tried something new. Next month, Ali wants to teach me swimming. I am a little afraid, but I will try!'
    ],
    words: [
      { word: 'sporty', meaning: 'good at and interested in sport', ar: 'رياضي', example: 'I am not very sporty.' },
      { word: 'hall', meaning: 'a large room for events or sports', ar: 'قاعة', example: 'We went to a small hall near our school.' },
      { word: 'hit', meaning: 'to touch something with force', ar: 'يضرب', example: 'I could hit the ball ten times.' },
      { word: 'exercise', meaning: 'physical activity for health', ar: 'تمرين رياضي', example: 'It is good exercise.' },
      { word: 'afraid', meaning: 'scared, frightened', ar: 'خائف', example: 'I am a little afraid of swimming.' }
    ],
    questions: [
      { type: 'mcq', question: 'Why did the writer say yes to Ali?', options: ['Because he loves sport', 'Because Ali said it was easy and fun', 'Because his parents told him to', 'Because the lesson was free'], answer: 'B', explanation: '“Ali said it was easy and fun, so I said yes.”' },
      { type: 'mcq', question: 'Where did the friends play the new sport?', options: ['In a park', 'At school', 'In a hall near their school', 'At Ali\'s home'], answer: 'C', explanation: '“We went to a small hall near our school.”' },
      { type: 'mcq', question: 'What could the writer do after one hour?', options: ['Win a game against Ali', 'Hit the ball ten times', 'Teach the teacher', 'Play swimming'], answer: 'B', explanation: '“After one hour, I could hit the ball ten times without stopping.”' },
      { type: 'mcq', question: 'What does the writer want to learn next month?', options: ['Football', 'Basketball', 'Swimming', 'Tennis'], answer: 'C', explanation: '“Next month, Ali wants to teach me swimming.”' }
    ]
  },
  /* ===================== B1 ===================== */
  {
    id: 'GR-B1-1',
    level: 'b1',
    title: 'The Rise of Online Learning',
    minutes: 3,
    text: [
      'In the past ten years, online learning has grown from a small experiment into a major part of education. Millions of students now take courses on the internet, from short language lessons to full university degrees. The reasons are clear: online courses are often cheaper, more flexible and available to people who live far from good schools.',
      'However, online learning is not perfect. Many students say they find it hard to stay motivated when they study alone at home. Without a teacher in the room, it is easy to lose focus and fall behind. Some courses try to solve this problem with live classes, group projects and chat rooms, but these tools only work if students actually use them.',
      'Another important issue is the digital divide. In many countries, students do not have a reliable internet connection or a computer at home. For these learners, online courses are simply not an option. Governments and companies are working on this problem by providing free Wi-Fi in public places and giving low-cost devices to schools.',
      'Experts agree that online learning will not replace traditional classrooms completely. Instead, the future is probably a mix of both: students will watch video lessons at home and then meet their teachers in person for discussions, lab work and exams. This model, called blended learning, may give students the best of both worlds — the flexibility of technology and the support of a real teacher.'
    ],
    words: [
      { word: 'experiment', meaning: 'a test or trial of a new idea', ar: 'تجربة', example: 'Online learning began as a small experiment.' },
      { word: 'flexible', meaning: 'able to change easily to fit new needs', ar: 'مرن', example: 'Online courses are more flexible.' },
      { word: 'motivated', meaning: 'keen to do something', ar: 'متحمس', example: 'Students find it hard to stay motivated.' },
      { word: 'fall behind', meaning: 'to make less progress than others', ar: 'يتأخر', example: 'It is easy to lose focus and fall behind.' },
      { word: 'reliable', meaning: 'able to be trusted to work well', ar: 'موثوق', example: 'Many students lack a reliable internet connection.' },
      { word: 'blended', meaning: 'mixed, combining two things', ar: 'مدمج', example: 'Blended learning mixes online and classroom study.' }
    ],
    questions: [
      { type: 'mcq', question: 'Which is NOT mentioned as a reason online learning has grown?', options: ['It is cheaper', 'It is more flexible', 'It offers better teachers', 'It helps people far from schools'], answer: 'C', explanation: 'The passage mentions cheaper, more flexible and available to people far from good schools — not better teachers.' },
      { type: 'mcq', question: 'Why do some students struggle with online courses?', options: ['They cost too much', 'They find it hard to stay motivated alone', 'They cannot get a degree', 'The lessons are too short'], answer: 'B', explanation: 'Many students find it hard to stay motivated when studying alone at home.' },
      { type: 'mcq', question: 'What does the “digital divide” refer to?', options: ['Different teaching styles', 'The gap in access to technology', 'A problem with online exams', 'The cost of internet courses'], answer: 'B', explanation: 'It describes students without a reliable connection or computer — the technology access gap.' },
      { type: 'mcq', question: 'What is “blended learning”?', options: ['Learning only from videos', 'A mix of online and classroom learning', 'Learning in groups online', 'Learning without a teacher'], answer: 'B', explanation: '“Students will watch video lessons at home and then meet their teachers in person” — a mix of both.' }
    ]
  },
  {
    id: 'GR-B1-2',
    level: 'b1',
    title: 'Why Cities Are Planting More Trees',
    minutes: 3,
    text: [
      'Walk through almost any modern city and you will notice something new: trees are everywhere. Over the last decade, city governments around the world have started planting millions of trees along streets, in parks and on rooftops. This is not just about making cities prettier — trees do important jobs that save money and protect health.',
      'The most obvious benefit is temperature. A single tree can cool the air around it by several degrees, because water evaporating from its leaves absorbs heat. On hot summer days, a street with trees can be five degrees cooler than a street without them. This reduces the need for air conditioning, which saves energy and cuts the cost of electricity for residents and businesses alike.',
      'Trees also clean the air. Their leaves catch dust and pollution, and they absorb carbon dioxide, one of the main gases responsible for climate change. A mature tree can absorb about twenty-two kilograms of carbon dioxide every year. Some studies suggest that neighbourhoods with more trees have lower rates of breathing problems such as asthma.',
      'There are challenges, however. Trees need water, and in dry cities that can be expensive. They can also damage pavements and pipes with their roots, and some species drop fruit or leaves that make streets messy. For this reason, planners must choose the right tree for the right place and be prepared to maintain them for many years.',
      'Despite these difficulties, the trend is growing. City leaders see trees as one of the cheapest ways to make urban life healthier, and residents clearly agree — neighbourhoods with more greenery often have higher property values. In the future, the green city may be the most successful city.'
    ],
    words: [
      { word: 'decade', meaning: 'a period of ten years', ar: 'عقد', example: 'Planting has grown over the last decade.' },
      { word: 'evaporate', meaning: 'to turn from liquid into gas', ar: 'يتبخر', example: 'Water evaporating from leaves absorbs heat.' },
      { word: 'absorb', meaning: 'to take in a liquid or gas', ar: 'يمتص', example: 'Trees absorb carbon dioxide.' },
      { word: 'mature', meaning: 'fully grown', ar: 'ناضج', example: 'A mature tree absorbs more CO₂.' },
      { word: 'asthma', meaning: 'a medical condition with breathing difficulty', ar: 'ربو', example: 'Greener areas have lower rates of asthma.' },
      { word: 'maintain', meaning: 'to keep something in good condition', ar: 'يحافظ على', example: 'Planners must maintain the trees for years.' }
    ],
    questions: [
      { type: 'mcq', question: 'According to the passage, trees cool the air mainly by', options: ['blocking the wind', 'water evaporating from their leaves', 'making shade for cars', 'absorbing dust'], answer: 'B', explanation: '“Water evaporating from its leaves absorbs heat” — this is how a tree cools the air.' },
      { type: 'mcq', question: 'How much carbon dioxide can a mature tree absorb each year?', options: ['5 kilograms', '22 kilograms', '40 kilograms', '100 kilograms'], answer: 'B', explanation: '“A mature tree can absorb about twenty-two kilograms of carbon dioxide every year.”' },
      { type: 'mcq', question: 'Which is mentioned as a problem with urban trees?', options: ['They make the air dirty', 'Their roots can damage pavements and pipes', 'They increase electricity costs', 'They attract too many birds'], answer: 'B', explanation: '“They can also damage pavements and pipes with their roots.”' },
      { type: 'mcq', question: 'What does the writer suggest about green neighbourhoods?', options: ['They are more expensive to live in', 'They often have higher property values', 'They use more energy', 'They have more pollution'], answer: 'B', explanation: '“Neighbourhoods with more greenery often have higher property values.”' }
    ]
  },
  /* ===================== B2 ===================== */
  {
    id: 'GR-B2-1',
    level: 'b2',
    title: 'The Psychology of Habit Formation',
    minutes: 4,
    text: [
      'Anyone who has tried to start exercising regularly or give up sugar knows that habits are surprisingly hard to change. Psychologists have spent decades studying why some behaviours become automatic while others never stick, and their findings have important implications for education, health and personal productivity.',
      'One influential model, proposed by the researchers at University College London, suggests that a habit forms through a simple loop: a cue, a routine and a reward. The cue is a trigger — for example, finishing dinner. The routine is the behaviour itself, such as going for a walk. The reward is the positive feeling that follows, which reinforces the behaviour so that the brain begins to associate the cue with the action.',
      'Crucially, the strength of a habit depends less on motivation than on repetition in a consistent context. Studies have shown that performing a behaviour at the same time and in the same place each day dramatically increases the chance that it becomes automatic. This is why experts recommend linking a new habit to an existing one — a technique known as “habit stacking” — rather than relying on willpower alone.',
      'However, the model has limitations. When the reward is delayed, as with studying for an exam that is months away, the loop weakens because the brain undervalues distant outcomes. Researchers call this “temporal discounting”: we prefer small immediate pleasures over larger future benefits. To counter this, learners are advised to make progress visible and tangible — ticking off a calendar, logging study hours or sharing milestones with friends.',
      'The most encouraging finding is that habits are not fixed. Even long-established patterns can be reshaped by altering the cue or making the routine easier to start. The key is to reduce friction at the beginning: prepare your books the night before, or commit to just five minutes of study. Small, repeated actions compound over time, and what once required effort eventually becomes effortless.'
    ],
    words: [
      { word: 'automatic', meaning: 'done without thinking', ar: 'تلقائي', example: 'Some behaviours become automatic.' },
      { word: 'implications', meaning: 'possible effects or results', ar: 'آثار', example: 'The findings have important implications.' },
      { word: 'cue', meaning: 'a signal that starts a behaviour', ar: 'إشارة', example: 'The cue is a trigger, like finishing dinner.' },
      { word: 'reinforce', meaning: 'to strengthen', ar: 'يعزز', example: 'The reward reinforces the behaviour.' },
      { word: 'consistent', meaning: 'always behaving in the same way', ar: 'مستمر/ثابت', example: 'Repetition in a consistent context builds habits.' },
      { word: 'temporal', meaning: 'related to time', ar: 'زمني', example: 'Temporal discounting favours immediate rewards.' },
      { word: 'friction', meaning: 'difficulty or resistance', ar: 'احتكاك/معوقات', example: 'Reduce friction at the beginning of a task.' },
      { word: 'compound', meaning: 'to grow by adding to itself', ar: 'يتراكم', example: 'Small actions compound over time.' }
    ],
    questions: [
      { type: 'mcq', question: 'What three parts make up the habit loop described in the passage?', options: ['Start, middle, end', 'Cue, routine, reward', 'Motivation, action, result', 'Time, place, repetition'], answer: 'B', explanation: 'The model describes “a cue, a routine and a reward.”' },
      { type: 'mcq', question: 'According to the research, habits become strong mainly through', options: ['strong motivation', 'repetition in a consistent context', 'large rewards', 'avoiding mistakes'], answer: 'B', explanation: '“The strength of a habit depends less on motivation than on repetition in a consistent context.”' },
      { type: 'mcq', question: 'What is “habit stacking”?', options: ['Doing many habits at once', 'Linking a new habit to an existing one', 'Stacking rewards together', 'Planning habits in a diary'], answer: 'B', explanation: 'It is “linking a new habit to an existing one.”' },
      { type: 'mcq', question: 'Why does delayed reward weaken the habit loop?', options: ['The reward never arrives', 'The brain undervalues distant outcomes', 'The routine becomes too easy', 'The cue disappears'], answer: 'B', explanation: 'The brain “undervalues distant outcomes” — this is temporal discounting.' },
      { type: 'mcq', question: 'What does the writer recommend to make progress visible?', options: ['Increasing motivation', 'Logging study hours and sharing milestones', 'Studying only at night', 'Removing rewards'], answer: 'B', explanation: 'Learners are advised to “make progress visible and tangible — ticking off a calendar, logging study hours or sharing milestones.”' }
    ]
  },
  {
    id: 'GR-B2-2',
    level: 'b2',
    title: 'The Economics of Food Waste',
    minutes: 4,
    text: [
      'Roughly one-third of all food produced for human consumption is never eaten. This staggering statistic — more than a billion tonnes a year — carries a hidden price tag that goes far beyond the cost of the food itself, because wasted food also wastes the water, energy and land used to grow it.',
      'The environmental cost is enormous. Agriculture accounts for about a quarter of global greenhouse gas emissions, and when food rots in landfills it releases methane, a gas roughly twenty-five times more potent than carbon dioxide over a century. If food waste were a country, its emissions would rank third behind only China and the United States.',
      'The causes of waste differ sharply between rich and poor countries. In developing nations, most loss happens on the farm or during storage and transport, where refrigeration and roads are unreliable. In wealthy countries, by contrast, waste is concentrated at the consumer stage: households and restaurants discard food because of oversized portions, confusion over date labels and simple overbuying.',
      'Consumers in high-income countries are responsible for a surprising share of the problem. In Europe and North America, households throw away more food than the entire food retail sector of sub-Saharan Africa produces. Campaigns have therefore focused on changing consumer behaviour: shopping from a list, storing produce correctly, and understanding that “best before” refers to quality rather than safety.',
      'Technology offers some solutions, such as apps that connect restaurants with surplus food to charities, and smart packaging that signals spoilage more accurately. Yet experts argue that the most effective lever is economic: when food is priced to reflect its true environmental cost, both producers and consumers have a financial incentive to waste less. Until then, the cheapest way to cut food waste remains the simplest — buy less, plan better and use everything you buy.'
    ],
    words: [
      { word: 'consumption', meaning: 'the act of using or eating something', ar: 'استهلاك', example: 'Food produced for human consumption.' },
      { word: 'staggering', meaning: 'very surprising and large', ar: 'مذهل', example: 'A staggering statistic.' },
      { word: 'emissions', meaning: 'gases sent into the air', ar: 'انبعاثات', example: 'Greenhouse gas emissions.' },
      { word: 'potent', meaning: 'powerful in effect', ar: 'قوي التأثير', example: 'Methane is more potent than CO₂.' },
      { word: 'refrigeration', meaning: 'keeping food cold', ar: 'تبريد', example: 'Loss happens where refrigeration is unreliable.' },
      { word: 'discard', meaning: 'to throw away', ar: 'يتخلص من', example: 'Households discard food for many reasons.' },
      { word: 'surplus', meaning: 'an amount left over', ar: 'فائض', example: 'Apps connect restaurants with surplus food to charities.' },
      { word: 'incentive', meaning: 'something that encourages action', ar: 'حافز', example: 'Pricing creates a financial incentive.' }
    ],
    questions: [
      { type: 'mcq', question: 'What does the writer say about the true cost of food waste?', options: ['It only includes the price of the food', 'It includes wasted water, energy and land', 'It is impossible to measure', 'It affects only rich countries'], answer: 'B', explanation: '“Wasted food also wastes the water, energy and land used to grow it.”' },
      { type: 'mcq', question: 'Why is methane a particular concern?', options: ['It is the most common gas', 'It is about 25 times more potent than CO₂', 'It comes only from farming', 'It cools the planet'], answer: 'B', explanation: 'Methane is “roughly twenty-five times more potent than carbon dioxide over a century.”' },
      { type: 'mcq', question: 'Where does most food loss happen in developing countries?', options: ['In restaurants', 'At the consumer stage', 'On the farm or during storage and transport', 'In supermarkets'], answer: 'C', explanation: 'In developing nations most loss happens “on the farm or during storage and transport.”' },
      { type: 'mcq', question: 'What does the writer say about “best before” labels?', options: ['They indicate safety', 'They refer to quality rather than safety', 'They are legally required', 'They prevent all waste'], answer: 'B', explanation: '“Best before” refers to quality rather than safety.' },
      { type: 'mcq', question: 'What does the writer suggest is the most effective solution?', options: ['More recycling', 'Pricing food to reflect its environmental cost', 'Building more warehouses', 'Banning supermarkets'], answer: 'B', explanation: '“The most effective lever is economic: when food is priced to reflect its true environmental cost.”' }
    ]
  },
  /* ===================== C1 ===================== */
  {
    id: 'GR-C1-1',
    level: 'c1',
    title: 'The Paradox of Choice in Modern Life',
    minutes: 5,
    text: [
      'Conventional wisdom holds that more choice is always better. Yet a growing body of research suggests that an abundance of options can be paralysing, leaving consumers anxious, dissatisfied and, paradoxically, less likely to commit to any decision at all. This phenomenon — labelled the “paradox of choice” — has profound implications for everything from supermarket shelves to university applications.',
      'The mechanism is cognitive rather than economic. When confronted with a vast array of alternatives, the mind must evaluate each option against every other, a process that rapidly exhausts the limited resource of attention. Faced with this mental overload, individuals frequently resort to one of two strategies: either they postpone the decision indefinitely, or they settle for an option that merely satisfies basic criteria, despite the availability of better alternatives. In both cases, the quality of the outcome is diminished, and the decision-maker experiences a lingering sense of regret.',
      'Moreover, the proliferation of options amplifies expectations. A consumer who buys a single perfect sweater from a small shop is delighted; the same consumer, confronted with fifty sweaters online, is more likely to focus on the flaws of the one purchased, knowing that a superior choice may be only a click away. This asymmetry between anticipated and experienced satisfaction is a recurring theme in behavioural economics.',
      'There is, however, a compelling counterargument. Research also indicates that the detrimental effects of excessive choice are most pronounced for those who lack expertise in the domain, whereas experts — who rely on established criteria to filter options — benefit from having more alternatives available. The problem, in other words, may not be choice itself but the absence of the heuristics that make choice manageable.',
      'The practical lesson for learners is twofold. First, curate your environment: limit the sources of information you consume so that attention is preserved for what matters. Second, embrace satisficing — the practice of choosing the first option that meets your standards — for low-stakes decisions, reserving exhaustive comparison for genuinely significant ones. Mastery, it seems, lies not in having access to everything, but in the discipline of ignoring most of it.'
    ],
    words: [
      { word: 'paradox', meaning: 'a statement that seems contradictory but may be true', ar: 'مفارقة', example: 'The paradox of choice.' },
      { word: 'abundance', meaning: 'a very large quantity', ar: 'وفرة', example: 'An abundance of options can be paralysing.' },
      { word: 'paralysing', meaning: 'making someone unable to act', ar: 'مُشلّ', example: 'Too many options can be paralysing.' },
      { word: 'cognitive', meaning: 'related to thinking and understanding', ar: 'معرفي', example: 'The mechanism is cognitive rather than economic.' },
      { word: 'overload', meaning: 'too much to deal with', ar: 'حمل زائد', example: 'Mental overload exhausts attention.' },
      { word: 'amplify', meaning: 'to increase in strength', ar: 'يضخم', example: 'The options amplify expectations.' },
      { word: 'asymmetry', meaning: 'lack of balance or equality', ar: 'عدم تناظر', example: 'An asymmetry between expectation and satisfaction.' },
      { word: 'heuristic', meaning: 'a simple rule for making decisions', ar: 'قاعدة استرشادية', example: 'Experts use heuristics to filter options.' },
      { word: 'satisficing', meaning: 'choosing the first acceptable option', ar: 'الاكتفاء بأول خيار مقبول', example: 'Satisficing saves attention for important decisions.' }
    ],
    questions: [
      { type: 'mcq', question: 'According to the passage, the “paradox of choice” means that more options can lead to', options: ['greater satisfaction', 'anxiety and worse decisions', 'faster decision-making', 'higher prices'], answer: 'B', explanation: 'An abundance of options “can be paralysing, leaving consumers anxious, dissatisfied and… less likely to commit.”' },
      { type: 'mcq', question: 'Why do people settle for an option that merely satisfies basic criteria?', options: ['They enjoy simple choices', 'Mental overload makes full comparison difficult', 'Better options are too expensive', 'They trust their intuition'], answer: 'B', explanation: 'Faced with mental overload, people “settle for an option that merely satisfies basic criteria.”' },
      { type: 'mcq', question: 'Why does a wider range of options increase regret after a purchase?', options: ['The product quality is lower', 'Consumers know a superior choice may be close at hand', 'Prices are higher online', 'Shops give less information'], answer: 'B', explanation: 'The buyer knows “a superior choice may be only a click away,” so they focus on flaws.' },
      { type: 'mcq', question: 'When are the negative effects of too much choice most pronounced?', options: ['For experts with established criteria', 'For people who lack expertise in the domain', 'For decisions about money', 'For online shopping only'], answer: 'B', explanation: 'The effects are “most pronounced for those who lack expertise in the domain.”' },
      { type: 'mcq', question: 'What does the writer recommend for low-stakes decisions?', options: ['Exhaustive comparison', 'Satisficing', 'Avoiding decisions entirely', 'Asking experts'], answer: 'B', explanation: 'The writer recommends “satisficing… for low-stakes decisions.”' }
    ]
  },
  {
    id: 'GR-C1-2',
    level: 'c1',
    title: 'Artificial Intelligence and the Future of Work',
    minutes: 5,
    text: [
      'Few technological developments have generated as much speculation as artificial intelligence. Predictions range from utopian visions of effortless abundance to dystopian warnings of mass unemployment. The reality, as is so often the case, is considerably more nuanced: AI is likely to transform the nature of work rather than simply eliminate it.',
      'Historical precedent supports this view. The mechanisation of agriculture in the nineteenth century displaced millions of farm workers, yet it ultimately created more jobs in manufacturing and services than it destroyed. The key distinction, economists argue, is between tasks and occupations: machines have repeatedly replaced specific tasks — lifting, counting, retrieving — while generating demand for new tasks that require human judgement, creativity and interpersonal skills.',
      'The current wave of AI, however, differs from previous technologies in one crucial respect: it encroaches on cognitive territory that was once the exclusive domain of educated professionals. Legal research, medical diagnosis, financial analysis and even software engineering all involve pattern recognition that machine learning models perform with growing proficiency. This has prompted concern among white-collar workers, a demographic that had largely considered itself immune to automation.',
      'Yet the evidence to date suggests that AI functions more effectively as an augmenting tool than as a wholesale substitute. Physicians who consult AI diagnostic systems make fewer errors than either humans or machines working alone; analysts who use AI to triage documents spend their time on higher-order synthesis. The productivity gains are real, but they accrue primarily to those who can collaborate with the technology — a capability that depends less on technical mastery than on the ability to frame problems, question outputs and communicate findings.',
      'The policy implications are significant. Educational systems that emphasise the memorisation of facts will need to pivot towards critical thinking, adaptability and lifelong learning, since these are precisely the competencies that machines do not readily replicate. For individual workers, the most prudent strategy is to treat AI as an opportunity to shed routine tasks and concentrate on the distinctly human dimensions of work: empathy, ethical judgement and the capacity for creative synthesis. The future does not belong to those who compete with machines, but to those who learn to command them.'
    ],
    words: [
      { word: 'speculation', meaning: 'guessing or forming ideas without firm evidence', ar: 'تكهنات', example: 'AI has generated much speculation.' },
      { word: 'utopian', meaning: 'describing a perfect imagined society', ar: 'طوباوي', example: 'Utopian visions of effortless abundance.' },
      { word: 'dystopian', meaning: 'describing a frightening imagined society', ar: 'بائس/كئيب', example: 'Dystopian warnings of mass unemployment.' },
      { word: 'nuanced', meaning: 'having fine, subtle distinctions', ar: 'دقيق/متنوع التفاصيل', example: 'The reality is considerably more nuanced.' },
      { word: 'precedent', meaning: 'an earlier example used as a guide', ar: 'سابقة', example: 'Historical precedent supports this view.' },
      { word: 'encroach', meaning: 'to intrude on something gradually', ar: 'يتعدى', example: 'AI encroaches on cognitive territory.' },
      { word: 'proficiency', meaning: 'skill and competence', ar: 'إتقان', example: 'Models perform pattern recognition with growing proficiency.' },
      { word: 'immune', meaning: 'protected from something', ar: 'محصّن', example: 'White-collar workers felt immune to automation.' },
      { word: 'synthesis', meaning: 'combining parts into a whole', ar: 'تركيب', example: 'Higher-order synthesis of information.' },
      { word: 'prudent', meaning: 'wise and careful', ar: 'حكيم', example: 'The most prudent strategy is to adapt.' }
    ],
    questions: [
      { type: 'mcq', question: 'What does the writer say about predictions concerning AI?', options: ['They are mostly accurate', 'They are too extreme and the reality is more nuanced', 'They focus only on unemployment', 'They have all proved wrong'], answer: 'B', explanation: 'Predictions range from utopian to dystopian, but “the reality… is considerably more nuanced.”' },
      { type: 'mcq', question: 'What distinction do economists make regarding automation?', options: ['Between manual and office work', 'Between tasks and occupations', 'Between machines and software', 'Between workers and managers'], answer: 'B', explanation: '“The key distinction… is between tasks and occupations.”' },
      { type: 'mcq', question: 'How does the current wave of AI differ from previous technologies?', options: ['It affects only manufacturing', 'It encroaches on cognitive work once done by professionals', 'It is cheaper to install', 'It requires no electricity'], answer: 'B', explanation: 'AI “encroaches on cognitive territory that was once the exclusive domain of educated professionals.”' },
      { type: 'mcq', question: 'What do the examples of physicians and analysts suggest?', options: ['AI should replace humans entirely', 'AI works best as an augmenting tool alongside humans', 'AI makes more errors than humans', 'AI is not useful in medicine'], answer: 'B', explanation: 'Humans and AI working together outperform either alone — AI functions as an “augmenting tool.”' },
      { type: 'mcq', question: 'What will educational systems need to emphasise, according to the writer?', options: ['Memorisation of facts', 'Critical thinking, adaptability and lifelong learning', 'Technical programming', 'Speed of calculation'], answer: 'B', explanation: 'Systems must “pivot towards critical thinking, adaptability and lifelong learning.”' }
    ]
  },
  /* ===================== C2 ===================== */
  {
    id: 'GR-C2-1',
    level: 'c2',
    title: 'The Epistemology of Expertise',
    minutes: 6,
    text: [
      'Expertise occupies an uneasy position in contemporary intellectual life. We defer to specialists in domains ranging from cardiology to constitutional law, yet we are simultaneously warned that experts are frequently wrong, that credentials confer no immunity from bias, and that the cumulative judgement of crowds can outperform the most accomplished individual. Reconciling these competing intuitions requires a more precise account of what expertise is and the conditions under which it can be trusted.',
      'A useful distinction, elaborated by the philosopher of science Harry Collins, separates two forms of expertise. The first, contributory expertise, is the ability to perform within a field — to conduct experiments, to draft judgments, to operate on patients. The second, interactional expertise, is the capacity to talk fluently and credibly about a field without being able to practise it. Interactional expertise explains how journalists, administrators and policy-makers can engage meaningfully with specialist communities despite lacking their technical skills, and it suggests that the boundary between expert and layperson is more permeable than is commonly assumed.',
      'The reliability of expert judgement, meanwhile, is highly context-dependent. In domains characterised by stable environments and frequent, unambiguous feedback — meteorology, chess, the diagnosis of common ailments — calibrated expertise develops readily, and the expert\'s intuition is a dependable instrument. In domains where feedback is delayed, sparse or systematically distorted, such as macroeconomic forecasting or the prediction of geopolitical events, even eminent specialists exhibit accuracy scarcely better than chance. The celebrated psychologist Daniel Kahneman has argued that in such “low-validity” environments, the pretensions of expertise are largely illusory, and that simple statistical models, however crude, routinely outperform subjective judgement.',
      'This analysis carries sobering implications for the learner. The acquisition of expertise is not a matter of mere exposure or diligent accumulation of facts; it demands deliberate practice — the structured, effortful engagement with tasks at the edge of one\'s competence, accompanied by immediate feedback and the systematic correction of error. Without such practice, performance plateaus, and the individual mistakes fluency for mastery.',
      'Yet the most profound insight is that genuine expertise is characterised not by the confident assertion of conclusions but by the nuanced appreciation of uncertainty. The novice perceives a problem in black and white; the expert discerns a spectrum of probabilities, contingencies and trade-offs. To cultivate expertise, therefore, is to cultivate intellectual humility — the recognition that knowledge is provisional, that one\'s own judgement is fallible, and that the mark of true understanding is the ability to articulate precisely what one does not know.'
    ],
    words: [
      { word: 'epistemology', meaning: 'the study of knowledge and how we know things', ar: 'نظرية المعرفة', example: 'The epistemology of expertise.' },
      { word: 'defer', meaning: 'to accept someone else\'s judgement', ar: 'يخضع/يذعن', example: 'We defer to specialists in many domains.' },
      { word: 'credentials', meaning: 'qualifications or evidence of ability', ar: 'مؤهلات', example: 'Credentials confer no immunity from bias.' },
      { word: 'permeable', meaning: 'allowing things to pass through', ar: 'نفّاذ', example: 'The boundary between expert and layperson is permeable.' },
      { word: 'unambiguous', meaning: 'clear, with only one meaning', ar: 'لا لبس فيه', example: 'Frequent, unambiguous feedback.' },
      { word: 'calibrated', meaning: 'carefully adjusted to be accurate', ar: 'مُعايَر', example: 'Calibrated expertise develops readily.' },
      { word: 'illusory', meaning: 'based on illusion, not real', ar: 'وهمي', example: 'The pretensions of expertise are largely illusory.' },
      { word: 'sobering', meaning: 'making you feel serious and thoughtful', ar: 'مُذكّر بالواقع', example: 'A sobering implication for learners.' },
      { word: 'plateau', meaning: 'to stop improving after progress', ar: 'يستقر/يركد', example: 'Without practice, performance plateaus.' },
      { word: 'provisional', meaning: 'not final, temporary', ar: 'مؤقت', example: 'Knowledge is provisional.' },
      { word: 'fallible', meaning: 'capable of making mistakes', ar: 'قابل للخطأ', example: 'One\'s own judgement is fallible.' }
    ],
    questions: [
      { type: 'mcq', question: 'What does the writer say about the status of expertise in modern intellectual life?', options: ['It is universally trusted', 'It is both deferred to and distrusted', 'It has lost all influence', 'It applies only to science'], answer: 'B', explanation: 'We “defer to specialists” yet are “warned that experts are frequently wrong” — both at once.' },
      { type: 'mcq', question: 'What is “interactional expertise”?', options: ['The ability to perform within a field', 'The ability to talk credibly about a field without practising it', 'Expertise in social interaction', 'Knowledge gained from interaction with machines'], answer: 'B', explanation: 'Interactional expertise is “the capacity to talk fluently and credibly about a field without being able to practise it.”' },
      { type: 'mcq', question: 'In which type of environment does expert intuition become dependable?', options: ['Where feedback is delayed', 'Where feedback is frequent and unambiguous', 'Where the domain is unpredictable', 'Where models are crude'], answer: 'B', explanation: 'In “stable environments and frequent, unambiguous feedback… the expert\'s intuition is a dependable instrument.”' },
      { type: 'mcq', question: 'What does Kahneman say about “low-validity” environments?', options: ['Expertise is especially valuable', 'The pretensions of expertise are largely illusory', 'Statistical models are useless', 'Feedback is more reliable'], answer: 'B', explanation: 'In low-validity environments, “the pretensions of expertise are largely illusory” and simple models outperform judgement.' },
      { type: 'mcq', question: 'What does deliberate practice require?', options: ['Mere exposure to information', 'Effortful engagement with tasks at the edge of competence and immediate feedback', 'Long hours of passive reading', 'Memorising expert opinions'], answer: 'B', explanation: 'Deliberate practice is “structured, effortful engagement with tasks at the edge of one\'s competence, accompanied by immediate feedback.”' },
      { type: 'mcq', question: 'What marks genuine expertise, according to the final paragraph?', options: ['Confident assertion of conclusions', 'The nuanced appreciation of uncertainty', 'A large store of facts', 'Speed of decision-making'], answer: 'B', explanation: 'Genuine expertise is “the nuanced appreciation of uncertainty.”' }
    ]
  },
  {
    id: 'GR-C2-2',
    level: 'c2',
    title: 'The Architecture of Attention in a Distracted Age',
    minutes: 6,
    text: [
      'Attention, the psychologist William James once observed, is the taking possession by the mind, in clear and vivid form, of one of what seem several simultaneously possible objects or trains of thought. A century later, this scarce cognitive resource has become the central battleground of the digital economy, where an entire industry is devoted to capturing, monetising and fragmenting it. Understanding the architecture of attention is therefore not merely an academic curiosity but a precondition for autonomy in contemporary life.',
      'The mechanisms that render attention vulnerable are well documented. Intermittent reinforcement — the unpredictable arrival of notifications, likes and messages — exploits the same neural circuitry as slot machines, creating a compulsion to check that is experienced as almost involuntary. The phenomenon of “variable reward” ensures that even trivial information acquires salience, because the brain, ever alert to the possibility of novelty, assigns disproportionate weight to the uncertain payoff of each glance.',
      'The consequences extend beyond the merely irritating. Sustained distraction impairs the capacity for deep work — the prolonged, uninterrupted concentration required for complex problem-solving, the composition of extended arguments and the mastery of difficult material. Research suggests that the mere presence of a smartphone, even switched off and face-down, measurably diminishes available working memory, a finding that underscores how profoundly the environment shapes cognition. The learner who imagines that willpower alone can resist this architecture is, in most cases, overestimating the force of intention against the accumulated design of a thousand engineers.',
      'What, then, is to be done? The most robust responses are architectural rather than attitudinal: they restructure the environment rather than exhorting the individual to try harder. The removal of notifications at the device level, the physical separation of work and leisure devices, the scheduling of communication into discrete windows, and the cultivation of what the essayist Jenny Odell calls “attention as care” — the deliberate, loving investment of attention in a chosen subject — all constitute forms of resistance that are sustainable precisely because they do not depend on momentary resolve.',
      'The deeper point is philosophical. The way we allocate attention is, in the most literal sense, the way we allocate a life; every act of attending is simultaneously an act of not attending to everything else. To reclaim attention, then, is to reclaim the capacity for choice itself. In an age engineered for distraction, the quiet discipline of sustained focus is not a retreat from the world but the most subversive form of engagement with it.'
    ],
    words: [
      { word: 'monetise', meaning: 'to earn money from something', ar: 'يحقق ربحاً من', example: 'An industry devoted to monetising attention.' },
      { word: 'fragmenting', meaning: 'breaking into small pieces', ar: 'تجزئة', example: 'Attention is being fragmented.' },
      { word: 'autonomy', meaning: 'the freedom to govern oneself', ar: 'استقلالية', example: 'Attention is a precondition for autonomy.' },
      { word: 'intermittent', meaning: 'happening at irregular intervals', ar: 'متقطع', example: 'Intermittent reinforcement.' },
      { word: 'circuitry', meaning: 'the system of connections (here: in the brain)', ar: 'دوائر', example: 'It exploits the same neural circuitry as slot machines.' },
      { word: 'salience', meaning: 'prominence or importance', ar: 'بروز/أهمية', example: 'Trivial information acquires salience.' },
      { word: 'diminish', meaning: 'to make smaller or weaker', ar: 'يقلل', example: 'A phone diminishes available working memory.' },
      { word: 'exhorting', meaning: 'strongly urging someone', ar: 'يحث', example: 'Rather than exhorting the individual to try harder.' },
      { word: 'resolve', meaning: 'firm determination', ar: 'عزيمة', example: 'They do not depend on momentary resolve.' },
      { word: 'subversive', meaning: 'intended to undermine the established order', ar: 'مُخرب/مقاوم', example: 'Focused attention is a subversive act.' }
    ],
    questions: [
      { type: 'mcq', question: 'Why does the writer call attention a “battleground of the digital economy”?', options: ['Because attention is unlimited', 'Because an industry captures and monetises it', 'Because it cannot be measured', 'Because only engineers possess it'], answer: 'B', explanation: 'An entire industry is “devoted to capturing, monetising and fragmenting it.”' },
      { type: 'mcq', question: 'Why does “variable reward” make people check their devices compulsively?', options: ['The rewards are always large', 'The brain assigns weight to uncertain novelty', 'Notifications arrive at fixed times', 'Devices are habit-forming by law'], answer: 'B', explanation: 'The brain assigns “disproportionate weight to the uncertain payoff of each glance.”' },
      { type: 'mcq', question: 'What does research suggest about a smartphone that is switched off?', options: ['It has no effect on cognition', 'Its mere presence diminishes working memory', 'It improves concentration', 'It only distracts when used'], answer: 'B', explanation: 'Even switched off and face-down, a phone\'s presence “measurably diminishes available working memory.”' },
      { type: 'mcq', question: 'What kind of response does the writer consider most robust?', options: ['Attitudinal — trying harder', 'Architectural — restructuring the environment', 'Legislative — new laws', 'Technological — better apps'], answer: 'B', explanation: '“The most robust responses are architectural rather than attitudinal: they restructure the environment.”' },
      { type: 'mcq', question: 'What does the writer mean by “attention as care”?', options: ['Monitoring attention scientifically', 'The deliberate, loving investment of attention in a chosen subject', 'Caring for digital devices', 'Attention paid to health'], answer: 'B', explanation: 'Odell\'s phrase describes “the deliberate, loving investment of attention in a chosen subject.”' },
      { type: 'mcq', question: 'What is the writer\'s philosophical conclusion?', options: ['Distraction is inevitable', 'How we allocate attention is how we allocate a life', 'Focus is a retreat from the world', 'Willpower can solve distraction'], answer: 'B', explanation: '“The way we allocate attention is… the way we allocate a life,” and reclaiming it reclaims choice itself.' }
    ]
  }
];

/* ---------------- BUILT-IN TRANSLATION DICTIONARY ---------------- */
/* Offline English ↔ Arabic glossary used by the Translator tool and
   word-tap lookups in the graded readers. Covers the reading
   glossaries plus common academic / IELTS vocabulary. */
const TRANSLATION_DICT = [
  // ---- everyday / A1-A2 ----
  { en: 'morning', ar: 'صباح' }, { en: 'afternoon', ar: 'بعد الظهر' }, { en: 'evening', ar: 'مساء' },
  { en: 'night', ar: 'ليل' }, { en: 'day', ar: 'يوم' }, { en: 'week', ar: 'أسبوع' },
  { en: 'month', ar: 'شهر' }, { en: 'year', ar: 'سنة' }, { en: 'time', ar: 'وقت' },
  { en: 'hour', ar: 'ساعة' }, { en: 'minute', ar: 'دقيقة' }, { en: 'today', ar: 'اليوم' },
  { en: 'tomorrow', ar: 'غداً' }, { en: 'yesterday', ar: 'أمس' }, { en: 'now', ar: 'الآن' },
  { en: 'family', ar: 'عائلة' }, { en: 'father', ar: 'أب' }, { en: 'mother', ar: 'أم' },
  { en: 'brother', ar: 'أخ' }, { en: 'sister', ar: 'أخت' }, { en: 'son', ar: 'ابن' },
  { en: 'daughter', ar: 'ابنة' }, { en: 'friend', ar: 'صديق' }, { en: 'person', ar: 'شخص' },
  { en: 'people', ar: 'ناس' }, { en: 'man', ar: 'رجل' }, { en: 'woman', ar: 'امرأة' },
  { en: 'child', ar: 'طفل' }, { en: 'home', ar: 'منزل' }, { en: 'house', ar: 'بيت' },
  { en: 'flat', ar: 'شقة' }, { en: 'room', ar: 'غرفة' }, { en: 'kitchen', ar: 'مطبخ' },
  { en: 'door', ar: 'باب' }, { en: 'window', ar: 'نافذة' }, { en: 'table', ar: 'طاولة' },
  { en: 'chair', ar: 'كرسي' }, { en: 'bed', ar: 'سرير' }, { en: 'school', ar: 'مدرسة' },
  { en: 'university', ar: 'جامعة' }, { en: 'teacher', ar: 'معلّم' }, { en: 'student', ar: 'طالب' },
  { en: 'class', ar: 'فصل/حصة' }, { en: 'book', ar: 'كتاب' }, { en: 'pen', ar: 'قلم' },
  { en: 'paper', ar: 'ورق' }, { en: 'work', ar: 'عمل' }, { en: 'job', ar: 'وظيفة' },
  { en: 'office', ar: 'مكتب' }, { en: 'hospital', ar: 'مستشفى' }, { en: 'doctor', ar: 'طبيب' },
  { en: 'nurse', ar: 'ممرض' }, { en: 'shop', ar: 'متجر' }, { en: 'market', ar: 'سوق' },
  { en: 'money', ar: 'مال' }, { en: 'price', ar: 'سعر' }, { en: 'food', ar: 'طعام' },
  { en: 'water', ar: 'ماء' }, { en: 'bread', ar: 'خبز' }, { en: 'breakfast', ar: 'فطور' },
  { en: 'lunch', ar: 'غداء' }, { en: 'dinner', ar: 'عشاء' }, { en: 'tea', ar: 'شاي' },
  { en: 'coffee', ar: 'قهوة' }, { en: 'milk', ar: 'حليب' }, { en: 'fruit', ar: 'فاكهة' },
  { en: 'vegetable', ar: 'خضار' }, { en: 'apple', ar: 'تفاحة' }, { en: 'city', ar: 'مدينة' },
  { en: 'village', ar: 'قرية' }, { en: 'street', ar: 'شارع' }, { en: 'road', ar: 'طريق' },
  { en: 'car', ar: 'سيارة' }, { en: 'bus', ar: 'حافلة' }, { en: 'train', ar: 'قطار' },
  { en: 'plane', ar: 'طائرة' }, { en: 'bike', ar: 'دراجة' }, { en: 'airport', ar: 'مطار' },
  { en: 'station', ar: 'محطة' }, { en: 'park', ar: 'حديقة' }, { en: 'garden', ar: 'حديقة منزل' },
  { en: 'tree', ar: 'شجرة' }, { en: 'flower', ar: 'زهرة' }, { en: 'sky', ar: 'سماء' },
  { en: 'sun', ar: 'شمس' }, { en: 'moon', ar: 'قمر' }, { en: 'weather', ar: 'طقس' },
  { en: 'rain', ar: 'مطر' }, { en: 'hot', ar: 'حار' }, { en: 'cold', ar: 'بارد' },
  { en: 'big', ar: 'كبير' }, { en: 'small', ar: 'صغير' }, { en: 'new', ar: 'جديد' },
  { en: 'old', ar: 'قديم' }, { en: 'good', ar: 'جيد' }, { en: 'bad', ar: 'سيئ' },
  { en: 'happy', ar: 'سعيد' }, { en: 'sad', ar: 'حزين' }, { en: 'beautiful', ar: 'جميل' },
  { en: 'easy', ar: 'سهل' }, { en: 'difficult', ar: 'صعب' }, { en: 'fast', ar: 'سريع' },
  { en: 'slow', ar: 'بطيء' }, { en: 'cheap', ar: 'رخيص' }, { en: 'expensive', ar: 'غالي' },
  { en: 'early', ar: 'مبكر' }, { en: 'late', ar: 'متأخر' }, { en: 'always', ar: 'دائماً' },
  { en: 'never', ar: 'أبداً' }, { en: 'often', ar: 'غالباً' }, { en: 'sometimes', ar: 'أحياناً' },
  { en: 'bright', ar: 'مُشرق' }, { en: 'brush', ar: 'يفرّش' }, { en: 'together', ar: 'معاً' }, { en: 'cousin', ar: 'ابن العم/الخال' }, { en: 'traffic', ar: 'حركة المرور' }, { en: 'ancient', ar: 'قديم' }, { en: 'statue', ar: 'تمثال' }, { en: 'flash', ar: 'فلاش' }, { en: 'tower', ar: 'برج' }, { en: 'sporty', ar: 'رياضي' }, { en: 'hall', ar: 'قاعة' }, { en: 'hit', ar: 'يضرب' }, { en: 'afraid', ar: 'خائف' },
  { en: 'eat', ar: 'يأكل' }, { en: 'drink', ar: 'يشرب' }, { en: 'sleep', ar: 'ينام' },
  { en: 'wake up', ar: 'يستيقظ' }, { en: 'go', ar: 'يذهب' }, { en: 'come', ar: 'يأتي' },
  { en: 'live', ar: 'يعيش' }, { en: 'work', ar: 'يعمل' }, { en: 'study', ar: 'يدرس' },
  { en: 'play', ar: 'يلعب' }, { en: 'read', ar: 'يقرأ' }, { en: 'write', ar: 'يكتب' },
  { en: 'speak', ar: 'يتحدث' }, { en: 'listen', ar: 'يستمع' }, { en: 'see', ar: 'يرى' },
  { en: 'look', ar: 'ينظر' }, { en: 'buy', ar: 'يشتري' }, { en: 'sell', ar: 'يبيع' },
  { en: 'help', ar: 'يساعد' }, { en: 'like', ar: 'يحب' }, { en: 'love', ar: 'يعشق' },
  { en: 'want', ar: 'يريد' }, { en: 'need', ar: 'يحتاج' }, { en: 'know', ar: 'يعرف' },
  { en: 'think', ar: 'يفكر' }, { en: 'understand', ar: 'يفهم' }, { en: 'remember', ar: 'يتذكر' },
  { en: 'forget', ar: 'ينسى' }, { en: 'learn', ar: 'يتعلم' }, { en: 'teach', ar: 'يعلّم' },
  { en: 'ask', ar: 'يسأل' }, { en: 'answer', ar: 'يجيب' }, { en: 'give', ar: 'يعطي' },
  { en: 'take', ar: 'يأخذ' }, { en: 'open', ar: 'يفتح' }, { en: 'close', ar: 'يغلق' },
  { en: 'start', ar: 'يبدأ' }, { en: 'finish', ar: 'ينهي' }, { en: 'stop', ar: 'يتوقف' },
  // ---- academic / IELTS B1-C1 ----
  { en: 'significant', ar: 'مهم/كبير' }, { en: 'significant amount', ar: 'كمية كبيرة' },
  { en: 'significant impact', ar: 'تأثير كبير' }, { en: 'benefit', ar: 'فائدة' },
  { en: 'disadvantage', ar: 'عيب/مساوئ' }, { en: 'advantage', ar: 'ميزة' },
  { en: 'increase', ar: 'زيادة/يزيد' }, { en: 'decrease', ar: 'انخفاض/ينخفض' },
  { en: 'reduce', ar: 'يقلل' }, { en: 'improve', ar: 'يحسّن' }, { en: 'develop', ar: 'يطوّر' },
  { en: 'development', ar: 'تطوير' }, { en: 'growth', ar: 'نمو' }, { en: 'decline', ar: 'انحدار' },
  { en: 'trend', ar: 'اتجاه' }, { en: 'pattern', ar: 'نمط' }, { en: 'change', ar: 'تغيير' },
  { en: 'effect', ar: 'تأثير' }, { en: 'affect', ar: 'يؤثر على' }, { en: 'cause', ar: 'سبب' },
  { en: 'result', ar: 'نتيجة' }, { en: 'solution', ar: 'حل' }, { en: 'problem', ar: 'مشكلة' },
  { en: 'issue', ar: 'قضية' }, { en: 'challenge', ar: 'تحدي' }, { en: 'opportunity', ar: 'فرصة' },
  { en: 'environment', ar: 'بيئة' }, { en: 'environmental', ar: 'بيئي' }, { en: 'pollution', ar: 'تلوث' },
  { en: 'climate', ar: 'مناخ' }, { en: 'energy', ar: 'طاقة' }, { en: 'resource', ar: 'مورد' },
  { en: 'population', ar: 'سكان' }, { en: 'society', ar: 'مجتمع' }, { en: 'government', ar: 'حكومة' },
  { en: 'policy', ar: 'سياسة' }, { en: 'economy', ar: 'اقتصاد' }, { en: 'economic', ar: 'اقتصادي' },
  { en: 'industry', ar: 'صناعة' }, { en: 'technology', ar: 'تكنولوجيا' }, { en: 'science', ar: 'علم' },
  { en: 'research', ar: 'بحث' }, { en: 'study', ar: 'دراسة' }, { en: 'evidence', ar: 'دليل' },
  { en: 'data', ar: 'بيانات' }, { en: 'information', ar: 'معلومات' }, { en: 'knowledge', ar: 'معرفة' },
  { en: 'education', ar: 'تعليم' }, { en: 'educational', ar: 'تعليمي' }, { en: 'learning', ar: 'تعلم' },
  { en: 'language', ar: 'لغة' }, { en: 'vocabulary', ar: 'مفردات' }, { en: 'grammar', ar: 'قواعد' },
  { en: 'skill', ar: 'مهارة' }, { en: 'ability', ar: 'قدرة' }, { en: 'experience', ar: 'خبرة/تجربة' },
  { en: 'health', ar: 'صحة' }, { en: 'healthcare', ar: 'رعاية صحية' }, { en: 'disease', ar: 'مرض' },
  { en: 'treatment', ar: 'علاج' }, { en: 'nutrition', ar: 'تغذية' }, { en: 'agriculture', ar: 'زراعة' },
  { en: 'transport', ar: 'نقل' }, { en: 'infrastructure', ar: 'بنية تحتية' }, { en: 'housing', ar: 'سكن' },
  { en: 'urban', ar: 'حضري' }, { en: 'rural', ar: 'ريفي' }, { en: 'global', ar: 'عالمي' },
  { en: 'international', ar: 'دولي' }, { en: 'cultural', ar: 'ثقافي' }, { en: 'social', ar: 'اجتماعي' },
  { en: 'personal', ar: 'شخصي' }, { en: 'professional', ar: 'مهني' }, { en: 'public', ar: 'عام' },
  { en: 'private', ar: 'خاص' }, { en: 'available', ar: 'متاح' }, { en: 'necessary', ar: 'ضروري' },
  { en: 'essential', ar: 'أساسي' }, { en: 'important', ar: 'مهم' }, { en: 'relevant', ar: 'ذو صلة' },
  { en: 'effective', ar: 'فعال' }, { en: 'efficient', ar: 'كفؤ' }, { en: 'accurate', ar: 'دقيق' },
  { en: 'reliable', ar: 'موثوق' }, { en: 'flexible', ar: 'مرن' }, { en: 'sustainable', ar: 'مستدام' },
  { en: 'potential', ar: 'محتمل/إمكانية' }, { en: 'factors', ar: 'عوامل' }, { en: 'aspect', ar: 'جانب' },
  { en: 'approach', ar: 'نهج/أسلوب' }, { en: 'method', ar: 'طريقة' }, { en: 'strategy', ar: 'استراتيجية' },
  { en: 'analysis', ar: 'تحليل' }, { en: 'comparison', ar: 'مقارنة' }, { en: 'contrast', ar: 'تباين' },
  { en: 'conclusion', ar: 'استنتاج' }, { en: 'argument', ar: 'حجة' }, { en: 'opinion', ar: 'رأي' },
  { en: 'point of view', ar: 'وجهة نظر' }, { en: 'perspective', ar: 'منظور' }, { en: 'theory', ar: 'نظرية' },
  { en: 'concept', ar: 'مفهوم' }, { en: 'principle', ar: 'مبدأ' }, { en: 'standard', ar: 'معيار' },
  { en: 'quality', ar: 'جودة' }, { en: 'quantity', ar: 'كمية' }, { en: 'majority', ar: 'أغلبية' },
  { en: 'minority', ar: 'أقلية' }, { en: 'individual', ar: 'فرد' }, { en: 'community', ar: 'مجتمع محلي' },
  { en: 'consumer', ar: 'مستهلك' }, { en: 'customer', ar: 'عميل' }, { en: 'employee', ar: 'موظف' },
  { en: 'employer', ar: 'صاحب عمل' }, { en: 'unemployment', ar: 'بطالة' }, { en: 'income', ar: 'دخل' },
  { en: 'tax', ar: 'ضريبة' }, { en: 'budget', ar: 'ميزانية' }, { en: 'investment', ar: 'استثمار' },
  { en: 'trade', ar: 'تجارة' }, { en: 'export', ar: 'تصدير' }, { en: 'import', ar: 'استيراد' },
  { en: 'manufacturing', ar: 'تصنيع' }, { en: 'production', ar: 'إنتاج' }, { en: 'consumption', ar: 'استهلاك' },
  { en: 'demand', ar: 'طلب' }, { en: 'supply', ar: 'عرض' }, { en: 'price', ar: 'سعر' },
  { en: 'marketing', ar: 'تسويق' }, { en: 'advertising', ar: 'إعلانات' }, { en: 'communication', ar: 'تواصل' },
  { en: 'conversation', ar: 'محادثة' }, { en: 'discussion', ar: 'نقاش' }, { en: 'interview', ar: 'مقابلة' },
  { en: 'presentation', ar: 'عرض تقديمي' }, { en: 'lecture', ar: 'محاضرة' }, { en: 'seminar', ar: 'ندوة' },
  { en: 'conference', ar: 'مؤتمر' }, { en: 'examination', ar: 'امتحان' }, { en: 'assessment', ar: 'تقييم' },
  { en: 'achievement', ar: 'إنجاز' }, { en: 'success', ar: 'نجاح' }, { en: 'failure', ar: 'فشل' },
  { en: 'progress', ar: 'تقدّم' }, { en: 'improvement', ar: 'تحسّن' }, { en: 'motivation', ar: 'دافع' },
  { en: 'concentration', ar: 'تركيز' }, { en: 'attention', ar: 'انتباه' }, { en: 'memory', ar: 'ذاكرة' },
  { en: 'habit', ar: 'عادة' }, { en: 'routine', ar: 'روتين' }, { en: 'schedule', ar: 'جدول' },
  { en: 'goal', ar: 'هدف' }, { en: 'target', ar: 'هدف/مستهدف' }, { en: 'deadline', ar: 'موعد نهائي' },
  { en: 'effort', ar: 'جهد' }, { en: 'practice', ar: 'ممارسة' }, { en: 'training', ar: 'تدريب' },
  { en: 'exercise', ar: 'تمرين' }, { en: 'revision', ar: 'مراجعة' }, { en: 'review', ar: 'مراجعة' },
  { en: 'summary', ar: 'ملخص' }, { en: 'outline', ar: 'مخطط/خطوط عريضة' }, { en: 'draft', ar: 'مسودة' },
  { en: 'essay', ar: 'مقال' }, { en: 'paragraph', ar: 'فقرة' }, { en: 'sentence', ar: 'جملة' },
  { en: 'passage', ar: 'فقرة/نص' }, { en: 'article', ar: 'مقال/مادة' }, { en: 'text', ar: 'نص' },
  { en: 'meaning', ar: 'معنى' }, { en: 'definition', ar: 'تعريف' }, { en: 'translation', ar: 'ترجمة' },
  { en: 'synonym', ar: 'مرادف' }, { en: 'antonym', ar: 'ضد/عكس' }, { en: 'example', ar: 'مثال' },
  { en: 'phrase', ar: 'عبارة' }, { en: 'expression', ar: 'تعبير' }, { en: 'idiom', ar: 'تعبير اصطلاحي' },
  { en: 'pronunciation', ar: 'نطق' }, { en: 'fluency', ar: 'طلاقة' }, { en: 'accuracy', ar: 'دقة' },
  { en: 'band', ar: 'درجة/مستوى' }, { en: 'score', ar: 'نتيجة/علامة' }, { en: 'mark', ar: 'علامة' },
  { en: 'grade', ar: 'درجة' }, { en: 'pass', ar: 'نجاح' }, { en: 'fail', ar: 'رسوب' },
  { en: 'prepare', ar: 'يستعد' }, { en: 'preparation', ar: 'تحضير' }, { en: 'strategy', ar: 'خطة' },
  { en: 'advice', ar: 'نصيحة' }, { en: 'suggestion', ar: 'اقتراح' }, { en: 'recommendation', ar: 'توصية' },
  { en: 'support', ar: 'دعم' }, { en: 'encourage', ar: 'يشجع' }, { en: 'confidence', ar: 'ثقة' },
  { en: 'confident', ar: 'واثق' }, { en: 'nervous', ar: 'متوتر' }, { en: 'stress', ar: 'توتر' },
  { en: 'anxiety', ar: 'قلق' }, { en: 'relax', ar: 'يسترخي' }, { en: 'focus', ar: 'تركيز/يركز' },
  { en: 'distraction', ar: 'إلهاء' }, { en: 'procrastinate', ar: 'يسوّف' }, { en: 'deadline', ar: 'آخر موعد' },
  { en: 'efficient', ar: 'ذو كفاءة' }, { en: 'productive', ar: 'منتج' }, { en: 'productivity', ar: 'إنتاجية' },
  { en: 'schedule', ar: 'جدول زمني' }, { en: 'organise', ar: 'ينظم' }, { en: 'prioritise', ar: 'يرتب الأولويات' },
  // ---- graded reading glossaries (B1-C2) ----
  { en: 'experiment', ar: 'تجربة' }, { en: 'motivated', ar: 'متحمس' },
  { en: 'fall behind', ar: 'يتأخر' }, { en: 'blended', ar: 'مدمج' },
  { en: 'decade', ar: 'عقد' }, { en: 'evaporate', ar: 'يتبخر' }, { en: 'absorb', ar: 'يمتص' },
  { en: 'mature', ar: 'ناضج' }, { en: 'asthma', ar: 'ربو' }, { en: 'maintain', ar: 'يحافظ على' },
  { en: 'automatic', ar: 'تلقائي' }, { en: 'implications', ar: 'آثار' }, { en: 'cue', ar: 'إشارة' },
  { en: 'reinforce', ar: 'يعزز' }, { en: 'consistent', ar: 'مستمر' }, { en: 'temporal', ar: 'زمني' },
  { en: 'friction', ar: 'معوقات' }, { en: 'compound', ar: 'يتراكم' }, { en: 'staggering', ar: 'مذهل' },
  { en: 'emissions', ar: 'انبعاثات' }, { en: 'potent', ar: 'قوي التأثير' }, { en: 'refrigeration', ar: 'تبريد' },
  { en: 'discard', ar: 'يتخلص من' }, { en: 'surplus', ar: 'فائض' }, { en: 'incentive', ar: 'حافز' },
  { en: 'paradox', ar: 'مفارقة' }, { en: 'abundance', ar: 'وفرة' }, { en: 'paralysing', ar: 'مُشلّ' },
  { en: 'cognitive', ar: 'معرفي' }, { en: 'overload', ar: 'حمل زائد' }, { en: 'amplify', ar: 'يضخم' },
  { en: 'asymmetry', ar: 'عدم تناظر' }, { en: 'heuristic', ar: 'قاعدة استرشادية' }, { en: 'satisficing', ar: 'الاكتفاء بأول خيار مقبول' },
  { en: 'speculation', ar: 'تكهنات' }, { en: 'utopian', ar: 'طوباوي' }, { en: 'dystopian', ar: 'بائس' },
  { en: 'nuanced', ar: 'دقيق التفاصيل' }, { en: 'precedent', ar: 'سابقة' }, { en: 'encroach', ar: 'يتعدى' },
  { en: 'proficiency', ar: 'إتقان' }, { en: 'immune', ar: 'محصّن' }, { en: 'synthesis', ar: 'تركيب' },
  { en: 'prudent', ar: 'حكيم' }, { en: 'epistemology', ar: 'نظرية المعرفة' }, { en: 'defer', ar: 'يذعن' },
  { en: 'credentials', ar: 'مؤهلات' }, { en: 'permeable', ar: 'نفّاذ' }, { en: 'unambiguous', ar: 'لا لبس فيه' },
  { en: 'calibrated', ar: 'مُعايَر' }, { en: 'illusory', ar: 'وهمي' }, { en: 'sobering', ar: 'مُذكّر بالواقع' },
  { en: 'plateau', ar: 'يركد' }, { en: 'provisional', ar: 'مؤقت' }, { en: 'fallible', ar: 'قابل للخطأ' },
  { en: 'monetise', ar: 'يحقق ربحاً من' }, { en: 'fragmenting', ar: 'تجزئة' }, { en: 'autonomy', ar: 'استقلالية' },
  { en: 'intermittent', ar: 'متقطع' }, { en: 'circuitry', ar: 'دوائر' }, { en: 'salience', ar: 'بروز' },
  { en: 'diminish', ar: 'يقلل' }, { en: 'exhorting', ar: 'يحث' }, { en: 'resolve', ar: 'عزيمة' },
  { en: 'subversive', ar: 'مقاوم' }
];

/* ---- Expose to window for the app script ---- */
window.IELTS_DATA = { LISTENING_TEST, READING_TEST, WRITING_TASKS, SPEAKING_TEST, LEVELS, LEVEL_UNLOCKS, XP_REWARDS, WEEKLY_EXAM_POOL, TRAINING_MODULES, GRADED_READING, TRANSLATION_DICT };

