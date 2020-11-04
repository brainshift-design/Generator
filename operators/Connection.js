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

        this.wire.line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        this.wire.appendChild(this.wire.line);

        this.wire.line.style.stroke      = '#18A0FB';
        this.wire.line.style.strokeWidth = 1;
    }


    updateWire()
    {
        this.wire.setAttribute('width',  document.body.clientWidth );
        this.wire.setAttribute('height', document.body.clientHeight);

        var outRect = this.output.control.getBoundingClientRect();
        var inRect  = this.input .control.getBoundingClientRect();

        this.wire.line.setAttribute('x1', outRect.left + outRect.width /2);
        this.wire.line.setAttribute('y1', outRect.top  + outRect.height/2);
        this.wire.line.setAttribute('x2', inRect .left + inRect .width /2);
        this.wire.line.setAttribute('y2', inRect .top  + inRect .height/2);
    }
}