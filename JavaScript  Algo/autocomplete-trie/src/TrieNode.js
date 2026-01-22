// מחלקת Trie Node
class TrieNode{
    constructor(value = ""){
        this.value = value;
        this.children = Object.create(null);
        this.endOfWord = false;
        this.frequency = 0;
    }

    hasChild(char){
        return this.children[char] !== undefined;

    }

    getChild(char){
        return this.children[char];
    }

    addChild(char){
        if(!this.hasChild(char)){
            this.children[char] = new TrieNode(char);
            
        }
        return this.getChild(char);
    }

    getchildrenEntries(){
         return Object.entries(this.children);

    }

}

module.exports = TrieNode;