import { Fragment, useMemo } from "react";
import { QuestionOption } from "../../../../shared/types";
import { OptionItem } from "../OptionItem/OptionItem";
import cls from "./OptionList.module.scss";
export const OptionList = ({
  options,
  handleClick,
  disabled,
  correct,
  selected,
}: {
  options: QuestionOption[];
  handleClick: (options: QuestionOption) => void;
  disabled: boolean;
  correct: number[];
  selected: number[];
}) => {
  // Создаем новый массив на основе входящего для реализации случайного порядка ответов,
  // с мемоизацией, для предотвращения повторного изменения порядка ответов во время нового рендера
  const newOptions = useMemo(
    () => [...options].sort(() => Math.random() - 0.5),
    [options],
  );

  return (
    <div className={cls.option_list}>
      {newOptions &&
        newOptions.map((option) => {
          let theme: "green" | "red" | null = null;
          if (
            (selected.includes(option.id) || disabled) &&
            correct.includes(option.id)
          ) {
            theme = "green";
          }
          if (theme === null && selected.includes(option.id)) {
            theme = "red";
          }
          return (
            <Fragment key={option.id}>
              <OptionItem
                selected={selected.includes(option.id)}
                disabled={disabled}
                option={option}
                handleClick={handleClick}
                theme={theme}
              />
            </Fragment>
          );
        })}
    </div>
  );
};
