import { ReadingPlan } from '../models/ReadingPlan.js';

const fallbackPlans = [
  {
    id: 'sermon-on-the-mount',
    title: 'Sermon on the Mount',
    description: 'A forty-day walk through Matthew 5-7.',
    durationDays: 40,
    category: 'Gospels'
  },
  {
    id: 'psalms-of-ascent',
    title: 'Psalms of Ascent',
    description: 'Fifteen songs for pilgrimage, prayer, and return.',
    durationDays: 15,
    category: 'Psalms'
  }
];

export async function listPlans(_req, res, next) {
  try {
    if (ReadingPlan.db.readyState !== 1) {
      res.json(fallbackPlans);
      return;
    }

    const plans = await ReadingPlan.find().sort({ createdAt: -1 }).lean();
    res.json(plans);
  } catch (error) {
    next(error);
  }
}
