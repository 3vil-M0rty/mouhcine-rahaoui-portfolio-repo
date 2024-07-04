import PropTypes from "prop-types";
import styles from './Gallery.module.css';
import Artwork from "../Artwork/Artwork";
import { useEffect, useRef } from "react";
import styles2 from '../Artwork/Artwork.module.css'

function Gallery({ slideDirection = "left" }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const images = containerRef.current.querySelectorAll(`.${styles2.zoomImgContainer}`);
        let totalWidth = 0;
        let windowHeight = window.innerHeight;
        images.forEach((image, index) => {
            const style = window.getComputedStyle(image);
            const width = image.offsetWidth; // Get the width of the element
            const marginLeft = parseFloat(style.marginLeft);
            const marginRight = parseFloat(style.marginRight);
            totalWidth += width;

        });
        const scrollSection = containerRef.current;
        let start = null;
        const startHeight = 330 * window.innerHeight / 100; // 120vh
        const endHeight = 830 * window.innerHeight / 100; // 500vh
        const totalScrollRange = endHeight - startHeight;


        const step = (timestamp) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;

            const currentScroll = window.scrollY;

            if (currentScroll >= startHeight && currentScroll <= (endHeight - windowHeight /* here this might change on resize */)) {
                const progress = (currentScroll - startHeight) / totalScrollRange;
                const translateX = - totalWidth * progress;
                scrollSection.style.transform = `translateX(${translateX}px)`;
            }

            requestAnimationFrame(step);
        };

        requestAnimationFrame(step);

    }, []);
    return (
        <div className={styles.zoomParent} id='sect2'>
            <div className={styles.zoomContainer}>
                <div ref={containerRef} className={(slideDirection === "left") ? styles.scrollSectionLeft : styles.scrollSectionRight}>
                    <Artwork source="../src/assets/artworks/solidaire1.png" alt="solidaire 1" name="SOLIDAIRE, 2024"
                        details="Mixed media (coal, resin, wax, candles and glue) on canvas mounted on panel"
                        dimensions="150x150 cm / 59x59 in"
                    />
                    <Artwork source="../src/assets/artworks/solidaire3.png" alt="solidaire 3" name="SOLIDAIRE, 2023"
                        details="Mixed media (coal, resin, wax, ashes, candles and glue) on canvas mounted on panel"
                        dimensions="150x150 cm / 59x59 in"
                    />

                    <Artwork
                        source="../src/assets/artworks/obscure1.png"
                        alt=""
                        name="LUMIÈRE OBSCURE 1, 2023"
                        details="Mixed media (coal, resin, wax and glue) on canvas mounted on panel"
                        dimensions="100x100 cm / 39x39 in"
                    />
                    <Artwork
                        source="../src/assets/artworks/noire7.png"
                        alt=""
                        name="LUMIÈRE NOIRE VII, 2023"
                        details="Mixed media (coal, resin, wax and glue) on canvas mounted on panel"
                        dimensions="150x150 cm / 59x59 in"
                    />

                    <Artwork
                        source="../src/assets/artworks/audela.png"
                        alt=""
                        name="L’AU-DELÀ, 2024"
                        details="Coal and glue on canvas mounted on panel"
                        dimensions="100x100 cm / 39x39 in"
                    />

                    <Artwork
                        source="../src/assets/artworks/artwork7.jpg"
                        alt=""
                        details=""
                        dimensions=""
                    />
                    <Artwork
                        source="../src/assets/artworks/artwork1.jpg"
                        alt=""
                        name="L’MINA, 2024"
                        details="Mixed media (resin, coal, plastic coal bag, wax, candles, rope and glue) on canvas mounted on panel"
                        dimensions="150x150 cm / 59x59 in"
                    />

                    <Artwork
                        source="../src/assets/artworks/artwork6.jpg"
                        alt=""
                        details=""
                        dimensions=""
                    />

                    <Artwork
                        source="../src/assets/artworks/artwork2.jpg"
                        alt=""
                        name="VIEW OF INSTALLATION L’MINA, 2024"
                        details=""
                        dimensions="Variable Dimensions"
                    />

                </div>
            </div>
        </div>
    )
}

Gallery.propTypes = {
    slideDirection: PropTypes.string
};

export default Gallery