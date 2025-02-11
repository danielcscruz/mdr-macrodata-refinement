import { useMemo } from "react";

const MAX_SCALE = 4.0;
const MIN_SCALE = 1.1;
const HOVER_RADIUS = 120;

const useScale = (row, col, mousePosition, cellSize) => {
    return useMemo(() => {
        if (!mousePosition) return MIN_SCALE;
        const x = col * cellSize.width + cellSize.width / 2;
        const y = row * cellSize.height + cellSize.height / 2;
        const dx = x - mousePosition.x;
        const dy = y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance > HOVER_RADIUS) return MIN_SCALE;

        return MIN_SCALE + (MAX_SCALE - MIN_SCALE) * (1 - distance / HOVER_RADIUS);
    }, [row, col, mousePosition, cellSize]);
};

export default useScale;
