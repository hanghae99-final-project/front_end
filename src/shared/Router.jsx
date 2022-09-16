import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import LoginPage from '../pages/LoginPage';
import ToDo from '../pages/ToDo';
import KakaoFinish from '../pages/KakaoFinish';
import MyPage from '../pages/MyPage';
import Profile from '../pages/Profile';
import Calender from '../components/Calender';
import Ranking from '../pages/Ranking';
import Join from '../pages/Join';
import ProfileTodoList from '../components/profile/ProfileTodoList';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/home' element={<Home />} />
                <Route path='/' element={<LoginPage />} />
                <Route path='/todo' element={<ToDo />} />
                <Route path='/users/kakao/finish' element={<KakaoFinish />} />
                <Route path='/Calender' element={<Calender />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/join' element={<Join />} />
                <Route path='/ranking' element={<Ranking />} />
                <Route path='/mytodo' element={<ProfileTodoList />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
