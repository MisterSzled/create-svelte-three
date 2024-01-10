import * as THREE from 'three';
import { getCamera, getControls } from './engine/camera/camera';
import { getSizer } from './engine/sizes/sizes';
import { getRenderer } from "./engine/renderer/renderer";
import { getTimer } from "./engine/timer/timer";
import { getLoader } from "./engine/loader/loader";
import GUI from 'lil-gui';
import { getAnimator } from './engine/animator/animator';

import floor from './entities/floor/floor';
import fox from './entities/fox/fox';
import { configureEnvironment } from "./entities/environment/environment";

const createScene = (canvas: HTMLCanvasElement, window: Window) => {
        // Setup
        let timer = getTimer(window);
        let sizer = getSizer(window);

        let scene = new THREE.Scene();
        let renderer = getRenderer(canvas, sizer);

        // Assets
        let loader = getLoader();
        loader.load("main")

        // DX
        const gui = new GUI();

        // Camera
        let camera = getCamera(scene, sizer);
        let controls = getControls(canvas, camera);

        const axesHelper = new THREE.AxesHelper(5);
        scene.add(axesHelper);

        let animator = getAnimator(timer, renderer, scene, camera);

        loader.on("loaded", (args) => {
                console.log("Loaded: ", args)

                // Bundle 1 / "main"
                configureEnvironment(scene, loader.resources["main"], gui);
                scene.add(floor(loader.resources["main"]))
                scene.add(fox(loader.resources["main"], timer, gui))
        });

        const destroy = () => {
                sizer.off('resize')
                timer.off('tick')

                scene.traverse((child) => {
                        if (child instanceof THREE.Mesh) {
                                child.geometry.dispose()

                                for (const key in child.material) {
                                        const value = child.material[key]

                                        if (value && typeof value.dispose === 'function') {
                                                value.dispose()
                                        }
                                }
                        }
                })

                controls.dispose()
                renderer.dispose()

                gui.destroy()
        }
};

export { createScene };