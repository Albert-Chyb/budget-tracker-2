import { UserProvider } from '@/contexts/user-context.tsx';
import { initSupabase } from '@/lib/supabase/init.ts';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ReactQueryClientProvider } from './contexts/react-query-context.tsx';
import { ThemeProvider } from './contexts/theme.tsx';
import './index.css';
import { router } from './router-config.tsx';

initSupabase();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReactQueryClientProvider>
      <ThemeProvider>
        <UserProvider>
          <TooltipProvider>
            <RouterProvider router={router} />
          </TooltipProvider>
        </UserProvider>
      </ThemeProvider>
    </ReactQueryClientProvider>
  </React.StrictMode>
);
