class Connection
{
    output;
    input;

    wire;


    constructor(output, input)
    {
        this.output = output;
        this.input  = input;

        this.wire = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        this.wire.style.position = 'absolute';
        this.wire.style.left     = 0;
        this.wire.style.top      = 0;
        this.wire.style.width    = '100%';
        this.wire.style.height   = '100vh';

        this.wire.curve = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        this.wire.curve.style.fill        = 'none';
        this.wire.curve.style.stroke      = '#18A0FB';
        this.wire.curve.style.strokeWidth = 1.2;
        this.wire.curve.style.position    = 'absolute';
        this.wire.appendChild(this.wire.curve);

        this.wire.outBall = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.wire.outBall.style.fill     = '#18A0FB';
        this.wire.outBall.style.position = 'absolute';
        this.wire.outBall.style.r        = 3;

        this.wire.inBall = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        this.wire.inBall.style.fill     = '#18A0FB';
        this.wire.inBall.style.position = 'absolute';
        this.wire.inBall.style.r        = 3;

        this.wire.appendChild(this.wire.curve);
        this.wire.appendChild(this.wire.outBall);
        this.wire.appendChild(this.wire.inBall);
    }


    updateWire()
    {
        var outRect = this.output.control.getBoundingClientRect();
        var inRect  = this.input .control.getBoundingClientRect();

        var x1 = outRect.left + outRect.width /2;
        var y1 = outRect.top  + outRect.height/2;
        var x2 = inRect .left + inRect .width /2;
        var y2 = inRect .top  + inRect .height/2;

        this.wire.curve.setAttribute('d',
               'M ' +  (x1                ) + ',' + y1
            + ' C ' +  (x1 + (x2 - x1)*2/5  ) + ',' + y1
            + ' '   +  (x1 + (x2 - x1)*3/5) + ',' + y2
            + ' '   +  (x2                ) + ',' + y2);

        this.wire.outBall.setAttribute('cx', x1);
        this.wire.outBall.setAttribute('cy', y1);

        this.wire.inBall.setAttribute('cx', x2);
        this.wire.inBall.setAttribute('cy', y2);
    }
}