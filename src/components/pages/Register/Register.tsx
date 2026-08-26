import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import backArrow from '../../../assets/back-arrow.png'
import './register.css'
import { TextInput } from '../../inputs/TextInput'
import { useNavigate } from 'react-router'
import { CheckboxInput } from '../../inputs/CheckboxInput'
import { useState } from 'react'
import { useAppDispatch } from '../../../store/hooks'
import { updateProfile } from '../../../store/profileSlice'

export const Register = () => {
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [cellNumber, setCellNumber] = useState('')
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeToTerms(e.target.checked)
    }

    const handleSubmit = async () => {
        if (!agreeToTerms) return
        await dispatch(updateProfile({ name, surname, cellNumber }))
        navigate('/Home')
    }

    return (
        <div className='register-page'>
            <img src={backArrow} alt='Back Arrow Icon' id='back-arrow' onClick={() => navigate('/')} />
            <TextComponent variant='h3'>WELCOME</TextComponent>
            <TextComponent variant='h1'>Sign Up</TextComponent>
            <div className='register-fields'>
                <TextInput label='Name' id='name' placeholder='eg. Mark' type='text' value={name} onChange={(e) => setName(e.target.value)} />
                <TextInput label='Surname' id='surname' placeholder='eg. Johnson' type='text' value={surname} onChange={(e) => setSurname(e.target.value)} />
                <TextInput label='Email' id='email' placeholder='markjohnson@example.com' type='email' />
                <TextInput label='Password' id='password' placeholder='*********' type='password' />
                <TextInput label='Cell Number' id='cellNumber' placeholder='(+27) 123 456 789' type='text' value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} />

                <CheckboxInput id='agree-checkbox' name='terms' checked={agreeToTerms} onChange={handleCheck} label={' I agree to the Terms & Conditions.'} />
                <ButtonComponent onClick={handleSubmit} className='button-2'>Sign Up</ButtonComponent>
            </div>
        </div>
    )
}