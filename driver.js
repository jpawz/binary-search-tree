const Tree = require("./tree");

const maximumArrayLength = 20;
const maximumArrayValue = 100;
const arrayLength = Math.floor(Math.random() * maximumArrayLength);
const arr = Array.from({ length: arrayLength }, () =>
  Math.floor(Math.random() * maximumArrayValue)
);

console.log(`Array: ${arr}`);
const tree = new Tree(arr);

console.log(`Tree is balanced: ${tree.isBalanced()}`);

console.log("Level order:");
tree.levelOrder((node) => console.log(node.data));

console.log("Preorder:");
tree.preorder((node) => console.log(node.data));

console.log("Postorder:");
tree.postorder((node) => console.log(node.data));

