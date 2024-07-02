function createSystemPrompt()
{
    let prompt = '';


    prompt += 
          strline(0,`Each node has a "created" and "updated" value. These are UNIX timestamps.`)
        + strline(0);


    prompt += 
          strline(0,`Node parameter inputs and outputs are referenced by the parameter ID. For example, "nodeId.min", "nodeId.bias", "nodeId.amount".`)
        + strline(0,`Node header inputs are referenced by a string consisting of the prefix "h" followed by the index of the input or output. For example "nodeId.h0", "nodeId.h1", "nodeId.h2".`)
        + strline(0);


    prompt += 
          strline(0, `Number values are stored as "value,decimals". For example:`)
        + strline(1, `"1,0" represents 1`)
        + strline(1, `"1.23,0" represents 1`)
        + strline(1, `"1.23,1" represents 1.2`)
        + strline(1, `"1.23,2" represents 1.23`)
        + strline(1, `"1.23,3" represents 1.230`)
        + strline(0);

    prompt += 
          strline(0,`NaN values are represented with "?". A full unknown number value is represented by "?,?".`)
        + strline(0);
 

    prompt +=
          strline(0, `Nodes:`)
        + strline(0);


    // define compression dictionary
    // define format for nodes
    // define format for params


    let node;

    node = new OpRandom(); prompt += node.toPrompt();


    return prompt;
}



function createNodePrompt(node)
{
    let prompt = '';

    prompt +=
          strline(1, `Node Name: "${node.defName}"`)
        + strline(1, `Type: "${node.type}"`)
        + strline(1, `Description: ${node.getDescriptionPrompt()}`)
        + strline(1)
        + strline(1, `Parameters:`)
        + strline(1);

    node.params.forEach(p => 
        prompt += createParamPrompt(p));

    prompt +=
          strline(1, `Example JSON for "${node.type}" node: `)
        + strline(1)
        + strline(1, node.toJson())

        + strline(1)
        + strline(1);

    return prompt;
}



function createParamPrompt(param)
{
    let prompt = '';

    prompt +=
          strline(2, `Parameter Name: "${param.name}"`)
        + strline(2, `Type: "${param.type}"`)
        + strline(2, `Description: ${param.getDescriptionPrompt()}`)
        + strline(2,  param.toPrompt())
        + strline(2);

    return prompt;
}