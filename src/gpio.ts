import { delay } from "./Rotator";
export const gpioSetup = async (p: number) => {
    await delay(3000);
    console.log ("gpio SETUP " + p);
};

export const gpioOn = async (p: number) => {
    console.log ("gpio ON " + p);
};

export const gpioOff = async (p: number) => {
    console.log ("gpio OFF " + p);
};
