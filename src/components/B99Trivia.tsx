import { useState, useEffect, useCallback } from 'react'

const QUESTIONS = [
  {
    question: 'What is Jake Peralta\'s favorite catchphrase when things go his way?',
    options: ['Cool cool cool', 'Noice', 'Smort', 'Title of your sex tape'],
    answer: 0,
    character: 'Jake Peralta',
  },
  {
    question: 'What is Raymond Holt\'s dog\'s name?',
    options: ['Cheddar', 'Gouda', 'Brie', 'Pepper'],
    answer: 0,
    character: 'Captain Holt',
  },
  {
    question: 'What is Gina Linetti\'s self-proclaimed title at the 99th precinct?',
    options: ['The Human Form of the 100 Emoji', 'Queen of Everything', 'The Sun', 'Office Manager Supreme'],
    answer: 0,
    character: 'Gina Linetti',
  },
  {
    question: 'What does Amy Santiago\'s name tag say she is obsessed with?',
    options: ['Binders', 'Post-it notes', 'Color-coded calendars', 'Highlighters'],
    answer: 0,
    character: 'Amy Santiago',
  },
  {
    question: 'What is Terry Jeffords\'s catchphrase when referring to himself?',
    options: ['Terry loves yogurt', 'Terry is strong', 'Terry needs a break', 'Terry has muscles'],
    answer: 0,
    character: 'Terry Jeffords',
  },
  {
    question: 'What number is the Brooklyn precinct in the show?',
    options: ['99', '98', '77', '88'],
    answer: 0,
    character: 'The Precinct',
  },
  {
    question: 'What is Rosa Diaz\'s most notable personality trait?',
    options: ['Intense and secretive', 'Cheerful and bubbly', 'Anxious and overthinking', 'Carefree and reckless'],
    answer: 0,
    character: 'Rosa Diaz',
  },
  {
    question: 'What is Charles Boyle\'s greatest passion outside of detective work?',
    options: ['Food and cooking', 'Photography', 'Fitness', 'Fashion'],
    answer: 0,
    character: 'Charles Boyle',
  },
  {
    question: 'In which holiday heist episode did the 99 squad first compete for the title of "Master of the Holiday Heist"?',
    options: ['Halloween', 'Christmas', 'Thanksgiving', 'New Year\'s'],
    answer: 0,
    character: 'The Squad',
  },
  {
    question: 'What does Holt say instead of expressing strong emotion, keeping his voice completely flat?',
    options: ['Bone', 'Interesting', 'Indeed', 'Remarkable'],
    answer: 0,
    character: 'Captain Holt',
  },
  {
    question: 'Jake and Amy\'s wedding takes place in which season?',
    options: ['Season 5', 'Season 4', 'Season 6', 'Season 3'],
    answer: 0,
    character: 'Jake & Amy',
  },
  {
    question: 'What sport does Jake Peralta claim is cool, cool, cool to play despite being terrible at it?',
    options: ['Ping pong', 'Tennis', 'Bowling', 'Darts'],
    answer: 0,
    character: 'Jake Peralta',
  },
]

// Shuffle answers so the correct one isn't always first
function prepareQuestions() {
  return QUESTIONS.map((q) => {
    const shuffled = [...q.options]
    // Fisher-Yates shuffle
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    const correctText = q.options[q.answer]
    return {
      ...q,
      shuffledOptions: shuffled,
      correctIndex: shuffled.indexOf(correctText),
    }
  })
}

const BADGE_COLORS = [
  'from-amber-400 to-yellow-300',
  'from-blue-500 to-blue-400',
  'from-red-500 to-rose-400',
  'from-emerald-500 to-green-400',
]

