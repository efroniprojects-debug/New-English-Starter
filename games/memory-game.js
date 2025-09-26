class AdvancedMemoryGame {
  constructor(vocabulary) {
    this.vocabulary = vocabulary;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.score = 0;
    this.gameBoard = document.getElementById('memoryGameBoard');
  }

  generateCards() {
    const pairs = this.vocabulary.slice(0, 8);
    pairs.forEach((word, index) => {
      const [english, hebrew, phonetic] = word.split(':');
      this.cards.push({ id: index * 2, type: 'english', content: english, pair: index });
      this.cards.push({ id: index * 2 + 1, type: 'hebrew', content: hebrew, pair: index });
    });
    this.cards = this.shuffleArray(this.cards);
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  start() {
    this.generateCards();
    this.renderBoard();
  }

  renderBoard() {
    this.gameBoard.innerHTML = '';
    this.cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.className = 'memory-card';
      cardElement.dataset.id = card.id;
      cardElement.innerHTML = '<div class="card-back">?</div><div class="card-front">' + card.content + '</div>';
      cardElement.addEventListener('click', () => this.flipCard(card));
      this.gameBoard.appendChild(cardElement);
    });
  }
}
