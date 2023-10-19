import { memo } from "react";
import { TestHistory } from "../../../shared/types";
import cls from "./TestHistoryList.module.scss";

export const TestHistoryList = memo(
  ({ results }: { results: TestHistory[] }) => {
    return (
      <table className={cls.table}>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Время</th>
            <th>Баллы</th>
          </tr>
        </thead>
        <tbody>
          {results.reverse().map((result, id) => (
            <tr key={id}>
              <td>{results.length - id}</td>
              <td>{result.name}</td>
              <td>{result.time}</td>
              <td>{result.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  },
);
