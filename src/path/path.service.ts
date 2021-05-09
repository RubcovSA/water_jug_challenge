import { Injectable } from '@nestjs/common'

enum Action {
  'Pour X to Y',
  'Pour Y to X',
  'Make X Full',
  'Make Y Full',
  'Empty X',
  'Empty Y',
}

class TraceItem {
  x: number
  y: number
  description: string
}

type QItem = {
  x: number
  y: number
  dir: Action
  trace?: TraceItem[]
}

@Injectable()
export class PathService {
  async findBestPath(x: number, y: number, z: number): Promise<TraceItem[]> {
    return PathService.calculate(x, y, z)
  }
  async findWorstPath(x: number, y: number, z: number): Promise<TraceItem[]> {
    return PathService.calculate(x, y, z)
  }

  private static calculate(X: number, Y: number, Z: number): TraceItem[] {
    const pastStates = []
    const checkPastState = (x, y) => {
      const obj = JSON.stringify({ x, y })
      return pastStates.some((e) => e == obj)
    }

    const setPastState = (x, y) => {
      pastStates.push(JSON.stringify({ x, y }))
    }

    const cycles = 1000
    const Q: QItem[] = [
      { x: 0, y: 0, dir: 2 },
      { x: 0, y: 0, dir: 3 },
    ]

    let result

    const pour = ({ x, y, dir = 0, trace = [] }: QItem) => {
      switch (dir) {
        case 0:
          if (y < Y && x > 0) {
            y = y + x
            if (y > Y) {
              const reminder = y - Y
              y = Y
              x = reminder
            } else {
              x = 0
            }
          } else return false
          break

        case 1:
          if (x < X && y > 0) {
            x = y + x
            if (x > X) {
              const reminder = x - X
              x = X
              y = reminder
            } else {
              y = 0
            }
          } else return false
          break
        case 2:
          if (x == X) return false
          x = X
          break
        case 3:
          if (y == Y) return false
          y = Y
          break
        case 4:
          if (x == 0) return false
          x = 0
          break
        case 5:
          if (y == 0) return false
          y = 0
          break
      }

      trace.push({ description: Action[dir], x, y })

      if (x == Z || y == Z) {
        result = { jug: x == Z ? 'X' : 'Y', trace }
        return true
      } else {
        return { x, y, dir, trace: [...trace] }
      }
    }

    do {
      const firstElement = JSON.parse(JSON.stringify(Q.splice(0, 1)))
      const newState = pour(firstElement[0])

      if (newState === true) {
        break
      }

      if (newState) {
        if (checkPastState(newState.x, newState.y)) {
          continue
        } else {
          setPastState(newState.x, newState.y)
        }
        const trace = [...newState.trace]
        Q.push({ ...newState, trace, dir: 0 })
        Q.push({ ...newState, trace, dir: 1 })
        Q.push({ ...newState, trace, dir: 2 })
        Q.push({ ...newState, trace, dir: 3 })
        Q.push({ ...newState, trace, dir: 4 })
        Q.push({ ...newState, trace, dir: 5 })
      }
    } while (Q.length && Q.length < cycles)

    if (result) {
      return result.trace
    } else {
      return null
    }
  }
}
