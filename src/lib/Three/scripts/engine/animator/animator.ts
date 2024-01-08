function getAnimator(timer: any, renderer: any, scene: any, camera: any) {
        renderer.render(scene, camera);
        timer.on("tick", () => {
                animate(renderer, scene, camera)
        })
}


function animate(renderer: any, scene: any, camera: any) {
        renderer.render(scene, camera);
}

export { getAnimator };
