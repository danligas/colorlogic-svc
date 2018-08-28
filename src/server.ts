import fs = require("fs");
import * as amqp from "amqplib";
import { gpioOff, gpioOn, gpioSetup } from "./gpio";
import { Lights } from "./Lights";
import { delay, Rotator } from "./Rotator";

const q = "cl-a";

process.on("SIGINT", TheEnd);

async function TheEnd() {
  console.log("shutting down");
  await delay(2000);
  process.exit();
}

const x = [
  {P: 1, N: "pin 1", C: 1, M: 17},
  {P: 3, N: "pin 3", C: 1, M: 17},
  {P: 7, N: "pin 7", C: 1, M: 17},
  {P: 11, N: "pin 11", C: 1, M: 17},
];

async function main() {
  fs.writeFileSync("config-colorlogic.json", JSON.stringify(x, undefined, 2));
  const lights: Lights​ = new Lights(x, gpioSetup, gpioOn, gpioOff);

  lights.lights[1].setColorTarget = 2;
  await delay(10000);
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
            if (c.newState) lights.newState(c.newState);
//            if (c.newSwitch) Switch(c.newSwitch);
//            if (c.sync) SyncLights(29);
      }, {
          noAck: true,
      });
    });
}).catch(console.warn);
}

main();
