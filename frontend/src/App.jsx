import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AppLayout from "./layouts/AppLayout";
import BookList from "./pages/Home/BookList";
import HomePage from "./pages/Home/HomePage";
import Recommend from "./pages/Home/Recommend";
import MyLibrary from "./pages/Library/MyLibrary";
import MyLibraryDetail from "./pages/Library/MyLibraryDetail";
import SignIn from "./pages/Login/SignIn";
import SignUp from "./pages/Login/SignUp";
import CreateMeeting from "./pages/Meeting/CreateMeeting";
import MeetingDetail from "./pages/Meeting/MeetingDetail";
import MeetingList from "./pages/Meeting/MeetingList";
import NotFound from "./pages/NotFound/NotFound";
import RentalDetail from "./pages/Rental/RentalDetail";
import RentalList from "./pages/Rental/RentalList";
import BookDetail from "./pages/WishList/BookDetail";
import LikeList from "./pages/WishList/LikeList";
import MyPage from "./pages/WishList/MyPage";
import "./styles/App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="recommend" element={<Recommend />} />
          <Route path="books">
            <Route index element={<BookList />} />
            <Route path=":bookID" element={<BookDetail />} />
          </Route>
          <Route
            path="mypage"
            element={
              <PrivateRoute>
                <MyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="mypage/likes"
            element={
              <PrivateRoute>
                <LikeList />
              </PrivateRoute>
            }
          />
          <Route
            path="library"
            element={
              <PrivateRoute>
                <MyLibrary />
              </PrivateRoute>
            }
          />
          <Route
            path="library/:bookID"
            element={
              <PrivateRoute>
                <MyLibraryDetail />
              </PrivateRoute>
            }
          />
          <Route path="meeting">
            <Route index element={<MeetingList />} />
            <Route path=":id" element={<MeetingDetail />} />
            <Route
              path="create"
              element={
                <PrivateRoute>
                  <CreateMeeting />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="rental">
            <Route index element={<RentalList />} />
            <Route path=":bookId" element={<RentalDetail />} />
          </Route>
        </Route>

        <Route path="/login">
          <Route index element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
