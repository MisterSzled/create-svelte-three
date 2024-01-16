<script>
        import { browser } from "$app/environment";
        import { onMount } from "svelte";
        import { createScene } from "./three/index.ts";

        let el;

        onMount(() => {
                createScene(el, window);
        });
</script>

<div class="flex w-full h-full flex-col">
        <!-- <section
                class="min-h-[100vh] text-white z-10 flex justify-center items-center pointer-events-none"
        >
                Top Layer
        </section> -->
        <canvas bind:this={el} class="w-[100vw] h-[100vh] fixed top-0 left-0" />
</div>
