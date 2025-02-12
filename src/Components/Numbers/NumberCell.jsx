import { useRef, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Numbers.module.css";
import useClick from "./useClick";
import useScale from "./useScale";
import useRandomPositions from "./useRandomPositions";




const NumberCell = ({ number, rowIndex, colIndex, mousePosition, cellSize, 
    activeBox, numbersGrid, gridSize, onCellClick, selectedCells, finalPosition}) => {

    const containerRef = useRef(null);
    const scale = useScale(rowIndex, colIndex, mousePosition, cellSize);
    const randomPositions = useRandomPositions(20, 40);
    const pos = randomPositions[rowIndex]?.[colIndex] || { x: 0, y: 0 };

    // ** MOVED TO NumbersGrid.jsx **
    // const [selectedCells, setSelectedCells] = useState(null);
    // const [finalPosition, setFinalPosition] = useState(null);
    // const [animatingCells, setAnimatingCells] = useState({});


    // const handleClick = useClick(rowIndex, colIndex, activeBox, numbersGrid, gridSize);

    // const handleCellClick = () => {
    //     const result = handleClick(); // Call the function
    //     if (result) {
    //         setSelectedCells(result.selectedCells);
    //         setFinalPosition(result.finalPosition);
    //         console.log("Selected Cells:", result.selectedCells);
    //         console.log("Final Position:", result.finalPosition);

    //         setAnimatingCells((prev) => {
    //             const newAnimations = { ...prev };
    //             result.selectedCells.forEach(({ row, col }) => {
    //                 newAnimations[`${row}-${col}`] = { x: result.finalPosition.x, y: result.finalPosition.y };
    //             });
    //             return newAnimations;
    //         });

    //     }
    // };

    // (For this example, assume some default positions if needed.)
  // Determine if this cell is among the selected cells:
    const isSelected = selectedCells?.some(
        (cell) => cell.row === rowIndex && cell.col === colIndex
    );

  // Determine animation:
  // If the cell is selected, animate it to finalPosition with scale 0.
  // Otherwise, animate normally (here, just keep it at its original place for simplicity).
    const animateProps = isSelected
        ? { x: finalPosition?.x || 0, y: finalPosition?.y || 0, scale: 0 }
        : { x: pos.x, y: pos.y, scale }; // no change for non-selected cells

    return (
        <motion.h3
            className={styles.Number}
            onClick={onCellClick}
            // animate={animatingCells[`${rowIndex}-${colIndex}`] || { x: pos.x, y: pos.y, scale }}
            animate={animateProps}


            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {number}
        </motion.h3>
    );
};

export default NumberCell;
