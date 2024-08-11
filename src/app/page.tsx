'use client'
import { Form } from '@/components/Form'
import { useAuthFetch } from "@/hooks/useAuthFetch";
import { useLoading } from '@/hooks/useLoading'

export default function LoginPage() {

  const { finishLoading, startLoading, isLoading } = useLoading()
  const autFetch = useAuthFetch()

  const login = async (formData: any) => {
    startLoading()
     console.log("form data ",formData)
    await autFetch({
      endpoint: 'login',
      formData,
      redirectRoute: '/home'
    })
    finishLoading()
  }
  return (
    <>
      <Form title={'Iniciar Sesión'} onSubmit={login} descripcion="Formulario para iniciar sesión">
        <div>
          <Form.Input
            label="Correo "
            name="email"
            placeholder="Ingrese su mail"
            type="text"
          />
          <Form.Input
            label="Contraseña "
            name="password"
            placeholder="Ingrese la contraseña"
            type="password"
          />
        </div>

        <Form.SubmitButton buttonText="Iniciar Sesión" isLoading={isLoading} />

        <Form.Footer
          descripcion="Te olvidaste tu constraseña"
          link="/forget-password"
          textLink="Recuperar constraseña"
        />
        <Form.Footer
          descripcion="No tienes una cuenta"
          link="/register"
          textLink="Registrate"
        />
      </Form>
    </>
  )
}
