import './App.css'
import routes from "@routes/routes.jsx";
import {useRoutes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  const routers = useRoutes(routes);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {routers}
        {/*<ReactQueryDevtools initialIsOpen={false} />*/}
      </QueryClientProvider>
    </>
  )
}

export default App;
