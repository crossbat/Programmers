import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

export default function Error() {
  const err = useRouteError() as RouteError;
  return (
    <div>
      <h1>오류가 발생했습니다.</h1>
      <p>다음과 같은 에러가 발생했습니다.</p>
      <p>{err.statusText || err.message}</p>
    </div>
  )
}
