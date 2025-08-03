export default function RegisterSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-bold text-gray-900">Registration Successful!</h2>
        <p className="text-gray-600 mt-4">
          Your account has been created. Please wait for admin approval.
          You receive an email when your account is approved.
        </p>
        <div className="mt-6">
          <a 
            href="/login" 
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  )
}