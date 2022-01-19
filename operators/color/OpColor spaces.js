function getColorSpaceFactor(space, chan)
{
    switch (space)
    {
        case 'rgbhex':
        case 'rgb':   
            switch (chan)
            {
                case 0: return rgbFactorR;
                case 1: return rgbFactorG;
                case 2: return rgbFactorB;
            }
            break;

        case 'hsv':   
        case 'hsl':   
            switch (chan)
            {
                case 0: return hs_FactorH;
                case 1: return hs_FactorS;
                case 2: return hs_Factor_;
            }
            break;

        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv':
            switch (chan)
            {
                case 0: return hclFactorH;
                case 1: return hclFactorC;
                case 2: return hclFactorL;
            }
            break;

        case 'oklab':  
        case 'lab':    
        case 'luv':
            switch (chan)
            {
                case 0: return oppFactorL;
                case 1: return oppFactor1;
                case 2: return oppFactor2;
            }
            break;
    }
}



function rgb2dataColor(rgb)
{
    return [
       'rgb',
        rgb[0],
        rgb[1],
        rgb[2] ];
}



function getNormalValue(value, space, chan)
{
    switch (space)
    {
        case 'rgbhex':
        case 'rgb':    return getNormalValueRgb_(value, chan);
        case 'hsv':   
        case 'hsl':    return getNormalValueHs_ (value, chan);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getNormalValueHcl (value, chan);
        case 'oklab':  
        case 'lab':    
        case 'luv':    return getNormalValuesOpp(value, chan);
    }
}



function getNormalValueRgb_(value, chan)
{
    switch (chan)
    {
        case 0: return value / rgbFactorR;
        case 1: return value / rgbFactorG; 
        case 2: return value / rgbFactorB;
    }
}



function getNormalValueHs_(value, chan)
{
    switch (chan)
    {
        case 0: return value / hs_FactorH;
        case 1: return value / hs_FactorS; 
        case 2: return value / hs_Factor_;
    }
}



function getNormalValueOpp(value, chan)
{
    switch (chan)
    {
        case 0: return value / oppFactorL;
        case 1: return value / oppFactor1; 
        case 2: return value / oppFactor2;
    }
}



function getNormalValueHcl(value, chan)
{
    switch (chan)
    {
        case 0: return value / hclFactorH;
        case 1: return value / hclFactorC; 
        case 2: return value / hclFactorL;
    }
}



function getNormalColor(color)
{
    return getNormalColor_(
        color[0], 
        color[1], 
        color[2], 
        color[3])
}



function getNormalColor_(space, c1, c2, c3)
{
    switch (space)
    {
        case 'rgbhex':
        case 'rgb':    return getNormalColorRgb_(c1, c2, c3);
        case 'hsv':   
        case 'hsl':    return getNormalColorHs_(c1, c2, c3);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getNormalColorHcl(c1, c2, c3);
        case 'oklab': 
        case 'lab': 
        case 'luv':    return getNormalColorOpp(c1, c2, c3);
    }
}



function getNormalColorRgb_(c1, c2, c3)
{
    return [
        c1 / rgbFactorR, 
        c2 / rgbFactorG, 
        c3 / rgbFactorB];
}



function getNormalColorHs_(c1, c2, c3)
{
    return [
        c1 / hs_FactorH, 
        c2 / hs_FactorS, 
        c3 / hs_Factor_];
}



function getNormalColorOpp(c1, c2, c3)
{
    return [
        c1 / oppFactorL, 
        c2 / oppFactor1, 
        c3 / oppFactor2];
}



function getNormalColorHcl(c1, c2, c3)
{
    return [
        c1 / hclFactorH, 
        c2 / hclFactorC, 
        c3 / hclFactorL];
}



function getDataColor(color)
{
    switch (color[0])
    {
        case 'rgbhex':    
        case 'rgb':    return getDataColorRgb_(color[1], color[2], color[3]);
        case 'hsv':   
        case 'hsl':    return getDataColorHs_(color[1], color[2], color[3]);
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return getDataColorHcl(color[1], color[2], color[3]);
        case 'oklab': 
        case 'lab': 
        case 'luv':    return getDataColorOpp(color[1], color[2], color[3]);
    }
}



function getDataColorRgb_(c1, c2, c3)
{
    return [
        c1 * rgbFactorR, 
        c2 * rgbFactorG, 
        c3 * rgbFactorB ];
}



function getDataColorHs_(c1, c2, c3)
{
    return [
        c1 * hs_FactorH, 
        c2 * hs_FactorS, 
        c3 * hs_Factor_ ];
}



