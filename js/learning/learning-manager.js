class LearningManager {
  constructor() {
    this.currentLevel = 'A';
    this.progress = this.loadProgress();
    console.log('Learning Manager initialized');
  }

  async loadUnit(unitId) {
    try {
      const level = unitId.charAt(0);
      const number = unitId.slice(1);
      const response = await fetch(`/content/${level}/unit-${number}.json`);
      return await response.json();
    } catch (error) {
      console.error('Failed to load unit:', error);
      return null;
    }
  }

  async startUnit(unitId) {
    const unit = await this.loadUnit(unitId);
    if (!unit) return null;
    console.log('Starting unit:', unit.title);
    return unit;
  }

  loadProgress() {
    const saved = localStorage.getItem('abc_progress');
    return saved ? JSON.parse(saved) : {
      completedUnits: [],
      totalScore: 0,
      level: 'A'
    };
  }
}

window.LearningManager = LearningManager;
