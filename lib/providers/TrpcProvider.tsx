import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { API } from "lib/utils/trpc";
import { ReactElement, useState } from "react"

function getBaseUrl() {
  if (typeof window !== 'undefined')
    return '';

  if (process.env.VERCEL_URL)
    return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 80}`;
}

const TrpcProvider: React.FC<{ children: ReactElement }> = ({ children }) => {

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    API.createClient({
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/trpc`,
          // optional
          headers() {
            return {
              // authorization: getAuthCookie(),
            };
          },
        }),
      ],
    }),
  );
  return (
    <API.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </API.Provider>
  );

}

export default TrpcProvider
