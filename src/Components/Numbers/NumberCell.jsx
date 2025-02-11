import { useRef } from "react";
import { motion } from "framer-motion";
import styles from "./Numbers.module.css";
import useClick from "./useClick";
import useScale from "./useScale";

const NumberCell = ({ number, rowIndex, colIndex, position, mousePosition, cellSize, activeBox }) => {
    const tableRef = useRef(null);
    const handleClick = useClick(rowIndex, colIndex, activeBox); // ✅ Pass activeBox safely

    const scale = useScale(rowIndex, colIndex, mousePosition, cellSize);

    return (
        <motion.h3
            className={styles.Number}
            onClick={handleClick}
            animate={{ 
                x: position.x, 
                y: position.y,
                scale: scale
            }}
            transition={{ duration: 1, ease: "easeOut" }}
        >
            {number}
        </motion.h3>
    );
};

export default NumberCell;
