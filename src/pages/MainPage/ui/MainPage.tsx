import { useState } from "react";
import { initProgress, setUser } from "../../../store/slices/testSlice";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import "./MainPage.scss";
export const MainPage = () => {
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleChangeName = (name: string) => {
    setName(name);
  };
  const handleStart = () => {
    if (name.length >= 1) {
      dispatch(setUser({ name, points: 0 }));
      dispatch(initProgress());
      navigate("/test");
    }
  };

  return (
    <div className="main-page">
      <h2>Викторина: путешествие по сферам знаний</h2>
      <div className="input-block">
        <input
          className="input"
          placeholder={"Введите свое имя"}
          onChange={(e) => handleChangeName(e.target.value)}
        />
        <button disabled={name.length < 1} onClick={handleStart}>
          Продолжить
        </button>
      </div>
    </div>
  );
};
