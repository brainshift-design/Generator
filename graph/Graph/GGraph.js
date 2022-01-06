// class GGraph
// {
//     nodes = [];

//     mutex = false;

//     deferNodes = [];

    

//     clear()
//     {
//         this.notes = [];
//     }



//     createNode(opType, id, name)
//     {
//         let node;

//         switch (opType)
//         {
//             case 'number': node = new GOpNumber(); break;
//             case 'add':    node = new GOpAdd();    break;
//             case 'color':  node = new GOpColor();  break;
//             case 'random': node = new GOpRandom(); break;
//             case 'rect':   node = new GOpRect();   break;
//             case 'row':    node = new GOpRow();    break;
//             case 'column': node = new GOpColumn(); break;
//             case 'spread': node = new GOpSpread(); break;
//         }
        
//         node.id   = id;
//         node.name = name;

//         this.addNodes([node]);

//         return node;
//     }



//     addNodes(nodes)
//     {
//         for (const node of nodes)
//         {
//             node.graph = this;
//             this.nodes.push(node);
//         }
//     }
    


//     deleteNodes(nodeIds)
//     {
//         let deleted = []; // this array of deleted notes will be put in a list for undo


//         for (const nodeId of nodeIds)
//         {
//             const node = this.nodes.find(n => n.id == nodeId);

//             for (const input of node.inputs)
//                 if (input.isConnected) this.disconnect(input);

//             if (!!node.output)
//             {
//                 for (const input of node.output.connectedInputs)
//                     this.disconnect(input);
//             }

//             node.graph = null;
//             removeFromArray(this.nodes, node);

//             deleted.push(node);
//         }


//         return deleted;
//     }



//     connect(output, input)
//     {
//         if (input.connectedOutput == output)
//             return false;
            
//         if (input.connectedOutput != null)
//             this.disconnect(input);

//         output.connect(input);

//         input.connectedOutput = output;

//         const conn = new GConnection(output, input);

//         input .connection = conn;
//         output.connection = conn;
        
//         input.op.valid = false;

//         return true;
//     }



//     disconnect(input)
//     {
//         var output = input.connectedOutput;
//         if (!output) return false;

//         if (!!input.param)
//             input.param.value = input.data.value;

//         output.disconnect(input);
        
//         input .connection     = null;
//         output.connection     = null;

//         input.connectedOutput = null;

//         output.op.valid = false;
//         input .op.valid = false;
            
//         return true;
//     }



//     nodeFromId(id)
//     {
//         return this.nodes.find(n => n.id === id);
//     }
// }