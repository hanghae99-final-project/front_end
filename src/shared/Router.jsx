import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import ToDo from '../pages/ToDo';
import KakaoFinish from '../pages/KakaoFinish';
import MyPage from '../pages/MyPage';
import Profile from '../pages/Profile';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/todo' element={<ToDo />} />
                <Route path='/users/kakao/finish' element={<KakaoFinish />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/profile' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
