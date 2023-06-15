import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const WorkInProgress: FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        "flex h-full flex-col items-center justify-center bg-gray-900 p-3 text-white"
      }
    >
      <h1 className={"mb-2 text-2xl font-bold"}>Work in progress</h1>
      <button
        className={
          "mb-2 mr-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-800"
        }
        onClick={() => navigate(-1)}
        type={"button"}
      >
        Go back
      </button>
    </div>
  );
};
