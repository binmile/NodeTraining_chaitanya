const { createHmac } = require('node:crypto');

const secret = 'abcdefg';
const hash = createHmac('sha256', secret)
               .update('Starting with crypto')
               .digest('hex');
console.log(hash);