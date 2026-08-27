import { useEffect, useState } from 'react'
import { Welcome } from './components/pages/Welcome/Welcome'
import { Register } from './components/pages/Register/Register'
import { Routes, Route } from 'react-router'
import { Login } from './components/pages/Login/Login'
import { Home } from './components/pages/Home/Home'
import { Profile } from './components/pages/Profile/Profile'
import { ProtectedRoute, PublicOnlyRoute } from './components/routing/ProtectedRoute'
import { useAppDispatch } from './store/hooks'
import { restoreSession } from './store/authSlice'

export const App = () => {
    const dispatch = useAppDispatch()
    const [checkingSession, setCheckingSession] = useState(true)

    useEffect(() => {
        dispatch(restoreSession()).finally(() => setCheckingSession(false))
    }, [dispatch])

    if (checkingSession) return <div>Loading...</div>

    return (
        <Routes>
            <Route path='/' element={<Welcome />} />
            <Route path='/Register' element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />
            <Route path='/Login' element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
            <Route path='/Home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path='/Profile' element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        </Routes>
    )
}