import { QueryClient } from "@tanstack/react-query";

// like storage - everything comes here after fetch
export const queryClient = new QueryClient({
        defaultOptions:{
                queries:{
                        staleTime:1000*60,// 1min as fresh - uses cache for any get request
                        gcTime:1000*60*5,// cacheTime -no body uses query  throw to garbage collection
                        retry:2,
                        refetchOnWindowFocus:false,// on coming to window it not fetch again
                }
        }
})