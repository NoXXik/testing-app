import { useEffect, useState } from "react";
import { useAppSelector } from "../../../shared/hooks/useAppSelector";
import { useAppDispatch } from "../../../shared/hooks/useAppDispatch";
import { sendAnswer } from "../../../store/slices/testSlice";
import { OptionList } from "../../../components/OptionList";
import { Question, QuestionOption, TestHistory } from "../../../shared/types";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "../../../components/ProgressBar";
import { formatTime } from "../../../store/utils/formatTime";

export const TestPage = () => {
  const questions = useAppSelector((state) => state.test.questions);
  const progress = useAppSelector((state) => state.test.progress);
  const user = useAppSelector((state) => state.test.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number[]>([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);

  const handleClick = (option: QuestionOption) => {
    setSelected((prev) =>
      prev.includes(option.id)
        ? prev.filter((el) => el !== option.id)
        : prev.concat(option.id),
    );
  };
  const saveHistory = () => {
    let history: TestHistory[] | null = JSON.parse(
      localStorage.getItem("test_history"),
    );
    let test = null;
    if (user && progress) {
      test = {
        name: user.name,
        time: formatTime(Date.now() / 1000 - progress.start_time),
        points: user.points,
      };
    }
    if (test && history && history.length) {
      history.push(test);
    } else if (test) {
      history = [test];
    }
    localStorage.setItem("test_history", JSON.stringify(history));
  };
  useEffect(() => {
    if (currentQuestion && selected.length === currentQuestion.correct.length) {
      setDisabled(true);
    }
  }, [selected, currentQuestion]);

  const handleContinue = () => {
    if (currentQuestion && progress) {
      dispatch(
        sendAnswer({ question_id: currentQuestion.id, answer: selected }),
      );
      setSelected([]);
      setDisabled(false);
    }
  };
  useEffect(() => {
    if (progress) {
      if (progress.progress === 100) {
        saveHistory();
        setTimeout(() => {
          navigate("/result");
        }, 1000);
      }
      const question = questions.filter(
        (el) => el.id === progress.current_question,
      )[0];
      setCurrentQuestion(question);
    }
  }, [progress, questions]);
  if (currentQuestion && questions.length >= 1 && progress) {
    return (
      <>
        <ProgressBar progress={progress.progress} />
        <h3>{currentQuestion.text}</h3>
        {currentQuestion && (
          <OptionList
            correct={currentQuestion.correct}
            selected={selected}
            disabled={disabled}
            options={currentQuestion.options}
            handleClick={handleClick}
          />
        )}
        {questions.findIndex((item) => item.id === currentQuestion.id) ===
          questions.length - 1 ? (
          <button disabled={!disabled} onClick={handleContinue}>
            Завершить тест
          </button>
        ) : (
          <button disabled={!disabled} onClick={handleContinue}>
            Продолжить
          </button>
        )}
      </>
    );
  }
  return <h1>Упс... Похоже что-то пошло не так(</h1>;
};
