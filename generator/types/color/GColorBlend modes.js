function blendNormal(col, back, amount)
{
    return [ hardPosZero(col[0] * amount + back[0] * (1 - amount), 0.005),
             hardPosZero(col[1] * amount + back[1] * (1 - amount), 0.005),
             hardPosZero(col[2] * amount + back[2] * (1 - amount), 0.005) ];
}



function blendDarken(col, back, amount)
{
    return blendNormal(
        [ Math.min(back[0], col[0]),
          Math.min(back[1], col[1]),
          Math.min(back[2], col[2]) ],
        back,
        amount);
}



function chanMultiply(c, b)
{
    return c * b;
}



function blendMultiply(col, back, amount)
{
    return blendNormal(
        [ chanMultiply(col[0], back[0]),
          chanMultiply(col[1], back[1]),
          chanMultiply(col[2], back[2]) ],
        back,
        amount);
}



function blendPlusDarker(col, back, amount)
{
    return blendNormal(
        [ Math.min(back[0] + col[0], back[0], col[0]),
          Math.min(back[1] + col[1], back[1], col[1]),
          Math.min(back[2] + col[2], back[2], col[2]) ],
        back,
        amount);
}



function chanColorBurn(c, b)
{
         if (b == 1) return 1;
    else if (c == 0) return 0;
    else             return Math.min(Math.max(0, 1 - (1 - b) / c), 1);
}



function blendColorBurn(col, back, amount)
{
    return blendNormal(
         [ chanColorBurn(col[0], back[0]),
           chanColorBurn(col[1], back[1]),
           chanColorBurn(col[2], back[2]) ],
        back,
        amount);
}



function blendLighten(col, back, amount)
{
    return blendNormal(
        [ Math.max(back[0], col[0]),
          Math.max(back[1], col[1]),
          Math.max(back[2], col[2]) ],
        back,
        amount);
}



function chanScreen(c, b)
{
    return b + c - b*c;
}



function blendScreen(col, back, amount)
{
    return blendNormal(
        [ chanScreen(col[0], back[0]),
          chanScreen(col[1], back[1]),
          chanScreen(col[2], back[2]) ],
        back,
        amount);
}



function blendPlusLighter(col, back, amount)
{
    return blendNormal(
        [ Math.min(back[0] + col[0], 1),
          Math.min(back[1] + col[1], 1),
          Math.min(back[2] + col[2], 1) ],
        back,
        amount);
}



function chanColorDodge(c, b)
{
         if (b == 0) return 0;
    else if (c == 1) return 1;
    else             return Math.min(b / (1 - c), 1);
}



function blendColorDodge(col, back, amount)
{
    return blendNormal(
        [ chanColorDodge(col[0], back[0]),
          chanColorDodge(col[1], back[1]),
          chanColorDodge(col[2], back[2]) ],
        back,
        amount);
}



function blendOverlay(col, back, amount)
{
    return blendNormal(
        [ chanHardLight(back[0], col[0]),
          chanHardLight(back[1], col[1]),
          chanHardLight(back[2], col[2]) ],
        back,
        amount);
}



function bSL_D(b)
{
    return b <= 0.25
         ? ((16 * b - 12) * b + 4) * b
         : Math.sqrt(b);
}



function chanSoftLight(c, b)
{
    return c <= 0.5
         ? b - (1 - 2*c) * b * (1 - b)
         : b + (2*c - 1) * (bSL_D(b) - b);
}



function blendSoftLight(col, back, amount)
{
    return blendNormal(
        [ chanSoftLight(col[0], back[0]),
          chanSoftLight(col[1], back[1]),
          chanSoftLight(col[2], back[2]) ],
        back,
        amount);
}



function chanHardLight(c, b)
{
    if (c <= 0.5) return chanMultiply(b, 2 * c);
    else          return chanScreen(b, 2 * c - 1);
}



