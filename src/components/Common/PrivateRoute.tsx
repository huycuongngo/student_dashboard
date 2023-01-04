import { Navigate, RouteProps } from 'react-router-dom';

export function PrivateRoute( props: RouteProps):any {
  const isLogin = Boolean(localStorage.getItem("access_token"))
  if (!isLogin) return <Navigate to='/login' replace />

  return props.children
}
