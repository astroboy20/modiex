'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Compass,
  ExternalLink,
  Footprints,
  GraduationCap,
  Landmark,
  Lock,
  Menu,
  Play,
  Share2,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react'

type MonumentId = 'tinubu' | 'sanwo-olu'
type View = 'home' | 'explore' | 'trivia' | 'leaderboard'

type Story = {
  title: string
  label: string
  date: string
  body: string
  source: string
}

type Monument = {
  id: MonumentId
  name: string
  role: string
  date: string
  accent: string
  description: string
  intro: string
  stories: Story[]
}

const stories: Record<MonumentId, Story[]> = {
  tinubu: [
    { title: 'The Beginning', label: 'Cap', date: '29 May 2023', body: 'A new presidential term began at Eagle Square, Abuja. The inauguration marked the constitutional transfer of executive authority and set the opening point for this historical exploration.', source: 'Office of the Secretary to the Government of the Federation' },
    { title: 'Economic Direction', label: 'Glasses', date: '2023–present', body: 'Early economic decisions included changes to fuel subsidy arrangements and foreign exchange policy. Their objectives, implementation, effects, and public debate remain important context for understanding the period.', source: 'Central Bank of Nigeria; Federal Ministry of Finance' },
    { title: 'The Timeline', label: 'Wristwatch', date: 'Selected dates', body: 'Presidential history is built from decisions, announcements, legislation, and institutional responses. This chapter places selected verified moments in sequence without turning a timeline into a verdict.', source: 'Official government records and independent reporting' },
    { title: 'Governance', label: 'Agbada', date: '2023–present', body: 'Cabinet formation and the organisation of government shaped the administration’s early operating context. The story distinguishes stated priorities from outcomes that require evidence.', source: 'State House of Nigeria' },
    { title: 'Decisions & Agreements', label: 'Hands', date: '2023–present', body: 'Executive decisions, legislation, and agreements connect the presidency to public institutions and citizens. Each is best understood alongside its legal basis and implementation status.', source: 'National Assembly; State House of Nigeria' },
    { title: 'The Finer Details', label: 'Accessory', date: 'Context', body: 'Public history also includes the smaller details that help us understand how a leader’s public role is presented, recorded, and remembered.', source: 'Editorial context; review required' },
    { title: 'National Priorities', label: 'Lapel', date: '2023–present', body: 'Education, health, social protection, and other national priorities sit within a wider policy landscape. Plans and announcements are presented separately from verified results.', source: 'Federal Government policy documents' },
    { title: 'Connecting Policies', label: 'Belt', date: 'Ongoing', body: 'Policy areas rarely move alone. Institutions, budgets, and implementation choices connect economic direction with social outcomes and public services.', source: 'Public budget documents; review required' },
    { title: 'The National Journey', label: 'Shoes', date: 'Selected projects', body: 'Infrastructure and development projects have different stages: proposed, funded, under construction, completed, or operating. This chapter keeps those stages distinct.', source: 'Federal Ministry of Works; review required' },
    { title: 'Presidency in Context', label: 'Full figure', date: '2023–present', body: 'The period is best read as a balanced timeline of policies, verified results, challenges, and outstanding questions. History remains open to evidence and revision.', source: 'Independent educational demonstration' },
  ],
  'sanwo-olu': [
    { title: 'Journey to Alausa', label: 'Cap', date: '29 May 2019', body: 'A new governorship began in Lagos State in May 2019. This opening chapter introduces the office, the state’s civic context, and the institutions that shape public administration.', source: 'Lagos State Government' },
    { title: 'The Lagos Blueprint', label: 'Glasses', date: '2019–present', body: 'Policy priorities in Lagos have covered transport, health, education, housing, and urban management. Stated goals are kept distinct from independently verified outcomes.', source: 'Lagos State Government policy records' },
    { title: 'A City in Motion', label: 'Wristwatch', date: 'Selected dates', body: 'Lagos changes quickly. A timeline of announcements, projects, disruptions, and responses helps place the governorship in the everyday experience of a growing city.', source: 'Lagos State Government; independent reporting' },
    { title: 'Governing Lagos', label: 'Agbada', date: '2019–present', body: 'The state’s ministries, agencies, and local institutions share responsibility for public services. Understanding those roles adds context beyond a single office-holder.', source: 'Lagos State public records' },
    { title: 'Decisions & Agreements', label: 'Hands', date: '2019–present', body: 'Executive decisions and agreements can reshape transport, infrastructure, safety, and public services. Their legal and implementation context matters.', source: 'Lagos State House of Assembly; review required' },
    { title: 'The Finer Details', label: 'Accessory', date: 'Context', body: 'Small civic details—the signs, routes, services, and public spaces people encounter—can reveal how a city’s history is experienced beyond formal announcements.', source: 'Editorial context; review required' },
    { title: 'People & Services', label: 'Lapel', date: '2019–present', body: 'Education, health, social support, and public safety are everyday measures of government. This story uses careful language where evidence is still developing.', source: 'Lagos State ministries; review required' },
    { title: 'Connecting Policies', label: 'Belt', date: 'Ongoing', body: 'Urban priorities intersect: transport affects access, housing affects mobility, and infrastructure affects resilience. The connections are part of the story.', source: 'Public planning documents; review required' },
    { title: 'The Urban Journey', label: 'Shoes', date: 'Selected projects', body: 'Major city projects move through planning, procurement, construction, and operation. This chapter distinguishes each stage rather than presenting every announcement as a completed result.', source: 'Lagos State infrastructure records' },
    { title: 'Lagos in Context', label: 'Full figure', date: '2019–present', body: 'A governorship can be understood through its timeline, ambitions, delivery, constraints, and the lived complexity of a large city.', source: 'Independent educational demonstration' },
  ],
}

