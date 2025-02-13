import { useState, useEffect } from "react";

const useCellSize = (containerRef, rows, columns) => {
    const [cellSize, setCellSize] = useState({ width: 45, height: 47 }); // Default size

    useEffect(() => {
        if (!containerRef.current) return;

        const updateCellSize = () => {
            const container = containerRef.current;
            const { width, height } = container.getBoundingClientRect(); // Get exact container size

            setCellSize({
                width: width / columns,
                height: height / rows
            });
        };

        const resizeObserver = new ResizeObserver(updateCellSize);
        resizeObserver.observe(containerRef.current);

        updateCellSize(); // Initial update

        return () => resizeObserver.disconnect();
    }, [containerRef, rows, columns]);
    console.log(cellSize);
    return cellSize;
};

export default useCellSize;
