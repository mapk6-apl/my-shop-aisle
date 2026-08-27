import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit'
import bcrypt from 'bcryptjs'
import { API_BASE_URL } from '../api/config'
import type { User } from '../components/types/User'

type AuthState = {
    currentUser: User | null
    status: 'idle' | 'loading' | 'failed'
    error: string | null
}

//we keep only the user id in local storage, and not anythign sensitive, this is so when users refresh the page, they arent logged out. the actual user data will be coming straight from the server.
const initialState: AuthState = {
    currentUser: null,
    status: 'idle',
    error: null
}

type RegisterData = {
    name: string
    surname: string
    email: string
    password: string
    cellNumber: string
}

export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (data: RegisterData, { rejectWithValue }) => {
        //this checks if the email is already registered
        const existingResponse = await fetch(`${API_BASE_URL}/users?email=${encodeURIComponent(data.email)}`)
        const existingUsers = await existingResponse.json()
        if (existingUsers.length > 0) {
            return rejectWithValue('An account with this email already exists.') //if it exists, user gets this
        }

        //here we hash the password before it leaves the browser
        const passwordHash = await bcrypt.hash(data.password, 10)

        const response = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: data.name,
                surname: data.surname,
                email: data.email,
                passwordHash,
                cellNumber: data.cellNumber
            })
        })
        const user = (await response.json()) as User

        //we create a new empty profile record for the new user
        await fetch(`${API_BASE_URL}/profiles`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: user.id,
                name: data.name,
                surname: data.surname,
                cellNumber: data.cellNumber,
                picture: null
            })
        })

        localStorage.setItem('current-user-id', user.id)
        return user
    }
)

//this thunk restores the session after a refresh
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string, password: string }, { rejectWithValue }) => {
        const response = await fetch(`${API_BASE_URL}/users?email=${encodeURIComponent(email)}`)
        const users = (await response.json()) as User[]
        const user = users[0]

        if (!user) {
            return rejectWithValue('No account found with that email.')
        }

        const isMatch = await bcrypt.compare(password, user.passwordHash)
        if (!isMatch) {
            return rejectWithValue('Incorrect password.')
        }

        localStorage.setItem('current-user-id', user.id)
        return user
    }
)

export const restoreSession = createAsyncThunk('auth/restoreSession', async () => {
    const userId = localStorage.getItem('current-user-id')
    if (!userId) return null

    const response = await fetch(`${API_BASE_URL}/users/${userId}`)
    if (!response.ok) return null
    return (await response.json()) as User
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.currentUser = null
            localStorage.removeItem('current-user-id')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'idle'
                state.currentUser = action.payload
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = (action.payload as string) || 'Registration failed.'
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = 'idle'
                state.currentUser = action.payload
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed'
                state.error = (action.payload as string) || 'Login failed.'
            })
            //if theres a saved user id on app load, it asks the server for the user again to log them back in automatically
            .addCase(restoreSession.fulfilled, (state, action: PayloadAction<User | null>) => {
                state.currentUser = action.payload
            })
    }
})

export const { logout } = authSlice.actions
export default authSlice.reducer