class Node {
  constructor(value) {
    this.value = value
    this.prev = null
    this.next = null
  }
}

class DoubleLinkedList {
  constructor() {
    this.head = new Node(null)
  } 

  append(value) {
    const node = new Node(value)

    let tail = this.head
    while(tail.next) {
      tail = tail.next
    }

    tail.next = node
    node.prev = tail
  }

  findByValue(value) {
    let pointer = this.head.next

    while(pointer && pointer.value !== value) {
      pointer = pointer.next
    }

    return pointer ? pointer : -1
  }

  findPrevious(value) {
    let pointer = this.head.next

    while(pointer !== null && pointer.value !== value) {
      pointer = pointer.next
    }

    if (pointer === null) {
      console.log(value + 'node not found!')
      return -1
    }

    return pointer.prev
  }

  findByIndex(index) { // 从1开始
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
      return false
    }
    const newNode = new Node(newValue)

    if (anchorPointer.next === null) {
      anchorPointer.next = newNode
      newNode.prev = anchorPointer
      return true
    }

    newNode.next = anchorPointer.next
    newNode.prev = anchorPointer
    anchorPointer.next.prev = newNode
    anchorPointer.next = newNode
  }

  insertBefore(newValue, value) {
    const anchorPointer = this.findByValue(value)

    if (anchorPointer === -1) {
      console.log('Node with value' + value + 'is not found!')
      return false
    }

    const newNode = new Node(newValue)

    newNode.next = anchorPointer
    newNode.prev = anchorPointer.prev
    anchorPointer.prev.next = newNode
    anchorPointer.prev = newNode
  }

  // 根据值删除
  remove (value) {
    const anchorPointer = this.findByValue(value)
    if (anchorPointer === -1) {
      console.log('未找到元素')
      return false
    }
    if (anchorPointer.next === null) {
      anchorPointer.prev.next = null
      anchorPointer.prev = null
      return true
    }
    anchorPointer.prev.next = anchorPointer.next
    anchorPointer.next.prev = anchorPointer.prev
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

// test
const dblList = new DoubleLinkedList()

// append
dblList.append('zhao')
dblList.append('qian')
dblList.append('sun')
dblList.append('li')
dblList.display() // zhao qian sun li
console.log('-------------------------')

// findPrevious
dblList.findPrevious('zhao') // null
dblList.findPrevious('li') // sun
console.log('-------------------------')

// findByIndex
dblList.findByIndex(0) // -1
dblList.findByIndex(3) // sun
dblList.findByIndex(5) // -1

// insertAfter
dblList.insertAfter('zhou', 'zhao')
dblList.insertAfter('wang', 'li')
dblList.display() // zhao zhou qian sun li wang
console.log('-------------------------')

// insertBefore
dblList.insertBefore('wu', 'zhao')
dblList.insertBefore('zheng', 'wang')
dblList.display() // wu zhao zhou qian sun li zheng wang
console.log('-------------------------')

// remove
dblList.remove('wu')
dblList.remove('zheng')
dblList.remove('wang')
dblList.display() // zhao zhou qian sun li
