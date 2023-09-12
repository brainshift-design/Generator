
function genParseTextValue(parse)
{
    parse.pos++; // tag

    const val = parse.move();

    if (parse.settings.logRequests) 
        logReqValue(TEXT_VALUE, val, parse);

    return parseTextValue(val)[0];
}



function genParseText(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const text = new GText(nodeId, options);

    
    if (parse.settings.logRequests) 
        logReq(text, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, text);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;
    parse.inParam = false;


    if (parse.next == TEXT_VALUE) text.value = genParse(parse);
    else                          text.input = genParse(parse);


    parse.nTab--;


    genParseNodeEnd(parse, text);
    return text;
}



function genParseTextLength(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const len = new GTextLength(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(len, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, len);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        len.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, len);
    return len;
}



function genParseTextTrim(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const trim = new GTextTrim(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(trim, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, trim);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        trim.input = genParse(parse);

    trim.start = genParse(parse);
    trim.end   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, trim);
    return trim;
}



function genParseTextSubstring(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const sub = new GTextSubstring(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(sub, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, sub);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        sub.input = genParse(parse);

    sub.start = genParse(parse);
    sub.end   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, sub);
    return sub;
}



function genParseTextContains(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cont = new GTextContains(nodeId, options);
   

    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(cont, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cont);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        cont.input0 = genParse(parse);
        cont.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        cont.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }
  
    
    parse.nTab--;


    genParseNodeEnd(parse, cont);
    return cont;
}



function genParseTextCase(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const _case = new GTextCase(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(_case, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, _case);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        _case.input = genParse(parse);

    _case.case = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, _case);
    return _case;
}



function genParseTextReplace(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const replace = new GTextReplace(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(replace, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, replace);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        replace.input = genParse(parse);

    replace.what  = genParse(parse);
    replace.with  = genParse(parse);
    replace.regex = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, replace);
    return replace;
}




// function genParseTextRegex(parse)
// {
//     const [, nodeId, options, ignore] = genParseNodeStart(parse);


//     const regex = new GTextRegex(nodeId, options);
   

//     let nInputs = -1;
    
//     if (!ignore)
//     {
//         nInputs = parseInt(parse.move());
//         consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
//     }

    
//     if (parse.settings.logRequests) 
//         logReq(regex, parse, ignore, nInputs);


//     if (ignore) 
//     {
//         genParseNodeEnd(parse, regex);
//         return parse.parsedNodes.find(n => n.nodeId == nodeId);
//     }


//     parse.nTab++;


//     if (nInputs == 1)
//         regex.input = genParse(parse);

//     regex.pattern = genParse(parse);
//     regex.what    = genParse(parse);
//     regex.with    = genParse(parse);

    
//     parse.nTab--;


//     genParseNodeEnd(parse, regex);
//     return regex;
// }




function genParseTextJoin(parse, newNode)
{
    const [type, nodeId, options, ignore] = genParseNodeStart(parse);


    const join = new GTextJoin(nodeId, options);


    let nInputs = 0;
    
    if (!ignore)
        nInputs = parseInt(parse.move());


    if (parse.settings.logRequests) 
        logReq(join, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, join);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    for (let i = 0; i < nInputs; i++)
        join.inputs.push(genParse(parse));


    join.with = genParse(parse);

    
    parse.nTab--;

        
    genParseNodeEnd(parse, join);
    return join;
}



function genParseTextPad(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const pad = new GTextPad(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(pad, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, pad);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        pad.input = genParse(parse);

    pad.startPad   = genParse(parse);
    pad.startCount = genParse(parse);
    pad.endPad     = genParse(parse);
    pad.endCount   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, pad);
    return pad;
}



function genParseTextCompare(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cmp = new GTextCompare(nodeId, options);
   

    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(cmp, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cmp);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        cmp.input0 = genParse(parse);
        cmp.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        cmp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }
  
    
    cmp.operation = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, cmp);
    return cmp;
}



function genParseTextCharacter(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const char = new GTextCharacter(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(char, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, char);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        char.input = genParse(parse);

    char.code = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, char);
    return char;
}



function genParseNumberToText(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const num2text = new GNumberToText(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(num2text, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, num2text);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        num2text.input = genParse(parse);

    num2text.format = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, num2text);
    return num2text;
}



function genParseTextToNumber(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const text2num = new GTextToNumber(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(text2num, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, text2num);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        text2num.input = genParse(parse);

    text2num.format = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, text2num);
    return text2num;
}



function genParseTextToColor(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const text2col = new GTextToColor(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(text2col, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, text2col);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        text2col.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, text2col);
    return text2col;
}



function genParseTextSplit(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const split = new GTextSplit(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(split, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, split);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        split.input = genParse(parse);

    split.separator = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, split);
    return split;
}



function genParseTextCSV(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const csv = new GTextCSV(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(csv, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, csv);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        csv.input = genParse(parse);

    csv.rowSeparator    = genParse(parse);
    csv.columnSeparator = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, csv);
    return csv;
}



function genParseTextJson(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const json = new GTextJson(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(json, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, json);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        json.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, json);
    return json;
}



function genParseTextFetch(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const fetch = new GTextFetch(nodeId, options);
   

    if (parse.settings.logRequests) 
        logReq(fetch, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, fetch);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    fetch.request     = genParse(parse);
    fetch.cachedValue = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, fetch);
    return fetch;
}



function genParseTextFile(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const file = new GTextFile(nodeId, options);
   

    if (parse.settings.logRequests) 
        logReq(file, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, file);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    file.cachedValue = genParse(parse);
    //file.path        = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, file);
    return file;
}