import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { TypedUseSelectorHook } from "react-redux";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
export const useTypedDispatch = () => useDispatch<AppDispatch>();

const logger = useSelector((state: RootState) => state.logger)
