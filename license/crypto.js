// const cryptoModulusSize     = 64; // to keep the keys short
// const millerRabinIterations = 40;

// const cryptoBufferSize      = cryptoModulusSize/8;
// const cryptoPrimeBufferSize = cryptoBufferSize /2;
     
// const cryptoBuffer          = new Uint8Array(cryptoPrimeBufferSize);


// function bigCryptoRandom()
// {
//     for (let i = 0; i < cryptoPrimeBufferSize; i++)
//         cryptoBuffer[i] = toInt(Math.random() * 0x100);

//     cryptoBuffer[0]                       |= 0xC0; // set the top bit to ensure a relatively large number
//     cryptoBuffer[cryptoPrimeBufferSize-1] |= 0x01; // set low bit to ensure the number is odd

//     return bigFromBuffer(cryptoBuffer);
// }



// function bigNextCryptoPrime(n) 
// {
//     while (!bigIsPrime(n))
//         n += 2n;
    
//     return n;
// }



// function bigCryptoPrime(e)
// {
//     // set p so that gcd(e, p-1) = 1
    
//     let p;

//     do
//     {
//         const rnd = bigCryptoRandom();
//         p         = bigNextCryptoPrime(rnd);
//     }
//     while (gcd(p-1n, e) != 1n); 
        
//     return p;
// }



// function createCryptoPrimePair(e)
// {
//     let p = bigCryptoPrime(e);
    
//     let q;
//     do { q = bigCryptoPrime(e); } 
//     while (q == p);

    
//     if (p < q)
//         [p,q] = [q,p];

    
//     // console.log('p: ' + p);
//     // console.log('q: ' + q);

//     return [p, q];
// }



// function createCryptoKeys()
// {
//     const e = 65537n; // 0x10001


//     const p = 171015884525198953812766518124105165718653873998956756668025044221872229189000224853283418100843709051461026314124691533908776566252132643262590538651722808414927589080453045207809268132409732602333460056024268701292425924373474424856230484676389948410647363185480527668352208344285098898398427328550005504453n,
//           q = 155609589144550304318321520462261131589420632313724769782511579674112504658012602948864212319636338680003350414119487761858358450704391631375906758644966783345911054968703886354891203894119403383879286405905868259207088334824357002928336613811380509880129563041650203531859521495334731320347454780789832377709n;
    

//     const  n   = p * q;
//     const _phi = (p-1n) * (q-1n);

//     const  d   = bigModInvert(e, _phi);


//     return {
//         public:  {n:n, e:e },
//         private: {n:n, d:d, p:p, q:q} };
// }                        



// function encryptBlock(n, key, sign  ) { return bigPowMod(n, (sign   ? key.d : key.e), key.n); }        
// function decryptBlock(n, key, verify) { return bigPowMod(n, (verify ? key.e : key.d), key.n); }        



// function encrypt(data, key) { return encryptData(data, key, false); }
// function decrypt(data, key) { return decryptData(data, key, false); }

// function sign   (data, key) { return encryptData(data, key, true); } // yes I know real sign/verify uses a hash,
// function verify (data, key) { return decryptData(data, key, true); } // but I prefer it this way for what I need



// function encryptData(data, key, sign)
// {
//     // prep array should be a multiple of cryptoBufferSize
//     const prep   = new Uint8Array(Math.ceil((data.length) / cryptoBufferSize) * cryptoBufferSize); 
//     const cipher = new Uint8Array(prep.length);


//     const start = prep.length - data.length;
//     for (let i = 0; i < data.length; i++)
//         prep[start+i] = data[i];


//     let length = prep.length;
//     let nBlock = 0;

//     while (length > 0)
//     {
//         const blockStart = nBlock * cryptoBufferSize;
//         const blockSize  = Math.min(length, cryptoBufferSize);
        
//         const block      = bigFromBufferAt(prep, blockStart, cryptoBufferSize);
//         const enc        = encryptBlock(block, key, sign);
        
//         bigToBufferAt(enc, cipher, blockStart, cryptoBufferSize);
        
//         nBlock++;
//         length -= blockSize;
//     }
    
    
//     return cipher;
// }



// function decryptData(cipher, key, verify)
// {
//     const data = new Uint8Array(cipher.length);
    
    
//     let length = cipher.length;
//     let nBlock = 0;
    
//     while (length > 0)
//     {
//         const blockStart = nBlock * cryptoBufferSize;
//         const blockSize  = Math.min(length, cryptoBufferSize);

//         const block      = bigFromBufferAt(cipher, blockStart, cryptoBufferSize);
//         const dec        = decryptBlock(block, key, verify);

//         bigToBufferAt(dec, data, blockStart, cryptoBufferSize); 

//         nBlock++;
//         length -= blockSize;
//     }    


//     return data;    
// }