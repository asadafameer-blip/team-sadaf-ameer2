import { db } from "./couchdb";

interface QuestionDoc {
  _id?: string;
  id?: string;
  correctAnswer: string;
  [key: string]: unknown;
}

// Function to calculate quiz score based on user responses
export async function calculateQuizScore(quizId: string, userAnswers: Record<string, string>) {
  try {
    // Fetch all questions for this quiz
    const response = await db.find({
      selector: {
        type: "question",
        quizId: quizId,
      },
    });

    const questions = response.docs as unknown as QuestionDoc[];
    let score = 0;
    const totalQuestions = questions.length;

    questions.forEach((q) => {
      const questionId = q._id || q.id;
      if (questionId && userAnswers[questionId] === q.correctAnswer) {
        score += 1;
      }
    });

    return {
      quizId,
      score,
      totalQuestions,
      percentage: totalQuestions > 0 ? (score / totalQuestions) * 100 : 0,
    };
  } catch (error) {
    console.error(`Error calculating score for quiz ${quizId}:`, error);
    throw error;
  }
}