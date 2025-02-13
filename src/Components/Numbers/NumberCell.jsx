import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Numbers.module.css";
import useRandomPositions from "./useRandomPositions";


const NumberCell = ({ 
    number, 
    rowIndex, 
    colIndex, 
    scale, // Now received as a prop
    onCellClick, 
    selectedCells, 
    finalPosition,
    gridSize,
    setHoveredCell // Function to update hovered cell
}) => {
    const [currentNumber, setCurrentNumber] = useState(number);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isFadingIn, setIsFadingIn] = useState(true);
    const randomPositions = useRandomPositions(gridSize.rows, gridSize.columns);
    const pos = randomPositions[rowIndex]?.[colIndex] || { x: 0, y: 0 };

    const cellRef = useRef(null);

    // Ensure currentNumber updates when number changes
    useEffect(() => {
        setCurrentNumber(number);
    }, [number]);

    // Handle animation steps
    useEffect(() => {
        const isSelected = selectedCells?.some(
            (cell) => cell.row === rowIndex && cell.col === colIndex
        );

        if (isSelected) {
            setIsAnimating(true);  
            setIsFadingIn(false);  

            setTimeout(() => {
                setIsAnimating(false);
                setTimeout(() => {
                    setIsFadingIn(true); 
                }, 1500);
            }, 1000);
        }
    }, [selectedCells, rowIndex, colIndex]);

    // Calculate relative position for animation compensation
    let relativeFinalPosition = { x: 0, y: 0 };
    if (finalPosition && cellRef.current) {
        const cellRect = cellRef.current.getBoundingClientRect();
        relativeFinalPosition = {
            x: finalPosition.x - cellRect.left,
            y: finalPosition.y - cellRect.top,
        };
    }

    // Animation properties
    const animateProps = isAnimating
        ? { x: relativeFinalPosition.x, y: relativeFinalPosition.y, scale: 0, opacity: 0 }
        : { x: pos.x, y: pos.y, scale, opacity: isFadingIn ? 1 : 0 }; // Now using the scale prop

    return (
        <motion.h3
            ref={cellRef}
            className={styles.Number}
            onClick={onCellClick}  
            onMouseEnter={() => setHoveredCell({ row: rowIndex, col: colIndex })} // Updates when mouse enters
            animate={animateProps}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            {currentNumber}
        </motion.h3>
    );
};

export default NumberCell;
