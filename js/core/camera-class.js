/**
 * Handles horizontal camera movement for a 2D game.
 */
class Camera {
  /**
   * Creates a new Camera instance.
   * @param {number} mapEndX - Maximum left camera position (usually negative).
   * @param {number} characterOffset - Default offset from the character to the camera view.
   * @param {number} viewWidth - Width of the visible game area (canvas width).
   */
  constructor(mapEndX = -3440, characterOffset = 100, viewWidth = 600) {
    /** @type {number} Current camera X position */
    this.cameraX = 0;

    /** @type {number} Maximum negative camera position (end of map) */
    this.mapEndX = mapEndX;

    /** @type {number} Offset for positioning character within the view */
    this.characterOffset = characterOffset;

    /** @type {number} Width of the camera view */
    this.viewWidth = viewWidth;

    /** @type {number} Maximum distance for boss to be considered "in view" */
    this.bossViewDistance = 400;
  }

  /**
   * Updates the camera position based on the character and (optionally) boss positions.
   * @param {number} characterX - The character's current X position.
   * @param {?number} [bossX=null] - The boss's current X position (optional).
   */
  update(characterX, bossX = null) {
    const bossInView = bossX !== null && Math.abs(bossX - characterX) < this.bossViewDistance;

    if (bossInView) {
      const midpoint = (characterX + bossX) / 2;
      this.cameraX = -midpoint + this.viewWidth / 2;
    } else {
      const offset = characterX < bossX
        ? this.characterOffset
        : this.viewWidth - this.characterOffset;

      this.cameraX = -characterX + offset;
    }

    // Clamp camera to the map's left boundary
    if (this.cameraX < this.mapEndX) {
      this.cameraX = this.mapEndX;
    }
  }

  /**
   * Returns the current camera X position.
   * @returns {number} The current X position of the camera.
   */
  getX() {
    return this.cameraX;
  }
}
