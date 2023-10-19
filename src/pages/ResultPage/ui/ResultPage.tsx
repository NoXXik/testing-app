import { useSelector } from "react-redux";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import {
  getQuestionsCount,
  getTotalPoints,
} from "../../../store/selectors/selectors";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TestHistory } from "../../../shared/types";
import { TestHistoryList } from "../../../components/TestHistoryList";
import "./ResultPage.scss";

const resultTexts: Record<number, { text: string; smile: string }> = {
  1: {
    text: "Ваш результат показывает, что вам не удалось достичь хорошего результата. Рекомендуется уделить больше внимания изучению окружающего мира. Не отчаивайтесь! С постоянной практикой вы сможете улучшить свои результаты. 💪",
    smile: "😞",
  },
  2: {
    text: "Ваш результат показывает, что у вас есть базовые знания, но есть места, где можно ещё улучшиться. Рекомендуется уделить больше времени на изучение полезной информации. Не сдавайтесь! Со временем вы сможете достичь хороших результатов.",
    smile: "😐",
  },
  3: {
    text: "Поздравляю! Ваш результат показывает, что у вас хорошие знания. Однако, не стоит останавливаться на достигнутом. Продолжайте учиться и практиковаться для ещё лучших результатов.",
    smile: "🙂",
  },
  4: {
    text: "Великолепно! Ваш результат говорит о высоком уровне знаний и отличной подготовке к тесту. Продолжайте развиваться и воплощать свои знания на практике. Так держать!",
    smile: "🎉",
  },
};

export const ResultPage = () => {
  const totalPoints = useSelector(getTotalPoints);
  const totalCount = useSelector(getQuestionsCount);
  const user = useAppSelector((state) => state.test.user);
  const navigate = useNavigate();
  const [result, setResult] = useState<{ text: string; smile: string } | null>(
    null,
  );
  const [history, setHistory] = useState<TestHistory[]>([]);

  const handleRepeat = () => {
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      // Вычисляем рейтинг для выбора ответа пользователю, в зависимости от рейтинга выбираем нужный текст и смайлик
      const rate = Math.min(Math.floor(user.points / (totalPoints / 4) + 1), 4);
      setResult(resultTexts[rate]);
    }
  }, [totalPoints, totalCount]);

  useEffect(() => {
    // При первом рендере достаем из localStorage историю тестов и добавляем в state
    const testHistory = JSON.parse(localStorage.getItem("test_history"));
    if (testHistory) {
      setHistory(testHistory);
    }
  }, []);
  return (
    <>
      <div className="result-page">
        <h1 className="result-page__title">{result && result.smile}</h1>
        <p className="result-page__text">{result && result.text}</p>
        <h3 className="result-page__points">Ваши баллы: {user?.points}</h3>
        <button className="result-page__button" onClick={handleRepeat}>
          Начать заново
        </button>
        <div className="result-page__history">
          {history.length > 0 && <TestHistoryList results={history} />}
        </div>
      </div>
    </>
  );
};
