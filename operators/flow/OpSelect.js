class   OpSelect
extends OperatorBase
{
    paramNumber;
    paramColor;

    paramIndex;



    constructor()
    {
        super(SELECT, 'select', 100);

        this.inert = true;


        this.addInput (new Input (LIST_TYPES));
        //this.addOutput(new Output([], this.output_genRequest));


        this.addParam(this.paramIndex = new NumberParam('index', 'index', true, true, false, 0, 0));

        this.paramIndex.control.allowEditDecimals = false;


        this.paramNumber = new NumberParam('value', '', false, false, false);
        this.paramColor  = new  ColorParam('value', '', false, false, false);


        // this.inputs[0].addEventListener('connect',    () => OpSelect_onConnectInput(this));
        // this.inputs[0].addEventListener('disconnect', () => OpSelect_onDisconnectInput(this));
    }



    output_genRequest(gen)
    {
        // 'this' is the output        

        return this.node.genRequest(gen);
    }



    genRequest(gen)
    {
        // 'this' is the node

        gen.scope.push({
            nodeId:  this.id, 
            paramId: '' });


        const [request, ignore] = this.genRequestStart(gen);
        if (ignore) return request;


        const input = this.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected) 
            request.push(...pushInputOrParam(input, gen));

        request.push(...this.paramIndex.genRequest(gen));

            
        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateValues(updateParamId, paramIds, values)
    {
        const val    = values[paramIds.findIndex(id => id == 'value' )];
        const length = values[paramIds.findIndex(id => id == 'length')];


        let paramValue = this.params.find(p => p.id == 'value');

        if (   paramValue
            && (  !val
                || paramValue.type != val.type))
            this.removeParam(paramValue);


        if (!paramValue && val) paramValue = this.addParamByType(val.type, 'value', false, false, true);
        if (length)             this.paramIndex.control.setMax(length.value-1);
  
        
        super.updateValues(updateParamId, paramIds, values);
    }
}