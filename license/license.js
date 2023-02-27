const licenseKeys     = createCryptoKeys();
const licenseHashSize = 4;



function validateLicense(userId, key)
{
    const now = new Date(Date.now());

    const license = 
    {
        userId:    userId,
        lastDay:   now.getDate(),
        lastMonth: now.getMonth() + 1,
        lastYear:  now.getFullYear()
    };  


    let   curCheck  = 0;
    const maxCheck  = 31 * 12;


    while (curCheck++ < maxCheck)
    {
        if (validateProductKey(license, key))
            return license;

        license.lastDay++;

        if (license.lastDay   > 31) { license.lastMonth++; license.lastDay   = 1; }
        if (license.lastMonth > 12) { license.lastYear ++; license.lastMonth = 1; }
    }


    return null;
}



function validateProductKey(license, key, rec = false)
{
    const str   = createLicenseString(license);
    const hash  = hashLicenseString(str, licenseHashSize);
    
    const arr   = base32toArray(key.toUpperCase());
    const dec   = verify(arr, licenseKeys.public).subarray(licenseHashSize);
    const trim  = dec.subarray(dec.length - licenseHashSize);
    
    const valid = arraysAreEqual(hash, trim);


    if (valid && !rec)
    {
        let lowerKey = key;

        const lastChar  = lastOf(lowerKey);
        const lastIndex = base32chars.indexOf(lastChar);

        if (lastIndex > 0)
        {
            lowerKey = replaceInStringAt(lowerKey, lowerKey.length-1, base32chars[lastIndex-1]);

            if (validateProductKey(license, lowerKey, true))
                return false; // guard against the last bit
        }
    }


    return valid;
}



function createProductKey(license)
{
    const str  = createLicenseString(license);
    const hash = hashLicenseString(str, licenseHashSize);
    const enc  = sign(hash, licenseKeys.private);
    const key  = arrayToBase32(enc);

    return key;
}



function createLicense(userId, strDate) // DDMMYYYY
{
    return {
        userId:    userId,
        lastDay:   parseInt(strDate.substring(0, 2)),
        lastMonth: parseInt(strDate.substring(2, 4)),
        lastYear:  parseInt(strDate.substring(4))
    };
}



function createLicenseString(license)
{
    return license.userId
         + license.lastDay  .toString().padStart(2, '0') 
         + license.lastMonth.toString().padStart(2, '0')
         + license.lastYear .toString(); 
}



function hashLicenseString(str, nBytes)
{
    // XOR wrap name around a given number of bytes

    const bytes = stringToArray(str);


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