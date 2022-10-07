import AuthProvider from './contexts/Auth/Provider';
import SwitchRoutes from './routes';

export default function App() {
  return (
    <AuthProvider>
      <SwitchRoutes />
    </AuthProvider>
  )
}