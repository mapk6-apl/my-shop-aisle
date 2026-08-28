import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import backArrow from '../../../assets/back-arrow.png'
import './Register.css'
import { TextInput } from '../../inputs/TextInput'
import { useNavigate } from 'react-router'
import { CheckboxInput } from '../../inputs/CheckboxInput'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { registerUser } from '../../../store/authSlice'

export const Register = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cellNumber, setCellNumber] = useState('')
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const status = useAppSelector(state => state.auth.status)
    const error = useAppSelector(state => state.auth.error)
    const navigate = useNavigate()

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeToTerms(e.target.checked)
    }

    const handleSubmit = async () => {
        if (!agreeToTerms) return

        const result = await dispatch(registerUser({ name, surname, email, password, cellNumber }))

        if (registerUser.fulfilled.match(result)) {
            navigate('/Home')
        }
    }

    return (
        <div className='register-wrapper'>
            <div className='register-page'>
                <img src={backArrow} alt='Back Arrow Icon' id='back-arrow' onClick={() => navigate('/')} />
                <TextComponent variant='h3'>WELCOME</TextComponent>
                <TextComponent variant='h1'>Sign Up</TextComponent>
                <div className='register-fields'>
                    <TextInput label='Name' id='name' placeholder='ex. Mark' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    <TextInput label='Surname' id='surname' placeholder='ex. Johnson' type='text' value={surname} onChange={(e) => setSurname(e.target.value)} />
                    <TextInput label='Email' id='email' placeholder='ex. markjohnson@example.com' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    <TextInput label='Password' id='password' placeholder='*********' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <TextInput label='Cell Number' id='cellNumber' placeholder='(+27) 123 456 789' type='text' value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} />

                    <CheckboxInput id='agree-checkbox' name='terms' checked={agreeToTerms} onChange={handleCheck} label={' I agree to the Terms & Conditions.'} />

                    {error && <p className='form-error'>{error}</p>}

                    <ButtonComponent onClick={handleSubmit} className='button-2'>
                        {status === 'loading' ? 'Signing up...' : 'Sign Up'}
                    </ButtonComponent>
                </div>
            </div>
        </div>
    )
}