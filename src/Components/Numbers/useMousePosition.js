import { useState, useEffect } from "react";

const useMousePosition = (containerRef, updatePosition) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [relativePosition, setRelativePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            const { clientX, clientY } = event;
            setPosition({ x: clientX, y: clientY });

            if (containerRef?.current) {
                const container = containerRef.current;
                const rect = container.getBoundingClientRect();
                
                // Correcting for scroll position
                const scrollX = container.scrollLeft;
                const scrollY = container.scrollTop;

                setRelativePosition({
                    x: clientX - rect.left + scrollX,
                    y: clientY - rect.top + scrollY
                });
            }

            if (typeof updatePosition === "function") {
                updatePosition({ x: clientX, y: clientY });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [containerRef, updatePosition]);

    return { position, relativePosition };
};

export default useMousePosition;
