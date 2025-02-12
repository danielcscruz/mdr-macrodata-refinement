import { useState, useEffect } from "react";

const useBoxEffect = () => {
    const [activeBox, setActiveBox] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null); // Store timeout reference

    useEffect(() => {
        const handleKeyDown = (event) => {

            if (event.key >= "1" && event.key <= "5") {
                const boxNumber = parseInt(event.key);
                const boxElement = document.querySelector(`[data-box="${boxNumber}"]`);

                if (!boxElement) return;

                const rect = boxElement.getBoundingClientRect();

                // Clear any existing timeout before setting a new one
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }

                // Update the active box
                setActiveBox({
                    isOpen: true,
                    boxNumber,
                    position: { x: rect.left, y: rect.top },
                });

                // Set a new timeout and store its ID
                const newTimeoutId = setTimeout(() => {
                    setActiveBox(null);
                }, 2000);

                setTimeoutId(newTimeoutId);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            if (timeoutId) clearTimeout(timeoutId); // Cleanup timeout on unmount
        };
    }, [timeoutId]); // Depend on timeoutId to ensure proper clearing

    return activeBox;
};

export default useBoxEffect;
