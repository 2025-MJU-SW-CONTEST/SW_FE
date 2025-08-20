import './App.css'
import routes from "@routes/routes.jsx";
import ToastMessage from "@components/common/ToastMessage.jsx";
import {useToast} from "@store/useToast.js";
import {useRoutes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient();

function App() {
  const {message, hideToast} = useToast();
  const routers = useRoutes(routes);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {routers}
        <ToastMessage message={message} onClose={hideToast}/>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  )
}

export default App;
