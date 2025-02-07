import styles from './Boxes.module.css'


const Boxes = () => {

    return(

        <div className={styles.Container}>
            <div className={styles.BoxContainer}>
                <div className={styles.Box}>
                    <h2>1</h2>
                </div>
                <div className={styles.Bar}>
                    <h4>0%</h4>
                </div>
            </div>
            <div className={styles.BoxContainer}>
                <div className={styles.Box}>
                    <h2>2</h2>
                </div>
                <div className={styles.Bar}>
                    <h4>0%</h4>
                </div>
            </div>
            <div className={styles.BoxContainer}>
                <div className={styles.Box}>
                    <h2>3</h2>
                </div>
                <div className={styles.Bar}>
                    <h4>0%</h4>
                </div>
            </div>
            <div className={styles.BoxContainer}>
                <div className={styles.Box}>
                    <h2>4</h2>
                </div>
                <div className={styles.Bar}>
                    <h4>0%</h4>
                </div>
            </div>
        </div>
        
    )
}

export default Boxes
