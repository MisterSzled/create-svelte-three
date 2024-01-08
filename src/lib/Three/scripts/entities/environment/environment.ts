import * as THREE from 'three';

type Resources = {
        environmentMapTexture: THREE.CubeTexture;
};

type Debug = {
        addFolder: (name: string) => any;
};

function configureEnvironment(scene: THREE.Scene, resources: Resources, debug: Debug) {
        const envFolder = debug.addFolder('environment');

        const sunLight = new THREE.DirectionalLight('#ffffff', 4);
        sunLight.castShadow = true;
        sunLight.shadow.camera.far = 15;
        sunLight.shadow.mapSize.set(1024, 1024);
        sunLight.shadow.normalBias = 0.05;
        sunLight.position.set(3.5, 2, -1.25);
        scene.add(sunLight);

        // Debug
        envFolder.add(sunLight, 'intensity')
                .name('sunLightIntensity')
                .min(0)
                .max(10)
                .step(0.001);

        envFolder.add(sunLight.position, 'x')
                .name('sunLightX')
                .min(-5)
                .max(5)
                .step(0.001);

        envFolder.add(sunLight.position, 'y')
                .name('sunLightY')
                .min(-5)
                .max(5)
                .step(0.001);

        envFolder.add(sunLight.position, 'z')
                .name('sunLightZ')
                .min(-5)
                .max(5)
                .step(0.001);

        const environmentMap = {
                intensity: 0.4,
                texture: resources.environmentMapTexture,
                updateMaterials: () => {
                        scene.traverse((child) => {
                                if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                                        child.material.envMap = environmentMap.texture;
                                        child.material.envMapIntensity = environmentMap.intensity;
                                        child.material.needsUpdate = true;
                                }
                        });
                }
        };

        scene.environment = environmentMap.texture;
        environmentMap.updateMaterials();

        envFolder.add(environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(environmentMap.updateMaterials);
}

export { configureEnvironment };
