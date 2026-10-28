'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, BookOpen, Check, ChevronLeft, Landmark } from 'lucide-react'

const hotspots = [
  ['Journey to Alausa', '29 May 2019', 'A new governorship began in Lagos State, opening a new chapter in the administration of a complex and rapidly growing city.', 'Lagos State Government'],
  ['The Lagos Blueprint', '2019–present', 'Policy priorities have covered transport, health, education, housing, and urban management. Stated goals remain distinct from verified outcomes.', 'Lagos State Government policy records'],
  ['A City in Motion', 'Selected dates', 'Announcements, projects, disruptions, and responses help place the governorship in the everyday experience of Lagos.', 'Lagos State Government; independent reporting'],
  ['Governing Lagos', '2019–present', 'Ministries, agencies, and local institutions share responsibility for public services across the state.', 'Lagos State public records'],
  ['Decisions & Agreements', '2019–present', 'Executive decisions and agreements can reshape transport, infrastructure, safety, and public services.', 'Lagos State House of Assembly'],
  ['The Finer Details', 'Context', 'Small civic details—signs, routes, services, and public spaces—show how a city’s history is experienced beyond announcements.', 'Editorial context'],
  ['People & Services', '2019–present', 'Education, health, social support, and public safety are everyday measures of government.', 'Lagos State ministries'],
  ['Connecting Policies', 'Ongoing', 'Urban priorities intersect: transport affects access, housing affects mobility, and infrastructure affects resilience.', 'Public planning documents'],
  ['The Urban Journey', 'Selected projects', 'Major city projects move through planning, procurement, construction, and operation. Each stage tells a different story.', 'Lagos State infrastructure records'],
  ['Lagos in Context', '2019–present', 'A governorship can be understood through its timeline, ambitions, delivery, constraints, and the lived complexity of a large city.', 'Independent educational demonstration'],
]

export default function TinubuExplorePage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [visited, setVisited] = useState<number[]>([])
  const progress = visited.length

  function openHotspot(index: number) {
    setSelected(index)
    setVisited((current) => current.includes(index) ? current : [...current, index])
  }

  return <main className="route-shell"><header className="site-header"><div className="container nav-wrap"><Link className="brand" href="/"><span className="brand-mark"><Landmark size={18} /></span><span>modiex</span></Link><nav className="nav-links"><Link href="/">Home</Link><Link href="/monuments/tinubu">Challenge</Link><Link href="/leaderboards/tinubu">Leaderboard</Link></nav></div></header><section className="route-content explore-route"><Link className="back-button" href="/monuments/tinubu"><ChevronLeft size={15} /> Back to challenge</Link><div className="explore-heading"><div><p className="eyebrow" style={{ color: '#2196CC' }}>TINUBU CHALLENGE · EXPLORE</p><h1>Ten moments in <em>Lagos</em>.</h1><p className="route-lede">Visit each hotspot to read the story, understand the context, and unlock the trivia challenge.</p></div><div className="progress-card"><strong>{progress}/10</strong><span>hotspots explored</span><div className="progress-track"><span style={{ width: `${progress * 10}%` }} /></div></div></div><div className="hotspot-grid">{hotspots.map(([title, date], index) => <button className={`hotspot-card ${selected === index ? 'selected' : ''}`} key={title} onClick={() => openHotspot(index)}><span className="hotspot-number">{String(index + 1).padStart(2, '0')}</span><span className="hotspot-status">{visited.includes(index) ? <Check size={14} /> : 'DISCOVER'}</span><strong>{title}</strong><small>{date}</small><ArrowRight size={17} /></button>)}</div>{selected !== null && <article className="story-card"><div><p className="eyebrow" style={{ color: '#2196CC' }}>HOTSPOT {String(selected + 1).padStart(2, '0')}</p><h2>{hotspots[selected][0]}</h2><p className="story-date">{hotspots[selected][1]}</p><p>{hotspots[selected][2]}</p><small><BookOpen size={14} /> Source: {hotspots[selected][3]}</small></div><button className="button secondary" onClick={() => setSelected(null)}>Close</button></article>}{progress === 10 && <div className="unlock-card"><div><strong>Trivia unlocked</strong><p>You have explored all ten stories. Ready to test what you know?</p></div><Link className="button primary" href="/monuments/sanwo-olu/trivia">Begin trivia <ArrowRight size={16} /></Link></div>}</section></main>
}
