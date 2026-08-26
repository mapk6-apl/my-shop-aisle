export type ShoppingItem = {
    id: string
    name: string
    quantity: number
    category: string
    notes: string
    isChecked: boolean
    image: string | null
}

export type Profile = {
    id: number
    name: string
    surname: string
    cellNumber: string
    picture: string | null
}