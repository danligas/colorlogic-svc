"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Rotator_1 = require("./Rotator");
class Lights {
    constructor(pins, gpioSetup, gpioOn, gpioOff) {
        this.lights = {};
        this.setup(pins, gpioOn, gpioOff, gpioSetup);
    }
    newState(pins) {
        for (const pin of pins) {
            console.log("Got pin %s.", pin.P.toString());
            if (!this.lights[pin.P]) {
                console.log("Bad pin %s.", pin.P);
            }
            this.lights[pin.P.toString()].setColorTarget = pin.C;
        }
    }
    curState() {
        return Object.keys(this.lights).map(e => (this.lights[e].curState()));
    }
    setup(pins, gpioOn, gpioOff, gpioSetup) {
        return __awaiter(this, void 0, void 0, function* () {
            const Ps = pins.map((pin) => {
                this.lights[pin.P] = new Rotator_1.Rotator(pin.P, pin.N, pin.M, gpioOn, gpioOff);
                return gpioSetup(pin.P);
            });
            yield Promise.all(Ps);
            console.log(JSON.stringify(Ps));
        });
    }
}
exports.Lights = Lights;
//# sourceMappingURL=Lights.js.map