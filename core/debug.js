function nodeArrayToString(nodes)
{
    let str = '';

    for (let i = 0; i < nodes.length; i++)
    {
        if (i > 0) str += ', ';
        str += nodes[i] ? nodes[i].id : 'undefined';
    }

    return str;
}