import Link from "next/link";

export default function BookingSuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-16">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg border border-gray-100">
        {/* Success Checkmark Icon */}
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg
            className="h-9 w-9"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Heading & Message */}
        <h1 className="text-2xl font-bold text-gray-900">
          Booking Successful!
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Thank you for your reservation. <br /> We will contact you shortly.
        </p>

        {/* Optional Booking Summary Box */}
        <div className="mt-6 rounded-xl bg-gray-50 p-4 text-left text-sm border border-gray-200 space-y-2.5">
          <div className="flex justify-between">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-900">Nov 24, 2026</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Status</span>
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
              Confirmed
            </span>
          </div>
        </div>

        {/* Go Back to Home Page Button */}
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
          >
            Go Back to Home Page
          </Link>
        </div>
      </div>
    </main>
  );
}
