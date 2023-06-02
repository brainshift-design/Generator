class   OpDefine
extends ResizableBase
{
    paramValues;



    constructor()
    {
        super(NUMBER_DEFINE, 'define', 'define', iconArray);

        this.cached      = false;
        this.iconOffsetY = 1;

        
        this.addOutput(new Output([NUMBER_VALUE], this.output_genRequest));

        this.addParam(this.paramValues = new TextParam('values', 'values', true, true));
    }



    setSize(w, h, updateTransform = true)
    {
        super.setSize(w, h, updateTransform);
        this.updateValueParam();
    }



    setRect(x, y, w, h, updateTransform = true)
    {
        super.setRect(x, y, w, h, updateTransform);
        this.updateValueParam();
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(...this.node.paramValues.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateParams()
    {
        super.updateParams();

        this.updateValueParam();
    }



    updateValueParam()
    {
        this.paramValues.controls[0].setSize(
            this.div.offsetWidth,
            this.div.offsetHeight - Math.max(defHeaderHeight, this.header.offsetHeight));
    }
}