const monuments: Record<MonumentId, Monument> = {
  tinubu: { id: 'tinubu', name: 'Bola Ahmed Tinubu', role: 'President of the Federal Republic of Nigeria', date: 'Beginning 29 May 2023', accent: '#087A3D', description: 'Explore the people, decisions, and public record of a presidency in progress.', intro: 'A guided, neutral exploration of the presidency through ten stories anchored to a digital monument.', stories: stories.tinubu },
  'sanwo-olu': { id: 'sanwo-olu', name: 'Babajide Sanwo-Olu', role: 'Governor of Lagos State', date: 'Beginning 29 May 2019', accent: '#2196CC', description: 'Trace the public story of governing Lagos, one civic detail at a time.', intro: 'A guided, neutral exploration of Lagos State governance through ten stories anchored to a digital monument.', stories: stories['sanwo-olu'] },
}

const questions = [
  { q: 'What does a source reference add to a historical story?', a: ['A way to verify and contextualise claims', 'A guarantee that every outcome succeeded', 'A replacement for reading the story', 'A ranking shortcut'], correct: 0 },
  { q: 'When did the Tinubu Challenge coverage begin?', a: ['29 May 2019', '29 May 2023', '1 October 2023', '12 June 2024'], correct: 1 },
  { q: 'Why distinguish a policy objective from an outcome?', a: ['To make the story longer', 'To keep claims evidence-based', 'To avoid using dates', 'To remove context'], correct: 1 },
  { q: 'How many hotspots are in each monument?', a: ['5', '8', '10', '12'], correct: 2 },
  { q: 'What is the purpose of a timeline chapter?', a: ['To place verified moments in sequence', 'To predict every future event', 'To replace source references', 'To rank public figures'], correct: 0 },
  { q: 'The Sanwo-Olu Challenge explores which office?', a: ['President of Nigeria', 'Governor of Lagos State', 'Mayor of Abuja', 'Speaker of the National Assembly'], correct: 1 },
  { q: 'What should happen when a project is still underway?', a: ['Call it completed', 'Clearly label its current stage', 'Remove its date', 'Use a promotional slogan'], correct: 1 },
  { q: 'What is the best way to read an independent educational demonstration?', a: ['As a starting point for learning', 'As an official campaign', 'As a legal ruling', 'As a substitute for all sources'], correct: 0 },
  { q: 'Which section helps compare performance?', a: ['The leaderboard', 'The footer', 'The source link', 'The breadcrumb'], correct: 0 },
  { q: 'What unlocks a monument’s trivia challenge?', a: ['Opening one story', 'Exploring all ten hotspots', 'Visiting the homepage', 'Refreshing the page'], correct: 1 },
]

