import { useEffect } from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();

  useEffect(() => {
    console.log(error);
  }, [error]);

  return <h1>Napotkano niespodziewany błąd !</h1>;
}
