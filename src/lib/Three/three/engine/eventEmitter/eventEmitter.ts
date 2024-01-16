interface EventEmitter {
        on(event: string, listener: (...args: any[]) => void): void;
        emit(event: string, ...args: any[]): void;
        getEventCount(event: string): number;
        off(event: string): void;
}

const createEventEmitter = (): EventEmitter => {
        const events: Record<string, ((...args: any[]) => void)[]> = {};

        return {
                on(event, listener) {
                        if (!events[event]) {
                                events[event] = [];
                        }
                        events[event].push(listener);
                },
                emit(event, ...args) {
                        if (events[event]) {
                                for (const listener of events[event]) {
                                        listener(...args);
                                }
                        }
                },
                getEventCount(event) {
                        return events[event] ? events[event].length : 0;
                },
                off(event) {
                        delete events[event];
                },
        };
};

export { createEventEmitter };
