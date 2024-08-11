'use client'
import { useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { FormContext } from ".."
interface TextAreaProps {
    type?: 'text'
    name: string
    label: string
    placeholder?: string
    height?: string
    width?: string
    defaultValue?: string
}

export function TextArea({ label, name, placeholder, type, height, width, defaultValue }: TextAreaProps) {

    const textareaStyle = {
        height: height || 'auto',
        width: width || '100%'
    }
    const { formValues, setFormValues } = useContext(FormContext)!
    useEffect(() => {
        if (defaultValue !== undefined) {
            setFormValues((prevValues) => ({
                ...prevValues,
                [name]: defaultValue
            }))
        }
    }, [defaultValue, name, setFormValues])
    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {

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
            <textarea
                id={name}
                name={name}
                value={formValues[name] || ''}
                onChange={handleChange}
                placeholder={placeholder}
                typeof={type}
                style={textareaStyle}
            />
        </div>

    )
}