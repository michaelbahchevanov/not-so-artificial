import type { AppProps } from 'next/app'
import "tailwindcss/tailwind.css"
import { AuthProvider } from '../hooks/useAuth'

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default App
