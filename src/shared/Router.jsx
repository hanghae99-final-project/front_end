import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import KakaoFinish from '../pages/KakaoFinish';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/users/kakao/finish' element={<KakaoFinish />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
