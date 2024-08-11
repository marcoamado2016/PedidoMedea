import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'
interface SubmitButton {
    buttonText: string
    isLoading?: boolean
}
export function SubmitButton({ buttonText, isLoading }: SubmitButton) {

    return (
        <button className={styles.submitButton} type='submit' disabled={isLoading}>
            {isLoading ? <Loader /> : buttonText}
        </button>
    )

}