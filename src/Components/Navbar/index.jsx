import styles from './Navbar.module.css'


const Navbar = () => {

    return(

        <div className={styles.Container}>
            <div className={styles.Bar}>
                <h2>Macrodata</h2>
                <h2>LUMON</h2>
            </div>
        </div>
        
    )
}

export default Navbar
