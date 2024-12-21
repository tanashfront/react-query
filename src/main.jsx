import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App4 from './App4.jsx'
import './index.css'


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App4 />
    </QueryClientProvider>
  </StrictMode>,
)
