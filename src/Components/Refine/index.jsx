import { useEffect, useState } from "react";
import useMousePosition from "../Numbers/useMousePosition";

const Refine = ({ setNumbersGrid, numbersGrid, containerRef, cellSize }) => {
    const mousePosition = useMousePosition(containerRef);
    const [selectedNumbers, setSelectedNumbers] = useState([]);

    useEffect(() => {
        const handleClick = () => {
            // Identify numbers in the hover area
            const hoveredNumbers = numbersGrid.filter(({ position }) => {
                const dx = mousePosition.x - position.x;
                const dy = mousePosition.y - position.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                console.log('click')
                console.log(distance, dx, dy)
                return distance < 50; // Example hover threshold
            });

            if (hoveredNumbers.length > 0) {
                // Store selected numbers & start animation
                setSelectedNumbers(hoveredNumbers);

                // Animate them moving to the bottom
                hoveredNumbers.forEach((num) => {
                    num.position.y = window.innerHeight - 100; // Move down
                    num.scale = 0; // Shrink animation
                });

                // Remove them after animation
                setTimeout(() => {
                    setNumbersGrid((prev) => 
                        prev.filter((num) => !hoveredNumbers.includes(num))
                    );

                    // Generate new numbers
                    const newNumbers = hoveredNumbers.map(() => ({
                        number: Math.floor(Math.random() * 10), // Random number
                        position: { 
                            x: Math.random() * containerRef.current.clientWidth, 
                            y: Math.random() * containerRef.current.clientHeight 
                        },
                    }));

                    setNumbersGrid((prev) => [...prev, ...newNumbers]);
                }, 1000);
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [mousePosition, numbersGrid]);

    return null; // ❌ No rendering
};

export default Refine;
