// class   NumberControl
// extends ParamControl
// {
//     get value() { return this._control.value; }
//     set value(val) { this._control.setValue(val); }


//     input; 


//     constructor(name, 
//                 val = 0, 
//                 min = Number.MIN_SAFE_INTEGER, 
//                 max = Number.MAX_SAFE_INTEGER)
//     {
//         super('NUM');

//         this._control = document.createElement('div');
//         this.control.param = this;
//         this.control.zIndex = 0;

//         initSlider(
//             this.control,
//             100,  // width
//             20,   // height
//             name, 
//             min,
//             max,
//             val,  // default
//             0.01, // drag scale
//             1,    // wheel step
//             0,    // decimals
//             0,    // acceleration
//             '');  // suffix

//         this.div.appendChild(this.control);

//         this.input = new Input ('NUM');
//         this.input._param = this;
//         this.input.control.style.float     = 'left';
//         this.input.control.style.position  = 'absolute';
//         this.input.control.style.top       = '50%';
//         this.input.control.style.transform = 'translateY(-50%)';
//         this.div.appendChild(this.input.control);

//         // this._control.addEventListener('onchange', function(e)
//         // {
//         //     var op = this.param.op;

//         //     op.valid = false;

//         //     if (op.activeNodeInTree.output)
//         //         regenerate([op.activeNodeInTree.output]);
    
//         //     op.graph.mutex = true;            
//         // });
//     }
// }