export default function B99Trivia() {
  const [questions] = useState(() => prepareQuestions())
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [phase, setPhase] = useState<'intro' | 'playing' | 'result'>('intro')
  const [answered, setAnswered] = useState(false)
  const [streak, setStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [shake, setShake] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const q = questions[current]

  const handleSelect = useCallback(
    (idx: number) => {
      if (answered) return
      setSelected(idx)
      setAnswered(true)

      if (idx === q.correctIndex) {
        const newStreak = streak + 1
        setStreak(newStreak)
        setMaxStreak((prev) => Math.max(prev, newStreak))
        setScore((s) => s + 1)
        setCelebrate(true)
        setTimeout(() => setCelebrate(false), 800)
      } else {
        setStreak(0)
        setWrongAnswers((w) => w + 1)
        setShake(true)
        setTimeout(() => setShake(false), 500)
      }
    },
    [answered, q, streak],
  )

  const handleNext = useCallback(() => {
    if (current + 1 >= questions.length) {
      setPhase('result')
    } else {
      setCurrent((c) => c + 1)
      setSelected(null)
      setAnswered(false)
    }
  }, [current, questions.length])

  const handleRestart = () => {
    setPhase('intro')
    setCurrent(0)
    setSelected(null)
    setScore(0)
    setAnswered(false)
    setStreak(0)
    setMaxStreak(0)
    setWrongAnswers(0)
  }

  const progress = ((current + (answered ? 1 : 0)) / questions.length) * 100

  const getRank = () => {
    const pct = score / questions.length
    if (pct === 1) return { title: 'Detective First Grade', sub: 'Jake Peralta would be proud. NINE-NINE!' }
    if (pct >= 0.8) return { title: 'Detective', sub: 'Holt nods approvingly. That\'s a complement from him.' }
    if (pct >= 0.6) return { title: 'Uniformed Officer', sub: 'Not bad. Boyle is crying tears of pride.' }
    if (pct >= 0.4) return { title: 'Civilian Consultant', sub: 'Terry is... concerned. Hit the yogurt bar.' }
    return { title: 'Doug Judy', sub: 'Jake will catch you eventually. Maybe.' }
  }

  return (
    <div className="b99-root">
      {/* Scanline overlay */}
      <div className="scanlines" />

      {/* Noise grain */}
      <div className="grain" />

      {/* Floating badge decorations */}
      <div className="badge-deco badge-deco--1">
        <BadgeSvg />
      </div>
      <div className="badge-deco badge-deco--2">
        <BadgeSvg />
      </div>

      <div className="container">
        {phase === 'intro' && (
          <IntroScreen onStart={() => setPhase('playing')} />
        )}

        {phase === 'playing' && (
          <div className={`quiz-card ${shake ? 'shake' : ''} ${celebrate ? 'celebrate' : ''}`}>
            {/* Header strip */}
            <div className="quiz-header">
              <div className="precinct-tag">PRECINCT 99</div>
              <div className="score-pill">
                <span className="score-num">{score}</span>
                <span className="score-sep">/</span>
                <span>{current + (answered ? 1 : 0)}</span>
              </div>
              {streak >= 2 && (
                <div className="streak-badge">
                  {streak}x STREAK
                </div>
              )}
            </div>

            {/* Progress bar */}
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>

            {/* Question number */}
            <div className="q-meta">
              <span className="q-num">Q{current + 1}</span>
              <span className="q-character">{q.character}</span>
              <span className="q-total">of {questions.length}</span>
            </div>

            {/* Question */}
            <h2 className="question-text">{q.question}</h2>

            {/* Options */}
            <div className="options-grid">
              {q.shuffledOptions.map((opt, i) => {
                const isCorrect = i === q.correctIndex
                const isSelected = i === selected
                let optClass = 'option-btn'
                if (answered) {
                  if (isCorrect) optClass += ' option-correct'
                  else if (isSelected && !isCorrect) optClass += ' option-wrong'
                  else optClass += ' option-dim'
                }
                return (
                  <button
                    key={i}
                    className={optClass}
                    onClick={() => handleSelect(i)}
                    disabled={answered}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + i)}</span>
                    <span className="option-text">{opt}</span>
                    {answered && isCorrect && <span className="option-check">✓</span>}
                    {answered && isSelected && !isCorrect && <span className="option-x">✗</span>}
                  </button>
                )
              })}
            </div>

            {/* Feedback + next */}
            {answered && (
              <div className="feedback-row">
                <div className={`feedback-msg ${selected === q.correctIndex ? 'feedback-correct' : 'feedback-wrong'}`}>
                  {selected === q.correctIndex
                    ? streak >= 3
                      ? `NINE-NINE! ${streak} in a row!`
                      : 'Noice. Smort.'
                    : 'Cool cool cool... not.'}
                </div>
                <button className="next-btn" onClick={handleNext}>
                  {current + 1 >= questions.length ? 'See Results' : 'Next Question'}
                  <span className="next-arrow">→</span>
                </button>
              </div>
            )}
          </div>
        )}

        {phase === 'result' && (
          <ResultScreen
            score={score}
            total={questions.length}
            maxStreak={maxStreak}
            wrongAnswers={wrongAnswers}
            rank={getRank()}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  )
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="intro-card">
      <div className="intro-eyebrow">BROOKLYN</div>
      <div className="intro-nine-nine">
        <span className="nine">9</span>
        <span className="nine-sep">-</span>
        <span className="nine">9</span>
      </div>
      <div className="intro-subtitle">TRIVIA CHALLENGE</div>

      <div className="intro-divider" />

      <p className="intro-desc">
        Think you know the 99th precinct? 12 questions. No phoning Jake. No
        backup from Holt. Just you, your brain, and the cold fluorescent glow
        of the bullpen.
      </p>

      <div className="intro-stats">
        <div className="intro-stat">
          <span className="stat-num">12</span>
          <span className="stat-label">Questions</span>
        </div>
        <div className="intro-stat-divider" />
        <div className="intro-stat">
          <span className="stat-num">6</span>
          <span className="stat-label">Characters</span>
        </div>
        <div className="intro-stat-divider" />
        <div className="intro-stat">
          <span className="stat-num">∞</span>
          <span className="stat-label">Replays</span>
        </div>
      </div>

      <button className="start-btn" onClick={onStart}>
        Start Interrogation
      </button>

      <div className="intro-footer">NYPD · 99TH PRECINCT · BROOKLYN, NY</div>
    </div>
  )
}

