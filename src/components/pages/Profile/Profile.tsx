import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import searchIcon from '../../../assets/search.png'
import defaultProfileIcon from '../../../assets/woman.png'
import homeBar from '../../../assets/home.png'
import profileBar from '../../../assets/profile.png'
import logoutIcon from '../../../assets/logout.png'
import { useNavigate, useLocation } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchProfile, updateProfile } from '../../../store/profileSlice'
import { logout } from '../../../store/authSlice'
import { clearItems } from '../../../store/shoppingListSlice'
import '../Home/Home.css'

export const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector(state => state.auth.currentUser);
    const profile = useAppSelector(state => state.profile.profile);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [cellNumber, setCellNumber] = useState('');
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchProfile(currentUser.id));
        }
    }, [dispatch, currentUser]);

    useEffect(() => {
        if (profile) {
            setName(profile.name);
            setSurname(profile.surname);
            setCellNumber(profile.cellNumber);
        }
    }, [profile]);

    const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !profile) return;
        const reader = new FileReader();
        reader.onload = () => {
            dispatch(updateProfile({ profileId: profile.id, data: { picture: reader.result as string } }));
        }
        reader.readAsDataURL(file);
    }

    const handleSaveChanges = async () => {
        if (!profile) return;
        await dispatch(updateProfile({ profileId: profile.id, data: { name, surname, cellNumber } }));
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    }

    const isHomeActive = location.pathname.toLowerCase() === '/home';
    const isProfileActive = location.pathname.toLowerCase() === '/profile';

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
                    <img src={profile?.picture || defaultProfileIcon} alt='Profile Icon' id='profile-icon' />
                    <TextComponent variant='p'>Welcome Back!</TextComponent>
                    <TextComponent variant='p'>Hi, {profile?.name || 'there'}!</TextComponent>
                    <div id='home-bar' className={isHomeActive ? 'nav-item nav-item-active' : 'nav-item'} onClick={() => navigate('/Home')}>
                        <img src={homeBar} alt='Home Bar Icon' id='home-bar-icon' />
                        <TextComponent variant='p'>Home</TextComponent>
                    </div>
                    <div id='profile-bar' className={isProfileActive ? 'nav-item nav-item-active' : 'nav-item'}>
                        <img src={profileBar} alt='Profile Bar Icon' id='profile-bar-icon' />
                        <TextComponent variant='p'>Profile</TextComponent>
                    </div>
                    <img src={logoutIcon} alt='Logout Icon' onClick={() => {
                        dispatch(logout());
                        dispatch(clearItems());
                        navigate('/');
                    }} id='logout-icon' />
                    <TextComponent variant='p'>Logout</TextComponent>
                </div>

                <div className='main-screen'>
                    <TextComponent variant='h4'>My Profile</TextComponent>

                    <div className='profile-picture-row'>
                        <img src={profile?.picture || defaultProfileIcon} alt='Current profile' className='profile-large-avatar' />
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

                    <div className='profile-form-field' style={{marginTop: '30px'}}>
                        <label>Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='profile-form-field'>
                        <label>Surname</label>
                        <input value={surname} onChange={(e) => setSurname(e.target.value)} />
                    </div>
                    <div className='profile-form-field'>
                        <label>Cell Number</label>
                        <input value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} />
                    </div>

                    <ButtonComponent onClick={handleSaveChanges} className='save-profile-button'>
                        Save Changes
                    </ButtonComponent>
                    {saved && <TextComponent variant='p' className='form-success'>Profile updated!</TextComponent>}
                </div>
            </main>
        </div>
    )
}