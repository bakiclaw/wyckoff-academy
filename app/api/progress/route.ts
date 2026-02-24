import { auth } from "@/auth"
import { NextResponse } from "next/server"
import { updateLessonProgress, getUserProgress, saveQuizScore } from "@/lib/progress"

export async function POST(request: Request) {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.email
  const body = await request.json()
  const { lessonId, completed, quizId, quizScore } = body

  if (lessonId) {
    const progress = updateLessonProgress(userId, lessonId, completed)
    return NextResponse.json(progress)
  }

  if (quizId && quizScore !== undefined) {
    const progress = saveQuizScore(userId, quizId, quizScore)
    return NextResponse.json(progress)
  }

  return NextResponse.json({ error: "Invalid request" }, { status: 400 })
}

export async function GET() {
  const session = await auth()
  
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const userId = session.user.email
  const progress = getUserProgress(userId)
  return NextResponse.json(progress)
}
