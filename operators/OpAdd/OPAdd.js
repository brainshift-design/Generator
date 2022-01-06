class   OpAdd
extends Operator
{
    #paramValue;



    constructor()
    {
        super('add', 'number');

        this.addNewInput();
        this.setOutput(new Output(this.dataType));
        
        this.addParam(this.#paramValue = new NumberParam('', false, false));
    }
    
    
    
    addNewInput()
    {
        const input = new Input(this.dataType);

        input.addEventListener('connect',    () => onConnectInput(this));
        input.addEventListener('disconnect', () => onDisconnectInput(this, input));

        this.addInput(input);
    }



    refresh()
    {
        super.refresh();
        
        this._sampled = Number.NaN;
    }



    update()
    {
        if (this.valid) 
            return;

        super.update()
        
        //this.output._data = dataFromNumber(this.#paramValue.value);

        for (const input of this.output.connectedInputs)
            input.op.update();
    }



    updateNode()
    {
        const inputSize = 10;
        const padding   =  8;
        const gap       =  4;

            
        let height = padding;

        for (let i = 0; i < this.inputs.length; i++)
        {
            const input = this.inputs[i];
            
            if (i > 0)
                height += gap;

            input.control.style.top = height;

            height += inputSize;
        }

        height += padding;


        this.header.style.height = height;


        super.updateNode();
    }
}



function onConnectInput(op)
{
    op.addNewInput(); 
    updateGraphNode(op);
}



function onDisconnectInput(op, input)
{
    removeFromArray(op.inputs, input); 
    updateGraphNode(op);
}