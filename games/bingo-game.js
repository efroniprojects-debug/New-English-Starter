class AdvancedBingoGame {
  constructor(vocabulary) {
    this.vocabulary = vocabulary;
    this.board = [];
    this.calledWords = [];
    this.playerBoard = [];
    this.audioSystem = new AudioSystem();
  }

  generateBoard() {
    const shuffled = this.shuffleArray([...this.vocabulary]);
    for (let i = 0; i < 25; i++) {
      const word = shuffled[i % shuffled.length];
      const [english, hebrew] = word.split(':');
      this.board.push({ english, hebrew, called: false, marked: false });
    }
    this.board[12] = { english: 'FREE', hebrew: 'חינם', called: true, marked: true };
  }

  callWord() {
    const availableWords = this.board.filter(w => !w.called && w.english !== 'FREE');
    if (availableWords.length === 0) return null;
    
    const randomWord = availableWords[Math.floor(Math.random() * availableWords.length)];
    randomWord.called = true;
    this.calledWords.push(randomWord);
    
    this.audioSystem.speak(randomWord.english);
    return randomWord;
  }
}
