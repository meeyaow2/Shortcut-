import type { Citation } from "@/types";
import { VERIFIED, cite } from "./citations";
import { moreGuides } from "./practice-more";

/**
 * UX Practice: practical guides for doing the work.
 *
 * The guides are Shortcut editorial, written to be usable the day before a
 * session. Where a step rests on established research practice, the source is
 * in `references`, checked on VERIFIED. Mentor notes are craft advice and are
 * shown as such. Nothing here is a universal rule; where practice varies, the
 * guide says so.
 */

const nng = (label: string, slug: string, datePublished: string): Citation => ({
  sourceId: "nng",
  label: `NN/g, ${label}`,
  url: `https://www.nngroup.com/articles/${slug}/`,
  datePublished,
  dateVerified: VERIFIED,
});

const govuk = (label: string, slug: string, datePublished: string): Citation => ({
  sourceId: "govuk",
  label: `GOV.UK Service Manual, ${label}`,
  url: `https://www.gov.uk/service-manual/user-research/${slug}`,
  datePublished,
  dateVerified: VERIFIED,
});

const ref = {
  interviews: nng("User Interviews 101", "user-interviews", "2023-09-17"),
  usability101: nng("Usability (User) Testing 101", "usability-testing-101", "2019-12-01"),
  taskScenarios: nng("Turn User Goals into Task Scenarios for Usability Testing", "task-scenarios-usability-testing", "2014-01-12"),
  severity: nng("Severity Ratings for Usability Problems", "how-to-rate-the-severity-of-usability-problems", "1994-11-01"),
  affinity: nng("Affinity Diagramming", "affinity-diagram", "2024-04-26"),
  hmw: nng("Using \"How Might We\" Questions to Ideate on the Right Problems", "how-might-we-questions", "2021-01-17"),
  critique: nng("Design Critiques: Encourage a Positive Culture to Improve Products", "design-critiques", "2016-10-23"),
  stakeholders: nng("Stakeholder Interviews 101", "stakeholder-interviews", "2022-10-23"),
  discovery: nng("Discovery: Definition", "discovery-phase", "2020-03-15"),
  moderated: govuk("Using moderated usability testing", "using-moderated-usability-testing", "2017-10-03"),
  consent: govuk("Getting informed consent for user research", "getting-users-consent-for-research", "2018-11-05"),
  analyse: govuk("Analyse a research session", "analyse-a-research-session", "2016-05-24"),
};

export interface PracticeGuide {
  id: string;
  title: string;
  /** Short label for quick actions, e.g. "Run an interview". */
  action: string;
  overview: string;
  facts?: { label: string; value: string }[];
  useWhen: string[];
  dontUseWhen: string[];
  prepare: string[];
  steps: { title: string; detail: string }[];
  agenda?: { time: string; activity: string }[];
  /** Heading for the agenda, when the guide has one of its own. */
  agendaTitle?: string;
  script?: string[];
  examples?: { heading: string; pairs: { weak: string; better: string; why: string }[] };
  /** Extra reference blocks specific to the guide, e.g. what to capture. */
  extras?: { title: string; items: string[] }[];
  dos: string[];
  donts: string[];
  mistakes: string[];
  after: string[];
  checklist: string[];
  mentorNote: string;
  templateIds: string[];
  ai: { canHelp: string[]; shouldNot: string[]; link: { label: string; href: string } };
  references: Citation[];
  related: string[];
}

