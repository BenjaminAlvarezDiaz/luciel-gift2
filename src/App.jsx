import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home.jsx";
import PoetryTranslator from "./screens/PoetryTranslator.jsx";
import Words from "./screens/Words.jsx";
import Circle from "./screens/Circle.jsx";

function App() {
    return (
    <div className="App">
        <Router>
            <Routes>
                <Route path="/" element = {<Home />}/>
                <Route path="/poetryTranslator" element = {<PoetryTranslator />}/>
                <Route path="/words" element = {<Words />}/>
                <Route path="/circle" element = {<Circle />}/>
            </Routes>
        </Router>
    </div>
    );
}

export default App;