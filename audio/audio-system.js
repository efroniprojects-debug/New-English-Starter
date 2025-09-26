class AudioSystem {
  constructor() {
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.voices = [];
    this.loadVoices();
  }

  loadVoices() {
    this.voices = speechSynthesis.getVoices();
    if (this.voices.length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
      };
    }
  }

  speak(text, lang = 'en-US', rate = 0.8) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    const voice = this.voices.find(v => v.lang.includes(lang));
    if (voice) utterance.voice = voice;
    
    speechSynthesis.speak(utterance);
    return utterance;
  }

  playWord(word, phonetic) {
    this.speak(word, 'en-US', 0.7);
    setTimeout(() => this.speak(word, 'en-US', 0.5), 1500);
  }
}

window.AudioSystem = AudioSystem;
