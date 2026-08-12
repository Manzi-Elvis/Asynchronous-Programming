/**
 * Exercise 02 — Design an error-handling strategy
 *
 * Below are three Promise-returning functions representing an
 * e-commerce checkout: chargePayment (required, must NOT be
 * silently recovered from), fetchShippingEstimate (optional — okay
 * to degrade to a default if it fails), and sendReceiptEmail
 * (optional side-effect — should never fail the checkout, but
 * failures should still be logged).
 *
 * Build `checkout(order)` that:
 *   1. Charges payment. If this fails, propagate the failure loudly
 *      — do NOT recover.
 *   2. Fetches a shipping estimate CONCURRENTLY with sending the
 *      receipt email is out of scope for this exercise (that's
 *      module 04) — just chain them sequentially after payment
 *      succeeds.
 *   3. If fetchShippingEstimate fails, recover with a default
 *      estimate of '5-7 business days', logging that the fallback
 *      was used.
 *   4. If sendReceiptEmail fails, catch it, log the failure, but do
 *      NOT let it affect the final resolved result at all (the
 *      checkout should still be considered successful).
 *   5. Resolve with { charge, shippingEstimate } — note: NOT
 *      including anything about the email, since it's a pure side
 *      effect that shouldn't shape the return value.
 */

function chargePayment(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.cardDeclined) {
        reject(new Error('Card declined'));
        return;
      }
      resolve({ chargeId: 'ch_123', amount: order.total });
    }, 15);
  });
}

function fetchShippingEstimate(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.shippingServiceDown) {
        reject(new Error('Shipping service unavailable'));
        return;
      }
      resolve('2-3 business days');
    }, 15);
  });
}

function sendReceiptEmail(order) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (order.emailServiceDown) {
        reject(new Error('Email service unavailable'));
        return;
      }
      resolve({ sent: true });
    }, 15);
  });
}

function checkout(order) {
  // your implementation here
}

// --- Your tests below ---

checkout({ total: 50 })
  .then((r) => console.log('all healthy ->', r))
  .catch((e) => console.log('unexpected failure ->', e.message));

checkout({ total: 50, cardDeclined: true })
  .then((r) => console.log('should not reach here ->', r))
  .catch((e) => console.log('expected payment failure ->', e.message));

checkout({ total: 50, shippingServiceDown: true })
  .then((r) => console.log('degraded shipping ->', r))
  .catch((e) => console.log('unexpected failure ->', e.message));

checkout({ total: 50, emailServiceDown: true })
  .then((r) => console.log('email failure ignored, checkout ok ->', r))
  .catch((e) => console.log('unexpected failure ->', e.message));
