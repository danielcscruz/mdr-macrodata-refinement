import { useEffect, useState, useRef } from "react";
import NumberCell from "./NumberCell";
import styles from "./Numbers.module.css";
import useClick from "./useClick";



const NumbersGrid = ({ numbersGrid, mousePosition, cellSize, activeBox, gridSize}) => {

    const [selectedCells, setSelectedCells] = useState(null);
    const [finalPosition, setFinalPosition] = useState(null);
    const [animatingCells, setAnimatingCells] = useState({});


    // Handler for when a cell is clicked
    const handleCellClick = (row, col) => {
        // Call useClick (which now returns an object) for the clicked cell
        const result = useClick(row, col, activeBox, numbersGrid);

        if (result) {
            setSelectedCells(result.selectedCells);
            setFinalPosition(result.finalPosition);
            console.log("Selected Cells:", result.selectedCells);
            console.log("Final Position:", result.finalPosition);
        }
    };


    return (
        <table className={styles.Grid} >
            <tbody>
                {numbersGrid.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((number, colIndex) => (
                            <td key={colIndex}>
                                <NumberCell 
                                    number={number}
                                    rowIndex={rowIndex}
                                    colIndex={colIndex}
                                    mousePosition={mousePosition}
                                    cellSize={cellSize}
                                    activeBox={activeBox}
                                    numbersGrid = {numbersGrid}
                                    gridSize = {gridSize}
                                    onCellClick={() => handleCellClick(rowIndex, colIndex)}
                                    selectedCells={selectedCells}
                                    finalPosition={finalPosition}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default NumbersGrid;
