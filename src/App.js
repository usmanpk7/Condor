import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Login from './Auth/Login';
import AppLayout from './pages/AppLayout';
import { ProtectedLayout } from './ui/ProtectedLayout';
import { Toaster } from "react-hot-toast";
import Reply from './pages/Reply';
import Conversation from './pages/Conversation';
import TextPreview from './components/reply/TextPreview';
import { GlobalProvider } from './contextApi/Context';


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
      <GlobalProvider>
      <BrowserRouter>
      <Routes>
  
       <Route
  element={
    <ProtectedLayout>
      <AppLayout />
    </ProtectedLayout>
  }
>
   <Route index element={<Navigate replace to="conversation" />} />
  <Route path="conversation" element={<Conversation />} />
  <Route path="reply" element={<Reply />} />
  <Route path='reply-text-preview' element={<TextPreview />} />
   </Route> 

  <Route path="login" element={<Login />} />
      </Routes>
      </BrowserRouter>

       <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "16px 24px",
              backgroundColor: "var(--color-grey-0)",
              color: "var(--color-grey-700)",
            },
          }}
        />
</GlobalProvider>
    </QueryClientProvider>
  );
}
