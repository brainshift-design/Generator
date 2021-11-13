class UConnection
{
    output;
    input;

    savedInput = null;

    wire;


    constructor(output, input)
    {
        this.output = output;
        this.input  = input;

        this.wire = createSvg('svg');
        this.wire.style.position = 'absolute';
        this.wire.style.left     = 0;
        this.wire.style.top      = 0;
        this.wire.style.width    = '100%';
        this.wire.style.height   = '100vh';
        this.wire.scale          = 1;

        this.wire.curve = createSvg('path');
        this.wire.curve.style.fill        = 'none';
        //this.wire.curve.style.stroke    = '#18A0FB';
        this.wire.curve.style.strokeWidth = 1.2 * this.wire.scale;
        this.wire.curve.style.position    = 'absolute';
        this.wire.appendChild(this.wire.curve);

        this.wire.outBall = createSvg('circle');
        //this.wire.outBall.style.fill   = '#18A0FB';
        this.wire.outBall.style.position = 'absolute';
        this.wire.outBall.style.r        = 3 * this.wire.scale;

        this.wire.inBall = createSvg('circle');
        //this.wire.inBall.style.fill   = '#18A0FB';
        this.wire.inBall.style.position = 'absolute';
        this.wire.inBall.style.r        = 3 * this.wire.scale;

        this.wire.appendChild(this.wire.curve);
        this.wire.appendChild(this.wire.outBall);
        this.wire.appendChild(this.wire.inBall);



        this.wire.update = () =>
        {
            let outRect = this.output.control.getBoundingClientRect();
            let inRect  = this.input .control.getBoundingClientRect();


            let x1 = (outRect.left + outRect.width /2) / graphView.zoom;
            let y1 = (outRect.top  + outRect.height/2) / graphView.zoom;
            let x2 = (inRect .left + inRect .width /2) / graphView.zoom;
            let y2 = (inRect .top  + inRect .height/2) / graphView.zoom;

            y1 -= 40 / graphView.zoom;
            y2 -= 40 / graphView.zoom;


            let color;
            
            switch (this.output.dataType)
            {
                case 'object': color = activeObjectColor; break;
                case 'number': color = activeNumberColor; break;
            }


            this.wire.updateCurve  (x1, y1, x2, y2);
            this.wire.updateOutBall(x1, y1        );
            this.wire.updateInBall (        x2, y2);
            this.wire.updateStyle(color);


            show(this.wire.outBall);
            show(this.wire.inBall);
        };



        this.wire.updateFromOutput = (x, y) =>
        {
            let outRect = this.output.control.getBoundingClientRect();

            let x1 = outRect.left + outRect.width /2;
            let y1 = outRect.top  + outRect.height/2;

            y1 -= 40;
            y  -= 40;

            this.wire.updateCurve  (x1, y1, x, y);
            this.wire.updateOutBall(x1, y1      );
            this.wire.updateStyle(colorFromDataType(this.output.dataType, true));

            hide(this.wire.inBall);
        };



        this.wire.updateFromInput = (x, y) =>
        {
            let inRect = this.input.control.getBoundingClientRect();

            let x2 = inRect.left + inRect.width /2;
            let y2 = inRect.top  + inRect.height/2;

            y  -= 40;
            y2 -= 40;

            this.wire.updateCurve (x, y, x2, y2);
            this.wire.updateInBall(      x2, y2);
            this.wire.updateStyle(colorFromDataType(this.input.dataType, true));

            hide(this.wire.outBall);
        };



        this.wire.updateCurve = (x1, y1, x2, y2) =>
        {
            this.wire.curve.setAttribute('d',
                   'M ' +  (x1                ) + ',' + y1
                + ' C ' +  (x1 + (x2 - x1)*2/5) + ',' + y1
                + ' '   +  (x1 + (x2 - x1)*3/5) + ',' + y2
                + ' '   +  (x2                ) + ',' + y2);
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
            this.wire.curve  .style.stroke = color;
            this.wire. inBall.style.fill   = color;
            this.wire.outBall.style.fill   = color;

            this.wire.curve  .style.strokeWidth = 1.2 * this.wire.scale;
            this.wire. inBall.style.r           = 3   * this.wire.scale;
            this.wire.outBall.style.r           = 3   * this.wire.scale;
        };
    }



    save(nTab) 
    {
        let   pos = ' '.repeat(nTab);
        const tab = '  ';
        
        let save = 
              pos + '{\n'
            + pos + tab + '"output": "' + this.output.save() + '",\n'
            + pos + tab + '"input" : "'  + this.input .save() + '"\n'
            + pos + '}';

        return save;
    }
}