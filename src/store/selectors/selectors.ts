import { StateSchema } from "../../shared/types";

export const getTotalPoints = (state: any) => {
  if (state.test.questions) {
    return state.test.questions.reduce((acc, item) => {
      return acc + item.points;
    }, 0);
  }
};
export const getQuestionsCount = (state: any) => state.test.questions.length;
