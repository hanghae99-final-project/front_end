import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import KakaoFinish from "../pages/KakaoFinish";
import MyPage from "../pages/myPage/MyPage";
import Ranking from "../pages/Ranking";
import Join from "../pages/Join";
import ProfileTodoList from "../components/profile/ProfileTodoList";
import ModifyProfile from "../pages/ModifyProfile";
import DdayPage from "../pages/DdayPage";
import PostDday from "../components/dDay/PostDday";
import NotFoundPage from "../pages/NotFoundPage";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/users/kakao/callback" element={<KakaoFinish />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/join" element={<Join />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/mytodo" element={<ProfileTodoList />} />
        <Route path="/modify" element={<ModifyProfile />} />
        <Route path="/dday" element={<DdayPage />} />
        <Route path="/postdday" element={<PostDday />}></Route>
        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
