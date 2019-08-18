class Queue {
  constructor(maxSize) {
    this.queue = []
    this.maxSize = maxSize
    this.head = 0
    this.tail = 0
  }

  enqueue(item) {
    if (this.head === 0 && this.tail === this.maxSize) return false
    if (this.tail === this.maxSize) {
      for (let i = this.head; i < this.tail; i++) {
        this.queue[i - this.head] = this.queue[i]
      }
      this.tail = this.tail - this.head
      this.head = 0
    }
    this.queue[this.tail] = item
    this.tail++
    return true
  }

  dequeue() {
    if (this.head === this.tail) return null
    const val = this.queue[this.head]
    this.head++
    return val
  }

  getSize() {
    return this.tail - this.head
  }

  showQueue() {
    console.log(this.queue.slice(this.head, this.tail))
  }
}

// test
const queue = new Queue(5)

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
queue.enqueue(4)
queue.enqueue(5)
queue.showQueue() // [1, 2, 3, 4, 5]
queue.getSize() // 5
queue.dequeue()
queue.dequeue()
queue.dequeue()
queue.showQueue() // [4, 5]
queue.getSize() // 2
