import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import { API_BASE_URL } from '../api/config'
import type { Profile } from '../components/types/Profile'

type ProfileState = {
    profile: Profile | null
    status: 'idle' | 'loading' | 'failed'
}

const initialState: ProfileState = {
    profile: null,
    status: 'idle'
}

//gets the current profile from the server
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
    const response = await fetch(`${API_BASE_URL}/profile`)
    return (await response.json()) as Profile
})

//updates any subset of profile fields (name, surname, cellNumber, picture)
export const updateProfile = createAsyncThunk(
    'profile/updateProfile',
    async (data: Partial<Omit<Profile, 'id'>>) => {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        return (await response.json()) as Profile
    }
)

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.status = 'idle'
                state.profile = action.payload
            })
            .addCase(fetchProfile.rejected, (state) => {
                state.status = 'failed'
            })
            .addCase(updateProfile.fulfilled, (state, action: PayloadAction<Profile>) => {
                state.profile = action.payload
            })
    }
})

export default profileSlice.reducer