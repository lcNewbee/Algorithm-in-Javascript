
class Heap { // 大顶堆
  constructor(n, arr) {
    this.capacity = n
    this.heap = this.buildHeap(arr)
  }

  // 原地堆化，arr(list.length / 2 + 1)是叶子节点，堆化从倒数第一个父节点开始
  buildHeap(arr) {
    let list = [ null, ...arr ]
    const n = Math.floor(list.length / 2)
    for (let i = n; i >= 1; i--) {
      list = this.heapify(list, i)
    }
    return list
  }

  // 从选中的父节点向下堆化
  heapify(arr, i) { // 堆化
    let n = arr.length
    while(true) {
      let maxPos = i
      if (i * 2 < n && arr[i] < arr[i * 2]) maxPos = i * 2
      if (i * 2 + 1 < n && arr[maxPos] < arr[i * 2 + 1]) maxPos = i * 2 + 1
      if (maxPos === i) break

      let temp = arr[i]
      arr[i] = arr[maxPos]
      arr[maxPos] = temp
      i = maxPos
    }
    return arr
  }

  insert(num) {
    if (this.heap.length >= this.capacity + 1) {
      console.log('The heap is full!')
      return
    }
    let currPos = this.heap.length
    this.heap[currPos] = num
    while(true) {
      const parentPos = Math.floor(currPos / 2)
      console.log('sweap:', this.heap[currPos], this.heap[parentPos])
      if (parentPos > 0 && this.heap[currPos] > this.heap[parentPos]) {
        let temp = this.heap[currPos]
        this.heap[currPos] = this.heap[parentPos]
        this.heap[parentPos] = temp
        currPos = parentPos
      } else {
        break
      }
    }
  }

  getTop() {
    return this.heap[1]
  }

  deleteTop() {
    if (this.heap.length === 1) return null
    const top = this.heap[1]
    const last = this.heap.pop()
    this.heap[1] = last // 删除头元素和尾元素，并将尾元素移到头部

    const len = this.heap.length
    let i = 1
    while(true) {
      let maxPos = i
      if (i * 2 < len && this.heap[i * 2] > this.heap[maxPos]) maxPos = i * 2
      if (i * 2 + 1 < len && this.heap[i * 2 + 1] > this.heap[maxPos]) maxPos = i * 2 + 1
      if (maxPos === i) break
      let temp = this.heap[i]
      this.heap[i] = this.heap[maxPos]
      this.heap[maxPos] = temp
      i = maxPos
    }
    return top
  }

  printHeap() {
    console.log(this.heap.slice(1))
  }
}


// test
const arr = [1, 3, 4, 8, 7, 5, 2, 6, 10]
const heap = new Heap(10, arr)
heap.printHeap() // 10 8 5 6 7 4 2 1 3
heap.insert(9)
heap.printHeap() // 10 9 5 6 8 4 2 1 3 7
heap.deleteTop()
heap.printHeap() // 9 8 5 6 7 4 2 1 3