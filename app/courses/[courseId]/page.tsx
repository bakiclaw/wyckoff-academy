'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { courses, getCourseById, getLessonById } from '@/lib/courses'

export default function CoursePage() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const courseId = params.courseId as string
  const course = getCourseById(courseId)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null)

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

  const handleMarkComplete = async (lessonId: string, completed: boolean) => {
    if (!session) {
      router.push('/login')
      return
    }
    
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed }),
      })
      
      if (res.ok) {
        if (completed) {
          setCompletedLessons(prev => [...prev, lessonId])
        } else {
          setCompletedLessons(prev => prev.filter(id => id !== lessonId))
        }
      }
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Course not found</h1>
          <Link href="/" style={{ color: '#60a5fa' }}>← Back to Home</Link>
        </div>
      </div>
    )
  }

  const selectedLesson = selectedLessonId ? getLessonById(selectedLessonId) : null

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: 'white' }}>
      {/* Header */}
      <header style={{ 
        background: course.color + '22', 
        borderBottom: `1px solid ${course.color}44`,
        padding: '1.5rem'
      }}>
        <div style={{ maxWidth: '72rem', margin: '0 auto' }}>
          <Link href="/" style={{ color: '#60a5fa', fontSize: '0.875rem' }}>
            ← Back to Courses
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
            <span style={{ fontSize: '2.5rem' }}>{course.icon}</span>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>{course.title}</h1>
              <p style={{ color: '#94a3b8' }}>{course.description}</p>
            </div>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '72rem', margin: '0 auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '0', minHeight: 'calc(100vh - 200px)' }}>
        
        {/* Sidebar - Lessons List */}
        <aside style={{ backgroundColor: '#1e293b', borderRight: '1px solid #334155', overflow: 'auto' }}>
          <div style={{ padding: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              📚 Lessons ({course.lessons.length})
            </h2>
            
            {!session && (
              <div style={{ padding: '1rem', backgroundColor: '#2563eb22', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                <p style={{ fontSize: '0.875rem', color: '#60a5fa' }}>
                  <Link href="/login" style={{ color: '#60a5fa', textDecoration: 'underline' }}>Sign in</Link> to track your progress
                </p>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {course.lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(lesson.id)
                const isSelected = selectedLessonId === lesson.id
                
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setSelectedLessonId(lesson.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.75rem',
                      backgroundColor: isSelected ? course.color + '33' : 'transparent',
                      border: 'none',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <div style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: isCompleted ? '#10B981' : '#334155',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      flexShrink: 0,
                    }}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: isSelected ? 'bold' : 'normal', fontSize: '0.875rem' }}>
                        {lesson.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {lesson.description}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Main Content - Lesson Content */}
        <div style={{ padding: '2rem', overflow: 'auto' }}>
          {selectedLesson ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                    {selectedLesson.title}
                  </h2>
                  <p style={{ color: '#94a3b8' }}>{selectedLesson.description}</p>
                </div>
                <button
                  onClick={() => handleMarkComplete(selectedLesson.id, !completedLessons.includes(selectedLesson.id))}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: completedLessons.includes(selectedLesson.id) ? '#10B981' : '#334155',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: '500',
                  }}
                >
                  {completedLessons.includes(selectedLesson.id) ? '✓ Completed' : 'Mark Complete'}
                </button>
              </div>

              {/* Lesson Content */}
              <div style={{ 
                backgroundColor: '#1e293b', 
                borderRadius: '0.75rem', 
                padding: '2rem',
                lineHeight: '1.8',
                color: '#cbd5e1'
              }}>
                {selectedLesson.content.split('\n').map((line, i) => {
                  if (line.startsWith('# ')) {
                    return <h1 key={i} style={{ fontSize: '1.75rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '1rem', color: 'white' }}>{line.slice(2)}</h1>
                  }
                  if (line.startsWith('## ')) {
                    return <h2 key={i} style={{ fontSize: '1.5rem', fontWeight: 'bold', marginTop: '1.5rem', marginBottom: '0.75rem', color: 'white' }}>{line.slice(3)}</h2>
                  }
                  if (line.startsWith('### ')) {
                    return <h3 key={i} style={{ fontSize: '1.25rem', fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem', color: course.color }}>{line.slice(4)}</h3>
                  }
                  if (line.startsWith('- ')) {
                    return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line.slice(2)}</li>
                  }
                  if (line.match(/^\d+\. /)) {
                    return <li key={i} style={{ marginLeft: '1.5rem', marginBottom: '0.25rem' }}>{line.replace(/^\d+\. /, '')}</li>
                  }
                  if (line.trim() === '') {
                    return <br key={i} />
                  }
                  return <p key={i} style={{ marginBottom: '0.5rem' }}>{line}</p>
                })}
              </div>

              {/* Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                <button
                  onClick={() => {
                    const currentIndex = course.lessons.findIndex(l => l.id === selectedLesson.id)
                    if (currentIndex > 0) {
                      setSelectedLessonId(course.lessons[currentIndex - 1].id)
                    }
                  }}
                  disabled={course.lessons.findIndex(l => l.id === selectedLesson.id) === 0}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#334155',
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    opacity: course.lessons.findIndex(l => l.id === selectedLesson.id) === 0 ? 0.5 : 1,
                  }}
                >
                  ← Previous
                </button>
                <button
                  onClick={() => {
                    const currentIndex = course.lessons.findIndex(l => l.id === selectedLesson.id)
                    if (currentIndex < course.lessons.length - 1) {
                      setSelectedLessonId(course.lessons[currentIndex + 1].id)
                    }
                  }}
                  disabled={course.lessons.findIndex(l => l.id === selectedLesson.id) === course.lessons.length - 1}
                  style={{
                    padding: '0.75rem 1.5rem',
                    backgroundColor: course.color,
                    border: 'none',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                    opacity: course.lessons.findIndex(l => l.id === selectedLesson.id) === course.lessons.length - 1 ? 0.5 : 1,
                  }}
                >
                  Next →
                </button>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#94a3b8' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👈</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem', color: 'white' }}>
                Select a lesson
              </h2>
              <p>Choose a lesson from the sidebar to start learning</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
