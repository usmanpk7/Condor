import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Auth/Login';
import AppLayout from './pages/AppLayout';
import { ProtectedLayout } from './ui/ProtectedLayout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedLayout>
                <AppLayout />
              </ProtectedLayout>
            }
          >
         <Route index element={<Navigate replace to="/conversation" />} />
         <Route path="/conversation" element={<AppLayout> </AppLayout>}/>
          </Route>

          <Route path="login" element={<Login />}  />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
