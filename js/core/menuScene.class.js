class MenuScene {
    constructor(game) {
        this.game = game;
        this.background;
        this.backgroundMobile = new Image();
        this.backgroundMobile.src = "./assets/images/menu/background_mobile.png";
        this.backgroundDesktop = new Image();
        this.backgroundDesktop.src = "./assets/images/menu/background_desktop.png";
    }

    init() {
        const sceneLayout = document.getElementById('sceneLayout');
        sceneLayout.innerHTML = this.menuTemp();
        this.updateOverlay();
    }

    update() {}

    render(ctx) {
        ctx.drawImage(
            this.background, 0, 0,
            this.game.canvas.width,
            this.game.canvas.height
        );
    }

    updateOverlay() {
        this.checkBackground();
        this.checkButtons();
    }

    checkBackground() {
        if (document.fullscreenElement) {
            this.background = this.backgroundMobile;
        } else {
            this.background = this.backgroundDesktop;
        }
    }

    checkButtons() {
        this.displayScreenStatus();
        this.displaySoundStatus();
    }
    
    displayScreenStatus() {
        const fullscreenBtn = document.getElementById('fullscreenBtn');
        if (document.fullscreenElement) {
            fullscreenBtn.innerText = "Vollbild verlassen";
        } else {
            fullscreenBtn.innerText = "Vollbild";
        }
    }

    displaySoundStatus(mute = this.game.mute) {
        const soundBtn = document.getElementById('soundBtn');
        if (mute) {
            soundBtn.innerText = "Sound OFF";
            soundBtn.setAttribute("aria-pressed", "true");
        } else {
            soundBtn.innerText = "Sound ON";
            soundBtn.setAttribute("aria-pressed", "false");
        }
    }

    menuTemp() {
        return /*html*/`
            <h2 class="mobile-h2">Legend of Eilish</h2>

            <form id="startForm" onsubmit="GAME.newGame(); return false;">
                
                <input id="playerName" type="text" placeholder="Spieler" maxlength="15"/>

                <button class="menu-btn" id="startBtn" type="submit" aria-label="Spiel starten">
                Spiel starten
                </button>

                <button class="menu-btn" id="soundBtn" type="button" onpointerdown="GAME.toggleSound()" aria-pressed="false" aria-label="Sound on">
                Sound OFF
                </button>

                <button id="fullscreenBtn" class="menu-btn" onpointerdown="toggleFullscreen()" type="button" aria-label="fullscreen">
                Vollbild
                </button>
            </form>

            <a class="impressum-btn" href="impressum.html" target="_blank" aria-label="Impressum öffnen">Impressum</a>
        `
    }
}
