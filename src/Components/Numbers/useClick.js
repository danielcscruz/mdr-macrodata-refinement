
const useClick = (row, col, activeBox) => {
    return (event) => {
        console.log("Grid clicked at:", event.clientX, event.clientY);
        console.log("row:", row, " - col:", col);
        if (activeBox) {
            console.log(`Clicked! Active Box: ${activeBox.boxNumber}`);
        }
    };
};

export default useClick;

