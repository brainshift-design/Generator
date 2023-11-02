class   OpFontName
extends OperatorBase
{
    paramIndex;



    constructor()
    {
        super(FONT_NAME, 'fontName', 'font name', iconFontName);


        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramIndex = new NumberParam('index', 'index', true,  true,  true, figUniqueFontNames.indexOf('Inter'), 0, figUniqueFontNames.length-1));
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        request.push(0);
        

        request.push(...this.node.paramIndex.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }
}