function Portrait({ monument, small = false }: { monument: Monument; small?: boolean }) {
  return <div className={`portrait ${small ? 'portrait-small' : ''}`} style={{ '--accent': monument.accent } as React.CSSProperties}><div className="portrait-grid" /><div className="portrait-sun" /><div className="portrait-head" /><div className="portrait-body" /><div className="portrait-sash" /><div className="portrait-base" /><span className="portrait-caption">DIGITAL MONUMENT</span></div>
}

export default function Page() {
  const [monumentId, setMonumentId] = useState<MonumentId>('tinubu')
  const [view, setView] = useState<View>('home')
  const [explored, setExplored] = useState<Record<MonumentId, number[]>>({ tinubu: [], 'sanwo-olu': [] })
  const [storyIndex, setStoryIndex] = useState<number | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [answers, setAnswers] = useState<number[]>([])
  const [submitted, setSubmitted] = useState(false)
  const [mobileMenu, setMobileMenu] = useState(false)
  const monument = monuments[monumentId]
  const progress = explored[monumentId].length
  const score = answers.reduce((total, answer, index) => total + (answer === questions[index].correct ? 1 : 0), 0)

  useEffect(() => { const saved = window.localStorage.getItem('modiex-progress'); if (saved) setExplored(JSON.parse(saved)) }, [])
  useEffect(() => { window.localStorage.setItem('modiex-progress', JSON.stringify(explored)) }, [explored])

  function selectMonument(id: MonumentId, next: View = 'home') { setMonumentId(id); setView(next); setStoryIndex(null); setSubmitted(false); setAnswers([]); setQuizIndex(0); setMobileMenu(false) }
  function openStory(index: number) { setStoryIndex(index); if (!explored[monumentId].includes(index)) setExplored((current) => ({ ...current, [monumentId]: [...current[monumentId], index] })) }
  function startQuiz() { setAnswers([]); setQuizIndex(0); setSubmitted(false); setView('trivia') }
  function share() { const text = `I scored ${score}/10 in the ${monument.name} Challenge on Modiex.`; if (navigator.share) navigator.share({ title: 'My Modiex result', text, url: window.location.href }); else navigator.clipboard?.writeText(text) }

  return <main>
    <header className="site-header"><div className="container nav-wrap"><button className="brand" onClick={() => setView('home')} aria-label="Modiex home"><span className="brand-mark"><Landmark size={18} /></span><span>modiex</span></button><nav className={mobileMenu ? 'nav-links open' : 'nav-links'}><button onClick={() => setView('home')}>Home</button><button onClick={() => setView('home')}>Explore monuments</button><button onClick={() => { setView('leaderboard'); setMobileMenu(false) }}>Leaderboards</button></nav><button className="menu-button" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Toggle navigation">{mobileMenu ? <X size={20} /> : <Menu size={20} />}</button></div></header>

    {view === 'home' && <Home onSelect={selectMonument} />}
    {view === 'explore' && <Explorer monument={monument} explored={explored[monumentId]} onBack={() => setView('home')} onStory={openStory} onTrivia={startQuiz} onLeaderboard={() => setView('leaderboard')} />}
    {view === 'trivia' && <Trivia monument={monument} progress={progress} quizIndex={quizIndex} answers={answers} submitted={submitted} score={score} onBack={() => setView('explore')} onAnswer={(answer) => setAnswers((current) => [...current.slice(0, quizIndex), answer])} onNext={() => quizIndex < 9 ? setQuizIndex(quizIndex + 1) : setSubmitted(true)} onRestart={startQuiz} onShare={share} />}
    {view === 'leaderboard' && <Leaderboard monument={monument} onBack={() => setView('home')} onSelect={(id) => selectMonument(id, 'leaderboard')} />}

    {storyIndex !== null && <StoryPanel story={monument.stories[storyIndex]} index={storyIndex} total={10} onClose={() => setStoryIndex(null)} onPrevious={() => setStoryIndex(Math.max(0, storyIndex - 1))} onNext={() => setStoryIndex(Math.min(9, storyIndex + 1))} />}
    <footer className="footer"><div className="container footer-inner"><div><strong>modiex</strong><p>Digital Monumental Experience</p></div><p>Independent educational demonstration. Not an official government website.</p></div></footer>
  </main>
}

