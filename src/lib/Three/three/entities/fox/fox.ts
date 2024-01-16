import * as THREE from 'three';

type Resources = {
        foxModel: {
                animations: THREE.AnimationClip[];
                scene: THREE.Group;
        };
};

type Timer = {
        on: (event: string, listener: () => void) => void;
        delta: number;
};

type Debug = {
        addFolder: (name: string) => any;
};

function fox(resources: Resources, timer: Timer, debug: Debug): THREE.Group {
        const foxFolder = debug.addFolder('fox');

        const model = resources.foxModel.scene;
        model.scale.set(0.02, 0.02, 0.02);

        model.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                        child.castShadow = true;
                }
        });

        const getAnimation = () => {
                const animation: any = {};

                animation.mixer = new THREE.AnimationMixer(model);

                animation.actions = {};

                animation.actions.idle = animation.mixer.clipAction(resources.foxModel.animations[0]);
                animation.actions.walking = animation.mixer.clipAction(resources.foxModel.animations[1]);
                animation.actions.running = animation.mixer.clipAction(resources.foxModel.animations[2]);

                animation.actions.current = animation.actions.idle;
                animation.actions.current.play();

                animation.play = (name: string) => {
                        const newAction = animation.actions[name];
                        const oldAction = animation.actions.current;

                        newAction.reset();
                        newAction.play();
                        newAction.crossFadeFrom(oldAction, 1);

                        animation.actions.current = newAction;
                };

                const debugObject = {
                        playIdle: () => {
                                animation.play('idle');
                        },
                        playWalking: () => {
                                animation.play('walking');
                        },
                        playRunning: () => {
                                animation.play('running');
                        },
                };

                foxFolder.add(debugObject, 'playIdle');
                foxFolder.add(debugObject, 'playWalking');
                foxFolder.add(debugObject, 'playRunning');

                return animation;
        };

        const animation = getAnimation();

        const update = () => {
                animation.mixer.update(timer.delta * 0.001);
        };

        timer.on("tick", () => {
                update();
        });

        return model;
}

export default fox;


