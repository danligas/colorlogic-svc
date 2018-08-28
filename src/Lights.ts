import { Rotator } from "./Rotator";

export class Lights {
    public lights: {[key: string]: Rotator} = {};

    constructor(pins: Array<{ P: number; N: string; M: number}>,
                gpioSetup: (p: number) => Promise<void>,
                gpioOn: (p: number) => Promise<void>,
                gpioOff: (p: number) => Promise<void>) {
        this.setup(pins, gpioOn, gpioOff, gpioSetup);
    }

    public newState(pins: Array<{ P: number; C: number; }>) {
        for (const pin of pins) {
            console.log("Got pin %s.", pin.P.toString());
            if (!this.lights[pin.P]) {
                console.log("Bad pin %s.", pin.P);
            }
            this.lights​​[pin.P.toString()].setColorTarget = pin.C;
        }
    }

    public curState() {
        return Object.keys(this.lights).map(e => (this.lights[e].curState()));
    }

    private async setup(
        pins: Array<{ P: number; N: string; M: number; }>,
        gpioOn: (p: number) => Promise<void>,
        gpioOff: (p: number) => Promise<void>,
        gpioSetup: (p: number) => Promise<void>) {
            const Ps = pins.map((pin) => {
                this.lights[pin.P] = new Rotator(pin.P, pin.N, pin.M, gpioOn, gpioOff);
                return gpioSetup(pin.P);
            });
            await Promise.all(Ps);
            console.log(JSON.stringify(Ps));
    }

}
