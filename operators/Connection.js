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

            show(this.wire.curve,   this != graphView.savedConn);
            show(this.wire.outBall, !graphView.tempConn  || graphView.tempConn.output);
            show(this.wire.inBall,  !graphView.tempConn  || graphView.tempConn. input);
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


            if (   graphView.tempConn 
                && graphView.tempConn.output == graphView.overOutput)
            {
                _x1 += (_x0 - _x1) * 5/8;
                _y1 += (_y0 - _y1) * 5/8;
            }

            if (   graphView.tempConn 
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
                    && graphView.overOutput.dataType == this.input.dataType) 
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
            +  '\n' + pos + tab + '"outputOp": "'    + this.output.op.name + '"'
            + ',\n' + pos + tab + '"outputIndex": "' + this.output.op.outputs.indexOf(this.output) + '"'
            + (this.output.param ? ',\n' + pos + tab + '"outputParam": "' + this.output.param.name + '"' : '')
            + ',\n' + pos + tab + '"inputOp": "'     + this.input.op.name + '"'
            + ',\n' + pos + tab + '"inputIndex": "'  + this.input.op.inputs.indexOf(this.input) + '"'
            + (this.input.param ? ',\n' + pos + tab  + '"inputParam": "' + this.input.param.name + '"' : '')
            +  '\n' + pos + '}';

        return json;
    }



    static parseJson(_conn)
    {
        const outputOp    = graph.nodes.find(n => n.name == _conn.outputOp);
        const outputIndex = parseInt(_conn.outputIndex);

        const inputOp     = graph.nodes.find(n => n.name == _conn.inputOp);
        const inputIndex  = parseInt(_conn.inputIndex);

        uiVariableConnect(outputOp, outputIndex, inputOp, inputIndex);
    }
}



function getConnectionForArrayWithIds(conn)
{
    return {
        outputOpId:  conn.output.op.id,
        outputIndex: conn.output.op.outputs.indexOf(conn.output),
        inputOpId:   conn.input .op.id,
        inputIndex:  conn.input .op. inputs.indexOf(conn. input)};
}



function getConnectionForArrayWithNames(conn)
{
    return {
        outputOpName: conn.output.op.name,
        outputIndex:  conn.output.op.outputs.indexOf(conn.output),
        inputOpName:  conn.input .op.name,
        inputIndex:   conn.input .op. inputs.indexOf(conn. input)};
}