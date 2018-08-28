export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
export class Rotator {
  private color: number;
  private colorTarget: number;
  constructor(
      private pin: number,
      private name: string,
      private maxDial: number,
      private turnOn: ((pin: number) => void),
      private turnOff: ((pin: number) => void)) {
    this.color = 1;
    this.colorTarget = 1;
    this.Travel();
    console.log(name);
  }
  public off() {
    this.colorTarget = this.color;
  }

  public curState = () => ({P: this.pin, N: this.name, C: this.color, M: this.maxDial});

  set setColorTarget(target: number) {
    console.log("pin " + this.name + " set to " + target);
    this.colorTarget = target;
  }
  private async Travel() {
    while (true) {
      while (this.color !== this.colorTarget) {
        console.log("PIN:" + this.pin + " " + this.color + " -> " + this.colorTarget);
        await delay(1000);
        this.turnOff(this.pin);
        await delay(1000);
        this.turnOn(this.pin);
        if (this.color !== this.colorTarget) {
          this.color %= this.maxDial;
          this.color++;
        }
      }
      await delay(5000);
    }
  }
}
