const CryptoJS = require('crypto-js');
const { SHA1, HmacSHA1 } = CryptoJS;

const key = 
    1037444169,
    -2141501364,
    -417256562,
    1291739176,
    1410188965
]
const message =[
    1037444169,
    -2141501364,
    -417256562,
    1291739176,
    1410188965
];

// Compute the HMAC-SHA1 hash
const hmacSha1 = HmacSHA1(message, key);

console.log(hmacSha1.toString());
