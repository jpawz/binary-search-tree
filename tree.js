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
    this.root = this.deleteNode(this.root, value);
  }

  deleteNode(node, value) {
    if (node === null) {
      return node;
    }

    if (value < node.data) {
      node.leftChild = this.deleteNode(node.leftChild, value);
    } else if (value > node.data) {
      node.rightChild = this.deleteNode(node.rightChild, value);
    } else {
      if (node.leftChild === null) {
        return node.rightChild;
      } else if (node.rightChild === null) {
        return node.leftChild;
      } else {
        node.data = this.minValue(node.rightChild);
        node.rightChild = this.deleteNode(node.rightChild, value);
      }
    }

    return node;
  }

  minValue(node) {
    let minv = node.data;
    while (node.leftChild !== null) {
      minv = node.leftChild.data;
      node = node.leftChild;
    }
    return minv;
  }
}
