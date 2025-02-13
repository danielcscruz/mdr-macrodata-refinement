import { useState, useEffect } from "react";
import styles from "./Boxes.module.css";
import { motion } from "framer-motion";
import useBoxEffect from "./useBoxEffect";

const referenceNumbers = {
    1: [0, 5],
    2: [1, 6],
    3: [2, 7],
    4: [3, 8],
    5: [4, 9],
};

const Boxes = ({ selectedCells, progressValues, setProgressValues }) => {
    const activeBox = useBoxEffect();
    // const [progressValues, setProgressValues] = useState(Array(5).fill(0));

    // ✅ Update progress bar only when `selectedCells` is NOT null
    useEffect(() => {
        if (!activeBox || !selectedCells) return;

        const boxNumber = activeBox.boxNumber;
        const validNumbers = referenceNumbers[boxNumber];
        const selectedValues = selectedCells.map(cell => cell.value);
        const matches = selectedValues.filter(value => validNumbers.includes(value)).length;

        setProgressValues(prev => {
            const newProgress = [...prev];
            newProgress[boxNumber - 1] += matches ; // Update specific box
            return newProgress;
        });

    }, [selectedCells]); // ✅ Runs when `selectedCells` changes

    return (
        <div className={styles.Container}>
            {[1, 2, 3, 4, 5].map((num, index) => (
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
                        <div className={styles.Fill} style={{ width: `${progressValues[index]}%` }} />  
                        <h4 className={styles.ProgressText}>{progressValues[index]}%</h4>  
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Boxes;
