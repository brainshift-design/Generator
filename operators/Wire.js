class Wire
{
    connection;

    outputPos = point_NaN;
    inputPos  = point_NaN;


    clientX;
    clientY;


    svg;
    
    curve;
    curve2;
    
    xp1;
    xp2;

    outBall;
    inBall;

    arrow;
   


    constructor(connection)
    {
        this.connection             = connection;
 
        this.svg                    = createSvg('svg');
        this.svg.style.position     = 'absolute';
        this.svg.style.left         = 0;
        this.svg.style.top          = 0;
        this.svg.style.overflow     = 'hidden';
     
        this.curve                  = createSvg('path');
        this.curve.style.position   = 'absolute';
        this.curve.style.fill       = 'none';
 
        this.curve2                 = createSvg('path');
        this.curve2.style.position  = 'absolute';
        this.curve2.style.fill      = 'none';
 
        this.xp1                    = createSvg('path');
        this.xp1.style.position     = 'absolute';
        this.xp1.style.fill         = 'none';
     
        this.xp2                    = createSvg('path');
        this.xp2.style.position     = 'absolute';
        this.xp2.style.fill         = 'none';


        this.outBall                = createSvg('circle');
        this.outBall.style.position = 'absolute';
    
        this.inBall                 = createSvg('circle');
        this.inBall.style.position  = 'absolute';
    
        this.arrow                  = createSvg('polygon');
        this.arrow.style.position   = 'absolute';


        this.svg.appendChild(this.curve  );
        this.svg.appendChild(this.curve2 );
        this.svg.appendChild(this.xp1    );
        this.svg.appendChild(this.xp2    );
        this.svg.appendChild(this.arrow  );
        this.svg.appendChild(this.outBall);
        this.svg.appendChild(this.inBall );
    }



    getColor()
    {
        const types = [];


        const output = this.connection.output;
        const input  = this.connection.input;
        
        const view   = this.connection.graph.view;


        if (output)
        {
            if (!isEmpty(output.types)) types.push(...output.types);
            else                        types.push(output.node.type);
        }
        else if (input)
        {
            if (   view.overOutput
                && input.canConnectFrom(view.overOutput)) 
                types.push(...view.overOutput.types);
            else
            {
                if (!isEmpty(input.types)) types.push(...input.types);
                else                       types.push(input.node.type);
            }
        }


        return  output
            && !rgbIsNaN(output.wireColor)
               ? output.wireColor
               :     input
                 && !rgbIsNaN(input.wireColor)
                    ?  input.wireColor
                    : !isEmpty(types)
                      ? rgb_a(rgbFromType(types[0], true), 1)
                      : rgbaInvalid;
    }



    update(x = 0, y = 0)
    {
        //logFunction('Wire.update()');
        
        this.clientX = x;
        this.clientY = y;
    
    
        const yOffset = menuBarHeight + 1;
    
        let pOut = point(0, 0),
            pIn  = point(0, 0);
    
    
        if (this.connection.output)
        {
            const ro = boundingRect(this.connection.output.div);
            pOut = point(ro.x + ro.w/2, ro.y + ro.h/2 - yOffset);
        }
        else
            pOut = point(x, y - yOffset);
    
    
        if (this.connection.input)
        {
            const ri = boundingRect(this.connection.input.div);
            pIn = point(ri.x + ri.w/2, ri.y + ri.h/2 - yOffset);
        }
        else
            pIn = point(x, y - yOffset);
    

        this.updateSvg(pOut.x, pOut.y, pIn.x, pIn.y);        
    }

    
    
    updateSvg(x1, y1, x2, y2)
    {
        this.updateCurve  (x1, y1, x2, y2);
        this.updateOutBall(x1, y1        );
        this.updateInBall (        x2, y2);
        this.updateStyle  ();

        const view = this.connection.graph.view;

        this.svg.setAttribute('width',  view.div.clientWidth);
        this.svg.setAttribute('height', view.div.clientHeight);

        this.svg.style.zIndex = 1;
    }



    updateCurve(x1, y1, x2, y2)
    {
        const view = this.connection.graph.view;


        if (!pointIsNaN(this.outputPos))
        {
            x1 = this.outputPos.x;
            y1 = this.outputPos.y;
        }
    
        if (!pointIsNaN(this.inputPos))
        {
            x2 = this.inputPos.x;
            y2 = this.inputPos.y;
        }
    
        
        const _x0 = x1;
        const _y0 = y1;
    
        const _x3 = x2;
        const _y3 = y2;
    
    
        const tx  = 600 * view.zoom;
        const ty  = 300 * view.zoom;
        const ecc = 100 * view.zoom;
    
        const yf  = (0.3 + Math.min(Math.abs(y2 - y1) / ty, 0.8));
    
        const df  = Math.pow((1 - Math.min(Math.abs(_x3 - _x0) / tx, 0.65)), 0.5)
                  * yf;
    
        const dx = 
              (_x3 - _x0) * df 
            * (_x3 < _x0 ? -1 : 1);
    
    
        let _x1 = Math.max(_x0 + ecc * Math.pow(0.1 + yf*0.9, 1.5), _x0 + dx);
        let _y1 = _y0;
    
        let _x2 = Math.min(_x3 - ecc * Math.pow(0.1 + yf*0.9, 1.5), _x3 - dx);
        let _y2 = _y3;
    
    
        if (   this.tempConn        == this.connection
            && this.tempConn.output == this.overOutput)
        {
            _x1 += (_x0 - _x1) * 5/8;
            _y1 += (_y0 - _y1) * 5/8;
        }
    
        if (   this.tempConn       == this.connection
            && this.tempConn.input == this.overInput)
        {
            _x2 += (_x3 - _x2) * 5/8;
            _y2 += (_y3 - _y2) * 5/8;
        }
    
        
        const points =
               'M ' + _x0 + ',' + _y0
            + ' C ' + _x1 + ',' + _y1
            + ' '   + _x2 + ',' + _y2
            + ' '   + _x3 + ',' + _y3;
    
        this.xp1   .setAttribute('d', points);
        this.xp2   .setAttribute('d', points);
        this.curve .setAttribute('d', points);
        this.curve2.setAttribute('d', points);
    
    
        if (this.connection.backInit)
            this.updateArrow(_x0, _y0, _x1, _y1, _x2, _y2, _x3, _y3);
        else    
            this.arrow.setAttribute('display', this.connection.backInit ? 'inline' : 'none');
    }
    
    
    
    updateOutBall(x, y)
    {
        this.outBall.setAttribute('cx', x);
        this.outBall.setAttribute('cy', y);
    }
    
    
    
    updateInBall(x, y)
    {
        this.inBall.setAttribute('cx', x);
        this.inBall.setAttribute('cy', y);
    }
    
    
    
    updateArrow(x0, y0, x1, y1, x2, y2, x3, y3)
    {
        const view = this.connection.graph.view;


        if (!pointIsNaN(this.outputPos))
        {
            x0 = this.outputPos.x;
            y0 = this.outputPos.y;
        }
    
        if (!pointIsNaN(this.inputPos))
        {
            x3 = this.inputPos.x;
            y3 = this.inputPos.y;
        }
    
    
        const p0 = point(x0, y0);
        const p1 = point(x1, y1);
        const p2 = point(x2, y2);
        const p3 = point(x3, y3); 
    
    
        const arrowDistance = 25;
        const arrowSize     = 9;
    
        let al = arcLength(p0, p1, p2, p3) - arrowDistance * view.zoom;
    
        if (al <= 0)
        {
            this.arrow.setAttribute('display', 'none');
            return;
        }
        
    
        let t = positionOnSegment(p0, p1, p2, p3, al);
        
        if (isNaN(t))
        {
            this.arrow.setAttribute('display', 'none');
            return;
        }
        
    
        const pt = lerpv3(p0, p1, p2, p3, t);
    
        const tx = pt.x;
        const ty = pt.y;
    
        const tw = arrowSize * view.zoom;
        const th = arrowSize * view.zoom;
    
        const points =
                     (tx - tw/2) + ',' + (ty + th/2)
            + ' '  + (tx + tw/2) + ',' + (ty + th/2)
            + ' '  + (tx       ) + ',' + (ty - th/2);
    
        this.arrow.setAttribute('points', points);
        this.arrow.setAttribute('display', 'inline');
    
    
        const ct = bezierTangent(x0, y0, x1, y1, x2, y2, x3, y3, t);
    
        this.arrow.style.transformBox    = 'fill-box';
        this.arrow.style.transformOrigin = 'center';
        this.arrow.style.transform       = 'rotate(' + (angle(ct) - Tau/4) + 'rad)';
    }
    
    
    
    updateStyle()
    {
        const conn  = this.connection;
        let   color = this.getColor();
    
        const view  = conn.graph.view;
    

        const l = rgb2hclok(color)[2];
        
        let bright = Math.min(Math.max(0, (l-0.6) / 0.4), 1);
        if (darkMode) bright = 1-bright;
    
        
        // const innerOpacity = Math.round(bright * (darkMode ? 88 : 66) * Math.min(view.zoom, 5)).toString(16).padStart(2, '0');
        //'+(Math.min(Math.max(1, 1/view.zoom), 5))+'
        
        // this.curve.style.filter = 
        //     this.needsFilter
        //     ? darkMode
        //         ? (isDark(color, 0.65)
        //             ?    'drop-shadow(0px 0px 1px #ffffff' + innerOpacity + ')'
        //             :   ' drop-shadow(0px 0px 1px #000000' + innerOpacity + ')')
        //         : (!isDark(color)
        //             ?    'drop-shadow(0px 0px 1px #000000' + innerOpacity + ')'
        //             :   ' drop-shadow(0px 0px 1px #ffffff' + innerOpacity + ')')
        //     : 'none';
    
         
        let showCurve = true;
    
        if (   conn.output && color[3] < 1
            || conn. input && color[3] < 1)
        {
            showCurve = 
                   conn.output && color[3] > 0
                || conn. input && color[3] > 0;
    
            this.xp1.style.display          = 'inline';
            this.xp1.style.stroke           = rgba2style(rgb_a(darkMode ? [0.067, 0.067, 0.067] : [0.784, 0.784, 0.784], 1 - color[3]));
            this.xp1.style.strokeDasharray  = 9 * view.zoom;
    
            this.xp2.style.display          = 'inline';
            this.xp2.style.stroke           = rgba2style(rgb_a(darkMode ? [0.302, 0.302, 0.302] : [1, 1, 1], 1 - color[3]));//darkMode ? '#4d4d4d' : '#fff';
            this.xp2.style.strokeDasharray  = 9 * view.zoom;
            this.xp2.style.strokeDashoffset = 9 * view.zoom;
        }
        else
        {
            this.xp1.style.display = 'none';
            this.xp2.style.display = 'none';
        }
    
    
        if (darkMode)
        {
            const hcl = rgb2hclok(color);
    
            let dl = 0.05;
    
            dl /= Math.min(1 - (1 - view.zoom) / 1.75, 1);
    
            if (hcl[2] > 0.27 - dl && hcl[2] <= 0.27)
                color = invalid2validRgb(hclok2rgb([hcl[0], hcl[1], 0.27 - dl]));
            if (hcl[2] > 0.27 && hcl[2] < 0.27 + dl)
                color = invalid2validRgb(hclok2rgb([hcl[0], hcl[1], 0.27 + dl]));
        }
        else
        {
            const hcl = rgb2hclok(color);
    
            if (hcl[2] > 0.97)
                color = invalid2validRgb(hclok2rgb([hcl[0], hcl[1], 0.97]));
        }
    
    
        const wireStyle = rgba2style(color);
    
        // const isNotCached = 
        //            conn.output
        //        &&  conn.output.node
        //        && !conn.output.node.isCached()
        //     ||     conn.output
        //        &&  conn.output.param
        //        &&  conn.output.param._nodeId != undefined
        //        &&  conn.output.node.graph.nodeFromId(conn.output.param._nodeId)
        //        && !nodeFromId(conn.output.param._nodeId).isCached();
    
    
        const unknown = false;
            //    conn.output
            // && isNotCached
            // && conn.input
            // && conn.input.node.isOrFollowedByMultiplier()
            // && (  !conn.input.param 
            //     || conn.input.param.affectsHeader);
    
    
        this.curve .style.stroke         = wireStyle;
        this.curve2.style.stroke         = rgb2style(rgbDocumentBody);
    
        this.curve.style.strokeDasharray = unknown ? 1.7 * view.zoom : 0;
    
        this. inBall.style.fill          = wireStyle;
        this.outBall.style.fill          = wireStyle;
        this.arrow  .style.fill          = wireStyle;
    
    
        if (conn.output) conn.output.wireBall.style.background = wireStyle;
        if (conn. input) conn. input.wireBall.style.background = wireStyle;
    
    
        const listType = 
               conn.output
            && conn.output.supportsTypes(LIST_TYPES);
    
    
        let width = 
            view.zoom < 1
            ? view.zoom + (Math.pow(2, view.zoom - 1) - view.zoom) * 0.333
            : view.zoom;
    
        width *= 1.6;
    
    
        //      if (view.zoom < 1/7) width += 1 * (1 - view.zoom) * (7 * view.zoom);
        // else if (view.zoom < 1  ) width += 1 * (1 - view.zoom);
    
    
        this.curve .setAttribute('stroke-width', width * (listType ? (unknown ? 3.6 : 3.2) : (unknown ? 1.3 : 1)));
        this.curve2.setAttribute('stroke-width', width * 1.4);
    
        this.curve2.setAttribute('display', listType ? 'inline' : 'none');
    
    
        this. inBall.style.r = 3 * view.zoom;
        this.outBall.style.r = 3 * view.zoom;
    }
    
    
    
    show(show, update = true)
    {
        // const isReordering =   
        //        isNaN(newReorderIndex)
        //     || isNaN(oldReorderIndex);
    
        showElement(this.svg, show);//(this != this.savedConn || isReordering));
        //showElement(this.curve,   show);//show && (this != this.savedConn || isReordering));
        //showElement(this.xp1,     show);//(this != this.savedConn || isReordering));
        //showElement(this.xp2,     show);//(this != this.savedConn || isReordering));
        //showElement(this.outBall, show);//(!this.tempConn || this.tempConn.output));
        //showElement(this. inBall, show);//(!this.tempConn || this.tempConn. input));
    
    
        if (update)
            this.update();
            // updateWire(wire);
    }
}