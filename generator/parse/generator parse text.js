
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


    const contains = new GTextContains(nodeId, options);
   

    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(contains, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, contains);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        contains.input = genParse(parse);

    contains.what = genParse(parse);
  
    
    parse.nTab--;


    genParseNodeEnd(parse, contains);
    return contains;
}



function genParseTextFind(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const find = new GTextFind(nodeId, options);
   

    let nInputs = -1;

    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs => 0 && nInputs <= 2, 'nInputs must be [0, 2]');
    }

    
    if (parse.settings.logRequests) 
        logReq(find, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, find);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 2)
    {
        find.input0 = genParse(parse);
        find.input1 = genParse(parse);
    }
    else if (nInputs == 1)
    {
        find.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
    }
  
    
    parse.nTab--;


    genParseNodeEnd(parse, find);
    return find;
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




function genParseAddText(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const addText = new GAddText(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(addText, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, addText);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        addText.input = genParse(parse);

    addText.text   = genParse(parse);
    addText.prefix = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, addText);
    return addText;
}



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



function genParseTextEscape(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const escape = new GTextEscape(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(escape, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, escape);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        escape.input = genParse(parse);

    escape.method = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, escape);
    return escape;
}



function genParseTextUnescape(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const unescape = new GTextUnescape(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(unescape, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, unescape);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        unescape.input = genParse(parse);

    unescape.method = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, unescape);
    return unescape;
}



function genParseTextCompare(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const cmp = new GTextCompare(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(cmp, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, cmp);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        cmp.input = genParse(parse);
  
    
    cmp.operation = genParse(parse);
    cmp.operand   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, cmp);
    return cmp;
}



function genParseCodeToCharacter(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const code2char = new GCodeToCharacter(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(code2char, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, code2char);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        code2char.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, code2char);
    return code2char;
}



function genParseCharacterToCode(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const char2code = new GCharacterToCode(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(char2code, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, char2code);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        char2code.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, char2code);
    return char2code;
}



function genParseIndexToName(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const index = new GIndexToName(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }

    
    if (parse.settings.logRequests) 
        logReq(index, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, index);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    index.name  = genParse(parse);
    index.index = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, index);
    return index;
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

    num2text.base      = genParse(parse);
    num2text.trim      = genParse(parse);
    num2text.decimals  = genParse(parse);
    num2text.thousands = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, num2text);
    return num2text;
}



function genParseColorToText(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const col2text = new GColorToText(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(col2text, parse, ignore, nInputs);


    if (ignore) 
    {
        genParseNodeEnd(parse, col2text);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        col2text.input = genParse(parse);

    col2text.format = genParse(parse);
    col2text.trim   = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, col2text);
    return col2text;
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

    text2num.base      = genParse(parse);
    text2num.decimals  = genParse(parse);
    text2num.thousands = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, text2num);
    return text2num;
}



function genParseTextToBoolean(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const text2bool = new GTextToBoolean(nodeId, options);
   

    let nInputs = -1;
    
    if (!ignore)
    {
        nInputs = parseInt(parse.move());
        consoleAssert(nInputs == 0 || nInputs == 1, 'nInputs must be [0, 1]');
    }


    if (parse.settings.logRequests) 
        logReq(text2bool, parse, ignore);


    if (ignore) 
    {
        genParseNodeEnd(parse, text2bool);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;


    if (nInputs == 1)
        text2bool.input = genParse(parse);

    
    parse.nTab--;


    genParseNodeEnd(parse, text2bool);
    return text2bool;
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


    text2col.format = genParse(parse);

    
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



function genParseParseCSV(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const csv = new GParseCSV(nodeId, options);
   

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



function genParseParseJson(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const json = new GParseJson(nodeId, options);
   

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



function genParseToJson(parse)
{
    const [, nodeId, options, ignore] = genParseNodeStart(parse);


    const json = new GToJson(nodeId, options);
   

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

    json.quoteValues = genParse(parse);
    json.showNames   = genParse(parse);
    json.singleLine  = genParse(parse);
    json.whiteSpace  = genParse(parse);
    
    
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