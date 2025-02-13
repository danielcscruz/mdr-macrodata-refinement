import { useState, useRef, useEffect } from "react"; 
import NumbersGrid from "./NumbersGrid";
import useMousePosition from "./useMousePosition"; 
import useCellSize from "./useCellSize";
import styles from "./Numbers.module.css";
import useInitialGrid from "./useInitialGrid"; 

const rows = 15;
const columns = 30;

const Numbers = ({ setMousePosition, activeBox, setSelectedCells, selectedCells }) => {
    const gridSize = { rows, columns };

    const [numbersGrid, setNumbersGrid] = useState(null); // Start as null
    const containerRef = useRef(null);
    const [isMounted, setIsMounted] = useState(false); // Track mount state

    useEffect(() => {
        if (containerRef.current) {
            setIsMounted(true); // Wait until the ref is assigned
        }
    }, []);

    const cellSize = isMounted ? useCellSize(containerRef, rows, columns) : { width: 55, height: 77 };
    const { absolutePosition, relativePosition } = useMousePosition(containerRef, setMousePosition);

    // Generate numbers only once when the component mounts
    useEffect(() => {
        const initialGrid = useInitialGrid(gridSize.rows, gridSize.columns);
        setNumbersGrid(initialGrid);
    }, []); // Empty dependency array ensures this runs only once

    // Render nothing (or a loader) until numbersGrid is ready
    if (!numbersGrid) {
        return <div>Loading...</div>; // Can be replaced with a spinner
    }

    return (
        <div ref={containerRef} className={styles.Container}>
            <div className={styles.Field}>
                <NumbersGrid 
                    numbersGrid={numbersGrid} 
                    relativePosition={relativePosition}
                    absolutePosition={absolutePosition}
                    cellSize={cellSize} 
                    activeBox={activeBox}
                    gridSize={gridSize}
                    setNumbersGrid={setNumbersGrid}
                    setSelectedCells={setSelectedCells}
                    selectedCells={selectedCells}
                />
            </div>
        </div>
    );
};

export default Numbers;