export const practiceGuides: PracticeGuide[] = [
  {
    id: "user-interview",
    title: "How to run a user interview",
    action: "Run an interview",
    overview: "A conversation to learn what people do, need and struggle with. It tells you what people report, not what they would do with a design: for that, run a usability test.",
    facts: [
      { label: "Time", value: "30 to 60 minutes each" },
      { label: "People", value: "One participant, one interviewer, ideally one note-taker" },
    ],
    useWhen: ["You need to understand a problem, a context or a current way of working.", "You are early, and do not yet know what to build.", "You want the reasons behind behaviour you have seen in data."],
    dontUseWhen: ["You want to know whether people can use a design. Test it instead.", "You want numbers. Interviews give reasons, not proportions.", "You are looking for approval of a solution you have already chosen."],
    prepare: [
      "Write the research objective: the decision this should inform.",
      "List what you need to learn. These are research questions, not interview questions.",
      "Recruit people who actually have the experience you are asking about.",
      "Write a discussion guide of open questions, grouped by topic.",
      "Pilot the guide on a colleague and fix what falls flat.",
      "Prepare consent and privacy information, and recording if you will record.",
      "Decide who interviews and who takes notes.",
    ],
    steps: [
      { title: "Open", detail: "Introduce yourself and the purpose. Say there are no right or wrong answers, and that you are learning about the problem, not judging them. Confirm consent and recording." },
      { title: "Warm up", detail: "Start with easy questions about their role or day. People talk more once they feel at ease." },
      { title: "Ask about real events", detail: "\"Tell me about the last time you…\" A specific occasion is remembered better than a general process." },
      { title: "Follow up", detail: "\"Tell me more about that.\" \"What happened next?\" Ask why carefully: it can sound like a challenge." },
      { title: "Leave silence", detail: "Do not fill every pause. People often say the most useful thing after one." },
      { title: "Close", detail: "Ask if there is anything you should have asked. Thank them, and say what happens next." },
    ],
    examples: {
      heading: "Questions",
      pairs: [
        { weak: "Do you think this dashboard is useful?", better: "Walk me through how you currently check this information.", why: "The first invites a polite yes. The second gets real behaviour." },
        { weak: "Would you use this feature?", better: "Tell me about the last time you needed to do this.", why: "People cannot predict their own future behaviour reliably." },
        { weak: "Was that frustrating?", better: "How did that go?", why: "The first puts a feeling in their mouth." },
        { weak: "Do you check it daily and weekly?", better: "How often do you check it?", why: "Two questions in one gets half an answer." },
      ],
    },
    dos: ["Ask about real past behaviour", "Ask open questions", "Probe for examples", "Let participants think", "Follow unexpected insights", "Keep your research objective visible"],
    donts: ["Sell the idea", "Ask \"Would you use this?\"", "Lead people toward your preferred answer", "Correct the participant", "Defend or explain the design", "Treat one quote as proof"],
    mistakes: ["Using research questions as interview questions.", "Sticking to the guide when the participant has just said something more interesting.", "Talking more than the participant.", "Only one person in the room, trying to listen and take notes."],
    after: ["Debrief with the note-taker straight away, while it is fresh.", "Write down observations separately from what you think they mean.", "Note open questions for the next session.", "Do not turn one participant's comment into a finding."],
    checklist: ["Objective written down", "Participants match the experience you need", "Guide piloted", "Consent information ready", "Recording tested", "Note-taker briefed", "Time for a debrief booked after each session"],
    mentorNote: "Research questions and interview questions are not the same thing.",
    templateIds: ["research-plan", "interview-guide", "consent-checklist", "session-notes"],
    ai: {
      canHelp: ["Draft a discussion guide from your research questions", "Flag leading or double-barrelled questions", "Organise notes afterwards", "Suggest follow-up questions to prepare"],
      shouldNot: ["Invent what participants said or felt", "Replace recruiting real participants", "Decide your findings without you checking the source"],
      link: { label: "Pressure-test a research plan", href: "/ai/prompts#research-plan" },
    },
    references: [ref.interviews, ref.consent, cite.nngMethods],
    related: ["usability-test", "synthesis", "discovery"],
  },
  {
    id: "usability-test",
    title: "How to run a usability test",
    action: "Plan usability testing",
    overview: "Watch people try to do realistic tasks with your design. You learn where it fails, which is something no amount of asking will tell you.",
    facts: [
      { label: "Time", value: "30 to 60 minutes each" },
      { label: "People", value: "Often around five per user group for a qualitative round" },
    ],
    useWhen: ["You have something people can try: a prototype or a live product.", "You want to find problems before building, or before a release.", "You need to choose between two designs on evidence."],
    dontUseWhen: ["You do not know what problem you are solving yet. Interview first.", "The prototype cannot support the tasks. Fix it or narrow the test.", "You want preference or opinion. A test measures whether people can do it."],
    prepare: [
      "Decide what you are testing, and what you are not.",
      "Write tasks as realistic goals, with a success criterion for each.",
      "Choose prototype fidelity to match the question.",
      "Prepare backup paths for where the prototype is unfinished.",
      "Write an introduction script.",
      "Run a pilot with a colleague and fix the tasks and the prototype.",
    ],
    steps: [
      { title: "Introduce", detail: "Say who you are and that you are testing the design, not them. Confirm consent and recording." },
      { title: "Ask them to think aloud", detail: "\"Tell me what you are thinking as you go.\" Show them briefly what you mean." },
      { title: "Give one task at a time", detail: "Read it out, hand it over in writing, and then stay quiet." },
      { title: "Watch, do not help", detail: "Note hesitation and backtracking. Do not confirm whether they are right." },
      { title: "Prompt neutrally", detail: "\"What makes you say that?\" \"What would you expect to happen?\"" },
      { title: "Close", detail: "Ask what stood out, thank them, and store any personal data securely." },
    ],
    examples: {
      heading: "Task wording",
      pairs: [
        { weak: "Click Settings and change your email.", better: "You recently changed your email address. Show me how you would update it here.", why: "The first names the button, so it tests whether they can follow instructions." },
        { weak: "Tell me where you would click next.", better: "Find a film you would like to see on Sunday afternoon.", why: "Ask people to do the thing, not to describe how they would." },
        { weak: "Go to the site, sign in and find your transcript.", better: "Look up the results of your midterm exams.", why: "Steps contain hidden clues about how the interface works." },
      ],
    },
    extras: [
      { title: "What to capture per task", items: ["Success, partial success or failure", "Hesitation and backtracking", "Misinterpretation", "Quotes, word for word", "Observations of what happened", "Whether a problem was the design or the prototype's limits"] },
      {
        title: "Rating severity",
        items: [
          "Consider how often it happens, how hard it is to get past, and whether it keeps happening.",
          "A long-standing scale runs from 0 (not a problem) through 1 cosmetic, 2 minor and 3 major, to 4 (must fix before release).",
          "One person's rating is unreliable. Rate with at least two others and compare.",
        ],
      },
    ],
    dos: ["Write tasks as goals", "Stay quiet and watch", "Ask them to think aloud", "Note what happened before what it means", "Pilot the session"],
    donts: ["Guide the participant", "Say \"yes, that's right\"", "Explain the interface unless the session is stuck", "Defend the design", "Blame the participant for a failure"],
    mistakes: ["Tasks that name the button to press.", "A prototype that breaks off the main path, so every failure is ambiguous.", "Testing with colleagues who already know the product.", "Reporting every observation at the same weight."],
    after: ["Cluster observations across participants.", "Separate recurring patterns from one-off incidents.", "Rate severity as a group.", "Write recommendations someone can act on."],
    checklist: ["Tasks written as goals, each with a success criterion", "Prototype tested end to end", "Backup paths ready", "Introduction script printed", "Recording and consent ready", "Observers briefed to stay silent", "Note-taking sheet per task"],
    mentorNote: "If your usability task tells participants where to click, you are testing their ability to follow instructions.",
    templateIds: ["usability-script", "consent-checklist", "session-notes", "finding-card"],
    ai: {
      canHelp: ["Check task wording for hidden clues", "Draft the introduction script", "Group observations after the sessions", "List edge cases to cover in tasks"],
      shouldNot: ["Stand in for participants", "Predict test results", "Rate severity for you"],
      link: { label: "Find the edge cases in a flow", href: "/ai/prompts#flow-edge-cases" },
    },
    references: [ref.usability101, ref.taskScenarios, ref.moderated, ref.severity, cite.nngFiveUsers],
    related: ["user-interview", "synthesis", "design-critique"],
  },
  {
    id: "workshop",
    title: "How to facilitate a workshop",
    action: "Host a workshop",
    overview: "A workshop is a structured session where a group produces something together: a decision, a shared map, a prioritised list. If nothing needs producing together, hold a meeting or send a document.",
    facts: [
      { label: "Group size", value: "Often 5 to 8. Fewer voices get lost above that." },
      { label: "Time", value: "60 to 90 minutes for one clear goal" },
      { label: "Who", value: "Product, design, engineering, domain experts, and the person who can decide" },
    ],
    useWhen: ["Several people hold pieces of the answer.", "You need alignment, and people need to see how it was reached.", "A decision keeps being reopened because not everyone was there."],
    dontUseWhen: ["One person could decide, or a document could inform.", "The decision-maker cannot attend.", "You have no goal beyond \"getting everyone together\"."],
    prepare: [
      "Write the goal as an output: \"We leave with three prioritised problems.\"",
      "Decide how decisions will be made, and tell people.",
      "Invite only people who will contribute or must decide.",
      "Send a short pre-read so the session is not spent on context.",
      "Plan each activity with a purpose and a time.",
      "Prepare the board or the room, and test the tools.",
      "Agree who facilitates and who takes notes. The facilitator should not also be arguing a position.",
    ],
    steps: [
      { title: "Open", detail: "State the goal, the agenda and how decisions will be made. Set up a visible parking lot." },
      { title: "Share what is known", detail: "Briefly. The pre-read did most of this." },
      { title: "Work alone first", detail: "Give people silent time to write before discussing, so the loudest voice does not set the answers." },
      { title: "Cluster and discuss", detail: "Group what was written. Name the groups together." },
      { title: "Converge", detail: "Vote or rank. Say clearly that this is now deciding, not brainstorming." },
      { title: "Close", detail: "Read back the decisions. Give every next step an owner and a date." },
    ],
    agenda: [
      { time: "5 min", activity: "Context and goals" },
      { time: "10 min", activity: "What we know" },
      { time: "15 min", activity: "User problems" },
      { time: "15 min", activity: "Business and technical constraints" },
      { time: "15 min", activity: "How Might We questions" },
      { time: "15 min", activity: "Prioritisation" },
      { time: "5 min", activity: "Next steps and owners" },
    ],
    script: [
      "\"By the end of this session we will have… That is the only thing we need to leave with.\"",
      "\"We'll decide by… If we disagree, [name] makes the call.\"",
      "\"Take five minutes to write on your own before we talk.\"",
      "\"That's important and not for today. I'm putting it in the parking lot.\"",
      "\"We haven't heard from [name] yet. What's your view?\"",
      "\"We have two views here. I'll write both down; we don't need to settle it now.\"",
      "\"Let me read back what we decided, and who is doing what.\"",
    ],
    extras: [
      { title: "Remote version", items: ["Use one shared board everyone has opened before the session.", "Shorter blocks and more breaks than in person.", "Cameras help but are not a test of attention.", "Have a second person watch the chat and the board while you facilitate."] },
      { title: "In-person version", items: ["Wall space, sticky notes and one colour of marker per activity.", "Photograph every wall before anyone leaves.", "Arrange seating so no one sits at the head.", "Stand people up to cluster notes; it changes the energy."] },
      { title: "Writing How Might We questions", items: ["Start from a problem or insight you actually found.", "Do not smuggle a solution into the question.", "Keep it broad enough to allow several answers.", "Aim at the outcome you want, phrased positively."] },
    ],
    dos: ["State the goal clearly", "Explain how decisions will be made", "Timebox activities", "Keep a visible parking lot", "Summarise decisions", "Make next steps explicit", "Create space for quieter participants"],
    donts: ["Invite too many people", "Run activities without explaining the purpose", "Let one person dominate", "Confuse brainstorming with decision-making", "End without owners or next steps", "Run a workshop when a normal meeting would be enough"],
    mistakes: ["No decision-maker in the room, so everything is revisited later.", "Forcing consensus where there is real disagreement.", "Activities chosen because they are familiar, not because they produce the output.", "A beautiful board that nobody opens again."],
    after: ["Send decisions, owners and dates within a day.", "Tidy the board into something a non-attendee can read.", "Follow up on parking-lot items.", "Record the decision and why, so it is not reopened."],
    checklist: ["Goal written as an output", "Decision method agreed", "Right people invited, including the decider", "Pre-read sent", "Each activity has a purpose and a time", "Board or room prepared and tested", "Note-taker assigned", "Time held afterwards to write up"],
    mentorNote: "Not every problem needs a workshop.",
    templateIds: ["workshop-agenda", "critique-brief", "journey-map"],
    ai: {
      canHelp: ["Draft a first agenda from your goal", "Propose activities for a given output", "Turn notes into a structured summary", "List unresolved questions afterwards"],
      shouldNot: ["Read the room", "Make the decision", "Resolve a disagreement between stakeholders", "Set priorities"],
      link: { label: "Explain a design decision to stakeholders", href: "/ai/prompts#stakeholder-rationale" },
    },
    references: [ref.affinity, ref.hmw, ref.discovery],
    related: ["discovery", "synthesis", "design-critique"],
  },
  {
    id: "discovery",
    title: "How to run discovery",
    action: "Write a research plan",
    overview: "Discovery is the work of understanding a problem well enough to decide what to do next. Its job is to reduce uncertainty, not to produce deliverables.",
    facts: [
      { label: "Team", value: "Small and mixed. One source suggests 3 to 7 people." },
      { label: "Ends when", value: "You understand the problem, the outcomes to aim for, and where to focus" },
    ],
    useWhen: ["There are many unknowns stopping the team moving forward.", "You have been handed a solution and nobody can state the problem.", "The work is new territory for the organisation."],
    dontUseWhen: ["The problem is well understood and the risk is in execution.", "The decision has already been made and will not change."],
    prepare: ["List what you do not know, as questions.", "Find what research already exists.", "Identify stakeholders and what each knows.", "Agree what would count as enough to move on."],
    steps: [
      { title: "Frame the problem", detail: "Write it down, with who has it and how you know. Expect to rewrite it." },
      { title: "Interview stakeholders", detail: "Ask about goals, constraints, current process, known problems, risks, dependencies, earlier decisions and how they would measure success." },
      { title: "Review what exists", detail: "Past research, analytics, support tickets. Cheaper than new research and often overlooked." },
      { title: "Research with users", detail: "Interviews and observation to learn about the problem, not to test a solution." },
      { title: "Map the service or process", detail: "Including the parts users never see." },
      { title: "Look at alternatives", detail: "What people use today, including spreadsheets and workarounds." },
      { title: "List assumptions, risks and open questions", detail: "Rank them by how wrong you could be and how much it would matter." },
    ],
    examples: {
      heading: "Stakeholder questions",
      pairs: [
        { weak: "What features do you want?", better: "What would success look like a year from now?", why: "The first collects solutions. The second finds the goal behind them." },
        { weak: "Do you agree users need this?", better: "What do you hear from users about this?", why: "Ask what they know, not whether they agree with you." },
      ],
    },
    extras: [
      {
        title: "Sort what stakeholders say",
        items: ["Need: an outcome that matters.", "Constraint: something that cannot change.", "Assumption: something believed but not checked.", "Solution request: one way of meeting a need. Ask what need."],
      },
    ],
    dos: ["Start from what is unknown", "Reuse existing evidence", "Write assumptions down", "Share as you go", "Stop when you know enough to decide"],
    donts: ["Treat discovery as a list of deliverables", "Only talk to stakeholders", "Start designing the solution", "Hide uncomfortable findings"],
    mistakes: ["A discovery that confirms what the sponsor already believed.", "Polished personas and journey maps with no decision attached.", "No agreed end, so it runs until the budget does."],
    after: ["State the problem, the evidence and the recommended next step.", "Say what you still do not know.", "Hand over to whoever designs or builds next, in person."],
    checklist: ["Unknowns listed as questions", "Stakeholders identified", "Existing research reviewed", "Research plan written", "Assumptions ranked", "End condition agreed"],
    mentorNote: "Do not ask users to design the solution for you.",
    templateIds: ["research-plan", "stakeholder-interview", "journey-map"],
    ai: {
      canHelp: ["Find gaps and conflicts in a brief", "Organise background material", "List assumptions in a plan"],
      shouldNot: ["Describe your users from general knowledge", "Supply competitor facts you have not checked", "Decide what the problem is"],
      link: { label: "Find gaps in a requirements brief", href: "/ai/prompts#requirements-gaps" },
    },
    references: [ref.discovery, ref.stakeholders, cite.nngMethods],
    related: ["user-interview", "workshop", "synthesis"],
  },
  {
    id: "synthesis",
    title: "How to synthesise research and write findings",
    action: "Synthesise findings",
    overview: "Turning what you saw and heard into things a team can act on. The discipline is keeping three things apart: what happened, what you think it means, and what to do about it.",
    facts: [{ label: "Time", value: "One guide suggests an hour of analysis for every two hours of research" }],
    useWhen: ["You have finished a round of sessions.", "Notes are piling up across people.", "The team is jumping from quotes to solutions."],
    dontUseWhen: ["You have one session. Wait, or you will over-read it."],
    prepare: ["Gather notes from everyone who observed.", "One observation per note, written as what was seen or heard.", "Mark each note with its participant.", "Book the team: synthesis done alone carries one person's bias."],
    steps: [
      { title: "Write observations", detail: "Exactly what was seen or heard, not what it means. Verbatim quotes and observed behaviour." },
      { title: "Cluster", detail: "Move notes until groups emerge. Do not start from categories you already had." },
      { title: "Name each group", detail: "With a sentence that says what the notes share, not a one-word topic." },
      { title: "Write the finding", detail: "What the group of observations tells you. Check it against the notes behind it." },
      { title: "State confidence", detail: "How many participants, how consistent, and what would change your mind." },
      { title: "Draw the implication", detail: "What it means for the product, before any specific solution." },
      { title: "Recommend", detail: "Only now. Keep it separate so it can be argued with without disputing the finding." },
    ],
    examples: {
      heading: "Three different things",
      pairs: [
        { weak: "Users can't find export.", better: "Observation: 4 of 6 participants looked for export in the toolbar before opening Settings.", why: "A count and a behaviour can be checked. A verdict cannot." },
        { weak: "Move export to the toolbar.", better: "Interpretation: the export action may not be visible enough where people expect it.", why: "The interpretation leaves room for more than one fix." },
        { weak: "Export is confusing.", better: "Insight: people need export at the point where they finish reviewing data, not in a separate settings area.", why: "An insight says what people need and when." },
      ],
    },
    extras: [
      { title: "A useful finding has", items: ["What we observed", "Why it matters", "Evidence: who, how many, quotes", "Confidence", "Implication", "Recommendation, kept separate"] },
    ],
    dos: ["Keep observation and interpretation on separate notes", "Involve people who watched the sessions", "Keep small clusters: few notes can still matter", "Trace every finding back to notes", "Say how confident you are"],
    donts: ["Jump from a quote to a solution", "Sort into categories decided beforehand", "Count one vivid participant as a pattern", "Drop what contradicts the story"],
    mistakes: ["Findings that are really topics: \"Navigation\".", "A recommendation dressed as a finding.", "Reporting percentages from six people.", "A long report where the three things that matter are on page 14."],
    after: ["Share findings with the evidence attached.", "Store notes where the team can find them again.", "Check which decisions changed because of the research."],
    checklist: ["Every note has a participant ID", "Observations separated from interpretations", "Clusters named with a sentence", "Each finding traced to notes", "Confidence stated", "Recommendations listed separately", "Contradicting evidence included"],
    mentorNote: "Take notes on what happened, not only what you think it means.",
    templateIds: ["session-notes", "synthesis", "finding-card", "research-report", "research-readout"],
    ai: {
      canHelp: ["Propose candidate clusters from notes", "Pull exact quotes for a theme", "Draft a report structure", "Check a finding is not a disguised recommendation"],
      shouldNot: ["Invent sentiment or frequency", "Be trusted on quotes without checking the source", "Decide what matters"],
      link: { label: "Find candidate themes in interview notes", href: "/ai/prompts#synthesis-themes" },
    },
    references: [ref.analyse, ref.affinity, ref.severity],
    related: ["user-interview", "usability-test", "design-critique"],
  },
  {
    id: "design-critique",
    title: "How to run a design critique",
    action: "Run a critique",
    overview: "A critique analyses whether a design meets its objectives. It is not a review for approval, and it is not a vote on taste.",
    facts: [
      { label: "Time", value: "20 to 45 minutes for one piece of work" },
      { label: "Roles", value: "Presenter, facilitator, critiquers. Someone takes notes." },
    ],
    useWhen: ["You want feedback while the design can still change.", "You are stuck between options.", "The team needs a shared sense of quality."],
    dontUseWhen: ["You want sign-off. That is a review.", "The problem itself is not agreed. Settle that first.", "You are not prepared to change anything."],
    prepare: ["State the problem, the user and the context.", "Say what stage the design is at.", "Name the constraints.", "Decide what kind of feedback you need, and what is out of scope.", "Share the work beforehand if it is large."],
    steps: [
      { title: "Frame it", detail: "\"This is for [user] trying to [task]. It is an early layout. I'd like feedback on the hierarchy and whether the primary action is clear. Visual polish is out of scope.\"" },
      { title: "Present briefly", detail: "Show, do not defend. Long explanations pre-empt honest reactions." },
      { title: "Clarifying questions", detail: "Questions of understanding only, before any opinions." },
      { title: "Feedback", detail: "Tied to the goal. The facilitator keeps it in scope and makes sure everyone speaks." },
      { title: "Summarise", detail: "The presenter reads back what they heard and what they will look at. Nothing has to be agreed in the room." },
    ],
    examples: {
      heading: "Asking and giving",
      pairs: [
        { weak: "What do you think?", better: "I'd like feedback on the information hierarchy and whether the primary action is clear.", why: "A specific ask gets specific feedback." },
        { weak: "Yikes, that layout.", better: "I noticed the total sits below the fold. Someone checking the amount before paying may miss it.", why: "An observation and its impact can be acted on." },
        { weak: "Make the button blue.", better: "The primary action reads the same weight as Cancel. Have you tried reducing the secondary one?", why: "A command ends the discussion. A question keeps it open." },
      ],
    },
    extras: [{ title: "A format for feedback", items: ["Observation: what you noticed", "Impact: why it matters for the user or the goal", "Question: what you want to understand", "Suggestion: something to try, offered last"] }],
    dos: ["Agree the problem before judging the solution", "Be specific and tie feedback to the goal", "Explain why", "Ask before suggesting", "Thank people and take notes"],
    donts: ["Open with \"What do you think?\"", "Give directives", "Argue from personal taste", "Defend every point as it is made", "Redesign it in the room"],
    mistakes: ["No stated scope, so feedback lands on everything.", "The most senior person speaks first and everyone agrees.", "Critique only at the end, when nothing can change.", "Taking feedback as a list of orders."],
    after: ["Sort feedback: will act on, will consider, will not, with reasons.", "Tell people what you did with it.", "Bring the next iteration back."],
    checklist: ["Problem, user and context stated", "Stage of the design stated", "Feedback wanted, and what is out of scope", "Facilitator named", "Note-taker named", "Time limit set"],
    mentorNote: "Critique the work against its goal, not against your taste.",
    templateIds: ["critique-brief"],
    ai: {
      canHelp: ["Give a first-pass critique before the real one", "Type each finding by how much weight it carries", "Help you write the brief"],
      shouldNot: ["Replace colleagues who know the product and users", "Be quoted as an authority in the room"],
      link: { label: "AI design review", href: "/ai/review" },
    },
    references: [ref.critique],
    related: ["usability-test", "synthesis", "workshop"],
  },
  ...moreGuides,
];

