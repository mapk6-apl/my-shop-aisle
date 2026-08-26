import { configureStore } from '@reduxjs/toolkit'
import shoppingListReducer from './shoppingListSlice'
import profileReducer from './profileSlice'


export const store = configureStore({
    reducer: {
        shoppingList: shoppingListReducer,
        profile: profileReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch