function genParseColor(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const col = new GColor(nodeId, active);

  
    if (parse.logRequests) 
        logReqColor(col, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, col);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    
    let paramIds;

    if (parse.next == COLOR)
    {
        col.input = genParse(parse);
        paramIds  = parse.move().split(',');
    }
    else
        paramIds = ['space', 'convert', 'c1', 'c2', 'c3'];

    
    for (const id of paramIds)
    {
        switch (id)
        {
        case 'space':   col.space   = genParse(parse); break;
        case 'convert': col.convert = genParse(parse); break;
        case 'c1':      col.c1      = genParse(parse); break;
        case 'c2':      col.c2      = genParse(parse); break;
        case 'c3':      col.c3      = genParse(parse); break;
        }
    }


    parse.nTab--;


    genParseNodeEnd(parse, col);
    return col;
}



function genParseColorInterpolate(parse)
{
    const [, nodeId, active, ignore] = genParseNodeStart(parse);


    const lerp = new GColorInterpolate(nodeId, active);


    let nValues = -1;

    if (!ignore)
    {
        nValues = parse.move();
        console.assert(nValues => 0 && nValues <= 2);
    }

    
    if (parse.logRequests) 
        logReqColorInterpolate(lerp, nValues, parse);


    if (ignore) 
    {
        genParseNodeEnd(parse, lerp);
        return parse.parsedNodes.find(n => n.nodeId == nodeId);
    }


    parse.nTab++;

    if (nValues == 2)
    {
        lerp.input0 = genParse(parse);
        lerp.input1 = genParse(parse);
        lerp.space  = genParse(parse);
        lerp.amount = genParse(parse);
    }
    else if (nValues == 1)
    {
        lerp.input0 = genParse(parse); // doesn't matter if it's input0 or input1, the eval() result will be the same
        lerp.space  = genParse(parse);
        lerp.amount = genParse(parse);
    }
    else if (nValues == 0)
    {
        lerp.space  = genParse(parse);
        lerp.amount = genParse(parse);
    }

    parse.nTab--;


    genParseNodeEnd(parse, lerp);
    return lerp;
}