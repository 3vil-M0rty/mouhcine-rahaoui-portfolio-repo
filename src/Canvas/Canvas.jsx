import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import styles from './Canvas.module.css';

function Canvas({canvasID = 0}) {
    useEffect(() => {
        const canvas = document.getElementById('skullCanvas');
        const container = document.querySelector(`.${canvasID == 0 ? styles.canvasContainer1 : styles.canvasContainer2}`);
        const scene = new THREE.Scene();
        const gltfloader = new GLTFLoader();
        let loadedSkull;
        let frameId;

        gltfloader.load('../src/assets/3dModels/skull/scene.gltf', (gltfScene) => {
            loadedSkull = gltfScene;
            setSkullScale();
            gltfScene.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material.color.setHex(0xffffff);
                    child.material.wireframe = true;
                    child.material.metalness = 0.5;
                    child.material.roughness = 0.05;
                    child.material.opacity = 1;
                    child.material.needsUpdate = true;
                }
            });
            gltfScene.castShadow = true;
            scene.add(gltfScene.scene);
        });

        const ambientLight = new THREE.AmbientLight(0x000, 50);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 10);
        directionalLight.position.set(-1, -1, 1);
        scene.add(directionalLight);



        /* const directionalLight2 = new THREE.DirectionalLight(0x000, 10);
        directionalLight2.position.set(-25, 25, 25);
        scene.add(directionalLight2); */

        const pointLight = new THREE.PointLight(0xffbf00, 1, 10);
        pointLight.position.x = 0.2;
        pointLight.castShadow = true;
        pointLight.shadow.mapSize.width = 4096;
        pointLight.shadow.mapSize.height = 4096;
        scene.add(pointLight);

        const pointLight2 = new THREE.PointLight(0xffbf00, 1, 10);
        pointLight2.position.x = -0.4;
        pointLight2.castShadow = true;
        pointLight2.shadow.mapSize.width = 4096;
        pointLight2.shadow.mapSize.height = 4096;
        scene.add(pointLight2);

        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 1000);
        camera.position.set(0, 0, 5);
        scene.add(camera);



        const renderer = new THREE.WebGLRenderer({
            canvas: canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        function setSkullScale() {
            if (loadedSkull) {
                const scaleFactor = window.innerWidth < 750 ? 0.3 : 1;
                const yPosition = window.innerWidth < 750 ? 1 : 0;
                loadedSkull.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
                loadedSkull.scene.position.y = yPosition;
            }
        }

        const onResize = () => {
            sizes.width = window.innerWidth;
            sizes.height = window.innerHeight;
            camera.aspect = sizes.width / sizes.height;
            camera.updateProjectionMatrix();
            renderer.setSize(sizes.width, sizes.height);
            setSkullScale();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.render(scene, camera)
        };

        window.addEventListener('resize', onResize);

        function skullScroll() {
            const scrollY = window.scrollY;
            if (loadedSkull) {
                const scaleinit = window.innerWidth < 750 ? 0.3 : 1;
                let scaleFactor = scaleinit + Math.log(scrollY + 1) * 0.03; // Logarithmic growth
                scaleFactor = Math.max(scaleFactor, scaleinit);
                loadedSkull.scene.scale.set(scaleFactor, scaleFactor, scaleFactor);
                loadedSkull.scene.position.x = -scrollY * 0.005;

                loadedSkull.scene.traverse((child) => {
                    if (child.isMesh) {
                        const normalizedScroll = Math.min(scrollY / 1000, 1); // Normalize scroll position
                        child.material.metalness = 0.5 + normalizedScroll * 0.5; // From 0.5 to 1
                        child.material.roughness = 0.05 + normalizedScroll * 0.45; // From 0.05 to 0.5
                        child.material.opacity = 1 - normalizedScroll * 0.5; // From 1 to 0.5
                        child.material.needsUpdate = true;
                    }
                });
            }

        }
        if (canvasID == 0){
            window.addEventListener("scroll", skullScroll);
        }

        let rotationDirection = -0.0003;
        /*         
                let sphereposition = 0.016;
                function setSpherePosition() {
                    sphereposition = -sphereposition;
                    setTimeout(setSpherePosition, 4000);
                }
         *//* 
               setTimeout(setSpherePosition, 4000); */
        const animate = () => {
            frameId = requestAnimationFrame(animate);
            /* sphere.position.x += sphereposition; */
            if (loadedSkull) {
                loadedSkull.scene.rotation.x += rotationDirection;
                loadedSkull.scene.rotation.y += rotationDirection;
            }
            renderer.render(scene, camera);
        };

        animate();

        document.addEventListener('mousemove', function (e) {
            let mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            let mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
            directionalLight.position.set(mouseX * 20, mouseY * 10, 5);
/*             sphere.position.set(mouseX * 3, mouseY * 1.2, 0);
 */        });

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onResize);
            scene.traverse((object) => {
                if (object.isMesh) {
                    object.geometry.dispose();
                    if (object.material.isMaterial) {
                        object.material.dispose();
                    } else {
                        for (const material of object.material) {
                            material.dispose();
                        }
                    }
                }
            });
            renderer.dispose();
        };
    }, []);

    return (
        <div className={canvasID == 0 ? styles.canvasContainer1 : styles.canvasContainer2} >
            <canvas id="skullCanvas" className={styles.canvas}></canvas>
        </div>
    );
}

export default Canvas;
