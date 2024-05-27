// class   OpRectangleExt
// extends OpShape
// {
//     paramT;
//     paramL;
//     paramR;
//     paramB;
//     paramRound;


    
//     constructor()
//     {
//         super(RECTANGLE_EXT, 'rectExt', 'rectangle', iconRectangle);

//         this.iconOffsetY = -1;
//         this.canDisable  = true;
        

//         this.addInput (this.createInputForObjects([RECTANGLE_VALUE], getNodeInputValuesForUndo));
//         this.addOutput(new Output([RECTANGLE_VALUE], this.output_genRequest));


//         this.addParam(this.paramT     = new NumberParam('top',    'top',    true, true, true,   0));
//         this.addParam(this.paramL     = new NumberParam('left',   'left',   true, true, true,   0));
//         this.addParam(this.paramR     = new NumberParam('right',  'right',  true, true, true, 100));
//         this.addParam(this.paramB     = new NumberParam('bottom', 'bottom', true, true, true, 100));
//         this.addParam(this.paramRound = new NumberParam('round',  'round',  true, true, true,   0, 0));


//         this.paramT.addEventListener('change', () => this.updateRound());
//         this.paramL.addEventListener('change', () => this.updateRound());
//         this.paramR.addEventListener('change', () => this.updateRound());
//         this.paramB.addEventListener('change', () => this.updateRound());


//         this.addBaseParamsAfter();
//         this.setAllParamDividers(0.5);
//     }



//     updateValues(requestId, actionId, updateParamId, paramIds, values)
//     {
//         const top    = values[paramIds.findIndex(id => id == 'top'   )];
//         const left   = values[paramIds.findIndex(id => id == 'left'  )];
//         const right  = values[paramIds.findIndex(id => id == 'right' )];
//         const bottom = values[paramIds.findIndex(id => id == 'bottom')];
//         const round  = values[paramIds.findIndex(id => id == 'round' )];

//         this.paramL    .setValue(left,   false, true, false);
//         this.paramT    .setValue(top,    false, true, false);
//         this.paramR    .setValue(right,  false, true, false);
//         this.paramB    .setValue(bottom, false, true, false);
//         this.paramRound.setValue(round,  false, true, false);
//     }



//     updateRound()
//     {
//         const min = Math.min(
//             this.paramR.value.value - this.paramL.value.value, 
//             this.paramB.value.value - this.paramT.value.value);

//         this.paramRound.controls[0].displayMin = 0;
//         this.paramRound.controls[0].displayMax = Math.abs(min/2);

//         this.paramRound.controls[0].update();
//     }
// }
