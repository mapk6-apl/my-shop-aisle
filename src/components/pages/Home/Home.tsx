import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import searchIcon from '../../../assets/search.png'
import profileIcon from '../../../assets/woman.png'
import homeBar from '../../../assets/home.png'
import profileBar from '../../../assets/profile.png'
import logoutIcon from '../../../assets/logout.png'
import { useNavigate, useSearchParams } from 'react-router'
import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { fetchItems, addItem, editItem, deleteItem, toggleChecked } from '../../../store/shoppingListSlice'
import { AddItem } from '../../AddItem/AddItem'
import { Overlay } from '../../Overlay/Overlay'
import type { ShoppingItem } from '../../types/ShoppingItem'
import './Home.css'

type SortOption = 'name' | 'category' | 'date-added'

const sortLabels: Record<SortOption, string> = {
    'name': 'Name',
    'category': 'Category',
    'date-added': 'Date Added'
}

export const Home = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const items = useAppSelector(state => state.shoppingList.items);
    const status = useAppSelector(state => state.shoppingList.status);

    const [searchParams, setSearchParams] = useSearchParams();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
    const [deleteTarget, setDeleteTarget] = useState<ShoppingItem | null>(null);

    const [showSortMenu, setShowSortMenu] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const location = useLocation();
    const [selectedNames, setSelectedNames] = useState<string[]>([]);
    const sortRef = useRef<HTMLDivElement>(null);
    const filterRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        dispatch(fetchItems());
    }, [dispatch]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
                setShowSortMenu(false);
            }
            if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
                setShowFilters(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const searchQuery = searchParams.get('search') || '';
    const sortBy = (searchParams.get('sort') as SortOption) || 'name';

    const updateSearch = (value: string) => {
        const next = new URLSearchParams(searchParams);
        if (value) next.set('search', value); else next.delete('search');
        setSearchParams(next);
    }

    const updateSort = (value: SortOption) => {
        const next = new URLSearchParams(searchParams);
        next.set('sort', value);
        setSearchParams(next);
        setShowSortMenu(false);
    }

    const openAddModal = () => {
        setEditingItem(null);
        setIsModalOpen(true);
    }

    const openEditModal = (item: ShoppingItem) => {
        setEditingItem(item);
        setIsModalOpen(true);
    }

    const handleSave = (data: { name: string, quantity: number, category: string, notes: string, image: string | null }) => {
        if (editingItem) {
            dispatch(editItem({ id: editingItem.id, data }));
        } else {
            dispatch(addItem(data));
        }
    }

    const confirmDelete = () => {
        if (deleteTarget) {
            dispatch(deleteItem(deleteTarget.id));
            setDeleteTarget(null);
        }
    }

    const nameOptions = Array.from(new Set(items.map(item => item.name)));

    const toggleNameFilter = (name: string) => {
        setSelectedNames(prev =>
            prev.includes(name) ? prev.filter(n => n !== name) : prev.concat(name)
        );
    }

    let visibleItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedNames.length > 0) {
        visibleItems = visibleItems.filter(item => selectedNames.includes(item.name));
    }

    const sortedItems = [...visibleItems].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        return Number(a.id) - Number(b.id);
    })

    const isHomeActive = location.pathname.toLowerCase() === '/home';
    const isProfileActive = location.pathname.toLowerCase() === '/profile';

    return (
        <div className='home-screen'>
            <nav className='navbar'>
                <TextComponent variant='h3'>My Shop Aisle</TextComponent>
                <div className='searchbar'>
                    <img src={searchIcon} alt='Search Icon' id='search-icon' />
                    <input
                        type='text'
                        placeholder='Search items...'
                        value={searchQuery}
                        onChange={(e) => updateSearch(e.target.value)}
                        id='search-input'
                    />
                </div>
            </nav>

            <main className='main-content'>
                <div id='side-bar'>
                    <img src={profileIcon} alt='Profile Icon' id='profile-icon' />
                    <TextComponent variant='p'>Welcome Back!</TextComponent>
                    <TextComponent variant='p'>Hi, xxxx!</TextComponent>
                    <div id='home-bar' className={isHomeActive ? 'nav-item nav-item-active' : 'nav-item'}>
                        <img src={homeBar} onClick={() => navigate('/Home')} alt='Home Bar Icon' id='home-bar-icon' />
                        <TextComponent variant='p'>Home</TextComponent>
                    </div>
                    <div id='profile-bar' className={isProfileActive ? 'nav-item nav-item-active' : 'nav-item'}>
                        <img src={profileBar} alt='Profile Bar Icon' onClick={() => navigate('/Profile')} id='profile-bar-icon' />
                        <TextComponent variant='p'>Profile</TextComponent>
                    </div>
                    <img src={logoutIcon} alt='Logout Icon' onClick={() => navigate('/')} id='logout-icon' />
                    <TextComponent variant='p'>Logout</TextComponent>
                </div>

                <div className='main-screen'>
                    <div className='list-header'>
                        <div>
                            <TextComponent variant='h4'>My Lists</TextComponent>
                            <TextComponent variant='p' className='list-subtitle'>{items.length} items on the list</TextComponent>
                        </div>
                        <ButtonComponent onClick={openAddModal} className='add-item-button'>+ Add New Item</ButtonComponent>
                    </div>

                    <div id='buttons'>
                        <ButtonComponent onClick={() => setSelectedNames([])}
                            className={selectedNames.length === 0 ? 'chip chip-active' : 'chip'}>
                            All
                        </ButtonComponent>

                        <div className='filter-wrapper' ref={filterRef}>
                            <ButtonComponent onClick={() => setShowFilters(!showFilters)} className='chip'>
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </ButtonComponent>
                            {showFilters && (
                                <div className='filter-panel'>
                                    <TextComponent variant='p' className='filter-panel-title'>Name</TextComponent>
                                    {nameOptions.length === 0 && (
                                        <TextComponent variant='p' className='filter-empty'>No items yet</TextComponent>
                                    )}
                                    {nameOptions.map(name => (
                                        <label className='filter-checkbox-row' key={name}>
                                            <input
                                                type='checkbox'
                                                checked={selectedNames.includes(name)}
                                                onChange={() => toggleNameFilter(name)}
                                            />
                                            {name}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='sort-wrapper' ref={sortRef}>
                            <ButtonComponent onClick={() => setShowSortMenu(!showSortMenu)} className='chip'>
                                Sort By: {sortLabels[sortBy]}
                            </ButtonComponent>
                            {showSortMenu && (
                                <div className='sort-menu'>
                                    {(Object.keys(sortLabels) as SortOption[]).map(option => (
                                        <div
                                            key={option}
                                            className={sortBy === option ? 'sort-option sort-option-active' : 'sort-option'}
                                            onClick={() => updateSort(option)}
                                        >
                                            {sortBy === option && <span className='check-mark'>✓</span>}
                                            {sortLabels[option]}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        </div>

                        <div className='table-wrapper'>
                            {status === 'loading' && <TextComponent variant='p' className='empty-row'>Loading...</TextComponent>}

                            {status !== 'loading' && (
                                <table id='item-table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Quantity</th>
                                            <th>Category</th>
                                            <th>Notes</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedItems.length === 0 && (
                                            <tr>
                                                <td colSpan={6} className='empty-row'>No items yet.</td>
                                            </tr>
                                        )}
                                        {sortedItems.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    {item.image
                                                        ? <img src={item.image} alt={item.name} className='item-thumb' />
                                                        : <div className='item-thumb' style={{ background: '#f0ede4' }} />}
                                                </td>
                                                <td>{item.name}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.category}</td>
                                                <td className='notes-cell'>{item.notes}</td>
                                                <td className='actions-cell'>
                                                    <button className='edit-button' onClick={() => openEditModal(item)}>Edit</button>
                                                    <button className='delete-button' onClick={() => setDeleteTarget(item)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
            </main>

            <AddItem
                isVisible={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingItem={editingItem}
            />

            {deleteTarget && (
                <Overlay>
                    <div className='delete-modal'>
                        <TextComponent variant='h3'>Delete Item</TextComponent>
                        <p className='delete-message'>
                            Are you sure you want to delete <strong>"{deleteTarget.name}"</strong>?<br />
                            This action cannot be undone.
                        </p>
                        <div className='yes-no-buttons'>
                            <ButtonComponent className='cancel' onClick={() => setDeleteTarget(null)}>No, Cancel.</ButtonComponent>
                            <ButtonComponent className='confirm-delete-button' onClick={confirmDelete}>Yes, Delete.</ButtonComponent>
                        </div>
                    </div>
                </Overlay>
            )}

        </div>
    )
}