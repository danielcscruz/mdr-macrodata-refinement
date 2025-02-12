import { useEffect, useState } from "react";

const generateRandomOffset = () => {
    const isHorizontal = Math.random() > 0.5;
    return {
        x: isHorizontal ? Math.random() * 10 - 5 : 0, // Random left/right offset (-10 to 10)
        y: !isHorizontal ? Math.random() * 10 - 5 : 0, // Random up/down offset (-10 to 10)
    };
};

const useRandomPositions = (rows, columns) => {
    const [positions, setPositions] = useState(
        Array.from({ length: rows }, () =>
            Array.from({ length: columns }, generateRandomOffset)
        )
    );

    useEffect(() => {
        const updatePositions = () => {
            setPositions(
                Array.from({ length: rows }, () =>
                    Array.from({ length: columns }, generateRandomOffset)
                )
            );
        };

        const interval = setInterval(updatePositions, Math.random() * 1500 + 1000); // Change every 1-2s

        return () => clearInterval(interval);
    }, [rows, columns]);

    return positions;
};

export default useRandomPositions;
