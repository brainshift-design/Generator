const cryptoModulusSize     = 64; // to keep the keys short
const millerRabinIterations = 40;

const cryptoBufferSize      = cryptoModulusSize/8;
const cryptoPrimeBufferSize = cryptoBufferSize /2;
     
const cryptoBuffer          = new Uint8Array(cryptoPrimeBufferSize);


function bigCryptoRandom()
{
    for (let i = 0; i < cryptoPrimeBufferSize; i++)
        cryptoBuffer[i] = toInt(Math.random() * 0x100);

    cryptoBuffer[0]                       |= 0xC0; // set the top bit to ensure a relatively large number
    cryptoBuffer[cryptoPrimeBufferSize-1] |= 0x01; // set low bit to ensure the number is odd

    return bigFromBuffer(cryptoBuffer);
}



function bigNextCryptoPrime(n) 
{
    while (!bigIsPrime(n))
        n += 2n;
    
    return n;
}



function bigCryptoPrime(e)
{
    // set p so that gcd(e, p-1) = 1
    
    let p;

    do
    {
        const rnd = bigCryptoRandom();
        p         = bigNextCryptoPrime(rnd);
    }
    while (gcd(p-1n, e) != 1n); 
        
    return p;
}



function createCryptoPrimePair(e)
{
    let p = bigCryptoPrime(e);
    
    let q;
    do { q = bigCryptoPrime(e); } 
    while (q == p);

    if (p < q)
        [p,q] = [q,p];

    return [p, q];
}



function createCryptoKeys(e = 65537n) 
{
    // for a 64-bit modulus
    const p   = 4177474087n;
    const q   = 3438374081n;
    
    // for a 256-bit modulus
    // const p = 324595347357507885811600545702775285127n;
    // const q = 269975805195380507054350212467502676501n;

    // for a 2048-bit modulus
    // const p = 175174222516298387167194272697585437036810021236416760552899966284752011252198594013507417602600201436392264584002280023410776413073587129726141185393623449028440388452751264699475754683756720892485898644561628374159554994706803903659838117562670498436083060507993966358733361521299548446230454315603662036469n;
    // const q = 137903165485589693700981982313430857945541993940503493680067557312840527561097051166704349879274851836049344355243285831485925505832584105624064061259858226754867264793670708366732221684041373398786004227019387898423254675498301526584324375120659877872268262270523914099357199684086439264688977237417227910807n;
    
    const  n   = p * q;
    const _phi = (p-1n) * (q-1n);

    const  d   = bigModInvert(e, _phi);

    return {
        public:  {n:n, e:e },
        private: {n:n, d:d, p:p, q:q} };
}                        



function encryptDataBlock(n, key, sign  ) { return bigPowMod(n, (sign   ? key.d : key.e), key.n); }        
function decryptDataBlock(n, key, verify) { return bigPowMod(n, (verify ? key.e : key.d), key.n); }        



function encrypt(data, key) { return encryptData(data, key, false); }
function decrypt(data, key) { return decryptData(data, key, false); }

function sign   (data, key) { return encryptData(data, key, true); } // yes I know real sign/verify uses a hash,
function verify (data, key) { return decryptData(data, key, true); } // but I prefer it this way for what I need



function encryptData(data, key, sign)
{
    // prep array should be a multiple of cryptoBufferSize
    const prep   = new Uint8Array(Math.ceil((data.length) / cryptoBufferSize) * cryptoBufferSize); 
    const cipher = new Uint8Array(prep.length);


    const start = prep.length - data.length;
    for (let i = 0; i < data.length; i++)
        prep[start+i] = data[i];


    let length = prep.length;
    let nBlock = 0;

    while (length > 0)
    {
        const blockStart = nBlock * cryptoBufferSize;
        const blockSize  = Math.min(length, cryptoBufferSize);
        
        const block = bigFromBufferAt(prep, blockStart, cryptoBufferSize);
        const enc   = encryptDataBlock(block, key, sign);
        
        bigToBufferAt(enc, cipher, blockStart, cryptoBufferSize);
        
        nBlock++;
        length -= blockSize;
    }
    
    
    return cipher;
}



