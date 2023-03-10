import React, { useState } from 'react'

function StudentSignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Sign up function
  const signUp = () => {
    if (
      name &&
      email &&
      phone &&
      password &&
      confirmPassword
    ) {
      if (password !== confirmPassword) return alert('Passwords do not Match')
      return console.log({
        name,
        email,
        phone,
        password,
        confirmPassword,
      })
    }
    return alert('Fill all the Information')
  }
  return (
    <section className="bg-black h-screen">
      <div className="flex  justify-center  mx-auto px-6 py-24">
        <div className="w-full lg:w-2/5 shadow-lg bg-green-100 p-5 rounded-lg lg:rounded-l-none">
          <h3 className="pt-4 text-2xl text-center">Create an Account!</h3>

          {/* Form */}
          <form className="px-8 pt-6 pb-8 mb-4  rounded">
            {/*  Name */}
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="firstName"
                >
                 Name
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="firstName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                />
              </div>
            {/* Email */}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="email"
              >
                 Email
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            {/* Phone Number*/}
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                for="email"
              >
                Phone Number
              </label>
              <input
                className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number"
              />
            </div>
            {/* Password */}
            <div className="mb-4 md:flex md:justify-between">
              <div className="mb-4 md:mr-2 md:mb-0">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="password"
                >
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border  rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******************"
                />
                {/* <p className="text-xs italic text-red-500">Please choose a password.</p> */}
              </div>
              {/* Confirm Password */}
              <div className="md:ml-2">
                <label
                  className="block mb-2 text-sm font-bold text-gray-700"
                  for="c_password"
                >
                  Confirm Password
                </label>
                <input
                  className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                  id="c_password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="******************"
                />
              </div>
            </div>
            {/*  Register Account*/}
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => signUp()}
              >
                Register Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default StudentSignUp
