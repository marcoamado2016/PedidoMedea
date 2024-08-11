'use client'
import { Form } from "@/components/Form"
import { useAuthFetch } from "@/hooks/useAuthFetch"
import { useLoading } from "@/hooks/useLoading"

export default function LoginPage() {
  const { finishLoading, isLoading, startLoading } = useLoading()

  const authFetch = useAuthFetch()

  const register = async (formData: any) => {
    startLoading();
 
    await authFetch({
      endpoint: 'register',
      redirectRoute: '/home',
      formData
    })

    finishLoading();

  }


  return (
    <>
      <Form
        title='Registrar'
        descripcion="Formulario para crear una cuenta"
        onSubmit={register}
      >
        <div className='my-[10px] flex flex-col gap-4'>

          <Form.Input
            label='Correo'
            name='email'
            placeholder="Ingresa tu correo"
            type="text"
          />
          <Form.Input
            label='contraseña'
            name='password'
            placeholder='Ingrese la contraseña'
            type='password'
          />
          <Form.Input

            label='contraseña'
            name='confirmPassword'
            placeholder='Repite la contraseña'
            type='password'
          />

        </div>
        <Form.SubmitButton buttonText='crear una cuenta' isLoading={isLoading} />
        <Form.Footer
          descripcion='Ya tienes una cuenta ?'
          textLink='Iniciar sesion'
          link='/'
        />
      </Form>
    </>
  )
}