import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../api/config'
import type { ShoppingItem } from '../components/types/ShoppingItem'

type ItemFormData = {
    name: string
    quantity: number
    category: string
    notes: string
    image: string | null
}

type ShoppingListState = {
    items: ShoppingItem[]
    status: 'idle' | 'loading' | 'failed'
}

const initialState: ShoppingListState = {
    items: [],
    status: 'idle'
}

export const fetchItems = createAsyncThunk('shoppingList/fetchItems', async () => {
    const response = await fetch(`${API_BASE_URL}/items`)
    return (await response.json()) as ShoppingItem[]
})

export const addItem = createAsyncThunk('shoppingList/addItem', async (data: ItemFormData) => {
    const response = await fetch(`${API_BASE_URL}/items`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, isChecked: false })
    })
    return (await response.json()) as ShoppingItem
})

export const editItem = createAsyncThunk(
    'shoppingList/editItem',
    async ({ id, data }: { id: string, data: ItemFormData }) => {
        const response = await fetch(`${API_BASE_URL}/items/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return (await response.json()) as ShoppingItem
    }
)

export const deleteItem = createAsyncThunk('shoppingList/deleteItem', async (id: string) => {
    await fetch(`${API_BASE_URL}/items/${id}`, { method: 'DELETE' })
    return id
})

export const toggleChecked = createAsyncThunk(
    'shoppingList/toggleChecked',
    async (item: ShoppingItem) => {
        const response = await fetch(`${API_BASE_URL}/items/${item.id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isChecked: !item.isChecked })
        })
        return (await response.json()) as ShoppingItem
    }
)

const shoppingListSlice = createSlice({
    name: 'shoppingList',
    initialState,
    reducers: {},
    //the extraReducers listens for the pending/fulfilled/rejected actions that the thunks above fire automatically
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchItems.fulfilled, (state, action: PayloadAction<ShoppingItem[]>) => {
                state.status = 'idle'
                state.items = action.payload
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.status = 'failed'
                console.error('fetchItems failed:', action.error.message)
            })
            .addCase(addItem.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                state.items.push(action.payload)
            })
            .addCase(editItem.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id)
                if (index !== -1) state.items[index] = action.payload
            })
            .addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(item => item.id !== action.payload)
            })
            .addCase(toggleChecked.fulfilled, (state, action: PayloadAction<ShoppingItem>) => {
                const index = state.items.findIndex(item => item.id === action.payload.id)
                if (index !== -1) state.items[index] = action.payload
            })
    }
})

export default shoppingListSlice.reducer