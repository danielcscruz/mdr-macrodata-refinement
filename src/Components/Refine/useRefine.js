const referenceNumbers = {
    1: [0, 5],
    2: [1, 6],
    3: [2, 7],
    4: [3, 8],
    5: [4, 9],
};

const useRefine = () => {
    const updateProgress = (activeBox, selectedCells) => {
        if (!activeBox || !selectedCells) return 0;

        const boxNumber = activeBox.boxNumber;
        const validNumbers = referenceNumbers[boxNumber];

        // Extract only values from selectedCells
        const selectedValues = selectedCells.map(cell => cell.value);

        // Count how many values match reference numbers for this box
        const matches = selectedValues.filter(value => validNumbers.includes(value)).length;

        return matches * 10; // Return the progress increment
    };

    return { updateProgress };
};

export default useRefine;
