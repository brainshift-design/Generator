function xyzToHCT(xyz) 
{
    const [l, a, b] = xyzToLab(xyz);
    
    // Convert Lab to HCT
    // Assume that HCT is related to HSL/HSV adjustments based on Lab values
    const hue = Math.atan2(b, a) * (180 / Math.PI);
    const chroma = Math.sqrt(a * a + b * b);
    const tone = l;  // Tone is often the L value in Lab
    
    return { hue, chroma, tone };
}