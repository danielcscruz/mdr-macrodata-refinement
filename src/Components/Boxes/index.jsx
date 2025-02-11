import styles from "./Boxes.module.css";
import { motion } from "framer-motion";
import useBoxEffect from "./useBoxEffect"; // ✅ Import the custom hook


const Boxes = () => {
    const activeBox = useBoxEffect(); // ✅ Use the hook

    return (

            <div className={styles.Container}>
            {[1, 2, 3, 4, 5].map((num) => (
                <div key={num} className={styles.BoxContainer} data-box={num}>
                    <motion.div
                        className={styles.Box}
                        style={{
                            borderTop: activeBox?.boxNumber === num ? "none" : "2px double #9FBFD0",
                        }}
                        animate={{ opacity: activeBox?.boxNumber === num ? 0.7 : 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2>{num}</h2>
                    </motion.div>
                    <div className={styles.Bar}>
                        <h4>0%</h4>
                    </div>
                </div>
            ))}
        </div>

        
    );
};

export default Boxes;
