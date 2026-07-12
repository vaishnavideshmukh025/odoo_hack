import { useState } from 'react'
import { useForm } from 'react-hook-form'

function ForgotPassword() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmitEmail = (values) => {
    console.log('Reset email:', values.email)
    setStep(2)
  }

  const onSubmitOtp = (values) => {
    console.log('OTP code:', values)
    setStep(3)
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Forgot password</h1>
          <p className="mt-3 text-sm text-slate-500">Reset your password using your employee email address.</p>
        </div>

        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmitEmail)} className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email.message}</p>}
            </label>

            <button className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Send reset link
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmitOtp)} className="space-y-5">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">OTP code</span>
              <input
                type="text"
                {...register('otp', { required: 'OTP is required' })}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
              {errors.otp && <p className="mt-2 text-sm text-red-500">{errors.otp.message}</p>}
            </label>

            <label className="block">
              <span className="text-sm font-medium text-slate-700">New password</span>
              <input
                type="password"
                {...register('password', { required: 'Password is required' })}
                className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </label>

            <button className="w-full rounded-3xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
              Reset password
            </button>
          </form>
        )}

        {step === 3 && (
          <div className="rounded-3xl border border-slate-200 bg-blue-50 p-6 text-center">
            <h2 className="text-xl font-semibold text-slate-900">Password reset successful</h2>
            <p className="mt-3 text-sm text-slate-600">You can now log in with your new password.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
