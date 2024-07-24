import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";
import { MessageResponse } from "../types/api-types";
import moment from "moment";

type ResType =
  | {
      data: MessageResponse;
    }
  | {
      error: FetchBaseQueryError | SerializedError;
    };

export const responseToast = (
  res: ResType,
  navigate: NavigateFunction | null,
  url: string
) => {
  if ("data" in res) {
    toast.success(res.data.message);
    if (navigate) navigate(url);
  } else {
    const error = res.error as FetchBaseQueryError;
    const messageResponse = error.data as MessageResponse;

    toast.error(messageResponse.message);
  }
};

export const getLastMonths = () => {
  const currentDate = moment();
  currentDate.date(1);
  const last6Months: string[] = [];
  const last12onths: string[] = [];

  for (let i = 0; i < 6; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last6Months.unshift(monthName); //it push the data before the last data
    //here we use unshift instead of push because if we do push then the last month is pushed first
  }

  for (let i = 0; i < 12; i++) {
    const monthDate = currentDate.clone().subtract(i, "months");
    const monthName = monthDate.format("MMMM");
    last12onths.unshift(monthName);
  }

  return {
    last12onths,
    last6Months,
  };
};
