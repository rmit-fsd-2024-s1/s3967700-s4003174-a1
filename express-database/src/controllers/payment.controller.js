const db = require("../database/index.js");
const Payment = db.payment;
const Cart = db.cart;

exports.processPayment = async (req, res) => {
  const { cartID, userID, amount } = req.body;
  try {
    // Create a new payment record
    const payment = await Payment.create({
      cartID,
      userID,
      Amount: amount,
      PaymentDate: new Date(),
    });

    res.status(200).json({ message: 'Payment processed successfully', payment });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: error.message });
  }
};

exports.getLastPurchase = async (req, res) => {
  const userID = req.query.userID; // Use userID from query parameters

  try {
    const lastPayment = await Payment.findOne({
      where: { userID },
      order: [['PaymentDate', 'DESC']],
      include: [{
        model: Cart,
        as: 'cart'
      }]
    });

    if (!lastPayment) {
      return res.status(404).json({ message: 'No recent purchases found' });
    }

    res.status(200).json(lastPayment.cart);
  } catch (error) {
    console.error('Error fetching last purchase:', error);
    res.status(500).json({ error: 'Failed to fetch purchase details' });
  }
};


