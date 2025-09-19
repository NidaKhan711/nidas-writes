import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount } = body;

    if (!amount) {
      return NextResponse.json({ error: "Donation amount is required" }, { status: 400 });
    }

    // 🔐 Env se values lo
    const merchantId = process.env.EASYPAY_MERCHANT_ID!;
    const storeId = process.env.EASYPAY_STORE_ID!;
    const apiUrl = process.env.EASYPAY_API_URL!;

    // 🧪 Abhi dummy URL
    const paymentUrl = `${apiUrl}?amount=${amount}&merchantId=${merchantId}&storeId=${storeId}`;

    return NextResponse.json({ paymentUrl });
  } catch (error) {
    console.error("EasyPaisa API Error:", error);
    return NextResponse.json({ error: "Payment initialization failed" }, { status: 500 });
  }
}
