/**
 * Exercise 01 — Refactor callback hell (the "poor man's fix")
 *
 * Before Promises were widespread, one real technique for taming
 * callback hell was to FLATTEN the pyramid by extracting each nested
 * callback into its own named, top-level function instead of an
 * inline arrow function. This doesn't remove the sequential
 * dependency, but it removes the visual nesting and makes each step
 * independently readable.
 *
 * Below is a callback-hell pyramid for a simple order-processing
 * flow: validate order -> charge payment -> update inventory ->
 * send confirmation. Refactor it so that NO callback is nested more
 * than ONE level deep — each step should be its own named function
 * that calls the next step by name, not by inline nested arrow.
 *
 * Keep all the error handling behavior identical (each step's error
 * should still stop the flow and log a specific message).
 */

function validateOrder(order, callback) {
  setTimeout(() => {
    if (!order.items || order.items.length === 0) {
      callback(new Error('Order has no items'));
      return;
    }
    callback(null, order);
  }, 15);
}

function chargePayment(order, callback) {
  setTimeout(() => {
    if (order.total <= 0) {
      callback(new Error('Invalid charge amount'));
      return;
    }
    callback(null, { chargeId: 'ch_123', amount: order.total });
  }, 25);
}

function updateInventory(order, charge, callback) {
  setTimeout(() => {
    callback(null, { updated: true, items: order.items });
  }, 20);
}

function sendConfirmation(order, charge, inventoryResult, callback) {
  setTimeout(() => {
    console.log(`Confirmation sent for order with ${order.items.length} item(s)`);
    callback(null, { confirmed: true });
  }, 10);
}

// --- THE PYRAMID TO REFACTOR (do not edit, use as reference) ---

function processOrderPyramid(order) {
  validateOrder(order, (err1, validOrder) => {
    if (err1) return console.error('Validation failed:', err1.message);
    chargePayment(validOrder, (err2, charge) => {
      if (err2) return console.error('Payment failed:', err2.message);
      updateInventory(validOrder, charge, (err3, inventoryResult) => {
        if (err3) return console.error('Inventory update failed:', err3.message);
        sendConfirmation(validOrder, charge, inventoryResult, (err4, confirmation) => {
          if (err4) return console.error('Confirmation failed:', err4.message);
          console.log('Order processed successfully:', confirmation);
        });
      });
    });
  });
}

// processOrderPyramid({ items: ['widget'], total: 29.99 });

// --- TODO: your flattened version below ---
// Write named functions like `handleValidated`, `handlePaymentCharged`,
// `handleInventoryUpdated`, `handleConfirmed` — each takes exactly
// what it needs and calls the NEXT named function, no nesting beyond
// one level per function body.
const handleConfirmed = (err4, confirmation) => {
    if (err4) return console.error('Confirmation failed:', err4.message);
    console.log('Order processed successfully:', confirmation);
}


 const handleInventoryUpdated = (validOrder, charge, err3, inventoryResult) => {
    if (err3) return console.error('Inventory update failed:', err3.message);
    sendConfirmation(validOrder, charge, inventoryResult, handleConfirmed);
 };



const handlePaymentCharged = (validOrder, err2, charge) => {
      if (err2) return console.error('Payment failed:', err2.message);
      updateInventory(validOrder, charge, handleInventoryUpdated.bind(null, validOrder, charge));
    }



const handleValidated = (err1, validOrder) => {
    if (err1){
        return console.error('Validation failed:', err1.message);
    }
    chargePayment(
        validOrder,
        handlePaymentCharged.bind(null, validOrder));
}

function processOrderFlattened(order) {
  validateOrder(order, handleValidated);
}


processOrderFlattened({ items: ['widget'], total: 29.99 });
// processOrderFlattened({ items: ['widget'], total: 29.99 });

/**
 * Reflection question (answer in a comment): does this refactor
 * actually solve the underlying problem, or does it just make it
 * LOOK better? Specifically: is error handling still repeated at
 * every step? Is it still awkward to run two independent steps
 * concurrently? What would you still be missing compared to a
 * Promise chain?
 */