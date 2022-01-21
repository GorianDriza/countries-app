import styles from './SmallLoader.module.scss'

export default function SmallLoader() {
    return (
        <div className={styles.container}>
            <div className={styles.cf}>
                <div className={styles.three}>
                    <div className={styles.loader}></div>
                </div>
            </div>
        </div>
    )
}