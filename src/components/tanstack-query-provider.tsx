'use client';
import { queryClient } from '@/core/configs/tanstack-query.config';
import { QueryClientProvider } from '@tanstack/react-query';

export const TanstackQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
