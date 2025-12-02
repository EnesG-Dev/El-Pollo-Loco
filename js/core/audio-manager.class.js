class AudioManager {

    constructor() {
        this.allSrc = null;
        this.sounds = {};
        this.activeMusic = null;
        this.soundStartet = false;
    }

    async init() {
        this.allSrc = await this.responseSoundSrc();
        await this.loadSounds();
        this.muteAll(true);

    }

    async responseSoundSrc() {
        const response = await fetch('data/audioPaths.json');
        const paths = await response.json();
        console.log(paths);// löschen
        return paths;
    }

    async loadSounds() {
        for (const category in this.allSrc) {
            for (const name in this.allSrc[category]) {

                const audioName = `${category}_${name}`;
                const src = this.allSrc[category][name];
                // const src = this.allSrc[category][name][0]; für rsc
                // const volume = this.allSrc[category][name][1]; für lautschärkeeinstellung

                this.sounds[audioName] = this.createSounds(src);
            }
        }
    }

    createSounds(soundPath, volume = 1.0) {
        const a = new Audio(soundPath);
        a.volume = volume;
        a.loop = false;
        a.preload = 'auto';
        return a;
    }

    startSoundOnUserInteraction() {
        if (!this.soundStartet) {
            this.playMusic('music_menu');
            this.soundStartet = true;
        }
    }

    playMusic(soundName) {
        const sound = this.sounds[soundName];
        sound.loop = true;
        sound.volume = 0.1;
        this.activeMusic = sound;
        this.activeMusic.play();
    }
    
    playSound(soundName) {
        const sound = this.sounds[soundName];

        // sound.currentTime = 0; 
        sound.play();
    }

    muteAll(muted) {
        for (const soundName in this.sounds) {
            this.sounds[soundName].muted = muted;
        }
    }
}
