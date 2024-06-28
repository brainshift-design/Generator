function createSystemPrompt()
{
    let prompt = '';


    prompt += 
          strline(0,`Each node has a "created" and "updated" value. These are UNIX timestamps.`)
        + strline(0);


    prompt += 
          strline(0,`Node parameter inputs and outputs are referenced by the parameter ID. For example, "nodeId.min", "nodeId.bias", "nodeId.amount".`)
        + strline(0,`Node header inputs are referenced by a string consisting of the prefix "h" followed by the index of the input or output. For example "nodeId.h0", "nodeId.h1", "nodeId.h2".`);
        + strline(0);


    prompt += 
          strline(0, `Number values are stored as value,decimals. For example:`)
        + strline(1, `1,0 = 1`)
        + strline(1, `1.23,0 = 1`)
        + strline(1, `1.23,1 = 1.2`)
        + strline(1, `1.23,2 = 1.23`)
        + strline(1, `1.23,3 = 1.230`)
        + strline(0);


    let node;

    node = new OpRandom(); prompt += '\n\n' + node.toPrompt().trim();


    return prompt;
}



function createNodePrompt(node, description, nodeParams)
{
    let prompt = '';

    prompt +=
          strline(0, `Node:`, true)
        + strline(0)

        + strline(1, `Name: ${node.defName}`)
        + strline(1, `Type: ${node.type}`)
        + strline(1)
        + strline(1, `Description: ${description}`)
        + strline(1)
        + strline(1, `Parameters:`)
        + strline(1);

    nodeParams.forEach(np => 
        prompt += createParamPrompt(np[0], np[1]));

    prompt +=
          strline(1, `Sample JSON: `)
        + strline(1)
        + strline(2, node.toJson())

        + strline(0)
        + strline(0);

    return prompt;
}



function createParamPrompt(param, description)
{
    let prompt = '';

    prompt +=
          strline(2, `Name: ${param.name}`)
        + strline(2, `type: ' + this.type`)
        + strline(2, `Description: ${description}`)
        + strline(2,  param.toPrompt())
        + strline(2);

    return prompt;
}