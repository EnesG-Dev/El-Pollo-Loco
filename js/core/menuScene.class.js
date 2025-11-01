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
    }

    update() {
        if (document.fullscreenElement) {
            this.background = this.backgroundMobile;
        } else {
            this.background = this.backgroundDesktop;
        }
    }

    render(ctx) {
        ctx.drawImage(
            this.background, 0, 0,
            this.game.canvas.width,
            this.game.canvas.height
        );
    }

    menuTemp() {
        return /*html*/`
            <h2 class="mobile-h2">Legend of Eilish</h2>

            <form id="startForm" onsubmit="GAME.playNewGame(); return false;">
                
                <input id="playerName" type="text" placeholder="Spieler" maxlength="15"/>

                <button class="menu-btn" id="startBtn" type="submit" aria-label="Spiel starten">
                Spiel starten
                </button>

                <button class="menu-btn" id="soundBtn" type="button" aria-pressed="false" aria-label="Sound on/off">
                Sound ON
                </button>

                <button class="menu-btn" onpointerdown="toggleFullscreen()" type="button" aria-label="fullscreen">
                Vollbild
                </button>
            </form>

            <a class="impressum-btn" href="impressum.html" target="_blank" aria-label="Impressum öffnen">Impressum</a>
        `
    }
}
