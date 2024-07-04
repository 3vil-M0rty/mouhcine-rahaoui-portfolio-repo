
import styles from './Artwork.module.css'
function Artwork({source= "image.png", alt= "", name ="unnamed", details ="", dimensions = ""}) {
    return (
        <div className={styles.zoomImgContainer}>
            <img src={source} alt={alt} className={styles.zoomImg} />
            <span className={styles.zoomImgInfo}>
                <span className={styles.zoomImgTitle}>{name}</span><br />
                <span className={styles.zoomImgDetail}>
                    {details}
                </span>
                <span className={styles.zoomImgawSize}>{dimensions}</span>
            </span>
        </div>
    )
}

export default Artwork