function blendHardLight(col, back, amount)
{
    return blendNormal(
        [ chanHardLight(col[0], back[0]),
          chanHardLight(col[1], back[1]),
          chanHardLight(col[2], back[2]) ],
        back,
        amount);
}



function blendDifference(col, back)
{
    return [ Math.abs(back[0] - col[0]),
             Math.abs(back[1] - col[1]),
             Math.abs(back[2] - col[2]) ];
}



function chanExclusion(c, b)
{
    return b + c - 2*b*c;
}



function blendExclusion(col, back, amount)
{
    return blendNormal(
        [ chanExclusion(col[0], back[0]),
          chanExclusion(col[1], back[1]),
          chanExclusion(col[2], back[2]) ],
        back,
        amount);
}



function bl_lum(col)
{
    return col[0] * 0.30
         + col[1] * 0.59
         + col[2] * 0.11;
}



function bl_setLum(_col, l)
{
    const col = [..._col];

    const d = l - bl_lum(col);

    col[0] += d;
    col[1] += d;
    col[2] += d;

    return bl_clamp(col);
}



function bl_sat(col)
{
    return Math.max(col[0], col[1], col[2]) 
         - Math.min(col[0], col[1], col[2]);
}



function bl_min(col)
{
         if (col[0] <= col[1] 
          && col[0] <= col[2]) return 0;
    else if (col[1] <= col[1] 
          && col[1] <= col[2]) return 1;
    else                       return 2;
}



function bl_mid(col)
{
         if (   col[0] >= col[1] 
             && col[0] <= col[2]
          ||    col[0] <= col[1] 
             && col[0] >= col[2]) return 0;
    else if (   col[1] >= col[0] 
             && col[1] <= col[2]
          ||    col[1] <= col[0] 
             && col[1] >= col[2]) return 1;
    else                          return 2;
}



function bl_max(col)
{
         if (col[0] >= col[1] 
          && col[0] >= col[2]) return 0;
    else if (col[1] >= col[1] 
          && col[1] >= col[2]) return 1;
    else                       return 2;
}



function bl_ndx(col) // get min/mid/max chan indices
{
    if (   col[0] == col[1] 
        && col[0] == col[2])
        return [0, 1, 2];

    else 
        return [
            bl_min(col), 
            bl_mid(col), 
            bl_max(col)];
}



function bl_setSat(_col, s)
{
    const col       = [..._col];
    const [n, d, x] = bl_ndx(col);

    if (col[x] > col[n])
    {
        col[d] = (((col[d] - col[n]) * s) / (col[x] - col[n]));
        col[x] = s;
    }
    else
        col[d] = col[x] = 0;

    col[n] = 0;

    return col;
}



function bl_chanClamp(c, l, n, x)
{
         if (n < 0) return l + (((c - l) * l) / (l - n));
    else if (x > 1) return l + (((c - l) * (1 - l)) / (x - l));
    else            return c;
}



function bl_clamp(col)
{
    const l   = bl_lum(col);

    const n = Math.min(col[0], col[1], col[2]);
    const x = Math.max(col[0], col[1], col[2]);

    return [ bl_chanClamp(col[0], l, n, x),
             bl_chanClamp(col[1], l, n, x),
             bl_chanClamp(col[2], l, n, x) ];
}



function blendHue(col, back, amount)
{
    return blendNormal(
        bl_setLum(bl_setSat(col, bl_sat(back)), bl_lum(back)),
        back,
        amount);
}



function blendSaturation(col, back, amount)
{
    return blendNormal(
        bl_setLum(bl_setSat(back, bl_sat(col)), bl_lum(back)),
        back,
        amount);
}



function blendColor(col, back, amount)
{
    return blendNormal(
        bl_setLum(col, bl_lum(back)),
        back,
        amount);
}



function blendLuminosity(col, back, amount)
{
    return blendNormal(
        bl_setLum(back, bl_lum(col)),
        back,
        amount);
}