function Home({ onSelect }: { onSelect: (id: MonumentId, view?: View) => void }) {
  return <><section className="hero container"><div className="hero-copy"><p className="eyebrow">HISTORY. DISCOVERY. KNOWLEDGE.</p><h1>History comes alive when you <em>explore</em> it.</h1><p className="lede">Step into the stories behind Nigeria&apos;s public life. Explore interactive digital monuments, uncover important moments, and test what you know.</p><div className="hero-actions"><button className="button primary" onClick={() => document.getElementById('monuments')?.scrollIntoView({ behavior: 'smooth' })}>Explore the monuments <ArrowRight size={17} /></button><button className="button secondary" onClick={() => onSelect('tinubu', 'leaderboard')}>View leaderboards</button></div><div className="hero-note"><span className="live-dot" /> Two competitions · 10 stories each · 10-question challenges</div></div><div className="hero-art"><div className="art-rule" /><span className="art-number">01</span><div className="art-circle"><Landmark size={62} strokeWidth={1} /><span>MAKE<br />HISTORY<br />VISIBLE</span></div><div className="art-vertical">DIGITAL PUBLIC HISTORY / 2026</div></div></section><section id="monuments" className="monuments-section container"><div className="section-heading"><div><p className="eyebrow">CHOOSE YOUR CHALLENGE</p><h2>Two stories. One curious mind.</h2></div><p>Each monument is a separate competition with its own stories, progress, and leaderboard.</p></div><div className="monument-grid"><MonumentCard monument={monuments.tinubu} onSelect={onSelect} /><MonumentCard monument={monuments['sanwo-olu']} onSelect={onSelect} /></div></section><section className="how-section"><div className="container"><div className="section-heading"><div><p className="eyebrow">THE MODIEX METHOD</p><h2>Learn by moving through the story.</h2></div></div><div className="steps">{[['01', Compass, 'Explore', 'Discover 10 interactive hotspots.'], ['02', BookOpen, 'Learn', 'Read stories, dates, and sources.'], ['03', GraduationCap, 'Play', 'Answer 10 multiple-choice questions.'], ['04', Trophy, 'Compare', 'See your score and ranking.']].map(([num, Icon, title, copy]) => <div className="step" key={title as string}><span className="step-num">{num as string}</span><Icon size={20} /><h3>{title as string}</h3><p>{copy as string}</p></div>)}</div></div></section></>
}

function MonumentCard({ monument, onSelect }: { monument: Monument; onSelect: (id: MonumentId, view?: View) => void }) { return <article className="monument-card"><Portrait monument={monument} small /><div className="card-content"><div className="card-top"><span className="tag" style={{ color: monument.accent, borderColor: monument.accent }}>10 HOTSPOTS</span><span className="card-arrow"><ArrowRight size={18} /></span></div><h3>{monument.id === 'tinubu' ? 'The Tinubu Challenge' : 'The Sanwo-Olu Challenge'}</h3><p className="role">{monument.name} · {monument.role}</p><p>{monument.description}</p><div className="card-bottom"><button className="text-button" onClick={() => onSelect(monument.id, 'explore')}>Explore monument <ArrowRight size={15} /></button><button className="link-button" onClick={() => onSelect(monument.id, 'leaderboard')}>Leaderboard</button></div></div></article> }

