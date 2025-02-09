import React from 'react';
import { useForm } from 'react-hook-form';
import { getBaseURL } from "../../apiconfig";
import toast from 'react-hot-toast';

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
        fname: '',
        lname: '',
        email: '',
        password: '',
        confirmPassword: '',
    }
  });

  const signUp = async (data) => {
    try {
      const res = await fetch(`${getBaseURL()}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            lname: data.lname,
            fname: data.fname,
            email: data.email,
            password: data.password
        }),
      });
      if (!res.ok) {
        throw new Error("Invalid Credentials");
      } else {
        toast.success("Successfully Created Account");
        window.location.href = "/login";
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onSubmit = (data) => {
    if(data.password !== data.confirmPassword) {
        setError('confirmPassword', {type:'custom', message: 'Passwords do not match'});
        return;
    }
    signUp(data);
    // Handle form submission
  };

  const password = watch('password');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <div className="space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-2">Register</h1>
            <p className="text-gray-600 mb-6">Create your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative">
              <input
                {...register('fname', { required: 'First Name is required' })}
                type="text"
                id="fullName"
                className="peer w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                placeholder="Full Name"
              />
              <label
                htmlFor="fullName"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                First Name
              </label>
              {errors.fname && (
                <p className="text-red-500 text-sm mt-1">{errors.fname.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register('lname', { required: 'Last name is required' })}
                type="text"
                id="fullName"
                className="peer w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                placeholder="Full Name"
              />
              <label
                htmlFor="fullName"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Last Name
              </label>
              {errors.lname && (
                <p className="text-red-500 text-sm mt-1">{errors.lname.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                id="email"
                className="peer w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                placeholder="Email"
              />
              <label
                htmlFor="email"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Email
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                type="password"
                id="password"
                className="peer w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Password
              </label>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="relative">
              <input
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: (value) =>
                    value === password || 'The passwords do not match',
                })}
                type="password"
                id="confirmPassword"
                className="peer w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
                placeholder="Confirm Password"
              />
              <label
                htmlFor="confirmPassword"
                className="absolute left-3 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all 
                peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 
                peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
              >
                Confirm Password
              </label>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                {...register('terms', {
                  required: 'You must accept the terms and conditions',
                })}
                type="checkbox"
                id="terms"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the Terms & Conditions
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Register
            </button>
          </form>

          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-600">
              Sign in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;