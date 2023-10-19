import { useEffect } from "react";
import "./App.css";
import {
  setAnswerHistory,
  setProgress,
  setQuestions,
  setUser,
} from "./store/slices/testSlice";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch } from "./shared/hooks/useAppDispatch";
import { MainPage } from "./pages/MainPage";
import { TestPage } from "./pages/TestPage";
import { ResultPage } from "./pages/ResultPage";

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((res) => {
        dispatch(setQuestions(res));
      });
    const user = JSON.parse(localStorage.getItem("user"));
    const answer_hitory = JSON.parse(localStorage.getItem("answer_history"));
    const progress = JSON.parse(localStorage.getItem("progress"));
    if (user) {
      dispatch(setUser(user));
    } else {
      navigate("/");
    }
    if (progress) {
      dispatch(setProgress(progress));
    } else {
      navigate("/");
    }
    if (answer_hitory) {
      dispatch(setAnswerHistory(answer_hitory));
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </>
  );
}

export default App;
