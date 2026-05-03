/**
 * Loads, manages, and plays all game audio including music and sound effects.
 */
class AudioManager {

    /**
     * Creates an AudioManager instance with empty audio state.
     */
    constructor() {
        /** @type {Object|null} Raw audio path data loaded from JSON / Rohe Audiopfad-Daten aus JSON */
        this.allSrc = null;

        /** @type {Object.<string, HTMLAudioElement>} Flat map of all loaded audio objects */
        this.sounds = {};

        /** @type {HTMLAudioElement|null} Currently playing background music track */
        this.activeMusic = null;

        /** @type {boolean} True once audio has been started after user interaction */
        this.soundStarted = false;
    }

    /**
     * Initializes the audio system: fetches paths, loads all sounds, and starts muted.
     *
     * @async
     * @returns {Promise<void>}
     */
    async init() {
        this.allSrc = await this.fetchSoundPaths();
        await this.loadSounds();
        this.muteAll(true);
    }

    /**
     * Fetches the audio path configuration from the server.
     *
     * @async
     * @returns {Promise<Object>} Nested object of audio paths keyed by category and name
     */
    async fetchSoundPaths() {
        const response = await fetch('data/audioPaths.json');
        return response.json();
    }

    /**
     * Iterates the path config and creates an Audio element for each entry.
     * Keys are flattened to `category_name` format (e.g. `music_menu`).
     *
     * @async
     * @returns {Promise<void>}
     */
    async loadSounds() {
        for (const category in this.allSrc) {
            for (const name in this.allSrc[category]) {
                const key = `${category}_${name}`;
                this.sounds[key] = this.createSound(this.allSrc[category][name]);
            }
        }
    }

    /**
     * Creates and configures a single HTMLAudioElement for the given path.
     *
     * @param {string} soundPath - Path to the audio file
     * @param {number} [volume=1.0] - Initial volume (0.0–1.0)
     * @returns {HTMLAudioElement}
     */
    createSound(soundPath, volume = 1.0) {
        const audio = new Audio(soundPath);
        audio.volume = volume;
        audio.loop = false;
        audio.preload = 'auto';
        return audio;
    }

    /**
     * Starts background music on the first user interaction.
     * Plays the menu music when the current scene is a MenuScene.
     *
     * @param {Object} scene - The currently active scene
     * @returns {void}
     */
    startSoundOnUserInteraction(scene) {
        if (this.soundStarted) return;

        if (scene instanceof MenuScene) {
            this.playMusic('music_menu');
        }
        this.soundStarted = true;
    }

    /**
     * Stops any currently playing music and starts the requested track on loop at low volume.
     *
     * @param {string} soundName - Key of the music track (e.g. `music_menu`)
     * @returns {void}
     */
    playMusic(soundName) {
        this.stopMusic();

        const sound = this.sounds[soundName];
        sound.loop = true;
        sound.volume = 0.1;
        this.activeMusic = sound;
        this.activeMusic.play();
    }

    /**
     * Pauses and clears the currently active music track.
     *
     * @returns {void}
     */
    stopMusic() {
        if (!this.activeMusic) return;
        this.activeMusic.pause();
        this.activeMusic = null;
    }

    /**
     * Plays a sound effect without resetting the playback position.
     *
     * @param {string} soundName - Key of the sound to play
     * @returns {void}
     */
    playSound(soundName) {
        this.sounds[soundName].play();
    }

    /**
     * Plays a sound effect and resets it to the beginning first.
     * Ensures the sound always plays from the start even if already running.
     *
     * @param {string} soundName - Key of the effect sound
     * @returns {void}
     */
    playEffectSound(soundName) {
        const sound = this.sounds[soundName];
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Mutes or unmutes all registered sounds at once.
     *
     * @param {boolean} muted - True to mute, false to unmute
     * @returns {void}
     */
    muteAll(muted) {
        for (const soundName in this.sounds) {
            this.sounds[soundName].muted = muted;
        }
    }

    /**
     * Starts the casting sound effect in a loop from the beginning.
     *
     * @returns {void}
     */
    playCastingSound() {
        const sound = this.sounds['character_lightCutLoading'];
        sound.currentTime = 0;
        sound.loop = true;
        sound.play();
    }

    /**
     * Stops the casting sound effect.
     *
     * @returns {void}
     */
    stopCastingSound() {
        this.sounds['character_lightCutLoading'].pause();
    }

    /**
     * Plays the mana attack sound effect from the beginning.
     *
     * @returns {void}
     */
    playManaAttackSound() {
        const sound = this.sounds['character_lightCutThrow'];
        sound.currentTime = 0;
        sound.play();
    }

    /**
     * Stops the mana attack sound effect.
     *
     * @returns {void}
     */
    stopManaAttackSound() {
        this.sounds['character_lightCutThrow'].pause();
    }
}
