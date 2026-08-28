import './AvatarPicker.css'

type AvatarPickerProps = {
    selectedAvatar: string | null
    onSelect: (url: string) => void
}

//each entry is just a seed name that DiceBear turns into a consistent illustrated avatar
const avatarSeeds = [
    'Mark', 'Sarah', 'Alex', 'Jordan', 'Taylor', 'Riley', 'Casey', 'Morgan'
]

const avatarUrl = (seed: string) =>
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`

export const AvatarPicker: React.FC<AvatarPickerProps> = ({ selectedAvatar, onSelect }) => {
    return (
        <div className='avatar-picker'>
            {avatarSeeds.map(seed => {
                const url = avatarUrl(seed)
                return (
                    <img
                        key={seed}
                        src={url}
                        alt={`Avatar ${seed}`}
                        className={selectedAvatar === url ? 'avatar-option avatar-option-selected' : 'avatar-option'}
                        onClick={() => onSelect(url)}
                    />
                )
            })}
        </div>
    )
}