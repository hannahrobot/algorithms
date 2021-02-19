/*NOTES

think about what kind of datastructure
autocomplete feature in app

       a.      ar

      / \
    are  ate
   /. \
area  array


trie

  path is a prefix
  path ends with null is a word

  a or none
         a
        / \
       p
     /     \
    p          null
   / \
  l.  null
   \
    e




dictionary, a has children: one is r:

class: 3 methods

insert: takes a string
search: takes a string
starts with: takes a string

all inputs are lowercase a-z
non empty inputs

test cases:
instance of trie class
call insert: input apple
call search: input apple: returns true: because its a full word
call search: app: returns false: isnt complete word
starts with: input app: true: because the prefix exists

approach:

  node constructor:
    val :
    children: {}


class
  constructor:
      root: psudohead : new node: hashmap a-z

  insert:
    iterating through that string
    find the first letter: , go to that node
      find the next letter on that node, if it doesnt exist, create it
      add 'null' to its children

  search:
    iterate through my string, at each letter find children of next letter, if the last letter has child thats null: return true
      return false

  startsWith
    iterate through my string, at each letter find children of next letter, if the last letter exists return true

*/

function Node(val) {
  this.val = val === undefined ? 0 : val;
  this.children = {};
}

function Trie() {
  this.pseudoHead = new Node();
  this.curr = this.pseudoHead;
}

Trie.prototype.insert = function (string) {
  this.curr = this.pseudoHead;
  for (let i = 0; i < string.length; i++) {
    if (!this.curr.children.hasOwnProperty(string[i])) {
      this.curr.children[string[i]] = new Node(string[i]);
    }
    this.curr = this.curr.children[string[i]];
  }
  this.curr.children["null"] = "null";
};

Trie.prototype.search = function (string) {
  if (this.startsWith(string)) {
    if (this.curr.children.hasOwnProperty("null")) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

Trie.prototype.startsWith = function (prefix) {
  this.curr = this.pseudoHead;
  for (let i = 0; i < prefix.length; i++) {
    if (this.curr.children.hasOwnProperty(prefix[i])) {
      this.curr = this.curr.children[prefix[i]];
    } else {
      this.index = i;
      return false;
    }
  }
  return true;
};

//time: 0(n)
//space: 0(26^longestword in the dictionary)

const testTrie = new Trie();
console.log(testTrie.insert("apple"), "undefined");
console.log(testTrie.search("apple"), "true");
console.log(testTrie.search("app"), "false");
console.log(testTrie.startsWith("app"), "true");

// test cases:
// instance of trie class
// call insert: input apple
// call search: input apple: returns true: because its a full word
// call search: app: returns false: isnt complete word
// starts with: input app: true: because the prefix exists
