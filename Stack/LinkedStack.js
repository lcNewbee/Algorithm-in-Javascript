class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class Stack {
  constructor() {
    this.head = new Node('null')
    this.size = 0
  }

  push(value) {
    const newNode = new Node(value)
    newNode.next = this.head.next
    this.head.next = newNode
    this.size++
  }

  pop() {
    if (this.head.next === null) return null
    const popedItem = this.head.next
    this.head.next = popedItem.next
    this.size--
    return popedItem.value
  }

  getSize() {
    return this.size
  }

  getStack() {
    const arr = []
    this.pointer = this.head.next
    while(this.pointer) {
      arr.push(this.pointer.value)
      this.pointer = this.pointer.next
    }
    return arr.reverse()
  }
}

// test
const stack = new Stack()

stack.push(1)
stack.push(2)
stack.push(3)
console.log(stack.getStack()) // [1, 2, 3]
console.log(stack.getSize()) // 3
stack.pop()
stack.pop()
stack.pop()
stack.pop() // null
