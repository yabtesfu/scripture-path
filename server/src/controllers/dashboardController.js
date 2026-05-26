const dashboardSeed = {
  dateLabel: 'Ordinary Time',
  planName: 'Sermon on the Mount',
  day: 18,
  totalDays: 40,
  streak: 12,
  completedReadings: 18,
  totalReadings: 40,
  passageRef: 'Matthew 5:1-12',
  reflectionPrompt: 'Where is the kingdom quietly arriving in your ordinary day?',
  nextReading: {
    title: 'Salt and Light',
    reference: 'Matthew 5:13-16',
    estimate: '7 min'
  }
};

export async function getDashboard(_req, res) {
  res.json(dashboardSeed);
}
