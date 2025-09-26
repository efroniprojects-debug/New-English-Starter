class ProgressTracker {
  constructor() {
    this.studentId = this.getStudentId();
    this.sessions = [];
  }

  trackActivity(activity, result) {
    const record = {
      timestamp: Date.now(),
      activity: activity,
      score: result.score,
      accuracy: result.accuracy
    };
    this.sessions.push(record);
    this.saveProgress();
  }

  generateReport() {
    const totalUnits = this.sessions.length;
    const totalScore = this.sessions.reduce((sum, s) => sum + s.score, 0);
    const avgAccuracy = this.sessions.reduce((sum, s) => sum + s.accuracy, 0) / totalUnits;
    return {
      totalUnits: totalUnits,
      totalScore: totalScore,
      accuracy: Math.round(avgAccuracy * 100)
    };
  }

  getStudentId() {
    let id = localStorage.getItem('abc_student_id');
    if (!id) {
      id = 'student_' + Date.now();
      localStorage.setItem('abc_student_id', id);
    }
    return id;
  }

  saveProgress() {
    localStorage.setItem('abc_sessions', JSON.stringify(this.sessions));
  }
}

window.ProgressTracker = ProgressTracker;
