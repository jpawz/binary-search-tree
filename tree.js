import { Node } from "./node";

export class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const values = [...new Set(arr)].sort();
    const middleIndex = Math.floor(values.length / 2);
    const rootNode = new Node(arr[middleIndex], null, null);

    rootNode.leftChild = this.buildTree(arr.slice(0, middleIndex));
    rootNode.rightChild = this.buildTree(arr.slice(middleIndex + 1));

    return rootNode;
  }

  insert(value) {
    this.root = this.insertNode(this.root, value);
  }

  insertNode(node, value) {
    if (!node) {
      return new Node(value, null, null);
    }

    if (value > node.data) {
      node.rightChild = insertNode(node.rightChild, value);
    } else if (value < node.data) {
      node.leftChild = insertNode(node.leftChild, value);
    }

    return node;
  }

  delete(value) {
    
  }
}
