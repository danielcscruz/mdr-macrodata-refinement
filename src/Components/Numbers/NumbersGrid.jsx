import { useEffect, useState, useRef } from "react";
import NumberCell from "./NumberCell";
import styles from "./Numbers.module.css";
import useClick from "./useClick";
import updateGrid from "./updateGrid";
import useScale from "./useScale";  // Import the hook

const NumbersGrid = ({ numbersGrid, setNumbersGrid, activeBox, gridSize }) => {
    const [selectedCells, setSelectedCells] = useState(null);
    const parentRef = useRef(null);
    const [finalPosition, setFinalPosition] = useState({ x: 0, y: 0 });

    const [hoveredCell, setHoveredCell] = useState({row:0, col:0}); // New state

    const calculateFinalPosition = (activeBox, parentRef) => {
        if (!activeBox || !parentRef?.current) return { x: 0, y: 0 };
    
        const LEFT_MARGIN = 95; // Adjust as needed
        const BOX_SPACING = 190; // Adjust based on the grid layout
        const parentHeight = parentRef.current.clientHeight;
        
    
        return {
            x: LEFT_MARGIN + activeBox.boxNumber * (BOX_SPACING-1),
            y: parentHeight,
        };
    };

    useEffect(() => {
        setFinalPosition(calculateFinalPosition(activeBox, parentRef));
        console.log("from Grid: ",finalPosition)
    }, [activeBox]);

    useEffect(() => {

    }, [numbersGrid]);

    const handleCellClick = (row, col) => {
        const result = useClick(row, col, activeBox, numbersGrid);

        if (result) {
            setSelectedCells(result.selectedCells);
            setFinalPosition(result.finalPosition);
            setTimeout(() => {
                setNumbersGrid((numbersGrid) => updateGrid(numbersGrid, result.selectedCells));
            }, 1000); 
        }
    };

    return (
        <table className={styles.Grid}>
            <tbody>
                {numbersGrid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((number, colIndex) => {
                            const scale = useScale(rowIndex, colIndex, hoveredCell); // Pass hoveredCell info correctly

                            return (
                                <td key={colIndex}>
                                    <NumberCell
                                        number={number}
                                        rowIndex={rowIndex}
                                        colIndex={colIndex}
                                        gridSize={gridSize}
                                        scale={scale} // Pass the scale to NumberCell
                                        onCellClick={() => handleCellClick(rowIndex, colIndex)}
                                        selectedCells={selectedCells}
                                        finalPosition={finalPosition}
                                        setHoveredCell={setHoveredCell} // Pass function to update hover

                                    />
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default NumbersGrid;
