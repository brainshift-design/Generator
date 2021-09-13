const licenseKeys = createCryptoKeys();



function createProductKey(name)
{
    var hash = hashLicenseName(name, 16);
    var enc  = encrypt(hash, licenseKeys.private);
    var key  = arrayToBase32(enc);

    return key;
}



function checkProductKey(name, key)
{
    var arr  = base64toArray(key);
    var dec  = decrypt(arr, licenseKeys.public);
    var hash = hashLicenseName(name);
    
    return arraysEqual(dec, hash);
}



function hashLicenseName(name, nBytes)
{
    name = name.trim();

    var bytes = bytesFromString(name);

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