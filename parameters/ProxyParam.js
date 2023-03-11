class   ProxyParam
extends Parameter
{
    param;

    controls    = [];
    connections = [];


    constructor(param)
    {
        super(param.type, param.node.id + '_' + param.id);


        this.param = param;
        param.proxy = this;

        this.div.style.height = 20;
        this.div.style.boxShadow = '0 0 0 1px yellow inset';


        switch (param.type)
        {
            case NUMBER_VALUE: 
            {
                this.controls                      = [param.controls[0].copy()];
                this.controls[0].param             = this;

                this.controls[0].div.style.display = 'inline-block';
                this.controls[0].div.style.width   = '100%';

                this.div.appendChild(this.controls[0].div);

                break;
            }
        }


        if (param.input)
        {
            this.initInput(param.input.types, getParamInputValuesForUndo, null);

            const conn = new Connection(param.input.connectedOutput, this.input);
            this.connections.push(conn);

            this.input.connection = conn;
            param.input.connection.proxy = conn;

            graphView.wireContainer.appendChild(conn.wire.svg);
        }


        if (param.output) 
        {
            this.initOutput(param.output.types, null, getParamOutputValuesForUndo, null);
        }
    }



    updateControls()
    {
        for (let i = 0; i < this.controls.length; i++)
        {
            this.controls[i].setValue(this.param.controls[i].value, false, true, false);
            this.controls[i].update();
        }
    }
}