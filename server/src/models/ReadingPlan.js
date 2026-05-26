import mongoose from 'mongoose';

const readingSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    reference: { type: String, required: true },
    estimatedMinutes: { type: Number, default: 7 },
    prompt: { type: String, default: '' }
  },
  { _id: false }
);

const readingPlanSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    durationDays: { type: Number, required: true },
    category: { type: String, default: 'Devotional' },
    readings: [readingSchema]
  },
  { timestamps: true }
);

export const ReadingPlan = mongoose.model('ReadingPlan', readingPlanSchema);
