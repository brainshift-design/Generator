const rgbFactor  = [255, 255, 255];
const hs_Factor  = [360, 100, 100];
const hclFactor  = [360, 100, 100];
const oppFactor  = [100, 100, 100];
const xyzFactor  = [100, 100, 100];
  
 
const rgbScale   = [255, 255, 255];
  
const hs_Scale   = [360, 100, 100];
 
const hclokScale = [360,  50, 100];
const hclabScale = [360, 400, 100];
const hcluvScale = [360, 330, 100];
 
const oklabScale = [100,  30,  30];
const labScale   = [100, 100, 100];
const luvScale   = [100, 150, 150];

//const xyzScale   = [ 95, 100, 108];
const xyzScale   = [100, 100, 100];
 


function colorFactor(space)
{
    switch (space)
    {
        case 'hex':
        case 'rgb':
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020':  return rgbFactor;

        case 'hsv':
        case 'hsl':    return hs_Factor;

        case 'hclok':
        case 'hclab':
        case 'hcluv':  return hclFactor;

        case 'oklab':
        case 'lab':
        case 'luv':    return oppFactor;

        case 'xyz':
        case 'xyz50':
        case 'xyz65':  return xyzFactor;
        
        default:       consoleError('invalid color factor from space \''+space+'\''); break;
    }
}



function colorScale(space)
{
    switch (space)
    {
        case 'hex':
        case 'rgb':
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020': return rgbScale;

        case 'hsv':
        case 'hsl':   return hs_Scale;

        case 'hclok': return hclokScale;
        case 'hclab': return hclabScale;
        case 'hcluv': return hcluvScale;

        case 'oklab': return oklabScale;
        case 'lab':   return labScale;
        case 'luv':   return luvScale;

        case 'xyz':
        case 'xyz50':
        case 'xyz65': return xyzScale;
    }

    console.error('invalid color space \'' + space + '\'');
    return [1, 1, 1];
}



function scaleColor(col, space)
{
    let scale = colorScale(space);

    return [
        col[0] * scale[0],
        col[1] * scale[1],
        col[2] * scale[2] ];
}



function normalizeRgb(rgb)
{
    return [ rgb[0] / 255,
             rgb[1] / 255,
             rgb[2] / 255 ];
}



function scaleRgb(rgb, dec = 0)
{
    return [ roundTo(rgb[0] * 255, dec),
             roundTo(rgb[1] * 255, dec),
             roundTo(rgb[2] * 255, dec) ];
}



function switchToSpace(node, space)
{
    switch (space)
    {
        case 'hex':   switchToHex   (node); break;

        case 'rgb':
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020': switchToRgb   (node); break;

        case 'hsv':   switchToHsv   (node); break;
        case 'hsl':   switchToHsl   (node); break;

        case 'hclok': switchToHclok (node); break;
        case 'hclab': switchToHclab (node); break;
        case 'hcluv': switchToHcluv (node); break;

        case 'oklab': switchToOklab (node); break;
        case 'lab':   switchToLab   (node); break;
        case 'luv':   switchToLuv   (node); break;

        case 'xyz':    
        case 'xyz50': 
        case 'xyz65': switchToXyz   (node); break;
    }
}



function switchToHex  (node) { switchToRgbControls   (node); switchToTextbox(node); }
function switchToRgb  (node) { switchToRgbControls   (node);                        }

function switchToHsv  (node) { switchToHs_Controls   (node, 'B');                   }
function switchToHsl  (node) { switchToHs_Controls   (node, 'L');                   }
             
function switchToHclok(node) { switchToHclOklControls(node);                        }
function switchToHclab(node) { switchToHclLabControls(node);                        }
function switchToHcluv(node) { switchToHclLuvControls(node);                        }
             
function switchToOklab(node) { switchToOklabControls (node, 'a', 'b');              }
function switchToLab  (node) { switchToLabControls   (node, 'a', 'b');              }
function switchToLuv  (node) { switchToLuvControls   (node, 'u', 'v');              }

function switchToXyz  (node) { switchToXyzControls   (node);                        }
   


