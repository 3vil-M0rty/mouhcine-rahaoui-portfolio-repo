import PropTypes from "prop-types";
import styles from './Card.module.css';

function Card({ source = "noartwork.jpg", alt = "empty-artwork", cardName = "unnamed", cardYear = 0, id = -1 }) {
    return (
        <div className={`${styles.Card} card-${id} acard`}>
            <img className={styles.CardImage} src={source} alt={alt} />
            <span className={styles.CardInfo}>
                <h2 className={styles.CardName}>{cardName}</h2>
                <span className={styles.CardYear}>{cardYear}</span>
            </span>
        </div>
    );
}

Card.propTypes = {
    source: PropTypes.string,
    alt: PropTypes.string,
    cardName: PropTypes.string,
    cardYear: PropTypes.number,
    id: PropTypes.number,
};

export default Card;
