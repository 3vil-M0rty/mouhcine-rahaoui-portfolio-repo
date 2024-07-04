import { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import styles from './3DGallery.module.css';
import {threedGallery} from '../CustomJS/3dGallery.js'

function THREEDGallery() {
    useEffect(()=> {
        threedGallery();
    },[]);

    return (
        <>
            <div className={styles.bgMenu}>
                <div className={styles.menu} id="menu">
                    <div className={styles.imgContainer}>
                        <img src="../src/assets/artworks/3d-gallery-bg.png" alt="" />
                    </div>
                    <div className={styles.content}>
                        <h1>Art Gallery</h1>
                        <div>
                            <p>interactive gallery</p>
                            <p>made with love</p>
                        </div>
                        <div>
                            <p>instructions</p>
                            <p>arrow keys</p>
                            <p>look around with mouse</p>
                        </div>
                        <div className={styles.playButton} id="pButton">
                            <p>Enter the gallery</p>
                        </div>
                    </div>
                </div>

                <div className={styles.threedcanvasContainer} >
                    <canvas id="3dgallery" className={styles.canvas}></canvas>
                </div>
            </div>
        </>
    )

}

export default THREEDGallery