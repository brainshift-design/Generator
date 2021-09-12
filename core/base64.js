"use strict";

// Base64 / binary data / UTF-8 strings utilities
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Base64_encoding_and_decoding


// byte array to Base64 string decoding

function base64toUint6(c) 
{
    return    c > 64 
           && c < 91 
           ? c - 65 
           :    c > 96 
             && c < 123 
             ? c - 71
             :    c > 47 
               && c < 58 
               ? c + 4
               : c === 43 
                 ? 62
                 : c === 47 ? 63 : 0;
}



function base64toArray(str, blocksSize) 
{
    var base64 = str.replace(/[^A-Za-z0-9\+\/]/g, "");
    var inLen  = base64.length;

    var outLen = 
        blocksSize 
        ? Math.ceil((inLen * 3 + 1 >> 2) / blocksSize) * blocksSize 
        : inLen * 3 + 1 >> 2;
        
    var bytes = new Uint8Array(outLen);

    for (var mod3, 
             mod4, 
             uint24 = 0, 
             out    = 0, 
        i = 0; 
        i < inLen; 
        i++) 
    {
        mod4 = i & 3;
        uint24 |= base64toUint6(base64.charCodeAt(i)) << 6 * (3 - mod4);

        if (   mod4 === 3 
            || inLen - i === 1) 
        {
            for (mod3 = 0; mod3 < 3 && out < outLen; mod3++, out++) 
                bytes[out] = uint24 >>> (16 >>> mod3 & 24) & 255;

            uint24 = 0;
        }
    }

    return bytes;
}



// Base64 string to array encoding

function uint6toBase64(i) 
{
    return i < 26 
           ? i + 65
           : i < 52 
             ? i + 71
             : i < 62 
               ? i - 4
               : i === 62 
                 ? 43
                 : i === 63 ? 47 : 65;
}



function arrayToBase64(bytes)
{
    var mod3   = 2, 
        base64 = "";

    var length = bytes.length;

    for (var i = 0, uint24 = 0; i < length; i++) 
    {
        mod3 = i % 3;

        if (i > 0 && (i * 4 / 3) % 76 === 0) 
            base64 += "\r\n";

        uint24 |= bytes[i] << (16 >>> mod3 & 24);

        if (   mod3 === 2 
            || bytes.length - i === 1) 
        {
            base64 += String.fromCharCode(
                uint6toBase64(uint24 >>> 18 & 0x3F), 
                uint6toBase64(uint24 >>> 12 & 0x3F), 
                uint6toBase64(uint24 >>>  6 & 0x3F), 
                uint6toBase64(uint24        & 0x3F));
                
            uint24 = 0;
        }
    }

    return base64.substr(0, base64.length - 2 + mod3) + (mod3 === 2 ? '' : mod3 === 1 ? '=' : '==');
}



// UTF-8 array to DOMString and vice versa

function UTF8ArrToStr(bytes) 
{
    var str    = "";
    var length = bytes.length;

    for (var i = 0; i < length; i++) 
    {
        var byte = bytes[i];

        str += String.fromCharCode(
               byte > 251 
            && byte < 254 
            && i + 5 < length // six bytes
            ? (byte - 252) * 1073741824 + (bytes[++i] - 128 << 24) + (bytes[++i] - 128 << 18) + (bytes[++i] - 128 << 12) + (bytes[++i] - 128 << 6) + bytes[++i] - 128
            :    byte > 247 
              && byte < 252 
              && i + 4 < length // five bytes
              ? (byte - 248 << 24) + (bytes[++i] - 128 << 18) + (bytes[++i] - 128 << 12) + (bytes[++i] - 128 << 6) + bytes[++i] - 128
              :    byte > 239 
                && byte < 248 
                && i + 3 < length // four bytes
                ? (byte - 240 << 18) + (bytes[++i] - 128 << 12) + (bytes[++i] - 128 << 6) + bytes[++i] - 128
                :    byte > 223 
                  && byte < 240 
                  && i + 2 < length // three bytes
                  ? (byte - 224 << 12) + (bytes[++i] - 128 << 6) + bytes[++i] - 128
                  :    byte > 191 
                    && byte < 224 
                    && i + 1 < length // two bytes
                    ? (byte - 192 << 6) + bytes[++i] - 128 /* nPart < 127 ? */ // one byte
                    : byte);
    }

    return str;
}



function strToUTF8Arr(str) 
{
    var strLen = str.length, 
        arrLen = 0;


    // mapping

    for (var i = 0; i < strLen; i++) 
    {
        chr = str.charCodeAt(i);
        arrLen += chr < 0x80 ? 1 : chr < 0x800 ? 2 : chr < 0x10000 ? 3 : chr < 0x200000 ? 4 : chr < 0x4000000 ? 5 : 6;
    }

    var bytes = new Uint8Array(arrLen);


    // transcription

    for (var i = 0, iChr = 0; i < arrLen; iChr++) 
    {
        var chr = str.charCodeAt(iChr);
     
        if (chr < 0x80) // one byte
        {
            bytes[i++] = chr;
        } 
        else if (chr < 0x800) // two bytes
        {
            bytes[i++] = 192 + (chr >>> 6);
            bytes[i++] = 128 + (chr        & 0x3F);
        } 
        else if (chr < 0x10000) // three bytes
        {
            bytes[i++] = 224 + (chr >>> 12);
            bytes[i++] = 128 + (chr >>>  6 & 0x3F);
            bytes[i++] = 128 + (chr        & 0x3F);
        }
        else if (chr < 0x200000) // four bytes
        {
            bytes[i++] = 240 + (chr >>> 18);
            bytes[i++] = 128 + (chr >>> 12 & 0x3F);
            bytes[i++] = 128 + (chr >>>  6 & 0x3F);
            bytes[i++] = 128 + (chr        & 0x3F);
        } 
        else if (chr < 0x4000000) // five bytes
        {
            bytes[i++] = 248 + (chr >>> 24);
            bytes[i++] = 128 + (chr >>> 18 & 0x3F);
            bytes[i++] = 128 + (chr >>> 12 & 0x3F);
            bytes[i++] = 128 + (chr >>>  6 & 0x3F);
            bytes[i++] = 128 + (chr        & 0x3F);
        } 
        else //if (nChr <= 0x7fffffff) // six bytes
        {
            bytes[i++] = 252 + (chr >>> 30);
            bytes[i++] = 128 + (chr >>> 24 & 0x3F);
            bytes[i++] = 128 + (chr >>> 18 & 0x3F);
            bytes[i++] = 128 + (chr >>> 12 & 0x3F);
            bytes[i++] = 128 + (chr >>>  6 & 0x3F);
            bytes[i++] = 128 + (chr        & 0x3F);
        }
    }


    return bytes;
}