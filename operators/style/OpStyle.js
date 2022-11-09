class   OpStyle
extends OpColorBase
{
    constructor()
    {
        super(STYLE, 'style');


        this.addInput (new Input([...LIST_TYPES, ...COLOR_TYPES, ...STYLE_TYPES]), this.input_getValuesForUndo);
        this.addOutput(new Output([LIST_VALUE], this.output_genRequest));
    }
}