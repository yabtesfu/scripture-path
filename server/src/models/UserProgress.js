import mongoose from 'mongoose';

const completedReadingSchema = new mongoose.Schema(
  {
    plan: { type: mongoose.Schema.Types.ObjectId, ref: 'ReadingPlan', required: true },
    day: { type: Number, required: true },
    completedAt: { type: Date, default: Date.now },
    note: { type: String, default: '' }
  },
  { _id: false }
);

const userProgressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, index: true },
    currentPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'ReadingPlan' },
    streak: { type: Number, default: 0 },
    completedReadings: [completedReadingSchema]
  },
  { timestamps: true }
);

export const UserProgress = mongoose.model('UserProgress', userProgressSchema);
