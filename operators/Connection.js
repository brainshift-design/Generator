class Connection
{
    output;
    input;

    wire;


    constructor(output, input)
    {
        this.output = output;
        this.input  = input;


        this.wire                            = createSvg('svg');
        this.wire.connection                 = this;
        this.wire.style.position             = 'absolute';
        this.wire.style.left                 = 0;
        this.wire.style.top                  = 0;
        this.wire.style.overflow             = 'hidden';
  
        this.wire.outputPos                  = point_NaN;
        this.wire. inputPos                  = point_NaN;
  
        this.wire.xp1                        = createSvg('path');
        this.wire.xp1.style.position         = 'absolute';
        this.wire.xp1.style.fill             = 'none';

        this.wire.xp2                        = createSvg('path');
        this.wire.xp2.style.position         = 'absolute';
        this.wire.xp2.style.fill             = 'none';

        this.wire.curve                      = createSvg('path');
        this.wire.curve.style.position       = 'absolute';
        this.wire.curve.style.fill           = 'none';

        this.wire.outBall                    = createSvg('circle');
        this.wire.outBall.style.position     = 'absolute';

        this.wire.inBall                     = createSvg('circle');
        this.wire.inBall.style.position      = 'absolute';


        this.wire.appendChild(this.wire.xp1);
        this.wire.appendChild(this.wire.xp2);
        this.wire.appendChild(this.wire.curve);
        this.wire.appendChild(this.wire.outBall);
        this.wire.appendChild(this.wire.inBall);

        

        this.wire.update = (x1, y1, x2, y2) =>
        {
            const cw = graphView.clientWidth;
            const ch = graphView.clientHeight;
        
            
            this.wire.updateCurve  (x1, y1, x2, y2);
            this.wire.updateOutBall(x1, y1        );
            this.wire.updateInBall (        x2, y2);

            this.wire.updateStyle(this.wire.getColor());

            this.wire.setAttribute('width',  cw);
            this.wire.setAttribute('height', ch);
            this.wire.setAttribute('stroke-width', graphView.zoom);
        };



        this.wire.updateCurve = (x1, y1, x2, y2) =>
        {
            if (!pointIsNaN(this.wire.outputPos))
            {
                x1 = this.wire.outputPos.x;
                y1 = this.wire.outputPos.y;
            }

            if (!pointIsNaN(this.wire.inputPos))
            {
                x2 = this.wire.inputPos.x;
                y2 = this.wire.inputPos.y;
            }

            
            const _x0 = x1;
            const _y0 = y1;

            const _x3 = x2;
            const _y3 = y2;


            const tx  = 600 * graphView.zoom;
            const ty  = 300 * graphView.zoom;
            const ecc = 100 * graphView.zoom;

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


            if (   graphView.tempConn == this
                && graphView.tempConn.output == graphView.overOutput)
            {
                _x1 += (_x0 - _x1) * 5/8;
                _y1 += (_y0 - _y1) * 5/8;
            }

            if (   graphView.tempConn == this
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

            this.wire.xp1  .setAttribute('d', points);
            this.wire.xp2  .setAttribute('d', points);
            this.wire.curve.setAttribute('d', points);
     };



        this.wire.getColor = () =>
        {
            if (this.output)
                return this.output.wireColor;

            else if (this.input)
            {
                if (   graphView.overOutput
                    && this.input.types.includes(graphView.overOutput.type)) 
                    return graphView.overOutput.wireColor;
                else
                    return this.input.wireColor;
            }
                
            else 
                return [255, 0, 255];
        };



        this.wire.updateOutBall = (x, y) =>
        {
            this.wire.outBall.setAttribute('cx', x);
            this.wire.outBall.setAttribute('cy', y);
        };



        this.wire.updateInBall = (x, y) =>
        {
            this.wire.inBall.setAttribute('cx', x);
            this.wire.inBall.setAttribute('cy', y);
        };



        this.wire.updateStyle = (color) =>
        {
            const l = rgb2hclokl(color)[2];
            
            const bright       = Math.min(Math.max(0, (l-0.6) / 0.4), 1);
            const innerOpacity = Math.round(bright * 44 * Math.min(graphView.zoom, 1)).toString(16).padStart(2, '0');
            const outerOpacity = Math.round(bright * 60).toString(16).padStart(2, '0');

            this.wire.curve.style.filter = 
                !isDark(color)
                ?   'drop-shadow(0px 0px 1px #000000' + innerOpacity + ') '
                  + 'drop-shadow(0px 0px 6px #000000' + outerOpacity + ')'
                : 'none';

             
            let showCurve = true;

            if (   this.output && this.output.wireColor[3] < 1
                || this. input && this. input.wireColor[3] < 1)
            {
                showCurve = 
                       this.output && this.output.wireColor[3] > 0
                    || this. input && this. input.wireColor[3] > 0;

                this.wire.xp1.style.display          = 'inline';
                this.wire.xp1.style.stroke           = rgba2style(rgb_a(isDarkMode() ? [0.067, 0.067, 0.067] : [0.784, 0.784, 0.784], 1 - color[3]));
                this.wire.xp1.style.strokeDasharray  = 9 * graphView.zoom;

                this.wire.xp2.style.display          = 'inline';
                this.wire.xp2.style.stroke           = rgba2style(rgb_a(isDarkMode() ? [0.302, 0.302, 0.302] : [1, 1, 1], 1 - color[3]));//isDarkMode() ? '#4d4d4d' : '#fff';
                this.wire.xp2.style.strokeDasharray  = 9 * graphView.zoom;
                this.wire.xp2.style.strokeDashoffset = 9 * graphView.zoom;
            }
            else
            {
                this.wire.xp1.style.display = 'none';
                this.wire.xp2.style.display = 'none';
            }


            this.wire.  curve.style.stroke     = rgba2style(color);
            this.wire. inBall.style.fill       = rgba2style(color);
            this.wire.outBall.style.fill       = rgba2style(color);

            this.wire.xp1  .style.strokeWeight =
            this.wire.xp2  .style.strokeWeight =
            this.wire.curve.style.strokeWeight = (1.2 + 0.3 * bright * (1 + 1/(graphView.zoom/4))) * graphView.zoom;

            this.wire. inBall.style.r          = 3 * graphView.zoom;
            this.wire.outBall.style.r          = 3 * graphView.zoom;

            this.wire.style.zIndex             = 0;


            const isSolo = 
                   graphView._soloNode
                && (   this. input.node == graphView._soloNode
                    || this.output.node == graphView._soloNode);
            
            const showWire = 
                   settings.showWires 
                || isSolo;

            const isReordering =   
                   isNaN(newReorderIndex)
                || isNaN(oldReorderIndex);


            show(this.wire,         showWire && (this != graphView.savedConn || isReordering));
            show(this.wire.curve,   showWire && showCurve && (this != graphView.savedConn || isReordering));
            show(this.wire.xp1,     showWire && (this != graphView.savedConn || isReordering));
            show(this.wire.xp2,     showWire && (this != graphView.savedConn || isReordering));
            show(this.wire.outBall, showWire && (!graphView.tempConn || graphView.tempConn.output));
            show(this.wire. inBall, showWire && (!graphView.tempConn || graphView.tempConn. input));
        };
    }



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = TAB;
        
        let json = 
              pos + '{'
            +       NL + pos + tab + '"outputNodeId": "' + this.output.node.id + '"'
            + ',' + NL + pos + tab + '"outputId": "' + (this.output.param ? this.output.param.id : this.output.index) + '"'
            + (this.output.param ? ',' + NL + pos + tab + '"outputParam": "' + this.output.param.name + '"' : '')
            + ',' + NL + pos + tab + '"inputNodeId": "' + this.input.node.id + '"'
            + ',' + NL + pos + tab + '"inputId": "' + (this.input.param ? this.input.param.id : this.input.index) + '"'
            + (this.input.param ? ',' + NL + pos + tab  + '"inputParam": "' + this.input.param.name + '"' : '')
            +       NL + pos + '}';

        return json;
    }



    static parseJson(_conn)
    {
        const outputNode  = nodeFromId(_conn.outputNodeId);
        const outputId    = _conn.outputId;
        //const outputIndex = parseInt(_conn.outputIndex);

        const inputNode   = nodeFromId(_conn.inputNodeId);
        const inputId     = _conn.inputId;
        //const inputIndex  = parseInt(_conn.inputIndex);


        // log('---------------------------------------');

        // log('outputNode',                outputNode);
        // log('outputIndex',               outputIndex);
        // log('outputNode.outputs.length', outputNode.outputs.length);
        
        // log('inputNode',               inputNode);
        // log('inputIndex',              inputIndex);
        // log('inputNode.inputs.length', inputNode.inputs.length);



        if (   !outputNode 
            ||    isDigit(outputId[0])
               && parseInt(outputId) >= outputNode.outputs.filter(o => !o.param).length
            ||   !isDigit(outputId[0])
               && !outputNode.params.find(p => p.id == outputId && p.output)
            || !inputNode  
            ||    isDigit(inputId[0])
               && parseInt(inputId) >= inputNode.inputs.filter(i => !i.param).length
            ||   !isDigit(inputId[0])
               && !inputNode.params.find(p => p.id == inputId && p.input))
        {
            uiError(
                  'cannot connect ' 
                + _conn.outputNodeId + '.' + outputId 
                + ' to ' 
                + _conn.inputNodeId  + '.' + inputId);

            return null;
        }
        else
        {
            return uiVariableConnect(
                outputNode, 
                isDigit(outputId[0]) 
                ? parseInt(outputId) 
                : outputNode.params.find(p => p.id == outputId).output.index,
                inputNode, 
                isDigit(inputId[0])
                ? parseInt(inputId)
                : inputNode.params.find(p => p.id == inputId).input.index);
        }
    }
}



function getConnectionForArrayWithIds(conn)
{
    return {
        outputNodeId: conn.output.node.id,
        outputIndex:  conn.output.index,
        inputNodeId:  conn.input .node.id,
        inputIndex:   conn.input .index };
}



function getConnectionForArrayWithNames(conn)
{
    return {
        outputNodeName: conn.output.node.id,
        outputIndex:    conn.output.index,
        inputNodeName:  conn.input .node.id,
        inputIndex:     conn.input .index };
}