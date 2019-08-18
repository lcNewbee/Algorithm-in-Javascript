class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class SingleLinkedList {
  constructor() {
    this.head = new Node('null')
  }

  append(value) {
    const node = new Node(value)

    let tail = this.head
    while(tail.next) {
      tail = tail.next
    }

    tail.next = node
  }

  findByValue(value) {
    let pointer = this.head.next

    while(pointer && pointer.value !== value) {
      pointer = pointer.next
    }

    return pointer ? pointer : -1
  }

  findPrevious(value) {
    let pre = this.head
    let rear = this.head.next

    while(rear !== null && rear.value !== value) {
      pre = rear
      rear = rear.next
    }

    if (rear === null) {
      console.log(value + 'node not found!')
      return -1
    }

    return pre
  }

  findByIndex(index) {
    let pointer = this.head.next
    let pos = 1

    while(pos !== index && pointer !== null) {
      pointer = pointer.next
      pos++
    }

    return pointer ? pointer : -1
  }

  insertAfter(newValue, value) {
    const anchorPointer = this.findByValue(value)
    if (anchorPointer === -1) {
      console.log('Insert Position Not Found!')
      return
    }

    const newNode = new Node(newValue)

    newNode.next = anchorPointer.next
    anchorPointer.next = newNode
  }

  insertBefore(newValue, value) {
    const anchorPointer = this.findPrevious(value)

    if (anchorPointer === -1) {
      console.log('Node with value' + value + 'is not found!')
      return
    }

    const newNode = new Node(newValue)

    newNode.next = anchorPointer.next
    anchorPointer.next = newNode
  }

  // 根据值删除
  remove (value) {
    const prevNode = this.findPrevious(value)
    if (prevNode === -1) {
      console.log('未找到元素')
      return false
    }
    prevNode.next = prevNode.next.next
    return true
  }

  display() {
    let pointer = this.head.next
    while(pointer) {
      console.log(pointer.value)
      pointer = pointer.next
    }
  }
}

// export default SingleLinkedList