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

<TextInput label='Name' id='name' placeholder='enter name' type='text'></TextInput>
<TextInput label='Surname' id='name' placeholder='enter name' type='text'></TextInput>
<TextInput label='Email' id='name' placeholder='enter name' type='text'></TextInput>
</div>
    </div>
  )
}
