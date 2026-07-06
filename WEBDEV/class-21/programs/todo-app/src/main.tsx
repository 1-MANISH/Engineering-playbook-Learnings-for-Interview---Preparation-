
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './app/queryClient.ts'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

const root = document.getElementById('root')!

createRoot(root).render(
              <QueryClientProvider client = {queryClient}>
                        <Provider store = {store}>
                                <App />
                        </Provider>
              </QueryClientProvider>
)
