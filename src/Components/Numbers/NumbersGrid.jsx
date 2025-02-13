import { useEffect, useState } from "react";
import NumberCell from "./NumberCell";
import styles from "./Numbers.module.css";
import useClick from "./useClick";
import updateGrid from "./updateGrid";
import useScale from "./useScale";  // Import the hook

const NumbersGrid = ({ numbersGrid, setNumbersGrid, activeBox, gridSize }) => {
    const [selectedCells, setSelectedCells] = useState(null);
    const [finalPosition, setFinalPosition] = useState(null);

    const [hoveredCell, setHoveredCell] = useState({row:0, col:0}); // New state


    useEffect(() => {
        console.log("Updated numbersGrid:", numbersGrid);
    }, [numbersGrid]);

    const handleCellClick = (row, col) => {
        const result = useClick(row, col, activeBox, numbersGrid);

        if (result) {
            setSelectedCells(result.selectedCells);
            setFinalPosition(result.finalPosition);
            setNumbersGrid((numbersGrid) => updateGrid(numbersGrid, result.selectedCells));
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
