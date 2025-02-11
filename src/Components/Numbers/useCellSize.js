import { useState, useEffect } from "react";

const useCellSize = (containerRef, rows, columns) => {
    const [cellSize, setCellSize] = useState({ width: 50, height: 50 }); // Default size

    useEffect(() => {
        const updateCellSize = () => {
            if (containerRef.current) {
                const container = containerRef.current;
                
                // Use scrollWidth & scrollHeight for full content size
                const fullWidth = container.scrollWidth;
                const fullHeight = container.scrollHeight;
                
                setCellSize({
                    width: fullWidth / columns,
                    height: fullHeight / rows
                });
            }
        };

        updateCellSize(); // Set initial size
        window.addEventListener("resize", updateCellSize);

        return () => window.removeEventListener("resize", updateCellSize);
    }, [containerRef, rows, columns]);

    return cellSize;
};

export default useCellSize;
