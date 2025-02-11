import styles from "./Footer.module.css";

const Footer = ({ mousePosition, activeBox }) => { 
    return (
        <div className={styles.Container}>
            <h4>Mouse Position: X: {mousePosition.x}, Y: {mousePosition.y}</h4>
            {activeBox ? (
                <h4>
                    Box {activeBox.boxNumber} is Open | Position: X {activeBox.position.x}, Y {activeBox.position.y}
                </h4>
            ) : (
                <h4>No Box Open</h4>
            )}
        </div>
    );
};

export default Footer;
