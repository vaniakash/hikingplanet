import Link from 'next/link';

export default function PaymentFailedPage({ searchParams }: { searchParams: { reason?: string; txnid?: string } }) {
  const { reason, txnid } = searchParams;

  let errorMessage = "Unfortunately, your payment could not be processed successfully.";
  if (reason === 'hash_mismatch') {
    errorMessage = "Payment verification failed. Please try again or contact support if the issue persists.";
  } else if (reason === 'server_error') {
    errorMessage = "A server error occurred while processing your payment. Please try again later.";
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
        <div className="w-20 h-20 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Payment Failed</h1>
        <p className="text-slate-600 mb-6 font-medium">
          {errorMessage}
        </p>
        
        {txnid && (
          <div className="bg-slate-50 rounded-lg p-4 mb-8 text-left border border-slate-200">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Transaction ID</p>
            <p className="text-sm font-mono text-slate-800">{txnid}</p>
          </div>
        )}

        <div className="space-y-3">
          <Link href="/butter-festival" className="inline-block w-full py-3 px-6 bg-[#e30613] hover:bg-[#c10510] text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-500/30">
            Try Again
          </Link>
          <Link href="/" className="inline-block w-full py-3 px-6 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
