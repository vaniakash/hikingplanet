import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/Enquiry';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    // PayU sends data as application/x-www-form-urlencoded
    const text = await request.text();
    const params = new URLSearchParams(text);
    
    const key = params.get('key') || '';
    const txnid = params.get('txnid') || '';
    const amount = params.get('amount') || '';
    const productinfo = params.get('productinfo') || '';
    const firstname = params.get('firstname') || '';
    const email = params.get('email') || '';
    const udf1 = params.get('udf1') || '';
    const udf2 = params.get('udf2') || '';
    const udf3 = params.get('udf3') || '';
    const udf4 = params.get('udf4') || '';
    const udf5 = params.get('udf5') || '';
    const status = params.get('status') || '';
    const resHash = params.get('hash') || '';
    const additionalCharges = params.get('additionalCharges');

    const salt = process.env.PAYU_MERCHANT_SALT || '';

    // Verify Hash
    // Sequence: additionalCharges(if present)|salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
    let hashString = `${salt}|${status}||||||${udf5}|${udf4}|${udf3}|${udf2}|${udf1}|${email}|${firstname}|${productinfo}|${amount}|${txnid}|${key}`;
    if (additionalCharges) {
      hashString = `${additionalCharges}|${hashString}`;
    }

    const calculatedHash = crypto.createHash('sha512').update(hashString).digest('hex');

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    if (calculatedHash !== resHash) {
      console.error('PayU Hash Mismatch', { calculatedHash, resHash });
      // Update enquiry to failed due to hash mismatch
      if (udf1) {
        await Enquiry.findByIdAndUpdate(udf1, {
          paymentStatus: 'Failed',
          status: 'Cancelled',
          paymentTimestamp: new Date(),
        });
      }
      return NextResponse.redirect(`${baseUrl}/payment/failed?reason=hash_mismatch`, 303);
    }

    if (status === 'success') {
      if (udf1) {
        await Enquiry.findByIdAndUpdate(udf1, {
          paymentStatus: 'Success',
          status: 'New', // Moving it from 'Payment Pending' to 'New' as it's now a valid enquiry
          amountPaid: parseFloat(amount),
          paymentTimestamp: new Date(),
        });
      }
      return NextResponse.redirect(`${baseUrl}/payment/success?txnid=${txnid}`, 303);
    } else {
      if (udf1) {
        await Enquiry.findByIdAndUpdate(udf1, {
          paymentStatus: 'Failed',
          status: 'Cancelled',
          paymentTimestamp: new Date(),
        });
      }
      return NextResponse.redirect(`${baseUrl}/payment/failed?txnid=${txnid}`, 303);
    }
  } catch (error: any) {
    console.error('Error in PayU Callback:', error);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/payment/failed?reason=server_error`, 303);
  }
}
