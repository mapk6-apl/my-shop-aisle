import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import backArrow from '../../../assets/back-arrow.png'
import './login.css'
import { TextInput } from '../../inputs/TextInput'
import { useNavigate } from 'react-router'
import { CheckboxInput } from '../../inputs/CheckboxInput'
import { useState } from 'react'

export const Login = () => {
    const [rememberMe, setRememberMe] = useState<boolean>(false);

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.target.checked);
    }

    const navigate = useNavigate();
    return (
        <div className='login-page'>
            <img src={backArrow} alt='Back Arrow Icon' id='back-arrow' onClick={() => navigate('/')} />
            <TextComponent variant='h3'>WELCOME BACK!</TextComponent>
            <TextComponent variant='h1'>Sign In</TextComponent>
            <div className='login-fields'>
                <TextInput label='Email' id='email' placeholder='markjohnson@example.com' type='email'></TextInput>
                <TextInput label='Password' id='password' placeholder='*********' type='password'></TextInput>

                <CheckboxInput id='remember-me-checkbox' name='remember-me' checked={rememberMe} onChange={handleCheck} label={' Remember me'} />
                <ButtonComponent onClick={() => navigate('/Home')} className='button-2'>Sign In</ButtonComponent>
            </div>
        </div>
    )
}

