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
exports.delay = (ms) => new Promise(res => setTimeout(res, ms));
class Rotator {
    constructor(pin, name, maxDial, turnOn, turnOff) {
        this.pin = pin;
        this.name = name;
        this.maxDial = maxDial;
        this.turnOn = turnOn;
        this.turnOff = turnOff;
        this.curState = () => ({ P: this.pin, N: this.name, C: this.color, M: this.maxDial });
        this.color = 1;
        this.colorTarget = 1;
        this.Travel();
        console.log(name);
    }
    off() {
        this.colorTarget = this.color;
    }
    set setColorTarget(target) {
        console.log("pin " + this.name + " set to " + target);
        this.colorTarget = target;
    }
    Travel() {
        return __awaiter(this, void 0, void 0, function* () {
            while (true) {
                while (this.color !== this.colorTarget) {
                    console.log("PIN:" + this.pin + " " + this.color + " -> " + this.colorTarget);
                    yield exports.delay(1000);
                    this.turnOff(this.pin);
                    yield exports.delay(1000);
                    this.turnOn(this.pin);
                    if (this.color !== this.colorTarget) {
                        this.color %= this.maxDial;
                        this.color++;
                    }
                }
                yield exports.delay(5000);
            }
        });
    }
}
exports.Rotator = Rotator;
//# sourceMappingURL=Rotator.js.map