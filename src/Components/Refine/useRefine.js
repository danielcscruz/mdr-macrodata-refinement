import { useEffect, useState } from "react";

const useRefine = (numbersGrid, setNumbersGrid, containerRef) => {
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    useEffect(() => {
        const handleClick = (event) => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const rect = container.getBoundingClientRect();

            // Correct click position by considering scroll offset
            const scrollX = container.scrollLeft;
            const scrollY = container.scrollTop;
            const clickX = event.clientX - rect.left + scrollX;
            const clickY = event.clientY - rect.top + scrollY;

            console.log("Corrected Click Position:", clickX, clickY);

            // Identify numbers in the hover area
            const hoveredNumbers = [];
            numbersGrid.forEach((row, rowIndex) => {
                row.forEach((num, colIndex) => {
                    const cellX = colIndex * (rect.width / row.length);
                    const cellY = rowIndex * (rect.height / numbersGrid.length);
                    const distance = Math.sqrt((clickX - cellX) ** 2 + (clickY - cellY) ** 2);
                    
                    if (distance < 20) { // 20px hover threshold
                        hoveredNumbers.push({ rowIndex, colIndex, number: num });
                    }
                });
            });

            console.log("Hovered numbers:", hoveredNumbers);

            if (hoveredNumbers.length > 0) {
                setSelectedNumbers(hoveredNumbers);

                setTimeout(() => {
                    // Remove numbers from grid
                    setNumbersGrid((prevGrid) =>
                        prevGrid.map((row, rowIndex) =>
                            row.map((num, colIndex) =>
                                hoveredNumbers.some(hn => hn.rowIndex === rowIndex && hn.colIndex === colIndex)
                                    ? Math.floor(Math.random() * 10) // Replace with new number
                                    : num
                            )
                        )
                    );

                    setSelectedNumbers([]);
                }, 1000);
            }
        };

        if (containerRef.current) {
            containerRef.current.addEventListener("click", handleClick);
        }

        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener("click", handleClick);
            }
        };
    }, [numbersGrid, setNumbersGrid, containerRef]);

    return { selectedNumbers };
};

export default useRefine;
