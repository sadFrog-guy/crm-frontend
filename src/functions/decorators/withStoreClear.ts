import { Dispatch } from "@reduxjs/toolkit";

import { setDisabled } from "@/store/selectedRowSlice";

export default function withStoreClear(
  dispatch: Dispatch,
  func: (link: string) => boolean,
) {
  return function (link: string) {
    const result = func(link);

    dispatch(setDisabled(true));

    return result;
  };
}
