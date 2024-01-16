function getAnimator(timer: any, renderer: any, scene: any, camera: any, stats: any) {
        renderer.render(scene, camera);
        timer.on("tick", () => {
                stats.begin();
                animate(renderer, scene, camera);
                stats.end()
        })
}


function animate(renderer: any, scene: any, camera: any) {
        renderer.render(scene, camera);
}

export { getAnimator };
