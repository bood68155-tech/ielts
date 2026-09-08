/* ============================================================
   IELTS Master — Reading & Listening Quiz Hub
   Comprehensive Academic Reading & Listening question bank
   with detailed passages, auto-grading, timers, and XP sync.
   ============================================================ */
(function () {
  'use strict';

  var $ = function (sel) { return document.querySelector(sel); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]); }); };

  var QUIZ_XP = 15;

  var state = { view: 'home', activeTab: 'reading', testKey: null, qi: 0, answers: {}, score: 0, timer: { running: false, seconds: 0, interval: null }, review: null };

  function cache() {
    var user = window.IELTS_AUTH.getCurrentUser();
    if (!user) return null;
    var c = window.IELTS_AUTH.getScoped('quizhub', null);
    if (!c || !Array.isArray(c.completed)) { c = { completed: {}, bestScores: {} }; window.IELTS_AUTH.setScoped('quizhub', c); }
    return window.IELTS_AUTH.getScoped('quizhub', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('quizhub', c); }

  /* ==========================================================
     EXPANDED QUESTION BANK
     ========================================================== */
  var TESTS = {
    reading: [
      /* -------------------------------------------------------
         PASSAGE 1 – The Architecture of Ancient Civilizations
         Question types: Matching Headings, True / False / Not Given
         ------------------------------------------------------- */
      {
        id: 'r1', title: 'The Architecture of Ancient Civilizations',
        type: 'reading', level: 'b1', timerMinutes: 20,
        passage: [
          'The architectural achievements of ancient civilizations continue to fascinate engineers and historians alike. From the monumental pyramids of Egypt to the intricately designed temples of Mesopotamia, these structures reveal a remarkable understanding of mathematics, astronomy, and materials science that predates modern technology by thousands of years.',
          'In Egypt, the Great Pyramid of Giza, constructed around 2560 BCE, stood as the tallest man-made structure in the world for nearly four millennia. Its construction required the precise placement of approximately 2.3 million limestone blocks, each weighing an average of 2.5 tonnes. Recent discoveries suggest that the Egyptians used a system of internal ramps and counterweights rather than the long external ramps traditionally assumed by scholars.',
          'Mesopotamian architecture took a different approach, largely because the alluvial plains of the Tigris and Euphrates rivers offered no natural stone. Instead, builders developed sophisticated mud-brick techniques, firing bricks in kilns to create durable building materials. The Ziggurat of Ur, built around 2100 BCE, exemplifies this tradition with its massive stepped platform rising in three terraces to a height of approximately 30 metres.',
          'In the Indus Valley, the cities of Harappa and Mohenjo-Daro displayed an astonishing degree of urban planning. Streets were laid out on a precise grid pattern, and every house had access to a private well and an advanced drainage system. The Great Bath of Mohenjo-Daro, a waterproofed pool measuring roughly 12 by 7 metres, is considered one of the earliest examples of public hydraulic engineering.',
          'Perhaps the most enduring architectural legacy belongs to the ancient Greeks, whose temples established principles of proportion and symmetry that still influence Western architecture today. The Parthenon in Athens, completed in 438 BCE, employs subtle optical refinements — its columns bulge slightly in the middle (entasis) and its base curves upward at the centre — to counteract the optical illusions that would otherwise make straight lines appear to sag.',
          'Roman architects inherited Greek aesthetics but added revolutionary engineering innovations. The invention of concrete, the development of the arch and the dome, and the perfection of aqueduct systems allowed the Romans to construct buildings of unprecedented scale. The Pantheon, with its 43-metre unsupported concrete dome, remained the largest dome in the world for over 1,300 years.',
          'Across all these civilizations, architecture served not merely a functional purpose but a deeply symbolic one. Temples and monuments were designed to communicate power, to align with celestial bodies, and to bridge the gap between the human and the divine. The study of ancient architecture thus offers a window into the values, beliefs, and technical capabilities of societies that flourished long before the modern era.'
        ].join('\n\n'),
        questions: [
          { id: 'r1-q1', type: 'mcq', question: 'What does recent research suggest about the construction of the Great Pyramid?', options: ['It was built using long external ramps', 'Internal ramps and counterweights were likely used', 'It was constructed entirely by machine', 'Workers used only hand tools'], answer: 'B', explanation: 'Paragraph 2 states that recent discoveries suggest the Egyptians used a system of internal ramps and counterweights rather than the long external ramps traditionally assumed.' },
          { id: 'r1-q2', type: 'mcq', question: 'Why did Mesopotamian builders develop fired mud-brick techniques?', options: ['To make buildings fireproof', 'Natural stone was unavailable in the alluvial plains', 'Fired bricks were cheaper than stone', 'The climate required waterproof materials'], answer: 'B', explanation: 'Paragraph 3 explains that the alluvial plains of the Tigris and Euphrates offered no natural stone, so builders developed mud-brick techniques.' },
          { id: 'r1-q3', type: 'mcq', question: 'What is notable about the cities of Harappa and Mohenjo-Daro?', options: ['They were built entirely underground', 'Streets followed a precise grid pattern with advanced drainage', 'They had no public buildings', 'They were constructed from volcanic rock'], answer: 'B', explanation: 'Paragraph 4 describes the precise grid pattern, private wells, and advanced drainage system in these Indus Valley cities.' },
          { id: 'r1-q4', type: 'mcq', question: 'What optical refinement did the Parthenon employ?', options: ['Mirrors to reflect sunlight', 'Columns that bulge slightly at the middle (entasis)', 'Coloured glass windows', 'Rotating mechanisms'], answer: 'B', explanation: 'Paragraph 5 describes how columns bulge slightly in the middle (entasis) to counteract optical illusions.' },
          { id: 'r1-q5', type: 'mcq', question: 'What innovation allowed the Romans to construct the Pantheon\'s dome?', options: ['Steel reinforcement', 'Precast concrete', 'Their development of concrete', 'Wooden scaffolding'], answer: 'C', explanation: 'Paragraph 6 credits Roman invention of concrete, along with arches and domes, for buildings of unprecedented scale.' },
          { id: 'r1-q6', type: 'mcq', question: 'According to the passage, architecture in ancient civilizations primarily served to:', options: ['House large populations', 'Communicate power and align with celestial bodies', 'Store agricultural surplus', 'Demonstrate mathematical knowledge'], answer: 'B', explanation: 'The final paragraph states that temples and monuments were designed to communicate power, align with celestial bodies, and bridge the gap between human and divine.' },
          { id: 'r1-q7', type: 'tfng', question: 'The Great Pyramid remained the tallest structure in the world for over 4,000 years.', answer: 'F', explanation: 'Paragraph 2 says it stood as the tallest for "nearly four millennia," not over 4,000 years.' },
          { id: 'r1-q8', type: 'tfng', question: 'The Great Bath of Mohenjo-Daro is considered the oldest surviving pool.', answer: 'NG', explanation: 'The passage says it is "one of the earliest examples of public hydraulic engineering," but does not claim it is the oldest surviving pool.' },
          { id: 'r1-q9', type: 'tfng', question: 'Roman concrete was stronger than modern concrete.', answer: 'NG', explanation: 'The passage never compares Roman concrete strength to modern concrete.' },
          { id: 'r1-q10', type: 'tfng', question: 'The Ziggurat of Ur was built primarily from limestone.', answer: 'F', explanation: 'Paragraph 3 states Mesopotamian builders used mud-brick techniques because natural stone was unavailable.' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 2 – Artificial Intelligence in Modern Healthcare
         Question types: Multiple Choice, Summary Completion
         ------------------------------------------------------- */
      {
        id: 'r2', title: 'Artificial Intelligence in Modern Healthcare',
        type: 'reading', level: 'b2', timerMinutes: 20,
        passage: [
          'Artificial intelligence is rapidly transforming the landscape of modern healthcare, offering tools that promise to enhance diagnostic accuracy, accelerate drug development, and personalise treatment plans. While the technology holds enormous potential, its integration into clinical practice also raises significant ethical, regulatory, and practical challenges that must be carefully addressed.',
          'One of the most promising applications of AI in healthcare is medical imaging analysis. Deep learning algorithms trained on millions of radiological images can now detect abnormalities — including early-stage cancers, retinal diseases, and fractures — with accuracy that matches or exceeds that of experienced radiologists. A 2020 study published in Nature demonstrated that an AI system could identify breast cancer in mammograms with 88.4% sensitivity, compared with 76.9% for human radiologists, while simultaneously reducing false-positive rates by 5.7%.',
          'Beyond diagnostics, AI is revolutionising pharmaceutical research. Traditional drug discovery pipelines typically take 10 to 15 years and cost upwards of two billion dollars per approved drug. Machine learning models can now screen vast chemical libraries to identify promising drug candidates in a fraction of the time. In 2020, the AI company Insilico Medicine used its platform to identify a novel drug target for idiopathic pulmonary fibrosis and advance a candidate molecule to clinical trials in just 18 months — a process that traditionally takes four to five years.',
          'Personalised medicine represents another frontier. By analysing genomic data, electronic health records, and lifestyle factors, AI algorithms can predict which patients are most likely to respond to specific treatments. Oncology has been particularly receptive to this approach: AI-driven tools now help oncologists select chemotherapy regimens tailored to the genetic profile of individual tumours, improving outcomes while reducing unnecessary side effects.',
          'However, the adoption of AI in healthcare is not without obstacles. Data privacy remains a paramount concern, as AI systems require access to vast quantities of sensitive patient information to function effectively. Regulatory frameworks have struggled to keep pace with the speed of technological development, creating uncertainty about liability when AI-assisted diagnoses prove incorrect. Furthermore, there is a risk of perpetuating or amplifying existing biases if training data does not adequately represent diverse patient populations.',
          'The challenge of integrating AI into existing clinical workflows also should not be underestimated. Many healthcare systems rely on legacy IT infrastructure that is incompatible with modern AI tools. Training medical professionals to use these systems effectively requires significant investment in education and ongoing support. Studies have shown that even when AI tools are available, clinician adoption rates remain low if the tools are perceived as disruptive to established practice patterns.',
          'Despite these challenges, the trajectory of AI in healthcare points toward a future in which intelligent systems work alongside clinicians rather than replacing them. The concept of "augmented intelligence" — in which AI enhances human decision-making rather than substituting for it — is gaining traction among policymakers and practitioners alike. As the technology matures and regulatory frameworks evolve, AI has the potential to make healthcare more accurate, efficient, and accessible for patients worldwide.'
        ].join('\n\n'),
        questions: [
          { id: 'r2-q1', type: 'mcq', question: 'What was the AI system\'s sensitivity rate in detecting breast cancer in the 2020 Nature study?', options: ['76.9%', '82.5%', '88.4%', '92.1%'], answer: 'C', explanation: 'Paragraph 2 states the AI system identified breast cancer with 88.4% sensitivity.' },
          { id: 'r2-q2', type: 'mcq', question: 'How long did Insilico Medicine take to advance a drug candidate to clinical trials using AI?', options: ['12 months', '18 months', '3 years', '5 years'], answer: 'B', explanation: 'Paragraph 3 states Insilico Medicine advanced a candidate molecule to clinical trials in just 18 months.' },
          { id: 'r2-q3', type: 'mcq', question: 'What is "augmented intelligence" as described in the passage?', options: ['AI that replaces human doctors entirely', 'AI that enhances human decision-making', 'AI that operates without human oversight', 'AI that only assists in surgery'], answer: 'B', explanation: 'The final paragraph defines augmented intelligence as AI that enhances human decision-making rather than substituting for it.' },
          { id: 'r2-q4', type: 'mcq', question: 'According to the passage, why do clinician adoption rates for AI tools remain low?', options: ['The tools are too expensive', 'The tools are perceived as disruptive to established practice patterns', 'Clinicians are opposed to technology', 'AI tools are inaccurate'], answer: 'B', explanation: 'Paragraph 6 states adoption rates remain low "if the tools are perceived as disruptive to established practice patterns."' },
          { id: 'r2-q5', type: 'mcq', question: 'In which medical field has AI-driven personalised medicine been particularly receptive?', options: ['Dermatology', 'Ophthalmology', 'Oncology', 'Psychiatry'], answer: 'C', explanation: 'Paragraph 4 states "Oncology has been particularly receptive to this approach."' },
          { id: 'r2-q6', type: 'mcq', question: 'How much can traditional drug discovery cost per approved drug?', options: ['Over $500 million', 'Over $1 billion', 'Over $2 billion', 'Over $5 billion'], answer: 'C', explanation: 'Paragraph 3 states traditional pipelines cost "upwards of two billion dollars per approved drug."' },
          { id: 'r2-q7', type: 'summary', question: 'Complete the summary: The AI system in the 2020 study reduced ___ rates by 5.7% compared with human radiologists.', answer: 'false-positive', explanation: 'Paragraph 2 states the AI "reducing false-positive rates by 5.7%."' },
          { id: 'r2-q8', type: 'summary', question: 'Complete the summary: AI can predict which patients are most likely to respond to specific treatments by analysing genomic data, electronic health records, and ___ factors.', answer: 'lifestyle', explanation: 'Paragraph 4 lists genomic data, electronic health records, and lifestyle factors.' },
          { id: 'r2-q9', type: 'summary', question: 'Complete the summary: A major concern about AI in healthcare is ___ privacy, as AI systems require vast quantities of sensitive patient information.', answer: 'data', explanation: 'Paragraph 5 identifies data privacy as a paramount concern.' },
          { id: 'r2-q10', type: 'mcq', question: 'What is the overall tone of the passage regarding AI in healthcare?', options: ['Strongly opposed', 'Entirely optimistic', 'Balanced — acknowledging both potential and challenges', 'Indifferent'], answer: 'C', explanation: 'The passage presents both benefits and challenges, adopting a balanced, measured tone throughout.' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 3 – Climate Change and Ocean Currents
         Question types: Sentence Completion, Multiple Choice
         ------------------------------------------------------- */
      {
        id: 'r3', title: 'Climate Change and Ocean Currents',
        type: 'reading', level: 'b2', timerMinutes: 20,
        passage: [
          'The world\'s oceans are not merely passive reservoirs of water; they are dynamic systems that play a critical role in regulating the Earth\'s climate. Ocean currents, driven by differences in temperature, salinity, and wind patterns, redistribute heat across the globe and influence weather systems on every continent. Scientists now warn that climate change is disrupting these currents in ways that could have profound and potentially irreversible consequences.',
          'The Atlantic Meridional Overturning Circulation, commonly known as the AMOC, is one of the most important ocean current systems on the planet. It functions as a vast conveyor belt, transporting warm surface water from the tropics northward toward Europe and the Arctic, while cold, dense water flows southward at depth. This circulation pattern is responsible for moderating temperatures across Western Europe, keeping cities like London and Paris significantly warmer than other locations at similar latitudes.',
          'Research published in Nature Climate Change in 2021 provided compelling evidence that the AMOC has weakened by approximately 15% since the mid-twentieth century, making it at its weakest point in over a millennium. The primary driver appears to be the influx of freshwater from the accelerating melting of the Greenland ice sheet. As this relatively light freshwater enters the North Atlantic, it reduces the density of surface water, inhibiting the sinking process that drives the deeper component of the circulation.',
          'The consequences of a continued weakening or potential collapse of the AMOC would be far-reaching. Climate models suggest that a significant slowdown could lead to a dramatic cooling of 5 to 10 degrees Celsius across Northern Europe, even as global average temperatures continue to rise. Tropical rainfall patterns could shift substantially, threatening agricultural productivity in South America and sub-Saharan Africa. Sea levels along the eastern coast of North America could rise an additional 15 to 25 centimetres beyond current projections.',
          'Beyond the AMOC, other ocean circulation patterns are also showing signs of change. The Antarctic Circumpolar Current, the largest ocean current in the world, has intensified as westerly winds over the Southern Ocean strengthen in response to greenhouse gas emissions. This intensification has implications for the upwelling of nutrient-rich deep water, which supports the highly productive marine ecosystems of the Southern Ocean.',
          'The Pacific Decadal Oscillation, a long-term pattern of ocean temperature variation, has exhibited increasingly erratic behaviour in recent decades. Scientists attribute this instability to the interaction between natural climate variability and anthropogenic warming. The resulting unpredictability complicates efforts to forecast regional climate patterns and manage marine resources.',
          'Addressing the disruption of ocean currents requires both global and regional action. On the global scale, reducing greenhouse gas emissions remains the most critical intervention. On a regional level, improved ocean monitoring systems — including networks of autonomous floats, satellite altimetry, and deep-sea moorings — are essential for detecting changes early and informing adaptation strategies. International cooperation, as exemplified by the United Nations Decade of Ocean Science for Sustainable Development (2021–2030), is vital for coordinating these efforts and ensuring that the findings of ocean science translate into effective policy.'
        ].join('\n\n'),
        questions: [
          { id: 'r3-q1', type: 'sc', question: 'Complete the sentence: The AMOC functions as a vast conveyor belt, transporting warm surface water from the ___ northward toward Europe.', answer: 'tropics', explanation: 'Paragraph 2 states the AMOC "transporting warm surface water from the tropics northward toward Europe."' },
          { id: 'r3-q2', type: 'sc', question: 'Complete the sentence: The influx of freshwater from the melting Greenland ice sheet reduces the ___ of surface water, inhibiting the sinking process.', answer: 'density', explanation: 'Paragraph 3 states freshwater "reduces the density of surface water, inhibiting the sinking process."' },
          { id: 'r3-q3', type: 'sc', question: 'Complete the sentence: A significant slowdown of the AMOC could lead to a dramatic cooling of 5 to 10 degrees Celsius across ___.', answer: 'Northern Europe', explanation: 'Paragraph 4 specifies "a dramatic cooling of 5 to 10 degrees Celsius across Northern Europe."' },
          { id: 'r3-q4', type: 'sc', question: 'Complete the sentence: The Antarctic Circumpolar Current has intensified as westerly winds over the Southern Ocean ___ in response to greenhouse gas emissions.', answer: 'strengthen', explanation: 'Paragraph 5 states the current has intensified as "westerly winds over the Southern Ocean strengthen."' },
          { id: 'r3-q5', type: 'sc', question: 'Complete the sentence: International cooperation is exemplified by the United Nations Decade of Ocean Science for Sustainable Development (2021–2030), which is vital for ___ these efforts.', answer: 'coordinating', explanation: 'The final paragraph describes the UN Decade as vital for "coordinating these efforts and ensuring that the findings of ocean science translate into effective policy."' },
          { id: 'r3-q6', type: 'mcq', question: 'By how much has the AMOC weakened since the mid-twentieth century?', options: ['5%', '10%', '15%', '25%'], answer: 'C', explanation: 'Paragraph 3 states the AMOC "has weakened by approximately 15%."' },
          { id: 'r3-q7', type: 'mcq', question: 'How much additional sea-level rise along eastern North America could AMOC slowdown cause?', options: ['5 to 10 cm', '15 to 25 cm', '30 to 50 cm', 'Over 1 metre'], answer: 'B', explanation: 'Paragraph 4 states sea levels could rise "an additional 15 to 25 centimetres beyond current projections."' },
          { id: 'r3-q8', type: 'mcq', question: 'What has caused increasingly erratic behaviour in the Pacific Decadal Oscillation?', options: ['Volcanic activity', 'Tectonic shifts', 'Interaction between natural variability and anthropogenic warming', 'Changes in solar radiation'], answer: 'C', explanation: 'Paragraph 6 attributes the instability to "the interaction between natural climate variability and anthropogenic warming."' },
          { id: 'r3-q9', type: 'mcq', question: 'Which is described as the most critical intervention for addressing ocean current disruption?', options: ['Building sea walls', 'Deploying ocean monitoring systems', 'Reducing greenhouse gas emissions', 'Relocating coastal populations'], answer: 'C', explanation: 'The final paragraph states that "reducing greenhouse gas emissions remains the most critical intervention."' },
          { id: 'r3-q10', type: 'mcq', question: 'How long has the AMOC been at its weakest point, according to the 2021 study?', options: ['500 years', '800 years', 'Over a millennium', 'Two millennia'], answer: 'C', explanation: 'Paragraph 3 states it is at "its weakest point in over a millennium."' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 4 – The Evolution of Human Language
         Question types: Yes / No / Not Given, Matching Information
         ------------------------------------------------------- */
      {
        id: 'r4', title: 'The Evolution of Human Language',
        type: 'reading', level: 'c1', timerMinutes: 20,
        passage: [
          'The capacity for language is arguably the most distinctive feature of the human species. While other animals communicate through calls, gestures, and chemical signals, only humans possess a system capable of expressing an infinite number of novel meanings through a finite set of rules. The origins of this extraordinary ability have been the subject of intense scientific debate for over a century.',
          'Charles Darwin proposed in The Descent of Man (1871) that language evolved from musical protolanguage — a system of emotional vocalisations that gradually acquired syntactic structure. This view, largely dormant for much of the twentieth century, has experienced a remarkable resurgence. Neuroscientist Steven Mithen has argued that the human mind underwent a crucial cognitive change around 100,000 years ago, which he terms "the singing Neanderthal hypothesis," in which musical and linguistic capacities were initially intertwined.',
          'The FOXP2 gene, identified in 2001 through the study of a British family with severe speech and language disorders, provided the first molecular evidence linking specific genes to language capacity. Comparative studies revealed that the human version of FOXP2 differs from that of chimpanzees by just two amino acid substitutions. The timing of these mutations, estimated at around 200,000 years ago, coincides approximately with the emergence of anatomically modern humans.',
          'The disintegration of the supercontinent Pangaea, which began roughly 200 million years ago, played no direct role in language evolution but did shape the geographic distribution of human ancestors and the environmental pressures they faced. The varied landscapes of the African Rift Valley, where early hominins evolved, are believed by some researchers to have provided the ecological diversity that stimulated the development of complex communication systems.',
          'Archaeological evidence for the emergence of language remains frustratingly indirect. The oldest known cave paintings, found in El Castillo, Spain, and dated to approximately 40,800 years ago, are often cited as evidence that symbolic thought — and by implication, language — was well established by this period. However, other scholars caution that artistic expression does not necessarily require linguistic competence.',
          'The development of written language, which occurred independently in at least four civilisations — Mesopotamia, Egypt, China, and Mesoamerica — between roughly 3400 and 900 BCE, represents a fundamentally different cognitive achievement from spoken language. Writing requires the deliberate mapping of linguistic units onto visual symbols, a skill that must be explicitly taught rather than acquired naturally through exposure.',
          'Today, approximately 7,000 languages are spoken worldwide, yet linguists estimate that nearly half of these may become extinct by the end of this century. The loss of a language means the loss of an irreplaceable repository of knowledge about human cognition, cultural practices, and the natural world. Efforts to document and revitalise endangered languages have intensified, aided by digital recording technologies and collaborative projects between linguists and indigenous communities.'
        ].join('\n\n'),
        questions: [
          { id: 'r4-q1', type: 'ynng', question: 'Darwin was the first person to suggest that language evolved from emotional vocalisations.', answer: 'NG', explanation: 'The passage states Darwin proposed language evolved from musical protolanguage, but does not claim he was the first to suggest this.' },
          { id: 'r4-q2', type: 'ynng', question: 'The FOXP2 gene mutations in humans occurred around the same time as the emergence of anatomically modern humans.', answer: 'Y', explanation: 'Paragraph 3 states the timing of the mutations "estimated at around 200,000 years ago, coincides approximately with the emergence of anatomically modern humans."' },
          { id: 'r4-q3', type: 'ynng', question: 'All researchers agree that cave paintings are evidence that language existed by 40,800 years ago.', answer: 'N', explanation: 'Paragraph 5 states "other scholars caution that artistic expression does not necessarily require linguistic competence."' },
          { id: 'r4-q4', type: 'ynng', question: 'Writing was first developed in Mesopotamia before any other civilisation.', answer: 'NG', explanation: 'The passage says writing occurred independently in at least four civilisations, but does not rank them chronologically.' },
          { id: 'r4-q5', type: 'ynng', question: 'More than 7,000 languages are currently spoken worldwide.', answer: 'N', explanation: 'The passage states "approximately 7,000 languages are spoken worldwide," not more than 7,000.' },
          { id: 'r4-q6', type: 'match', question: 'Which paragraph discusses the molecular evidence for language capacity?', answer: '3', explanation: 'Paragraph 3 discusses the FOXP2 gene, the first molecular evidence linking specific genes to language capacity.' },
          { id: 'r4-q7', type: 'match', question: 'Which paragraph discusses the loss of endangered languages?', answer: '7', explanation: 'Paragraph 7 discusses the estimated extinction of nearly half of the world\'s languages by the end of this century.' },
          { id: 'r4-q8', type: 'match', question: 'Which paragraph discusses the difference between spoken and written language?', answer: '6', explanation: 'Paragraph 6 describes writing as a "fundamentally different cognitive achievement from spoken language."' },
          { id: 'r4-q9', type: 'match', question: 'Which paragraph mentions the African Rift Valley and its role in hominin evolution?', answer: '4', explanation: 'Paragraph 4 discusses "the varied landscapes of the African Rift Valley, where early hominins evolved."' },
          { id: 'r4-q10', type: 'match', question: 'Which paragraph discusses Steven Mithen\'s "singing Neanderthal" hypothesis?', answer: '2', explanation: 'Paragraph 2 describes Mithen\'s hypothesis that "musical and linguistic capacities were initially intertwined."' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 5 – Sustainable Urban Planning
         Question types: Multiple Choice, Diagram Labelling
         ------------------------------------------------------- */
      {
        id: 'r5', title: 'Sustainable Urban Planning',
        type: 'reading', level: 'b2', timerMinutes: 20,
        passage: [
          'As the global population becomes increasingly urban — with the United Nations projecting that 68% of the world\'s inhabitants will live in cities by 2050 — the need for sustainable urban planning has never been more urgent. Traditional urban development patterns, characterised by car-dependent sprawl, energy-intensive buildings, and inadequate green infrastructure, have contributed significantly to greenhouse gas emissions, air pollution, and social inequality. A new paradigm of urban planning is needed, one that prioritises environmental sustainability, social equity, and economic resilience.',
          'The concept of the "15-minute city," popularised by Professor Carlos Moreno of the Sorbonne, offers an influential framework for rethinking urban design. The core idea is that all essential services — work, shopping, healthcare, education, entertainment, and green space — should be accessible within a 15-minute walk or bicycle ride from any residential area. Paris, Melbourne, and Barcelona have all adopted variations of this model, investing heavily in cycling infrastructure, pedestrian zones, and mixed-use neighbourhoods.',
          'Green building design is another critical component of sustainable urban planning. Passive house standards, originally developed in Germany, reduce heating and cooling energy demands by up to 90% through superior insulation, airtight construction, and heat recovery ventilation systems. When combined with rooftop solar panels and greywater recycling systems, passive buildings can approach net-zero energy consumption, dramatically reducing the carbon footprint of the built environment.',
          'Urban green spaces serve multiple sustainability functions. Parks, green roofs, and urban forests absorb carbon dioxide, filter air pollutants, reduce the urban heat island effect, and manage stormwater runoff. Research published in The Lancet Planetary Health found that cities with extensive green infrastructure experienced 12% fewer heat-related deaths during extreme weather events. Green spaces also provide measurable mental health benefits, with studies showing that residents living within 300 metres of a park report significantly lower levels of stress and anxiety.',
          'Sustainable transportation systems form the backbone of green urban planning. Cities that invest in comprehensive public transit networks, protected cycling lanes, and car-free zones consistently outperform car-dependent cities on environmental metrics. Copenhagen, where 62% of residents cycle to work or study daily, produces approximately 25% less transport-related carbon dioxide per capita than comparable car-dependent cities.',
          'Water management represents an often-overlooked dimension of urban sustainability. Conventional approaches to stormwater — channelling rainwater through underground pipes into rivers or the sea — are increasingly recognised as inefficient and environmentally damaging. The "sponge city" concept, pioneered in China and now adopted in cities worldwide, uses permeable pavements, rain gardens, constructed wetlands, and underground storage tanks to absorb, clean, and reuse rainwater on site, reducing flood risk while replenishing groundwater supplies.',
          'Economic sustainability must also be integrated into urban planning. Green building retrofit programmes, which upgrade existing buildings to meet modern energy-efficiency standards, create significant employment opportunities while reducing operational costs for building owners and tenants. The European Union\'s Renovation Wave strategy aims to double the annual energy renovation rate of buildings by 2030, creating an estimated 160,000 additional green jobs across the continent.'
        ].join('\n\n'),
        questions: [
          { id: 'r5-q1', type: 'mcq', question: 'What percentage of the world\'s population is projected to live in cities by 2050?', options: ['50%', '60%', '68%', '75%'], answer: 'C', explanation: 'Paragraph 1 states the UN projects "68% of the world\'s inhabitants will live in cities by 2050."' },
          { id: 'r5-q2', type: 'mcq', question: 'How much can passive house standards reduce heating and cooling energy demands?', options: ['Up to 50%', 'Up to 70%', 'Up to 90%', 'Up to 95%'], answer: 'C', explanation: 'Paragraph 3 states passive house standards "reduce heating and cooling energy demands by up to 90%."' },
          { id: 'r5-q3', type: 'mcq', question: 'What percentage of Copenhagen residents cycle to work or study daily?', options: ['42%', '52%', '62%', '72%'], answer: 'C', explanation: 'Paragraph 5 states "62% of residents cycle to work or study daily."' },
          { id: 'r5-q4', type: 'mcq', question: 'How many fewer heat-related deaths were experienced by cities with extensive green infrastructure?', options: ['8%', '10%', '12%', '15%'], answer: 'C', explanation: 'Paragraph 4 cites a 12% reduction in heat-related deaths.' },
          { id: 'r5-q5', type: 'mcq', question: 'The EU\'s Renovation Wave aims to create approximately how many additional green jobs?', options: ['60,000', '100,000', '160,000', '250,000'], answer: 'C', explanation: 'Paragraph 7 estimates "160,000 additional green jobs."' },
          { id: 'r5-q6', type: 'mcq', question: 'Within what distance of a park do residents report significantly lower stress levels?', options: ['100 metres', '300 metres', '500 metres', '1 kilometre'], answer: 'B', explanation: 'Paragraph 4 states residents "living within 300 metres of a park report significantly lower levels of stress and anxiety."' },
          { id: 'r5-q7', type: 'diagram', question: 'Label the "sponge city" water management components: The sponge city concept uses permeable pavements, ___ gardens, constructed wetlands, and underground storage tanks.', answer: 'rain', explanation: 'Paragraph 6 lists "permeable pavements, rain gardens, constructed wetlands, and underground storage tanks."' },
          { id: 'r5-q8', type: 'diagram', question: 'Label the "sponge city" water management components: These components absorb, clean, and reuse rainwater on site, reducing ___ risk.', answer: 'flood', explanation: 'Paragraph 6 states the system works by "reducing flood risk while replenishing groundwater supplies."' },
          { id: 'r5-q9', type: 'diagram', question: 'Label the "15-minute city" framework: The 15-minute city ensures all essential services are accessible within a 15-minute walk or ___ ride.', answer: 'bicycle', explanation: 'Paragraph 2 describes services accessible "within a 15-minute walk or bicycle ride."' },
          { id: 'r5-q10', type: 'diagram', question: 'Label the passive house components: Passive house standards use superior insulation, airtight construction, and heat recovery ___ systems.', answer: 'ventilation', explanation: 'Paragraph 3 lists "superior insulation, airtight construction, and heat recovery ventilation systems."' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 6 – Renewable Energy Technologies
         Question types: Matching Headings, Short Answer
         ------------------------------------------------------- */
      {
        id: 'r6', title: 'Renewable Energy Technologies',
        type: 'reading', level: 'c1', timerMinutes: 20,
        passage: [
          'The transition from fossil fuels to renewable energy sources is one of the defining challenges of the twenty-first century. Solar, wind, hydropower, and emerging technologies such as tidal and geothermal energy collectively offer a pathway toward a low-carbon energy system. Yet each technology comes with its own set of advantages, limitations, and environmental considerations that must be carefully evaluated.',
          'Photovoltaic solar energy has experienced dramatic cost reductions over the past decade. The levelised cost of electricity from utility-scale solar photovoltaic systems fell by 89% between 2010 and 2021, making it the cheapest source of new electricity generation in most parts of the world. Modern silicon-based solar panels achieve conversion efficiencies of 22 to 26%, with laboratory prototypes exceeding 47%. However, solar energy is inherently intermittent, generating electricity only during daylight hours, which necessitates either energy storage systems or complementary generation sources.',
          'Wind energy, both onshore and offshore, has emerged as a cornerstone of the clean energy transition. Global installed wind capacity exceeded 800 gigawatts by the end of 2022, with offshore wind growing particularly rapidly in European and Asian markets. Modern wind turbines can convert up to 50% of the kinetic energy in wind into electricity — a significant improvement over the 35% efficiency typical of earlier designs. Offshore wind farms benefit from stronger, more consistent wind patterns but require substantially higher capital investment and face engineering challenges related to marine environments.',
          'Hydropower remains the largest source of renewable electricity globally, accounting for approximately 16% of total world generation. Large-scale reservoir dams provide reliable baseload power and valuable grid storage capacity through pumped-hydro systems. However, the environmental and social costs of large dam projects — including habitat destruction, displacement of communities, and disruption of river ecosystems — have led many countries to seek alternatives. Run-of-river systems, which divert a portion of river flow through turbines without creating large reservoirs, offer a less environmentally damaging alternative, though they provide less storage capacity.',
          'Geothermal energy taps into the Earth\'s internal heat to generate electricity or provide direct heating. Iceland derives approximately 25% of its electricity and nearly 90% of its space heating from geothermal sources. Enhanced geothermal systems, which artificially create geothermal reservoirs by injecting water into hot, dry rock formations deep underground, could dramatically expand the geographic reach of geothermal energy beyond traditional volcanic regions. Pilot projects in France, Australia, and the United States have demonstrated the technical feasibility of this approach.',
          'Tidal and wave energy technologies, while still in relatively early stages of commercial development, offer the advantage of high predictability — tidal patterns can be forecast with precision years in advance. The MeyGen project in Scotland\'s Pentland Firth, currently the world\'s largest tidal stream array, has an installed capacity of 6 megawatts and has generated over 35 gigawatt-hours of electricity since its commissioning in 2018. However, the harsh marine conditions in which tidal turbines operate present significant maintenance challenges.',
          'The integration of these diverse renewable sources into coherent energy systems requires substantial investment in grid infrastructure, energy storage, and demand-response technologies. Battery storage costs have fallen by 97% since 1991, and lithium-ion batteries now provide cost-effective short-duration storage. For longer-duration storage, emerging technologies including compressed air energy storage, iron-air batteries, and green hydrogen production offer promising solutions that could enable fully renewable energy systems within the coming decades.'
        ].join('\n\n'),
        questions: [
          { id: 'r6-q1', type: 'mh', question: 'Match heading to paragraph: "Solar PV — rapid cost decline and efficiency gains"', answer: '2', explanation: 'Paragraph 2 discusses the 89% cost reduction and conversion efficiencies of photovoltaic solar.' },
          { id: 'r6-q2', type: 'mh', question: 'Match heading to paragraph: "Wind — the fastest-growing offshore sector"', answer: '3', explanation: 'Paragraph 3 discusses both onshore and offshore wind, highlighting rapid offshore growth.' },
          { id: 'r6-q3', type: 'mh', question: 'Match heading to paragraph: "Hydropower — the largest but most controversial renewable"', answer: '4', explanation: 'Paragraph 4 discusses hydropower\'s dominance and its environmental/social costs.' },
          { id: 'r6-q4', type: 'mh', question: 'Match heading to paragraph: "Tapping the Earth\'s internal heat beyond volcanic zones"', answer: '5', explanation: 'Paragraph 5 discusses geothermal energy and enhanced geothermal systems expanding beyond volcanic regions.' },
          { id: 'r6-q5', type: 'mh', question: 'Match heading to paragraph: "Predictable power from the sea"', answer: '6', explanation: 'Paragraph 6 discusses tidal and wave energy\'s high predictability.' },
          { id: 'r6-q6', type: 'mh', question: 'Match heading to paragraph: "The infrastructure challenge of a renewable future"', answer: '7', explanation: 'Paragraph 7 discusses grid infrastructure, storage, and integration requirements.' },
          { id: 'r6-q7', type: 'sa', question: 'By what percentage did the levelised cost of utility-scale solar PV fall between 2010 and 2021?', answer: '89%', explanation: 'Paragraph 2 states costs "fell by 89% between 2010 and 2021."' },
          { id: 'r6-q8', type: 'sa', question: 'What percentage of world electricity generation comes from hydropower?', answer: '16%', explanation: 'Paragraph 4 states hydropower accounts for "approximately 16% of total world generation."' },
          { id: 'r6-q9', type: 'sa', question: 'How much electricity has the MeyGen project generated since 2018?', answer: 'Over 35 GWh', explanation: 'Paragraph 6 states it has generated "over 35 gigawatt-hours of electricity since its commissioning in 2018."' },
          { id: 'r6-q10', type: 'sa', question: 'By what percentage have battery storage costs fallen since 1991?', answer: '97%', explanation: 'Paragraph 7 states "Battery storage costs have fallen by 97% since 1991."' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 7 – The Hidden Ladder: Inside the Semiconductor
         Supply Chain [Technology]
         Question types: Multiple Choice, True/False/Not Given,
         Sentence Completion, Short Answer
         ------------------------------------------------------- */
      {
        id: 'r7', title: 'The Hidden Ladder: Inside the Semiconductor Supply Chain',
        type: 'reading', level: 'b2', timerMinutes: 20, band: '6.5',
        passage: [
          'Most people never see a semiconductor, yet these slivers of silicon run almost everything around us: cars, phones, medical devices and the power grid. What is far less visible is how extremely concentrated their production has become. A small group of firms in a handful of countries controls the advanced chips that modern economies depend on.',
          'Making a modern chip begins in a fabrication plant, commonly called a fab. Inside, silicon wafers are processed in cleanrooms so pure that fewer than one particle may exist per cubic metre of air. Workers wear full bodysuits, and the air is filtered, recycled and monitored continuously, because a single speck of dust can ruin an entire batch of microchips.',
          'The heart of chipmaking is photolithography, in which light projects microscopic circuit patterns onto light-sensitive wafers. The most advanced machines use extreme ultraviolet light, and only one company in the world, the Dutch firm ASML, can build them. Each EUV machine costs more than 150 million dollars and takes months to assemble.',
          'Production is also global in the extreme. Design happens mostly in the United States, equipment comes mainly from the Netherlands and Japan, advanced manufacturing is concentrated in Taiwan, and assembly and testing are often done in Malaysia and the Philippines. A single finished chip may cross national borders more than seventy times before it reaches a consumer device.',
          'This concentration brings real risk. Advanced-chip output depends heavily on one Taiwanese firm, and even a local drought that restricts the large volume of water a fab consumes can affect worldwide supply. Geopolitical tension between major economies has therefore pushed governments to pour money into domestic plants. The United States, for example, committed 52 billion dollars through the CHIPS and Science Act, with similar programmes emerging in Europe, Japan and India.',
          'Yet rebuilding capacity is slow. A leading-edge fab costs close to 20 billion dollars and takes several years to construct, and the industry faces a chronic shortage of the highly skilled engineers such plants require. Governments can spend heavily, but they cannot fast-forward a supply chain that has taken four decades to mature.',
          'The likely outcome is not total independence but greater resilience through diversification. Economists argue that a network of suppliers spread across several countries, however imperfect, is safer than one in which a single region carries the entire industry on its shoulders.'
        ].join('\n\n'),
        questions: [
          { id: 'r7-q1', type: 'mcq', question: 'Why are cleanrooms in a semiconductor fab kept so pure?', options: ['To cool the machines', 'Because a single speck of dust can ruin an entire batch', 'To protect workers from sunlight', 'To reduce electricity use'], answer: 'B', explanation: 'Paragraph 2 states that a single speck of dust "can ruin an entire batch of microchips."', kw: 'cleanrooms', loc: 'Paragraph 2', tip: 'Band 6.5 target: locate the reason through the keyword "cleanroom", then read the sentence that follows.' },
          { id: 'r7-q2', type: 'mcq', question: 'What is the Dutch firm ASML famous for?', options: ['Designing smartphone processors', 'Building extreme-ultraviolet lithography machines', 'Manufacturing silicon wafers', 'Assembling consumer devices'], answer: 'B', explanation: 'Paragraph 3 credits ASML as "the only company in the world" able to build extreme-ultraviolet machines.', kw: 'ASML', loc: 'Paragraph 3', tip: 'Band 6.5 target: proper nouns are the fastest keywords to scan for.' },
          { id: 'r7-q3', type: 'mcq', question: 'Why have governments invested heavily in domestic chip plants?', options: ['To reduce electricity prices', 'Because supply is concentrated and therefore risky', 'To produce cheaper smartphones', 'To compete with software companies'], answer: 'B', explanation: 'Paragraph 5 links concentration to risk — a single firm, droughts and geopolitics — and describes the resulting government investment.', kw: 'CHIPS and Science Act', loc: 'Paragraph 5', tip: 'Cause-and-effect questions reward reading the paragraph around a number or law, not just the word itself.' },
          { id: 'r7-q4', type: 'mcq', question: 'What does the passage suggest about rebuilding chip-making capacity?', options: ['It is quick and easy', 'It is slow and extremely expensive', 'It has already been completed', 'It is completely unnecessary'], answer: 'B', explanation: 'Paragraph 6 states a leading-edge fab costs "close to 20 billion dollars" and takes years, with a chronic engineer shortage.', kw: '20 billion dollars', loc: 'Paragraph 6', tip: 'Numbers carry the answer; approximate language ("close to") is typical of Band 7 reports.' },
          { id: 'r7-q5', type: 'tfng', question: 'A finished chip may cross national borders more than seventy times.', answer: 'T', explanation: 'Paragraph 4 states a finished chip "may cross national borders more than seventy times."', kw: 'seventy times', loc: 'Paragraph 4', tip: '"More than" matches exactly — True, never Not Given.' },
          { id: 'r7-q6', type: 'tfng', question: 'ASML produces EUV machines for less than one million dollars each.', answer: 'F', explanation: 'Paragraph 3 says each machine "costs more than 150 million dollars" — the statement contradicts the passage.', kw: '150 million', loc: 'Paragraph 3', tip: 'A figure that contradicts the text is False, not Not Given.' },
          { id: 'r7-q7', type: 'tfng', question: 'A local drought can affect the worldwide supply of advanced chips.', answer: 'T', explanation: 'Paragraph 5 explains that a drought restricting water can "affect worldwide supply."', kw: 'drought', loc: 'Paragraph 5', tip: 'The word "local" in the statement is echoed exactly — confirm before marking True.' },
          { id: 'r7-q8', type: 'tfng', question: 'India now manufactures the majority of the world\'s advanced chips.', answer: 'F', explanation: 'Paragraph 4 names Taiwan as the location where advanced manufacturing is concentrated; India is only mentioned as a new investor.', kw: 'Taiwan', loc: 'Paragraph 4', tip: 'Attribution questions: check WHO does the action, not simply that the country appears in the text.' },
          { id: 'r7-q9', type: 'sc', question: 'Complete the sentence: While design happens largely in the United States, assembly and testing are often done in Malaysia and the ___.', answer: 'Philippines/Philippines.', explanation: 'Paragraph 4 lists "assembly and testing are often done in Malaysia and the Philippines."', kw: 'assembly', loc: 'Paragraph 4', tip: 'Gap hints: "Malaysia and the ___" needs a paired country name.' },
          { id: 'r7-q10', type: 'sa', question: 'Which country is described as dominating advanced-chip manufacturing?', answer: 'Taiwan', explanation: 'Paragraph 5 says output depends on "one Taiwanese firm," and Paragraph 4 says advanced manufacturing is concentrated in Taiwan.', kw: 'single Taiwanese firm', loc: 'Paragraph 5', tip: 'Short answers: one word or a few words; here the country name is enough.' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 8 – Assessment for Learning: Rethinking the Grade
         [Education]
         Question types: Multiple Choice, True/False/Not Given,
         Sentence Completion
         ------------------------------------------------------- */
      {
        id: 'r8', title: 'Assessment for Learning: Rethinking the Grade',
        type: 'reading', level: 'b2', timerMinutes: 20, band: '6.0',
        passage: [
          'For more than a century, school assessment has meant a final grade: a number stamped at the end of a term that tells students how well they performed. This summative model prizes the outcome of learning. Yet a growing body of research argues that when assessment stops at the grade, it throws away most of its educational value.',
          'Formative assessment works differently. It is continuous: teachers gather evidence of learning during lessons, adjust their teaching in response, and give feedback while students can still use it. The classroom becomes a feedback loop instead of a memory test.',
          'Feedback research is strikingly consistent. It is not the quantity of comments that improves learning but their quality. Specific, task-focused feedback that tells a student exactly what to improve, and how, produces large gains. Vague praise such as "good effort" has almost no effect.',
          'Self-assessment and peer review turn students into judges of their own work. Pupils who can appraise their own performance against clear criteria tend to improve faster, because they internalise the standards the teacher is using. Peer feedback adds a second perspective, although it needs careful guidance to avoid inaccuracy.',
          'Digital platforms have accelerated this shift. Adaptive software can present a learner with a tailored question, mark it instantly, and select the next task on the basis of the response, giving every student a personalised path. The same technology, however, raises concerns about privacy and about reducing learning to a stream of micro-scores.',
          'The Assessment for Learning movement has gathered strong institutional backing. Studies coordinated by the OECD suggest that schools using formative techniques well can raise achievement by the equivalent of roughly half a standard deviation, a substantial boost for no extra teaching time.',
          'The conclusion is not that grades are worthless, but that they should serve learning rather than replace it. Assessment becomes powerful when it answers three questions: where is the learner now, where does the learner need to be, and what is the fastest route between the two?'
        ].join('\n\n'),
        questions: [
          { id: 'r8-q1', type: 'mcq', question: 'According to the passage, what is the main weakness of summative assessment?', options: ['It is too expensive to run', 'It stops at the grade and wastes educational value', 'It takes too long to mark', 'It only tests speaking and listening'], answer: 'B', explanation: 'Paragraph 1 says stopping at the grade "throws away most of its educational value."', kw: 'summative', loc: 'Paragraph 1', tip: 'Band 6: answer with the reason the passage gives, not a common-sense reason.' },
          { id: 'r8-q2', type: 'mcq', question: 'What kind of feedback is most effective, according to the research?', options: ['Vague praise such as "good effort"', 'The quantity of comments', 'Specific, task-focused feedback', 'Grades without any comments'], answer: 'C', explanation: 'Paragraph 3 states that specific, task-focused feedback "produces large gains."', kw: 'task-focused', loc: 'Paragraph 3', tip: 'Look for the qualifying words: the passage contrasts specificity with vague praise.' },
          { id: 'r8-q3', type: 'mcq', question: 'Why do students who self-assess tend to improve faster?', options: ['They study for longer hours', 'They internalise the standards the teacher uses', 'They work completely alone', 'They avoid all examinations'], answer: 'B', explanation: 'Paragraph 4 says they "internalise the standards the teacher is using."', kw: 'internalise', loc: 'Paragraph 4', tip: 'Match the cause: the passage links self-assessment to internalising criteria.' },
          { id: 'r8-q4', type: 'mcq', question: 'What concern does the passage raise about digital assessment platforms?', options: ['They are too slow to mark', 'Privacy issues and reducing learning to micro-scores', 'They cannot be graded', 'They only work offline'], answer: 'B', explanation: 'Paragraph 5 mentions "concerns about privacy and about reducing learning to a stream of micro-scores."', kw: 'privacy', loc: 'Paragraph 5', tip: 'Answer questions that pair concerns: expect two items joined by "and".' },
          { id: 'r8-q5', type: 'tfng', question: 'Formative assessment happens only at the end of a term.', answer: 'F', explanation: 'Paragraph 2 calls it "continuous" and part of lessons — the opposite of end-of-term testing.', kw: 'continuous', loc: 'Paragraph 2', tip: 'A negation in the statement ("only at the end") often signals False.' },
          { id: 'r8-q6', type: 'tfng', question: 'OECD studies link good formative practice to gains of roughly half a standard deviation.', answer: 'T', explanation: 'Paragraph 6 states schools using formative techniques well can raise achievement "by the equivalent of roughly half a standard deviation."', kw: 'standard deviation', loc: 'Paragraph 6', tip: 'Key figures in both passage and statement must agree exactly.' },
          { id: 'r8-q7', type: 'tfng', question: 'The passage claims that grades are completely worthless.', answer: 'F', explanation: 'Paragraph 7 opens: "The conclusion is not that grades are worthless."', kw: 'grades are worthless', loc: 'Paragraph 7', tip: 'Watch for absolutes like "completely" — the passage explicitly denies this.' },
          { id: 'r8-q8', type: 'sc', question: 'Complete the sentence: Adaptive software marks an answer instantly and selects the next task on the basis of the student\'s ___.', answer: 'response', explanation: 'Paragraph 5 says the software selects the next task "on the basis of the response."', kw: 'adaptive software', loc: 'Paragraph 5', tip: 'Copy the exact passage word; the singular form matters here.' },
          { id: 'r8-q9', type: 'sc', question: 'Complete the sentence: Pupils who can appraise their own work against clear ___ tend to improve faster.', answer: 'criteria', explanation: 'Paragraph 4 mentions appraising performance "against clear criteria."', kw: 'appraise', loc: 'Paragraph 4', tip: 'The gap follows an adjective ("clear"), so a plural noun fits.' },
          { id: 'r8-q10', type: 'sc', question: 'Complete the sentence: With formative assessment, the classroom becomes a ___ loop instead of a memory test.', answer: 'feedback', explanation: 'Paragraph 2 closes: "The classroom becomes a feedback loop instead of a memory test."', kw: 'feedback loop', loc: 'Paragraph 2', tip: 'Collocation alert: "feedback loop" is a fixed noun phrase.' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 9 – The Circular Economy and Its Limits
         [Environment]
         Question types: Matching Headings, Multiple Choice,
         Short Answer
         ------------------------------------------------------- */
      {
        id: 'r9', title: 'The Circular Economy and Its Limits',
        type: 'reading', level: 'c1', timerMinutes: 20, band: '7.0',
        passage: [
          'For most of industrial history, the economy has been linear: we take raw materials from the ground, make products from them, and throw the products away when they wear out. This take-make-dispose model is now colliding with the physical limits of the planet, and reformers increasingly point to a circular alternative.',
          'A circular economy keeps materials in use. Its guiding principles are three: design out waste and pollution, keep products and materials circulating, and regenerate natural systems. In practice, this means products that are durable, repairable and easy to upgrade, rather than cheap and disposable.',
          'The European Union has made circularity explicit policy. Its Circular Economy Action Plan, launched in 2020, sets targets for product durability, repair and recycling, and extends responsibility to producers so that companies pay for the waste their goods eventually create.',
          'Recycling is the most familiar face of circularity, but it has limits. Most plastics are downcycled: bottles become fibres of lower value, not new bottles. Contamination means that in many countries a large share of collected material is eventually discarded, and some waste is exported abroad, where it is processed poorly. Recycling recovers value, yet it rarely captures the original quality.',
          'A more radical shift is selling services instead of goods. Instead of selling a washing machine, a firm sells "washing as a service": it retains ownership, maintains the machine, and upgrades components when they fail. Designers then have a financial reason to build machines that last, because the manufacturer still owns the breakdowns.',
          'Critics add a caution: circularity can rebound. If a recycled product is cheaper, people may consume more of it, erasing environmental gains. Furthermore, the energy for recycling loops often comes from fossil fuels, which limits the climate benefit unless the electricity grid is decarbonised first.',
          'The honest conclusion is that circularity is a direction, not a destination. Used well, it reduces demand for virgin materials and reshapes business incentives; used naively, it becomes little more than greenwashing. The measure of success is not the recycling rate, but the overall reduction in material throughput and environmental impact.'
        ].join('\n\n'),
        questions: [
          { id: 'r9-q1', type: 'mh', question: 'Match the heading to the paragraph: "Three principles that define a circular economy"', options: ['1', '2', '3', '4'], answer: 'B', explanation: 'Heading Q1 (A="1") maps to Paragraph 2, which lists the three guiding principles.', kw: 'design out waste', loc: 'Paragraph 2', tip: 'Headings test the MAIN idea — the principles are announced in the first sentences of Paragraph 2.' },
          { id: 'r9-q2', type: 'mh', question: 'Match the heading to the paragraph: "Why recycling alone is not enough"', options: ['1', '2', '3', '4'], answer: 'D', explanation: 'The heading appears for Paragraph 4, which explains downcycling and contamination.', kw: 'downcycled', loc: 'Paragraph 4', tip: 'Scan the keyword "downcycled" to confirm the location before matching.' },
          { id: 'r9-q3', type: 'mh', question: 'Match the heading to the paragraph: "Selling services instead of goods"', options: ['4', '5', '6', '7'], answer: 'B', explanation: 'Paragraph 5 introduces product-as-a-service with the washing machine example.', kw: 'washing as a service', loc: 'Paragraph 5', tip: 'Topic sentences lead: Paragraph 5 opens with "A more radical shift is selling services."' },
          { id: 'r9-q4', type: 'mh', question: 'Match the heading to the paragraph: "A cautionary note about rebound effects"', options: ['4', '5', '6', '7'], answer: 'C', explanation: 'Paragraph 6 warns that circularity "can rebound" if cheaper products raise consumption.', kw: 'rebound', loc: 'Paragraph 6', tip: 'A heading about a warning sits with a paragraph that opens with "Critics add a caution."' },
          { id: 'r9-q5', type: 'mcq', question: 'What is a "circular economy"?', options: ['One that produces no waste at all', 'An economy that keeps materials in use', 'An economy that only uses renewable energy', 'An economy based solely on services'], answer: 'B', explanation: 'Paragraph 2 defines it: a circular economy "keeps materials in use."', kw: 'keeps materials in use', loc: 'Paragraph 2', tip: 'Definition questions give the exact phrase in the passage.' },
          { id: 'r9-q6', type: 'mcq', question: 'Why is most plastic recycling limited in effect, according to the passage?', options: ['Plastic is easy to fully recycle', 'Most plastics are downcycled and lose value', 'Plastic cannot be separated from paper', 'Recycling plastic is too profitable'], answer: 'B', explanation: 'Paragraph 4 states "Most plastics are downcycled: bottles become fibres of lower value."', kw: 'downcycled', loc: 'Paragraph 4', tip: 'The passage contrasts recycling potential with the reality of downcycling.' },
          { id: 'r9-q7', type: 'mcq', question: 'What is the real measure of success for circularity, according to the author?', options: ['The rate of recycling alone', 'The reduction in material throughput and environmental impact', 'The number of repair shops', 'The price of recycled goods'], answer: 'B', explanation: 'Paragraph 7: success is "the overall reduction in material throughput and environmental impact."', kw: 'measure of success', loc: 'Paragraph 7', tip: 'Final-paragraph conclusions often carry the author\'s judgement.' },
          { id: 'r9-q8', type: 'sa', question: 'What is the name of the European Union policy launched in 2020?', answer: 'Circular Economy Action Plan', explanation: 'Paragraph 3 names the Circular Economy Action Plan, "launched in 2020."', kw: '2020', loc: 'Paragraph 3', tip: 'Short answers: copy the exact title from the passage.' },
          { id: 'r9-q9', type: 'sa', question: 'What example of selling a service instead of a product is given?', answer: 'washing as a service', explanation: 'Paragraph 5 gives the "washing as a service" example.', kw: 'washing machine', loc: 'Paragraph 5', tip: 'One noun phrase is sufficient; do not add a full sentence.' },
          { id: 'r9-q10', type: 'sa', question: 'According to the critics, what fuel often powers recycling loops?', answer: 'fossil fuels', explanation: 'Paragraph 6 states the energy for recycling loops "often comes from fossil fuels."', kw: 'fossil fuels', loc: 'Paragraph 6', tip: '"Fuel" in the question signals the exact phrase "fossil fuels".' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 10 – The Double-Edged Global Office
         [Globalization]
         Question types: Yes/No/Not Given, Multiple Choice,
         Short Answer
         ------------------------------------------------------- */
      {
        id: 'r10', title: 'The Double-Edged Global Office',
        type: 'reading', level: 'c1', timerMinutes: 20, band: '7.5',
        passage: [
          'For thirty years, multinational corporations have moved production abroad, chasing cheaper labour, lower taxes and faster-growing markets. Offshoring turned a factory in Shenzhen into the workshop for a smartphone assembled from hundreds of suppliers spread across a dozen countries.',
          'The economic case is powerful. Offshoring lets firms reach scale quickly, and host economies gain jobs, wages, skills and technology transfer. Countries such as Vietnam and Mexico have industrialised partly because global production networks inserted their factories into world value chains.',
          'Yet the picture is double-edged. Studies find that difficult working conditions persist in the most competitive segments, and that the bargaining power of workers has weakened as governments race to attract investors. The phenomenon is sometimes described as a race to the bottom.',
          'A further cost is fiscal. Multinationals can shift profits to low-tax jurisdictions, eroding the tax base of the countries where their factories actually operate. International cooperation, such as the OECD minimum corporate tax agreed in 2021, tries to close this gap, but implementation has been slow.',
          'Culture also enters the equation. Global brands carry a standardised image around the world, and critics argue that this homogenises tastes and squeezes local businesses. Supporters respond that consumers adapt global products to local meaning, and that local firms often prosper by imitating and then differentiating.',
          'Policymakers are reaching for new tools. Supply-chain due diligence laws in Europe now require companies to monitor labour and environmental standards among their suppliers, while reshoring and proximity strategies shorten distances for reasons of security as much as speed.',
          'The balanced conclusion is that globalisation is not a one-way street. It has lifted millions out of poverty, yet it concentrates power and risk wherever one link in the chain is weakest. The policy question is no longer whether to globalise, but how to share the gains and the losses equitably.'
        ].join('\n\n'),
        questions: [
          { id: 'r10-q1', type: 'ynng', question: 'The passage states that countries such as Vietnam industrialised only through offshoring.', answer: 'N', explanation: 'Paragraph 2 says they industrialised "partly because" of production networks — contradictory to "only through."', kw: 'Vietnam', loc: 'Paragraph 2', tip: 'The word "partly" directly contradicts "only" — a clear No.' },
          { id: 'r10-q2', type: 'ynng', question: 'The author states that globalisation has lifted millions of people out of poverty.', answer: 'Y', explanation: 'Paragraph 7 states it "has lifted millions out of poverty."', kw: 'lifted millions', loc: 'Paragraph 7', tip: 'The author explicitly endorses the claim in the conclusion.' },
          { id: 'r10-q3', type: 'ynng', question: 'Offshoring has never created jobs in host economies.', answer: 'N', explanation: 'Paragraph 2 lists jobs among the gains; "never" is a direct contradiction.', kw: 'jobs', loc: 'Paragraph 2', tip: 'Absolute words ("never", "all") usually signal a No.' },
          { id: 'r10-q4', type: 'ynng', question: 'Vietnam and Mexico are now the two largest economies in the world.', answer: 'NG', explanation: 'The passage mentions neither economy ranking; the size of their economies is not discussed.', kw: 'largest economies', loc: 'No location', tip: 'If the passage is silent on the claim, the answer is Not Given — never guess from general knowledge.' },
          { id: 'r10-q5', type: 'mcq', question: 'What is described as a "race to the bottom"?', options: ['A competition between factories', 'Weakening worker bargaining power as governments compete for investment', 'A policy to raise wages', 'The decline of multinational firms'], answer: 'B', explanation: 'Paragraph 3 links the term to weakened worker bargaining caused by competition among governments.', kw: 'race to the bottom', loc: 'Paragraph 3', tip: 'Definition terms are usually explained immediately before or after the term appears.' },
          { id: 'r10-q6', type: 'mcq', question: 'How do European supply-chain due diligence laws work?', options: ['They ban all imports', 'They require firms to monitor labour and environmental standards among suppliers', 'They raise taxes on consumers', 'They close overseas factories'], answer: 'B', explanation: 'Paragraph 6 says the laws "require companies to monitor labour and environmental standards among their suppliers."', kw: 'due diligence', loc: 'Paragraph 6', tip: 'Answer with the precise mechanism, not a paraphrase that overstates it.' },
          { id: 'r10-q7', type: 'mcq', question: 'What is the author\'s overall position on globalisation?', options: ['It is entirely positive', 'It is entirely negative', 'It is mixed and requires equitable sharing of gains and losses', 'It has already ended'], answer: 'C', explanation: 'Paragraph 7 concludes it "has lifted millions... yet it concentrates power and risk," so sharing must be equitable.', kw: 'balanced conclusion', loc: 'Paragraph 7', tip: 'Attitude MCQs: the last paragraph usually states the author\'s judgement.' },
          { id: 'r10-q8', type: 'sa', question: 'Which international organisation agreed a minimum corporate tax in 2021?', answer: 'OECD', explanation: 'Paragraph 4 names the "OECD minimum corporate tax agreed in 2021."', kw: '2021', loc: 'Paragraph 4', tip: 'Years are excellent scan magnets in Note/Short-Answer questions.' },
          { id: 'r10-q9', type: 'sa', question: 'What strategy shortens production distances for reasons of security as well as speed?', answer: 'reshoring', explanation: 'Paragraph 6 says "reshoring and proximity strategies shorten distances for reasons of security as much as speed."', kw: 'proximity', loc: 'Paragraph 6', tip: 'The term appears with its two motivations; pick the one word it names.' },
          { id: 'r10-q10', type: 'sa', question: 'According to supporters of global brands, what do consumers do with global products?', answer: 'adapt them to local meaning', explanation: 'Paragraph 5 says "consumers adapt global products to local meaning."', kw: 'adapt', loc: 'Paragraph 5', tip: 'Report the supporters\' exact claim — do not mix in the critics\' view.' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 11 – Decision Fatigue at the End of the Day
         [Psychology]
         Question types: Multiple Choice, True/False/Not Given,
         Sentence Completion
         ------------------------------------------------------- */
      {
        id: 'r11', title: 'Decision Fatigue at the End of the Day',
        type: 'reading', level: 'c1', timerMinutes: 20, band: '7.5',
        passage: [
          'Judges hear dozens of parole hearings a day. A celebrated study of Israeli parole boards found that petitioners were markedly less likely to win release as the morning progressed, and more likely again immediately after a food break. The explanation offered was decision fatigue: making choice after choice drains the mental resource needed for good judgement.',
          'This is the theory of ego depletion, developed by the psychologist Roy Baumeister. According to the theory, self-control is a limited fuel tank: every act of effortful decision dips into the same reserve, so judgement grows worse with use.',
          'The theory has had a turbulent decade. Large-scale replications have failed to find the expected depletion effect, and many researchers now doubt the fuel-tank metaphor. What remains persuasive is narrower: laboratory tasks show modest effects, while real-world contexts show that people avoid making decisions at all when their resources are spent.',
          'A related body of work studies choice overload. In a famous field experiment, shoppers tasting jams were more likely to buy when offered six varieties than when offered twenty-four. More options meant more comparison and more effort, and many customers simply walked away.',
          'Because humans are decision-averse under load, smart design works with the grain. Defaults, such as a pension scheme people join unless they opt out, or a checkpoint that passes unless it is refused, reliably change behaviour at a scale that persuasion cannot reach.',
          'Real-world evidence is mixed but suggestive. Judicial outcomes, hospital prescribing at the end of long shifts, and consumer choices late in the day all show similar patterns of degraded judgement. Yet the effects are smaller and less deterministic than popular accounts suggest.',
          'Practical advice follows. When the stakes are high, schedule important decisions early in the day, break big choices into smaller ones, and protect decision-makers, whether they are judges, doctors or students, from the slow drain of minute choices.'
        ].join('\n\n'),
        questions: [
          { id: 'r11-q1', type: 'mcq', question: 'What did the Israeli parole board study find?', options: ['Judges never grant parole', 'Petitioners were less likely to win release as the morning progressed', 'Food breaks had no effect on decisions', 'Parole decisions are made at night'], answer: 'B', explanation: 'Paragraph 1 states petitioners were "markedly less likely to win release as the morning progressed."', kw: 'parole', loc: 'Paragraph 1', tip: 'Attribution: the effect is about the time of day, not about judges being unfair.' },
          { id: 'r11-q2', type: 'mcq', question: 'What is the theory of ego depletion?', options: ['A diet plan', 'The idea that self-control is a limited resource drained by use', 'A memory technique', 'A form of therapy'], answer: 'B', explanation: 'Paragraph 2 describes self-control as "a limited fuel tank" that drains with use.', kw: 'ego depletion', loc: 'Paragraph 2', tip: 'Theory-definition questions are usually answered in the same sentence as the term.' },
          { id: 'r11-q3', type: 'mcq', question: 'Why do researchers now doubt ego depletion?', options: ['It was never published', 'Large-scale replications have failed to find the expected effect', 'No one studies decisions anymore', 'It has been banned by regulators'], answer: 'B', explanation: 'Paragraph 3 says "large-scale replications have failed to find the expected depletion effect."', kw: 'replications', loc: 'Paragraph 3', tip: 'Careful: the doubt is about the laboratory effect, not about real-world fatigue.' },
          { id: 'r11-q4', type: 'mcq', question: 'Why did shoppers buy more jams when offered fewer varieties?', options: ['Six varieties were tastier', 'Fewer options meant less comparison and effort', 'Twenty-four jams were too cheap', 'The experiment had no results'], answer: 'B', explanation: 'Paragraph 4: "more options meant more comparison and more effort, and many customers simply walked away."', kw: 'jams', loc: 'Paragraph 4', tip: 'The answer inverts the mechanism: more choice → more effort → less buying.' },
          { id: 'r11-q5', type: 'tfng', question: 'Defaults reliably change behaviour at a scale that persuasion cannot reach.', answer: 'T', explanation: 'Paragraph 5 states defaults "reliably change behaviour at a scale that persuasion cannot reach."', kw: 'defaults', loc: 'Paragraph 5', tip: 'The sentence is nearly verbatim — mark True immediately.' },
          { id: 'r11-q6', type: 'tfng', question: 'The parole board study was conducted in China.', answer: 'F', explanation: 'Paragraph 1 describes the panels as Israeli; the statement contradicts the passage.', kw: 'Israeli', loc: 'Paragraph 1', tip: 'A wrong location is a direct contradiction, so False.' },
          { id: 'r11-q7', type: 'tfng', question: 'The author believes that popular accounts overstate the size of decision-fatigue effects.', answer: 'T', explanation: 'Paragraph 6 says the effects are "smaller and less deterministic than popular accounts suggest."', kw: 'less deterministic', loc: 'Paragraph 6', tip: 'Author-attitude questions: trust evaluative adverbs such as "smaller" and "less".' },
          { id: 'r11-q8', type: 'tfng', question: 'The passage advises scheduling important decisions early in the day.', answer: 'T', explanation: 'Paragraph 7 advises readers to "schedule important decisions early in the day."', kw: 'schedule', loc: 'Paragraph 7', tip: 'Advice statements in the final paragraph often match True/False items exactly.' },
          { id: 'r11-q9', type: 'sc', question: 'Complete the sentence: When their resources are spent, people ___ making decisions at all.', answer: 'avoid', explanation: 'Paragraph 3 says people "avoid making decisions at all when their resources are spent."', kw: 'avoid', loc: 'Paragraph 3', tip: 'The gap needs a verb; the passage supplies "avoid".' },
          { id: 'r11-q10', type: 'sc', question: 'Complete the sentence: Practical advice says to break big choices into smaller ___.', answer: 'ones', explanation: 'Paragraph 7 advises to "break big choices into smaller ones."', kw: 'smaller ones', loc: 'Paragraph 7', tip: '"Ones" replaces the repeated noun "choices" — copy it exactly.' }
        ]
      },
      /* -------------------------------------------------------
         PASSAGE 12 – The Anthropology of the Shared Table
         [Culture]
         Question types: Matching Headings, Multiple Choice,
         Yes/No/Not Given
         ------------------------------------------------------- */
      {
        id: 'r12', title: 'The Anthropology of the Shared Table',
        type: 'reading', level: 'c1', timerMinutes: 20, band: '8.0',
        passage: [
          'Almost every society marks its most important moments with food. Meals bind families, seal alliances and celebrate the calendar. Anthropology calls the act of eating together commensality, and it is one of the oldest and most universal instruments of social bonding.',
          'Food is also a boundary. Dietary codes such as halal and kosher do more than regulate what a body may eat; they mark who belongs to the group. To share a meal is to declare trust, which is why diplomatic banquets carry such weight.',
          'Ritual timing gives food its rhythm. Fasts and feasts alternate across the year, from Ramadan to Carnival, calibrating self-discipline and indulgence. The shared memory of a communal feast cements identity in ways that words rarely achieve.',
          'Feasting has always been political. Anthropologists who study gift exchange observe that a lavish feast obliges the recipient to return an even greater one, so prestige accumulates to whoever can give most generously. Food is thus currency in the economy of honour.',
          'Migration rewrites the menu. Diaspora communities fuse old recipes with new ingredients, and the hybrid cuisines that result, from Chinese-Indian to Mexican-American, become symbols of reinvention rather than loss. The shared table is a stage on which cultural identity is performed and renegotiated.',
          'The industrial food system pulls in the opposite direction. In high-income countries the family meal has declined sharply, replaced by solitary, screen-lit dining. Sociologists link this decline to weaker transmission of cooking knowledge between generations and to rising rates of diet-related disease.',
          'Culture, food and identity are therefore inseparable. Understanding what a society eats, and who it eats with, tells you how it allocates trust, power and memory. The plate is never only a plate.'
        ].join('\n\n'),
        questions: [
          { id: 'r12-q1', type: 'mh', question: 'Match the heading to the paragraph: "Food as a mark of belonging"', options: ['1', '2', '3', '4'], answer: 'B', explanation: 'Paragraph 2 explains that dietary codes "mark who belongs to the group."', kw: 'belongs to the group', loc: 'Paragraph 2', tip: 'Paraphrase hunt: "mark who belongs" equals "mark of belonging".' },
          { id: 'r12-q2', type: 'mh', question: 'Match the heading to the paragraph: "Feasts as an economy of honour"', options: ['4', '5', '6', '7'], answer: 'A', explanation: 'Paragraph 4 describes prestige accumulating through generous giving — an economy of honour.', kw: 'prestige', loc: 'Paragraph 4', tip: 'The keyword "prestige" locks the match to Paragraph 4.' },
          { id: 'r12-q3', type: 'mh', question: 'Match the heading to the paragraph: "The slow disappearance of the shared family meal"', options: ['4', '5', '6', '7'], answer: 'C', explanation: 'Paragraph 6 reports the sharp decline of the family meal in high-income countries.', kw: 'family meal', loc: 'Paragraph 6', tip: 'Location words like "in high-income countries" help confirm the paragraph.' },
          { id: 'r12-q4', type: 'mcq', question: 'What is commensality?', options: ['A cooking technique', 'The act of eating together', 'A type of spice', 'A religious fast'], answer: 'B', explanation: 'Paragraph 1 defines commensality as "the act of eating together."', kw: 'commensality', loc: 'Paragraph 1', tip: 'Definitions in parentheses or appositive phrases carry the answer.' },
          { id: 'r12-q5', type: 'mcq', question: 'Why do diplomatic banquets carry such weight?', options: ['They are extremely expensive', 'To share a meal is to declare trust', 'They are held in secret', 'They are televised worldwide'], answer: 'B', explanation: 'Paragraph 2: "to share a meal is to declare trust, which is why diplomatic banquets carry such weight."', kw: 'trust', loc: 'Paragraph 2', tip: 'Cause-effect chains give you the "why" directly after the keyword.' },
          { id: 'r12-q6', type: 'mcq', question: 'How does a lavish feast build prestige, according to anthropologists?', options: ['It wastes the host\'s wealth', 'It obliges the recipient to return an even greater feast', 'It has no social meaning', 'It is forbidden in most cultures'], answer: 'B', explanation: 'Paragraph 4 says a lavish feast "obliges the recipient to return an even greater one."', kw: 'obliges', loc: 'Paragraph 4', tip: 'Anthropologists\' claims are reported with verbs like "observe" — treat them as evidence.' },
          { id: 'r12-q7', type: 'ynng', question: 'The passage claims that halal and kosher rules exist only for health reasons.', answer: 'N', explanation: 'Paragraph 2 says they do more than regulate the body: they "mark who belongs to the group."', kw: 'halal', loc: 'Paragraph 2', tip: '"Only" makes the claim extreme; the passage explicitly widens the purpose.' },
          { id: 'r12-q8', type: 'ynng', question: 'Hybrid cuisines are described as symbols of reinvention.', answer: 'Y', explanation: 'Paragraph 5 says hybrids "become symbols of reinvention rather than loss."', kw: 'hybrid', loc: 'Paragraph 5', tip: 'The author states the symbols directly — agree with the author, not with critics.' },
          { id: 'r12-q9', type: 'ynng', question: 'The passage states that family meals have increased in high-income countries.', answer: 'N', explanation: 'Paragraph 6 says the family meal "has declined sharply" in high-income countries.', kw: 'family meal', loc: 'Paragraph 6', tip: 'Direction words ("declined") contradict "increased" — No.' },
          { id: 'r12-q10', type: 'ynng', question: 'Anthropologists agree that Ramadan is an older tradition than Carnival.', answer: 'NG', explanation: 'Paragraph 3 names both celebrations but never compares their ages.', kw: 'Ramadan', loc: 'Paragraph 3', tip: 'Both names appear, but no comparison is made — that is the classic Not Given trap.' }
        ]
      }
    ],

    listening: [
      /* -------------------------------------------------------
         SECTION 1 – Campus Library Registration & Accommodation
         Question type: Form Completion
         ------------------------------------------------------- */
      {
        id: 'l1', title: 'Campus Library Registration & Accommodation Inquiry',
        type: 'listening', level: 'b1', timerMinutes: 10,
        script: [
          'LIBRARIAN: Good morning, Welcome to the University of Greenfield Library. How can I help you?',
          'STUDENT: Hi, I\'m a new postgraduate student. I\'d like to register for library access, please.',
          'LIBRARIAN: Of course. Could I have your full name, please?',
          'STUDENT: It\'s Fatima Al-Hassan. That\'s F-A-T-I-M-A, A-L-H-A-S-S-A-N.',
          'LIBRARIAN: Thank you. And your student ID number?',
          'STUDENT: It\'s PG-2024-0847.',
          'LIBRARIAN: PG-2024-0847. And which department are you in?',
          'STUDENT: I\'m in the Department of Environmental Science.',
          'LIBRARIAN: Lovely. Now, which card would you like — a standard borrowing card or a premium card? The standard card allows you to borrow up to eight books at a time for two weeks. The premium card allows fifteen books for four weeks and includes access to our inter-library loan service.',
          'STUDENT: I think the premium card would be better for me, since I\'ll need quite a few reference books for my research.',
          'LIBRARIAN: Good choice. The premium card costs fifteen pounds per year. Would you like to pay now?',
          'STUDENT: Yes, I\'ll pay by card. Could I also ask about the study rooms?',
          'LIBRARIAN: Certainly. We have twelve individual study rooms and four group study rooms. You can book them through the library website. Individual rooms can be booked for up to three hours at a time, and group rooms for up to two hours.',
          'STUDENT: That\'s great. I was also wondering — I\'m looking for accommodation near campus. Do you have any information about that?',
          'LIBRARIAN: The Student Housing Office is in Room 104 of the Student Union building. They handle all accommodation queries. Their opening hours are nine a.m. to five p.m., Monday to Friday. Alternatively, you can email them at housing@greenfield.ac.uk.',
          'STUDENT: Thank you. One more question — is there a photocopying service in the library?',
          'LIBRARIAN: Yes, there are photocopiers on every floor. They accept both cash and your student card. It costs five pence per page for black and white, and twenty pence for colour.',
          'STUDENT: Perfect. Thank you very much for your help.',
          'LIBRARIAN: You\'re welcome. Enjoy your time at Greenfield!'
        ],
        questions: [
          { id: 'l1-q1', type: 'fc', question: 'Student\'s full name:', answer: 'Fatima Al-Hassan', explanation: 'The student spells her name: "F-A-T-I-M-A, A-L-H-A-S-S-A-N."' },
          { id: 'l1-q2', type: 'fc', question: 'Student ID number:', answer: 'PG-2024-0847', explanation: 'The student gives her ID as "PG-2024-0847."' },
          { id: 'l1-q3', type: 'fc', question: 'Department:', answer: 'Environmental Science', explanation: 'She states she is in "the Department of Environmental Science."' },
          { id: 'l1-q4', type: 'fc', question: 'Card type chosen:', answer: 'premium card', explanation: 'She says "the premium card would be better for me."' },
          { id: 'l1-q5', type: 'fc', question: 'Annual cost of premium card: £___', answer: '15', explanation: 'The librarian says "The premium card costs fifteen pounds per year."' },
          { id: 'l1-q6', type: 'fc', question: 'Number of individual study rooms:', answer: '12', explanation: 'The librarian mentions "twelve individual study rooms."' },
          { id: 'l1-q7', type: 'fc', question: 'Maximum booking time for individual study rooms: ___ hours', answer: '3', explanation: 'She states individual rooms "can be booked for up to three hours at a time."' },
          { id: 'l1-q8', type: 'fc', question: 'Student Housing Office location: Room ___ of the Student Union', answer: '104', explanation: 'The librarian directs her to "Room 104 of the Student Union building."' },
          { id: 'l1-q9', type: 'fc', question: 'Housing email address: ___@greenfield.ac.uk', answer: 'housing', explanation: 'The email given is "housing@greenfield.ac.uk."' },
          { id: 'l1-q10', type: 'fc', question: 'Colour photocopying cost: ___ pence per page', answer: '20', explanation: 'The librarian states "twenty pence for colour."' }
        ]
      },
      /* -------------------------------------------------------
         SECTION 2 – University Orientation Tour & Facilities Guide
         Question type: Map / Plan Labelling
         ------------------------------------------------------- */
      {
        id: 'l2', title: 'University Orientation Tour & Facilities Guide',
        type: 'listening', level: 'b2', timerMinutes: 10,
        script: [
          'GUIDE: Welcome, everyone, to the University of Northbridge. My name is James, and I\'ll be your orientation guide today. We\'re standing in the main atrium of the Whitfield Building, which is the central hub of the campus.',
          'GUIDE: Directly ahead of you, through the glass doors, is the Student Services Centre. This is where you\'ll go for enrolment queries, student ID cards, and financial aid matters. It\'s open from eight thirty a.m. to five p.m. on weekdays.',
          'GUIDE: To your left, you\'ll see the Whitfield Café, which serves hot meals, snacks, and coffee from seven a.m. to seven p.m. During exam periods, it stays open until midnight.',
          'GUIDE: Now, if you turn to your right, you\'ll notice the main staircase. Take that up to the second floor and you\'ll find the University Library. The library has three levels: the ground floor is for group study and has sixty desk spaces; the first floor is the quiet zone with individual carrels and computer workstations; and the top floor houses the Special Collections and archive room, which requires a separate access card.',
          'GUIDE: Walking straight ahead past the Student Services Centre, you\'ll reach the Sports Complex through the covered walkway. The complex includes a twenty-five metre swimming pool, two indoor tennis courts, a fully equipped gym, and a dance studio. All students have free access to the gym and pool; court bookings cost five pounds per hour.',
          'GUIDE: Behind the Sports Complex, you\'ll find the Engineering Block, which houses the robotics laboratory and the 3D printing workshop. These facilities are available to all engineering and computer science students, and bookings can be made through the faculty portal.',
          'GUIDE: On the far eastern side of campus, connected by the tree-lined Northbridge Walk, is the Arts Centre. The Arts Centre contains a 200-seat theatre, two rehearsal studios, and a gallery space that features rotating exhibitions by student and local artists. The theatre hosts performances every Friday evening during term time.',
          'GUIDE: Finally, near the north entrance of campus, you\'ll find the Medical Centre, which is staffed by two general practitioners and a practice nurse. Appointments can be booked online or by phone, and emergency walk-in appointments are available on weekdays from nine a.m. to one p.m.',
          'GUIDE: That concludes our tour. Please feel free to ask any questions, and remember that the Student Handbook, available online and at the Student Services Centre, has detailed maps and opening hours for all facilities.'
        ],
        questions: [
          { id: 'l2-q1', type: 'map', question: 'What is directly ahead through the glass doors from the atrium?', answer: 'Student Services Centre', explanation: 'The guide says "Directly ahead of you, through the glass doors, is the Student Services Centre."' },
          { id: 'l2-q2', type: 'map', question: 'What is to the left of the atrium?', answer: 'Whitfield Café', explanation: 'The guide says "To your left, you\'ll see the Whitfield Café."' },
          { id: 'l2-q3', type: 'map', question: 'What is on the second floor of the library (quiet zone)?', answer: 'individual carrels and computer workstations', explanation: 'The guide describes "the first floor is the quiet zone with individual carrels and computer workstations."' },
          { id: 'l2-q4', type: 'map', question: 'What is behind the Sports Complex?', answer: 'Engineering Block', explanation: 'The guide states "Behind the Sports Complex, you\'ll find the Engineering Block."' },
          { id: 'l2-q5', type: 'map', question: 'How many seats does the Arts Centre theatre have?', answer: '200', explanation: 'The guide describes "a 200-seat theatre."' },
          { id: 'l2-q6', type: 'map', question: 'What is at the north entrance of campus?', answer: 'Medical Centre', explanation: 'The guide says "near the north entrance of campus, you\'ll find the Medical Centre."' },
          { id: 'l2-q7', type: 'map', question: 'What is the cost of court bookings at the Sports Complex?', answer: '£5 per hour', explanation: 'The guide states "court bookings cost five pounds per hour."' },
          { id: 'l2-q8', type: 'map', question: 'What time does the Whitfield Café stay open until during exam periods?', answer: 'midnight', explanation: 'The guide says "During exam periods, it stays open until midnight."' },
          { id: 'l2-q9', type: 'map', question: 'How many GP practitioners staff the Medical Centre?', answer: 'two', explanation: 'The guide states it is "staffed by two general practitioners and a practice nurse."' },
          { id: 'l2-q10', type: 'map', question: 'What connects the Arts Centre to the rest of campus?', answer: 'Northbridge Walk', explanation: 'The guide describes "the tree-lined Northbridge Walk."' }
        ]
      },
      /* -------------------------------------------------------
         SECTION 3 – Academic Tutorial on Environmental Project
         Question type: Multiple Choice
         ------------------------------------------------------- */
      {
        id: 'l3', title: 'Academic Tutorial Discussion on Environmental Project',
        type: 'listening', level: 'b2', timerMinutes: 10,
        script: [
          'TUTOR: Good afternoon, Sarah and David. Thanks for coming in. How is your environmental science project progressing?',
          'SARAH: Pretty well, actually. We\'ve decided to focus on the impact of urbanisation on local river water quality in the Greendale area.',
          'TUTOR: That\'s a solid topic. What drew you to that particular focus?',
          'DAVID: We noticed that the River Calder, which runs through the new housing development on the east side of town, seemed noticeably more polluted than the section upstream. We wanted to investigate whether the new development was the primary cause.',
          'TUTOR: Interesting. How do you plan to collect your water quality data?',
          'SARAH: We\'re going to take water samples at five different points along the river — two upstream of the development, one directly adjacent, and two downstream. We\'ll test for dissolved oxygen, nitrate levels, phosphate concentrations, and pH.',
          'TUTOR: Good methodology. Have you considered what control variables you\'ll need to account for?',
          'DAVID: Yes, we\'ve identified rainfall as a major factor — heavy rain can cause sewage overflow and skew results. So we\'ll take samples on dry days only and record rainfall data for the 48 hours before each sampling session.',
          'TUTOR: That\'s well thought out. What about your timeline? When is the project due?',
          'SARAH: The final report is due on the twentieth of March. We\'re planning to collect all samples by the end of this month, analyse them in February, and spend the first two weeks of March writing up.',
          'TUTOR: That gives you a sensible buffer for unexpected problems. Have you thought about how you\'ll present your findings?',
          'DAVID: We\'re planning to use a combination of line graphs showing water quality parameters at each sampling point, and a map of the river with the sampling locations clearly marked.',
          'TUTOR: A map is an excellent idea. Just make sure you include a clear legend and scale. Will you need to use the laboratory equipment in the Huxley Building?',
          'SARAH: Yes, we\'ve already booked the spectrophotometer for three sessions in February.',
          'TUTOR: Excellent. One more thing — you should apply for ethical approval before you begin any fieldwork. It usually takes about a week, so submit your application this week.',
          'DAVID: We\'ll do that today. Thanks, Dr. Morrison.'
        ],
        questions: [
          { id: 'l3-q1', type: 'mcq', question: 'What is the focus of the environmental project?', options: ['Air quality near motorways', 'Urbanisation impact on river water quality', 'Industrial waste in the sea', 'Agricultural runoff in rural areas'], answer: 'B', explanation: 'Sarah states they are focusing on "the impact of urbanisation on local river water quality."' },
          { id: 'l3-q2', type: 'mcq', question: 'Why did David notice the River Calder seemed more polluted?', options: ['There was a factory nearby', 'The new housing development on the east side', 'Agricultural activity upstream', 'Heavy industrial dumping'], answer: 'B', explanation: 'David mentions "the new housing development on the east side of town."' },
          { id: 'l3-q3', type: 'mcq', question: 'How many sampling points will they use along the river?', options: ['Three', 'Four', 'Five', 'Six'], answer: 'C', explanation: 'Sarah says they will take samples at "five different points along the river."' },
          { id: 'l3-q4', type: 'mcq', question: 'What control variable have they identified as important?', options: ['Water temperature', 'River depth', 'Rainfall', 'Time of day'], answer: 'C', explanation: 'David identifies "rainfall as a major factor" and will only sample on dry days.' },
          { id: 'l3-q5', type: 'mcq', question: 'When is the final project report due?', options: ['End of February', '15 March', '20 March', 'End of March'], answer: 'C', explanation: 'Sarah states "The final report is due on the twentieth of March."' },
          { id: 'l3-q6', type: 'mcq', question: 'What equipment have they already booked?', options: ['Microscope', 'Spectrophotometer', 'Centrifuge', 'pH meter'], answer: 'B', explanation: 'Sarah says "We\'ve already booked the spectrophotometer for three sessions."' },
          { id: 'l3-q7', type: 'mcq', question: 'How long does ethical approval usually take?', options: ['Two days', 'About a week', 'Two weeks', 'A month'], answer: 'B', explanation: 'The tutor says "It usually takes about a week."' },
          { id: 'l3-q8', type: 'mcq', question: 'What type of visual aid will they include besides line graphs?', options: ['Pie chart', 'Bar chart', 'Map of the river', 'Photographs'], answer: 'C', explanation: 'David says "a map of the river with the sampling locations clearly marked."' },
          { id: 'l3-q9', type: 'mcq', question: 'Which water quality parameters will they test? (Select the BEST answer)', options: ['Only pH and temperature', 'Dissolved oxygen, nitrates, phosphates, and pH', 'Bacteria levels only', 'Heavy metals only'], answer: 'B', explanation: 'Sarah lists "dissolved oxygen, nitrate levels, phosphate concentrations, and pH."' },
          { id: 'l3-q10', type: 'mcq', question: 'What is the tutor\'s overall assessment of the project planning?', options: ['The topic is too narrow', 'The planning is well thought out', 'They need to change their approach', 'The timeline is unrealistic'], answer: 'B', explanation: 'The tutor responds positively: "That\'s solid," "Good methodology," and "That\'s well thought out."' }
        ]
      },
      /* -------------------------------------------------------
         SECTION 4 – Lecture on Marine Biology & Coral Reef Conservation
         Question type: Note Completion
         ------------------------------------------------------- */
      {
        id: 'l4', title: 'Lecture on Marine Biology & Coral Reef Conservation',
        type: 'listening', level: 'c1', timerMinutes: 10,
        script: [
          'PROFESSOR: Good morning, everyone. Today\'s lecture focuses on coral reef conservation — a topic that sits at the intersection of marine biology, climate science, and environmental policy. Coral reefs are sometimes called the "rainforests of the sea" because they support approximately 25% of all marine species despite covering less than 1% of the ocean floor.',
          'PROFESSOR: To understand why coral reefs are in crisis, we first need to understand what coral actually is. Corals are tiny animals called polyps that live in colonies. Each polyp secretes a calcium carbonate skeleton, and over thousands of years, these accumulated skeletons form the massive reef structures we see today. The most famous example, Australia\'s Great Barrier Reef, stretches over 2,300 kilometres and is visible from space.',
          'PROFESSOR: The single greatest threat to coral reefs globally is climate change. Rising sea temperatures cause a phenomenon known as coral bleaching, in which stressed corals expel the symbiotic algae — called zooxanthellae — that live within their tissues and provide them with up to 90% of their energy through photosynthesis. Without these algae, the coral turns white and, if temperatures do not return to normal within a few weeks, the coral will die.',
          'PROFESSOR: The Great Barrier Reef experienced severe mass bleaching events in 2016, 2017, 2020, and 2022. The 2016 event alone killed approximately 30% of the reef\'s shallow-water corals. Scientists at the Australian Institute of Marine Science have reported that while some sections of the reef have shown partial recovery, the overall trajectory remains deeply concerning.',
          'PROFESSOR: Ocean acidification compounds the problem of thermal stress. As the ocean absorbs approximately 30% of anthropogenic carbon dioxide, its pH decreases, making it harder for corals to build their calcium carbonate skeletons. Research published in Nature Climate Change projects that at current emission rates, most tropical coral reefs will experience conditions incompatible with reef growth by 2050.',
          'PROFESSOR: Conservation efforts are underway at multiple scales. At the local level, marine protected areas — in which fishing, anchoring, and other destructive activities are restricted — have proven effective at maintaining reef health. The Coral Triangle Initiative, involving six nations across Southeast Asia and the Pacific, protects one of the most biodiverse marine regions on Earth.',
          'PROFESSOR: In terms of active restoration, scientists are developing techniques to breed heat-resistant coral strains through assisted evolution. The Australian Institute of Marine Science has established a coral breeding program that selects parent corals that survived previous bleaching events, hoping to produce offspring with greater thermal tolerance. Early results from controlled experiments are encouraging, but scaling these efforts to cover the vast areas affected by bleaching remains a significant challenge.',
          'PROFESSOR: Finally, community engagement is essential. Indigenous communities, particularly in the Pacific Islands and along the Great Barrier Reef, possess invaluable traditional knowledge about reef ecosystems. Programs that combine scientific monitoring with indigenous stewardship practices have shown promising results in maintaining reef biodiversity and resilience.'
        ],
        questions: [
          { id: 'l4-q1', type: 'nc', question: 'Coral reefs support approximately ___% of all marine species.', answer: '25', explanation: 'The professor states reefs "support approximately 25% of all marine species."' },
          { id: 'l4-q2', type: 'nc', question: 'Corals are tiny animals called ___ that live in colonies.', answer: 'polyps', explanation: 'The professor describes corals as "tiny animals called polyps that live in colonies."' },
          { id: 'l4-q3', type: 'nc', question: 'The symbiotic algae called ___ provide up to 90% of coral energy.', answer: 'zooxanthellae', explanation: 'The professor names the algae "zooxanthellae" and states they provide "up to 90% of their energy."' },
          { id: 'l4-q4', type: 'nc', question: 'The Great Barrier Reef stretches over ___ kilometres.', answer: '2,300', explanation: 'The professor states it "stretches over 2,300 kilometres."' },
          { id: 'l4-q5', type: 'nc', question: 'The 2016 bleaching event killed approximately ___% of shallow-water corals.', answer: '30', explanation: 'The professor states the 2016 event killed "approximately 30% of the reef\'s shallow-water corals."' },
          { id: 'l4-q6', type: 'nc', question: 'The ocean absorbs approximately ___% of anthropogenic carbon dioxide.', answer: '30', explanation: 'The professor states the ocean absorbs "approximately 30% of anthropogenic carbon dioxide."' },
          { id: 'l4-q7', type: 'nc', question: 'At current emission rates, most tropical reefs will face incompatible conditions by ___.', answer: '2050', explanation: 'The professor projects this will occur "by 2050."' },
          { id: 'l4-q8', type: 'nc', question: 'The Coral Triangle Initiative involves ___ nations.', answer: '6', explanation: 'The professor states it involves "six nations across Southeast Asia and the Pacific."' },
          { id: 'l4-q9', type: 'nc', question: 'Coral bleaching events on the Great Barrier Reef occurred in 2016, 2017, ___, and ___.', answer: '2020, 2022', explanation: 'The professor lists bleaching events in "2016, 2017, 2020, and 2022."' },
          { id: 'l4-q10', type: 'nc', question: 'The assisted evolution program selects parent corals that survived previous ___ events.', answer: 'bleaching', explanation: 'The professor states the program "selects parent corals that survived previous bleaching events."' }
        ]
      }
    ]
  };

  /* ---------- timer ---------- */
  function startTimer() {
    stopTimer();
    state.timer.running = true;
    state.timer.seconds = 0;
    state.timer.interval = setInterval(function () {
      state.timer.seconds++;
      var el = $('#qh-timer');
      if (el) el.textContent = fmtTime(state.timer.seconds);
    }, 1000);
  }

  function stopTimer() {
    state.timer.running = false;
    clearInterval(state.timer.interval);
  }

  function fmtTime(s) {
    return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  }

  /* ---------- test data lookup ---------- */
  function getTest(levelId, type) {
    var bank = TESTS[type] || [];
    for (var i = 0; i < bank.length; i++) {
      if (bank[i].level === levelId) return bank[i];
    }
    if (bank.length > 0) return bank[0];
    /* fallback to legacy IELTS_DATA */
    if (type === 'listening' && window.IELTS_DATA && window.IELTS_DATA.LISTENING_TEST) {
      var t = window.IELTS_DATA.LISTENING_TEST;
      var idx = ['a1', 'a2', 'b1', 'b2', 'c1', 'c2'].indexOf(levelId);
      return (idx >= 0 && idx < t.length) ? t[idx] : t[0];
    }
    return null;
  }

  function getTestByKey(key) {
    var parts = key.split('-');
    var type = parts.pop();
    var levelId = parts.join('-');
    return getTest(levelId, type);
  }

  function getLevelTests(type) {
    var bank = TESTS[type] || [];
    var c = cache();
    return bank.map(function (t) {
      return { level: { id: t.level, name: t.title, icon: t.type === 'reading' ? '📖' : '🎧' }, type: type, completed: !!c.completed[t.id], testId: t.id, timerMinutes: t.timerMinutes, questionCount: t.questions.length, band: t.band || '' };
    });
  }

  /* ---------- tolerant answer matching ---------- */
  function cleanAns(s) {
    return String(s == null ? '' : s).toLowerCase().replace(/[^a-z0-9]/g, '');
  }
  function isAnsCorrect(q, ua) {
    var targets = String(q.answer || '').split('/').map(function (x) { return cleanAns(x); });
    var given = cleanAns(ua);
    if (!given) return false;
    for (var i = 0; i < targets.length; i++) { if (targets[i] && targets[i] === given) return true; }
    return false;
  }

  /* ---------- render ---------- */
  function render() {
    var user = window.IELTS_AUTH.getCurrentUser();
    if (!user) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'taking') { renderTaking(); return; }
    if (state.view === 'review') { renderReview(); return; }

    state.view = 'home';
    var readTests = getLevelTests('reading');
    var listenTests = getLevelTests('listening');
    var c = cache();

    var renderCard = function (t) {
      return '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5 flex items-center justify-between gap-3 transition-all ' + (t.completed ? 'opacity-70' : 'hover:border-[rgba(212,175,55,0.5)] hover:shadow-lg') + '">' +
        '<div>' +
          '<div class="flex items-center gap-2 mb-1">' +
            '<span class="text-2xl">' + t.level.icon + '</span>' +
            '<span class="text-sm font-bold text-[#f5f0e6]">' + esc(t.level.name) + '</span>' +
            (t.band ? '<span class="text-[9px] font-bold text-[#d4af37] border border-[rgba(212,175,55,0.3)] px-1.5 py-0.5 rounded uppercase">' + esc(t.band) + '</span>' : '') +
          '</div>' +
          '<p class="text-xs text-[#f5f0e6]/60">' + (t.completed ? '✓ Completed' : t.questionCount + ' questions · ' + t.timerMinutes + '-min timer · Auto-graded') + '</p>' +
        '</div>' +
        '<button class="btn-primary text-sm whitespace-nowrap" onclick="IELTS_QUIZ_HUB.start(\'' + t.testId + '\')">' + (t.completed ? 'Review' : 'Start') + '</button>' +
      '</div>';
    };

    $('#quiz-hub-content').innerHTML =
      '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">' +
        '<h2 class="text-2xl font-extrabold text-[#f5f0e6]">🧠 Reading & Listening Quiz Hub</h2>' +
        '<p class="text-sm text-[#f5f0e6]/60 mt-1">Academic passages with timers, auto-grading and detailed explanations.</p>' +
        '<div class="flex gap-3 mt-4">' +
          '<button class="tab-pill ' + (state.activeTab === 'reading' ? 'active' : '') + '" onclick="IELTS_QUIZ_HUB.switchTab(\'reading\')">📖 Reading</button>' +
          '<button class="tab-pill ' + (state.activeTab === 'listening' ? 'active' : '') + '" onclick="IELTS_QUIZ_HUB.switchTab(\'listening\')">🎧 Listening</button>' +
        '</div>' +
      '</div>' +
      '<div class="grid md:grid-cols-2 gap-4 mb-6">' +
        (state.activeTab === 'reading' ? readTests : listenTests).map(renderCard).join('') +
      '</div>';
  }

  function switchTab(tab) { state.activeTab = tab; render(); }

  function start(testId) {
    var test = null;
    var bank = TESTS.reading.concat(TESTS.listening);
    for (var i = 0; i < bank.length; i++) { if (bank[i].id === testId) { test = bank[i]; break; } }
    if (!test) { window.toast && window.toast('Test not available'); return; }
    state.testKey = test.id;
    state.qi = 0;
    state.answers = {};
    state.score = 0;
    state.review = null;
    state.view = 'taking';
    startTimer();
    render();
  }

  function renderTaking() {
    var test = getTestByKey(state.testKey);
    if (!test) return;
    var questions = test.questions;
    var total = questions.length;
    var q = questions[state.qi];
    if (!q) { state.view = 'review'; render(); return; }

    var hasOpts = q.options && q.options.length;
    var opts = '';
    if (hasOpts) {
      opts = '<div class="grid gap-2 mb-5">' + (q.options.map(function (o, i) {
        var letter = String.fromCharCode(65 + i);
        var sel = state.answers[state.qi] === letter;
        return '<button type="button" class="text-left w-full bg-[rgba(20,18,15,0.85)] backdrop-blur-md border ' + (sel ? 'border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.15)]' : 'border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)]') + ' rounded-lg px-4 py-3 transition-all flex items-center gap-3" onclick="IELTS_QUIZ_HUB.answer(' + state.qi + ', \'' + letter + '\')">' +
          '<span class="inline-block w-5 text-[#f5f0e6]/40 font-semibold">' + letter + '</span>' +
          '<span class="text-sm text-[#f5f0e6]">' + esc(o) + '</span>' +
        '</button>';
      }).join('')) + '</div>';
    } else {
      opts = '<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.3)] rounded-lg px-4 py-3 mb-5"><input type="text" id="qh-freetext" value="' + esc(state.answers[state.qi] || '') + '" placeholder="Type your answer…" class="w-full bg-transparent text-sm text-[#f5f0e6] focus:outline-none" oninput="IELTS_QUIZ_HUB.text(' + state.qi + ', this.value)" /></div>' +
        '<p class="text-[11px] text-[#f5f0e6]/40 -mt-3 mb-4">Spelling is flexible but the answer must match the passage. Where alternatives exist, either is accepted.</p>';
    }

    var passageHtml = '';
    if (test.passage) {
      passageHtml = '<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-4 max-h-64 overflow-y-auto"><p class="text-sm text-[#f5f0e6]/70 leading-relaxed whitespace-pre-line">' + esc(test.passage) + '</p></div>';
    }
    if (test.script) {
      passageHtml = '<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-4 max-h-64 overflow-y-auto"><p class="text-xs font-semibold text-[#d4af37]/70 mb-1">Audio script (simulated):</p><p class="text-sm text-[#f5f0e6]/70 leading-relaxed italic whitespace-pre-line">' + esc(test.script.join('\n')) + '</p></div>';
    }

    var typeLabel = test.type === 'reading' ? '📖' : '🎧';

    $('#quiz-hub-content').innerHTML =
      '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">' +
        '<div class="flex flex-wrap items-center justify-between gap-3 mb-4">' +
          '<div>' +
            '<h3 class="text-lg font-extrabold text-[#f5f0e6]">' + typeLabel + ' ' + esc(test.title) + '</h3>' +
            '<p class="text-xs text-[#f5f0e6]/60 mt-1">Q' + (state.qi + 1) + ' / ' + total + ' · Time limit: ' + (test.timerMinutes || 20) + ' min</p>' +
          '</div>' +
          '<div id="qh-timer" class="font-mono text-sm font-bold text-[#d4af37] bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.3)] px-4 py-2 rounded-lg">' + fmtTime(state.timer.seconds) + '</div>' +
        '</div>' +
        '<div class="h-2 bg-[rgba(20,18,15,0.85)] rounded-full overflow-hidden mb-5">' +
          '<div class="h-full bg-gradient-to-r from-[#d4af37] to-[#f5f0e6] rounded-full transition-all" style="width:' + ((state.qi / total) * 100) + '%"></div>' +
        '</div>' +
        passageHtml +
        '<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-xl p-4 mb-5">' +
          '<p class="text-sm font-medium text-[#f5f0e6]">' + esc(q.question) + '</p>' +
        '</div>' +
        opts +
        '<div class="flex justify-between">' +
          '<button class="btn-secondary text-sm ' + (state.qi === 0 ? 'invisible' : '') + '" onclick="IELTS_QUIZ_HUB.prev()">← Prev</button>' +
          '<button class="btn-primary text-sm" onclick="IELTS_QUIZ_HUB.next()">' + (state.qi === total - 1 ? 'Submit' : 'Next →') + '</button>' +
        '</div>' +
      '</div>';
  }

  function answer(i, letter) { state.answers[i] = letter; renderTaking(); }

  function text(i, val) { state.answers[i] = val; }

  function next() {
    var test = getTestByKey(state.testKey);
    if (!test) return;
    if (state.qi < test.questions.length - 1) { state.qi++; renderTaking(); } else { finish(); }
  }

  function prev() { if (state.qi > 0) { state.qi--; renderTaking(); } }

  function finish() {
    stopTimer();
    var test = getTestByKey(state.testKey);
    if (!test) return;
    var questions = test.questions;
    var correct = 0;
    questions.forEach(function (q, i) {
      var ua = state.answers[i];
      if (isAnsCorrect(q, ua)) correct++;
    });
    var total = questions.length;
    var pct = total ? Math.round((correct / total) * 100) : 0;
    var time = fmtTime(state.timer.seconds);

    var c = cache();
    c.completed[test.id] = true;
    if (!c.bestScores[test.id] || pct > c.bestScores[test.id]) c.bestScores[test.id] = pct;
    save(c);

    var claimKey = 'quizhub-' + test.id;
    var claimed = window.IELTS_AUTH.completeClaim(claimKey);
    if (pct >= 60 && claimed) {
      window.IELTS_AUTH.addXp(QUIZ_XP);
      window.IELTS_AUTH.addActivity('quiz', 'Completed: ' + test.title, QUIZ_XP);
      window.toast && window.toast('+' + QUIZ_XP + ' XP!');
    }

    /* sync level progress to Supabase/Neon via auth */
    if (pct >= 80 && claimed) {
      try {
        var user = window.IELTS_AUTH.getCurrentUser();
        if (user && window.IELTS_DB && window.IELTS_DB.upsertProfile) {
          var LEVELS = (window.IELTS_DATA && window.IELTS_DATA.LEVELS) || [];
          var nextLvl = null;
          for (var i = 0; i < LEVELS.length; i++) {
            if (LEVELS[i].minXp > user.xp) { nextLvl = LEVELS[i]; break; }
          }
          if (nextLvl) {
            window.IELTS_AUTH.addXp(10);
            window.IELTS_DB.upsertProfile(user.id, { level: nextLvl.id, levelName: nextLvl.name, lastQuizScore: pct });
          }
        }
      } catch (e) { /* offline */ }
    }

    state.review = { test: test, correct: correct, total: total, pct: pct, time: time, questions: questions };
    state.view = 'review';
    renderReview();
  }

  function renderReview() {
    var r = state.review;
    if (!r) return;
    var reviewRows = r.questions.map(function (q, i) {
      var ua = state.answers[i];
      var isCorrect = isAnsCorrect(q, ua);
      return '<div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-lg p-4">' +
        '<p class="text-sm font-semibold text-[#f5f0e6]">Q' + (i + 1) + ' ' + (isCorrect ? '✅' : '❌') + ' — ' + esc(q.question) + '</p>' +
        (!isCorrect ? '<p class="text-xs text-[#f5f0e6]/50 mt-1">Your: ' + esc(ua || '—') + ' · Correct: <span class="text-[#d4af37]">' + esc(String(q.answer || '')) + '</span></p>' : '') +
        '<p class="text-xs text-[#f5f0e6]/60 mt-1">💡 ' + esc(q.explanation || '') + '</p>' +
        (q.tip ? '<p class="text-[11px] text-[#d4af37]/80 mt-1">🎯 ' + esc(q.tip) + '</p>' : '') +
      '</div>';
    }).join('');

    var hasLoc = r.test.type === 'reading' && r.questions.some(function (q) { return q.kw || q.loc; });
    var locRows = hasLoc ? r.questions.map(function (q, i) {
      return '<tr class="border-t border-[rgba(212,175,55,0.1)]"><td class="py-1.5 pr-3 text-xs text-[#f5f0e6]/60">Q' + (i + 1) + '</td><td class="py-1.5 pr-3 text-xs text-[#f5f0e6]">' + esc(q.kw || '—') + '</td><td class="py-1.5 text-xs text-[#d4af37]">' + esc(q.loc || '—') + '</td></tr>';
    }).join('') : '';

    $('#quiz-hub-content').innerHTML =
      '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-8 text-center mb-6">' +
        '<p class="text-5xl font-extrabold ' + (r.pct >= 80 ? 'text-[#d4af37]' : r.pct >= 60 ? 'text-emerald-400' : 'text-[#f5f0e6]/70') + '">' + r.pct + '%</p>' +
        '<p class="text-[#f5f0e6]/70 mt-2">' + r.correct + ' / ' + r.total + ' correct · Time: ' + r.time + '</p>' +
        '<p class="text-sm mt-1 ' + (r.pct >= 60 ? 'text-emerald-400 font-semibold' : 'text-[#f5f0e6]/60') + '">' + (r.pct >= 80 ? 'Excellent! Band 8+ territory.' : r.pct >= 60 ? 'Good effort — review the explanations.' : 'Keep practising — review the answers below.') + '</p>' +
        (r.test.band ? '<p class="text-xs text-[rgba(212,175,55,0.7)] mt-2 font-semibold">Target band: ' + esc(r.test.band) + '</p>' : '') +
      '</div>' +
      (hasLoc ? '<h3 class="text-lg font-bold text-[#f5f0e6] mb-3">🔑 Keyword Locator</h3>' +
        '<div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-4 mb-6">' +
        '<p class="text-[11px] text-[#f5f0e6]/50 mb-2">Search for these words (or their synonyms) in the passage to locate each answer.</p>' +
        '<table class="w-full"><thead><tr><th class="text-left text-[10px] uppercase tracking-wider text-[#f5f0e6]/40 pb-2 pr-3">Question</th><th class="text-left text-[10px] uppercase tracking-wider text-[#f5f0e6]/40 pb-2 pr-3">Keyword to locate</th><th class="text-left text-[10px] uppercase tracking-wider text-[#f5f0e6]/40 pb-2">Position</th></tr></thead><tbody>' + locRows + '</tbody></table></div>' : '') +
      '<h3 class="text-lg font-bold text-[#f5f0e6] mb-4">Answer Review</h3>' +
      '<div class="space-y-3 mb-6">' + reviewRows + '</div>' +
      '<div class="flex gap-3">' +
        '<button class="btn-secondary text-sm" onclick="IELTS_QUIZ_HUB.back()">← Back to Hub</button>' +
        '<button class="btn-primary text-sm" onclick="IELTS_QUIZ_HUB.start(\'' + r.test.id + '\')">🔁 Retry</button>' +
      '</div>';
  }

  function back() {
    stopTimer();
    state.view = 'home';
    state.testKey = null;
    render();
  }

  window.IELTS_QUIZ_HUB = { render: render, switchTab: switchTab, start: start, answer: answer, text: text, next: next, prev: prev, back: back };
})();
