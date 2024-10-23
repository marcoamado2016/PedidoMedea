import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'
interface SubmitButton {
    buttonText: string
    isLoading?: boolean
    active?: boolean
    onClick?: () => void
}
export function SubmitButton({ buttonText, isLoading, active, onClick }: SubmitButton) {

    return (
        <button
            className={styles.submitButton}
            type='submit'
            disabled={active}
            onClick={onClick}
        >
            {isLoading ? <Loader /> : buttonText}
        </button>
    )

}