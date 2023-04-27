// class   InputProxy
// extends EventTarget
// {
//     input = null;


//     types = []; // an input can accept multiple types


//     _node  = null; get node () { return this._param ? this._param.node : this._node; }
//     _param = null; get param() { return this._param; }


//     get id()   
//     { 
//         return this.node
//              ? this.node.getInputId(this)
//              : this.param
//                ? this.param.id
//                : '';     
//     }
    
//     get index() { return this.node.inputs.indexOf(this); }

    
//     colorLight;
//     colorDark;

//     wireColor;

    
//     div;
//     hitbox;
//     wireBall;


//     measureData = { divBounds: new Rect(0, 0, 0, 0) };


//     _connectedOutput = null;
    
//     get connectedOutput() { return this.input._connectedOutput; }
//     set connectedOutput(output)
//     {
//         if (this.input._connectedOutput)
//         {
//             this.input                 .dispatchEvent(new CustomEvent('disconnect', { detail: { input:  this.input   }}));
//             this.input._connectedOutput.dispatchEvent(new CustomEvent('disconnect', { detail: { output: output }}));
//         }

//         this.input._connectedOutput = output;

//         if (this.input._connectedOutput)
//         {
//             this.input.dispatchEvent(new CustomEvent('connect', { detail: { output: output, input: this.input }}));
//             output.dispatchEvent(new CustomEvent('connect', { detail: { output: output, input: this.input }}));
//         }
//     }


//     get connected() { return this.input.connectedOutput != null; }


//     canConnect         = true; // all connections master switch for minimum zoom
//     canAutoConnect     = true;
//     outputMustBeCached = false;


//     connection         = null;
           
//     connecting         = false;
//     mouseOver          = false;

//     overFactor         = 1.7;
           
    
//     initialSeed        = 0;
//     currentSeed        = 0;
       
       
//     isNew              = false; // this indicates that the input is the empty "new" input of a variable node


//     getValuesForUndo; // function pointer, return array of [index,value] tuples

//     getBackInitValue   = null;
    
//     feedback           = false; // sends data back to the output



//     constructor(input)//types, getValuesForUndo = null, getBackInitValue = null)
//     {
//         super();
        

//         this.types            = [...input.types];
//         this.getValuesForUndo = input.getValuesForUndo;
//         this.getBackInitValue = input.getBackInitValue;


//         this.div              = createDiv('input');
//         this.hitbox           = createDiv('inputHitbox');
//         this.wireBall         = createDiv('inputBall');
        
//         this.div.input        = this;
        
        
//         this.colorLight       = [0, 0, 0, 1];
//         this.colorDark        = [1, 1, 1, 1];

//         this.wireColor        = rgbFromType(this.types[0], true);

        
//         this.div.appendChild(this.hitbox);
//         this.div.appendChild(this.wireBall);


                
//         this.hitbox.addEventListener('pointerenter', e => 
//         {
//             if (!this.canReact(e))
//                 return;


//             if (graphView.headerInput)
//             {
//                 graphView.headerInput.updateControl();
//                 graphView.headerInput = null;
//                 //console.log('headerInput = ', graphView.headerInput);
//             }

            
//             let savedInput = 
//                 graphView.savedConn
//                 ? graphView.savedConn.input
//                 : null;

                
//             this.mouseOver = true;
//             this.updateControl();


//             const tc = graphView.tempConn;

//             if (   tc
//                 && tc.output
//                 && this.canConnectFrom(tc.output)
//                 && (  !this.connected
//                     || this.connectedOutput != tc.output
//                     || this == savedInput))
//             {
//                 const rect = boundingRect(this.div);
//                 const loop = tc.output.node.isOrFollows(this.node);

//                 if (!loop)
//                 {
//                     tc.wire.inputPos = point(
//                         rect.x + rect.w/2,
//                         rect.y + rect.h/2 - getTopHeight());
//                 }

//                 graphView.overInput = !loop ? this : null;
//                 this.node.inputs.forEach(i => i.updateControl());
//             }
//             else if (!tc
//                    ||    tc.output
//                       && this.canConnectFrom(tc.output))
//                 graphView.overInput = this;
//         });

        

//         this.hitbox.addEventListener('pointerdown', e => 
//         { 
//             if (!this.canReact(e)) 
//                 return false; 
//         });



//         this.hitbox.addEventListener('pointerleave', e => 
//         {
//             this.endConnection();
//         });
//     }



