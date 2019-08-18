class CircularQueue {
  constructor(maxSize) {
    this.queue = []
    this.maxSize = maxSize
    this.size = 0
    this.head = 0
    this.tail = 0
  }

  enqueue(item) {
    if (this.size === this.maxSize) return false
    this.queue[this.tail] = item
    this.tail = (this.tail + 1) % this.maxSize
    this.size++
    return true
  }
  
  dequeue() {
    if (this.size === 0) return null
    const val = this.queue[this.head]
    this.head = (this.head + 1) % this.maxSize
    this.size--
    return val
  }

  getSize() {
    return this.size
  }

  showQueue() {
    const arr = []
    console.log('head, tail: ', this.head, this.tail)
    for (let i = 0; i < this.size; i++) {
      const index = (this.head + i) % this.maxSize
      arr.push(this.queue[index])
    }
    console.log(arr)
  }
}

// test
const queue = new CircularQueue(5)

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
queue.showQueue() // [1, 2, 3, 4, 5]
queue.getSize() // 5

queue.enqueue(6) // false

queue.dequeue()
queue.dequeue()
queue.dequeue()
queue.showQueue() // [4, 5]
queue.getSize() // 2

queue.enqueue(6)
queue.enqueue(7)
queue.enqueue(8)
queue.showQueue() // [4, 5, 6, 7, 8]
queue.getSize() // 5