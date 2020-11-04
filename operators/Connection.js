class Connection
{
    input;
    output;

    wire;

    constructor(input, output)
    {
        this.input  = input;
        this.output = output;

        this.wire = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        this.wire.style.stroke      = '#18A0FB';
        this.wire.style.strokeWidth = 2;
    }
}