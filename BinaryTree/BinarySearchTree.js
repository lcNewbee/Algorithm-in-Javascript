class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

class BinaryTree {
  constructor() {
    this.root = null
  }

  preOrderPrint(root) {
    if (!root) return
    console.log(root.value)
    this.preOrderPrint(root.left)
    this.preOrderPrint(root.right)
  }

  midOrderPrint(root) {
    if (!root) return
    this.midOrderPrint(root.left)
    console.log(root.value)
    this.midOrderPrint(root.right)
  }

  postOrderPrint(root) {
    if (!root) return
    this.postOrderPrint(root.left)
    this.postOrderPrint(root.right)
    console.log(root.value)
  }
}


class BinarySearchTree extends BinaryTree {
  constructor(compareFun) {
    super()
    this.compare = compareFun
  }

  insert(value) {
    const node = new Node(value)
    let distNode = this.root
    if (!this.root) {
      this.root = node
      return true
    }

    while(distNode) {
      if (this.compare(value, distNode.value) < 0) {
        if (!distNode.left) {
          distNode.left = node
          return true
        }
        distNode = distNode.left
      } else { // 值相等时，插入到右子树
        if (!distNode.right) {
          distNode.right = node
          return true
        }
        distNode = distNode.right
      }
    }
  }

  findFirst(value) {
    if (!this.root) return null
    let distNode = this.root

    while(distNode) {
      const cmpResult = this.compare(value, distNode.value)
      if (cmpResult === 0) {
        return distNode
      } else {
        distNode = cmpResult < 0 ? distNode.left : distNode.right
      }
    }

    return null
  }

  findAll(value) {
    if (!this.root) return null
    let distNode = this.root
    let distArr = []

    while(distNode) {
      const cmpResult = this.compare(value, distNode.value)
      if (cmpResult === 0) {
        distArr.push(distNode)
        distNode = distNode.right
      } else {
        distNode = cmpResult < 0 ? distNode.left : distNode.right
      }
    }

    return distArr.length === 0 ? null : distArr 
  }

  deleteFirst(value) {
    if (!this.root) return false
    let parentNode = null
    let distNode = this.root

    let cmpResult = this.compare(value, distNode.value)
    while(cmpResult !== 0) {
      parentNode = distNode
      if (cmpResult < 0) {
        distNode = distNode.left
      } else {
        distNode = distNode.right
      }
      if (distNode) cmpResult = this.compare(value, distNode.value)
      else return // 没有找到
    }

    if (distNode.left && distNode.right) { // 要删除的节点有两个子节点
      // 寻找右子树最小值
      let minParent = distNode
      let minDist = distNode.right
      while (minDist.left) {
        minParent = minDist
        minDist = minDist.left
      }
      distNode.value = minDist.value
      // 为删除叶子节点做准备，结合下面的代码看
      parentNode = minParent
      distNode = minDist
    }

    if (!parentNode) { // 要删除的是根节点
      this.root = null
      return true
    }

    // 要删除的点是叶子节点
    if (!distNode.right && !distNode.left) {
      if (parentNode.left === distNode) {
        parentNode.left = null
      } else {
        parentNode.right = null
      }
      return true
    }

    // 要删除的节点有一个子节点
    const child = distNode.left || distNode.right 
    if (parentNode.left === distNode) {
      parentNode.left = child
    } else {
      parentNode.right = child
    }
  }
}


// test

const compareFun = (a, b) => {
  return a - b
}

const tree = new BinarySearchTree(compareFun)

tree.insert(8)
tree.insert(5)
tree.insert(9)
tree.insert(8)
tree.insert(6)
tree.insert(3)
tree.insert(5)
tree.insert(11)

tree.preOrderPrint(tree.root) // 8 5 3 6 5 9 8 11
tree.midOrderPrint(tree.root) // 3 5 5 6 8 8 9 11
tree.postOrderPrint(tree.root) // 3 5 6 5 8 11 9 8

const firstFive = tree.findFirst(5)
console.log(firstFive.left.value === 3) // true
console.log(firstFive.right.value === 6) // true

const allFive = tree.findAll(5)
console.log(allFive.length) // 2
console.log(allFive[0].left.value === 3) // true
console.log(allFive[1].left === null) // true
console.log(allFive[1].right === null) // true

tree.deleteFirst(9)
tree.preOrderPrint(tree.root) // 8 5 3 6 5 11 8

tree.deleteFirst(5)
tree.preOrderPrint(tree.root) // 8 5 3 6 11 8

tree.deleteFirst(8)
tree.preOrderPrint(tree.root) // 8 5 3 6 11

tree.deleteFirst(3)
tree.preOrderPrint(tree.root) // 8 5 6 11
