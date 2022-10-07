import { useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import useAuth from '../../hooks/Auth';
import LogIn from '../../domains/interfaces/LogIn';
import Input from '../../components/Input';

export default function Login() {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function onSubmit(values: LogIn) {
    const from = location.state?.from?.pathname || "/";

    logIn(values, () => navigate(from, { replace: true }))
  }

  const validationSchema = yup.object({
    email: yup
      .string()
      .required('Digite seu e-mail')
      .email('E-mail inválido'),
    password: yup
      .string()
      .required('Digite sua senha'),
  })

  const formik = useFormik<LogIn>({
    onSubmit,
    validationSchema,
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    },

  })

  return (
    <div className='h-full flex justify-content'>
      <div className='bg-birdBlue md:flex-1'></div>
      <div className='flex flex-1 justify-center items-center'>
        <div className='max-w-md flex-1 space-y-6 p-12'>
          <h1 className="text-3xl">Acesse sua conta</h1>
          <form onSubmit={formik.handleSubmit} className='space-y-6'>
            <Input
              name='email'
              type='email'
              placeholder='E-mail'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && (
              <span className='text-sm text-red-500'>{formik.errors.email}</span>
            )}
            <Input
              name='password'
              type='password'
              placeholder='Senha'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && (
              <span className='text-sm text-red-500'>{formik.errors.password}</span>
            )}
            <button
              className='w-full bg-birdBlue py-3 rounded-full font-bold disabled:opacity-50'
              type='submit'
              disabled={!formik.isValid || formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <span className="block text-silver">Não tem conta? <a href="./signup" className="text-birdBlue hover:underline">Inscreva-se</a></span>
        </div>
      </div>
    </div>
  );
}
