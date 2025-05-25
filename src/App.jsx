import React, { useState } from 'react'
import { toast } from 'react-toastify'
import User from './components/User'

const App = () => {

  // const [fullName, setFullName] = useState('')
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')
  const [users, setUsers] = useState([])

  const handleChanges = (e) => {
    const { name, value } = e.target

    setFormData((prevData) => ({
      ...prevData, [name]: value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      setError('Password must be 8 characters long');
      toast.error('Password must be 8 characters long')
      return;
    }

    if (formData.password != formData.confirmPassword) {
      setError('Password and Confirm Password must be same');
      toast.error('Password must be same')
      return;
    }

    if (!/[!@#$%^&*()<>,."]/.test(formData.password)) {
      setError('Password must contains any special characters');
      toast.error('Password must contains any special characters');
      return;
    }

    // console.log(`form submited successfully !
    //    your data is: ${.fullName, formemail, password, confirmPassword}`);

    setUsers((prevUsers) => [
      ...prevUsers, {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password
      }
    ])

    setError('')
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })

    toast.success('Account created Successfully!')
  }

  return (
    <>
      <div className='h-screen w-full bg-gray-700 flex items-center justify-center'>
        <div className='h-2/4 w-96 bg-slate-200  py-20 px-10 rounded-md'>
          <form onSubmit={submitHandler} className='flex flex-col justify-center items-center gap-4 max-sm:-my-7  max-md:-my-8  max-lg:-my-8 max-xl:-my-9'>
            <h1 className='text-2xl mb-2 font-semibold'>Create an Account</h1>
            <input required onChange={handleChanges} name='fullName' value={formData.fullName} className='rounded-md text-[1.7vh] outline-none px-6 py-2 w-full' type="text" placeholder='Enter your name' />
            <input required onChange={handleChanges} name='email' value={formData.email} className='rounded-md text-[1.7vh] outline-none px-6 py-2 w-full' type="email" placeholder='Enter your email' />
            <input required onChange={handleChanges} name='password' value={formData.password} className='rounded-md text-[1.7vh] outline-none px-6 py-2 w-full' type="password" placeholder='Enter your password' />
            <input required onChange={handleChanges} name='confirmPassword' value={formData.confirmPassword} className='rounded-md text-[1.7vh] outline-none px-6 py-2 w-full' type="password" placeholder='Confirm your password' />
            {error && (
              <p className='text-red-500 text-base text-center font-medium'>{error}</p>
            )}
            <button className='mt-2 rounded-md text-[1.7vh] outline-none px-6 py-2 w-full bg-blue-500 text-white font-semibold text-lg rounded-md '>
              Submit
            </button>
          </form>
        </div>
      </div>

      {users.map((elem, idx) => {
        return <User key={idx} elem={elem} />
      })}
    </>

  )
}

export default App
