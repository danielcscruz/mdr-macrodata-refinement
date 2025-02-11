import { useEffect, useState } from "react";

const generateRandomPositions = (rows, columns) =>
    Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => ({
            x: Math.random() > 0.5 ? Math.random() * 10 - 10 : 0,
            y: Math.random() > 0.5 ? 0 : Math.random() * 10 - 10,
        }))
    );

const useRandomPositions = (rows, columns) => {
    const [positions, setPositions] = useState(generateRandomPositions(rows, columns));

    useEffect(() => {
        const interval = setInterval(() => {
            setPositions(generateRandomPositions(rows, columns));
        }, 300);
        return () => clearInterval(interval);
    }, [rows, columns]);

    return positions;
};

export default useRandomPositions;
