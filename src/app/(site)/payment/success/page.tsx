import Link from 'next/link';

export default function PaymentSuccessPage({ searchParams }: { searchParams: { txnid?: string } }) {
  const txnid = searchParams.txnid;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center border border-slate-100">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-black text-slate-800 mb-2">Booking Confirmed!</h1>
        <p className="text-slate-600 mb-6 font-medium">
          Your advance payment of ₹10 was successful. We have received your Butter Festival registration.
        </p>
        
        {txnid && (
          <div className="bg-slate-50 rounded-lg p-4 mb-8 text-left border border-slate-200">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Transaction ID</p>
            <p className="text-sm font-mono text-slate-800">{txnid}</p>
          </div>
        )}

        <div className="space-y-3">
          <p className="text-sm text-slate-500">
            Our trekking expert will contact you shortly with further details.
          </p>
          <Link href="/" className="inline-block w-full py-3 px-6 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors">
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
