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



function createLicenseFromData(email, tier, lastDate) // DDMMYYYY
{
    return createLicense(
        email,
        tier,
        parseInt(lastDate.substring(0, 2)),
        parseInt(lastDate.substring(2, 4)),
        parseInt(lastDate.substring(4   )));
}



function createLicense(email, tier, lastDay, lastMonth, lastYear)
{
    return {
        email:     email,
        tier:      tier, // 0 = free trial, 1+ = subscription
        lastDay:   lastDay,
        lastMonth: lastMonth,
        lastYear:  lastYear,
    };
}



function createLicenseString(license)
{
    return prepareEmail(license.email)
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


    const compData = (comp1 + comp2 + comp3).substring(0, license.email.length)

    return compactLicenseDataString(license.email, compData);
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


    return (comp1 + comp2 + comp3).substring(0, license.email.length)
}



function compactLicenseDataString(email, str)
{
    let comp = new Uint8Array(email.length);

    for (let i = 0; i < comp.length; i++)
        comp[i] = (email.charCodeAt(i) ^ str.charCodeAt(i)) % 0x100;

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
        

        while (length > 1)
        {
            for (let i = 0; i < nBytes; i++)
                bytes[i] ^= bytes[pos+i];
                
            pos    += nBytes;
            length -= nBytes;
        }
    }
    

    return newSizeArrayFrom(bytes, nBytes);
}



function validateLicense(email, licenseKey)
{
    if (email.trim() == '')
        return null;


    const now = new Date(Date.now());


    for (let tier = 0; tier <= 1; tier++)
    {
        const license = createLicense(
            email,
            tier,
            now.getDate(),
            now.getMonth()+1, // months start at 0
            now.getFullYear());


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
            lowerKey = lowerKey.replaceAt(lowerKey.length-1, base32chars[lastIndex-1]);

            if (validateLicenseKey(license, lowerKey, true))
                return false; // guard against the last bit
        }
    }


    return valid;
}



function prepareEmail(email)
{
    for (let i = email.length, j = 0; i < 18; i++, j++)
        email += String(j % 10);


    var cp = [];
    for (let i = 0; i < 18; i++)
        cp.push(0);

    
    let j = 0;
    while (j < email.length)
    {
        for (let i = 0; i < 18 && j*18+i < email.length; i++)
            cp[i] = cp[i] ^ email.codePointAt(j*18+i);

        j++;
    }


    email = '';
    for (let i = 0; i < 18; i++)
        email += String.fromCodePoint(cp[i]);


    return email;
}



function todayPlus(months = 0) 
{
    let date  = new Date();

    date.setUTCMonth(date.getUTCMonth() + months);
    
    const day   = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year  = date.getUTCFullYear();
  
    return day + month + year;
  }