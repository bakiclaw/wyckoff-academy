import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const PROGRESS_FILE = path.join(DATA_DIR, 'progress.json')

interface LessonProgress {
  lessonId: string
  completed: boolean
  completedAt?: string
}

interface UserProgress {
  [userId: string]: {
    lessons: LessonProgress[]
    quizScores: { [quizId: string]: number }
    lastUpdated: string
  }
}

function ensureDataFile(): UserProgress {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  if (!fs.existsSync(PROGRESS_FILE)) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify({}))
  }
  const data = fs.readFileSync(PROGRESS_FILE, 'utf-8')
  return JSON.parse(data)
}

function saveData(data: UserProgress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2))
}

export function getUserProgress(userId: string) {
  const data = ensureDataFile()
  if (!data[userId]) {
    data[userId] = {
      lessons: [],
      quizScores: {},
      lastUpdated: new Date().toISOString()
    }
    saveData(data)
  }
  return data[userId]
}

export function updateLessonProgress(userId: string, lessonId: string, completed: boolean) {
  const data = ensureDataFile()
  if (!data[userId]) {
    data[userId] = {
      lessons: [],
      quizScores: {},
      lastUpdated: new Date().toISOString()
    }
  }
  
  const existingIndex = data[userId].lessons.findIndex(l => l.lessonId === lessonId)
  const lessonProgress: LessonProgress = {
    lessonId,
    completed,
    completedAt: completed ? new Date().toISOString() : undefined
  }
  
  if (existingIndex >= 0) {
    data[userId].lessons[existingIndex] = lessonProgress
  } else {
    data[userId].lessons.push(lessonProgress)
  }
  
  data[userId].lastUpdated = new Date().toISOString()
  saveData(data)
  return data[userId]
}

export function saveQuizScore(userId: string, quizId: string, score: number) {
  const data = ensureDataFile()
  if (!data[userId]) {
    data[userId] = {
      lessons: [],
      quizScores: {},
      lastUpdated: new Date().toISOString()
    }
  }
  
  data[userId].quizScores[quizId] = score
  data[userId].lastUpdated = new Date().toISOString()
  saveData(data)
  return data[userId]
}

export function getCompletedLessons(userId: string): string[] {
  const progress = getUserProgress(userId)
  return progress.lessons
    .filter(l => l.completed)
    .map(l => l.lessonId)
}
