import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import searchIcon from '../../../assets/search.png'
import profileIcon from '../../../assets/woman.png'
import homeBar from '../../../assets/home.png'
import profileBar from '../../../assets/profile.png'
import logoutIcon from '../../../assets/logout.png'
import { useNavigate } from 'react-router'

export const Profile = () => {
    const navigate = useNavigate();
    return (
        <div className='home-screen'>
            <nav className='navbar'>
                <TextComponent variant='h3'>My Shop Aisle</TextComponent>
                <div className='searchbar'>
                    <img src={searchIcon} alt='Search Icon' id='search-icon' />
                </div>
            </nav>

            <main className='main-content'>
                <div id='side-bar'>
                    <img src={profileIcon} alt='Profile Icon' id='profile-icon' />
                    <TextComponent variant='p' style={{ marginTop: '-20px', fontSize: '14px', textAlign: 'center' }}>Welcome Back!</TextComponent>
                    <TextComponent variant='p' style={{ marginTop: '-20px', fontSize: '14px', textAlign: 'center' }}>Hi, xxxx!</TextComponent>
                    <div id='home-bar'>
                        <img src={homeBar} onClick={() => navigate('/Home')} style={{ cursor: 'pointer' }} alt='Home Bar Icon' id='home-bar-icon' />
                        <TextComponent variant='p' style={{ marginTop: '-20px', fontSize: '14px', textAlign: 'center' }}>Home</TextComponent>
                    </div>
                    <div id='profile-bar'>
                        <img src={profileBar} alt='Profile Bar Icon' id='profile-bar-icon' />
                        <TextComponent variant='p' style={{ marginTop: '-20px', fontSize: '14px', textAlign: 'center' }}>Profile</TextComponent>
                    </div>
                    <img src={logoutIcon} alt='Logout Icon' onClick={() => navigate('/')} id='logout-icon' style={{ cursor: 'pointer' }} />
                    <TextComponent variant='p' style={{ marginTop: '-20px', fontSize: '14px', textAlign: 'center' }}>Logout</TextComponent></div>
                <div className='main-screen'>
                    <TextComponent variant='h4' style={{ marginTop: '10px' }}>My Profile</TextComponent>
                    
                </div>
            </main>
            <div className='container'></div>
        </div>
    )
}