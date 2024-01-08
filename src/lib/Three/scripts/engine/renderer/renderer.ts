import * as THREE from 'three';
import { size_properties } from '../sizes/sizes';

const getRenderer = (canvas: HTMLCanvasElement, sizer: any) => {
        let renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
        renderer.setSize(size_properties.width, size_properties.height);
        renderer.setPixelRatio(size_properties.pixelRatio);

        sizer.on("resize", () => {
                renderer.setSize(size_properties.width, size_properties.height);
                renderer.setPixelRatio(size_properties.pixelRatio);
        });

        return renderer;
}

export { getRenderer }