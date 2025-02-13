import { useState, useEffect, useRef } from "react";
import './App.css';
import Navbar from './Components/Navbar';
import Numbers from './Components/Numbers';
import Boxes from './Components/Boxes';
import Footer from './Components/Footer';
import Refine from './Components/Refine';
import useBoxEffect from "./Components/Boxes/useBoxEffect";

function App() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [numbersGrid, setNumbersGrid] = useState([]);
    const containerRef = useRef(null);
    const activeBox = useBoxEffect();
    const [selectedCells, setSelectedCells] = useState(null); // ✅ Move state up
    const [progressValues, setProgressValues] = useState(Array(5).fill(0)); // 🔹 Lift state up



    return (
        <div ref={containerRef}>
            <Refine 
                setNumbersGrid={setNumbersGrid} 
                numbersGrid={numbersGrid} 
                containerRef={containerRef} 
                cellSize={{ width: 50, height: 50 }} 
            />
            <Navbar progressValues={progressValues}/>
            <Numbers 
                setMousePosition={setMousePosition} 
                numbersGrid={numbersGrid}
                activeBox={activeBox}
                setSelectedCells={setSelectedCells}
                selectedCells={selectedCells}
            />
            <Boxes selectedCells={selectedCells} 
            progressValues={progressValues} 
            setProgressValues={setProgressValues} /> 
            <Footer mousePosition={mousePosition} activeBox={activeBox} />
        </div>
    );
}

export default App;