export function getPracticeGuide(id: string): PracticeGuide | undefined {
  return practiceGuides.find((g) => g.id === id);
}

/** Topics from the brief that are not written yet. */
export const plannedGuides: string[] = [];

// --- Quick-reference cards -------------------------------------------------------

export const mentorNotes = [
  "Do not run a workshop simply because collaboration sounds good.",
  "Research questions and interview questions are not the same thing.",
  "Do not ask users to design the solution for you.",
  "Separate evidence from interpretation.",
  "More participants do not fix a badly designed study.",
  "A polished research deck cannot rescue weak research.",
  "Your workshop should end with a decision, an output or a next step.",
];

// --- Templates -------------------------------------------------------------------

export interface PracticeTemplate {
  id: string;
  title: string;
  purpose: string;
  howToUse: string;
  example: string;
  blank: string;
}

export const practiceTemplates: PracticeTemplate[] = [
  {
    id: "research-plan",
    title: "Research plan",
    purpose: "Agree what you are trying to learn, and why, before recruiting anyone.",
    howToUse: "Fill it in on one page and share it. If you cannot name the decision, you are not ready.",
    example: "Decision: whether to rebuild the claims form or fix the existing one.",
    blank: `RESEARCH PLAN

Decision this research informs:

What we already know (and how we know it):

Research questions (what we need to learn):
1.
2.
3.

Method, and why it fits these questions:

Participants (who, how many, how recruited):

What we will not cover:

Timeline:

Who is involved (interviewer, note-taker, observers):

How findings will be shared, and with whom:`,
  },
  {
    id: "interview-guide",
    title: "Interview guide",
    purpose: "Keep an interview on the research questions without scripting it.",
    howToUse: "Group questions by topic. Mark the three you must ask. Skip and reorder freely.",
    example: "Tell me about the last time you submitted an expense claim.",
    blank: `INTERVIEW GUIDE

Research objective (keep visible):

OPENING (3 min)
- Who I am, and why we are talking
- No right or wrong answers; we are learning about the problem, not judging you
- Consent, recording, and that you can stop at any time
- Any questions before we start?

WARM-UP (5 min)
- Tell me a bit about your role.
-

TOPIC 1:
- Tell me about the last time you...
- What happened next?
- What made that difficult?

TOPIC 2:
-
-

TOPIC 3:
-
-

CLOSING (3 min)
- Is there anything I should have asked?
- Thank you. Here is what happens next.

Probes to keep handy: "Tell me more about that." "Can you give me an example?" "What were you expecting?"`,
  },
  {
    id: "usability-script",
    title: "Usability test script",
    purpose: "Run every session the same way, so differences come from participants, not from you.",
    howToUse: "Read the introduction as written. Hand each task over in writing. Write success criteria before the first session.",
    example: "You recently changed your email address. Show me how you would update it here.",
    blank: `USABILITY TEST SCRIPT

What we are testing:
What we are not testing:

INTRODUCTION (read aloud)
"Thanks for joining. I'm [name]. We're testing [product], not you: there are no wrong answers, and nothing you do can break it. I didn't design this, so say what you really think. Please think aloud as you go. I may stay quiet so I don't influence you. Is it OK if I record? You can stop at any time."

TASK 1
Scenario (given to participant):
Success looks like:
Backup path if the prototype stops:

TASK 2
Scenario:
Success looks like:
Backup path:

TASK 3
Scenario:
Success looks like:
Backup path:

NEUTRAL PROMPTS
"What are you thinking?" "What would you expect to happen?" "What makes you say that?"

WRAP-UP
"What stood out to you?" "Anything you expected to see and didn't?"
Thank them. Explain what happens next.`,
  },
  {
    id: "consent-checklist",
    title: "Consent checklist",
    purpose: "Make sure participants understand and agree to the research before it starts.",
    howToUse: "Go through it before each session. Follow your organisation's own privacy and data rules; this is a memory aid, not legal advice.",
    example: "Recorded verbal consent at the start of a remote session, with the consent script kept alongside.",
    blank: `CONSENT CHECKLIST

The participant has been told:
[ ] Who is doing the research
[ ] The purpose of the research
[ ] What will happen during the session
[ ] What data is being collected
[ ] Whether the session is observed, and by whom
[ ] Whether and how it is recorded
[ ] How the data will be stored and used, and for how long
[ ] That taking part is voluntary
[ ] That they can stop or withdraw at any time

Consent has been:
[ ] Given in writing or recorded verbally
[ ] Stored with a record of what was agreed to

If they withdraw:
[ ] Stop, and delete the research data collected from them`,
  },
  {
    id: "session-notes",
    title: "Session notes",
    purpose: "Capture what happened in a way that can be sorted later.",
    howToUse: "One observation per line. Write what you saw or heard. Put your own interpretation in the last column, or leave it out.",
    example: "P3 | Task 2 | Scrolled past the Save button twice | \"Where do I finish?\" | May not look like a button",
    blank: `SESSION NOTES

Participant ID:        Date:        Note-taker:

Time | Task or topic | Observation (what happened) | Quote (word for word) | My interpretation (optional)
-----|---------------|-----------------------------|-----------------------|-----------------------------
     |               |                             |                       |
     |               |                             |                       |
     |               |                             |                       |

STRAIGHT AFTER THE SESSION
Three things that stood out:
1.
2.
3.

Surprises:

Open questions for the next session:`,
  },
  {
    id: "synthesis",
    title: "Research synthesis board",
    purpose: "A structure for sorting observations into findings with a team.",
    howToUse: "Set up the columns on a whiteboard. Use one colour per stage so observation, finding and action stay apart.",
    example: "Yellow: observations. Blue: findings. Pink: actions.",
    blank: `RESEARCH SYNTHESIS BOARD

1. OBSERVATIONS (one colour)
   One per note. What was seen or heard. Participant ID on each.

2. CLUSTERS
   Move notes until groups emerge. Do not start from fixed categories.

3. CLUSTER NAMES
   A sentence saying what the notes share.

4. FINDINGS (second colour)
   What each cluster tells us. Check against the notes behind it.

5. CONFIDENCE
   How many participants? How consistent? What contradicts it?

6. ACTIONS (third colour)
   Kept separate from findings.

UNSORTED
   Notes that fit nowhere. Read these again at the end.`,
  },
  {
    id: "finding-card",
    title: "Finding card",
    purpose: "Write one finding so that evidence, meaning and recommendation stay distinct.",
    howToUse: "One card per finding. If you cannot fill in Evidence, it is not a finding yet.",
    example: "What we observed: 4 of 6 participants looked for export in the toolbar before opening Settings.",
    blank: `FINDING

What we observed:

Why it matters:

Evidence (who, how many, quotes):

Confidence (high / medium / low, and why):

Implication for the product:

Recommendation (separate from the finding):

Severity, if a usability problem (rated by more than one person):`,
  },
  {
    id: "research-report",
    title: "Research report",
    purpose: "A written record someone can understand without having been there.",
    howToUse: "Lead with what matters most. Keep method and detail at the back.",
    example: "Summary first: three findings and what we recommend.",
    blank: `RESEARCH REPORT

1. SUMMARY
   The three to five things to know, and what we recommend.

2. WHAT WE SET OUT TO LEARN
   The decision, and the research questions.

3. WHAT WE DID
   Method, participants, dates. Limits of the study.

4. FINDINGS
   For each: observation, why it matters, evidence, confidence.

5. RECOMMENDATIONS
   Separate from findings. Who would act on each.

6. WHAT WE STILL DO NOT KNOW

APPENDIX
   Discussion guide, tasks, anonymised notes.`,
  },
  {
    id: "workshop-agenda",
    title: "Workshop agenda",
    purpose: "Plan a workshop around an output, with a purpose and a time for every activity.",
    howToUse: "Write the goal first. If an activity does not serve it, cut the activity.",
    example: "Goal: leave with three prioritised user problems for the next quarter.",
    blank: `WORKSHOP AGENDA

Goal (the output we leave with):
How decisions will be made:
Date, time, place or link:
Facilitator:            Note-taker:
Attendees (and why each is needed):
Pre-read sent on:

Time   | Activity | Purpose | Output
-------|----------|---------|-------
5 min  | Welcome, goal, how we decide |  |
       |          |         |
       |          |         |
       |          |         |
5 min  | Decisions, owners, next steps |  |

PARKING LOT
-

DECISION LOG
Decision | Why | Owner | By when
---------|-----|-------|--------
         |     |       |`,
  },
  {
    id: "stakeholder-interview",
    title: "Stakeholder interview",
    purpose: "Learn what a stakeholder knows, needs and assumes, without collecting a feature list.",
    howToUse: "Afterwards, sort every answer into need, constraint, assumption or solution request.",
    example: "\"We need a dashboard\" is a solution request. Ask what decision it would help them make.",
    blank: `STAKEHOLDER INTERVIEW

Name and role:
Why we are talking to them:

GOALS
- What would success look like a year from now?
- How would you measure it?

CURRENT STATE
- How does this work today?
- What are the known problems?

CONSTRAINTS AND RISKS
- What cannot change?
- What worries you about this project?
- What does it depend on?

HISTORY
- What has been tried before? What happened?
- Which earlier decisions should we know about?

USERS
- What do you hear from users about this?

WORKING TOGETHER
- How would you like to be kept informed?

AFTERWARDS, SORT WHAT YOU HEARD
Needs:
Constraints:
Assumptions (to check):
Solution requests (and the need behind each):`,
  },
  {
    id: "journey-map",
    title: "Journey map",
    purpose: "Lay out what a person does, thinks and runs into across a whole task.",
    howToUse: "Build it from research, and mark anything that is assumed. One map per user and scenario.",
    example: "Scenario: a first-time applicant renewing a permit on a phone.",
    blank: `JOURNEY MAP

Who (user):
Scenario and goal:
Based on (research sessions, data, or assumption):

Stage        |  1  |  2  |  3  |  4  |  5
-------------|-----|-----|-----|-----|-----
Doing        |     |     |     |     |
Thinking     |     |     |     |     |
Feeling      |     |     |     |     |
Touchpoints  |     |     |     |     |
Pain points  |     |     |     |     |
Behind the scenes |  |   |     |     |
Opportunities|     |     |     |     |

Mark every cell that is an assumption, not an observation.`,
  },
  {
    id: "research-readout",
    title: "Research readout",
    purpose: "Present findings so the room leaves knowing what was learned and what happens next.",
    howToUse: "Aim for 20 minutes of presenting and as long again for discussion. Show participants' own words.",
    example: "Open with the decision the research informs, not with the method.",
    blank: `RESEARCH READOUT

1. Why we did this (the decision)                         1 slide
2. What we did, briefly (method, who, when)                1 slide
3. The headline: three things we learned                   1 slide
4. Each finding: observation, evidence, why it matters     1 slide each
   - Include a quote or clip
   - State confidence
5. What surprised us                                       1 slide
6. What we still do not know                               1 slide
7. Recommendations and proposed next steps                 1 slide
8. Discussion: what does the room want to do?

Bring: the notes and recordings, in case someone asks for the evidence.`,
  },
  {
    id: "critique-brief",
    title: "Design critique brief",
    purpose: "Tell reviewers what they are looking at and what feedback you need.",
    howToUse: "Send it before the session, or read it out at the start. Two minutes at most.",
    example: "Feedback wanted: is the primary action clear? Out of scope: colour and copy.",
    blank: `DESIGN CRITIQUE BRIEF

What this is:
The problem it addresses:
Who it is for, and what they are trying to do:
Context (platform, where it sits in the flow):
Constraints:
Stage (rough idea / working draft / near final):

Feedback I want:
1.
2.

Out of scope today:

Format for feedback: observation, impact, question, suggestion.`,
  },
];

