import { QuestionOption } from "../../../../shared/types";
import cls from "./OptionItem.module.scss";

export const OptionItem = ({
  option,
  handleClick,
  disabled,
  theme,
  selected,
}: {
  option: QuestionOption;
  handleClick: (option: QuestionOption) => void;
  disabled: boolean;
  theme: "red" | "green" | null;
  selected: boolean;
}) => {
  return (
    <>
      <label
        className={`${cls.option_item} ${theme ? cls[theme] : ""}`}
        onChange={() => handleClick(option)}
      >
        <input
          readOnly
          checked={selected}
          disabled={disabled}
          type={"checkbox"}
        />
        <h5>{option.text}</h5>
      </label>
    </>
  );
};
