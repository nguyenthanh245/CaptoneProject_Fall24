export default function PaymentFailure() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 text-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className="h-16 w-16" // Bạn có thể thay đổi kích thước hoặc thêm các class CSS
          >
            <defs>
              <style>{`.cls-1{fill:#0074ff;}`}</style>
            </defs>
            <path
              className="cls-1"
              d="M47.91,53.91a5.93,5.93,0,0,1-4.24-1.76l-4.32-4.32A2,2,0,0,1,42.17,45l4.33,4.32a2,2,0,0,0,2.82,0,2,2,0,0,0,0-2.82L36.24,33.41a2,2,0,0,1,0-2.82L49.32,17.5a2,2,0,0,0,0-2.82,2,2,0,0,0-2.82,0L33.41,27.76a2,2,0,0,1-2.82,0L17.5,14.68a2,2,0,0,0-2.82,0,2,2,0,0,0,0,2.82L27.76,30.59a2,2,0,0,1,0,2.82L14.68,46.5a2,2,0,0,0,0,2.82,2,2,0,0,0,2.82,0L30.59,36.24a2,2,0,0,1,2.82,0l2.44,2.44A2,2,0,0,1,33,41.51l-1-1L20.33,52.15a6,6,0,1,1-8.48-8.48L23.51,32,11.85,20.33a6,6,0,1,1,8.48-8.48L32,23.51,43.67,11.85a6,6,0,1,1,8.48,8.48L40.49,32,52.15,43.67a6,6,0,0,1-4.24,10.24Z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-red-700 mb-2">
          Payment Failed!
        </h1>
        <p className="text-gray-600 mb-4">
          Unfortunately, we were unable to process your payment. Please try
          again or contact support if the issue persists.
        </p>
        <button
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
          onClick={() => (window.location.href = "/customer/my-invoices")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
