import { useNavigate } from 'react-router'
import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import './Welcome.css'
import welcomeImage from '../../../assets/welcome-image.jpg'

export const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className='welcome-wrapper'>
            <div id='welcome-page'>
                <TextComponent style={{fontSize: '40px', textAlign: 'center', marginTop: '20px', marginBottom: '20px'}}>My Shop Aisle</TextComponent>
                <img src={welcomeImage} style={{margin: 'auto'}} alt='Welcome Screen Image' id='welcome-image'/>
                <TextComponent variant='h4' style={{textAlign: 'center', marginTop: '20px'}}>Shopping lists made easier with My Shop Aisle app!</TextComponent>
                <div className='buttons'>
                    <ButtonComponent onClick={() => navigate('/Login')} className='button-1'>Sign In</ButtonComponent>
                    <ButtonComponent onClick={() => navigate('/Register')} className='button-2'>Sign Up</ButtonComponent>
                </div>
                <TextComponent variant='p'>By joining My Shop Aisle you agree to our Terms of Service, Privacy Policy, and Acts Policy.</TextComponent>
            </div>
        </div>
    )
}