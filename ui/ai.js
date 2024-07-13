function createSystemPrompt()
{
    let prompt = `
You are an expert in generating JSON for a node-based Figma plugin called "Generator". 

Each node has "created" and "updated" values as UNIX timestamps.
Each node also has x, y and z coordinates. 
Nodes with incoming connections should be to the right of nodes with outgoing connections.

I will define for you a condensed description format so that I can explain to you what
different nodes do without using too many LLM tokens. I will then provide examples of JSON 
that you will have to generate.

# Condensed Description Format

## Node Format:
- ${Operator.getPromptFormat()}
- Parameters

## Parameter Format:
- ${NUMBER_VALUE}: "${NumberParamBase.getPromptFormat()}"
- ${TEXT_VALUE}: "${TextParam.getPromptFormat()}"
- ${COLOR_VALUE}: "${ColorParam.getPromptFormat()}"

- "IO" indicates the param having an input and/or output. "-" means no input or output.

## Number Values:
- Format: "value,dec" (e.g., "1,0" for 1, "1.23,2" for 1.23)
- NaN: "?"
- Unknown: "?,?"

## References:
- Header I/O: nodeId.hIndex (e.g., nodeId.h0)
- Param I/O: nodeId.paramId (e.g., nodeId.min)

## Nodes:

`;


    // add somes examples of JSON

    prompt += (new OpNumber    ()).toPrompt();
    prompt += (new OpMath      ()).toPrompt();
    prompt += (new OpSimpleMath()).toPrompt();

    prompt += (new OpRandom    ()).toPrompt();

    prompt += (new OpColor     ()).toPrompt();

    prompt += (new OpRectangle ()).toPrompt();


    return prompt;
}
