import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Numbers.module.css";

const rows = 15;
const columns = 30;

const generateNumbers = () => 
    Array.from({ length: rows }, () => 
        Array.from({ length: columns }, () => Math.floor(Math.random() * 10))
    );

const numbersGrid = generateNumbers();

// Generate small random movements for each number
const generateRandomPositions = () => 
    Array.from({ length: rows }, () => 
        Array.from({ length: columns }, () => {
            const isHorizontal = Math.random() > 0.5; // Randomly choose direction
            return {
                x: isHorizontal ? (Math.random() * 10 - 10) : 0, // ±5px horizontal movement
                y: !isHorizontal ? (Math.random() * 10 - 10) : 0, // ±5px vertical movement
            };
        })
    );

const Numbers = () => {
    const [positions, setPositions] = useState(generateRandomPositions());

    useEffect(() => {
        const interval = setInterval(() => {
            setPositions(generateRandomPositions()); // Generate new small movements
        }, 300); // Update every 300ms for a subtle effect

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.Container}>
            <div className={styles.Field}>
                <table>
                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex}>
                                        <motion.h3 
                                            className={styles.Number}
                                            animate={{ 
                                                x: positions[rowIndex][colIndex].x, 
                                                y: positions[rowIndex][colIndex].y 
                                            }}
                                            transition={{ 
                                                type: "tween", 
                                                duration: 0.9, 
                                                ease: "easeInOut" 
                                            }}
                                        >
                                            {numbersGrid[rowIndex][colIndex]}
                                        </motion.h3>   
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Numbers;
