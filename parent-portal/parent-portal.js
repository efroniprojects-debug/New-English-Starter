class ParentPortal {
  constructor() {
    this.analytics = new AdvancedAnalytics();
    this.childId = null;
  }

  initializePortal(parentId, childId) {
    this.parentId = parentId;
    this.childId = childId;
    this.loadChildProgress();
    this.renderPortal();
  }

  generateParentReport() {
    const studentReport = this.analytics.generateStudentReport(this.childId);
    
    return {
      childProgress: {
        totalTime: Math.round(studentReport.totalTime / 60) + ' שעות למידה השבוע',
        unitsCompleted: studentReport.unitsCompleted + ' יחידות הושלמו',
        averageScore: Math.round(studentReport.averageScore) + '% ציון ממוצע',
        streak: this.calculateLearningStreak() + ' ימים רצופים'
      },
      achievements: this.getRecentAchievements(),
      parentTips: this.generateParentTips(studentReport),
      upcomingGoals: this.suggestUpcomingGoals(studentReport)
    };
  }
}
