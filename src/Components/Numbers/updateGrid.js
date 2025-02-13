const updateGrid = (numbersGrid, selectedCells) => {
    if (!selectedCells || selectedCells.length === 0) return numbersGrid;


    return numbersGrid.map((row, rowIndex) =>
        
        row.map((number, colIndex) => {

            const cell = selectedCells.find(cell => cell.row === rowIndex && cell.col === colIndex);
            return cell ? Math.floor(Math.random() * 10) : number; 
        })
        
    );
};

export default updateGrid;
