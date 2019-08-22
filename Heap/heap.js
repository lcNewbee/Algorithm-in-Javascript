
class Heap { // 大顶堆，采用数组存储
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

  // 从第i个节点向下堆化，该操作完成后，i节点已经满足大顶堆要求（但从i向上看，可能还不满足）
  heapify(arr, i) { // 堆化
    let n = arr.length
    while(true) {
      let maxPos = i
      // 找到最大的孩子节点
      if (i * 2 < n && arr[i] < arr[i * 2]) maxPos = i * 2
      if (i * 2 + 1 < n && arr[maxPos] < arr[i * 2 + 1]) maxPos = i * 2 + 1
      // 孩子节点都比自己小，则该节点以下已经满足要求
      if (maxPos === i) break
      // 对换该节点和最大的孩子节点
      let temp = arr[i]
      arr[i] = arr[maxPos]
      arr[maxPos] = temp
      i = maxPos
    }
    return arr
  }

  /**
   * 方法：先将元素作为数组的最有一个元素插入，即作为二叉树的最后一个叶子节点，然后从该点开始向上比较
   * 如果元素大于父节点，则和父节点对换位置，接着从父节点继续向上对比，指导没有可以调换的元素，或者到达堆顶
   */
  insert(num) {
    if (this.heap.length >= this.capacity + 1) {
      console.log('The heap is full!')
      return
    }
    let currPos = this.heap.length
    this.heap[currPos] = num
    while(true) {
      const parentPos = Math.floor(currPos / 2)
      if (parentPos > 0 && this.heap[currPos] > this.heap[parentPos]) {
        // 对比父节点，可交换则交换并沿着父节点继续相同操作，否则整棵树已经满足要求，退出
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

  /**
   * 方法：将最后一个元素赋值给数组的第一个元素，即堆顶，并删除最后一个元素
   * 然后从堆顶开始向下对比，选择该节点最大的孩子节点和自己对换
   * 然后对调换后的孩子节点继续向下对比，指导没有可交换的元素，或者到达叶子节点
   */
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