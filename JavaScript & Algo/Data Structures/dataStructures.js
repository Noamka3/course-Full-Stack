class UniqueArray {
    constructor(){
        this.stuff = [];
        this.stuffLength = 0;
    }

    key(item){
        if (item === null) return "null";
        if (typeof item !== "object") return `${typeof item}:${item}`;
        if ("id" in item) return `object:id:${item.id}`;
        return `ref:${String(item)}`;
    }

    add(item){
         if (this.exists(item))
            {
             return "This item is already in the collection";
            }

        this.stuff.push(item);
        this.stuffLength++;
    }
    showAll(){
        console.log(this.stuff);
    }
    exists(item){
    const key = this.key(item);
    return this.stuff.some(x => this.key(x) === key);
    }
    get(index){
        return this.stuff[index];
    }



}
const uniqueStuff = new UniqueArray()
uniqueStuff.add("toy")
uniqueStuff.showAll() //prints ["toy"]
uniqueStuff.add("toy")
uniqueStuff.showAll() //prints ["toy"]
uniqueStuff.exists("toy") //returns true
uniqueStuff.add("poster")
uniqueStuff.add("hydrogen")
console.log(uniqueStuff.get(2)) //prints "hydrogen"