function switchToRgbControls(node)
{
    switchToControls(node, 
        'R', 0, rgbScale[0], '', false, 
        'G', 0, rgbScale[1], 
        'B', 0, rgbScale[2]);  

    showRgbControlHex(node, false);    
}



function switchToHs_Controls(node, v_or_l) 
{ 
    switchToControls(node, 
        'H',    0, hs_Scale[0], '°', true,  
        'S',    0, hs_Scale[1], 
        v_or_l, 0, hs_Scale[2]);  

    showRgbControlHex(node, false); 
}



function switchToHclControls(node, scale) 
{ 
    switchToControls(node, 
        'H', 0, scale[0], '°', true,  
        'C', 0, scale[1], 
        'L', 0, scale[2]);  

    showRgbControlHex(node, false); 
}



function switchToHclOklControls(node) { switchToHclControls(node, hclokScale); }
function switchToHclLabControls(node) { switchToHclControls(node, hclabScale); }
function switchToHclLuvControls(node) { switchToHclControls(node, hcluvScale); }



function switchToOppControls(node, c2, c3, scale)
{ 
    switchToControls(node, 
        'L', 0,        scale[0], '', false,  
        c2, -scale[1], scale[1], 
        c3, -scale[2], scale[2]);  

    showRgbControlHex(node, false); 
}



function switchToOklabControls(node) { switchToOppControls(node, 'a', 'b', oklabScale); }
function switchToLabControls  (node) { switchToOppControls(node, 'a', 'b', labScale  ); }
function switchToLuvControls  (node) { switchToOppControls(node, 'u', 'v', luvScale  ); }



function switchToXyzControls(node) 
{ 
    switchToControls(node, 
        'X', 0, xyzScale[0], '', false,
        'Y', 0, xyzScale[1], 
        'Z', 0, xyzScale[2]);  

    // node.param1.controls[0].min = 
    // node.param2.controls[0].min = 
    // node.param3.controls[0].min = Number.MIN_SAFE_INTEGER; // allow extrapolation

    // node.param1.controls[0].max = 
    // node.param2.controls[0].max = 
    // node.param3.controls[0].max = Number.MAX_SAFE_INTEGER; // allow extrapolation
}



function showRgbControlHex(node, show)
{
    node.param1.controls[0].showHex = show;
    node.param2.controls[0].showHex = show;
    node.param3.controls[0].showHex = show;
}



function switchToControls(node, c1, c1min, c1max, c1suffix, c1wrap, c2, c2min, c2max, c3, c3min, c3max)
{
    switchToSliders(node);

    node.param1.setName(c1, false); 
    node.param2.setName(c2, false); 
    node.param3.setName(c3, false);

    // // node.param1.controls[0].wrapValue = c1wrap;
    // // node.param1.controls[0].setSuffix(c1suffix, c1suffix != '');

    // // node.param1.controls[0].setMin(c1min); 
    // // node.param2.controls[0].setMin(c2min);
    // // node.param3.controls[0].setMin(c3min);
    
    // // node.param1.controls[0].setMax(c1max); 
    // // node.param2.controls[0].setMax(c2max); 
    // // node.param3.controls[0].setMax(c3max); 
    
    // node.param1.updateControls();
    // node.param2.updateControls();
    // node.param3.updateControls();

    // node.param1.controls[0].suffixOffsetY = 0;
}



function switchToTextbox(node)
{
    removeOpColorParamWires(node);

    removeDivFrom(node.param1.div, node.paramHolder);
    removeDivFrom(node.param2.div, node.paramHolder);
    removeDivFrom(node.param3.div, node.paramHolder);
        
    appendDivTo(node.paramColor.div, node.paramHolder);
}



function removeParamDivs(node)
{
    removeOpColorParamWires(node);

    removeDivFrom(node.param1.div,     node.paramHolder);
    removeDivFrom(node.param2.div,     node.paramHolder);
    removeDivFrom(node.param3.div,     node.paramHolder);
    
    removeDivFrom(node.paramColor.div, node.paramHolder);
}



