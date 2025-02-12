const selectedNumbers = (row, col, numbersGrid) => {
    const selectedCells = [];
    const directions = [
        [-1, -1], [-1, 0], [-1, 1], // Top-left, Top, Top-right
        [0, -1],  [0, 0],  [0, 1],  // Left, Center (clicked cell), Right
        [1, -1],  [1, 0],  [1, 1]   // Bottom-left, Bottom, Bottom-right
    ];

    directions.forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;

        // selectedCells.push({ row: newRow, col: newCol, value: numbersGrid[newRow][newCol] });

        if (newRow >= 0 && newRow < numbersGrid.length && 
            newCol >= 0 && newCol < numbersGrid[0].length) {
            selectedCells.push({ row: newRow, col: newCol, value: numbersGrid[newRow][newCol] });
        } else {
            selectedCells.push({ row: newRow, col: newCol, value: null }); // Store null for out-of-bounds cells
        }
    });

    return selectedCells;
};

const useClick = (row, col, activeBox, numbersGrid) => {

        if (activeBox) {

            const selectedCells = selectedNumbers(row, col, numbersGrid);
            const finalPosition = { x: activeBox.position.x, y: activeBox.position.y };

            return { selectedCells, finalPosition };
            
        }else{

            return null;
        }
};

export default useClick;
