import { Navigate } from 'react-router'
import { useAppSelector } from '../../store/hooks'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const currentUser = useAppSelector(state => state.auth.currentUser)
    if (!currentUser) return <Navigate to="/Login" replace />
    return <>{children}</>
}

export const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
    const currentUser = useAppSelector(state => state.auth.currentUser)
    if (currentUser) return <Navigate to="/Home" replace />
    return <>{children}</>
}