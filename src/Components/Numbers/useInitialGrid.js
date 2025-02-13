const useInitialGrid = (rows, columns) => {
    console.log("Generating initial grid...");
    
    return Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => Math.floor(Math.random() * 10))
    );
};

export default useInitialGrid;
