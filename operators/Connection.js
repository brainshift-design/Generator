class Connection
{
    output;
    input;

    wire;


    constructor(output, input)
    {
        this.output = output;
        this.input  = input;


        this.wire                        = createSvg('svg');
        this.wire.connection             = this;
        this.wire.style.position         = 'absolute';
        this.wire.style.left             = 0;
        this.wire.style.top              = 0;
        this.wire.style.width            = '100%';
        this.wire.style.height           = '100vh';
  
        this.wire.outputPos              = point_NaN;
        this.wire. inputPos              = point_NaN;
  
        this.wire.curve                  = createSvg('path');
        this.wire.curve.style.fill       = 'none';
        this.wire.curve.style.position   = 'absolute';

        this.wire.outBall                = createSvg('circle');
        this.wire.outBall.style.position = 'absolute';

        this.wire.inBall                 = createSvg('circle');
        this.wire.inBall.style.position  = 'absolute';


        this.wire.appendChild(this.wire.curve);
        this.wire.appendChild(this.wire.outBall);
        this.wire.appendChild(this.wire.inBall);

        

        this.wire.update = (x1, y1, x2, y2) =>
        {
            const cw      = graphView.clientWidth;
            const ch      = graphView.clientHeight;
            const yOffset = controlBar.offsetHeight;
        
            // the yOffset is to start wire coords just below the control bar,
            // not at the top of the window

            this.wire.updateCurve  (x1, y1, x2, y2);
            this.wire.updateOutBall(x1, y1        );
            this.wire.updateInBall (        x2, y2);

            this.wire.updateStyle(this.wire.getColor());

            this.wire.setAttribute('width',  cw);
            this.wire.setAttribute('height', ch);
        
            this.wire.setAttribute('viewBox',
                        0
                + ' ' + yOffset/2 // why is only half of yOffset taken???
                + ' ' + cw
                + ' ' + ch);

            const isSolo = 
                   graphView._soloNode
                && (   this. input.node == graphView._soloNode
                    || this.output.node == graphView._soloNode);
            
            const showWire = 
                   graphView.showWires 
                || isSolo;

            const isReordering =   
                   isNaN(newReorderIndex)
                || isNaN(oldReorderIndex);


            show(this.wire,         showWire && (this != graphView.savedConn || isReordering));
            show(this.wire.curve,   showWire && (this != graphView.savedConn || isReordering));
            show(this.wire.outBall, showWire && (!graphView.tempConn || graphView.tempConn.output));
            show(this.wire. inBall, showWire && (!graphView.tempConn || graphView.tempConn. input));
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

            
            this.wire.curve.setAttribute('d',
                   'M ' + _x0 + ',' + _y0
                + ' C ' + _x1 + ',' + _y1
                + ' '   + _x2 + ',' + _y2
                + ' '   + _x3 + ',' + _y3);
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
                l > 0.6
                ?   'drop-shadow(0px 0px 1px #000000' + innerOpacity + ') '
                  + 'drop-shadow(0px 0px 6px #000000' + outerOpacity + ')'
                : 'none';

            this.wire.curve.style.stroke      = colorStyleRgb(color);
            this.wire. inBall.style.fill      = colorStyleRgb(color);
            this.wire.outBall.style.fill      = colorStyleRgb(color);

            this.wire.curve.style.strokeWidth = (1.2 + 0.3 * bright * (1 + 1/(graphView.zoom/4))) * graphView.zoom;
            this.wire. inBall.style.r         = 3 * graphView.zoom;
            this.wire.outBall.style.r         = 3 * graphView.zoom;

            this.wire.style.zIndex = 0;
        };
    }



    toJson(nTab = 0) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';
        
        let json = 
              pos + '{'
            +  '\n' + pos + tab + '"outputNode": "' + this.output.node.id + '"'
            + ',\n' + pos + tab + '"outputIndex": "' + this.output.index + '"'
            + (this.output.param ? ',\n' + pos + tab + '"outputParam": "' + this.output.param.name + '"' : '')
            + ',\n' + pos + tab + '"inputNode": "' + this.input.node.id + '"'
            + ',\n' + pos + tab + '"inputIndex": "' + this.input.index + '"'
            + (this.input.param ? ',\n' + pos + tab  + '"inputParam": "' + this.input.param.name + '"' : '')
            +  '\n' + pos + '}';

        return json;
    }



    static parseJson(_conn)
    {
        const outputNode  = nodeFromId(_conn.outputNode);
        const outputIndex = parseInt(_conn.outputIndex);

        const inputNode   = nodeFromId(_conn.inputNode);
        const inputIndex  = parseInt(_conn.inputIndex);


        log('---------------------------------------');

        log('outputNode',                outputNode);
        log('outputIndex',               outputIndex);
        log('outputNode.outputs.length', outputNode.outputs.length);
        
        log('inputNode',               inputNode);
        log('inputIndex',              inputIndex);
        log('inputNode.inputs.length', inputNode.inputs.length);



        if (   !outputNode || outputIndex >= outputNode.outputs.length
            || !inputNode  ||  inputIndex >= inputNode .inputs .length)
        {
            uiError(
                  'Cannot connect ' 
                + _conn.outputNode + '.out[' + outputIndex + '] to ' 
                + _conn.inputNode  + '.in[' + _conn.inputIndex + ']');
        }
        else
            uiVariableConnect(outputNode, outputIndex, inputNode, inputIndex);
    }
}



function getConnectionForArrayWithIds(conn)
{
    return {
        outputNodeId:conn.output.node.id,
        outputIndex: conn.output.index,
        inputNodeId: conn.input .node.id,
        inputIndex:  conn.input .index };
}



function getConnectionForArrayWithNames(conn)
{
    return {
        outputNodeName: conn.output.node.id,
        outputIndex:  conn.output.index,
        inputNodeName:  conn.input .node.id,
        inputIndex:   conn.input .index };
}