import * as THREE from 'three'

const simpleCube = (info?: any) => {
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0xff5000, wireframe: true })
        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
}

export { simpleCube }