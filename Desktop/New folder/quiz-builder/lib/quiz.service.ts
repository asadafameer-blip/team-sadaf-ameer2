import { db } from "./couchdb";
import { CreateQuizInput } from "@/validations/quiz";

interface QuizDocument extends CreateQuizInput {
  _id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: unknown;
}

// Function to create a new quiz in CouchDB
export async function createQuiz(quizData: CreateQuizInput) {
  const quizId = `quiz:${Date.now()}`;

  const quizDocument: QuizDocument = {
    _id: quizId,
    type: "quiz",
    ...quizData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const response = await db.insert(quizDocument);

  return {
    id: response.id,
    rev: response.rev,
    ...quizDocument,
  };
}

// Function to get a quiz by ID
export async function getQuizById(quizId: string) {
  try {
    const quiz = await db.get(quizId);
    return quiz;
  } catch (error) {
    console.error(`Error fetching quiz ${quizId}:`, error);
    throw error;
  }
}