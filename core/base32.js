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
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) <<  1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[ (a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) <<  3) | ((a4 & 0xE0) >>> 5)];
            base32 += chars[ (a4 & 0x1F)];
        }
        else if (len == 4)
        {
            var a0 = array[i  ],
                a1 = array[i+1],
                a2 = array[i+2],
                a3 = array[i+3];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) <<  1) | ((a3 & 0x80) >>> 7)];
            base32 += chars[ (a3 & 0x7C) >>> 2];
            base32 += chars[((a3 & 0x03) <<  3)];
        }
        else if (len == 3)
        {
            var a0 = array[i  ],
                a1 = array[i+1],
                a2 = array[i+2];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4) | ((a2 & 0xF0) >>> 4)];
            base32 += chars[((a2 & 0x0F) <<  1)];
        }
        else if (len == 2)
        {
            var a0 = array[i  ],
                a1 = array[i+1];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2) | ((a1 & 0xC0) >>> 6)];
            base32 += chars[ (a1 & 0x3E) >>> 1];
            base32 += chars[((a1 & 0x01) <<  4)];
        }
        else if (len == 1)
        {
            var a0 = array[i];
            
            base32 += chars[ (a0 & 0xF8) >>> 3];
            base32 += chars[((a0 & 0x07) <<  2)];
        }


        i   += 5;
        len -= 5;
    }


    return base32;
}



function base32toArray(base32, chars = base32chars)
{
    var array = [];


    var len = base32.length;
    var c   = 0;

    while (len > 0)
    {
        if (len >= 8)
        {
            var c0 = chars.indexOf(base32[c  ]),
                c1 = chars.indexOf(base32[c+1]),
                c2 = chars.indexOf(base32[c+2]),
                c3 = chars.indexOf(base32[c+3]),
                c4 = chars.indexOf(base32[c+4]),
                c5 = chars.indexOf(base32[c+5]),
                c6 = chars.indexOf(base32[c+6]),
                c7 = chars.indexOf(base32[c+7]);

            array.push( (c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
            array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
            array.push(((c6 & 0x07) << 5) | c7);
        }
        else if (len == 7)
        {
            var c0 = chars.indexOf(base32[c  ]),
                c1 = chars.indexOf(base32[c+1]),
                c2 = chars.indexOf(base32[c+2]),
                c3 = chars.indexOf(base32[c+3]),
                c4 = chars.indexOf(base32[c+4]),
                c5 = chars.indexOf(base32[c+5]),
                c6 = chars.indexOf(base32[c+6]);

            array.push(( c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
            array.push(((c4 & 0x01) << 7) | (c5 << 2) | ((c6 & 0x18) >>> 3));
        }
        else if (len == 5)
        {
            var c0 = chars.indexOf(base32[c  ]),
                c1 = chars.indexOf(base32[c+1]),
                c2 = chars.indexOf(base32[c+2]),
                c3 = chars.indexOf(base32[c+3]),
                c4 = chars.indexOf(base32[c+4]);

            array.push( (c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
            array.push(((c3 & 0x0F) << 4) | ((c4 & 0x1E) >>> 1));
        }
        else if (len == 4)
        {
            var c0 = chars.indexOf(base32[c  ]),
                c1 = chars.indexOf(base32[c+1]),
                c2 = chars.indexOf(base32[c+2]),
                c3 = chars.indexOf(base32[c+3]);

            array.push( (c0         << 3) | ((c1 & 0x1C) >>> 2));
            array.push(((c1 & 0x03) << 6) | (c2 << 1) | ((c3 & 0x10) >>> 4));
        }
        else if (len == 2)
        {
            var c0 = chars.indexOf(base32[c  ]),
                c1 = chars.indexOf(base32[c+1]);

            array.push((c0 << 3) | ((c1 & 0x1C) >>> 2));
        }


        c   += 8;
        len -= 8;
    }


    return array;
}