import { useEffect, useCallback } from "react";
import { userDataType } from "../types/UserDataType";

export default function useDebounce(
  effect: React.Dispatch<React.SetStateAction<userDataType[]>>,
  dependencies: any,
  delay: number
) {
  const callback = useCallback(effect, dependencies);

  useEffect(() => {
    const timeout = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}
