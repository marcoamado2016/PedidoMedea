import { Loader } from '@/components/Loader'
import styles from './styles.module.scss'
interface SubmitButton {
    buttonText: string
    isLoading?: boolean
    active?: boolean
}
export function SubmitButton({ buttonText, isLoading, active }: SubmitButton) {

    return (
        <button className={styles.submitButton} type='submit' disabled={active}>
            {isLoading ? <Loader /> : buttonText}
        </button>
    )

}