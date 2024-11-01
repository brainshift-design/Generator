const schemeIcons =
[
    iconSchemeLessSimilar,
    iconSchemeSimilar,
    iconSchemeSimilarWithAccent,
    iconSchemeOpposite,
    iconSchemeOppositeMinus,
    iconSchemeOppositePlus,
    iconSchemeOppositeSplit,
    iconSchemeTriangle,
    iconSchemeDoubleOppositeMinus,
    iconSchemeRectangleMinus,
    iconSchemeRectanglePlus,
    iconSchemeDoubleOppositePlus,
    iconSchemeSquare,
    iconSchemeHexagon                   
];



class   OpColorScheme
extends OperatorBase
{
    paramType;
    paramSpace;

    symbol;



    constructor()
    {
        super(COLOR_SCHEME, 'scheme', 'scheme', NULL);

        this.subscription = true;
        this.iconOffsetY  = -1;

        
        this.addInput (new Input ([COLOR_VALUE, FILL_VALUE, COLOR_STOP_VALUE]));
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));

        this.alwaysSaveParams = true;

        
        this.addParam(this.paramType  = new OptionParam('schemeType', '',      false, true, true, ['less similar', 'similar', 'similar with accent', 'opposite', 'opposite -', 'opposite +', 'opposite split', 'triangle', 'double opposite -', 'rectangle -', 'rectangle +', 'double opposite +', 'square', 'hexagon'], 0));
        this.addParam(this.paramSpace = new OptionParam('space',      'space', false, true, true, ['HSL', 'HCL / ok', 'HCL / ab', 'HCL / uv'], 0));


        this.header.connectionPadding = 18;


        this.symbol = createDiv('colorSchemeSymbol');

        this.header.appendChild(this.symbol);
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });


        const [request, ignore] = this.node.genRequestStart(gen, 0);
        if (ignore) return request;


        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);

        if (input.connected)
            request.push(...pushInputOrParam(input, gen));


        request.push(...this.node.paramType .genRequest(gen));
        request.push(...this.node.paramSpace.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type) 
            this.headerOutputs[0].types = [type.value];

        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateHeader()
    {
        super.updateHeader();


        const colors = this.getHeaderColors();


        let symbol = '';

        switch (this.paramType.value.value)
        {
            case  0: symbol = iconSchemeLessSimilar;         break;
            case  1: symbol = iconSchemeSimilar;             break;
            case  2: symbol = iconSchemeSimilarWithAccent;   break;
            case  3: symbol = iconSchemeOpposite;            break;
            case  4: symbol = iconSchemeOppositeMinus;       break;
            case  5: symbol = iconSchemeOppositePlus;        break;
            case  6: symbol = iconSchemeOppositeSplit;       break;
            case  7: symbol = iconSchemeTriangle;            break;
            case  8: symbol = iconSchemeDoubleOppositeMinus; break;
            case  9: symbol = iconSchemeRectangleMinus;      break;
            case 10: symbol = iconSchemeRectanglePlus;       break;
            case 11: symbol = iconSchemeDoubleOppositePlus;  break;
            case 12: symbol = iconSchemeSquare;              break;
            case 13: symbol = iconSchemeHexagon;             break;
        }


        symbol = symbol.replaceAll('white', rgba2style(colors.text));


        this.symbol.innerHTML = symbol;
    }



    updateHeaderLabel()
    {
        super.updateHeaderLabel();
        
        this.label.style.top = '60%';
    }



    isConnected()
    {
        return this.inputs[0].connected;
    }
}