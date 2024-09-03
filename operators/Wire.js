class Wire
{
    connection;

    outputPos = point_NaN;
    inputPos  = point_NaN;


    clientX;
    clientY;


    elbowCircle0;
    elbowCircle1;
    elbowCircle2;
    elbowCircle3;

    midLine;


    svg;
    
    curve;
    curve2;
    
    xp1;
    xp2;

    outBall;
    inBall;

    arrow1;
    arrow2;


    // subdivision cache
    sp0        = null;
    sp1        = null;
    sp2        = null;
    sp3        = null;
    sArcLength = null;
   


    constructor(connection)
    {
        this.connection                  = connection;
      
        this.svg                         = createSvg('svg');
        this.svg.style.position          = 'absolute';
        this.svg.style.left              = 0;
        this.svg.style.top               = 0;
        this.svg.style.overflow          = 'hidden';
          
        this.curve                       = createSvg('path');
        this.curve.style.position        = 'absolute';
        this.curve.style.fill            = 'none';
        this.curve.curveId               = NULL;
      
        this.curve2                      = createSvg('path');
        this.curve2.style.position       = 'absolute';
        this.curve2.style.fill           = 'none';
      
        this.xp1                         = createSvg('path');
        this.xp1.style.position          = 'absolute';
        this.xp1.style.fill              = 'none';
          
        this.xp2                         = createSvg('path');
        this.xp2.style.position          = 'absolute';
        this.xp2.style.fill              = 'none';


        this.outBall                     = createSvg('circle');
        this.outBall.style.position      = 'absolute';
         
        this.inBall                      = createSvg('circle');
        this.inBall.style.position       = 'absolute';
         
        this.arrow1                      = createSvg('polygon');
        this.arrow1.style.position       = 'absolute';
     
        this.arrow2                      = createSvg('polygon');
        this.arrow2.style.position       = 'absolute';


        this.elbowCircle0                = createSvg('circle');
        this.elbowCircle0.style.position = 'absolute';

        this.elbowCircle1                = createSvg('circle');
        this.elbowCircle1.style.position = 'absolute';

        this.elbowCircle2                = createSvg('circle');
        this.elbowCircle2.style.position = 'absolute';

        this.elbowCircle3                = createSvg('circle');
        this.elbowCircle3.style.position = 'absolute';

        this.midLine                     = createSvg('line');
        this.midLine.style.position      = 'absolute';


        this.svg.appendChild(this.curve       );
        this.svg.appendChild(this.curve2      );
        this.svg.appendChild(this.xp1         );
        this.svg.appendChild(this.xp2         );
        this.svg.appendChild(this.arrow1      );
        this.svg.appendChild(this.arrow2      );
        this.svg.appendChild(this.outBall     );
        this.svg.appendChild(this.inBall      );
        // this.svg.appendChild(this.elbowCircle0);
        // this.svg.appendChild(this.elbowCircle1);
        // this.svg.appendChild(this.elbowCircle2);
        // this.svg.appendChild(this.elbowCircle3);
        // this.svg.appendChild(this.midLine     );
    }



    getColor()
    {
        const conn   = this.connection;

        const types  = [];

        const output = conn.output;
        const input  = conn.input;
        

             if (output) types.push(...output.types);
        else if (input ) types.push(... input.types);


        if (this.isReset)
            return rgb_a(rgbFromType(ANY_VALUE, true));

        else if (output)
        {
            return output.getWireColor();
        }

        else if (input)
        {
            return input.getWireColor();
        }

        else if (!isEmpty(types))
            return rgb_a(rgbFromType(types[0], true));

        else 
            return rgbaInvalid;
    }



    update(x = 0, y = 0)
    {
        this.clientX = x;
        this.clientY = y;
    

        const yOffset = getTopHeight();
    
        let pOut = point(0, 0),
            pIn  = point(0, 0);
    

        const conn   = this.connection;

        const output = graphView.overOutput ?? conn.output;
        const input  = graphView.overInput  ?? conn.input;


        // console.log('output =', output);
        // console.log('input =', input);
        // console.log('');

        if (output)
        {
            const ro = boundingRect(output.div);
            pOut = point(ro.x + ro.w/2, ro.y + ro.h/2 - yOffset);
        }
        else
            pOut = point(x, y - yOffset);
    
    
        if (input)
        {
            const ri = boundingRect(input.div);
            pIn = point(ri.x + ri.w/2, ri.y + ri.h/2 - yOffset);
        }
        else
            pIn = point(x, y - yOffset);

            
        // make sure wires don't stick out of list
        
        if (   output
            && output.node
            && output.param)
        {
            const outNode   = output.node;
            const outTop    = Math.round(outNode.measureData.divBounds.y + outNode.measureData.headerOffset.height * graph.currentPage.zoom - yOffset + 1);
            const outBottom = Math.round(outNode.measureData.divBounds.y + outNode.measureData.divBounds.height                             - yOffset - 1);

            if (pOut.y < outTop   ) pOut.y = outTop;
            if (pOut.y > outBottom) pOut.y = outBottom;
        }


        this.updateSvg(pOut.x, pOut.y, pIn.x, pIn.y);
    }

    
    
    updateSvg(x1, y1, x2, y2)
    {
        if (equal(x1, x2, 0.001)) x2 += 0.001;
        if (equal(y1, y2, 0.001)) y2 += 0.001;

        this.updateCurve  (x1, y1, x2, y2);
        this.updateOutBall(x1, y1        );
        this.updateInBall (        x2, y2);
        this.updateStyle  (x1, y1, x2, y2);


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
    
        
        // const senseElbow0 = 100;
        // const maxElbow0   = 40;
        // const nd          = Math.min(Math.max(-1, (x2 - x1) / senseElbow0), 0);
        // const diag        = 1 + Math.min((x2 - x1) / nozero(y2 - y1), 0.5);
        // const r0          = Math.min(Math.max(Math.abs(nd), diag) * maxElbow0, Math.abs(y2 - y1) / 6);
        
        // const mx = (x1 + x2)/2;
        // const my = (y1 + y2)/2;


        // this.elbowCircle0.setAttribute('cx',      x1);
        // this.elbowCircle0.setAttribute('cy',      y1 + (y1 < y2 ? r0 : -r0));
        // this.elbowCircle0.setAttribute('r',       r0);
        // this.elbowCircle0.setAttribute('fill',   'none');
        // this.elbowCircle0.setAttribute('stroke', '#FF6000');

        // this.elbowCircle3.setAttribute('cx',      x2);
        // this.elbowCircle3.setAttribute('cy',      y2 - (y1 < y2 ? r0 : -r0));
        // this.elbowCircle3.setAttribute('r',       r0);
        // this.elbowCircle3.setAttribute('fill',   'none');
        // this.elbowCircle3.setAttribute('stroke', '#FF6000');

        // this.midLine     .setAttribute('x1',      x1);
        // this.midLine     .setAttribute('y1',      y1);
        // this.midLine     .setAttribute('x2',      x2);
        // this.midLine     .setAttribute('y2',      y2);
        // this.midLine     .setAttribute('stroke', '#FF6000');


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
    
    
        if (   graphView.tempConn        == this.connection
            && graphView.tempConn.output == graphView.overOutput)
        {
            _x1 += (_x0 - _x1) * 5/8;
            _y1 += (_y0 - _y1) * 5/8;
        }
    
        if (   graphView.tempConn       == this.connection
            && graphView.tempConn.input == graphView.overInput)
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
               && this.connection.input.id == 'loop';

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
    
    
        const feedback = 
               this.connection.input
            && this.connection.input.feedback;

        const repeat =
               this.connection.input
            && this.connection.input.id == 'loop';


        let fb;

             if (feedback) fb = -25;
        else if (repeat  ) fb = -45;
        else               fb =  25;


        const back = x0 - x3 > defNodeWidth * 1.5;

        const isList = this.connectionIsList();

        this.updateArrow(p0, p1, p2, p3, this.arrow1,  fb, isList ? 16 : 9, 0, feedback, back);
        this.updateArrow(p0, p1, p2, p3, this.arrow2, -35, isList ? 16 : 9, 1, feedback, back);
    }
    
    

    updateArrow(p0, p1, p2, p3, arrow, dist, size, index, feedback, back)
    {
        if (   !this.sp0 
            || !this.sp1 
            || !this.sp2 
            || !this.sp3
            || !equal(p1.x - p0.x, this.sp1.x - this.sp0.x, 0.005)
            || !equal(p2.x - p1.x, this.sp2.x - this.sp1.x, 0.005)
            || !equal(p3.x - p2.x, this.sp3.x - this.sp2.x, 0.005)
            || !equal(p1.y - p0.y, this.sp1.y - this.sp0.y, 0.005)
            || !equal(p2.y - p1.y, this.sp2.y - this.sp1.y, 0.005)
            || !equal(p3.y - p2.y, this.sp3.y - this.sp2.y, 0.005))
        {
            this.sArcLength = arcLength3(p0, p1, p2, p3);

            this.sp0 = clone(p0);
            this.sp1 = clone(p1);
            this.sp2 = clone(p2);
            this.sp3 = clone(p3);
        }


        let al = 
            dist >= 0
            ? this.sArcLength - dist * graph.currentPage.zoom
            : -dist * graph.currentPage.zoom;
    
        if (al <= 0)
        {
            arrow.setAttribute('display', 'none');
            return;
        }
        
    
        let t = pointAlongSegment3(p0, p1, p2, p3, al);
        
        if (isNaN(t))
        {
            arrow.setAttribute('display', 'none');
            return;
        }
        

        if (  !back
            || feedback)
        {
            if (dist >= 0) t = Math.max(this.connection.backInit ? 0 : 0.5, t);
            else           t = Math.min(t, 0.5 - (index == 0 ? 0.15 : 0));
        }
        else
            t = 0.55;
           
    
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
        arrow.style.transform       = 'rotate(' + (anglev(ct) - Tau/4 + (!back || feedback ? 0 : Tau/2)) + 'rad)';
    }



    updateStyle(x1, y1, x2, y2)
    {
        const conn   = this.connection;

        const output = conn.output;
        const input  = conn.input;


        this.isReset = 
               input 
            && input.isLoop();


        let color = rgb_a(this.getColor());


        const l = rgb2hclok(color)[2];
        
        let bright = Math.min(Math.max(0, (l-0.6) / 0.4), 1);
        if (darkMode) bright = 1-bright;
    
        
        if (   output && color[3] < 1
            ||  input && color[3] < 1)
        {
            this.xp1.style.display          = 'inline';
            this.xp1.style.stroke           = rgba2style(rgb_a(darkMode ? [0.067, 0.067, 0.067] : [0.784, 0.784, 0.784], 1 - color[3]));
            this.xp1.style.strokeDasharray  = 9 * Math.max(1, graph.currentPage.zoom);
    
            this.xp2.style.display          = 'inline';
            this.xp2.style.stroke           = rgba2style(rgb_a(darkMode ? [0.302, 0.302, 0.302] : [1, 1, 1], 1 - color[3]));
            this.xp2.style.strokeDasharray  = 9 * Math.max(1, graph.currentPage.zoom);
            this.xp2.style.strokeDashoffset = 9 * Math.max(1, graph.currentPage.zoom);
        }
        else
        {
            this.xp1.style.display = 'none';
            this.xp2.style.display = 'none';
        }
    
    
        if (darkMode)
        {
            const hcl = rgb2hclok(color);
    
            const th  = 0.27;
            let   dl  = 0.1;
    
            dl /= Math.min(1 - (1 - graph.currentPage.zoom) / 1.75, 1);
    
            if (hcl[2] > th - dl && hcl[2] <= th)
                color = invalid2validRgb(hclok2rgb([hcl[0], hcl[1], th - dl]));
            if (hcl[2] > th && hcl[2] < th + dl)
                color = invalid2validRgb(hclok2rgb([hcl[0], hcl[1], th + dl]));
        }
        else // light mode
        {
            const hcl = rgb2hclok(color);
    
            const th  = 0.94;
            let   dl  = 0.05;
    
            dl /= Math.min(1 - (1 - graph.currentPage.zoom) / 1.75, 1);
    
            if (hcl[2] > th - dl)
                color = invalid2validRgb(hclok2rgb([hcl[0], hcl[1], th - dl]));
        }
    
                
        const unknown = 
               output 
            && (      output.param
                   && output.param.isNodeValue
                   && output.param.node.isOrPrecededByUncached()
                ||     output.param
                   && !output.param.isNodeValue
                   &&  output.param.input
                   &&  output.param.input.isUncached()
                ||   !output.param
                   && output.node.isOrPrecededByUncached()
                ||    output.node.type == EXPAND
                   && output.node.isOrPrecededByUncached())
            && (   input
                && input.node.isOrFollowedByMultiplier());
        
    
        const arrowStyle = rgba2style(
            rgbaLerp(
                darkMode 
                ? [0.5, 0.5, 0.5, 0.65] 
                : [0.5, 0.5, 0.5, 0.5 ], 
                color, 
                color[3]));

        
        this.curve.curveId = 
              (output ? output.fullId : '')
            + '-' 
            + (input  ? input .fullId : '');

        const outColor = 
            output
            ? (isColorType(output.types[0])
               ? output.getWireColor()
               : rgb_a(rgbFromType(output.types[0], true)))
            : input
              ? (isColorType(input.types[0])
                 ? input.getWireColor()
                 : rgb_a(rgbFromType(input.types[0], true)))
              : rgbFromType(ANY_VALUE, true);

        const inColor = 
            input 
            ? rgb_a(rgbFromType(input.types[0], true))
            : outColor;


        this.curve .style.stroke = rgb2style(color);
        this.curve2.style.stroke = rgb2style(rgbDocumentBody);
    

        const dash = Math.max(1.5, 2.7 * graph.currentPage.zoom);

        this.curve.style.strokeDasharray = 
               unknown 
            || this.isReset
            ? dash + ' ' + dash 
            : '0';
    

        this.outBall.style.fill = rgb2style(outColor);
        this. inBall.style.fill = rgb2style( inColor);

        this.arrow1 .style.fill = arrowStyle;
        this.arrow2 .style.fill = arrowStyle;
    
    
        //if (output) output.wireBall.style.background = rgb2style(outColor);
        //if (input ) input .wireBall.style.background = rgb2style( inColor);
    
    
        const isList = this.connectionIsList();


        let width = 
            graph.currentPage.zoom < 1
            ? graph.currentPage.zoom + (Math.pow(2, graph.currentPage.zoom - 1) - graph.currentPage.zoom) * 0.333
            : graph.currentPage.zoom;
    
        width *= 1.6;
    
    
        this.curve .setAttribute('stroke-width', width * (isList ? (unknown ? 3.6 : 3.2) : (unknown ? 1.3 : 1)));
        this.curve2.setAttribute('stroke-width', width * 1.4);

        this.xp1   .setAttribute('stroke-width', width * (isList ? (unknown ? 3.6 : 3.2) : (unknown ? 1.3 : 1)));
        this.xp2   .setAttribute('stroke-width', width * 1.4);
    
        this.curve2.setAttribute('display', isList ? 'inline' : 'none');
    
    
        this. inBall.style.r = 3 * graph.currentPage.zoom;
        this.outBall.style.r = 3 * graph.currentPage.zoom;
    }
    
    
    
    connectionIsList()
    {
        const conn = this.connection;

        return    conn.output
               && arraysIntersect(conn.output.types, LIST_TYPES)
            ||   !conn.output
               && conn.input
               && LIST_TYPES.includes(conn.input.types[0]);
    }



    show(show, update = true)
    {
        showElement(this.svg, show);
    
        if (update)
            this.update();
    }
}