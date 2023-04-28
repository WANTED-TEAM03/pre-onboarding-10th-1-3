import { useRoutes } from 'react-router-dom';
import { routes } from '@/routes/Routes';

export default function App() {
  const routedElements = useRoutes(routes);
  return <div>{routedElements}</div>;
}