function Explorer({ monument, explored, onBack, onStory, onTrivia, onLeaderboard }: { monument: Monument; explored: number[]; onBack: () => void; onStory: (i: number) => void; onTrivia: () => void; onLeaderboard: () => void }) { return <section className="page-section container"><button className="back-button" onClick={onBack}><ChevronLeft size={16} /> Back to home</button><div className="explore-head"><div><p className="eyebrow">{monument.id === 'tinubu' ? 'THE TINUBU CHALLENGE' : 'THE SANWO-OLU CHALLENGE'}</p><h1>Explore the monument</h1><p>Tap a marker to uncover a chapter of the public record.</p></div><div className="progress-card"><div className="progress-line"><span>{explored.length} of 10 explored</span><strong>{explored.length * 10}%</strong></div><div className="progress-track"><span style={{ width: `${explored.length * 10}%`, background: monument.accent }} /></div></div></div><div className="explorer-layout"><div className="monument-stage"><Portrait monument />{monument.stories.map((story, i) => <button key={story.title} className={`hotspot ${explored.includes(i) ? 'complete' : ''}`} style={{ left: `${[48, 59, 44, 53, 38, 62, 39, 57, 44, 51][i]}%`, top: `${[15, 23, 31, 43, 52, 57, 64, 72, 84, 94][i]}%`, '--accent': monument.accent } as React.CSSProperties} onClick={() => onStory(i)} aria-label={`Explore hotspot ${i + 1}: ${story.title}`}>{explored.includes(i) ? <Check size={14} /> : i + 1}</button>)}</div><aside className="explore-aside"><div className="aside-label"><Sparkles size={16} /> YOUR JOURNEY</div><h2>Ten details make a bigger picture.</h2><p>Each marker opens a short editorial story. Explore them all to unlock the trivia challenge.</p><div className="story-list">{monument.stories.slice(0, 5).map((story, i) => <button key={story.title} className={explored.includes(i) ? 'story-list-item explored' : 'story-list-item'} onClick={() => onStory(i)}><span>{String(i + 1).padStart(2, '0')}</span><strong>{story.title}</strong>{explored.includes(i) && <Check size={14} />}</button>)}</div><button className="button primary full" disabled={explored.length < 10} onClick={onTrivia}>{explored.length < 10 ? <><Lock size={15} /> Explore {10 - explored.length} more to unlock</> : <>Start the trivia <ArrowRight size={16} /></>}</button><button className="button secondary full" onClick={onLeaderboard}><Trophy size={15} /> View leaderboard</button></aside></div></section> }