function decryptData(cipher, key, verify)
{
    const data = new Uint8Array(cipher.length);
    
    
    let length = cipher.length;
    let nBlock = 0;
    
    while (length > 0)
    {
        var blockStart = nBlock * cryptoBufferSize;
        var blockSize  = Math.min(length, cryptoBufferSize);

        var block = bigFromBufferAt(cipher, blockStart, cryptoBufferSize);
        var dec   = decryptDataBlock(block, key, verify);
        bigToBufferAt(dec, data, blockStart, cryptoBufferSize); 

        nBlock++;
        length -= blockSize;
    }    


    return data;    
}



// function sha256(text) 
// {
//     const encoder = new TextEncoder();
//     const data    = encoder.encode(text);

    
//     let [h0, h1, h2, h3, h4, h5, h6, h7] = 
//     [
//         0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a,  // initial hash values (constants 
//         0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19   // from the SHA-256 algorithm)
//     ];

//     const k = new Uint32Array([ // round constants
//         0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
//         0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
//         0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
//         0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
//         0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
//         0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
//         0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
//         0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
//         0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
//         0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
//         0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
//         0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
//         0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
//         0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
//         0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
//         0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2 ]);


//     // Main loop
//     for (let i = 0; i < data.length; i += 64) 
//     {
//         const block = data.slice(i, i + 64);
//         const words = new Uint32Array(new DataView(block.buffer));

//         for (let j = 16; j < 64; j++) 
//         {
//             const s0 = 
//                   (words[j - 15] >>>  7 | words[j - 15] << 25) 
//                 ^ (words[j - 15] >>> 18 | words[j - 15] << 14) 
//                 ^ (words[j - 15] >>> 3);

//             const s1 = 
//                   (words[j - 2] >>> 17 | words[j - 2] << 15) 
//                 ^ (words[j - 2] >>> 19 | words[j - 2] << 13) 
//                 ^ (words[j - 2] >>> 10);

//             words[j] = (words[j - 16] + s0 + words[j - 7] + s1) | 0;
//         }

        
//         let [a, b, c, d, e, f, g, h] = [h0, h1, h2, h3, h4, h5, h6, h7];

//         for (let j = 0; j < 64; j++) 
//         {
//             const s0 = 
//                   (a >>>  2 | a << 30) 
//                 ^ (a >>> 13 | a << 19) 
//                 ^ (a >>> 22 | a << 10);

//             const maj = 
//                   (a & b) 
//                 ^ (a & c) 
//                 ^ (b & c);

//             const t2 = s0 + maj;


//             const s1 = 
//                   (e >>>  6 | e << 26) 
//                 ^ (e >>> 11 | e << 21)
//                 ^ (e >>> 25 | e <<  7);

//             const ch = 
//                   (  e  & f) 
//                 ^ ((~e) & g);

//             const t1 = h + s1 + ch + k[j] + words[j];


//             h = g;
//             g = f;
//             f = e;
//             e = (d + t1) | 0;
//             d = c;
//             c = b;
//             b = a;
//             a = (t1 + t2) | 0;
//         }


//         h0 = (h0 + a) | 0;
//         h1 = (h1 + b) | 0;
//         h2 = (h2 + c) | 0;
//         h3 = (h3 + d) | 0;
//         h4 = (h4 + e) | 0;
//         h5 = (h5 + f) | 0;
//         h6 = (h6 + g) | 0;
//         h7 = (h7 + h) | 0;
//     }


//     const hashArray = new Uint32Array([h0, h1, h2, h3, h4, h5, h6, h7]);

//     return Array.from(new Uint8Array(hashArray.buffer))
//         .map(byte => ('0' + byte.toString(16)).slice(-2))
//         .join('');
// }



// function generatePepper() 
// {
//     const _0x7a6c = (() => 
//     {
//         const _0x446d = 
//         [
//             '\x69\x79\x68\x77\x67\x46\x7A\x6C\
//              \x38\x74\x49\x47\x52\x76\x64\x6C\
//              \x38\x76\x63\x69\x49\x4C\x4D\x6B\
//              \x39\x76\x63\x7A\x4F\x46\x38\x61\
//              \x53\x7A\x4A\x39\x76\x64\x57\x45\
//              \x7A\x4A\x48\x63\x43\x56\x70\x65\x72'
//         ];
    
//         const _0x4a1c = _0x2f74 => 
//         {
//             return _0x2f74.replace(/./g, (_0x5a3e, _0x3e5a) => 
//             {
//                 return String.fromCharCode(_0x5a3e.charCodeAt(0) - (_0x3e5a % 2) - 1);
//             });
//         };
    
//         return _0x4a1c(_0x446d[0]);
//     })();
  
//     return _0x7a6c;
// }