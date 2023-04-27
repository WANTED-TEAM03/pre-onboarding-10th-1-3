import { useRoutes } from 'react-router-dom';
import { routes } from '@/routes/Routes';

function App() {
  const routedElements = useRoutes(routes);
  return <div>{routedElements}</div>;
}

export default App;