function StoryPanel({ story, index, total, onClose, onPrevious, onNext }: { story: Story; index: number; total: number; onClose: () => void; onPrevious: () => void; onNext: () => void }) { return <div className="modal-backdrop" role="presentation" onClick={onClose}><section className="story-panel" role="dialog" aria-modal="true" aria-labelledby="story-title" onClick={(e) => e.stopPropagation()}><button className="close-button" onClick={onClose} aria-label="Close story"><X size={20} /></button><div className="story-meta"><span>CHAPTER {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span><span>{story.label}</span></div><h2 id="story-title">{story.title}</h2><p className="story-date"><Clock3 size={15} /> {story.date}</p><p className="story-body">{story.body}</p><div className="source-box"><span>SOURCE REFERENCE</span><p>{story.source}</p><a href="https://www.gov.ng/" target="_blank" rel="noreferrer">Explore public records <ExternalLink size={13} /></a></div><div className="story-nav"><button onClick={onPrevious} disabled={index === 0}><ChevronLeft size={16} /> Previous</button><button onClick={onNext} disabled={index === total - 1}>Next <ChevronRight size={16} /></button></div></section></div> }

function Trivia({ monument, progress, quizIndex, answers, submitted, score, onBack, onAnswer, onNext, onRestart, onShare }: { monument: Monument; progress: number; quizIndex: number; answers: number[]; submitted: boolean; score: number; onBack: () => void; onAnswer: (answer: number) => void; onNext: () => void; onRestart: () => void; onShare: () => void }) { if (progress < 10) return <section className="page-section container locked-page"><Lock size={28} /><p className="eyebrow">CHALLENGE LOCKED</p><h1>Explore the full monument first.</h1><p>Read all ten stories to unlock this competition&apos;s trivia challenge.</p><button className="button primary" onClick={onBack}>Return to exploration</button></section>; if (submitted) return <section className="page-section container results"><p className="eyebrow">CHALLENGE COMPLETE</p><div className="score-ring"><span>{score}</span><small>/ 10</small></div><h1>{score >= 7 ? 'A thoughtful performance.' : 'Every question is a new beginning.'}</h1><p>You completed the {monument.name} Challenge. Keep exploring the source material and come back for another attempt.</p><div className="result-actions"><button className="button primary" onClick={onRestart}><Play size={16} /> Play again</button><button className="button secondary" onClick={onShare}><Share2 size={16} /> Share result</button></div><div className="answer-review">{questions.map((question, i) => <div className="review-row" key={question.q}><span className={answers[i] === question.correct ? 'review-icon good' : 'review-icon bad'}>{answers[i] === question.correct ? <Check size={14} /> : <X size={14} />}</span><p>{question.q}</p><strong>{answers[i] === question.correct ? 'Correct' : 'Review'}</strong></div>)}</div></section>; const question = questions[quizIndex]; return <section className="page-section container quiz-page"><button className="back-button" onClick={onBack}><ChevronLeft size={16} /> Back to exploration</button><div className="quiz-head"><div><p className="eyebrow">{monument.id === 'tinubu' ? 'THE TINUBU CHALLENGE' : 'THE SANWO-OLU CHALLENGE'}</p><h1>Test your knowledge.</h1></div><span className="quiz-count">{String(quizIndex + 1).padStart(2, '0')} / 10</span></div><div className="quiz-progress"><span style={{ width: `${(quizIndex + 1) * 10}%` }} /></div><div className="question-card"><p className="question-number">QUESTION {quizIndex + 1}</p><h2>{question.q}</h2><div className="options">{question.a.map((answer, i) => <button key={answer} className={answers[quizIndex] === i ? 'option selected' : 'option'} onClick={() => onAnswer(i)}><span>{String.fromCharCode(65 + i)}</span>{answer}{answers[quizIndex] === i && <Check size={17} />}</button>)}</div><div className="quiz-footer"><span>Choose one answer</span><button className="button primary" disabled={answers[quizIndex] === undefined} onClick={onNext}>{quizIndex === 9 ? 'Submit challenge' : 'Next question'} <ArrowRight size={16} /></button></div></div></section> }

function Leaderboard({ monument, onBack, onSelect }: { monument: Monument; onBack: () => void; onSelect: (id: MonumentId) => void }) { const rows = monument.id === 'tinubu' ? [['Adaeze O.', '9/10'], ['Musa K.', '8/10'], ['You', '—'], ['Chiamaka N.', '7/10']] : [['Tunde A.', '10/10'], ['Ifunanya E.', '9/10'], ['You', '—'], ['Seyi M.', '7/10']]; return <section className="page-section container"><button className="back-button" onClick={onBack}><ChevronLeft size={16} /> Back to home</button><div className="leader-head"><div><p className="eyebrow">COMPARE YOUR JOURNEY</p><h1>Competition leaderboard</h1><p>Separate challenges. Separate rankings.</p></div><div className="switcher"><button className={monument.id === 'tinubu' ? 'active' : ''} onClick={() => onSelect('tinubu')}>Tinubu</button><button className={monument.id === 'sanwo-olu' ? 'active' : ''} onClick={() => onSelect('sanwo-olu')}>Sanwo-Olu</button></div></div><div className="leader-card"><div className="leader-card-top"><div><span className="tag">{monument.id === 'tinubu' ? 'TINUBU CHALLENGE' : 'SANWO-OLU CHALLENGE'}</span><h2>Top explorers</h2></div><Trophy size={30} /></div><div className="leader-table"><div className="leader-row header"><span>RANK</span><span>EXPLORER</span><span>SCORE</span></div>{rows.map((row, i) => <div className={`leader-row ${row[0] === 'You' ? 'you' : ''}`} key={row[0]}><span>{i < 3 ? <Award size={16} className={i === 0 ? 'gold' : ''} /> : i + 1}</span><span>{row[0]}</span><strong>{row[1]}</strong></div>)}</div><div className="leader-empty"><Footprints size={18} /><span>Complete the challenge to add your score to this board.</span></div></div></section> }