function removeOpColorParamWires(node)
{
    for (let i = node.inputs.length-1; i >= 2; i--)
        if (node.inputs[i].connected)
            uiDisconnect(node.inputs[i]);

    for (let i = node.outputs.length-1; i >= 2; i--)
        for (const input of node.outputs[i].connectedInputs)
            uiDisconnect(input);
}



function switchToSliders(node)
{
    removeDivFrom(node.paramColor.div, node.paramHolder);

    appendDivTo(node.param1.div, node.paramHolder);
    appendDivTo(node.param2.div, node.paramHolder);
    appendDivTo(node.param3.div, node.paramHolder);
}



function rgb2dataColor(rgb, space = 'rgb')
{
    return [
        space,
        rgb[0],
        rgb[1],
        rgb[2] ];
}



function getNormalColorValue(value, space, chan)
{
    switch (space)
    {
        case 'hex':
        case 'rgb':
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020': return getNormalValueRgb_(value, chan);

        case 'hsv':
        case 'hsl':   return getNormalValueHs_ (value, chan);

        case 'hclok':
        case 'hclab':
        case 'hcluv': return getNormalValueHcl (value, chan);

        case 'oklab':
        case 'lab':
        case 'luv':   return getNormalValueOpp (value, chan);

        case 'xyz':
        case 'xyz50':
        case 'xyz65': return getNormalValueXyz (value, chan);
    }
}



function getNormalValueRgb_(value, chan)
{
    switch (chan)
    {
        case 0: return value / rgbFactor[0];
        case 1: return value / rgbFactor[1]; 
        case 2: return value / rgbFactor[2];
    }
}



function getNormalValueHs_(value, chan)
{
    switch (chan)
    {
        case 0: return value / hs_Factor[0];
        case 1: return value / hs_Factor[1]; 
        case 2: return value / hs_Factor[2];
    }
}



function getNormalValueOpp(value, chan)
{
    switch (chan)
    {
        case 0: return value / oppFactor[0];
        case 1: return value / oppFactor[1]; 
        case 2: return value / oppFactor[2];
    }
}



function getNormalValueHcl(value, chan)
{
    switch (chan)
    {
        case 0: return value / hclFactor[0];
        case 1: return value / hclFactor[1]; 
        case 2: return value / hclFactor[2];
    }
}



function getNormalValueXyz(value, chan)
{
    switch (chan)
    {
        case 0: return value / xyzFactor[0];
        case 1: return value / xyzFactor[1]; 
        case 2: return value / xyzFactor[2];
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
        case 'hex':
        case 'rgb':
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020': return getNormalColorRgb_(c1, c2, c3);

        case 'hsv':
        case 'hsl':   return getNormalColorHs_(c1, c2, c3);

        case 'hclok':
        case 'hclab':
        case 'hcluv': return getNormalColorHcl(c1, c2, c3);

        case 'oklab':
        case 'lab':
        case 'luv':   return getNormalColorOpp(c1, c2, c3);

        case 'xyz':
        case 'xyz50':
        case 'xyz65': return getNormalColorXyz(c1, c2, c3);
    }
}



function getNormalColorRgb_(c1, c2, c3)
{
    return [
        c1 / rgbFactor[0], 
        c2 / rgbFactor[1], 
        c3 / rgbFactor[2]];
}



function getNormalColorHs_(c1, c2, c3)
{
    return [
        c1 / hs_Factor[0], 
        c2 / hs_Factor[1], 
        c3 / hs_Factor[2]];
}



function getNormalColorHcl(c1, c2, c3)
{
    return [
        c1 / hclFactor[0], 
        c2 / hclFactor[1], 
        c3 / hclFactor[2]];
}



function getNormalColorOpp(c1, c2, c3)
{
    return [
        c1 / oppFactor[0], 
        c2 / oppFactor[1], 
        c3 / oppFactor[2]];
}



function getNormalColorXyz(c1, c2, c3)
{
    return [
        c1 / xyzFactor[0], 
        c2 / xyzFactor[1], 
        c3 / xyzFactor[2]];
}



