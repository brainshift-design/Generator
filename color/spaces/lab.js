function xyz2lab(xyz, W)
{
    const x = xyz[0], 
          y = xyz[1], 
          z = xyz[2];

    const e = cube(6/29);
    const k = cube(29/3);

    let xw = x / W[0];
    let yw = y / W[1];
    let zw = z / W[2];

    xw = xw > e ? Math.cbrt(xw) : (k * xw + 16)/116;
    yw = yw > e ? Math.cbrt(yw) : (k * yw + 16)/116;
    zw = zw > e ? Math.cbrt(zw) : (k * zw + 16)/116;

    const l = (116 * yw) - 16;
    const a = 500 * (xw - yw);
    const b = 200 * (yw - zw);

    return [l, a, b];
}



function lab2xyz(lab, W)
{
    const l = lab[0], 
          a = lab[1], 
          b = lab[2];

    const e = cube(6/29);
    const k = cube(29/3);

    const yw = (l + 16)/116;
    const xw = a/500 + yw;
    const zw = yw - b/200;

    let x = cube(xw) > e ? cube(xw) : (116*xw - 16)/k;
    let y = cube(yw) > e ? cube(yw) : (116*yw - 16)/k;
    let z = cube(zw) > e ? cube(zw) : (116*zw - 16)/k;

    x *= W[0];
    y *= W[1];
    z *= W[2];

    return [x, y, z];
}