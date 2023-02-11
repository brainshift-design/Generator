const licenseKeys     = createCryptoKeys();
const licenseHashSize = 4;



function createProductKey(name)
{
    const hash = hashLicenseName(name, licenseHashSize);
    const enc  = sign(hash, licenseKeys.private);
    const key  = arrayToBase32(enc);

    return key;
}



function validateProductKey(name, key, rec = false)
{
    // TODO: check from today until 1 year from now (max license length)
    // 1/day, so 365 max, add end day to name
    // check today against last launch date (in private data) to prevent clock tampering

    const arr  = base32toArray(key.toUpperCase());
    const dec  = verify(arr, licenseKeys.public).subarray(licenseHashSize);
    const trim = dec.subarray(dec.length - licenseHashSize);
    const hash = hashLicenseName(name, licenseHashSize);
    
    const valid = arraysEqual(trim, hash);

    if (valid && !rec)
    {
        let lowerKey = key;

        const lastChar  = lastOf(lowerKey);
        const lastIndex = base32chars.indexOf(lastChar);

        if (lastIndex > 0)
        {
            lowerKey = replaceInStringAt(lowerKey, lowerKey.length-1, base32chars[lastIndex-1]);

            if (validateProductKey(name, lowerKey, true))
                return false; // at this scale of product key the last bit needs to be guarded against
        }
    }

    return valid;
}



function hashLicenseName(name, nBytes)
{
    // XOR wrap name around a given number of bytes

    const bytes = stringToArray(name);

    if (bytes.length > nBytes)
    {
        let pos    = nBytes;
        let length = bytes.length - nBytes;
        
        while (length > 0)
        {
            for (let i = 0; i < nBytes; i++)
                bytes[i] ^= bytes[pos+i];
            
            pos    += nBytes;
            length -= nBytes;
        }
    }
    

    return newSizeArrayFrom(bytes, nBytes);
}