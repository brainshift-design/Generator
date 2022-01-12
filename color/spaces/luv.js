const hueBiasLuv       = 0.18;  // brings H=0 back to conventional Rgb red



function xyz2luv(xyz, W = sRGB.W)
{
    const x = xyz[0], 
          y = xyz[1], 
          z = xyz[2];

    const e = cube(6/29);
    const k = cube(29/3);

    const yw = y / W[1];

    const l = 
        yw > e
        ? 116 * Math.cbrt(yw) - 16
        : k * yw;

    const u_ = 4*x / (x + 15*y + 3*z);
    const v_ = 9*y / (x + 15*y + 3*z);
    
    const uw = 4*W[0] / (W[0] + 15*W[1] + 3*W[2]);
    const vw = 9*W[1] / (W[0] + 15*W[1] + 3*W[2]);
    
    const u = 13*l * (u_ - uw);
    const v = 13*l * (v_ - vw);

    return [l, u, v];
}



function luv2xyz(luv, W = sRGB.W)
{
    const l = luv[0], 
          u = luv[1], 
          v = luv[2];

    const e = cube(6/29);
    const k = cube(29/3);

    const uw = 4*W[0] / (W[0] + 15*W[1] + 3*W[2]);
    const vw = 9*W[1] / (W[0] + 15*W[1] + 3*W[2]);
    
    const y = 
        l > e*k
        ? cube((l + 16)/116)
        : l / k;
    
    const a = (52*l / nozero(u + 13*l*uw) - 1) / 3;
    const b = -5 * y;
    const c = -1/3;
    const d =  y * (39*l / nozero(v + 13*l*vw) - 5);

    const x = (d - b) / nozero(a - c);

    const z = x*a + b;

    return [x, y, z];
}