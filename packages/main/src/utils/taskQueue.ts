export enum TaskPriority {
  Low,
  Medium,
  High
}

interface Task {
  id: string
  priority: TaskPriority
  callback: (args?: any) => Promise<any>
  handleTimeOut?: (args?: any) => void
}

/** 最大执行时间 */
const MAX_EXECUTION_TIME = 60000 // in milliseconds

//  移除预加载任务
class TaskQueue {
  private tasks: Task[]
  private paused: boolean
  private isRunning: boolean
  private timer: NodeJS.Timeout | null
  private currTask: Task | null

  constructor() {
    this.tasks = []
    this.paused = false
    this.isRunning = false
    this.timer = null
    this.currTask = null
  }

  addTask(task: Task): void {
    const { id } = task
    const exist = this.tasks.find((t) => t.id === id)
    if (exist) {
      return
    }
    this.tasks.push(task)
    if (!this.paused && !this.isRunning) {
      this.isRunning = true
      this.processTasks()
    }
  }

  removeTask(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId)
  }
  removeAllTask(): void {
    this.tasks = []
    this.isRunning = false
  }

  pause(): void {
    this.paused = true
    this.isRunning = false
  }

  resume(): void {
    this.paused = false
    this.processTasks()
  }

  private async processTasks(): Promise<any> {
    if (this.paused || this.tasks.length === 0) {
      this.isRunning = false
      return
    }
    // 根据任务优先级进行排序
    this.tasks.sort((a, b) => b.priority - a.priority)
    const targetTask = this.tasks
      .map((item, index) => ({ index, ...item }))
      .sort((a, b) => {
        if (a.priority === b.priority) {
          return a.index - b.index
        }
        return b.priority - a.priority
      })[0]
    const nextTask = this.tasks.find((item) => item.id === targetTask.id)
    if (nextTask) {
      this.tasks = this.tasks.filter((item) => item.id !== nextTask.id)
      this.currTask = nextTask
      try {
        // 超时处理
        await Promise.race([
          nextTask.callback(),
          new Promise((resolve) => {
            this.timer = setTimeout(() => {
              console.error(`${nextTask.id} execution timeout`)
              this.timer && clearTimeout(this.timer)
              if (this.currTask && nextTask.id !== this.currTask?.id) {
                return resolve(null)
              }
              nextTask.handleTimeOut && nextTask.handleTimeOut()
              resolve(null)
            }, MAX_EXECUTION_TIME)
          })
        ])
      } catch (error) {
        console.error(error)
      } finally {
        this.timer && clearTimeout(this.timer)
        this.processTasks()
      }
    }
  }
}

export const taskQueue = new TaskQueue()
