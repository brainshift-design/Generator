function createSystemPrompt()
{
    let prompt = `
This is a condensed description format to compactly explain what different nodes do 
without using too many LLM tokens. Examples of JSON to generate are also provided.

# Condensed Description Format

## Node Format:
${Operator.getPromptFormat()}
    Parameters

## Parameter Format:
- ${NUMBER_VALUE}: "${NumberParamBase.getPromptFormat()}"
- ${TEXT_VALUE}: "${TextParam.getPromptFormat()}"
- ${COLOR_VALUE}: "${ColorParam.getPromptFormat()}"

- "IO" indicates the param having an input and/or output. "-" means no input or output.
- a parameter is only specified if its value differ from the default

## Number Values:
- Format: "value,dec" (e.g., "1,0" for 1, "1.23,2" for 1.23)
- NaN: "?"
- Unknown: "?,?"

## References:
- Header I/O: nodeId.hIndex (e.g., nodeId.h0)
- Param I/O: nodeId.paramId (e.g., nodeId.min)

## Connections:

Nodes are connected to each other by any number of connections. All connections are from left to right,
from output to input. Typically a node's important output will be in the header, but sometimes it might
be necessary to use somewhere downstream the output of a parameter.

Typically nodes with connected inputs should be to the right of the nodes with connected outputs.

## Nodes:

`;


    // add somes examples of JSON

    prompt += (new OpNumber    ()).toPrompt();
    prompt += (new OpMath      ()).toPrompt();
    prompt += (new OpSimpleMath()).toPrompt();

    prompt += (new OpSequence  ()).toPrompt();
    prompt += (new OpRange     ()).toPrompt();
    prompt += (new OpRandom    ()).toPrompt();
    prompt += (new OpNoise     ()).toPrompt();

    prompt += (new OpColor     ()).toPrompt();

    prompt += (new OpRectangle ()).toPrompt();
    prompt += (new OpEllipse   ()).toPrompt();
    prompt += (new OpPolygon   ()).toPrompt();

    prompt += (new OpCombine   ()).toPrompt();

    prompt += (new OpRepeat    ()).toPrompt();


    prompt += `

## Example generated JSON:
`;


    const promptExamples = userTemplates.filter(t => t.name.includes('LLM training'));

    for (const ex of promptExamples)
    {
        prompt += `
### ${ex.name.split('/').splice(1).join('/')}

${ex.graph}
`;
    }


    return prompt;
}



function uiCopySystemPrompt()
{
    const prompt = createSystemPrompt();

    //console.log(prompt);
    writeTextToClipboard(prompt);

    uiNotify('Copied LLM system prompt');
}