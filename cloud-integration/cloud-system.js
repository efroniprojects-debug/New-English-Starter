class CloudIntegrationSystem {
  constructor() {
    this.apiEndpoint = 'https://api.abc-english-explorer.com';
    this.syncQueue = [];
    this.offlineStorage = new OfflineStorageManager();
    this.isOnline = navigator.onLine;
    this.setupNetworkMonitoring();
  }

  setupNetworkMonitoring() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.syncOfflineData();
    });
    
    window.addEventListener('offline', () => {
      this.isOnline = false;
    });
  }

  async saveProgress(studentId, progressData) {
    if (this.isOnline) {
      try {
        const response = await fetch(this.apiEndpoint + '/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ studentId, progressData })
        });
        return await response.json();
      } catch (error) {
        this.offlineStorage.queueForSync('progress', { studentId, progressData });
        return { success: false, queued: true };
      }
    } else {
      this.offlineStorage.saveLocally('progress', { studentId, progressData });
      this.offlineStorage.queueForSync('progress', { studentId, progressData });
      return { success: true, offline: true };
    }
  }

  async loadProgress(studentId) {
    if (this.isOnline) {
      try {
        const response = await fetch(this.apiEndpoint + '/progress/' + studentId);
        const cloudData = await response.json();
        const localData = this.offlineStorage.loadLocally('progress', studentId);
        return this.mergeProgressData(cloudData, localData);
      } catch (error) {
        return this.offlineStorage.loadLocally('progress', studentId);
      }
    } else {
      return this.offlineStorage.loadLocally('progress', studentId);
    }
  }
}
