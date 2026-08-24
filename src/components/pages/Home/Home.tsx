import { TextComponent } from '../../../TextComponent'
import { ButtonComponent } from '../../../ButtonComponent'
import searchIcon from '../../../assets/search.png'
import profileIcon from '../../../assets/woman.png'
import homeBar from '../../../assets/home.png'
import profileBar from '../../../assets/profile.png'
import logoutIcon from '../../../assets/logout.png'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useShoppingList } from '../../hooks/ShoppingList'
import { AddItem } from '../../AddItem/AddItem'
import { Overlay } from '../../Overlay/Overlay'
import type { ShoppingItem } from '../../types/ShoppingItem'
import './Home.css'

type SortOption = 'name' | 'quantity-asc' | 'quantity-desc' | 'category'

const sortLabels: Record<SortOption, string> = {
    'name': 'Name',
    'category': 'Category',
    'quantity-asc': 'Quantity - Low to High',
    'quantity-desc': 'Quantity - High to Low'
}

export const Home = () => {
    const navigate = useNavigate();
    const { items, addItem, editItem, deleteItem, toggleChecked } = useShoppingList();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<ShoppingItem | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteTarget, setDeleteTarget] = useState<ShoppingItem | null>(null);

    const [showSortMenu, setShowSortMenu] = useState(false);
    const [sortBy, setSortBy] = useState<SortOption>('name');

    const [showFilters, setShowFilters] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
            editItem(editingItem.id, data);
        } else {
            addItem(data);
        }
    }

    const confirmDelete = () => {
        if (deleteTarget) {
            deleteItem(deleteTarget.id);
            setDeleteTarget(null);
        }
    }

    const allCategories = Array.from(new Set(items.map(item => item.category).filter(Boolean)));

    const toggleCategoryFilter = (category: string) => {
        setSelectedCategories(prev =>
            prev.includes(category) ? prev.filter(c => c !== category) : prev.concat(category)
        );
    }

    let visibleItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (selectedCategories.length > 0) {
        visibleItems = visibleItems.filter(item => selectedCategories.includes(item.category));
    }

    const sortedItems = [...visibleItems].sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'category') return a.category.localeCompare(b.category);
        if (sortBy === 'quantity-asc') return a.quantity - b.quantity;
        return b.quantity - a.quantity; // quantity-desc
    })

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
                        onChange={(e) => setSearchQuery(e.target.value)}
                        id='search-input'
                    />
                </div>
            </nav>

            <main className='main-content'>
                <div id='side-bar'>
                    <img src={profileIcon} alt='Profile Icon' id='profile-icon' />
                    <TextComponent variant='p'>Welcome Back!</TextComponent>
                    <TextComponent variant='p'>Hi, xxxx!</TextComponent>
                    <div id='home-bar'>
                        <img src={homeBar} alt='Home Bar Icon' id='home-bar-icon' />
                        <TextComponent variant='p'>Home</TextComponent>
                    </div>
                    <div id='profile-bar'>
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
                        <ButtonComponent onClick={() => setSelectedCategories([])}
                            className={selectedCategories.length === 0 ? 'chip chip-active' : 'chip'}>
                            All
                        </ButtonComponent>

                        <div className='filter-wrapper'>
                            <ButtonComponent onClick={() => setShowFilters(!showFilters)} className='chip'>
                                Show Filters
                            </ButtonComponent>
                            {showFilters && (
                                <div className='filter-panel'>
                                    <TextComponent variant='p' className='filter-panel-title'>Category</TextComponent>
                                    {allCategories.length === 0 && (
                                        <TextComponent variant='p' className='filter-empty'>No categories yet</TextComponent>
                                    )}
                                    {allCategories.map(category => (
                                        <label className='filter-checkbox-row' key={category}>
                                            <input
                                                type='checkbox'
                                                checked={selectedCategories.includes(category)}
                                                onChange={() => toggleCategoryFilter(category)}
                                            />
                                            {category}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className='sort-wrapper'>
                            <ButtonComponent onClick={() => setShowSortMenu(!showSortMenu)} className='chip'>
                                Sort By: {sortLabels[sortBy]}
                            </ButtonComponent>
                            {showSortMenu && (
                                <div className='sort-menu'>
                                    {(Object.keys(sortLabels) as SortOption[]).map(option => (
                                        <div
                                            key={option}
                                            className={sortBy === option ? 'sort-option sort-option-active' : 'sort-option'}
                                            onClick={() => { setSortBy(option); setShowSortMenu(false); }}
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
                                    <tr key={item.id} className={item.isChecked ? 'row-checked' : ''}>
                                        <td>
                                            <input
                                                type='checkbox'
                                                checked={item.isChecked}
                                                onChange={() => toggleChecked(item.id)}
                                            />
                                        </td>
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