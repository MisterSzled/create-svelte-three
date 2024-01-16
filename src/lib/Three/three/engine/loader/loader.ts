import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { createEventEmitter } from '../eventEmitter/eventEmitter';

import sources from "./sources/index";

let manager = new THREE.LoadingManager();

const GLTF_Loader = new GLTFLoader(manager);
const Texture_Loader = new THREE.TextureLoader(manager);
const CubeTexture_Loader = new THREE.CubeTextureLoader(manager);

const getLoader = (): any => {
        let baseLoader = createEventEmitter();
        let resources = {}

        const loadBundle = (resourceBundleName: string) => {
                manager.onStart = function (url, itemsLoaded, itemsTotal) {
                        console.log('Started loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
                };

                manager.onLoad = function () {
                        console.log('Loading complete!');
                };

                manager.onProgress = function (url, itemsLoaded, itemsTotal) {
                        console.log('Loading file: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.');
                };

                manager.onError = function (url) {
                        console.log('There was an error loading ' + url);
                };

                load(resourceBundleName);
        }

        async function load(resourceBundleName: string,) {
                resources[resourceBundleName] = {}

                let bundle_to_load = sources[resourceBundleName];

                const loadPromises = bundle_to_load.map((source) => {
                        return new Promise<void>((resolve) => {
                                if (source.type === 'gltfModel') {
                                        GLTF_Loader.load(source.path as string, (file) => {
                                                resources[resourceBundleName][source.name] = file;
                                                resolve();
                                        });
                                } else if (source.type === 'texture') {
                                        const path = Array.isArray(source.path) ? source.path[0] : source.path;
                                        Texture_Loader.load(path, (file) => {
                                                resources[resourceBundleName][source.name] = file;
                                                resolve();
                                        });
                                } else if (source.type === 'cubeTexture') {
                                        const path = Array.isArray(source.path) ? source.path : [source.path];
                                        CubeTexture_Loader.load(path, (file) => {
                                                resources[resourceBundleName][source.name] = file;
                                                resolve();
                                        });
                                }
                        });
                });

                await Promise.all(loadPromises);
                resources[resourceBundleName]["ready"] = true;
                baseLoader.emit("loaded", "main")
        }

        return {
                ...baseLoader,
                resources,
                load(resourceBundleName: string) {
                        loadBundle(resourceBundleName);
                },
        };
};



export { getLoader }