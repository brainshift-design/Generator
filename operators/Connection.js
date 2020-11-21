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

        this.wire = createSvg('svg');
        this.wire.style.position = 'absolute';
        this.wire.style.left     = 0;
        this.wire.style.top      = 0;
        this.wire.style.width    = '100%';
        this.wire.style.height   = '100vh';

        this.wire.curve = createSvg('path');
        this.wire.curve.style.fill        = 'none';
        //this.wire.curve.style.stroke      = '#18A0FB';
        this.wire.curve.style.strokeWidth = 1.2;
        this.wire.curve.style.position    = 'absolute';
        this.wire.appendChild(this.wire.curve);

        this.wire.outBall = createSvg('circle');
        //this.wire.outBall.style.fill     = '#18A0FB';
        this.wire.outBall.style.position = 'absolute';
        this.wire.outBall.style.r        = 3;

        this.wire.inBall = createSvg('circle');
        //this.wire.inBall.style.fill     = '#18A0FB';
        this.wire.inBall.style.position = 'absolute';
        this.wire.inBall.style.r        = 3;

        this.wire.appendChild(this.wire.curve);
        this.wire.appendChild(this.wire.outBall);
        this.wire.appendChild(this.wire.inBall);


        this.wire.update = () =>
        {
            var outRect = this.output.control.getBoundingClientRect();
            var inRect  = this.input .control.getBoundingClientRect();

            var x1 = (outRect.left + outRect.width /2) / graphView.zoom;
            var y1 = (outRect.top  + outRect.height/2) / graphView.zoom;
            var x2 = (inRect .left + inRect .width /2) / graphView.zoom;
            var y2 = (inRect .top  + inRect .height/2) / graphView.zoom;

            var color;

            switch (this.output.dataType)
            {
                case 'OBJ': color = ACTIVE_OBJ_COLOR; break;
                case 'NUM': color = ACTIVE_NUM_COLOR; break; //'#444';
            }

            this.wire.curve.setAttribute('d',
                   'M ' +  (x1                ) + ',' + y1
                + ' C ' +  (x1 + (x2 - x1)*2/5) + ',' + y1
                + ' '   +  (x1 + (x2 - x1)*3/5) + ',' + y2
                + ' '   +  (x2                ) + ',' + y2);

            this.wire.curve.setAttribute('stroke', color);

            show(this.wire.outBall);
            this.wire.outBall.setAttribute('cx', x1);
            this.wire.outBall.setAttribute('cy', y1);
            this.wire.outBall.setAttribute('fill', color);

            show(this.wire.inBall);
            this.wire.inBall.setAttribute('cx', x2);
            this.wire.inBall.setAttribute('cy', y2);
            this.wire.inBall.setAttribute('fill', color);
        };


        this.wire.updateFromOutput = (x, y) =>
        {
            var outRect = this.output.control.getBoundingClientRect();

            var x1 = outRect.left + outRect.width /2;// - graphView.pan.x;
            var y1 = outRect.top  + outRect.height/2;// - graphView.pan.y;

            this.wire.curve.setAttribute('d',
                   'M ' +  (x1               ) + ',' + y1
                + ' C ' +  (x1 + (x - x1)*2/5) + ',' + y1
                + ' '   +  (x1 + (x - x1)*3/5) + ',' + y
                + ' '   +  (x                ) + ',' + y);

            this.wire.outBall.setAttribute('cx', x1);
            this.wire.outBall.setAttribute('cy', y1);

            var col = colorFromDataType(this.output.dataType, true);

            this.wire.curve  .style.stroke = col;
            this.wire.inBall .style.fill   = col;
            this.wire.outBall.style.fill   = col;

            hide(this.wire.inBall);
        };


        this.wire.updateFromInput = (x, y) =>
        {
            var inRect = this.input.control.getBoundingClientRect();

            var x2 = inRect.left + inRect.width /2;// - graphView.pan.x;
            var y2 = inRect.top  + inRect.height/2;// - graphView.pan.y;

            this.wire.curve.setAttribute('d',
                   'M ' +  (x               ) + ',' + y
                + ' C ' +  (x + (x2 - x)*2/5) + ',' + y
                + ' '   +  (x + (x2 - x)*3/5) + ',' + y2
                + ' '   +  (x2              ) + ',' + y2);

            this.wire.inBall.setAttribute('cx', x2);
            this.wire.inBall.setAttribute('cy', y2);

            var col = colorFromDataType(this.input.dataType, true);

            this.wire.curve  .style.stroke = col;
            this.wire.inBall .style.fill   = col;
            this.wire.outBall.style.fill   = col;

            hide(this.wire.outBall);
        };
    }
}