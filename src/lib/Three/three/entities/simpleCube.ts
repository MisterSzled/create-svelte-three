import * as THREE from 'three';
import testVertexShader from '../shaders/tester/vertex.glsl'
import testFragmentShader from '../shaders/tester/fragment.glsl'


const simpleCube = () => {
        const shadermaterial = new THREE.RawShaderMaterial({
                vertexShader: testVertexShader,
                fragmentShader: testFragmentShader
        })

        const geometry = new THREE.BoxGeometry(1, 1, 1)
        const material = new THREE.MeshBasicMaterial({ color: 0xff5000, wireframe: true })
        const mesh = new THREE.Mesh(geometry, shadermaterial);

        return mesh;
}

export { simpleCube }