class GCondition
extends GNumberType
{
    input0 = null;
    input1 = null;

    operation;



    constructor(nodeId, options)
    {
        super(NUMBER_CONDITION, nodeId, options);
    }


    
    copy()
    {
        const cond = new GCondition(this.nodeId, this.options);

        cond.copyBase(this);

        if (this.input0) cond.input0 = this.input0.copy();
        if (this.input1) cond.input1 = this.input1.copy();

        cond.operation = this.operation.copy();

        return cond;
    }



    eval(parse)
    {
        if (this.isCached())
            return this;


        const op = this.operation.eval(parse).toValue();

        op.value = Math.min(Math.max(0, op.value), CONDITION_OPS.length-1);

        
        if (   this.input0 
            && this.input1)
        {
            const val0 = this.input0.eval(parse).toValue();
            const val1 = this.input1.eval(parse).toValue();

            switch (op.value)
            {
                case CONDITION_EQUAL:             this.value = evalConditionInputsEqual         (val0, val1);  break;
                case CONDITION_NOT_EQUAL:         this.value = evalConditionInputsNotEqual      (val0, val1);  break;
                case CONDITION_LESS:              this.value = evalConditionInputsLess          (val0, val1);  break;
                case CONDITION_LESS_OR_EQUAL:     this.value = evalConditionInputsLessOrEqual   (val0, val1);  break;
                case CONDITION_GREATER:           this.value = evalConditionInputsGreater       (val0, val1);  break;
                case CONDITION_GREATER_OR_EQUAL:  this.value = evalConditionInputsGreaterOrEqual(val0, val1);  break;
            }
        }
        else if (this.input0)
        {
            this.input0.eval(parse).toValue();

            switch (op.value)
            {
                case CONDITION_EQUAL:             
                case CONDITION_LESS_OR_EQUAL:     
                case CONDITION_GREATER_OR_EQUAL: this.value = new NumberValue(1); break;
                default:                         this.value = new NumberValue(0); break;
            }
        }
        else if (this.input1) 
        {
            this.input1.eval(parse).toValue();

            switch (op.value)
            {
                case CONDITION_EQUAL:             
                case CONDITION_LESS_OR_EQUAL:     
                case CONDITION_GREATER_OR_EQUAL: this.value = new NumberValue(1); break;
                default:                         this.value = new NumberValue(0); break;
            }
        }
        else                  
            this.value = NumberValue.NaN;


        genPushUpdateValue(parse, this.nodeId, 'operation', op);
        genPushUpdateValue(parse, this.nodeId, 'value',     this.value);


        this.validate();

        return this;
    }
}



function evalConditionInputsEqual         (val0, val1) { return new NumberValue(val0.value == val1.value ? 1 : 0); }
function evalConditionInputsNotEqual      (val0, val1) { return new NumberValue(val0.value != val1.value ? 1 : 0); }
function evalConditionInputsLess          (val0, val1) { return new NumberValue(val0.value <  val1.value ? 1 : 0); }
function evalConditionInputsLessOrEqual   (val0, val1) { return new NumberValue(val0.value <= val1.value ? 1 : 0); }
function evalConditionInputsGreater       (val0, val1) { return new NumberValue(val0.value >  val1.value ? 1 : 0); }
function evalConditionInputsGreaterOrEqual(val0, val1) { return new NumberValue(val0.value >= val1.value ? 1 : 0); }