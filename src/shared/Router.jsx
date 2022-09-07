import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detail from '../pages/Detail'
import ToDo from "../pages/ToDo";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/detail/:id" element={<Detail />} />
                <Route path="/todo" element={<ToDo />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
