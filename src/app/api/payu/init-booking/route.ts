import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import Booking from '@/models/Booking';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing booking ID' }, { status: 400 });
    }

    const booking = await Booking.findById(bookingId).populate('trek');
    if (!booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Advance amount is 30% of totalAmount
    const amount = Math.round(booking.totalAmount * 0.30).toString();
    
    const key = process.env.PAYU_MERCHANT_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;
    const txnid = 'Txn' + Date.now() + Math.floor(Math.random() * 1000);
    const productinfo = `Advance Payment for ${(booking.trek as any)?.title || 'Trek'}`;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const surl = `${baseUrl}/api/payu/callback`;
    const furl = `${baseUrl}/api/payu/callback`;

    if (!key || !salt) {
      console.error('PayU credentials missing');
      return NextResponse.json({ error: 'Payment gateway configuration error' }, { status: 500 });
    }

    const name = booking.guestDetails.name;
    const email = booking.guestDetails.email;
    const phone = booking.guestDetails.phone;
    
    const udf1 = booking._id.toString(); // Booking ID
    const udf2 = 'booking'; // Flag to distinguish from Enquiry in callback

    // Generate hash
    // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${name}|${email}|${udf1}|${udf2}|||||||||${salt}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    return NextResponse.json({
      key,
      txnid,
      amount,
      productinfo,
      firstname: name,
      email,
      phone,
      surl,
      furl,
      hash,
      udf1,
      udf2,
      payuUrl: 'https://secure.payu.in/_payment' // production URL
    });
  } catch (error: any) {
    console.error('Error in PayU Init Booking:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: error.message },
      { status: 500 }
    );
  }
}
