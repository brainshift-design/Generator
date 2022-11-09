class ListValue
extends GValue
{
    items;



    constructor(items = [])
    {
        super(LIST_VALUE);

        this.items = clone(items);
    }



    copy()
    {
        const list = new ListValue(this.items);

        list.copyBase(this);

        return list;
    }



    equals(list)
    {
        if (!list)                                  return false;
        if (!(list instanceof ListValue))           return false;
        if (this.items.length != list.items.length) return false;
            
        for (let i = 0; i < this.items.length; i++)
            if (!this.items[i].equals(list.items[i]))
                return false;

        return true;
    }



    eval(parse)
    {
        return this;
    }



    isValid()
    {
        return !this.items.find(i => !i.isValid());
    }



    toValue()
    {
        return this.copy();
    }



    toString()
    {
        let str = '';

        for (const item of this.items)
            str += item.toString() + '\ufffc';

        return str;
    }



    toDisplayString()
    {
        let str = '';

        for (const item of this.items)
            str += item.toDisplayString() + '; ';

        return str;
    }



    static NaN = Object.freeze(new ListValue(null));
}



function parseListValue(str)
{
    const list = new ListValue(str.split('\ufffc'));

    return [list, 1];
}