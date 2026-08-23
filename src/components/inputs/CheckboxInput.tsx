import React from 'react'

interface CheckboxInputProps {
    id: string,
    checked: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    label: string
    name?: string
    className?: string
}

export const CheckboxInput: React.FC<CheckboxInputProps> = ({id, checked, onChange, label, name, className}) => {
  return (
    <div className={className}>
        <input type='checkbox' id={id} name={name} checked={checked} onChange={onChange} className='checkbox-field'/>
        <label className='checkbox-label'>{label}</label>
    </div>
  )
}
