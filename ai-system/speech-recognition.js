class AIRecognitionSystem {
  constructor() {
    this.recognition = null;
    this.isListening = false;
    this.confidence = 0;
    this.setupRecognition();
  }

  setupRecognition() {
    if ('webkitSpeechRecognition' in window) {
      this.recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
      this.recognition = new SpeechRecognition();
    }
    
    if (this.recognition) {
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      this.recognition.maxAlternatives = 3;
    }
  }

  startListening(targetWord, callback) {
    if (!this.recognition) {
      callback({ success: false, error: 'Speech recognition not supported' });
      return;
    }
    
    this.isListening = true;
    
    this.recognition.onresult = (event) => {
      const result = event.results[0][0];
      const spoken = result.transcript.toLowerCase().trim();
      const target = targetWord.toLowerCase().trim();
      const confidence = result.confidence;
      
      const similarity = this.calculateSimilarity(spoken, target);
      const score = (similarity * 0.7) + (confidence * 0.3);
      
      callback({
        success: true,
        spoken: spoken,
        target: target,
        similarity: similarity,
        confidence: confidence,
        score: score,
        rating: this.getRating(score)
      });
      
      this.isListening = false;
    };
    
    this.recognition.start();
  }

  calculateSimilarity(str1, str2) {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    if (longer.length === 0) return 1.0;
    return (longer.length - this.editDistance(longer, shorter)) / longer.length;
  }

  getRating(score) {
    if (score >= 0.9) return 'מצוין! 🌟';
    if (score >= 0.8) return 'טוב מאוד! 👍';
    if (score >= 0.7) return 'טוב! 😊';
    if (score >= 0.6) return 'לא רע! 🙂';
    return 'נסה שוב! 💪';
  }
}

window.AIRecognitionSystem = AIRecognitionSystem;
