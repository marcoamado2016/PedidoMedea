'use client'
import { Form } from "@/components/Form";
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from "@/hooks/useLoading";
import { AxiosRequestConfig } from 'axios'
import { useSearchParams } from 'next/navigation'

export default function ChangePassword() {
    const { finishLoading, isLoading, startLoading } = useLoading();
    const searchParams = useSearchParams();
    const authFetch = useAuthFetch();

    const ChangePassword = async (formData: any) => {
        startLoading();

        const token = searchParams.get('token')

        const options: AxiosRequestConfig<any> = {
            headers: {
                token
            }
        }

        await authFetch({
            endpoint: 'change-password',
            redirectRoute: '/',
            formData,
            options
        })

        finishLoading();
    }
    return (
        <>
            <Form
                title='Cambiar tu contraseña'
                descripcion='Formulario para cambiar tu contraseña'
                onSubmit={ChangePassword}
            >
                <div className='my-[10px] flex flex-col gap-4'>
                    <Form.Input
                        placeholder='Ingresa tu nueva contraseña'
                        label='Contraseña'
                        name='nueva contraseña'
                        type='password'
                    />

                    <Form.Input
                        placeholder='Repite tu contraseña'
                        label='Confirmar contraseña'
                        name='confirmar contraseña'
                        type='password'
                    />
                </div>
                <Form.SubmitButton
                    buttonText="Cambiar contraseña"
                    isLoading={isLoading}
                />
            </Form>
        </>
    )
}