function getScaledDataColor(color)
{
    switch (color[0])
    {
        case 'hex':
        case 'rgb':   return getScaledDataColorRgb('rgb',    color[1], color[2], color[3]);
        case 'lin':   return getScaledDataColorRgb('lin',    color[1], color[2], color[3]);
        case 'p3':    return getScaledDataColorRgb('p3',     color[1], color[2], color[3]);
        case 'a98':   return getScaledDataColorRgb('a98',    color[1], color[2], color[3]);
        case 'pro':   return getScaledDataColorRgb('pro',    color[1], color[2], color[3]);
        case 'r2020':  return getScaledDataColorRgb('r2020', color[1], color[2], color[3]);

        case 'hsv':   return getScaledDataColorHs_('hsv',    color[1], color[2], color[3]);
        case 'hsl':   return getScaledDataColorHs_('hsl',    color[1], color[2], color[3]);

        case 'hclok': return getScaledDataColorHcl('hclok',  color[1], color[2], color[3]);
        case 'hclab': return getScaledDataColorHcl('hclab',  color[1], color[2], color[3]);
        case 'hcluv': return getScaledDataColorHcl('hcluv',  color[1], color[2], color[3]);

        case 'oklab': return getScaledDataColorOpp('oklab',  color[1], color[2], color[3]);
        case 'lab':   return getScaledDataColorOpp('lab',    color[1], color[2], color[3]);
        case 'luv':   return getScaledDataColorOpp('luv',    color[1], color[2], color[3]);

        case 'xyz':   return getScaledDataColorXyz('xyz',    color[1], color[2], color[3]);
        case 'xyz50': return getScaledDataColorXyz('xyz50',  color[1], color[2], color[3]);
        case 'xyz65': return getScaledDataColorXyz('xyzd60', color[1], color[2], color[3]);
    }
}



function getScaledDataColorRgb(space, c1, c2, c3)
{
    return [
        space,
        c1 * rgbFactor[0], 
        c2 * rgbFactor[1], 
        c3 * rgbFactor[2] ];
}



function getScaledDataColorHs_(space, c1, c2, c3)
{
    return [
        space,
        c1 * hs_Factor[0], 
        c2 * hs_Factor[1], 
        c3 * hs_Factor[2] ];
}



function getScaledDataColorHcl(space, c1, c2, c3)
{
    return [
        space,
        c1 * hclFactor[0], 
        c2 * hclFactor[1], 
        c3 * hclFactor[2] ];
}



function getScaledDataColorOpp(space, c1, c2, c3)
{
    return [
        space,
        c1 * oppFactor[0], 
        c2 * oppFactor[1], 
        c3 * oppFactor[2] ];
}



function getScaledDataColorXyz(space, c1, c2, c3)
{
    return [
        space,
        c1 * xyzFactor[0], 
        c2 * xyzFactor[1], 
        c3 * xyzFactor[2] ];
}



function setDataColorToCurrentSpace(node, color)
{
    const toSpace = colorSpace(node.paramSpace.value);
    node._color   = convertDataColorToSpace(color, toSpace);

    node.setColorParams(node._color);
}



function colorSpaceFactor(space)
{
    switch (space)
    {
        case 'hex':
        case 'rgb':   
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020': return rgbFactor;

        case 'hsv':   
        case 'hsl':   return hs_Factor;

        case 'hclok': 
        case 'hclab': 
        case 'hcluv': return hclFactor;

        case 'oklab': 
        case 'lab': 
        case 'luv':   return oppFactor;

        case 'xyz': 
        case 'xyz50': 
        case 'xyz65': return xyzFactor;
    }    
}



function getColorSpaceScale(space)
{
    switch (space)
    {
        case 'hex':
        case 'rgb':   
        case 'lin':
        case 'p3':
        case 'a98':
        case 'pro':
        case 'r2020': return rgbScale;

        case 'hsv':   
        case 'hsl':   return hs_Scale;

        case 'hclok': return hclokScale;
        case 'hclab': return hclabScale;
        case 'hcluv': return hcluvScale;

        case 'oklab': return oklabScale;
        case 'lab':   return labScale;
        case 'luv':   return luvScale;

        case 'xyz':
        case 'xyz50':
        case 'xyz65': return xyzScale;
    }    
}