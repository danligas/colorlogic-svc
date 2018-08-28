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
exports.gpioSetup = (p) => __awaiter(this, void 0, void 0, function* () {
    yield Rotator_1.delay(3000);
    console.log("gpio SETUP " + p);
});
exports.gpioOn = (p) => __awaiter(this, void 0, void 0, function* () {
    console.log("gpio ON " + p);
});
exports.gpioOff = (p) => __awaiter(this, void 0, void 0, function* () {
    console.log("gpio OFF " + p);
});
//# sourceMappingURL=gpio.js.map