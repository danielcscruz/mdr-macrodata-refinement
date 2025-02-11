import { useState, useRef } from "react"; 
import NumbersGrid from "./NumbersGrid";
import useMousePosition from "./useMousePosition"; 
import useRandomPositions from "./useRandomPositions";
import useCellSize from "./useCellSize";
import styles from "./Numbers.module.css";

const rows = 20;
const columns = 40;

const generateNumbers = () =>
    Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => Math.floor(Math.random() * 10))
    );

const Numbers = ({ setMousePosition, activeBox }) => {
    const [numbersGrid, setNumbersGrid] = useState(generateNumbers());
    const positions = useRandomPositions(rows, columns);
    const containerRef = useRef(null);
    const cellSize = useCellSize(containerRef, rows, columns);
    const { position, relativePosition } = useMousePosition(containerRef, setMousePosition);

    return (
        <div ref={containerRef} className={styles.Container}>
            <div className={styles.Field}>
                <NumbersGrid 
                    numbersGrid={numbersGrid} 
                    positions={positions} 
                    mousePosition={relativePosition}
                    cellSize={cellSize} 
                    activeBox={activeBox}
                />
            </div>
        </div>
    );
};

export default Numbers;
