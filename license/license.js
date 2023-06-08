const licenseKeys     = createCryptoKeys();
const licenseHashSize = 4;



function createLicenseKey(license)
{
    const str  = createLicenseDataString(license);
    const hash = hashLicenseString(str, licenseHashSize);
    const enc  = sign(hash, licenseKeys.private);
    const key  = arrayToBase32(enc);

    return key;
}



function createLicenseFromDate(userId, strDate, tier) // DDMMYYYY
{
    return createLicense(
        userId,
        parseInt(strDate.substring(0, 2)),
        parseInt(strDate.substring(2, 4)),
        parseInt(strDate.substring(4)),
        tier);

}



function createLicense(userId, lastDay, lastMonth, lastYear, tier)
{
    return {
        userId:    userId,
        tier:      tier, // 0 = free, 1+ = subscription
        lastDay:   lastDay,
        lastMonth: lastMonth,
        lastYear:  lastYear,
    };
}



function createLicenseString(license)
{
    return license.userId
         + createLicenseInfoString(license);
}



function createLicenseInfoString(license)
{
    return license.tier     .toString()
         + license.lastDay  .toString().padStart(2, '0') 
         + license.lastMonth.toString().padStart(2, '0')
         + license.lastYear .toString(); 
}



function createLicenseDataString(license)
{
    const str = createLicenseInfoString(license);

    let comp1 = str;
    let comp2 = '';
    let comp3 = '';
    
    for (let i = 0; i < comp1.length; i++)
    {
        const code2 = ((parseInt(comp1[i]) + i) % 10);

        comp2 += code2.toString();
        comp3 += ((parseInt(comp1[i]) ^ code2) % 10).toString()
    }


    const compData = (comp1 + comp2 + comp3).substring(0, license.userId.length)

    return compactLicenseDataString(license.userId, compData);
}



function getLicenseCompData(license)
{
    const str = createLicenseInfoString(license);

    let comp1 = str;
    let comp2 = '';
    let comp3 = '';
    
    for (let i = 0; i < comp1.length; i++)
    {
        const code2 = (parseInt(comp1[i]) + i) % 10;

        comp2 += code2.toString();
        comp3 += ((parseInt(comp1[i]) ^ code2) % 10).toString()
    }


    return (comp1 + comp2 + comp3).substring(0, license.userId.length)
}



function compactLicenseDataString(userId, str)
{
    let comp = new Uint8Array(userId.length);

    for (let i = 0; i < comp.length; i++)
        comp[i] = (userId.charCodeAt(i) ^ str.charCodeAt(i)) % 0x100;

    return arrayToBase32(comp);
}



function hashLicenseString(str, nBytes)
{
    // XOR wrap name around a given number of bytes

    const bytes = stringToCharCodeArray(str);


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



function validateLicense(userId, licenseKey)
{
    const now = new Date(Date.now());


    for (let tier = 0; tier <= 1; tier++)
    {
        const license = createLicense(
            userId,
            now.getDate(),
            now.getMonth()+1, // months start at 0
            now.getFullYear(),
            tier);


        let   curCheck  = 0;
        const maxCheck  = 31 * 24;


        while (curCheck++ < maxCheck)
        {
            if (validateLicenseKey(license, licenseKey))
            {
                license.tier = tier;
                return license;
            }

            license.lastDay++; // err on the side of client, include current day if it's last

            if (license.lastDay   > 31) { license.lastMonth++; license.lastDay   = 1; }
            if (license.lastMonth > 12) { license.lastYear ++; license.lastMonth = 1; }
        }
    }


    return null;
}



function validateLicenseKey(license, key, rec = false)
{
    const str   = createLicenseDataString(license);
    
    const hash  = hashLicenseString(str, licenseHashSize);
    
    const arr   = base32toArray(key.toUpperCase());
    const dec   = verify(arr, licenseKeys.public).subarray(licenseHashSize);
    const trim  = dec.subarray(dec.length - licenseHashSize);
   
    const valid = arraysAreEqual(hash, trim);


    if (valid && !rec)
    {
        let lowerKey = key;

        const lastChar  = lowerKey.at(-1);
        const lastIndex = base32chars.indexOf(lastChar);

        if (lastIndex > 0)
        {
            lowerKey = replaceInStringAt(lowerKey, lowerKey.length-1, base32chars[lastIndex-1]);

            if (validateLicenseKey(license, lowerKey, true))
                return false; // guard against the last bit
        }
    }


    return valid;
}