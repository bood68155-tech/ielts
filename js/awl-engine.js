/* ============================================================
   IELTS PA — AWL & Collocation Engine
   360+ academic words (Band 7-9) with definitions, collocations,
   context sentences, CEFR/band tags, flashcards and spaced
   repetition scheduling. Uses setScoped('awl', ...) persistence.
   ============================================================ */
(function () {
  'use strict';
  const $ = (sel) => document.querySelector(sel);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  /* Word format: [word, pos, definition, collocation, context, band] */
  const AWL_WORDS = [
    /* ===== Band 7 core AWL ===== */
    ['analysis', 'n.', 'detailed examination of elements', 'conduct an analysis / in-depth analysis', 'Researchers conducted a detailed analysis of the survey data.', '7'],
    ['approach', 'n./v.', 'a way of dealing with something', 'adopt an approach / systematic approach', 'The government adopted a new approach to urban planning.', '7'],
    ['assess', 'v.', 'to evaluate the value or quality', 'assess the impact / assess risk', 'We must assess the risks before proceeding.', '7'],
    ['context', 'n.', 'circumstances surrounding an event', 'in this context / the broader context', 'The decision must be understood in its historical context.', '7'],
    ['constitute', 'v.', 'to form or compose', 'constitute a threat / constitutes', 'These findings constitute a major breakthrough.', '7'],
    ['data', 'n.', 'information collected for analysis', 'raw data / analyse data / data set', 'The data suggest a clear correlation between variables.', '7'],
    ['derive', 'v.', 'to obtain from a source', 'derive from / derived value', 'Many English words derive from Latin.', '7'],
    ['establish', 'v.', 'to set up or prove', 'establish a link / establish credibility', 'The study aims to establish a causal link.', '7'],
    ['factor', 'n.', 'one element contributing to a result', 'a key factor / contributing factor', 'Cost is a key factor in the decision.', '7'],
    ['function', 'n./v.', 'a purpose or role', 'serve a function / key function', 'Green spaces serve an important social function.', '7'],
    ['identify', 'v.', 'to recognise and name', 'identify the causes / identify a need', 'Researchers identified several causes of the problem.', '7'],
    ['indicate', 'v.', 'to show or suggest', 'indicate that / be indicated by', 'The results indicate a significant improvement.', '7'],
    ['individual', 'n./adj.', 'a single person or thing', 'individual needs / each individual', 'The policy should respect individual differences.', '7'],
    ['interpret', 'v.', 'to explain the meaning of', 'interpret data / interpret results', 'It is difficult to interpret these results without context.', '7'],
    ['involve', 'v.', 'to include or engage', 'involve a risk / be involved in', 'The process involves several stages.', '7'],
    ['method', 'n.', 'a systematic way of doing something', 'adopt a method / research method', 'They used a quantitative research method.', '7'],
    ['occur', 'v.', 'to happen or take place', 'occur frequently / it occurs that', 'Changes occur rapidly in developing economies.', '7'],
    ['policy', 'n.', 'a course of action adopted', 'implement a policy / public policy', 'The new policy aims to reduce emissions.', '7'],
    ['principle', 'n.', 'a fundamental truth or rule', 'core principle / in principle', 'The approach is sound in principle.', '7'],
    ['proceed', 'v.', 'to continue or go forward', 'proceed with / proceed to', 'We will proceed with the planned reforms.', '7'],
    ['process', 'n.', 'a series of steps', 'the decision process / undergo a process', 'The manufacturing process is highly automated.', '7'],
    ['require', 'v.', 'to need as necessary', 'require approval / be required to', 'All applications require supervisor approval.', '7'],
    ['research', 'n./v.', 'systematic investigation', 'conduct research / research findings', 'Recent research shows a strong link.', '7'],
    ['respond', 'v.', 'to react or reply', 'respond to / respond effectively', 'The company responded to the criticism.', '7'],
    ['role', 'n.', 'a function or part played', 'play a role / crucial role', 'Technology plays a crucial role in education.', '7'],
    ['significant', 'adj.', 'important or notable', 'a significant impact / significant differences', 'There was a significant increase in sales.', '7'],
    ['similar', 'adj.', 'having a resemblance', 'similar to / strikingly similar', 'The two studies produced similar results.', '7'],
    ['source', 'n.', 'a place from which something comes', 'source of / primary source', 'The report cites several primary sources.', '7'],
    ['specific', 'adj.', 'precise or particular', 'specific requirements / specific to', 'Each region has its own specific challenges.', '7'],
    ['structure', 'n./v.', 'the arrangement of parts', 'social structure / financial structure', 'The essay has a clear overall structure.', '7'],
    ['theory', 'n.', 'a system of ideas explaining something', 'put forward a theory / under this theory', 'The theory was later disproved.', '7'],
    ['variable', 'n.', 'an element that can change', 'control a variable / dependent variable', 'The experiment controlled for several variables.', '7'],
    /* ===== Band 7.5 AWL ===== */
    ['achieve', 'v.', 'to successfully reach a goal', 'achieve a target / achieve success', 'The team achieved its annual targets.', '7.5'],
    ['acquisition', 'n.', 'the act of gaining something', 'language acquisition / knowledge acquisition', 'Vocabulary acquisition is key to IELTS success.', '7.5'],
    ['alternative', 'n./adj.', 'another available option', 'a viable alternative / alternative solutions', 'We need to explore alternative energy sources.', '7.5'],
    ['analogy', 'n.', 'a comparison between similar things', 'draw an analogy / by analogy', 'The teacher drew an analogy between the heart and a pump.', '7.5'],
    ['anticipate', 'v.', 'to expect or predict', 'anticipate a problem / anticipate change', 'We anticipate significant growth next year.', '7.5'],
    ['arbitrary', 'adj.', 'based on random choice', 'arbitrary decision / seemingly arbitrary', 'The decision seemed arbitrary rather than reasoned.', '7.5'],
    ['assumption', 'n.', 'something taken for granted', 'make an assumption / underlying assumption', 'The argument rests on a flawed assumption.', '7.5'],
    ['attribute', 'v.', 'to ascribe a cause', 'attribute to / attribute success to', 'She attributed her success to hard work.', '7.5'],
    ['capability', 'n.', 'the power to do something', 'technical capability / extend capability', 'The system has limited processing capability.', '7.5'],
    ['coherent', 'adj.', 'logical and consistent', 'a coherent argument / coherent structure', 'His essay presented a coherent argument.', '7.5'],
    ['coincide', 'v.', 'to happen at the same time', 'coincide with / exactly coincide', 'The meeting coincided with the deadline.', '7.5'],
    ['complement', 'v./n.', 'to complete or enhance', 'complement each other / a natural complement', 'Online and classroom learning complement each other.', '7.5'],
    ['comprehensive', 'adj.', 'complete and thorough', 'a comprehensive review / comprehensive coverage', 'The report offers a comprehensive analysis.', '7.5'],
    ['conceive', 'v.', 'to form an idea', 'conceive of / well-conceived', 'The plan was poorly conceived from the start.', '7.5'],
    ['consequence', 'n.', 'a result or effect', 'a direct consequence / serious consequences', 'The reform had serious economic consequences.', '7.5'],
    ['constrain', 'v.', 'to limit or restrict', 'constrained by / tight constraints', 'Progress was constrained by limited funding.', '7.5'],
    ['contradict', 'v.', 'to be inconsistent with', 'contradict a claim / directly contradict', 'The evidence contradicts earlier claims.', '7.5'],
    ['criteria', 'n.', 'standards for judgement', 'meet the criteria / strict criteria', 'Applicants must meet several criteria.', '7.5'],
    ['crucial', 'adj.', 'of critical importance', 'a crucial role / crucial to', 'Timing is crucial to the success of the project.', '7.5'],
    ['deduce', 'v.', 'to reason to a conclusion', 'deduce from / reasonably deduce', 'We can deduce the cause from the evidence.', '7.5'],
    ['demonstrate', 'v.', 'to show clearly', 'demonstrate a point / clearly demonstrate', 'The study demonstrates a clear link.', '7.5'],
    ['diminish', 'v.', 'to make or become smaller', 'greatly diminish / diminish in importance', 'The value of the asset diminished over time.', '7.5'],
    ['discrete', 'adj.', 'separate and distinct', 'discrete units / discrete categories', 'The data falls into discrete categories.', '7.5'],
    ['displace', 'v.', 'to move from its place', 'displace workers / displaced populations', 'Automation could displace many workers.', '7.5'],
    ['distinct', 'adj.', 'clearly different', 'distinct from / a distinct advantage', 'The two species are genetically distinct.', '7.5'],
    ['distribute', 'v.', 'to spread over an area', 'evenly distributed / distribute resources', 'Wealth is not evenly distributed.', '7.5'],
    ['dominant', 'adj.', 'most important or powerful', 'a dominant role / overwhelmingly dominant', 'The firm holds a dominant market position.', '7.5'],
    ['emerge', 'v.', 'to come into view or existence', 'emerge from / newly emerged', 'A new trend is emerging in the industry.', '7.5'],
    ['emphasis', 'n.', 'special importance given to', 'place emphasis on / heavy emphasis', 'The course places heavy emphasis on writing.', '7.5'],
    ['empirical', 'adj.', 'based on observation or experiment', 'empirical evidence / empirical research', 'The claims lack empirical support.', '7.5'],
    ['enable', 'v.', 'to make possible', 'enable someone to / enable growth', 'The grant enabled the team to expand.', '7.5'],
    ['equivalent', 'n./adj.', 'equal in value or meaning', 'the equivalent of / roughly equivalent', 'The qualification is equivalent to a degree.', '7.5'],
    ['evaluate', 'v.', 'to judge the value of', 'evaluate the effectiveness / critically evaluate', 'We must evaluate the programme\'s effectiveness.', '7.5'],
    ['evident', 'adj.', 'clear and obvious', 'be evident in / clearly evident', 'Progress was evident in the final exam results.', '7.5'],
    ['exhibit', 'v.', 'to show or display', 'exhibit characteristics / exhibit behaviour', 'The patients exhibited similar symptoms.', '7.5'],
    ['facilitate', 'v.', 'to make easier', 'facilitate learning / facilitate communication', 'Technology facilitates remote collaboration.', '7.5'],
    ['fundamental', 'adj.', 'forming a necessary base', 'fundamental principle / fundamental change', 'The study addresses fundamental questions.', '7.5'],
    ['hypothesis', 'n.', 'a proposed explanation', 'test a hypothesis / form a hypothesis', 'The results supported the original hypothesis.', '7.5'],
    ['implement', 'v.', 'to put into effect', 'implement a policy / implement changes', 'The plan was implemented across all branches.', '7.5'],
    ['implication', 'n.', 'a likely consequence', 'have implications for / far-reaching implications', 'The findings have major policy implications.', '7.5'],
    ['incentive', 'n.', 'a motivation to act', 'provide an incentive / financial incentive', 'Tax breaks provide an incentive to invest.', '7.5'],
    ['inevitable', 'adj.', 'certain to happen', 'an inevitable consequence / virtually inevitable', 'Change is inevitable in a global economy.', '7.5'],
    ['integrate', 'v.', 'to combine into a whole', 'integrate into / fully integrated', 'The new system must integrate with existing software.', '7.5'],
    ['interpretation', 'n.', 'the act of explaining meaning', 'open to interpretation / alternative interpretation', 'The data is open to different interpretations.', '7.5'],
    ['justify', 'v.', 'to show to be right', 'justify a decision / be justified in', 'The costs must be justified by the benefits.', '7.5'],
    ['magnitude', 'n.', 'great size or importance', 'the magnitude of / order of magnitude', 'The scale of the task is of great magnitude.', '7.5'],
    ['methodology', 'n.', 'a system of research methods', 'research methodology / adopt a methodology', 'The methodology was rigorous and well-documented.', '7.5'],
    ['minimal', 'adj.', 'very small in amount', 'minimal impact / minimal effort', 'The change had minimal effect on results.', '7.5'],
    ['modify', 'v.', 'to make partial changes', 'modify behaviour / significantly modified', 'The design was modified to reduce costs.', '7.5'],
    ['objective', 'n./adj.', 'a goal; unbiased', 'achieve an objective / objective criteria', 'The company set clear objectives for the year.', '7.5'],
    ['obtain', 'v.', 'to get or acquire', 'obtain approval / obtain data', 'Permission must be obtained in advance.', '7.5'],
    ['ongoing', 'adj.', 'continuing', 'ongoing research / an ongoing process', 'The project is part of ongoing research.', '7.5'],
    ['phenomenon', 'n.', 'a remarkable event or fact', 'a natural phenomenon / a widespread phenomenon', 'Urbanisation is a global phenomenon.', '7.5'],
    ['plausible', 'adj.', 'seeming reasonable', 'a plausible explanation / entirely plausible', 'The explanation seems plausible at first glance.', '7.5'],
    ['precise', 'adj.', 'exact and accurate', 'precise measurement / highly precise', 'The instruments give precise readings.', '7.5'],
    ['predict', 'v.', 'to say what will happen', 'predict a rise / cannot predict', 'Economists predict a gradual recovery.', '7.5'],
    ['prerequisite', 'n.', 'something required beforehand', 'a prerequisite for / essential prerequisite', 'Basic maths is a prerequisite for the course.', '7.5'],
    ['priority', 'n.', 'something given top importance', 'top priority / give priority to', 'Safety is our top priority.', '7.5'],
    ['proportion', 'n.', 'a part in relation to the whole', 'a large proportion / in proportion to', 'A large proportion of the budget is spent on equipment.', '7.5'],
    ['rational', 'adj.', 'based on reason', 'a rational decision / perfectly rational', 'Consumers often make less-than-rational choices.', '7.5'],
    ['reinforce', 'v.', 'to strengthen', 'reinforce a message / reinforce learning', 'Repetition reinforces learning.', '7.5'],
    ['relevant', 'adj.', 'closely connected to the matter', 'relevant to / highly relevant', 'The evidence is directly relevant to the case.', '7.5'],
    ['reliable', 'adj.', 'consistently good and trustworthy', 'a reliable source / reliable data', 'We need more reliable data to draw conclusions.', '7.5'],
    ['restrain', 'v.', 'to hold back or limit', 'restrain growth / be restrained by', 'Demand was restrained by high prices.', '7.5'],
    ['sceptical', 'adj.', 'having doubts', 'be sceptical of / deeply sceptical', 'Scientists remain sceptical of the claim.', '7.5'],
    ['sequence', 'n.', 'an ordered arrangement', 'in sequence / a sequence of events', 'The events occurred in rapid sequence.', '7.5'],
    ['strategy', 'n.', 'a plan to achieve a goal', 'adopt a strategy / long-term strategy', 'The firm adopted a long-term growth strategy.', '7.5'],
    ['substantial', 'adj.', 'considerable in size', 'a substantial increase / substantial evidence', 'There was a substantial increase in demand.', '7.5'],
    ['sufficient', 'adj.', 'enough for a purpose', 'sufficient evidence / more than sufficient', 'The evidence is sufficient to support the claim.', '7.5'],
    ['sustain', 'v.', 'to maintain over time', 'sustain growth / environmentally sustainable', 'The current growth rate cannot be sustained.', '7.5'],
    ['tendency', 'n.', 'an inclination to behave a certain way', 'a tendency to / a marked tendency', 'There is a tendency to underestimate costs.', '7.5'],
    ['transform', 'v.', 'to change completely', 'transform into / dramatically transform', 'Technology has transformed the industry.', '7.5'],
    ['underlying', 'adj.', 'basic but not obvious', 'underlying cause / underlying assumption', 'We must address the underlying causes of poverty.', '7.5'],
    ['utilise', 'v.', 'to make practical use of', 'utilise resources / fully utilise', 'The project utilises recycled materials.', '7.5'],
    ['valid', 'adj.', 'logically sound and acceptable', 'a valid argument / scientifically valid', 'The experiment was not statistically valid.', '7.5'],
    ['vulnerable', 'adj.', 'exposed to harm', 'vulnerable to / particularly vulnerable', 'Coastal areas are vulnerable to flooding.', '7.5'],
    /* ===== Band 8 AWL ===== */
    ['abate', 'v.', 'to become less intense', 'the storm abated / gradually abate', 'Public concern did not abate after the announcement.', '8'],
    ['absorb', 'v.', 'to take in or soak up', 'absorb the cost / absorb information', 'Trees absorb carbon dioxide from the atmosphere.', '8'],
    ['accelerate', 'v.', 'to increase speed', 'accelerate growth / rapidly accelerate', 'Digitalisation accelerated the pace of change.', '8'],
    ['accommodate', 'v.', 'to provide for or adapt to', 'accommodate the needs / accommodate growth', 'The city must accommodate a growing population.', '8'],
    ['accumulate', 'v.', 'to gather over time', 'accumulate wealth / slowly accumulate', 'Pollutants accumulate in the food chain.', '8'],
    ['advocate', 'v./n.', 'to publicly support', 'advocate reform / a strong advocate of', 'Many experts advocate stricter regulation.', '8'],
    ['aggregate', 'adj./n.', 'total formed from parts', 'aggregate demand / in the aggregate', 'Aggregate demand drives economic growth.', '8'],
    ['allocate', 'v.', 'to distribute for a purpose', 'allocate resources / allocate funds', 'Funds were allocated to new projects.', '8'],
    ['ambiguous', 'adj.', 'open to multiple interpretations', 'an ambiguous statement / remain ambiguous', 'The wording was deliberately ambiguous.', '8'],
    ['analogous', 'adj.', 'comparable in certain respects', 'analogous to / roughly analogous', 'The two systems are structurally analogous.', '8'],
    ['apparent', 'adj.', 'clearly visible or understood', 'apparent in / increasingly apparent', 'The benefits became apparent over time.', '8'],
    ['articulate', 'v./adj.', 'to express clearly; well-spoken', 'articulate a view / articulate clearly', 'She articulated the group\'s concerns effectively.', '8'],
    ['ascertain', 'v.', 'to find out for certain', 'ascertain the facts / difficult to ascertain', 'It is difficult to ascertain the exact cause.', '8'],
    ['attribute', 'n.', 'a characteristic or quality', 'a key attribute / inherent attribute', 'Flexibility is a valued attribute in the workforce.', '8'],
    ['breach', 'v./n.', 'to break (a rule); a violation', 'breach of contract / a security breach', 'The company breached its environmental obligations.', '8'],
    ['clarity', 'n.', 'the quality of being clear', 'with clarity / conceptual clarity', 'The report was praised for its clarity.', '8'],
    ['coercion', 'n.', 'the use of force to make someone', 'under coercion / forms of coercion', 'The confession was obtained under coercion.', '8'],
    ['coherently', 'adv.', 'in a logical, consistent way', 'argue coherently / speak coherently', 'The candidate answered every question coherently.', '8'],
    ['commensurate', 'adj.', 'proportionate', 'commensurate with / broadly commensurate', 'Pay should be commensurate with experience.', '8'],
    ['compensate', 'v.', 'to make up for a loss', 'compensate for / fully compensated', 'The benefits compensate for the higher cost.', '8'],
    ['compile', 'v.', 'to gather into a single set', 'compile a list / compile data', 'Researchers compiled data from multiple sources.', '8'],
    ['comply', 'v.', 'to act in accordance with rules', 'comply with / fail to comply', 'All firms must comply with safety regulations.', '8'],
    ['conform', 'v.', 'to follow rules or standards', 'conform to / conform with', 'The product must conform to EU standards.', '8'],
    ['contend', 'v.', 'to argue or compete', 'contend that / contend for', 'The report contends that the policy is ineffective.', '8'],
    ['contradiction', 'n.', 'a situation of inconsistency', 'a direct contradiction / apparent contradiction', 'There is a contradiction between the two statements.', '8'],
    ['convey', 'v.', 'to communicate an idea', 'convey a message / convey meaning', 'The diagram conveys the information clearly.', '8'],
    ['conviction', 'n.', 'a firm belief', 'a strong conviction / hold the conviction', 'She holds the conviction that education is transformative.', '8'],
    ['correlate', 'v.', 'to have a mutual relationship', 'correlate with / strongly correlate', 'Income strongly correlates with health outcomes.', '8'],
    ['credibility', 'n.', 'the quality of being trusted', 'establish credibility / lose credibility', 'The scandal damaged the company\'s credibility.', '8'],
    ['deem', 'v.', 'to consider or judge', 'be deemed necessary / deemed appropriate', 'It was deemed necessary to act immediately.', '8'],
    ['deficiency', 'n.', 'a lack or shortfall', 'a deficiency in / vitamin deficiency', 'The study revealed a deficiency in the methodology.', '8'],
    ['deliberate', 'adj.', 'done on purpose', 'a deliberate attempt / deliberately misleading', 'The delay was a deliberate strategy.', '8'],
    ['denote', 'v.', 'to be a sign of', 'denote a change / commonly denote', 'In this model, the symbol denotes demand.', '8'],
    ['depict', 'v.', 'to represent in an image or words', 'depict a scene / accurately depict', 'The chart depicts the trend over time.', '8'],
    ['detect', 'v.', 'to discover or notice', 'detect a change / difficult to detect', 'The sensor can detect minute changes.', '8'],
    ['deteriorate', 'v.', 'to become worse', 'rapidly deteriorate / deteriorate over time', 'Relations between the two countries deteriorated.', '8'],
    ['deviation', 'n.', 'a departure from the norm', 'a deviation from / standard deviation', 'Any deviation from the plan must be approved.', '8'],
    ['diminish', 'v.', 'to make or become less', 'greatly diminished / diminish the significance', 'The value of the currency diminished sharply.', '8'],
    ['disclose', 'v.', 'to make known publicly', 'disclose information / fully disclose', 'Companies must disclose their financial records.', '8'],
    ['discriminate', 'v.', 'to treat differently; to distinguish', 'discriminate against / discriminate between', 'The system may discriminate against certain groups.', '8'],
    ['dispute', 'n./v.', 'a disagreement; to challenge', 'a bitter dispute / disputed territory', 'The figures are widely disputed.', '8'],
    ['distort', 'v.', 'to twist out of shape or meaning', 'distort the facts / distort a result', 'Bias can distort research findings.', '8'],
    ['doctrine', 'n.', 'a set of beliefs or principles', 'economic doctrine / a core doctrine', 'The policy follows a free-market doctrine.', '8'],
    ['elaborate', 'v./adj.', 'to explain in detail; detailed', 'elaborate on / elaborate design', 'Could you elaborate on your main point?', '8'],
    ['eliminate', 'v.', 'to completely remove', 'eliminate the risk / eliminate waste', 'The programme aims to eliminate inequality.', '8'],
    ['embody', 'v.', 'to represent an idea or quality', 'embody a principle / perfectly embody', 'The building embodies the spirit of the age.', '8'],
    ['empirical', 'adj.', 'based on data and observation', 'empirical research / empirical evidence', 'The theory lacks empirical backing.', '8'],
    ['encompass', 'v.', 'to include a wide range', 'encompass a range / broadly encompass', 'The term encompasses many different practices.', '8'],
    ['explicit', 'adj.', 'stated clearly and in detail', 'explicit instruction / make explicit', 'The rules are explicit and unambiguous.', '8'],
    ['expenditure', 'n.', 'the action of spending funds', 'public expenditure / capital expenditure', 'Government expenditure rose sharply.', '8'],
    ['feasible', 'adj.', 'possible and practical', 'a feasible option / technically feasible', 'The plan is economically feasible.', '8'],
    ['fluctuate', 'v.', 'to rise and fall irregularly', 'fluctuate with / fluctuate wildly', 'Prices fluctuate with seasonal demand.', '8'],
    ['formulate', 'v.', 'to devise and state clearly', 'formulate a plan / formulate a theory', 'They formulated a strategy to reduce costs.', '8'],
    ['foster', 'v.', 'to encourage development', 'foster innovation / foster cooperation', 'The scheme fosters innovation among startups.', '8'],
    ['hierarchy', 'n.', 'a system of ranking', 'a rigid hierarchy / chain of hierarchy', 'The company has a flat, non-hierarchical structure.', '8'],
    ['identical', 'adj.', 'exactly the same', 'identical to / virtually identical', 'The two products are nearly identical.', '8'],
    ['illegitimate', 'adj.', 'not authorised or justifiable', 'an illegitimate use / illegitimate claim', 'The data was obtained through illegitimate means.', '8'],
    ['implicit', 'adj.', 'implied but not stated', 'an implicit assumption / implicit bias', 'There is an implicit assumption in the argument.', '8'],
    ['incur', 'v.', 'to become subject to costs', 'incur expenses / incur a penalty', 'The firm incurred heavy losses.', '8'],
    ['induce', 'v.', 'to bring about or cause', 'induce change / induce stress', 'The drug can induce side effects.', '8'],
    ['inherent', 'adj.', 'existing as a natural part', 'inherent in / an inherent risk', 'There are inherent risks in the venture.', '8'],
    ['inhibit', 'v.', 'to slow or prevent', 'inhibit growth / inhibit progress', 'High costs inhibit investment.', '8'],
    ['initiate', 'v.', 'to begin or set in motion', 'initiate a process / initiate change', 'The council initiated a review of the policy.', '8'],
    ['instigate', 'v.', 'to provoke or bring about', 'instigate reform / instigate conflict', 'The report instigated wide-ranging reforms.', '8'],
    ['integral', 'adj.', 'essential to completeness', 'an integral part / integral to', 'Data security is integral to the system.', '8'],
    ['interpretative', 'adj.', 'relating to explanation', 'interpretative frameworks / interpretative model', 'The results require an interpretative approach.', '8'],
    ['intrinsic', 'adj.', 'belonging naturally', 'intrinsic value / intrinsic to', 'The design has intrinsic aesthetic value.', '8'],
    ['involuntary', 'adj.', 'done without conscious control', 'an involuntary response / involuntary movement', 'Breathing is largely involuntary.', '8'],
    ['legitimate', 'adj.', 'lawful or justifiable', 'a legitimate concern / legitimate interests', 'There are legitimate concerns about privacy.', '8'],
    ['manipulate', 'v.', 'to control or influence skilfully', 'manipulate data / manipulate opinion', 'The figures were manipulated to mislead investors.', '8'],
    ['maximise', 'v.', 'to make as large as possible', 'maximise profit / maximise potential', 'The goal is to maximise efficiency.', '8'],
    ['mediate', 'v.', 'to intervene to resolve', 'mediate a dispute / mediate between', 'The UN mediated the peace talks.', '8'],
    ['merely', 'adv.', 'only, simply', 'merely a matter of / not merely', 'The issue is not merely economic.', '8'],
    ['persist', 'v.', 'to continue firmly', 'persist in / the problem persists', 'The symptoms persisted for weeks.', '8'],
    ['plausibility', 'n.', 'the quality of seeming reasonable', 'the plausibility of / outer plausibility', 'The plausibility of the theory was questioned.', '8'],
    ['precede', 'v.', 'to come before', 'precede by / immediately precede', 'The main point is preceded by the introduction.', '8'],
    ['precipitation', 'n.', 'rain, snow or hail', 'annual precipitation / heavy precipitation', 'The region receives low annual precipitation.', '8'],
    ['predominant', 'adj.', 'most common or influential', 'predominant view / predominately', 'The predominant opinion favours reform.', '8'],
    ['presume', 'v.', 'to suppose to be true', 'presume that / be presumed innocent', 'The proposal presumes sufficient funding.', '8'],
    ['prevalent', 'adj.', 'widespread in a particular area', 'prevalent in / increasingly prevalent', 'Remote work is prevalent in tech industries.', '8'],
    ['proficient', 'adj.', 'competent or skilled', 'proficient in / highly proficient', 'She is proficient in three languages.', '8'],
    ['profound', 'adj.', 'very great or intense', 'a profound impact / profound change', 'The discovery had a profound effect on medicine.', '8'],
    ['prospective', 'adj.', 'likely to become a reality', 'prospective buyers / prospective employees', 'The course attracts prospective students.', '8'],
    ['rigorous', 'adj.', 'thorough and accurate', 'rigorous testing / a rigorous analysis', 'The results came from rigorous testing.', '8'],
    ['simulate', 'v.', 'to imitate or reproduce', 'simulate conditions / computer-simulated', 'The software simulates real traffic conditions.', '8'],
    ['spontaneous', 'adj.', 'unplanned and natural', 'a spontaneous response / spontaneous reaction', 'There was a spontaneous burst of applause.', '8'],
    ['subsequent', 'adj.', 'coming after something', 'subsequent events / in subsequent years', 'Subsequent studies confirmed the findings.', '8'],
    ['subsidy', 'n.', 'financial support from the state', 'government subsidy / a farm subsidy', 'The industry relies on government subsidies.', '8'],
    ['tangible', 'adj.', 'perceptible or real', 'a tangible benefit / tangible evidence', 'The scheme produced tangible results.', '8'],
    ['template', 'n.', 'a model to be copied', 'a template for / act as a template', 'The programme served as a template for other regions.', '8'],
    ['tentative', 'adj.', 'not certain or final', 'a tentative conclusion / a tentative agreement', 'The results point to a tentative conclusion.', '8'],
    ['verify', 'v.', 'to confirm the truth of', 'verify a claim / verify the accuracy', 'The findings were verified by independent tests.', '8'],
    ['viable', 'adj.', 'capable of working successfully', 'a viable option / commercially viable', 'The proposal is technically viable.', '8'],
    ['warrant', 'v.', 'to justify or call for', 'warrant further investigation / warrant attention', 'The situation warrants immediate action.', '8'],
    /* ===== Band 9 AWL ===== */
    ['aberration', 'n.', 'a departure from the normal', 'a statistical aberration / a temporary aberration', 'The result was dismissed as a statistical aberration.', '9'],
    ['acquiesce', 'v.', 'to accept reluctantly', 'acquiesce to / acquiesce in', 'The board acquiesced to the demands.', '9'],
    ['adhere', 'v.', 'to stick to or follow', 'adhere to rules / adhere strictly', 'All members must adhere to the code of conduct.', '9'],
    ['adversarial', 'adj.', 'involving opposition', 'an adversarial relationship / adversarial approach', 'The debate took an adversarial tone.', '9'],
    ['alleviate', 'v.', 'to reduce pain or difficulty', 'alleviate poverty / alleviate congestion', 'The policy helped alleviate urban congestion.', '9'],
    ['ameliorate', 'v.', 'to make better', 'ameliorate the situation / fully ameliorate', 'Measures were taken to ameliorate the crisis.', '9'],
    ['amenable', 'adj.', 'responsive to suggestion', 'amenable to change / amenable to', 'The design is amenable to modification.', '9'],
    ['anomaly', 'n.', 'something that deviates from the norm', 'a statistical anomaly / detect an anomaly', 'The pattern is an anomaly in the data set.', '9'],
    ['antithesis', 'n.', 'the direct opposite', 'the antithesis of / a stark antithesis', 'His views are the antithesis of mainstream opinion.', '9'],
    ['arbitrate', 'v.', 'to settle a dispute as an outsider', 'arbitrate a dispute / arbitrate between', 'An independent panel was asked to arbitrate.', '9'],
    ['archaic', 'adj.', 'very old or outdated', 'an archaic law / archaic language', 'The practice is now considered archaic.', '9'],
    ['arduous', 'adj.', 'involving great effort', 'an arduous task / an arduous journey', 'The negotiation was long and arduous.', '9'],
    ['benign', 'adj.', 'gentle, harmless', 'a benign effect / benign conditions', 'The change proved benign for the industry.', '9'],
    ['catalyst', 'n.', 'something that causes change', 'a catalyst for / act as a catalyst', 'The crisis acted as a catalyst for reform.', '9'],
    ['cede', 'v.', 'to give up power or territory', 'cede control / cede ground', 'The government refused to cede authority.', '9'],
    ['circumvent', 'v.', 'to find a way around', 'circumvent the law / circumvent problems', 'Firms sought to circumvent the restrictions.', '9'],
    ['cogent', 'adj.', 'clear, logical, convincing', 'a cogent argument / cogent reasons', 'She presented a cogent case for reform.', '9'],
    ['concur', 'v.', 'to agree', 'concur with / wholeheartedly concur', 'I concur with the majority view.', '9'],
    ['conjecture', 'n.', 'opinion based on incomplete info', 'pure conjecture / based on conjecture', 'The claim is nothing more than conjecture.', '9'],
    ['consensus', 'n.', 'general agreement', 'reach a consensus / a broad consensus', 'There is broad consensus on the need for action.', '9'],
    ['contingent', 'adj.', 'dependent on conditions', 'contingent on / contingent upon', 'The offer is contingent on funding approval.', '9'],
    ['corroborate', 'v.', 'to confirm or support evidence', 'corroborate a claim / corroborating evidence', 'Independent sources corroborated the report.', '9'],
    ['deleterious', 'adj.', 'harmful in a subtle way', 'deleterious effects / deleterious to', 'The chemicals have a deleterious effect on wildlife.', '9'],
    ['delineate', 'v.', 'to describe or draw precisely', 'delineate the boundaries / clearly delineated', 'The report delineates the scope of the problem.', '9'],
    ['delineate', 'v.', 'to outline precisely', 'delineate a policy / delineate the role', 'The constitution delineates the powers of each branch.', '9'],
    ['demarcation', 'n.', 'a boundary line', 'line of demarcation / clear demarcation', 'There is a clear demarcation of responsibilities.', '9'],
    ['denigration', 'n.', 'unfair criticism', 'denigration of / self-denigration', 'The denigration of opponents is counterproductive.', '9'],
    ['deprivation', 'n.', 'the lack of basic necessities', 'sleep deprivation / social deprivation', 'The study linked deprivation to poor health.', '9'],
    ['deterrent', 'n.', 'something that discourages action', 'a deterrent to / act as a deterrent', 'Heavy fines act as a deterrent to speeding.', '9'],
    ['disparity', 'n.', 'a great difference', 'a wide disparity / regional disparity', 'There is a striking disparity in incomes.', '9'],
    ['disseminate', 'v.', 'to spread widely', 'disseminate information / widely disseminated', 'The findings were disseminated through journals.', '9'],
    ['elucidate', 'v.', 'to make clear', 'elucidate a point / help elucidate', 'The data helps elucidate the mechanism.', '9'],
    ['emulate', 'v.', 'to match or surpass by imitation', 'emulate a model / strive to emulate', 'Other cities sought to emulate the success.', '9'],
    ['enumerate', 'v.', 'to list one by one', 'enumerate the reasons / enumerate the items', 'The report enumerates the key challenges.', '9'],
    ['exacerbate', 'v.', 'to make worse', 'exacerbate the problem / further exacerbate', 'The cuts exacerbated the existing crisis.', '9'],
    ['expedite', 'v.', 'to make happen sooner', 'expedite the process / expedite delivery', 'The reforms expedited the approval process.', '9'],
    ['explicit', 'adj.', 'clearly stated', 'explicitly stated / make explicit', 'The terms were made explicit in the contract.', '9'],
    ['feasibility', 'n.', 'the state of being possible', 'assess the feasibility / technical feasibility', 'The team assessed the project\'s feasibility.', '9'],
    ['fragile', 'adj.', 'easily broken or damaged', 'a fragile economy / fragile confidence', 'The recovery remains fragile.', '9'],
    ['imperative', 'adj./n.', 'absolutely necessary', 'imperative to / a moral imperative', 'It is imperative that action be taken now.', '9'],
    ['impetus', 'n.', 'the force that drives forward', 'gain impetus / provide an impetus', 'The policy gave new impetus to the sector.', '9'],
    ['inclination', 'n.', 'a tendency to behave a certain way', 'an inclination to / a natural inclination', 'She has an inclination to overcomplicate things.', '9'],
    ['indictment', 'n.', 'a formal accusation; a sign of fault', 'a damning indictment / an indictment of', 'The report is a damning indictment of the policy.', '9'],
    ['inherent', 'adj.', 'existing as a permanent part', 'inherent in / an inherent feature', 'There is an inherent contradiction in the plan.', '9'],
    ['invalidate', 'v.', 'to make insufficiently valid', 'invalidate the results / not invalidate', 'The procedural error invalidated the study.', '9'],
    ['lucid', 'adj.', 'expressed clearly', 'a lucid explanation / lucid prose', 'The author offers a lucid account.', '9'],
    ['mitigate', 'v.', 'to make less severe', 'mitigate the effects / mitigate risk', 'Measures were taken to mitigate the damage.', '9'],
    ['nonconformity', 'n.', 'failure to conform', 'a nonconformity in / nonconformity to', 'The inspection noted several nonconformities.', '9'],
    ['notion', 'n.', 'a belief or idea', 'a prevailing notion / challenge a notion', 'The notion of progress is contested.', '9'],
    ['nuance', 'n.', 'a subtle difference', 'subtle nuance / a nuanced view', 'A good analysis captures the nuance of the issue.', '9'],
    ['paradigm', 'n.', 'a typical example or model', 'a paradigm shift / a new paradigm', 'The technology caused a paradigm shift in industry.', '9'],
    ['pertinent', 'adj.', 'directly relevant', 'pertinent to / highly pertinent', 'The data is quite pertinent to the debate.', '9'],
    ['proclivity', 'n.', 'a tendency to do something', 'a proclivity for / a natural proclivity', 'He has a proclivity for taking risks.', '9'],
    ['proliferate', 'v.', 'to increase rapidly', 'rapidly proliferate / proliferate across', 'New technologies proliferated across the sector.', '9'],
    ['reciprocal', 'adj.', 'mutual and corresponding', 'a reciprocal relationship / reciprocal benefits', 'The two nations signed a reciprocal agreement.', '9'],
    ['reconcile', 'v.', 'to make compatible', 'reconcile with / reconcile differences', 'It is hard to reconcile the two claims.', '9'],
    ['refute', 'v.', 'to prove wrong', 'refute a claim / firmly refute', 'The author successfully refutes the theory.', '9'],
    ['relegate', 'v.', 'to lower in importance', 'relegate to / be relegated to', 'The issue was relegated to a footnote.', '9'],
    ['replenish', 'v.', 'to fill up again', 'replenish supplies / replenish the stock', 'The rains replenished the reservoirs.', '9'],
    ['repudiate', 'v.', 'to reject firmly', 'repudiate a claim / repudiate a debt', 'The government repudiated the agreement.', '9'],
    ['resonance', 'n.', 'the quality of evoking memories', 'deep resonance / emotional resonance', 'The speech had a powerful emotional resonance.', '9'],
    ['sedentary', 'adj.', 'involving much sitting', 'a sedentary lifestyle / sedentary habits', 'A sedentary lifestyle increases health risks.', '9'],
    ['sovereign', 'adj./n.', 'having supreme power', 'sovereign state / sovereign authority', 'Each nation is a sovereign state.', '9'],
    ['stringent', 'adj.', 'strict and demanding', 'stringent regulation / stringent standards', 'The country introduced stringent emissions rules.', '9'],
    ['subjective', 'adj.', 'based on personal feelings', 'a subjective judgment / inherently subjective', 'Taste is inherently subjective.', '9'],
    ['synthesise', 'v.', 'to combine into a coherent whole', 'synthesise findings / synthesise information', 'The review synthesises findings from many studies.', '9'],
    ['tangential', 'adj.', 'only slightly related', 'tangential to / a tangential point', 'The remark was merely tangential to the issue.', '9'],
    ['tacit', 'adj.', 'understood without being said', 'tacit approval / tacit agreement', 'There was tacit agreement on the matter.', '9'],
    ['ubiquitous', 'adj.', 'present everywhere', 'ubiquitous technology / virtually ubiquitous', 'Smartphones are now ubiquitous.', '9'],
    ['unambiguous', 'adj.', 'clear and not open to doubt', 'an unambiguous result / unambiguous evidence', 'The results were unambiguous.', '9'],
    ['underscore', 'v.', 'to emphasise', 'underscore the importance / further underscore', 'The data underscores the need for action.', '9'],
    ['unprecedented', 'adj.', 'never done or known before', 'an unprecedented achievement / unprecedented levels', 'The growth was unprecedented in scale.', '9'],
    ['viability', 'n.', 'the ability to work successfully', 'commercial viability / long-term viability', 'The viability of the project was questioned.', '9'],
    ['vigilant', 'adj.', 'staying alert to danger', 'remain vigilant / vigilant monitoring', 'Staff must remain vigilant against fraud.', '9'],
    ['volatile', 'adj.', 'liable to change rapidly', 'a volatile market / volatile conditions', 'The political situation remains volatile.', '9']
  ];

  const state = { view: 'home', qi: 0, answers: {}, score: 0, done: false, flip: false, current: 0, set: 'daily', mode: 'flash' };

  function cache() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) return null;
    let c = window.IELTS_AUTH.getScoped('awl', null);
    if (!c) {
      c = { mastered: {}, attempts: {}, lastReviewed: {}, dailyDone: {}, srs: {} };
      window.IELTS_AUTH.setScoped('awl', c);
    } else if (!c.srs) {
      c.srs = {};
      save(c);
    }
    return window.IELTS_AUTH.getScoped('awl', null);
  }
  function save(c) { window.IELTS_AUTH.setScoped('awl', c); }

  if (window.IELTS_AUTH && window.IELTS_AUTH.onUserChange) window.IELTS_AUTH.onUserChange(() => { state.view = 'home'; });

  function bandOf(word) { return parseFloat(word[5]) || 7; }
  function wordList(sortBy) {
    if (sortBy === 'mastered') return AWL_WORDS.filter((w) => cache().mastered[w[0]]);
    if (sortBy === 'learning') return AWL_WORDS.filter((w) => !cache().mastered[w[0]]);
    return AWL_WORDS;
  }

  /* Spaced repetition (SM-2 style): due words = never scheduled,
     overdue, or recently failed (hard) words. */
  function sched(c, word, known) {
    const s = c.srs[word] || (c.srs[word] = { ease: 2.5, interval: 0, reps: 0, due: 0 });
    if (known) {
      s.reps = (s.reps || 0) + 1;
      s.interval = s.reps === 1 ? 1 : s.reps === 2 ? 3 : Math.round(((s.interval || 1) * (s.ease || 2.5)));
      s.ease = Math.min(2.8, (s.ease || 2.5) + 0.1);
      s.due = Date.now() + s.interval * 86400000;
    } else {
      s.reps = 0;
      s.interval = 0;
      s.ease = Math.max(1.3, (s.ease || 2.5) - 0.2);
      s.due = Date.now();
    }
    return s;
  }

  function dueWords(limit) {
    const c = cache();
    const now = Date.now();
    const base = AWL_WORDS.filter((w) => {
      const s = c.srs && c.srs[w[0]];
      if (!s) return true;
      return s.due <= now;
    });
    base.sort((a, b) => {
      const sa = (c.srs && c.srs[a[0]]) || { due: 0 };
      const sb = (c.srs && c.srs[b[0]]) || { due: 0 };
      const hard = (s) => (s.reps === 0 && s.interval === 0 && s.due <= now ? -86400000 : 0);
      return (sa.due + hard(sa)) - (sb.due + hard(sb));
    });
    if (base.length === 0) return AWL_WORDS.slice(0, limit);
    return base.slice(0, limit || 10);
  }

  function dueCount() {
    const c = cache();
    const now = Date.now();
    return AWL_WORDS.filter((w) => {
      const s = c.srs && c.srs[w[0]];
      if (!s) return true;
      return s.due <= now;
    }).length;
  }

  function startFlash(mode) {
    state.mode = mode || 'flash';
    const list = mode === 'mastered' ? wordList('mastered') : dueWords(10);
    if (list.length === 0) { window.toast && window.toast('No words in this set yet'); return; }
    state.set = list.map((w) => w[0]);
    state.current = 0;
    state.flip = false;
    state.view = 'flash';
    render();
  }

  function flip() { state.flip = !state.flip; render(); }

  function markWord(known) {
    const c = cache();
    const word = AWL_WORDS.find((w) => w[0] === state.set[state.current]);
    if (word) {
      c.lastReviewed[word[0]] = Date.now();
      sched(c, word[0], known);
      if (known) {
        c.mastered[word[0]] = true;
        window.toast && window.toast('✓ ' + word[0] + ' mastered · next review in ' + c.srs[word[0]].interval + 'd');
      } else {
        c.attempts[word[0]] = (c.attempts[word[0]] || 0) + 1;
      }
      save(c);
      if (window.IELTS_AUTH) {
        window.IELTS_AUTH.completeClaim('awl-' + word[0] + (known ? '-known' : '-again'));
        if (known) window.IELTS_AUTH.addXp(2);
      }
      if (known && window.IELTS_BAND && window.IELTS_BAND.recordMastery) {
        const mc = cache();
        const masteredCount = Object.keys(mc.mastered || {}).length;
        window.IELTS_BAND.recordMastery('vocabulary', Math.min(100, Math.round((masteredCount / AWL_WORDS.length) * 100)));
      }
    }
    state.current++;
    state.flip = false;
    if (state.current >= state.set.length) { state.view = 'home'; render(); return; }
    render();
  }

  function nextCard(delta) {
    state.current = Math.max(0, Math.min(state.set.length - 1, state.current + delta));
    state.flip = false;
    render();
  }

  function startQuiz() {
    state.view = 'quiz';
    state.qi = 0;
    state.answers = {};
    state.score = 0;
    state.done = false;
    const shuffled = AWL_WORDS.slice().sort(() => Math.random() - 0.5).slice(0, 10);
    state.quizList = shuffled.map((q) => {
      const distractors = AWL_WORDS.filter((w) => w[0] !== q[0]).slice(0, 3).map((w) => w[2]);
      const pool = [q[2]].concat(distractors).sort(() => Math.random() - 0.5);
      return { word: q, opts: pool, correct: pool.indexOf(q[2]), answered: null };
    });
    render();
  }

  function quizAnswer(letter) {
    const q = state.quizList[state.qi];
    if (q) q.answered = letter;
    render();
  }

  function quizNext() {
    if (state.qi < state.quizList.length - 1) { state.qi++; render(); }
    else finishQuiz();
  }

  function finishQuiz() {
    let correct = 0;
    state.quizList.forEach((q) => {
      const letterIdx = q.answered ? q.answered.charCodeAt(0) - 65 : -1;
      if (letterIdx === q.correct) correct++;
    });
    state.score = correct;
    state.done = true;
    // resurface wrongly-answered words in spaced repetition
    const qc = cache();
    state.quizList.forEach((q) => {
      const letterIdx = q.answered ? q.answered.charCodeAt(0) - 65 : -1;
      if (letterIdx !== q.correct) sched(qc, q.word[0], false);
    });
    save(qc);
    const ql = state.quizList.length;
    const pct = Math.round((correct / ql) * 100);
    if (pct >= 60 && window.IELTS_AUTH && window.IELTS_AUTH.completeClaim('awl-quiz')) {
      window.IELTS_AUTH.addXp(15);
      window.IELTS_AUTH.addActivity('vocabulary', 'AWL vocabulary quiz (' + pct + '%)', 15);
    }
    if (window.IELTS_BAND && window.IELTS_BAND.recordMastery) {
      window.IELTS_BAND.recordMastery('vocabulary', pct);
    }
    if (window.IELTS_DIAG && window.IELTS_DIAG.record) {
      window.IELTS_DIAG.record('vocabulary', 'AWL Vocabulary Quiz', correct, state.quizList.length);
    }
    render();
  }

  function render() {
    const u = window.IELTS_AUTH.getCurrentUser();
    if (!u) { window.IELTS_AUTH.showScreen(); return; }
    if (state.view === 'flash') { renderFlash(); return; }
    if (state.view === 'quiz') { renderQuiz(); return; }
    renderHome();
  }

  function renderHome() {
    const c = cache();
    const mastered = Object.keys(c.mastered || {}).length;
    const total = AWL_WORDS.length;
    const pct = Math.round((mastered / total) * 100);

    $('#awl-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6 mb-6">
        <h2 class="text-2xl font-extrabold text-[#f5f0e6]">📚 AWL & Collocation Engine</h2>
        <p class="text-sm text-[#f5f0e6]/60 mt-1">${total}+ academic words (Band 7-9) with collocations, context & spaced repetition.</p>
        <div class="mt-4 flex items-center gap-3">
          <div class="flex-1 h-3 bg-[rgba(20,18,15,0.85)] border border-[rgba(212,175,55,0.2)] rounded-full overflow-hidden">
            <div class="h-full rounded-full transition-all" style="width:${pct}%;background:linear-gradient(90deg,#d4af37,#fff)"></div>
          </div>
          <span class="text-xs font-bold text-[#f5f0e6]/70">${mastered}/${total} mastered</span>
        </div>
      </div>

      <div class="grid md:grid-cols-2 gap-4 mb-6">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5">
          <p class="text-3xl mb-2">🔁</p>
          <h3 class="font-bold text-[#f5f0e6] mb-1">Spaced-Repetition Flashcards</h3>
          <p class="text-xs text-[#f5f0e6]/60 mb-4">Deep learning with word, collocation, context & band tag. <span class="text-[#d4af37] font-bold">${dueCount()} due now</span>.</p>
          <button class="btn-primary text-sm" onclick="IELTS_AWL.startFlash()">Start Daily Set</button>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5">
          <p class="text-3xl mb-2">📝</p>
          <h3 class="font-bold text-[#f5f0e6] mb-1">Vocabulary Quiz</h3>
          <p class="text-xs text-[#f5f0e6]/60 mb-4">Test your understanding of definitions & collocations.</p>
          <button class="btn-primary text-sm" onclick="IELTS_AWL.startQuiz()">Start Quiz</button>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5">
          <p class="text-3xl mb-2">✅</p>
          <h3 class="font-bold text-[#f5f0e6] mb-1">Mastered Words</h3>
          <p class="text-xs text-[#f5f0e6]/60 mb-4">Review words you\'ve already mastered.</p>
          <button class="btn-secondary text-sm" onclick="IELTS_AWL.startFlash('mastered')">Review Mastered</button>
        </div>
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-xl p-5">
          <p class="text-3xl mb-2">📇</p>
          <h3 class="font-bold text-[#f5f0e6] mb-1">Browse by Band</h3>
          <p class="text-xs text-[#f5f0e6]/60 mb-4">Explore words grouped by target band.</p>
          <div class="flex gap-2">
            <button class="tab-pill" onclick="IELTS_AWL.browseBand('7')">7</button>
            <button class="tab-pill" onclick="IELTS_AWL.browseBand('7.5')">7.5</button>
            <button class="tab-pill" onclick="IELTS_AWL.browseBand('8')">8</button>
            <button class="tab-pill" onclick="IELTS_AWL.browseBand('9')">9</button>
          </div>
        </div>
      </div>

      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-2xl p-6">
        <h3 class="text-lg font-bold text-[#f5f0e6] mb-4">📖 Full Word Bank (${total})</h3>
        <div class="grid md:grid-cols-2 gap-3 max-h-96 overflow-y-auto pr-2">
          ${AWL_WORDS.slice(0, 60).map((w) => `
            <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border ${c.mastered[w[0]] ? 'border-[rgba(212,175,55,0.4)]' : 'border-[rgba(212,175,55,0.1)]'} rounded-lg p-3">
              <div class="flex items-center justify-between">
                <span class="font-bold text-[#f5f0e6]">${esc(w[0])} <span class="text-[10px] text-[#f5f0e6]/40">${esc(w[1])}</span></span>
                <span class="text-[10px] text-[#d4af37] font-bold border border-[rgba(212,175,55,0.3)] px-1.5 py-0.5 rounded">B${esc(w[5])}</span>
              </div>
              <p class="text-xs text-[#f5f0e6]/60 mt-1 italic">${esc(w[3])}</p>
              <p class="text-[11px] text-[#f5f0e6]/50 mt-1">${esc(w[4])}</p>
            </div>`).join('')}
        </div>
      </div>`;
  }

  function renderFlash() {
    const word = AWL_WORDS.find((w) => w[0] === state.set[state.current]);
    if (!word) { state.view = 'home'; render(); return; }
    $('#awl-content').innerHTML = `
      <div class="max-w-lg mx-auto">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
          <div class="flex items-center justify-between mb-4">
            <span class="text-xs text-[#f5f0e6]/50">Card ${state.current + 1} / ${state.set.length}</span>
            <span class="text-[10px] text-[#d4af37] font-bold border border-[rgba(212,175,55,0.3)] px-2 py-0.5 rounded">Band ${esc(word[5])}</span>
          </div>
          <button class="w-full bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.15)] rounded-xl p-8 min-h-48" onclick="IELTS_AWL.flip()">
            ${state.flip ? `
              <p class="text-lg font-extrabold text-[#f5f0e6] mb-3">${esc(word[0])} <span class="text-xs text-[#f5f0e6]/40 ml-1">${esc(word[1])}</span></p>
              <p class="text-sm text-[#f5f0e6]/80 mb-3">${esc(word[2])}</p>
              <p class="text-xs text-[#d4af37] italic mb-2">Collocation: ${esc(word[3])}</p>
              <p class="text-xs text-[#f5f0e6]/60 leading-relaxed">"${esc(word[4])}"</p>
            ` : `
              <p class="text-3xl font-extrabold text-[#f5f0e6]">${esc(word[0])}</p>
              <p class="text-xs text-[#f5f0e6]/50 mt-3">Tap to reveal definition & collocation</p>
            `}
          </button>
          <div class="flex gap-3 mt-5">
            <button class="btn-secondary text-sm flex-1" onclick="IELTS_AWL.mark(false)">🔁 Again</button>
            <button class="btn-primary text-sm flex-1" onclick="IELTS_AWL.mark(true)">✓ Got it</button>
          </div>
        </div>
        <div class="flex justify-between mt-4">
          <button class="btn-secondary text-sm" onclick="IELTS_AWL.next(-1)">← Prev</button>
          <button class="btn-secondary text-sm" onclick="IELTS_AWL.next(1)">Next →</button>
        </div>
        <button class="btn-secondary text-sm w-full mt-3" onclick="IELTS_AWL.goHome()">← Back to Engine</button>
      </div>`;
  }

  function renderQuiz() {
    if (state.done) {
      const pct = Math.round((state.score / state.quizList.length) * 100);
      return (function () {
        $('#awl-content').innerHTML = `
          <div class="max-w-lg mx-auto bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-8 text-center">
            <p class="text-5xl font-extrabold ${pct >= 80 ? 'text-[#d4af37]' : 'text-[#f5f0e6]/70'}">${pct}%</p>
            <p class="text-[#f5f0e6]/70 mt-2">${state.score} / ${state.quizList.length} correct</p>
            <p class="text-sm mt-1 ${pct >= 60 ? 'text-emerald-400' : 'text-[#f5f0e6]/60'}">${pct >= 80 ? 'Excellent vocabulary mastery!' : pct >= 60 ? 'Good — review the words below.' : 'Keep practising.'}</p>
            ${pct >= 60 ? '<p class="text-xs text-[#d4af37] mt-3">+15 XP earned</p>' : ''}
            <button class="btn-primary text-sm mt-6" onclick="IELTS_AWL.goHome()">← Back to Engine</button>
            <button class="btn-secondary text-sm mt-3" onclick="IELTS_AWL.startQuiz()">🔁 Retry</button>
          </div>`;
      })();
    }
    const entry = state.quizList[state.qi];
    if (!entry) { state.done = true; render(); return; }
    const q = entry.word;
    const sel = entry.answered;
    $('#awl-content').innerHTML = `
      <div class="max-w-lg mx-auto">
        <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
          <p class="text-xs text-[#f5f0e6]/50 mb-4">Question ${state.qi + 1} / ${state.quizList.length}</p>
          <p class="text-2xl font-extrabold text-[#f5f0e6] mb-3">${esc(q[0])} <span class="text-xs text-[#f5f0e6]/40">${esc(q[1])}</span></p>
          <p class="text-sm text-[#f5f0e6]/60 mb-4">Which is the correct definition?</p>
          <div class="space-y-2">
            ${entry.opts.map((o, i) => {
              const letter = String.fromCharCode(65 + i);
              return `<button type="button" class="text-left w-full bg-[rgba(20,18,15,0.85)] backdrop-blur-md border ${sel === letter ? 'border-[#d4af37]' : 'border-[rgba(212,175,55,0.15)] hover:border-[rgba(212,175,55,0.4)]'} rounded-lg px-4 py-3 transition-all flex items-center gap-3" onclick="IELTS_AWL.answer('${letter}')">
                <span class="inline-block w-5 text-[#f5f0e6]/40 font-semibold">${letter}</span>
                <span class="text-sm text-[#f5f0e6]">${esc(o)}</span>
              </button>`;
            }).join('')}
          </div>
          <button class="btn-primary text-sm w-full mt-5" onclick="IELTS_AWL.qnext()">${state.qi === state.quizList.length - 1 ? 'Finish' : 'Next →'}</button>
        </div>
      </div>`;
  }

  function goHome() { state.view = 'home'; render(); }

  function browseBand(b) {
    const words = AWL_WORDS.filter((w) => w[5] === b);
    const c = cache();
    state.view = 'browse';
    $('#awl-content').innerHTML = `
      <div class="bg-[rgba(15,23,42,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.25)] rounded-2xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-[#f5f0e6]">Band ${esc(b)} Words (${words.length})</h3>
          <button class="btn-secondary text-sm" onclick="IELTS_AWL.goHome()">← Back</button>
        </div>
        <div class="grid md:grid-cols-2 gap-3">
          ${words.map((w) => `
            <div class="bg-[rgba(20,18,15,0.85)] backdrop-blur-md border border-[rgba(212,175,55,0.1)] rounded-lg p-3">
              <span class="font-bold text-[#f5f0e6]">${esc(w[0])} <span class="text-[10px] text-[#f5f0e6]/40">${esc(w[1])}</span></span>
              <p class="text-xs text-[#f5f0e6]/60 mt-1">${esc(w[2])}</p>
              <p class="text-[11px] text-[#d4af37] italic mt-1">${esc(w[3])}</p>
            </div>`).join('')}
        </div>
      </div>`;
  }

  window.IELTS_AWL = {
    render, startFlash, flip, mark: markWord, next: nextCard, goHome,
    startQuiz, answer: quizAnswer, qnext: quizNext, browseBand
  };
})();
