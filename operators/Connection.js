class Connection
{
    output;
    input;

    savedInput = null;

    wire;


    constructor(output, input)
    {
        this.output = output;
        this.input  = input;


        this.wire                      = createSvg('svg');
        this.wire.style.position       = 'absolute';
        this.wire.style.left           = 0;
        this.wire.style.top            = 0;
        this.wire.style.width          = '100%';
        this.wire.style.height         = '100vh';
        this.wire.scale                = 1;

        this.wire.outputPos            = point_NaN;
        this.wire. inputPos            = point_NaN;

        this.wire.curve                = createSvg('path');
        this.wire.curve.style.fill     = 'none';
        this.wire.curve.style.position = 'absolute';

        this.wire.appendChild(this.wire.curve);

        

        this.wire.update = () =>
        {
            let outRect = boundingRect(this.output.control);
            let inRect  = boundingRect(this.input .control);


            let x1 = (outRect.left + outRect.width /2) / graphView.zoom;
            let y1 = (outRect.top  + outRect.height/2) / graphView.zoom;
            let x2 = (inRect .left + inRect .width /2) / graphView.zoom;
            let y2 = (inRect .top  + inRect .height/2) / graphView.zoom;

            y1 -= controlBar.offsetHeight / graphView.zoom;
            y2 -= controlBar.offsetHeight / graphView.zoom;


            this.wire.updateCurve(x1, y1, x2, y2);
            this.wire.updateStyle(this.wire.getColor());
        };



        this.wire.updateFromOutput = (x, y) =>
        {
            let outRect = boundingRect(this.output.control);

            let x1 = outRect.left + outRect.width /2;
            let y1 = outRect.top  + outRect.height/2;

            y1 -= controlBar.offsetHeight;
            y  -= controlBar.offsetHeight;

            this.wire.updateCurve(x1, y1, x, y);
            this.wire.updateStyle(this.wire.getColor());
        };



        this.wire.updateFromInput = (x, y) =>
        {
            let inRect = boundingRect(this.input.control);

            let x2 = inRect.left + inRect.width /2;
            let y2 = inRect.top  + inRect.height/2;

            y  -= controlBar.offsetHeight;
            y2 -= controlBar.offsetHeight;

            this.wire.updateCurve(x, y, x2, y2);
            this.wire.updateStyle(this.wire.getColor());
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
            const _x3 = x2;

            const yf = (0.3 + Math.min(Math.abs(y2 - y1) / 300, 0.8));

            const df = Math.pow((1 - Math.min(Math.abs(_x3 - _x0) / 600, 0.65)), 0.5)
                     * yf;

            const dx = 
                  (_x3 - _x0) * df 
                * (_x3 < _x0 ? -1 : 1);

            const _x1 = Math.max(_x0 + 100 * Math.pow(0.1 + yf*0.9, 1.5), _x0 + dx);
            const _x2 = Math.min(_x3 - 100 * Math.pow(0.1 + yf*0.9, 1.5), _x3 - dx);

            this.wire.curve.setAttribute('d',
                   'M ' + _x0 + ',' + y1
                + ' C ' + _x1 + ',' + y1
                + ' '   + _x2 + ',' + y2
                + ' '   + _x3 + ',' + y2);
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



        this.wire.updateStyle = (color) =>
        {
            const l = rgb2hclokl(color)[2];
            
            const opacity = Math.round(Math.min((l-0.93) / 0.02, 1) * 9).toString(16).padStart(2, '0');

            this.wire.curve.style.filter = 
                l > 0.9
                ? 'drop-shadow(1px 1px 0 #000000' + opacity + ')'
                : 'none';

            this.wire.curve.style.stroke      = colorStyleRgb(color);
            this.wire.curve.style.strokeWidth = 1.6 * this.wire.scale;
            this.wire      .style.zIndex      = 0;
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