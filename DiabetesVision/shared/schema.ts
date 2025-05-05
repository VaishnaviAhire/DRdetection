import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Feedback model
export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey(),
  accuracy: text("accuracy").notNull(),
  comments: text("comments"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertFeedbackSchema = createInsertSchema(feedbacks).pick({
  accuracy: true,
  comments: true,
});

// Analysis result model
export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  prediction: text("prediction").notNull(),
  confidence: integer("confidence").notNull(),
  findings: json("findings").notNull(),
  recommendations: json("recommendations").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).pick({
  prediction: true,
  confidence: true,
  findings: true,
  recommendations: true,
});

export type InsertFeedback = z.infer<typeof insertFeedbackSchema>;
export type Feedback = typeof feedbacks.$inferSelect;

export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type AnalysisResult = typeof analysisResults.$inferSelect;

// For file upload and image processing, we'll use in-memory since
// we're demonstrating with hardcoded results
