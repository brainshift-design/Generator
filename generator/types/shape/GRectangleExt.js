// class GRectangleExt
// extends GOperator
// {
//     input  = null;
    
//     top    = null;
//     left   = null;
//     right  = null;
//     bottom = null;

//     round  = null;

//     props  = null;



//     constructor(nodeId, options)
//     {
//         super(RECTANGLE_EXT, nodeId, options);
//     }



//     reset()
//     {
//         super.reset();

//         this.input  = null;
    
//         this.top    = null;
//         this.left   = null;
//         this.right  = null;
//         this.bottom = null;
//         this.round  = null;
    
//         this.props  = null;
//     }



//     copy()
//     {
//         const copy = new GRectangleExt(this.nodeId, this.options);

//         copy.copyBase(this);

//         if (this.input ) copy.input  = this.input .copy();

//         if (this.top   ) copy.top    = this.top   .copy();
//         if (this.left  ) copy.left   = this.left  .copy();
//         if (this.right ) copy.right  = this.right .copy();
//         if (this.bottom) copy.bottom = this.bottom.copy();
//         if (this.round ) copy.round  = this.round .copy();

//         if (this.props ) copy.props  = this.props .copy();

//         return copy;
//     }



//     paramFromId(paramId)
//     {
//         switch (paramId)
//         {
//             case 'top'   : return this.input ? this.value.top    : this.top;
//             case 'left'  : return this.input ? this.value.left   : this.left;
//             case 'right' : return this.input ? this.value.right  : this.right;
//             case 'bottom': return this.input ? this.value.bottom : this.bottom;
//             case 'round' : return this.input ? this.value.round  : this.round;
//             case 'props' : return this.input ? this.value.props  : this.props;
//         }

//         return super.paramFromId(paramId);
//     }



//     async eval(parse)
//     {
//         if (this.isCached())
//             return this;


//         const input  = await evalRectangleValue(this.input,  parse);
//         const top    = await evalNumberValue   (this.top,    parse);
//         const left   = await evalNumberValue   (this.left,   parse);
//         const right  = await evalNumberValue   (this.right,  parse);
//         const bottom = await evalNumberValue   (this.bottom, parse);
//         let   round  = await evalNumberValue   (this.round,  parse);
//         let   props  = await evalListValue     (this.props,  parse);

//         if (round && !round.isValid()) round = NumberValue.NaN();

//         if (   props
//             && STYLE_VALUES.includes(props.type))
//             props = new ListValue([props]);
        


//         if (input)
//         {
//             this.value        = input.toValue();
//             this.value.nodeId = this.nodeId;
//             this.value.copyCustomParams(input);
//             this.value.props = props ?? this.input.toValue().props;

//             if (left  )  this.value.x      = left;          else  left   = this.value.x;      
//             if (top   )  this.value.y      = top;           else  top    = this.value.y;      
//             if (right )  this.value.width  = right - left;  else  right  = this.value.x + this.value.width;
//             if (bottom)  this.value.height = bottom - top;  else  bottom = this.value.y + this.value.height;
//             if (round )  this.value.round  = round;         else  round  = this.value.round;
//             if (props)   this.value.props  = props;         else  props  = this.value.props;
//         }
//         else
//         {
//             this.value = new RectangleValue(
//                 this.nodeId, 
//                 left, 
//                 top, 
//                 right - left, 
//                 bottom - top, 
//                 round);

//             this.value.props = props;
//         }

       
//         this.setUpdateValues(parse, 
//         [
//             ['top',    top   ],
//             ['left',   left  ],
//             ['right',  right ],
//             ['bottom', bottom],
//             ['round',  round ]
//         ]);


//         await this.evalObjects(parse);


//         if (!this.top   ) this.top    = this.value.y     .copy();
//         if (!this.left  ) this.left   = this.value.x     .copy();
//         if (!this.right ) this.right  = new NumberValue(this.value.x.value + this.value.width .value, Math.max(this.value.x.decimals, this.value.width .decimals));
//         if (!this.bottom) this.bottom = new NumberValue(this.value.y.value + this.value.height.value, Math.max(this.value.y.decimals, this.value.height.decimals));
//         if (!this.round ) this.round  = this.value.round .copy();
//         if (!this.props ) this.props  = this.value.props .copy();


//         this.validate();

//         return this;
//     }



//     async evalObjects(parse, options = {})
//     {
//         if (!this.options.enabled)
//             return;
     
        
//         this.value.objects = [];


//         if (   this.value.x     .isValid()
//             && this.value.y     .isValid()
//             && this.value.width .isValid()
//             && this.value.height.isValid()
//             && this.value.round .isValid())
//         {
//             let   x = this.value.x     .value;
//             let   y = this.value.y     .value;
//             let   w = this.value.width .value;
//             let   h = this.value.height.value;
//             const r = Math.max(0, this.value.round.value);


//             [x, y, w, h, , ] = validateObjectRect(x, y, w, h);


//             if (   w != 0 
//                 && h != 0)
//             {
//                 const rect = new FigmaRectangle(
//                     this.nodeId,
//                     this.nodeId,
//                     this.nodeName,
//                     x, y, w, h, r);

//                 if (   this.value.props
//                     && this.value.props.isValid())
//                     addProps(rect, this.value.props);

//                 rect.createDefaultTransform(x, y);
//                 rect.createDefaultTransformPoints(x, y, w, h);

//                 this.value.objects.push(rect);
//             }
//         }

        
//         await super.evalObjects(parse);
//     }



//     isValid()
//     {
//         return super.isValid()
//             && (!this.input || this.input.isValid())
//             && this.top    && this.top   .isValid()
//             && this.left   && this.left  .isValid()
//             && this.right  && this.right .isValid()
//             && this.bottom && this.bottom.isValid()
//             && this.round  && this.round .isValid()
//             && this.props  && this.props .isValid();
//     }



//     pushValueUpdates(parse)
//     {
//         super.pushValueUpdates(parse);

//         if (this.input ) this.input .pushValueUpdates(parse);
//         if (this.top   ) this.top   .pushValueUpdates(parse);
//         if (this.left  ) this.left  .pushValueUpdates(parse);
//         if (this.right ) this.right .pushValueUpdates(parse);
//         if (this.bottom) this.bottom.pushValueUpdates(parse);
//         if (this.round ) this.round .pushValueUpdates(parse);
//         if (this.props ) this.props .pushValueUpdates(parse);
//     }



//     invalidateInputs(parse, from, force)
//     {
//         super.invalidateInputs(parse, from, force);

//         if (this.input ) this.input .invalidateInputs(parse, from, force);
//         if (this.top   ) this.top   .invalidateInputs(parse, from, force);
//         if (this.left  ) this.left  .invalidateInputs(parse, from, force);
//         if (this.right ) this.right .invalidateInputs(parse, from, force);
//         if (this.bottom) this.bottom.invalidateInputs(parse, from, force);
//         if (this.round ) this.round .invalidateInputs(parse, from, force);
//         if (this.props ) this.props .invalidateInputs(parse, from, force);
//     }



//     iterateLoop(parse)
//     {
//         super.iterateLoop(parse);

//         if (this.input ) this.input .iterateLoop(parse);
//         if (this.top   ) this.top   .iterateLoop(parse);
//         if (this.left  ) this.left  .iterateLoop(parse);
//         if (this.right ) this.right .iterateLoop(parse);
//         if (this.bottom) this.bottom.iterateLoop(parse);
//         if (this.round ) this.round .iterateLoop(parse);
//         if (this.props ) this.props .iterateLoop(parse);
//     }
// }