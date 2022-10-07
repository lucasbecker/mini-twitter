import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import ISignUp from '../../domains/interfaces/SignUp';
import useAuth from '../../hooks/Auth';
import Input from '../../components/Input';


export default function SignUp() {
  const auth = useAuth();
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Digite seu nome'),
    username: yup
      .string()
      .required('Digite um nome de usuário'),
    email: yup
      .string()
      .required('Digite seu e-mail')
      .email('E-mail inválido'),
    password: yup
      .string()
      .required('Digite sua senha'),
  })

  async function onSubmit(values: ISignUp) {
    auth.signUp(values, () => navigate('/'));
  }

  const formik = useFormik<ISignUp>({
    onSubmit,
    validationSchema,
    validateOnMount: true,
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },

  });

  return (
    <div className='h-full flex justify-content'>
      <div className='bg-birdBlue md:flex-1'></div>
      <div className='flex flex-1 justify-center items-center'>
        <div className='max-w-md flex-1 space-y-6 p-12'>
          <h1 className="text-3xl">Crie sua conta</h1>
          <form onSubmit={formik.handleSubmit} className='space-y-6'>
            <Input
              name='name'
              type='text'
              placeholder='Nome'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && (
              <span className='text-sm text-red-500'>{formik.errors.name}</span>
            )}
            <Input
              name='username'
              type='username'
              placeholder='Nome de Usuário'
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && (
              <span className='text-sm text-red-500'>{formik.errors.username}</span>
            )}
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
              {formik.isSubmitting ? 'Enviando...' : 'Cadastrar'}
            </button>
          </form>
          <span className="block text-silver">Já possui um conta? <a href="./login" className="text-birdBlue hover:underline">Acesse</a></span>
        </div>
      </div>
    </div>
  );
}
