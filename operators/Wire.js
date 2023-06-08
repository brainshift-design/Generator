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

    arrow1;
    arrow2;
   


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
    
        this.arrow1                 = createSvg('polygon');
        this.arrow1.style.position  = 'absolute';

        this.arrow2                 = createSvg('polygon');
        this.arrow2.style.position  = 'absolute';


        this.svg.appendChild(this.curve  );
        this.svg.appendChild(this.curve2 );
        this.svg.appendChild(this.xp1    );
        this.svg.appendChild(this.xp2    );
        this.svg.appendChild(this.arrow1 );
        this.svg.appendChild(this.arrow2 );
        this.svg.appendChild(this.outBall);
        this.svg.appendChild(this.inBall );
    }



    getColor()
    {
        const types  = [];

        const output = this.connection.output;
        const input  = this.connection.input;
        

        if (output)
        {
            if (!isEmpty(output.types)) types.push(...output.types);
            else if (output)            types.push(output.node.type);
        }
        else if (input)
        {
            if (   graphView.overOutput
                && input.canConnectFrom(graphView.overOutput)) 
                types.push(...graphView.overOutput.types);
            else
            {
                if (!isEmpty(input.types)) types.push(...input.types);
                else if (input)            types.push(input.node.type);
            }
        }


        if (   output)
//            && arraysIntersect(output.types, [COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, STROKE_VALUE]))
            return output.wireColor;

        else if (input)
  //            && arraysIntersect(input.types, [COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE, STROKE_VALUE]))
            return input.wireColor;

        else if (!isEmpty(types))
            return rgb_a(rgbFromType(types[0], true));

        else 
            return rgbaInvalid;
    }



    update(x = 0, y = 0)
    {
        //logFunction('Wire.update()');
        
        this.clientX = x;
        this.clientY = y;
    
    
        const yOffset = getTopHeight() + 1;
    
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

        this.svg.setAttribute('width',  graphView.div.clientWidth);
        this.svg.setAttribute('height', graphView.div.clientHeight);

        this.svg.style.zIndex = 1;
    }



    updateCurve(x1, y1, x2, y2)
    {
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
    
    
        const tx  = 600 * graph.currentPage.zoom;
        const ty  = 300 * graph.currentPage.zoom;
        const ecc = 100 * graph.currentPage.zoom;
    
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
    
    
        this.updateArrows(
            _x0, _y0, 
            _x1, _y1, 
            _x2, _y2, 
            _x3, _y3);

        
        const fb = 
               this.connection.input
            && this.connection.input.feedback;

        const back = _x0 - _x3 > defNodeWidth * 1.5;

        const display1 = 
               fb 
            || this.connection.backInit
            ||    this.connection.input
               && this.connection.input.id == 'repeatId';

        const display2 = fb || back;

        this.arrow1.setAttribute('display', display1 ? 'inline' : 'none');
        this.arrow2.setAttribute('display', display2 ? 'inline' : 'none');
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
    
    
    
    updateArrows(x0, y0, x1, y1, x2, y2, x3, y3)
    {
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
    
    
        let fb;
        
        if (   this.connection.input
            && this.connection.input.feedback)
            fb = -25;
        else if (this.connection.input
              && this.connection.input.id == 'repeatId')
            fb = -45;
        else
            fb =  25;

        const back = x0 - x3 > defNodeWidth * 1.5;


        this.updateArrow(p0, p1, p2, p3, this.arrow1,  fb, 9, 0, fb, back);
        this.updateArrow(p0, p1, p2, p3, this.arrow2, -35, 9, 1, fb, back);
    }
    
    

    updateArrow(p0, p1, p2, p3, arrow, dist, size, index, fb, back)
    {
        let al = 
            dist >= 0
            ? arcLength(p0, p1, p2, p3) - dist * graph.currentPage.zoom
            : -dist * graph.currentPage.zoom;
    
        if (al <= 0)
        {
            arrow.setAttribute('display', 'none');
            return;
        }
        
    
        let t = positionOnSegment(p0, p1, p2, p3, al);
        
        if (isNaN(t))
        {
            arrow.setAttribute('display', 'none');
            return;
        }
        

        if (  !back
            || fb)
        {
            if (dist >= 0) t = Math.max(this.connection.backInit ? 0 : 0.5, t);
            else           t = Math.min(t, 0.5 - (index == 0 ? 0.15 : 0));
        }
        else
            t = 0.5;
           
    
        const pt = lerpv3(p0, p1, p2, p3, t);
    
        const tx = pt.x;
        const ty = pt.y;
    
        const tw = size * graph.currentPage.zoom;
        const th = size * graph.currentPage.zoom;
    
        const points =
                     (tx - tw/2) + ',' + (ty + th/2)
            + ' '  + (tx + tw/2) + ',' + (ty + th/2)
            + ' '  + (tx       ) + ',' + (ty - th/2);
    
        arrow.setAttribute('points', points);
        arrow.setAttribute('display', 'inline');
    
    
        const ct = bezierTangent(p0.x, p0.y, p1.x, p1.y, p2.x, p2.y, p3.x, p3.y, t);
    
        arrow.style.transformBox    = 'fill-box';
        arrow.style.transformOrigin = 'center';
        arrow.style.transform       = 'rotate(' + (angle(ct) - Tau/4 + (!back || fb ? 0 : Tau/2)) + 'rad)';
    }



    updateStyle()
    {
        const conn  = this.connection;
        let   color = rgb_a(this.getColor());
    

        const l = rgb2hclok(color)[2];
        
        let bright = Math.min(Math.max(0, (l-0.6) / 0.4), 1);
        if (darkMode) bright = 1-bright;
    
        
        // const innerOpacity = Math.round(bright * (darkMode ? 88 : 66) * Math.min(graph.currentPage.zoom, 5)).toString(16).padStart(2, '0');
        //'+(Math.min(Math.max(1, 1/graph.currentPage.zoom), 5))+'
        
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
    
         
        //let showCurve = true;
    

        if (   conn.output && color[3] < 1
            || conn. input && color[3] < 1)
        {
            // const showCurve = 
            //        conn.output && color[3] > 0
            //     || conn. input && color[3] > 0;
    
            this.xp1.style.display          = 'inline';
            this.xp1.style.stroke           = rgba2style(rgb_a(darkMode ? [0.067, 0.067, 0.067] : [0.784, 0.784, 0.784], 1 - color[3]));
            this.xp1.style.strokeDasharray  = 9 * graph.currentPage.zoom;
    
            this.xp2.style.display          = 'inline';
            this.xp2.style.stroke           = rgba2style(rgb_a(darkMode ? [0.302, 0.302, 0.302] : [1, 1, 1], 1 - color[3]));//darkMode ? '#4d4d4d' : '#fff';
            this.xp2.style.strokeDasharray  = 9 * graph.currentPage.zoom;
            this.xp2.style.strokeDashoffset = 9 * graph.currentPage.zoom;
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
    
            dl /= Math.min(1 - (1 - graph.currentPage.zoom) / 1.75, 1);
    
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

        const arrowStyle = rgba2style(
            rgbaLerp(
                darkMode 
                ? [0.5, 0.5, 0.5, 0.65] 
                : [0.5, 0.5, 0.5, 0.5 ], 
                color, 
                color[3]));

                
        const isNotCached = 
                   conn.output
               &&  conn.output.node
               && !conn.output.node.isCached()
            ||     conn.output
               &&  conn.output.param
               &&  conn.output.param._nodeId != undefined
            &&  nodeFromId(conn.output.param._nodeId)
               && !nodeFromId(conn.output.param._nodeId).isCached();
        
        const unknown = false;
            //     isNotCached
            // &&  conn.output
            // && (  !conn.output.node.isOrPrecededByMultiplier()
            //     ||   (   !conn.output.node.isMultiplier()
            //           || !conn.output.node.paramRepeatId.input.connected)
            //        && conn.output.node.inputs.find(i => i.isConnectedUncached()))
            // &&  conn.input
            // &&  conn.input.node.isOrFollowedByMultiplier()
            // && (  !conn.input.param 
            //     || conn.input.param.affectsHeader);
    
    
        this.curve  .style.stroke          = wireStyle;
        this.curve2 .style.stroke          = rgb2style(rgbDocumentBody);
    
        this.curve  .style.strokeDasharray = unknown ? (2.7 * graph.currentPage.zoom) + ' ' + (2.7 * graph.currentPage.zoom) : '0';
    
        this. inBall.style.fill            = wireStyle;
        this.outBall.style.fill            = wireStyle;

        this.arrow1 .style.fill            = arrowStyle;
        this.arrow2 .style.fill            = arrowStyle;
    
    
        if (conn.output) conn.output.wireBall.style.background = wireStyle;
        if (conn. input) conn. input.wireBall.style.background = wireStyle;
    
    
        const listType = 
               conn.output
            && arraysIntersect(conn.output.types, LIST_TYPES);//supportsTypes(LIST_TYPES);

        // if (this.connection.input.node.nodeId == 'text')
        // {
        //     console.log('listType =', listType);
        //     console.log('conn.output.types =', conn.output.types);
        // }
    
    
        let width = 
            graph.currentPage.zoom < 1
            ? graph.currentPage.zoom + (Math.pow(2, graph.currentPage.zoom - 1) - graph.currentPage.zoom) * 0.333
            : graph.currentPage.zoom;
    
        width *= 1.6;
    
    
        //      if (graph.currentPage.zoom < 1/7) width += 1 * (1 - graph.currentPage.zoom) * (7 * graph.currentPage.zoom);
        // else if (graph.currentPage.zoom < 1  ) width += 1 * (1 - graph.currentPage.zoom);
    
    
        this.curve .setAttribute('stroke-width', width * (listType ? (unknown ? 3.6 : 3.2) : (unknown ? 1.3 : 1)));
        this.curve2.setAttribute('stroke-width', width * 1.4);

        this.xp1   .setAttribute('stroke-width', width * (listType ? (unknown ? 3.6 : 3.2) : (unknown ? 1.3 : 1)));
        this.xp2   .setAttribute('stroke-width', width * 1.4);
    
        this.curve2.setAttribute('display', listType ? 'inline' : 'none');
    
    
        this. inBall.style.r = 3 * graph.currentPage.zoom;
        this.outBall.style.r = 3 * graph.currentPage.zoom;
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