function getDataColorOpp(c1, c2, c3)
{
    return [
        c1 * oppFactorL, 
        c2 * oppFactor1, 
        c3 * oppFactor2 ];
}



function getDataColorHcl(c1, c2, c3)
{
    return [
        c1 * hclFactorH, 
        c2 * hclFactorC, 
        c3 * hclFactorL ];
}


function switchToSpace(op, space)
{
    switch (space)
    {
        case 'hex':    switchToHex   (op); break;
        case 'rgbhex': switchToRgbHex(op); break;
        case 'rgb':    switchToRgb   (op); break;
        case 'hsv':    switchToHsv   (op); break;
        case 'hsl':    switchToHsl   (op); break;
        case 'hclokl': switchToHclOkl(op); break;
        case 'hcllab': switchToHclLab(op); break;
        case 'hclluv': switchToHclLuv(op); break;
        case 'oklab':  switchToOklab (op); break;
        case 'lab':    switchToLab   (op); break;
        case 'luv':    switchToLuv   (op); break;
    }

    op.resetAllControlRanges();
}



function switchToTextbox(op)
{
    if (!op.inner.contains(op.hexbox))
    {
        op.inner.removeChild(op._c1.div);
        op.inner.removeChild(op._c2.div);
        op.inner.removeChild(op._c3.div);
        
        op.inner.appendChild(op.hexbox);
    }
}



function switchToSliders(op)
{
    if (op.inner.contains(op.hexbox))
    {
        op.inner.removeChild(op.hexbox);

        op.inner.appendChild(op._c1.div);
        op.inner.appendChild(op._c2.div);
        op.inner.appendChild(op._c3.div);
    }
}



function switchToHex   (op) { switchToTextbox(op); }
function switchToRgbHex(op) { switchToRgbControls(op);  showControlHex(op, true ); }
function switchToRgb   (op) { switchToRgbControls(op);  showControlHex(op, false); }
function switchToHsv   (op) { switchToHs_Controls(op, 'V'); }
function switchToHsl   (op) { switchToHs_Controls(op, 'L'); }
function switchToHclOkl(op) { switchToHclControls(op); }
function switchToHclLab(op) { switchToHclControls(op); }
function switchToHclLuv(op) { switchToHclControls(op); }
function switchToOklab (op) { switchToOppControls(op, 'a', 'b'); }
function switchToLab   (op) { switchToOppControls(op, 'a', 'b'); }
function switchToLuv   (op) { switchToOppControls(op, 'u', 'v'); }
   


function switchToRgbControls(op)
{
    switchToControls(op, 
        'R', 0, rgbFactorR, '', false, 
        'G', 0, rgbFactorG, 
        'B', 0, rgbFactorB);  
}



function switchToHs_Controls(op, v_or_l) 
{ 
    switchToControls(op, 
        'H',    0, hs_FactorH, '°', true,  
        'S',    0, hs_FactorS, 
        v_or_l, 0, hs_Factor_);  

    showControlHex(op, false); 
}



function switchToOppControls(op, c2, c3) 
{ 
    switchToControls(op, 
        'L', 0,              oppFactorL, '', false,  
        c2, -oppFactor1, oppFactor1, 
        c3, -oppFactor2, oppFactor2);  

    showControlHex(op, false); 
}



function switchToHclControls(op) 
{ 
    switchToControls(op, 
        'H', 0, 360, '°', true,  
        'C', 0, 100, 
        'L', 0, 100);  

    showControlHex(op, false); 
}



function showControlHex(op, show)
{
    op._c1.control.showHex = show;
    op._c2.control.showHex = show;
    op._c3.control.showHex = show;
}



function switchToControls(op, c1, c1min, c1max, c1suffix, c1wrap, c2, c2min, c2max, c3, c3min, c3max)
{
    switchToSliders(op);

    op._c1.setName(c1, false); 
    op._c2.setName(c2, false); 
    op._c3.setName(c3, false);

    op._c1.control.wrapValue = c1wrap;
    op._c1.control.suffix    = c1suffix;

    op._c1.control.min = c1min; op._c1.control.max = c1max; op._c1.control.update();
    op._c2.control.min = c2min; op._c2.control.max = c2max; op._c2.control.update();
    op._c3.control.min = c3min; op._c3.control.max = c3max; op._c3.control.update();
}



function setDataColorToCurrentSpace(op, color)
{
    const toSpace = OpColorSpaces[op._space.value][0];

    op._color = convertDataColorToSpace(color, toSpace);

    switchToSpace(op, toSpace);
    op.setColorParams(op._color, false);
}



function getCurrentDataColorSpace(op)
{
    var index = op._space.value;
    if (index < 2) index = 2;

    return OpColorSpaces[index][0];
}