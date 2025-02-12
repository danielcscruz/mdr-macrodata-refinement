import { useEffect, useState } from "react";

const useGridPositions = (containerRef, rows, cols) => {
    const [positions, setPositions] = useState([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const updatePositions = () => {
            const container = containerRef.current.getBoundingClientRect(); // Get container size & position
            const scrollY = window.scrollY; // Get current scroll position

            const cellWidth = container.width / cols;
            const cellHeight = container.height / rows;

            const newPositions = [];

            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols; col++) {
                    newPositions.push({
                        row,
                        col,
                        x: col * cellWidth + container.left, // X position based on column index
                        y: row * cellHeight + container.top + scrollY, // Y position + scroll influence
                    });
                }
            }

            setPositions(newPositions);
        };

        updatePositions(); // Initial calculation
        window.addEventListener("resize", updatePositions); // Update on resize
        window.addEventListener("scroll", updatePositions); // Update on scroll

        return () => {
            window.removeEventListener("resize", updatePositions);
            window.removeEventListener("scroll", updatePositions);
        };
    }, [containerRef, rows, cols]);

    return positions;
};

export default useGridPositions;
