'use client'


import { useContext, useEffect } from "react"
import styles from './styles.module.scss'
import { FormContext } from ".."
interface InputProps {
    type?: 'text' | 'password' | 'date' | 'number'
    name: string
    label: string
    placeholder?: string
    defaultValue?: string
   
}

export function Input({ label, name, placeholder, type, defaultValue }: InputProps) {

    const { formValues, setFormValues } = useContext(FormContext)!

    useEffect(() => {
        if (defaultValue !== undefined) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: defaultValue
            }))
        }
    }, [defaultValue, name, setFormValues])


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        const { value } = event.target
        setFormValues(prevValues => ({
            ...prevValues,
            [name]: value
        }))

    }

    return (
        <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={formValues[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    )
}