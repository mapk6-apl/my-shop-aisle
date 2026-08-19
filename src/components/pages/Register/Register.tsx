import {TextComponent} from '../../../TextComponent'
import {ButtonComponent} from '../../../ButtonComponent'
import backArrow from '../../../assets/back-arrow.png'
import './register.css'
import {TextInput} from '../../inputs/TextInput'

export const Register = () => {
  return (
    <div className='register-page'>
    <img src={backArrow} alt='Back Arrow Icon' id='back-arrow'/>
        <TextComponent variant='h3'>WELCOME</TextComponent>
<TextComponent variant='h1'>Sign Up</TextComponent>
<div className='register-fields'>
<TextInput label='Name' id='name' placeholder='eg. Mark' type='text' ></TextInput>
<TextInput label='Surname' id='surname' placeholder='eg. Johnson' type='text'></TextInput>
<TextInput label='Email' id='email' placeholder='markjohnson@example.com' type='email'></TextInput>
<TextInput label='Password' id='password' placeholder='*********' type='password'></TextInput>
<TextInput label='Cell Number' id='cellNumber' placeholder='(+27) 123 456 789' type='cellNumber'></TextInput>
</div>
    </div>
  )
}