export function getPracticeTemplate(id: string): PracticeTemplate | undefined {
  return practiceTemplates.find((t) => t.id === id);
}

// --- Open Design Library ----------------------------------------------------------

export interface OpenResource {
  id: string;
  name: string;
  category: string;
  what: string;
  useFor: string;
  why: string;
  /**
   * The licence as reported by the project's own repository on VERIFIED, or
   * null when it was not checked. Never inferred.
   */
  licence: string | null;
  access: "Open source" | "Free to read" | "Free to use";
  url: string;
  repo?: string;
}

const NON_STANDARD = "Licence file present, not a standard identifier. Read it in the repository.";

export const openResources: OpenResource[] = [
  { id: "sgds", name: "Singapore Government Design System", category: "Government design systems", what: "Singapore's design system: foundations, components, templates and blocks.", useFor: "Singapore government services, and as a worked example of a token architecture.", why: "Official, actively maintained, and the system the Baseline Design Practices point to.", licence: "MIT (web components repository)", access: "Open source", url: "https://www.designsystem.tech.gov.sg/", repo: "https://github.com/GovTechSG/sgds-web-component" },
  { id: "govuk-ds", name: "GOV.UK Design System", category: "Government design systems", what: "Components and patterns for UK government services, each with the research behind it.", useFor: "Form patterns, error handling and plain-language guidance.", why: "Unusually open about when not to use a component.", licence: "MIT (GOV.UK Frontend)", access: "Open source", url: "https://design-system.service.gov.uk/", repo: "https://github.com/alphagov/govuk-frontend" },
  { id: "uswds", name: "U.S. Web Design System", category: "Government design systems", what: "The design system for United States federal websites.", useFor: "A third government system to compare against.", why: "Mature, well documented and built for accessibility.", licence: NON_STANDARD, access: "Open source", url: "https://designsystem.digital.gov/", repo: "https://github.com/uswds/uswds" },
  { id: "govuk-service-manual", name: "GOV.UK Service Manual: User research", category: "UX research resources", what: "Practical guides to planning, running and analysing research.", useFor: "Consent, moderated testing and analysis, step by step.", why: "Written by practitioners, free, and specific. Some pages are several years old.", licence: null, access: "Free to read", url: "https://www.gov.uk/service-manual/user-research" },
  { id: "nng", name: "Nielsen Norman Group articles", category: "UX research resources", what: "Evidence-based articles on usability and research methods.", useFor: "Method choice, interviews, testing and synthesis.", why: "Long-running and widely cited. Articles are free; training is paid.", licence: null, access: "Free to read", url: "https://www.nngroup.com/articles/" },
  { id: "wcag", name: "WCAG 2.2", category: "Accessibility", what: "The W3C's Web Content Accessibility Guidelines.", useFor: "The testable criteria most accessibility requirements point to.", why: "It is the standard itself, not a summary of it.", licence: NON_STANDARD, access: "Free to read", url: "https://www.w3.org/TR/WCAG22/", repo: "https://github.com/w3c/wcag" },
  { id: "apg", name: "ARIA Authoring Practices Guide", category: "Accessibility", what: "W3C patterns for accessible widgets, with keyboard behaviour and examples.", useFor: "Specifying how a custom component should behave by keyboard.", why: "The reference for interaction patterns such as tabs, menus and dialogs.", licence: NON_STANDARD, access: "Free to read", url: "https://www.w3.org/WAI/ARIA/apg/", repo: "https://github.com/w3c/aria-practices" },
  { id: "axe-core", name: "axe-core", category: "Accessibility", what: "An accessibility testing engine for websites.", useFor: "Automated checks in the browser and in a build pipeline.", why: "Widely used, and the engine behind many other tools.", licence: "MPL-2.0", access: "Open source", url: "https://github.com/dequelabs/axe-core", repo: "https://github.com/dequelabs/axe-core" },
  { id: "pa11y", name: "Pa11y", category: "Accessibility", what: "Command-line accessibility testing.", useFor: "Running checks across many pages automatically.", why: "Simple to add to a project.", licence: "LGPL-3.0", access: "Open source", url: "https://pa11y.org/", repo: "https://github.com/pa11y/pa11y" },
  { id: "material-web", name: "Material Web", category: "Design systems", what: "Google's Material Design components for the web.", useFor: "Seeing how Material components are specified and built.", why: "A large, complete system from a single vendor.", licence: "Apache-2.0", access: "Open source", url: "https://m3.material.io/", repo: "https://github.com/material-components/material-web" },
  { id: "carbon", name: "Carbon Design System", category: "Design systems", what: "IBM's design system.", useFor: "Dense, data-heavy enterprise patterns.", why: "Strong on tables, forms and data visualisation.", licence: "Apache-2.0", access: "Open source", url: "https://carbondesignsystem.com/", repo: "https://github.com/carbon-design-system/carbon" },
  { id: "primer", name: "Primer", category: "Design systems", what: "GitHub's design system.", useFor: "Developer-tool interfaces and compact UI.", why: "Shows a system serving a dense product.", licence: "MIT (Primer React)", access: "Open source", url: "https://primer.style/", repo: "https://github.com/primer/react" },
  { id: "fluent", name: "Fluent UI", category: "Design systems", what: "Microsoft's design system and component libraries.", useFor: "Windows and Microsoft 365 conventions.", why: "The reference for products in Microsoft's ecosystem.", licence: NON_STANDARD, access: "Open source", url: "https://fluent2.microsoft.design/", repo: "https://github.com/microsoft/fluentui" },
  { id: "polaris", name: "Polaris", category: "Design systems", what: "Shopify's design system.", useFor: "Commerce and admin patterns.", why: "Clear content guidelines.", licence: null, access: "Free to read", url: "https://polaris.shopify.com/" },
  { id: "atlassian", name: "Atlassian Design System", category: "Design systems", what: "Atlassian's design system.", useFor: "Collaboration-tool patterns.", why: "Well-documented foundations and content guidance.", licence: null, access: "Free to read", url: "https://atlassian.design/" },
  { id: "lucide", name: "Lucide", category: "Icons", what: "An icon library with consistent stroke weights.", useFor: "Interface icons. Shortcut itself uses it.", why: "Large, consistent and actively maintained.", licence: NON_STANDARD, access: "Open source", url: "https://lucide.dev/", repo: "https://github.com/lucide-icons/lucide" },
  { id: "phosphor", name: "Phosphor", category: "Icons", what: "An icon family in several weights.", useFor: "When you need the same icon at different visual weights.", why: "Weights make hierarchy possible without changing icon.", licence: "MIT", access: "Open source", url: "https://phosphoricons.com/", repo: "https://github.com/phosphor-icons/core" },
  { id: "heroicons", name: "Heroicons", category: "Icons", what: "Icons from the makers of Tailwind CSS.", useFor: "A small, tidy set for product UI.", why: "Simple and easy to adopt.", licence: "MIT", access: "Open source", url: "https://heroicons.com/", repo: "https://github.com/tailwindlabs/heroicons" },
  { id: "inter", name: "Inter", category: "Fonts", what: "A typeface designed for screens.", useFor: "Interface text. SGDS uses it.", why: "Tall x-height and wide language support.", licence: "OFL-1.1", access: "Open source", url: "https://rsms.me/inter/", repo: "https://github.com/rsms/inter" },
];

export const openCategories = [...new Set(openResources.map((r) => r.category))];
