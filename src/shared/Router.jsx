import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import ToDo from "../pages/ToDo";
import KakaoFinish from "../pages/KakaoFinish";
import Join from "../pages/Join";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/join" element={<Join />} />
        <Route path="/todo" element={<ToDo />} />
        <Route path="/users/kakao/finish" element={<KakaoFinish />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
