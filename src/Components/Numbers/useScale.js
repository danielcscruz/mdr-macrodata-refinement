import { useMemo } from "react";

const MAX_SCALE = 2.5;
const MIN_SCALE = 1;
const HOVER_RADIUS = 2;

const useScale = (row, col, hoveredCell) => {
    return useMemo(() => {
        if (!hoveredCell) return MIN_SCALE;

        const dx = row - hoveredCell.row;
        const dy = col - hoveredCell.col;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > HOVER_RADIUS) return MIN_SCALE;

        return MIN_SCALE + (MAX_SCALE - MIN_SCALE) * (1 - distance / HOVER_RADIUS);
    }, [row, col, hoveredCell]);
};

export default useScale;
