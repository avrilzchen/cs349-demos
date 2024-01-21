const lerp = (start: number, end: number, t: number) =>
  start + (end - start) * t;

// very simple keyframe object
export type KeyFrame = {
  time: number;
  targetValue: number;
};

// simple keyframing animation object
export class KeyFramer {
  constructor(
    public keyframes: KeyFrame[],
    public updateValue: (p: number) => void
  ) {}

  update(time: number) {
    // find active keyframe segment
    let i = 0;
    while (
      i < this.keyframes.length &&
      this.keyframes[i].time < time
    ) {
      i++;
    }

    // all keyframes finished
    if (i == this.keyframes.length) return;

    // this is the keyframe interval time is in
    const k1 = this.keyframes[i - 1];
    const k2 = this.keyframes[i];

    // time fraction
    let t = Math.min(1, (time - k1.time) / (k2.time - k1.time));

    // log the current state
    console.log(
      `${Math.round(time)}, interval kf ${i - 1} (${
        k1.time
      }ms) to kf ${i} (${k2.time}ms) t ${Math.round(t * 100) / 100}`
    );

    // calculate the current animation state
    let p = lerp(k1.targetValue, k2.targetValue, t);

    // send result to callback
    this.updateValue(p);
  }
}
