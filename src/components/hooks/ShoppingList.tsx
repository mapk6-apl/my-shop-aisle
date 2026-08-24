import { useState, useEffect } from 'react'
import type { ShoppingItem } from '../types/ShoppingItem'

type ItemFormData = {
    name: string
    quantity: number
    category: string
    notes: string
    image: string | null
}

export const useShoppingList = () => {
    const [items, setItems] = useState<ShoppingItem[]>([])

    useEffect(() => {
        const savedData = localStorage.getItem('my-shop-items')
        if (savedData) {
            setItems(JSON.parse(savedData))
        }
    }, [])

    const save = (updatedItems: ShoppingItem[]) => {
        setItems(updatedItems)
        localStorage.setItem('my-shop-items', JSON.stringify(updatedItems))
    }

    const addItem = (data: ItemFormData) => {
        const newItem: ShoppingItem = { id: Date.now().toString(), isChecked: false, ...data }
        save(items.concat(newItem))
    }

    const editItem = (id: string, data: ItemFormData) => {
        const updatedItems = items.map(item => item.id === id ? { ...item, ...data } : item)
        save(updatedItems)
    }

    const deleteItem = (id: string) => {
        save(items.filter(item => item.id !== id))
    }

    const toggleChecked = (id: string) => {
        const updatedItems = items.map(item => item.id === id ? { ...item, isChecked: !item.isChecked } : item)
        save(updatedItems)
    }

    return { items, addItem, editItem, deleteItem, toggleChecked }
}