import { Injectable, Logger } from '@nestjs/common'

class TraceItem {
  x: number
  y: number
  description: string
}
class Paths {
  bestSolution: TraceItem[]
  worstSolution: TraceItem[]
}

@Injectable()
export class PathService {
  constructor(readonly logger: Logger) {}

  async findPaths(x: number, y: number, z: number): Promise<Paths> {
    return PathService.minSteps(x, y, z)
  }

  private static gcd(a, b) {
    if (b == 0) return a

    return PathService.gcd(b, a % b)
  }

  private static pour(fromCap, toCap, d) {
    let from = fromCap
    let to = 0

    const trace = [{ x: from, y: to, description: 'Fill X' }]

    while (from != d && to != d) {
      const temp = Math.min(from, toCap - to)

      to += temp
      from -= temp

      trace.push({ x: from, y: to, description: 'Pour X to Y' })

      if (from == d || to == d) break

      if (from == 0) {
        from = fromCap
        trace.push({ x: from, y: to, description: 'Fill X' })
      }

      if (to == toCap) {
        to = 0
        trace.push({ x: from, y: to, description: 'Empty Y' })
      }
    }
    return trace
  }

  private static minSteps(m, n, d) {
    const max = Math.max(n, m)
    const min = Math.min(n, m)
    if (d > max || d % PathService.gcd(max, min) != 0) {
      return {
        bestSolution: null,
        worstSolution: null,
      }
    }

    const straight = PathService.pour(m, n, d)
    const reverted = PathService.pour(n, m, d).map(({ x, y, description }) => {
      if (description === 'Pour X to Y') {
        description = 'Pour Y to X'
      } else if (description.includes('X')) {
        description = description.replace('X', 'Y')
      } else {
        description = description.replace('Y', 'X')
      }
      return {
        x: y,
        y: x,
        description,
      }
    })

    if (straight.length < reverted.length) {
      return {
        bestSolution: straight,
        worstSolution: reverted,
      }
    }
    return {
      bestSolution: reverted,
      worstSolution: straight,
    }
  }
}
