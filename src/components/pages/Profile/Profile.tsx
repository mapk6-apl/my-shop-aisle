import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import searchIcon from '../../../assets/search.png'
import defaultProfileIcon from '../../../assets/woman.png'
import homeBar from '../../../assets/home.png'
import profileBar from '../../../assets/profile.png'
import logoutIcon from '../../../assets/logout.png'
import { useNavigate, useLocation } from 'react-router'
import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchProfile, updateProfile } from '../../../store/profileSlice'
import { logout, changePassword } from '../../../store/authSlice'
import { clearItems } from '../../../store/shoppingListSlice'
import { AvatarPicker } from './AvatarPicker'
import '../Home/Home.css'

export const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const currentUser = useAppSelector(state => state.auth.currentUser);
    const authError = useAppSelector(state => state.auth.error);
    const profile = useAppSelector(state => state.profile.profile);

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [cellNumber, setCellNumber] = useState('');
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState('');

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

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

    const handleSave = async () => {
        if (!profile || !currentUser) return;
        setSaving(true);
        setFormError('');

        await dispatch(updateProfile({ profileId: profile.id, data: { name, surname, cellNumber } }));

        //only touch password if the user actually typed something into either field
        if (currentPassword || newPassword) {
            if (!currentPassword || !newPassword) {
                setFormError('Enter both your current and new password to change it.');
                setSaving(false);
                return;
            }
            const result = await dispatch(changePassword({ userId: currentUser.id, currentPassword, newPassword }));
            if (!changePassword.fulfilled.match(result)) {
                setSaving(false);
                return; //authError from Redux will already show the reason (ex. wrong current password)
            }
            setCurrentPassword('');
            setNewPassword('');
        }

        setSaved(true);
        setSaving(false);
        setTimeout(() => setSaved(false), 2500);
    }

    const handleSelectAvatar = (url: string) => {
        if (!profile) return;
        dispatch(updateProfile({ profileId: profile.id, data: { picture: url } }));
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearItems());
        navigate('/');
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

                    <img src={logoutIcon} alt='Logout Icon' onClick={handleLogout} id='logout-icon' />
                    <TextComponent variant='p'>Logout</TextComponent>
                </div>

                <div className='main-screen'>
                    <TextComponent variant='h4'>My Profile</TextComponent>

                    <div className='profile-picture-row'>
                        <img src={profile?.picture || defaultProfileIcon} alt='Current profile' className='profile-large-avatar' />
                        <TextComponent variant='p' className='list-subtitle'>Pick an avatar below</TextComponent>
                    </div>

                    <AvatarPicker
                        selectedAvatar={profile?.picture || null}
                        onSelect={handleSelectAvatar}
                    />

                    <div className='profile-form-field'>
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

                    <TextComponent variant='h4' style={{ marginTop: '32px' }}>Change Password</TextComponent>
                    <TextComponent variant='p' className='list-subtitle'>Leave blank if you don't want to change your password</TextComponent>

                    <div className='profile-form-field'>
                        <label>Current Password</label>
                        <input type='password' value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className='profile-form-field'>
                        <label>New Password</label>
                        <input type='password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    </div>

                    {formError && <p className='form-error'>{formError}</p>}
                    {authError && <p className='form-error'>{authError}</p>}

                    <ButtonComponent onClick={handleSave} className='save-profile-button'>
                        {saving ? 'Saving...' : 'Save Changes'}
                    </ButtonComponent>
                    {saved && <TextComponent variant='p' className='form-success'>Profile updated!</TextComponent>}
                </div>
            </main>
        </div>
    )
}