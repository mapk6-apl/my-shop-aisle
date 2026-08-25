import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import searchIcon from '../../../assets/search.png'
import defaultProfileIcon from '../../../assets/woman.png'
import homeBar from '../../../assets/home.png'
import profileBar from '../../../assets/profile.png'
import logoutIcon from '../../../assets/logout.png'
import { useNavigate } from 'react-router'
import { useState, useRef } from 'react'

export const Profile = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profilePicture, setProfilePicture] = useState<string | null>(() => {
        return localStorage.getItem('profile-picture')
    });

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            setProfilePicture(result);
            localStorage.setItem('profile-picture', result);
        }
        reader.readAsDataURL(file);
    }

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
                    <img src={profilePicture || defaultProfileIcon} alt='Profile Icon' id='profile-icon' />
                    <TextComponent variant='p'>Welcome Back!</TextComponent>
                    <TextComponent variant='p'>Hi, xxxx!</TextComponent>
                    <div id='home-bar'>
                        <img src={homeBar} onClick={() => navigate('/Home')} alt='Home Bar Icon' id='home-bar-icon' />
                        <TextComponent variant='p'>Home</TextComponent>
                    </div>
                    <div id='profile-bar'>
                        <img src={profileBar} alt='Profile Bar Icon' id='profile-bar-icon' />
                        <TextComponent variant='p'>Profile</TextComponent>
                    </div>
                    <img src={logoutIcon} alt='Logout Icon' onClick={() => navigate('/')} id='logout-icon' />
                    <TextComponent variant='p'>Logout</TextComponent>
                </div>

                <div className='main-screen'>
                    <TextComponent variant='h4'>My Profile</TextComponent>

                    <div className='profile-picture-row'>
                        <img src={profilePicture || defaultProfileIcon} alt='Current profile' className='profile-large-avatar' />
                        <div>
                            <ButtonComponent onClick={() => fileInputRef.current?.click()} className='update-picture-button'>
                                Update Picture
                            </ButtonComponent>
                            <input
                                type='file'
                                accept='image/*'
                                ref={fileInputRef}
                                onChange={handlePictureChange}
                                style={{ display: 'none' }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}