function rgb2lab(rgb, cs = sRGB)
{
    return xyz2lab(rgb2xyz(rgb, cs), cs.W);
}



function lab2rgb(lab, cs = sRGB)
{
    return xyz2rgb(lab2xyz(lab, cs.W), cs);
}



function xyz2lab(xyz, W = sRGB.W)
{
    const x = xyz[0], 
          y = xyz[1], 
          z = xyz[2];

    const e = 0.008856; //cube(6/29);
    const k = 903.3;    //cube(29/3);

    let xw = x / W[0];
    let yw = y / W[1];
    let zw = z / W[2];

    xw = xw > e ? Math.cbrt(xw) : (k / 100 * xw + 0.16) / 1.16;
    yw = yw > e ? Math.cbrt(yw) : (k / 100 * yw + 0.16) / 1.16;
    zw = zw > e ? Math.cbrt(zw) : (k / 100 * zw + 0.16) / 1.16;


    const l = (1.16 * yw) - 0.16;
    const a = 5 * (xw - yw);
    const b = 2 * (yw - zw);

    return [l, a, b];
}



function lab2xyz(lab, W = sRGB.W)
{
    const l = lab[0], 
          a = lab[1], 
          b = lab[2];

    const e = 0.008856 / 100; //cube(6/29) / 100;
    const k = 903.3    / 100; //cube(29/3) / 100;

    const yw = (l + 0.16)/1.16;
    const xw = a/5 + yw;
    const zw = yw - b/2;

    let x = cube(xw) > e ? cube(xw) : (1.16*xw - 0.16) / k;
    let y = cube(yw) > e ? cube(yw) : (1.16*yw - 0.16) / k;
    let z = cube(zw) > e ? cube(zw) : (1.16*zw - 0.16) / k;

    x *= W[0];
    y *= W[1];
    z *= W[2];
 
    return [x, y, z];
}