import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export const threedGallery = () => {
    const canvas = document.getElementById('3dgallery');
    const scene = new THREE.Scene();
    const sizes = {
        width: window.innerWidth,
        height: window.innerHeight,
    };

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
    scene.add(camera);
    camera.position.set(0, 8, 10);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 1);
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0x404040, 1.0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // SpotLight
    const spotLight = new THREE.SpotLight(0xff0000, 22);
    spotLight.position.set(0, 8, 2);
    spotLight.castShadow = true;
    spotLight.angle = Math.PI / 6;
    spotLight.penumbra = 0.5;
    scene.add(spotLight);

    const spotLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(spotLightHelper);

    // PointLight
    const pointLight = new THREE.PointLight(0x4caf50, 12.5);
    pointLight.position.set(-10, 4, -10);
    pointLight.castShadow = true;
    scene.add(pointLight);

    const pointLightHelper = new THREE.PointLightHelper(pointLight, 1);
    scene.add(pointLightHelper);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 8, 0);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);

    const floorGeometry = new THREE.PlaneGeometry(45, 45);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: "black",
        side: THREE.DoubleSide
    });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = Math.PI / 2;
    floor.position.y = -2;
    floor.receiveShadow = true;
    scene.add(floor);

    const walls = new THREE.Group();
    scene.add(walls);

    const wallMaterial = new THREE.MeshStandardMaterial({ color: 'white' });

    const frontWall = new THREE.Mesh(new THREE.BoxGeometry(45, 20, 0.001), wallMaterial);
    frontWall.position.z = -22.5;
    frontWall.position.y = 8;
    walls.add(frontWall);

    const backWall = new THREE.Mesh(new THREE.BoxGeometry(45, 20, 0.001), wallMaterial);
    backWall.position.z = 22.5;
    backWall.position.y = 8;
    walls.add(backWall);

    const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.001, 20, 45), wallMaterial);
    leftWall.position.x = -22.5;
    leftWall.position.y = 8;
    walls.add(leftWall);

    const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.001, 20, 45), wallMaterial);
    rightWall.position.x = 22.5;
    rightWall.position.y = 8;
    walls.add(rightWall);

    const ceiling = new THREE.Mesh(floorGeometry, floorMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = 18;
    ceiling.receiveShadow = true;
    scene.add(ceiling);

    function Paintings(source, height, width, position) {
        const textureLoader = new THREE.TextureLoader();
        const paintingTexture = textureLoader.load(source);
        const paintingMaterial = new THREE.MeshBasicMaterial({
            map: paintingTexture,
        });
        paintingMaterial.map.minFilter = THREE.LinearFilter;
        const paintingGeometry = new THREE.PlaneGeometry(width, height);
        const painting = new THREE.Mesh(paintingGeometry, paintingMaterial);
        painting.position.set(position.x, position.y, position.z);
        return painting;
    }

    const painting1 = Paintings("../src/assets/artworks/noire7.png", 10, 10, new THREE.Vector3(-17.5, 13.5, -22.49));
    const painting2 = Paintings("../src/assets/artworks/audela.png", 10, 10, new THREE.Vector3(-17.5, 2, -22.49));
    const painting3 = Paintings("../src/assets/artworks/fragments.png", 10, 10, new THREE.Vector3(-7.5, 13.5, -22.49));
    scene.add(painting3)
    scene.add(painting1);
    scene.add(painting2);

    const onResize = () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onResize);

    const controls = new PointerLockControls(camera, canvas);
    function startExperience() {
        controls.lock();
        hideMenu();

        canvas.setAttribute('tabindex', '0');
        canvas.focus();
        canvas.addEventListener("keydown", onKeyDown)
    }

    const playButton = document.getElementById("pButton");
    playButton.addEventListener("click", startExperience);

    function hideMenu() {
        const menu = document.getElementById("menu")
        menu.style.display = 'none';
        console.log("hein? its clicked!!!!")
    }
    function showMenu() {
        const menu = document.getElementById("menu")
        menu.style.display = 'flex';
    }

    const onKeyDown = (e) => {
        const keycode = e.keyCode || e.which;
        const key = e.key;

        switch (key) {
            case 'd':
                controls.moveRight(0.5)
                break;
            case 'q':
                controls.moveRight(-0.5)
                break;
            case 'z':
                controls.moveForward(-0.5);
                break;
            case 's':
                controls.moveForward(0.5);
                break;
            case 'Escape':
                showMenu();
                controls.unlock();
            default:
                break;
        }
    };

    let frameId
    function animate() {
        frameId = requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
        renderer.render(scene, camera);
    }
    animate();
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
};
