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
const fs = require("fs");
const amqp = require("amqplib");
const gpio_1 = require("./gpio");
const Lights_1 = require("./Lights");
const Rotator_1 = require("./Rotator");
const q = "cl-a";
process.on("SIGINT", TheEnd);
function TheEnd() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("shutting down");
        yield Rotator_1.delay(2000);
        process.exit();
    });
}
const x = [
    { P: 1, N: "pin 1", C: 1, M: 17 },
    { P: 3, N: "pin 3", C: 1, M: 17 },
    { P: 7, N: "pin 7", C: 1, M: 17 },
    { P: 11, N: "pin 11", C: 1, M: 17 },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        fs.writeFileSync("config-colorlogic.json", JSON.stringify(x, undefined, 2));
        const lights = new Lights_1.Lights(x, gpio_1.gpioSetup, gpio_1.gpioOn, gpio_1.gpioOff);
        lights.lights[1].setColorTarget = 2;
        yield Rotator_1.delay(10000);
        console.log(JSON.stringify(lights.curState()));
        // lights[7].setColorTarget = 2;
        // lights[7].setColorTarget = 4;
        // Connect to the server and wait for the queue
        amqp.connect("amqp://localhost").then(conn => {
            conn.createChannel().then(ch => {
                ch.assertQueue(q, { durable: true });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
                ch.consume(q, msg => {
                    console.log(" --- Received %s", msg.content);
                    const c = JSON.parse(msg.content.toString());
                    if (c.newState)
                        lights.newState(c.newState);
                    //            if (c.newSwitch) Switch(c.newSwitch);
                    //            if (c.sync) SyncLights(29);
                }, {
                    noAck: true,
                });
            });
        }).catch(console.warn);
    });
}
main();
//# sourceMappingURL=server.js.map