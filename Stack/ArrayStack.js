class Stack {
  constructor(maxSize) {
    this.stack = []
    this.top = 0
    this.maxSize = maxSize
  }

  push(item) {
    if (this.top === this.maxSize) return false
    this.stack.push(item)
    this.top++
    return true
  }

  pop() {
    if (this.top === 0) return null
    this.top--
    return this.stack.pop()
  }

  getSize() {
    return this.top
  }
}

// test
const stack = new Stack(5)
stack.push(1)
stack.push(2)
stack.push(3)
stack.push(4)
stack.push(5)
stack.push(6) // false
stack.pop() // 5
stack.pop() //4
stack.pop() //3
stack.pop() //2
stack.pop() //1
stack.pop() //null