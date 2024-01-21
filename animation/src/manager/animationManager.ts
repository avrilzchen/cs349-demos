import { Animator } from "./animator";

export * from "./animator";

class AnimationManager {
  protected animations: Animator[] = [];

  add(animation: Animator) {
    this.animations.push(animation);
    // TODO: should have more flexible way to start animation
    animation.start(performance.now());
  }

  update(time: number) {
    if (this.animations.length === 0) return;
    console.log(`updating ${this.animations.length} animations`);
    // update every animation currently running
    this.animations.forEach((a) => a.update(time));

    // remove any animations that finished
    this.animations = this.animations.filter((a) => a.isRunning);
  }
}

// create the singleton
export const animationManager = new AnimationManager();
