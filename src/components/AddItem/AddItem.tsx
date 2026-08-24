import { useState, useEffect } from 'react'
import { Overlay } from '../Overlay/Overlay'
import { TextComponent } from '../../TextComponent'
import { ButtonComponent } from '../../ButtonComponent'
import { TextInput } from '../inputs/TextInput'
import type { ShoppingItem } from '../types/ShoppingItem'
import './AddItem.css'

type AddItemProps = {
    isVisible: boolean
    onClose: () => void
    onSave: (data: { name: string, quantity: number, category: string, notes: string, image: string | null }) => void
    editingItem: ShoppingItem | null
}

export const AddItem: React.FC<AddItemProps> = ({ isVisible, onClose, onSave, editingItem }) => {
    const [name, setName] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [category, setCategory] = useState('')
    const [notes, setNotes] = useState('')
    const [image, setImage] = useState<string | null>(null)

    useEffect(() => {
        if (editingItem) {
            setName(editingItem.name)
            setQuantity(editingItem.quantity.toString())
            setCategory(editingItem.category)
            setNotes(editingItem.notes)
            setImage(editingItem.image)
        } else {
            setName('')
            setQuantity('1')
            setCategory('')
            setNotes('')
            setImage(null)
        }
    }, [isVisible, editingItem])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        const reader = new FileReader()
        reader.onload = () => setImage(reader.result as string)
        reader.readAsDataURL(file)
    }

    const handleSave = () => {
        if (!name) return
        onSave({ name, quantity: Number(quantity) || 0, category, notes, image })
        onClose()
    }

    if (!isVisible) return null

    return (
        <Overlay>
            <div className='add-item-form'>
                <div className='add-item-header'>
                    <TextComponent variant='h3'>{editingItem ? 'Edit Item' : 'Create Item'}</TextComponent>
                    <button className='close-button' onClick={onClose} aria-label='Close'>&times;</button>
                </div>

                <TextComponent variant='p' className='form-section-label'>Details</TextComponent>

                <div className='form-row'>
                    <TextInput label='Name' id='item-name' placeholder='eg. Milk' type='text'
                        value={name} onChange={(e) => setName(e.target.value)} />

                    <TextInput label='Category' id='item-category' placeholder='eg. Dairy' type='text'
                        value={category} onChange={(e) => setCategory(e.target.value)} />
                </div>

                <TextInput label='Quantity' id='item-quantity' placeholder='1' type='number'
                    value={quantity} onChange={(e) => setQuantity(e.target.value)} />

                <TextInput label='Notes (optional)' id='item-notes' placeholder='Enter any notes about this item...' type='text'
                    value={notes} onChange={(e) => setNotes(e.target.value)} />

                <TextComponent variant='p' className='form-section-label' style={{ marginTop: '20px' }}>Image</TextComponent>
                <div className='image-upload-row'>
                    {image ? (
                        <img src={image} alt='Item preview' className='image-preview' />
                    ) : (
                        <div className='image-preview-placeholder'>No image</div>
                    )}
                    <input type='file' accept='image/*' onChange={handleImageChange} className='image-upload-input' />
                </div>

                <div className='add-cancel-buttons'>
                    <ButtonComponent className='cancel' onClick={onClose}>Cancel</ButtonComponent>
                    <ButtonComponent className='add-item-save' onClick={handleSave}>
                        {editingItem ? 'Save' : 'Add'}
                    </ButtonComponent>
                </div>
            </div>
        </Overlay>
    )
}