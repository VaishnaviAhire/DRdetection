import { 
  feedbacks, 
  type Feedback, 
  type InsertFeedback,
  analysisResults,
  type AnalysisResult,
  type InsertAnalysisResult
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // Feedback operations
  saveFeedback(feedback: InsertFeedback): Promise<Feedback>;
  getAllFeedbacks(): Promise<Feedback[]>;

  // Analysis results operations
  saveAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisResult(id: number): Promise<AnalysisResult | undefined>;
  getLatestAnalysisResults(limit: number): Promise<AnalysisResult[]>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private feedbacks: Map<number, Feedback>;
  private analysisResults: Map<number, AnalysisResult>;
  private feedbackId: number;
  private analysisId: number;

  constructor() {
    this.feedbacks = new Map();
    this.analysisResults = new Map();
    this.feedbackId = 1;
    this.analysisId = 1;
  }

  // Feedback operations
  async saveFeedback(feedback: InsertFeedback): Promise<Feedback> {
    const id = this.feedbackId++;
    const newFeedback: Feedback = { 
      id, 
      ...feedback, 
      createdAt: new Date() 
    };
    this.feedbacks.set(id, newFeedback);
    return newFeedback;
  }

  async getAllFeedbacks(): Promise<Feedback[]> {
    return Array.from(this.feedbacks.values());
  }

  // Analysis results operations
  async saveAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult> {
    const id = this.analysisId++;
    const newResult: AnalysisResult = { 
      id, 
      ...result, 
      createdAt: new Date() 
    };
    this.analysisResults.set(id, newResult);
    return newResult;
  }

  async getAnalysisResult(id: number): Promise<AnalysisResult | undefined> {
    return this.analysisResults.get(id);
  }

  async getLatestAnalysisResults(limit: number): Promise<AnalysisResult[]> {
    return Array.from(this.analysisResults.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
