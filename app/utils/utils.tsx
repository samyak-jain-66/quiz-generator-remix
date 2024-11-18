import fs from "fs/promises";

export type WidgetData = {
  id: number;
  name: string;
  type: string;
  render: string; 
  props?: Record<string, any>;
};

type QuizData = {
  [quizId: string]: WidgetData[];
};

export async function loadQuizData(): Promise<QuizData> {
  try {
    const data = await fs.readFile("quiz.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading quiz data:", error);
    return {}; 
  }
}

// Save the quiz data back to the JSON file
export async function saveQuizData(data: QuizData): Promise<void> {
  try {
    await fs.writeFile("quiz.json", JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Error writing quiz data:", error);
  }
}