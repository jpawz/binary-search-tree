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

  find(value) {
    return this.findNode(this.root, value);
  }

  findNode(node, value) {
    if (!node) {
      return null;
    }

    if (value === node.data) {
      return node;
    } else if (value < node.data) {
      return this.findNode(node.leftChild, value);
    } else {
      return this.findNode(node.rightChild, value);
    }
  }

  levelOrder(callback) {
    if (!this.root) {
      return;
    }

    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      const node = queue.shift();

      callback(node);

      if (node.leftChild !== null) {
        queue.push(node.leftChild);
      }
      if (node.rightChild !== null) {
        queue.push(node.rightChild);
      }
    }
  }

  inorder(callback) {
    const result = [];

    function traverse(node) {
      if (node) {
        traverse(node.leftChild);
        result.push(node.data);
        callback(node);
        traverse(node.rightChild);
      }
    }

    traverse(this.root);
    return result;
  }

  preorder(callback) {
    const result = [];

    function traverse(node) {
      if (node) {
        result.push(node.data);
        callback(node);
        traverse(node.leftChild);
        traverse(node.rightChild);
      }
    }
    traverse(this.root);
    return result;
  }

  postorder(callback) {
    const result = [];

    function traverse(node) {
      if (node) {
        traverse(node.leftChild);
        traverse(node.rightChild);
        result.push(node.data);
        callback(node);
      }
    }

    traverse(this.root);
    return result;
  }
}
