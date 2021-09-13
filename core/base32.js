const base32chars = '12345679ABCDEFGHJKLMNPQRSTUVWXYZ';



function arrayToBase32(array, chars = base32chars)
{
    var base32 = '';

    var len = array.length;
    var i   = 0;

    while (len > 0)
    {
        if (len >= 5)
        {
            var a0 = array[i  ],
                a1 = array[i+1],
                a2 = array[i+2],
                a3 = array[i+3],
                a4 = array[i+4];
            
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[(a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) << 3) | ((a4 & 0xE0) >>> 5)];
            base32 += chars[(a4 & 0x1F)];
        }
        else if (len == 4)
        {
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) << 1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[(a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) << 3)];
        }
        else if (len == 3)
        {
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) << 1)];
        }
        else if (len == 2)
        {
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[(a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) << 4)];
        }
        else if (len == 1)
        {
            base32 += chars[(a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) << 2)];
        }

        i   += 5;
        len -= 5;
    }


    return base32;
}



function base32block(array, pos)
{

}