const TrieNode = require("./TrieNode");

class AutoCompleteTrie{
    constructor(){
        this.root = new TrieNode();
    }

    normalize(input){
        if(typeof input !== "string") return "";
        return input.trim().toLowerCase();
    }

    addWord(input){
        const normlized = this.normalize(input);
        if(!normlized) return false;

        let current = this.root;

        for(const ch of normlized){
            current = current.addChild(ch);
        }
        current.endOfWord = true;

        return true;
    }
    findWord(word)
    {
        const normalized = this.normalize(word);
        if(!normalized) return false;
        const node = this.getRmainingTree(normalized,this.root);
        if(!node) return false;
        return Boolean(node && node.endOfWord);
    }

    getRmainingTree(prefix,node){
        let current = node;
        for(const ch of prefix){
            if(!current.hasChild(ch)) return null;
            current = current.getChild(ch);
        }
        return current;
    }

    UsWord(word){
        const normalized = this.normalize(word);
        if(!normalized) return false;
        
        const node = this.getRmainingTree(normalized,this.root);
        if(!node || !node.endOfWord) return false;

        node.frequency +=1;
        return true;
    }

    getfrequency(word){
        const normalized = this.normalize(word);
        if(!normalized) return null;
        
        const node = this.getRmainingTree(normalized,this.root);
        if(!node || !node.endOfWord) return null;
        return node.frequency;
    }


predictWords(prefix) {
  const normalized = this.normalize(prefix);
  if (!normalized) return [];

  const prefixNode = this.getRmainingTree(normalized, this.root);
  if (!prefixNode) return [];

  const results = [];
  this._allWordsHelper(normalized, prefixNode, results);

  results.sort((a, b) => a.localeCompare(b));
  return results; // ["cat","car","card"]
}

_allWordsHelper(prefix, node, results) {
  if (node.endOfWord) {
    results.push(prefix);
  }
  for (const [ch, child] of Object.entries(node.children)) {
    this._allWordsHelper(prefix + ch, child, results);
  }
}


    
}


    module.exports = AutoCompleteTrie;