function ResultScreen({
  score,
  total,
  maxStreak,
  wrongAnswers,
  rank,
  onRestart,
}: {
  score: number
  total: number
  maxStreak: number
  wrongAnswers: number
  rank: { title: string; sub: string }
  onRestart: () => void
}) {
  const pct = Math.round((score / total) * 100)

  return (
    <div className="result-card">
      <div className="result-eyebrow">CASE CLOSED</div>
      <div className="result-rank-title">{rank.title}</div>
      <div className="result-rank-sub">{rank.sub}</div>

      <div className="result-score-ring">
        <svg viewBox="0 0 120 120" className="ring-svg">
          <circle cx="60" cy="60" r="50" className="ring-bg" />
          <circle
            cx="60"
            cy="60"
            r="50"
            className="ring-fill"
            style={{
              strokeDasharray: `${2 * Math.PI * 50}`,
              strokeDashoffset: `${2 * Math.PI * 50 * (1 - score / total)}`,
            }}
          />
        </svg>
        <div className="ring-inner">
          <span className="ring-score">{score}</span>
          <span className="ring-sep">/{total}</span>
          <span className="ring-pct">{pct}%</span>
        </div>
      </div>

      <div className="result-stats">
        <div className="result-stat">
          <span className="rstat-val">{maxStreak}</span>
          <span className="rstat-label">Best Streak</span>
        </div>
        <div className="result-stat">
          <span className="rstat-val">{wrongAnswers}</span>
          <span className="rstat-label">Wrong</span>
        </div>
        <div className="result-stat">
          <span className="rstat-val">{score}</span>
          <span className="rstat-label">Correct</span>
        </div>
      </div>

      <button className="restart-btn" onClick={onRestart}>
        Nine-Nine Again
      </button>
    </div>
  )
}

function BadgeSvg() {
  return (
    <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon
        points="40,4 75,20 75,55 40,86 5,55 5,20"
        fill="currentColor"
        opacity="0.15"
        stroke="currentColor"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <circle cx="40" cy="44" r="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.4" />
      <text x="40" y="50" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5" fontWeight="bold">99</text>
    </svg>
  )
}
