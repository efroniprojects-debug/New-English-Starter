class AssessmentSystem {
  constructor() {
    this.currentAssessment = null;
    this.results = [];
  }

  generateAssessment(unit, type = 'comprehensive') {
    const questions = [];
    const vocabulary = unit.vocabulary;
    
    // Multiple choice questions
    for (let i = 0; i < 5; i++) {
      const word = vocabulary[i % vocabulary.length];
      const [english, hebrew] = word.split(':');
      questions.push({
        type: 'multiple_choice',
        question: 'What does "' + english + '" mean?',
        options: [hebrew, 'Wrong1', 'Wrong2', 'Wrong3'],
        correct: 0,
        points: 10
      });
    }
    
    // Pronunciation questions
    for (let i = 0; i < 3; i++) {
      const word = vocabulary[i];
      const [english] = word.split(':');
      questions.push({
        type: 'pronunciation',
        question: 'Pronounce this word: ' + english,
        target: english,
        points: 15
      });
    }
    
    return { id: unit.id, questions: questions, passingScore: unit.assessment.passingScore };
  }
}
