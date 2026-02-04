const crypto = require("crypto");
const Subscription = require("../models/Subscription");

exports.createPayment = async (req, res) => {
  const { grade } = req.user;

  const amount =
    grade === "10" ? 150 :
    grade === "11" ? 180 : 200;

  const data = {
    merchant_id: process.env.PAYFAST_MERCHANT_ID,
    merchant_key: process.env.PAYFAST_MERCHANT_KEY,
    return_url: "http://localhost:3000/payment-success",
    cancel_url: "http://localhost:3000/payment-cancel",
    notify_url: "http://localhost:5000/api/payments/notify",

    name_first: req.user.id,
    email_address: "student@test.com",
    m_payment_id: Date.now(),
    amount: amount.toFixed(2),
    item_name: `Grade ${grade} Monthly Subscription`,
  };

  let queryString = Object.keys(data)
    .sort()
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join("&");

  if (process.env.PAYFAST_PASSPHRASE) {
    queryString += `&passphrase=${process.env.PAYFAST_PASSPHRASE}`;
  }

  const signature = crypto
    .createHash("md5")
    .update(queryString)
    .digest("hex");

  data.signature = signature;

  res.json({
    paymentUrl: `${process.env.PAYFAST_URL}?${queryString}&signature=${signature}`
  });
};

// PAYFAST CALLBACK
exports.payfastNotify = async (req, res) => {
  const { custom_str1 } = req.body;

  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1);

  await Subscription.create({
    userId: custom_str1,
    grade: req.body.item_name.split(" ")[1],
    startDate,
    endDate,
    status: "active",
  });

  res.status(200).send("OK");
};
