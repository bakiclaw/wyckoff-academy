'use client'

import { useState } from 'react'

// Course data
const courses = [
  {
    id: 'fundamentals',
    title: 'Wyckoff Fundamentals',
    description: 'Master the core principles that drive market movements',
    lessons: 8,
    icon: '📐',
    color: '#3B82F6'
  },
  {
    id: 'accumulation',
    title: 'Accumulation Schematics',
    description: 'Learn to identify smart money accumulation patterns',
    lessons: 12,
    icon: '📈',
    color: '#10B981'
  },
  {
    id: 'distribution',
    title: 'Distribution Schematics',
    description: 'Spot where smart money distributes positions',
    lessons: 10,
    icon: '📉',
    color: '#EF4444'
  },
  {
    id: 'volume',
    title: 'Volume Analysis',
    description: 'Read volume like a professional trader',
    lessons: 6,
    icon: '📊',
    color: '#8B5CF6'
  },
  {
    id: 'psychology',
    title: 'Trading Psychology',
    description: 'Master your mind for trading success',
    lessons: 5,
    icon: '🧠',
    color: '#F59E0B'
  }
]

// Quick reference data
const phases = [
  { phase: 'A', name: 'Stop the Trend', description: 'Prior downtrend ends. Supply absorption begins.' },
  { phase: 'B', name: 'Build Cause', description: 'Trading range forms. Smart money accumulates.' },
  { phase: 'C', name: 'Test', description: 'Spring tests support. Last point of supply forms.' },
  { phase: 'D', name: 'Launch', description: 'Breakout! Trend begins.' },
  { phase: 'E', name: 'New Trend', description: 'Price moves away from trading range.' }
]

const concepts = [
  { term: 'CO', full: 'Composite Operator', desc: 'The institutional smart money' },
  { term: 'TR', full: 'Trading Range', desc: 'Accumulation or distribution zone' },
  { term: 'Spring', full: 'Spring', desc: 'Test of support before breakout' },
  { term: 'UTAD', full: 'UTAD', desc: 'Test of resistance before breakdown' },
  { term: 'LPS', full: 'Last Point of Support', desc: 'Buying opportunity in uptrend' },
  { term: 'LPSY', full: 'LPSY', desc: 'Last Point of Supply' }
]

// Quiz questions
const quizQuestions = [
  {
    question: 'In which Wyckoff phase does the Composite Operator typically accumulate positions?',
    options: ['Phase A', 'Phase B', 'Phase C', 'Phase D'],
    correct: 1,
    explanation: 'Phase B is when the cause is built - smart money accumulates in the trading range.'
  },
  {
    question: 'What is a "Spring" in Wyckoff methodology?',
    options: ['A type of candlestick', 'A test of support before breakout', 'A volume pattern', 'A trend line'],
    correct: 1,
    explanation: 'A Spring is a test of support that fails, showing weak supply before breakout.'
  },
  {
    question: 'What does LPS stand for?',
    options: ['Last Profit Stop', 'Last Point of Support', 'Long Position Signal', 'Limit Price Support'],
    correct: 1,
    explanation: 'LPS = Last Point of Support, a buying opportunity in an uptrend.'
  }
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('courses')
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setShowResult(false)
    setScore(0)
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(to right, #1e3a8a, #581c87)', 
        padding: '3rem 1rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          🏛️ Wyckoff Academy
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#bfdbfe' }}>
          Master the Wyckoff Trading Methodology through interactive learning
        </p>
      </header>

      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#1e293b', 
        position: 'sticky', 
        top: 0, 
        zIndex: 10,
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', gap: '0.5rem', padding: '0.5rem', overflowX: 'auto' }}>
          {['courses', 'phases', 'concepts', 'quiz'].map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setSelectedCourse(null); }}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                backgroundColor: activeTab === tab ? '#2563eb' : '#334155',
                color: activeTab === tab ? 'white' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Courses Tab */}
        {activeTab === 'courses' && !selectedCourse && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {courses.map(course => (
              <div
                key={course.id}
                onClick={() => setSelectedCourse(course.id)}
                style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, border-color 0.2s'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)'
                  e.currentTarget.style.borderColor = '#3b82f6'
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)'
                  e.currentTarget.style.borderColor = '#334155'
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{course.icon}</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{course.title}</h3>
                <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>{course.description}</p>
                <span style={{ 
                  fontSize: '0.875rem', 
                  backgroundColor: '#334155', 
                  padding: '0.25rem 0.75rem', 
                  borderRadius: '9999px' 
                }}>
                  {course.lessons} lessons
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Course Detail */}
        {selectedCourse && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '2rem' }}>
            <button 
              onClick={() => setSelectedCourse(null)}
              style={{
                color: '#60a5fa',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                marginBottom: '1rem'
              }}
            >
              ← Back to courses
            </button>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {courses.find(c => c.id === selectedCourse)?.title}
            </h2>
            <p style={{ color: '#cbd5e1', marginBottom: '1.5rem' }}>
              {courses.find(c => c.id === selectedCourse)?.description}
            </p>
            <div style={{ backgroundColor: '#0f172a', borderRadius: '0.5rem', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>📚 Coming Soon</h3>
              <p style={{ color: '#94a3b8' }}>
                This course is under development. Check back soon for interactive lessons!
              </p>
            </div>
          </div>
        )}

        {/* Phases Tab */}
        {activeTab === 'phases' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📊 Wyckoff Phases</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {phases.map((p, i) => (
                <div
                  key={p.phase}
                  style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    display: 'flex',
                    gap: '1rem',
                    alignItems: 'center'
                  }}
                >
                  <div style={{
                    width: '3rem',
                    height: '3rem',
                    backgroundColor: '#2563eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.25rem'
                  }}>
                    {p.phase}
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 'bold' }}>{p.name}</h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Concepts Tab */}
        {activeTab === 'concepts' && (
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>📖 Key Concepts</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
              {concepts.map((c, i) => (
                <div
                  key={c.term}
                  style={{
                    backgroundColor: '#1e293b',
                    borderRadius: '0.5rem',
                    padding: '1rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                    <span style={{ 
                      backgroundColor: '#7c3aed', 
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '0.25rem',
                      fontFamily: 'monospace',
                      fontWeight: 'bold'
                    }}>
                      {c.term}
                    </span>
                    <span style={{ fontWeight: '600' }}>{c.full}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: '0.875rem' }}>{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && (
          <div style={{ maxWidth: '36rem', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>🎯 Knowledge Quiz</h2>
            
            {!showResult ? (
              <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '1.5rem' }}>
                <div style={{ marginBottom: '1rem', color: '#94a3b8', fontSize: '0.875rem' }}>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  {quizQuestions[currentQuestion].question}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {quizQuestions[currentQuestion].options.map((option, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(i)}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '1rem',
                        backgroundColor: '#334155',
                        borderRadius: '0.5rem',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3.75rem', marginBottom: '1rem' }}>
                  {score >= 2 ? '🎉' : '📚'}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                  You scored {score} out of {quizQuestions.length}
                </h3>
                <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>
                  {score >= 2 
                    ? 'Great job! You understand Wyckoff basics!' 
                    : 'Keep learning! Review the concepts and try again.'}
                </p>
                <button
                  onClick={resetQuiz}
                  style={{
                    backgroundColor: '#2563eb',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '0.5rem',
                    fontWeight: 'bold',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer'
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e293b', padding: '2rem 1rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center', color: '#94a3b8' }}>
          <p>Built for traders who want to master the markets 📈</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Based on the methodology of Richard D. Wyckoff
          </p>
        </div>
      </footer>
    </main>
  )
}
