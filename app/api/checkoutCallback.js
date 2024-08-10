// pages/api/checkoutCallback.js
import { updatePaymentStatus } from '../../utils/paymentHandler'; // Your custom logic

export default async function handler(req, res) {
  try {
    const { status, transaction_id, reference } = req.body;

    // Process payment status
    await updatePaymentStatus(status, transaction_id, reference);

    res.status(200).json({ message: 'Payment processed' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process payment' });
  }
}
