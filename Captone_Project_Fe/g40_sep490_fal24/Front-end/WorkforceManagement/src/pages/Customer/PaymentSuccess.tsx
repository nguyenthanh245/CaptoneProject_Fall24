export default function PaymentSuccess() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-green-50 text-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full">
        <div className="flex justify-center">
          <svg
            viewBox="0 0 64 64"
            xmlns="http://www.w3.org/2000/svg"
            fill="#000000"
            className="h-16 w-16" // Thêm class Tailwind hoặc chỉnh theo ý muốn
          >
            <defs>
              <style>
                {`
            .cls-1 { fill: #0074ff; }
            .cls-2 { fill: #ffb300; }
          `}
              </style>
            </defs>
            <g>
              <path
                className="cls-1"
                d="M41.78,57.13a7.12,7.12,0,0,1-4.2-1.39l-4.32-3.16a3.12,3.12,0,0,0-3.7,0l-4.32,3.16a7.14,7.14,0,0,1-11.31-6.53l.58-5.32a3.11,3.11,0,0,0-1.85-3.2L7.77,38.53a7.13,7.13,0,0,1,0-13.06l4.89-2.16a3.11,3.11,0,0,0,1.85-3.2l-.58-5.32A7.14,7.14,0,0,1,25.24,8.26l4.32,3.16a3.12,3.12,0,0,0,3.7,0l4.32-3.16A7,7,0,0,1,43,7a7.25,7.25,0,0,1,4.75,3.13,2,2,0,1,1-3.34,2.2,3.23,3.23,0,0,0-2.12-1.39,3,3,0,0,0-2.37.57l-4.32,3.16a7.13,7.13,0,0,1-8.43,0l-4.31-3.16a3.13,3.13,0,0,0-5,2.87l.58,5.31A7.11,7.11,0,0,1,14.28,27l-4.9,2.16a3.14,3.14,0,0,0,0,5.74L14.28,37a7.11,7.11,0,0,1,4.21,7.3l-.58,5.31a3.13,3.13,0,0,0,5,2.87l4.31-3.16a7.13,7.13,0,0,1,8.43,0l4.32,3.16a3.13,3.13,0,0,0,5-2.87l-.58-5.31A7.1,7.1,0,0,1,48.54,37l4.9-2.16a3.14,3.14,0,0,0,0-5.74L50.78,28a2,2,0,1,1,1.61-3.66l2.66,1.17a7.13,7.13,0,0,1,0,13.06l-4.89,2.16a3.13,3.13,0,0,0-1.86,3.2l.58,5.32a7,7,0,0,1-3.52,6.95A7.17,7.17,0,0,1,41.78,57.13Z"
              />
              <path
                className="cls-2"
                d="M31.64,39a2,2,0,0,1-1.42-.59l-8.61-8.61A2,2,0,1,1,24.44,27l7.2,7.2L57.08,8.72a2,2,0,0,1,2.82,2.83L33.05,38.4A2,2,0,0,1,31.64,39Z"
              />
            </g>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-green-700 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-4">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        <button
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition"
          onClick={() => (window.location.href = "/customer/my-invoices")}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
