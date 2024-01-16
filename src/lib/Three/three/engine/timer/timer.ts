import { createEventEmitter } from "../eventEmitter/eventEmitter";

const getTimer = (window: Window) => {
        let baseEmitter = createEventEmitter();

        let start = Date.now();
        let current = start;
        let elapsed = 0;
        let delta = 16;

        const tick = () => {
                const currentTime = Date.now();
                delta = currentTime - current;
                current = currentTime;
                elapsed = current - start;

                baseEmitter.emit('tick');

                window.requestAnimationFrame(() => {
                        tick()
                });
        }

        window.requestAnimationFrame(() => {
                tick()
        });

        return {
                ...baseEmitter,
                delta
        }
}

export { getTimer }