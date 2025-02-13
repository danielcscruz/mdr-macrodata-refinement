import styles from './Navbar.module.css'


const Navbar = (progressValues) => {

    const totalProgress = progressValues.progressValues.reduce((sum, value) => sum + value, 0);

    return(

        <div className={styles.Container}>
            <div className={styles.Bar}>
                <h2>Macrodata</h2>
                <h2>{totalProgress}% Complete</h2>
                <h1>LUMON</h1>
            </div>
        </div>
        
    )
}

export default Navbar
