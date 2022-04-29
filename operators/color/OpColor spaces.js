const OpColorSpaces = 
[
    ['hex',    'Hex'   ],
    //['rgbhex', '<span class=\'hash\'>#</span>RGB'],
    ['rgb',    'RGB'   ], 
    ['hsv',    'HSV'   ], 
    ['hsl',    'HSL'   ], 
    ['hclokl', 'HCL/ok'],
    ['hcllab', 'HCL/ab'],
    ['hclluv', 'HCL/uv']/*,
    ['oklab',  'okLab' ],
    ['lab',    'Lab'   ],
    ['luv',    'Luv'   ]*/
];

function colorSpace(index) { return OpColorSpaces[index][0]; }

function colorSpaceIndex(space) { return OpColorSpaces.findIndex(s => s[0] == space); }



const rgbFactor   = [255, 255, 255];
const hs_Factor   = [360, 100, 100];
const hclFactor   = [360, 100, 100];
const oppFactor   = [100, 100, 100];

const rgbScale    = [255, 255, 255];
const hs_Scale    = [360, 100, 100];
const hcloklScale = [360,  51, 100];
const hcllabScale = [360, 400, 100];
const hclluvScale = [360, 330, 100];
const oklabScale  = [100,  30,  30];
const labScale    = [100, 100, 100];
const luvScale    = [100, 150, 150];



function switchToSpace(node, space)
{
    switch (space)
    {
        case 'hex':    switchToHex   (node); break;
        case 'rgbhex': switchToRgbHex(node); break;
        case 'rgb':    switchToRgb   (node); break;
        case 'hsv':    switchToHsv   (node); break;
        case 'hsl':    switchToHsl   (node); break;
        case 'hclokl': switchToHclOkl(node); break;
        case 'hcllab': switchToHclLab(node); break;
        case 'hclluv': switchToHclLuv(node); break;
        case 'oklab':  switchToOklab (node); break;
        case 'lab':    switchToLab   (node); break;
        case 'luv':    switchToLuv   (node); break;
    }

    node.resetAllControlRanges();
}



function switchToHex   (node) { switchToTextbox       (node);           }
function switchToRgbHex(node) { switchToRgbHexControls(node);           }
function switchToRgb   (node) { switchToRgbControls   (node);           }
function switchToHsv   (node) { switchToHs_Controls   (node, 'V');      }
function switchToHsl   (node) { switchToHs_Controls   (node, 'L');      }
function switchToHclOkl(node) { switchToHclOklControls(node);           }
function switchToHclLab(node) { switchToHclLabControls(node);           }
function switchToHclLuv(node) { switchToHclLuvControls(node);           }
function switchToOklab (node) { switchToOklabControls (node, 'a', 'b'); }
function switchToLab   (node) { switchToLabControls   (node, 'a', 'b'); }
function switchToLuv   (node) { switchToLuvControls   (node, 'u', 'v'); }
   


function switchToRgbHexControls(node)
{
    switchToControls(node, 
        '<span class=\'hash\'>#</span>R', 0, rgbScale[0], '', false, 
        '<span class=\'hash\'>#</span>G', 0, rgbScale[1], 
        '<span class=\'hash\'>#</span>B', 0, rgbScale[2]);  

    showRgbControlHex(node, true);
}



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



function switchToHclOklControls(node) { switchToHclControls(node, hcloklScale); }
function switchToHclLabControls(node) { switchToHclControls(node, hcllabScale); }
function switchToHclLuvControls(node) { switchToHclControls(node, hclluvScale); }



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



function showRgbControlHex(node, show)
{
    node.param1.control.showHex = show;
    node.param2.control.showHex = show;
    node.param3.control.showHex = show;
}



function switchToControls(node, c1, c1min, c1max, c1suffix, c1wrap, c2, c2min, c2max, c3, c3min, c3max)
{
    switchToSliders(node);

    node.param1.setName(c1, false); 
    node.param2.setName(c2, false); 
    node.param3.setName(c3, false);

    node.param1.control.wrapValue = c1wrap;
    node.param1.control.setSuffix(c1suffix, c1suffix != '');

    node.param1.control.setMin(c1min, false); 
    node.param2.control.setMin(c2min, false);
    node.param3.control.setMin(c3min, false);
    
    node.param1.control.setMax(c1max, false); 
    node.param2.control.setMax(c2max, false); 
    node.param3.control.setMax(c3max, false); 
    
    node.param1.updateControls();
    node.param2.updateControls();
    node.param3.updateControls();
}



function switchToTextbox(node)
{
    if (!node.inner.contains(node.hexbox))
    {
        removeOpColorParamWires(node);

        node.inner.removeChild(node.param1.div);
        node.inner.removeChild(node.param2.div);
        node.inner.removeChild(node.param3.div);
        
        node.inner.appendChild(node.hexbox);

        //graphView.updateNodeTransform(op);
    }
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
    if (node.inner.contains(node.hexbox))
    {
        node.inner.removeChild(node.hexbox);

        node.inner.appendChild(node.param1.div);
        node.inner.appendChild(node.param2.div);
        node.inner.appendChild(node.param3.div);

        node.updateNode();//graphView.updateNodeTransform(node);
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
        case 'hex':
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



function getNormalColorOpp(c1, c2, c3)
{
    return [
        c1 / oppFactor[0], 
        c2 / oppFactor[1], 
        c3 / oppFactor[2]];
}



function getNormalColorHcl(c1, c2, c3)
{
    return [
        c1 / hclFactor[0], 
        c2 / hclFactor[1], 
        c3 / hclFactor[2]];
}



function getDataColor(color)
{
    switch (color[0])
    {
        case 'hex':
        case 'rgbhex':
        case 'rgb':    return getDataColorRgb(color[1], color[2], color[3]);
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



function getDataColorRgb(c1, c2, c3)
{
    return [
        c1 * rgbFactor[0], 
        c2 * rgbFactor[1], 
        c3 * rgbFactor[2] ];
}



function getDataColorHs_(c1, c2, c3)
{
    return [
        c1 * hs_Factor[0], 
        c2 * hs_Factor[1], 
        c3 * hs_Factor[2] ];
}



function getDataColorOpp(c1, c2, c3)
{
    return [
        c1 * oppFactor[0], 
        c2 * oppFactor[1], 
        c3 * oppFactor[2] ];
}



function getDataColorHcl(c1, c2, c3)
{
    return [
        c1 * hclFactor[0], 
        c2 * hclFactor[1], 
        c3 * hclFactor[2] ];
}



function setDataColorToCurrentSpace(node, color)
{
    const toSpace = colorSpace(node.paramSpace.value);
    node._color = convertDataColorToSpace(color, toSpace);
    node.setColorParams(node._color);
}



function getColorSpaceFactor(space)
{
    switch (space)
    {
        case 'hex':
        case 'rgbhex':
        case 'rgb':    return rgbFactor;
        case 'hsv':   
        case 'hsl':    return hs_Factor;
        case 'hclokl': 
        case 'hcllab': 
        case 'hclluv': return hclFactor;
        case 'oklab': 
        case 'lab': 
        case 'luv':    return oppFactor;
    }    
}



function getColorSpaceScale(space)
{
    switch (space)
    {
        case 'hex':
        case 'rgbhex':
        case 'rgb':    return rgbScale;
        case 'hsv':   
        case 'hsl':    return hs_Scale;
        case 'hclokl': return hcloklScale;
        case 'hcllab': return hcllabScale;
        case 'hclluv': return hclluvScale;
        case 'oklab':  return oklabScale;
        case 'lab':    return labScale;
        case 'luv':    return luvScale;
    }    
}