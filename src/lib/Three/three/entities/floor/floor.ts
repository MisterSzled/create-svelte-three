import * as THREE from 'three';

type Resources = {
        grassColorTexture: THREE.Texture;
        grassNormalTexture: THREE.Texture;
};

function createFloor(resources: Resources): THREE.Mesh {
        const textures: Record<string, THREE.Texture> = {};

        textures.color = resources.grassColorTexture;
        textures.color.colorSpace = THREE.SRGBColorSpace;
        textures.color.repeat.set(1.5, 1.5);
        textures.color.wrapS = THREE.RepeatWrapping;
        textures.color.wrapT = THREE.RepeatWrapping;

        textures.normal = resources.grassNormalTexture;
        textures.normal.repeat.set(1.5, 1.5);
        textures.normal.wrapS = THREE.RepeatWrapping;
        textures.normal.wrapT = THREE.RepeatWrapping;

        const geometry = new THREE.CircleGeometry(5, 64);

        const material = new THREE.MeshStandardMaterial({
                map: textures.color,
                normalMap: textures.normal,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI * 0.5;
        mesh.receiveShadow = true;

        return mesh;
}

export default createFloor;
