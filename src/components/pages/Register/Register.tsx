import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import backArrow from '../../../assets/back-arrow.png'
import './register.css'
import { TextInput } from '../../inputs/TextInput'
import { useNavigate } from 'react-router'
import { CheckboxInput } from '../../inputs/CheckboxInput'
import { useState } from 'react'

export const Register = () => {
    const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);



    const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeToTerms(e.target.checked);
    }

    const navigate = useNavigate();
    return (
        <div className='register-page'>
            <img src={backArrow} alt='Back Arrow Icon' id='back-arrow' onClick={() => navigate('/')} />
            <TextComponent variant='h3'>WELCOME</TextComponent>
            <TextComponent variant='h1'>Sign Up</TextComponent>
            <div className='register-fields'>
                <TextInput label='Name' id='name' placeholder='eg. Mark' type='text' ></TextInput>
                <TextInput label='Surname' id='surname' placeholder='eg. Johnson' type='text'></TextInput>
                <TextInput label='Email' id='email' placeholder='markjohnson@example.com' type='email'></TextInput>
                <TextInput label='Password' id='password' placeholder='*********' type='password'></TextInput>
                <TextInput label='Cell Number' id='cellNumber' placeholder='(+27) 123 456 789' type='cellNumber'></TextInput>

                <CheckboxInput id='agree-checkbox' name='terms' checked={agreeToTerms} onChange={handleCheck} label={' I agree to the Terms & Conditions.'} />
                <ButtonComponent onClick={() => navigate('/Register')} className='button-2'>Sign Up</ButtonComponent>
            </div>
        </div>
    )
}
