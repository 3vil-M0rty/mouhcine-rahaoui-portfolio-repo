import styles from './MouseTrail.module.css';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleDot, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function MouseTrail() {
    const [currentIcon, setCurrentIcon] = useState(faCircleDot);
    useEffect(() => {
        const cards = document.querySelectorAll(`.acard`)
        cards.forEach((card) => {
            card.addEventListener('mouseenter', () => {
                setCurrentIcon(faMagnifyingGlass);
            })
            card.addEventListener('mouseleave', () => {
                setCurrentIcon(faCircleDot)
            })
        })
        const coordinates = { x: 0, y: 0 };
        const circle = document.querySelector(`.${styles.circle}`);

        const handleMouseMove = (e) => {
            coordinates.x = e.clientX;
            coordinates.y = e.clientY;
            circle.style.left = `${coordinates.x - 12}px`;
            circle.style.top = `${coordinates.y - 12}px`;
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    return (
        <>
            <FontAwesomeIcon className={`${styles.circle} ${currentIcon === faMagnifyingGlass ? styles.blackIcon : styles.whiteIcon}`} icon={currentIcon} />
        </>
    );
}

export default MouseTrail