import { useEffect, useRef } from "react";
import NumberCell from "./NumberCell";
import styles from "./Numbers.module.css";


const NumbersGrid = ({ numbersGrid, positions, mousePosition, cellSize, activeBox }) => {

    
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
                                    position={positions[rowIndex][colIndex]}
                                    mousePosition={mousePosition}
                                    cellSize={cellSize}
                                    activeBox={activeBox}
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
