import styles from './Loader.module.scss'

export default function Loader() {
    return (
        <div className={styles.container}>
            <div className={styles.loader}>
                <div className={styles.loaderDot}></div>
                <div className={styles.loaderDot}></div>
                <div className={styles.loaderDot}></div>
                <div className={styles.loaderDot}></div>
                <div className={styles.loaderDot}></div>
                <div className={styles.loaderDot}></div>
                <div className={styles.loaderText}></div>
            </div>
        </div>
    )
}