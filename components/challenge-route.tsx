"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  Compass,
  GraduationCap,
  Landmark,
  Trophy,
} from "lucide-react";

type Competition = "tinubu" | "sanwo-olu";

const competitions = {
  tinubu: {
    title: "The Tinubu Challenge",
    person: "Bola Ahmed Tinubu",
    role: "President of the Federal Republic of Nigeria",
    date: "Beginning 29 May 2023",
    accent: "#087A3D",
    description:
      "Explore the people, decisions, and public record of a presidency in progress.",
  },
  "sanwo-olu": {
    title: "The Sanwo-Olu Challenge",
    person: "Babajide Sanwo-Olu",
    role: "Governor of Lagos State",
    date: "Beginning 29 May 2019",
    accent: "#2196CC",
    description:
      "Trace the public story of governing Lagos, one civic detail at a time.",
  },
} as const;

export function ChallengeRoute({
  competition,
  leaderboard = false,
}: {
  competition: Competition;
  leaderboard?: boolean;
}) {
  const item = competitions[competition];
  if (leaderboard) {
    return (
      <main className="route-shell">
        <RouteHeader />
        <section className="route-content">
          <Link className="back-button" href={`/monuments/${competition}`}>
            <ChevronLeft size={15} /> Back to challenge
          </Link>
          <p className="eyebrow" style={{ color: item.accent }}>
            COMPETITION LEADERBOARD
          </p>
          <h1>
            {item.title}
            <br />
            <em>Leaderboard</em>
          </h1>
          <p className="route-lede">
            Compare completed scores for this competition. Finish the
            ten-question challenge to add your result.
          </p>
          <div className="route-card leaderboard-placeholder">
            <Trophy size={22} style={{ color: item.accent }} />
            <div>
              <strong>No scores yet</strong>
              <p>Your completed challenge will appear here.</p>
            </div>
          </div>
          <Link
            className="button primary"
            href={`/monuments/${competition}/explore`}
          >
            Start exploring <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="route-shell">
      <RouteHeader />
      <section className="route-content">
        <Link className="back-button" href="/">
          <ChevronLeft size={15} /> Back to Modiex
        </Link>
        <div className="route-kicker" style={{ color: item.accent }}>
          <Landmark size={17} /> DIGITAL MONUMENT
        </div>
        <p className="eyebrow" style={{ color: item.accent }}>
          A GUIDED PUBLIC HISTORY EXPERIENCE
        </p>
        <h1>{item.title}</h1>
        <p className="route-person">
          {item.person} · {item.role}
        </p>
        <p className="route-lede">
          {item.description} Read ten carefully framed stories, follow the
          sources, then test what you know.
        </p>
        <div className="route-actions">
          <Link
            className="button primary"
            href={`/monuments/${competition}/explore`}
          >
            Start exploring <Compass size={16} />
          </Link>
          <Link
            className="button secondary"
            href={`/leaderboards/${competition}`}
          >
            View leaderboard <Trophy size={16} />
          </Link>
        </div>
        <div className="route-steps">
          <div>
            <Compass size={20} style={{ color: item.accent }} />
            <strong>Explore</strong>
            <span>Find ten historical hotspots.</span>
          </div>
          <div>
            <BookOpen size={20} style={{ color: item.accent }} />
            <strong>Learn</strong>
            <span>Read dates, context, and sources.</span>
          </div>
          <div>
            <GraduationCap size={20} style={{ color: item.accent }} />
            <strong>Compete</strong>
            <span>Unlock and take the trivia challenge.</span>
          </div>
        </div>
      </section>
    </main>
  );
}

function RouteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="brand" href="/">
          <span className="brand-mark">
            <Landmark size={18} />
          </span>
          <span>modiex</span>
        </Link>
        <nav className="nav-links">
          <Link href="/">Home</Link>
          <Link href="/#monuments">Explore monuments</Link>
          <Link href="/leaderboards/tinubu">Leaderboards</Link>
        </nav>
      </div>
    </header>
  );
}
