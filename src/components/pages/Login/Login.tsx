import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import backArrow from '../../../assets/back-arrow.png'
import './Login.css'
import { TextInput } from '../../inputs/TextInput'
import { useNavigate } from 'react-router'
import { CheckboxInput } from '../../inputs/CheckboxInput'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { loginUser } from '../../../store/authSlice'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.auth.status)
    const error = useAppSelector(state => state.auth.error)
    const navigate = useNavigate()

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked)
    }

    const handleSubmit = async () => {
        const result = await dispatch(loginUser({ email, password }))
        if (loginUser.fulfilled.match(result)) {
            navigate('/Home')
        }
    }

    return (
        <div className='login-page'>
            <img src={backArrow} alt='Back Arrow Icon' id='back-arrow' onClick={() => navigate('/')} />
            <TextComponent variant='h3'>WELCOME BACK!</TextComponent>
            <TextComponent variant='h1'>Sign In</TextComponent>
            <div className='login-fields'>
                <TextInput label='Email' id='email' placeholder='markjohnson@example.com' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextInput label='Password' id='password' placeholder='*********' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

                <CheckboxInput id='remember-me-checkbox' name='remember-me' checked={rememberMe} onChange={handleCheck} label={' Remember me'} />

                {error && <p className='form-error'>{error}</p>}

                <ButtonComponent onClick={handleSubmit} className='button-2'>
                    {status === 'loading' ? 'Signing in...' : 'Sign In'}
                </ButtonComponent>
            </div>
        </div>
    )
}