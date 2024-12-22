class   OpTextToColor
extends OperatorBase
{
    static { Operator.types[TEXT_TO_COLOR] = this; }



    paramFormat;


    _color = dataColor_NaN;



    constructor()
    {
        super(TEXT_TO_COLOR, 'textToColor', 'text to color', iconTextToColor);

        this.outputValueType = TEXT_VALUE;

        
        this.colorBack = createDiv('colorBack');
        this.inner.insertBefore(this.colorBack, this.paramHolder);


        this.addInput(new Input([TEXT_VALUE, TEXT_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([COLOR_VALUE], this.output_genRequest));
    
        this.addParam(this.paramFormat = new OptionParam('format', 'format', false, true,  true, ['Hex', 'RGB 0 – 1', 'RGB 0 – 255', 'HTML name', 'structured name']));

        this.paramFormat.controls[0].textValues =
        [
            [ 0, 'hex'                          ],
            [ 1, 'rgb 1',      'rgb 0-1'        ],
            [ 2, 'rgb 255',    'rgb 0-255'      ],
            [ 3, 'css hex'                      ],
            [ 4, 'css rgb'                      ],
            [ 5, 'css hsl'                      ],
            [ 6, 'css oklch'                    ],
            [ 7, 'css lch'                      ],
            [ 8, 'css oklab'                    ],
            [ 9, 'css lab'                      ],
            [10, 'css color'                    ],
            [11, 'html',       'html name'      ],
            [12, 'structured', 'structured name']
        ];
    }



    output_genRequest(gen)
    {
        // 'this' is the output

        gen.scope.push({
            nodeId:  this.node.id, 
            paramId: NULL });

        const [request, ignore] = this.node.genRequestStart(gen);
        if (ignore) return request;

        
        const input = this.node.inputs[0];


        request.push(input.connected ? 1 : 0);
        
        if (input.connected)
            request.push(...pushInputOrParam(input, gen));

        
        request.push(...this.node.paramFormat.genRequest(gen));


        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const value = values[paramIds.findIndex(id => id == 'value')];
        const type  = values[paramIds.findIndex(id => id == 'type' )];

        this._color = 
               value
            && value.type == COLOR_VALUE
            ? value.toDataColor()
            : dataColor_NaN;

        if (type)
            this.headerOutputs[0].types = [type.value];

        if (this.hasConditionOutputs())
            this.headerInputs[0].types = [ANY_VALUE];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }
}