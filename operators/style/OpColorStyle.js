class   OpColorStyle
extends OpColorBase
{
    constructor()
    {
        super(COLOR_STYLE, 'style');

        this.addInput(new Input(COLOR_TYPES));
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


        gen.scope.pop();
        pushUnique(gen.passedNodes, this);

        return request;
    }



    updateHeader()
    {
        super.updateHeader();

        this.div   .style.borderRadius = '4px';        
        this.inner .style.borderRadius = '4px';        
        this.header.style.borderRadius = '4px';        
    }
}