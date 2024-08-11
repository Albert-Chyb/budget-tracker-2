import { UserProvider } from '@/contexts/user-context.tsx';
import { initSupabase } from '@/lib/supabase/init.ts';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from './contexts/theme.tsx';
import './index.css';
import { router } from './router-config.tsx';

initSupabase();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeProvider>
  </React.StrictMode>
);
