const useInitialGrid = (rows, columns) => {
    
    return Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => Math.floor(Math.random() * 10))
    );
};

export default useInitialGrid;
