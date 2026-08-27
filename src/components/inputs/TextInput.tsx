import React from 'react'
import './Textinput.css'

type TextInputProps = {
    id?: string,
    value?: string
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    label: string,
    error?: string,
    name?: string,
    className?: string
    placeholder: string
    type: string
}

export const TextInput: React.FC<TextInputProps> = ({id, value, onChange, label, error, name, placeholder, className, type}) => {
  return (
    <div>
        <label className='input-label'>{label}</label>
        <input type={type} id={id} value={value} name={name} onChange={onChange} placeholder={placeholder} className='input-field' />
        {error && 
            <p className='input-error'>{error}</p>
        }
    </div>
  )
}
