/**
 * 02-success-and-failure.js
 *
 * Goal: a realistic "send notification to every user in a batch"
 * flow — some succeed, some fail (e.g. bounced email, invalid
 * phone number), and we want a full report rather than aborting the
 * whole batch at the first failure.
 */

function sendNotification(user) {
  return new Promise((resolve, reject) => {
    const delayMs = 30 + Math.random() * 50;
    setTimeout(() => {
      // Simulate some users having invalid contact info.
      if (user.email.includes('bounced')) {
        reject(new Error(`Delivery failed for ${user.email}: mailbox does not exist`));
        return;
      }
      resolve({ userId: user.id, deliveredTo: user.email });
    }, delayMs);
  });
}

const users = [
  { id: 1, email: 'elvis@example.com' },
  { id: 2, email: 'bounced-user@example.com' },
  { id: 3, email: 'sarah@example.com' },
  { id: 4, email: 'bounced-old-account@example.com' },
  { id: 5, email: 'jamal@example.com' },
];

async function sendBatchNotifications(users) {
  const results = await Promise.allSettled(
    users.map((user) => sendNotification(user))
  );

  const report = {
    total: users.length,
    delivered: [],
    failed: [],
  };

  results.forEach((result, i) => {
    if (result.status === 'fulfilled') {
      report.delivered.push(result.value);
    } else {
      report.failed.push({ userId: users[i].id, error: result.reason.message });
    }
  });

  return report;
}

async function main() {
  console.log(`Sending notifications to ${users.length} users...`);
  const report = await sendBatchNotifications(users);

  console.log(`\nDelivery report: ${report.delivered.length}/${report.total} delivered`);
  console.log('Delivered:', report.delivered);
  console.log('Failed:', report.failed);

  console.log('\nCompare this to what Promise.all would have done: the');
  console.log('ENTIRE batch would reject at the first bounced email,');
  console.log('and you would have NO information about the other 3 users');
  console.log('at all — not even the ones that succeeded before the failure.');
}

main();