import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 2,
      staleTime: 1000 * 60 * 5, // 5 minutos antes de marcar los datos como "stale"
      refetchOnMount: false, // No recarga cuando el componente se monta si hay datos en caché
    },
    mutations: {
      retry: 1,
    },
  },
});
