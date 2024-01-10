import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { size_properties } from '../sizes/sizes';

const getCamera = (scene: THREE.Scene, sizer: any) => {
        const camera = new THREE.PerspectiveCamera(75, size_properties.width / size_properties.height, 0.1, 100);
        camera.position.set(0, 0, 10);
        scene.add(camera);

        sizer.on("resize", () => {
                camera.aspect = size_properties.width / size_properties.height
                camera.updateProjectionMatrix()
        });

        return camera
}

const getControls = (el: HTMLCanvasElement, camera: THREE.Camera) => {
        const orbitControls = new OrbitControls(camera, el);

        return orbitControls
}

export { getCamera, getControls }