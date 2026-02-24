'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { courses, getTotalLessons } from '@/lib/courses'

export default function Home() {
  const { data: session } = useSession()
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [currentTab, setCurrentTab] = useState('overview')

  useEffect(() => {
    if (session?.user?.email) {
      fetch('/api/progress')
        .then(res => res.json())
        .then(data => {
          const completed = data.lessons?.filter((l: any) => l.completed).map((l: any) => l.lessonId) || []
          setCompletedLessons(completed)
        })
        .catch(console.error)
    }
  }, [session])

  const totalLessons = getTotalLessons()
  const completedCount = completedLessons.length
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'courses', label: 'Courses' },
    { id: 'tools', label: 'Tools' },
    { id: 'about', label: 'About' },
  ]

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <header style={{ 
        background: 'linear-gradient(to right, #1e3a8a, #581c87)', 
        padding: '2rem 1rem',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            🏛️ Wyckoff Academy
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#bfdbfe', marginBottom: '1rem' }}>
            Master the Wyckoff Trading Methodology through interactive learning
          </p>
          
          {session ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <img 
                src={session.user?.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || 'User')}&background=2563eb&color=fff`}
                alt={session.user?.name || 'User'}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <span style={{ color: '#bfdbfe' }}>Welcome, {session.user?.name}</span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#334155',
                  border: 'none',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              href="/login"
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                backgroundColor: '#2563eb',
                borderRadius: '0.5rem',
                color: 'white',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Sign In to Track Progress
            </Link>
          )}
        </div>
      </header>

      {/* Progress Bar (if logged in) */}
      {session && (
        <div style={{ backgroundColor: '#1e293b', padding: '1rem', borderBottom: '1px solid #334155' }}>
          <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Your Progress</span>
                <span style={{ fontSize: '0.875rem', color: '#60a5fa' }}>{completedCount}/{totalLessons} lessons ({progressPercent}%)</span>
              </div>
              <div style={{ height: '8px', backgroundColor: '#334155', borderRadius: '4px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    height: '100%', 
                    width: `${progressPercent}%`, 
                    backgroundColor: '#10B981',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease'
                  }} 
                />
              </div>
            </div>
            <Link 
              href="/courses"
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#10B981',
                borderRadius: '0.5rem',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: 'bold',
                textDecoration: 'none',
              }}
            >
              Continue →
            </Link>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav style={{ 
        backgroundColor: '#1e293b', 
        position: 'sticky', 
        top: 0, 
        zIndex: 10,
        borderBottom: '1px solid #334155'
      }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', display: 'flex', gap: '0.5rem', padding: '0.5rem', overflowX: 'auto' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                fontWeight: '500',
                backgroundColor: currentTab === tab.id ? '#2563eb' : 'transparent',
                color: currentTab === tab.id ? 'white' : '#cbd5e1',
                border: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div style={{ maxWidth: '56rem', margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Overview Tab */}
        {currentTab === 'overview' && (
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
              <Link href="/tools/chart" style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📈</div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Live Chart</h3>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Interactive Wyckoff chart with markers</p>
                </div>
              </Link>
              
              <Link href="/schematics" style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📊</div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Schematics</h3>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Wyckoff accumulation & distribution patterns</p>
                </div>
              </Link>
              
              <Link href="/courses" style={{ textDecoration: 'none' }}>
                <div style={{
                  backgroundColor: '#1e293b',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                  border: '1px solid #334155',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📚</div>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Courses</h3>
                  <p style={{ fontSize: '0.875rem', color: '#94a3b8' }}>Structured learning paths</p>
                </div>
              </Link>
            </div>

            {/* Phases Quick Ref */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>📊 Wyckoff Phases Quick Reference</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
                {[
                  { phase: 'A', name: 'Stop Trend', color: '#3B82F6' },
                  { phase: 'B', name: 'Build Cause', color: '#8B5CF6' },
                  { phase: 'C', name: 'Test', color: '#F59E0B' },
                  { phase: 'D', name: 'Launch', color: '#10B981' },
                  { phase: 'E', name: 'New Trend', color: '#22C55E' },
                ].map(p => (
                  <div key={p.phase} style={{ textAlign: 'center', padding: '0.75rem', backgroundColor: '#0f172a', borderRadius: '0.5rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: p.color }}>{p.phase}</div>
                    <div style={{ fontSize: '0.875rem', color: '#94a3b8' }}>{p.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Concepts */}
            <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>🔑 Key Concepts</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
                {[
                  { term: 'CO', full: 'Composite Operator', desc: 'Institutional smart money' },
                  { term: 'SC', full: 'Selling Climax', desc: 'Extreme low with high volume' },
                  { term: 'Spring', full: 'Spring', desc: 'Test of support before breakout' },
                  { term: 'SOS', full: 'Sign of Strength', desc: 'Breakout confirming accumulation' },
                  { term: 'LPS', full: 'Last Point of Support', desc: 'Final buying opportunity' },
                  { term: 'BC', full: 'Buying Climax', desc: 'Extreme high with high volume' },
                ].map(c => (
                  <div key={c.term} style={{ padding: '0.75rem', backgroundColor: '#0f172a', borderRadius: '0.5rem' }}>
                    <span style={{ backgroundColor: '#7c3aed', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontWeight: 'bold', marginRight: '0.5rem' }}>
                      {c.term}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>{c.full}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Courses Tab */}
        {currentTab === 'courses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
            {courses.map(course => {
              const courseLessons = course.lessons.length
              const courseCompleted = completedLessons.filter(id => id.startsWith(course.id)).length
              return (
                <Link key={course.id} href={`/courses/${course.id}`} style={{ textDecoration: 'none' }}>
                  <div
                    style={{
                      backgroundColor: '#1e293b',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      border: '1px solid #334155',
                      cursor: 'pointer',
                      transition: 'transform 0.2s, border-color 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)'
                      e.currentTarget.style.borderColor = course.color
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.borderColor = '#334155'
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{course.icon}</div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{course.title}</h3>
                    <p style={{ color: '#94a3b8', marginBottom: '1rem', fontSize: '0.875rem' }}>{course.description}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.875rem', backgroundColor: '#334155', padding: '0.25rem 0.75rem', borderRadius: '9999px' }}>
                        {courseLessons} lessons
                      </span>
                      {session && courseCompleted > 0 && (
                        <span style={{ fontSize: '0.75rem', color: '#10B981' }}>
                          {courseCompleted}/{courseLessons} ✓
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {/* Tools Tab */}
        {currentTab === 'tools' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            <Link href="/tools/chart" style={{ textDecoration: 'none' }}>
              <div style={{
                backgroundColor: '#1e293b',
                borderRadius: '0.75rem',
                padding: '2rem',
                border: '1px solid #334155',
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📈</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Interactive Chart</h3>
                <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
                  Live candlestick chart with Wyckoff markers. Place SC, Spring, SOS, BC, UTAD and more directly on the chart.
                </p>
                <ul style={{ fontSize: '0.875rem', color: '#94a3b8', listStyle: 'disc', paddingLeft: '1.5rem' }}>
                  <li>Real-time data from Binance</li>
                  <li>Multiple timeframes (1m to 1D)</li>
                  <li>Drag & drop Wyckoff markers</li>
                  <li>Auto-detect accumulation/distribution</li>
                </ul>
              </div>
            </Link>

            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '0.75rem',
              padding: '2rem',
              border: '1px solid #334155',
              opacity: 0.6,
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Quiz (Coming Soon)</h3>
              <p style={{ color: '#94a3b8' }}>
                Test your knowledge with interactive quizzes.
              </p>
            </div>

            <div style={{
              backgroundColor: '#1e293b',
              borderRadius: '0.75rem',
              padding: '2rem',
              border: '1px solid #334155',
              opacity: 0.6,
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📊</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Trading Journal (Coming Soon)</h3>
              <p style={{ color: '#94a3b8' }}>
                Track your trades and analyze your performance.
              </p>
            </div>
          </div>
        )}

        {/* About Tab */}
        {currentTab === 'about' && (
          <div style={{ backgroundColor: '#1e293b', borderRadius: '0.75rem', padding: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>About Wyckoff Academy</h2>
            <p style={{ color: '#cbd5e1', marginBottom: '1rem', lineHeight: '1.6' }}>
              Wyckoff Academy is an interactive learning platform for mastering the Wyckoff Trading Methodology. 
              Developed by Richard D. Wyckoff in the early 20th century, this methodology focuses on understanding 
              the actions of institutional money and using that knowledge to anticipate price movements.
            </p>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', marginTop: '1.5rem' }}>What You'll Learn</h3>
            <ul style={{ color: '#94a3b8', listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
              <li>How to identify smart money accumulation and distribution patterns</li>
              <li>Reading price and volume to anticipate market movements</li>
              <li>The five phases of the Wyckoff cycle</li>
              <li>Entry and exit strategies using Wyckoff principles</li>
              <li>Trading psychology and discipline</li>
            </ul>
            <p style={{ color: '#64748b', marginTop: '1.5rem', fontSize: '0.875rem' }}>
              Built for traders who want to understand the markets from the institutional perspective.
            </p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1e293b', padding: '2rem 1rem', marginTop: '3rem' }}>
        <div style={{ maxWidth: '56rem', margin: '0 auto', textAlign: 'center', color: '#94a3b8' }}>
          <p>📈 Built for traders who want to master the markets</p>
          <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
            Based on the methodology of Richard D. Wyckoff
          </p>
        </div>
      </footer>
    </main>
  )
}
