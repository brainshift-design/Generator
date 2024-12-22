class   OpColorToText
extends OperatorBase
{
    static { Operator.types[COLOR_TO_TEXT] = this; }



    paramFormat;
    paramNormalize;
    paramTrimZeros;


    menuNormalize;
    menuTrimZeros;



    constructor()
    {
        super(COLOR_TO_TEXT, 'colToText', 'color → text', iconColorToText);

        this.outputValueType = COLOR_VALUE;


        this.addInput (new Input ([COLOR_VALUE, FILL_VALUE, COLOR_LIST_VALUE, FILL_LIST_VALUE, LIST_VALUE]));
        this.addOutput(new Output([TEXT_VALUE], this.output_genRequest));

        this.addParam(this.paramFormat    = new OptionParam('format',    'format',     false, true, true, ['Hex', 'RGB', 'HSL', 'HSB', 'HCL / ok', 'HCL / ab', 'HCL / uv', 'okLab', 'Lab', 'Luv', 'XYZ', 'XYZ / D50', 'XYZ / D65', 'color name']));
        this.addParam(this.paramNormalize = new NumberParam('normalize', 'normalize',  true,  true, true, 0, 0, 1));
        this.addParam(this.paramTrimZeros = new NumberParam('trimZeros', 'trim zeros', true,  true, true, 0, 0, 1));

        this.paramFormat.separatorsBefore.push(1, 4, 7, 10, 13);

        this.paramFormat.controls[0].textValues =
        [
            [ 0, 'hex'                              ],

            [ 1, 'rgb'                              ],
            [ 2, 'hsl'                              ],
            [ 3, 'hsb'                              ],

            [ 4, 'hclok', 'hcl/ok', 'oklch', 'okhcl'],
            [ 5, 'hclab', 'hcl/ab'                  ],
            [ 6, 'hcluv', 'hcl/uv'                  ],

            [ 7, 'oklab'                            ],
            [ 8, 'lab'                              ],
            [ 9, 'luv'                              ],

            [10, 'xyz'                              ],
            [11, 'xyz/d50',   'xyzd50', 'xyz50'     ],
            [12, 'xyz/d65',   'xyzd65', 'xyz65'     ],

            [13, 'name', 'color name'               ]
        ];

        this.paramNormalize.divider = 0.64;
        this.paramTrimZeros.divider = 0.64;
        
        this.menuNormalize = createBoolMenu(this.paramNormalize);
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
        request.push(...this.node.paramNormalize.genRequest(gen));
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
        this.paramNormalize.enableControlText(true);
        this.paramTrimZeros.enableControlText(true);

        updateParamConditionText(this.paramNormalize, this.paramNormalize.isUnknown(), false, 1);
        updateParamConditionText(this.paramTrimZeros, this.paramTrimZeros.isUnknown(), false, 1);

        this.updateParamControls();
    }
}