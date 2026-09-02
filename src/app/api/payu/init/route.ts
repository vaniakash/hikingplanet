import { NextResponse } from 'next/server';
import crypto from 'crypto';
import dbConnect from '@/lib/db';
import { Enquiry } from '@/models/Enquiry';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();

    const { name, mobile, email, city, trekkers, month, experience, message } = body;

    const amount = process.env.BUTTER_FESTIVAL_ADVANCE_FEE || '10';
    const key = process.env.PAYU_MERCHANT_KEY;
    const salt = process.env.PAYU_MERCHANT_SALT;
    const txnid = 'Txn' + Date.now() + Math.floor(Math.random() * 1000);
    const productinfo = 'Butter Festival 2026 Advance Fee';
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const surl = `${baseUrl}/api/payu/callback`;
    const furl = `${baseUrl}/api/payu/callback`;

    if (!key || !salt) {
      console.error('PayU credentials missing');
      return NextResponse.json({ error: 'Payment gateway configuration error' }, { status: 500 });
    }

    // Save to DB as Pending
    const enquiry = await Enquiry.create({
      name,
      mobile,
      email,
      city,
      trek: 'Butter Festival 2026',
      month,
      trekkers: trekkers ? parseInt(trekkers, 10) : undefined,
      experience,
      message,
      status: 'Payment Pending',
      paymentStatus: 'Pending',
      payuTransactionId: txnid,
      amountPaid: 0,
    });

    // We pass the Enquiry ID in udf1 so the callback can find it easily, 
    // although we could just use txnid. Let's use udf1 just in case, or just txnid.
    const udf1 = enquiry._id.toString();

    // Generate hash
    // sha512(key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||SALT)
    const hashString = `${key}|${txnid}|${amount}|${productinfo}|${name}|${email}|${udf1}||||||||||${salt}`;
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    return NextResponse.json({
      key,
      txnid,
      amount,
      productinfo,
      firstname: name,
      email,
      phone: mobile,
      surl,
      furl,
      hash,
      udf1,
      payuUrl: 'https://secure.payu.in/_payment' // production URL
    });
  } catch (error: any) {
    console.error('Error in PayU Init:', error);
    return NextResponse.json(
      { error: 'Something went wrong', details: error.message },
      { status: 500 }
    );
  }
}
