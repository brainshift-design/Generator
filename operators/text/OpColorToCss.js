class   OpColorToCss
extends OperatorBase
{
    paramFormat;
    paramPercent;
    paramTrimZeros;


    menuPercent;
    menuTrimZeros;



    constructor()
    {
        super(COLOR_TO_CSS, 'colToCss', 'color → CSS', iconColorToCss);

        this.outputValueType = COLOR_VALUE;


        this.addInput (new Input([COLOR_VALUE, FILL_VALUE, COLOR_LIST_VALUE, FILL_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramFormat    = new OptionParam('format',    'format',     false, true, true, ['# hex', 'rgb ()', 'hsl ()', 'oklch ()', 'lch ()', 'oklab()', 'lab()', 'color ()', 'HTML name']));
        this.addParam(this.paramPercent   = new NumberParam('percent',   'percent',    true,  true, true, 0, 0, 1));
        this.addParam(this.paramTrimZeros = new NumberParam('trimZeros', 'trim zeros', true,  true, true, 0, 0, 1));

        this.paramFormat.separatorsBefore.push(1, 4, 7, 10, 13, 14, 16, 18, 20, 21);

        this.paramFormat.controls[0].textValues =
        [
            [0, 'hex',   '#hex'     ],
            [1, 'rgb',   'rgb()'    ],
            [2, 'hsl',   'hsl()'    ],
            [3, 'oklch', 'oklch()'  ],
            [4, 'lch',   'lch()'    ],
            [5, 'oklab', 'oklab()'  ],
            [6, 'lab',   'lab()'    ],
            [7, 'color', 'color()'  ],
            [8, 'name',  'html name']
        ];

        this.paramPercent  .divider = 0.62;
        this.paramTrimZeros.divider = 0.62;
        
        this.menuPercent   = createBoolMenu(this.paramPercent  );
        this.menuTrimZeros = createBoolMenu(this.paramTrimZeros);
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

        request.push(...this.node.paramFormat   .genRequest(gen));
        request.push(...this.node.paramPercent  .genRequest(gen));
        request.push(...this.node.paramTrimZeros.genRequest(gen));

        
        gen.scope.pop();
        pushUnique(gen.passedNodes, this.node);

        return request;
    }



    updateValues(requestId, actionId, updateParamId, paramIds, values)
    {
        const type = values[paramIds.findIndex(id => id == 'type')];

        if (type) 
            this.headerOutputs[0].types = [type.value];

            
        if (this.hasConditionOutputs())
            this.headerInputs[0].types = [ANY_VALUE];


        super.updateValues(requestId, actionId, updateParamId, paramIds, values);
    }



    updateParams()
    {
        this.paramFormat   .enableControlText(true, this.paramFormat.isUnknown());
        this.paramPercent  .enableControlText(true);
        this.paramTrimZeros.enableControlText(true);

        updateParamConditionText(this.paramPercent,   this.paramPercent  .isUnknown(), false, 1);
        updateParamConditionText(this.paramTrimZeros, this.paramTrimZeros.isUnknown(), false, 1);

        this.updateParamControls();
    }
}