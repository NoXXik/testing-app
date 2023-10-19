import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  AnswerHistory,
  Progress,
  Question,
  StateSchema,
  User,
} from "../../shared/types";

const initialState: StateSchema = {
  questions: [],
  user: null,
  progress: null,
  answer_history: [],
};
export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    addPoints: (state, action: PayloadAction<number>) => {
      if (state.user) {
        state.user.points = state.user.points + action.payload;
      }
    },
    sendAnswer: (state, action: PayloadAction<AnswerHistory>) => {
      // Отправляем ответ в store для ее обработки и изменения стостояний прогресса, баллов и сохранения в ls
      state.answer_history = state.answer_history.concat(action.payload);
      const question = state.questions.filter(
        (item) => item.id === action.payload.question_id,
      )[0];
      if (
        state.user &&
        question &&
        question.correct.length ===
          new Set([...question.correct, ...action.payload.answer]).size
      ) {
        state.user.points = state.user.points + question.points;
        localStorage.setItem("user", JSON.stringify(state.user));
      }
      const questionIndex = state.questions.findIndex(
        (item) => item.id === question.id,
      );
      if (state.progress) {
        state.progress = {
          ...state.progress,
          current_question:
            state.questions[
              Math.min(questionIndex + 1, state.questions.length - 1)
            ].id,
          progress: (100 / state.questions.length) * (questionIndex + 1),
        };
      }
      localStorage.setItem("progress", JSON.stringify(state.progress));
      localStorage.setItem(
        "answer_history",
        JSON.stringify(state.answer_history),
      );
    },
    initProgress: (state) => {
      state.progress = {
        progress: 0,
        start_time: Date.now() / 1000,
        end_time: null,
        current_question: state.questions[0].id,
      };
      localStorage.setItem("progress", JSON.stringify(state.progress));
      localStorage.removeItem("answer_history");
    },
    setProgress: (state, action: PayloadAction<Progress>) => {
      state.progress = action.payload;
      localStorage.setItem("progress", JSON.stringify(state.progress));
    },
    setAnswerHistory: (state, action: PayloadAction<AnswerHistory[]>) => {
      state.answer_history = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addPoints,
  setUser,
  sendAnswer,
  setQuestions,
  initProgress,
  setProgress,
  setAnswerHistory,
} = testSlice.actions;

export default testSlice.reducer;
