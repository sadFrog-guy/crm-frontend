import { setDisabled } from "@/store/selectedRowSlice";
import { Dispatch } from "@reduxjs/toolkit";

export default function withStoreClear(dispatch: Dispatch, func: (link: string) => boolean) {
  return function (link: string) {
    const result = func(link);

    dispatch(setDisabled(true))
    
    return result
  }
}