//     endConnection()
//     {
//         graphView.overInput = null;

//         this.mouseOver = false;
//         this.updateControl();

//         if (   graphView.tempConn
//             && graphView.tempConn.output)
//             graphView.tempConn.wire.inputPos = point_NaN;
//     }



//     canReact(e)
//     {
//         if (   settings.enableZoomedOutParams
//             || graph.currentPage.zoom > settings.minZoomForParams)
//             return true;

//         e.preventDefault();
//         e.stopPropagation();

//         forwardEvent(e, this.node ? this.node.header : this.param.node.header);

//         return false;
//     }



//     updateMeasureData()
//     {
//         this.measureData = 
//         {
//             divBounds: boundingRect(this.div)
//         };
//     }


    
//     // updateColor()
//     // {
//     //     this.colorDark = rgbFromTypeMode(
//     //         !isEmpty(this.types) 
//     //         ? this.types[0] 
//     //         : NUMBER_VALUE, 
//     //         true);

//     //     this.colorLight = rgbFromTypeMode(
//     //         !isEmpty(this.types) 
//     //         ? this.types[0] 
//     //         : NUMBER_VALUE, 
//     //         false);
//     // }



//     updateControl()
//     {
//         const tc = graphView.tempConn;

//         const mouseOver =
//                this.mouseOver
//             && !(   tc 
//                  && tc.input)
//             && !(   tc
//                  && tc.output
//                  && (  !this.canConnectFrom(tc.output)
//                      || tc.output.node.isOrFollows(this.node)));

//         const color = 
//                this.param
//             && this.param.type != COLOR_VALUE
//             && this.param.type !=  FILL_VALUE
//             ? rgb_a(rgbFromType(this.param.type, true), 0.5)
//             : (darkMode
//                ? this.colorDark
//                : this.colorLight);

//         const colorStyle = 
//             rgba2style(rgb_a(
//                 color,
//                 mouseOver 
//                 ? (tc ? tc.wire.color : Math.min(color[3] * this.overFactor, 1))
//                 : color[3]));


//         const isConnected =
//                this.connected
//             ||     tc
//                && (   tc.input == this
//                    ||    graphView.overInput == this
//                       && !tc.input)
//                && !(    tc.output
//                     && !this.canConnectFrom(tc.output));

//         this.div.style.transform = 
//               'translateX(' + (isConnected ? -1 : 0) + 'px)'
//             + 'translateY(-50%)';
        
//         this.div.style.width                = (isConnected ? 8 : 6) + 'px';
//         this.div.style.height               = (isConnected ? 8 : 6) + 'px';
//         this.div.style.borderRadius         = (isConnected ? 4 : 4) + 'px';
//         this.div.style.marginBottom         = (isConnected ? 4 : 6) + 'px';
//         this.div.style.boxShadow            = '0 0 0 1px ' + colorStyle;
//         this.div.style.pointerEvents        = 'auto';

//         this.hitbox.style.left              = isConnected ? -2 : -3;
//         this.hitbox.style.top               = isConnected ? -2 : -3;

//         this.wireBall.style.left            = '1px';
//         this.wireBall.style.top             = 'calc(50% - 3px)';

//         this.wireBall.style.backgroundColor = [255, 0, 255];

//         this.wireBall.style.zIndex          = MAX_INT32;


//         showElement(this.wireBall, isConnected); 
//     }



//     supportsTypes(types)
//     {
//         return this.types.includes(ANY_VALUE)
//              ? true
//              : arraysIntersect(this.types, types);
//     }



//     canConnectFrom(output)
//     {
//         if (   output.supportsTypes([ANY_VALUE])
//             && this.types[0] != ANY_VALUE)
//             return false;

//         if (   !this.canConnect
//             || !this.supportsTypes(output.types))
//             return false;

//         if (    this.outputMustBeCached 
//             && !output.node.isCached())
//             return false;

//         if (output.node.isOrFollows(this.node))
//             return false;


//         return true;
//     }



//     isConnectedUncached()
//     {
//         return  this.connected 
//             && !this.connectedOutput.node.isCached();
//     }



//     toJsDef(gen)
//     {
//         let js = '';


//         js += gen.NL + 'const ' + this.name + ' = ';

//         js += 
//             this.connected
//             ? this.connectedOutput.toJsCode(gen)
//             : this.param
//                 ? this.param.toJsCode(gen)
//                 : 'Number.NaN';
                
//         js += ';';


//         return js;
//     }
// }