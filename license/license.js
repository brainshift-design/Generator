const licenseKeys     = createCryptoKeys();
const licenseHashSize = 4;



function createProductKey(name)
{
    var hash = hashLicenseName(name, licenseHashSize);
    var enc  = sign(hash, licenseKeys.private);
    var key  = arrayToBase32(enc);

    return key;
}



function validateProductKey(name, key, rec = false)
{
    // TODO: check from today until 1 year from now (max license length)
    // 1/day, so 365 max, add end day to name
    // check today against last launch date (in private data) to prevent clock tampering

    var arr  = base32toArray(key.toUpperCase());
    var dec  = verify(arr, licenseKeys.public).subarray(licenseHashSize);
    var trim = dec.subarray(dec.length - licenseHashSize);
    var hash = hashLicenseName(name, licenseHashSize);
    
    var valid = arraysEqual(trim, hash);

    if (valid && !rec)
    {
        var lowerKey  = key;

        var lastChar  = lowerKey[lowerKey.length-1];
        var lastIndex = base32chars.indexOf(lastChar);

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

    var bytes = stringToArray(name);

    if (bytes.length > nBytes)
    {
        var pos    = nBytes;
        var length = bytes.length - nBytes;
        
        while (length > 0)
        {
            for (var i = 0; i < nBytes; i++)
                bytes[i] ^= bytes[pos+i];
            
            pos    += nBytes;
            length -= nBytes;
        }
    }
    

    return newSizeArrayFrom(bytes, nBytes);
}