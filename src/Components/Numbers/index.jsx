import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "./Numbers.module.css";

const rows = 20;
const columns = 40;
const MAX_SCALE = 2.5;
const MIN_SCALE = 1.0;
const HOVER_RADIUS = 100;

const generateNumbers = () => 
    Array.from({ length: rows }, () => 
        Array.from({ length: columns }, () => Math.floor(Math.random() * 10))
    );

const numbersGrid = generateNumbers();

const generateRandomPositions = () => 
    Array.from({ length: rows }, () => 
        Array.from({ length: columns }, () => {
            const isHorizontal = Math.random() > 0.5;
            return {
                x: isHorizontal ? (Math.random() * 10 - 10) : 0, 
                y: !isHorizontal ? (Math.random() * 10 - 10) : 0,
            };
        })
    );

const Numbers = () => {
    const [positions, setPositions] = useState(generateRandomPositions());
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Selection State
    const [isDragging, setIsDragging] = useState(false);
    const [startPos, setStartPos] = useState(null);
    const [selectionRect, setSelectionRect] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setPositions(generateRandomPositions());
        }, 300);
        return () => clearInterval(interval);
    }, []);

    const handleMouseMove = (event) => {
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
    
        // Use same logic as hover effect
        const currentX = event.clientX - rect.left;
        const currentY = event.clientY - rect.top;
    
        setMousePosition({ x: currentX, y: currentY });
    
        if (isDragging && startPos) {
            setSelectionRect({
                x: Math.min(startPos.x, currentX),
                y: Math.min((startPos.y+rect.top)),
                width: Math.abs(startPos.x - currentX),
                height: Math.abs(startPos.y - currentY),
            });
        }
    };
    
    const handleMouseDown = (event) => {
        document.body.style.userSelect = "none";
        const container = event.currentTarget;
        const rect = container.getBoundingClientRect();
    
        // Use same logic as hover effect
        setStartPos({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        });
    
        setIsDragging(true);
    };
    
    

    const handleMouseUp = () => {
        document.body.style.userSelect = "auto";
        setIsDragging(false);

        if (selectionRect) {
            updateBoldCells(selectionRect);
        }

        setSelectionRect(null); // Reset selection rectangle
    };

    const calculateScale = (row, col) => {
        const grid = document.querySelector(`.${styles.Field} table`);
        if (!grid) return MIN_SCALE;

        const cellW = grid.getBoundingClientRect().width / columns; 
        const cellH = grid.getBoundingClientRect().height / rows; 

        const x = col * cellW + cellW / 2;
        const y = row * cellH + cellH / 2;

        const dx = x - mousePosition.x;
        const dy = y - mousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > HOVER_RADIUS) return MIN_SCALE;

        return MIN_SCALE + (MAX_SCALE - MIN_SCALE) * (1 - distance / HOVER_RADIUS);
    };

    return (
        <div 
            className={styles.Container} 
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <div className={styles.Field}>
                {/* Selection Rectangle */}
                {isDragging && selectionRect && (
                    <div 
                        className={styles.SelectionBox}
                        style={{
                            position: "absolute",
                            border: "2px dashed #9FBFD0",
                            backgroundColor: "transparent", 
                            left: `${selectionRect.x}px`,
                            top: `${selectionRect.y}px`,
                            width: `${selectionRect.width}px`,
                            height: `${selectionRect.height}px`,
                            pointerEvents: "none"
                        }}
                    />
                )}

                <table>
                    <tbody>
                        {Array.from({ length: rows }).map((_, rowIndex) => (
                            <tr key={rowIndex}>
                                {Array.from({ length: columns }).map((_, colIndex) => (
                                    <td key={colIndex}>
                                        <motion.h3 
                                            className={styles.Number}
                                            animate={{ 
                                                x: positions[rowIndex][colIndex].x, 
                                                y: positions[rowIndex][colIndex].y,
                                                scale: calculateScale(rowIndex, colIndex)
                                            }}
                                            transition={{ 
                                                type: "tween", 
                                                duration: 0.9, 
                                                ease: "easeInOut" 
                                            }}
                                        >
                                            {numbersGrid[rowIndex][colIndex]}
                                        </motion.h3>   
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Numbers;
