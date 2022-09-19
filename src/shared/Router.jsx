import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import ToDo from '../pages/ToDo';
import KakaoFinish from '../pages/KakaoFinish';
import MyPage from '../pages/MyPage';
import Calender from '../components/calender/Calender';
import Ranking from '../pages/Ranking';
import Join from '../pages/Join';
import ProfileTodoList from '../components/profile/ProfileTodoList';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<MainPage />} />
                <Route path='/' element={<LoginPage />} />
                <Route path='/todo' element={<ToDo />} />
                <Route path='/users/kakao/callback' element={<KakaoFinish />} />
                <Route path='/Calender' element={<Calender />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/join' element={<Join />} />
                <Route path='/ranking' element={<Ranking />} />
                <Route path='/mytodo' element={<ProfileTodoList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
