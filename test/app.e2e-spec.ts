import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('App', () => {
  let app: INestApplication

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  it('calculate 1, 7, 7', async () => {
    const result = await getPath(1, 7, 7)
    expect(result.body.data.getPath.bestSolution).toEqual([
      {
        x: 0,
        y: 7,
        description: 'Fill Y',
      },
    ])
  })

  it('calculate 1, 7, 1', async () => {
    const result = await getPath(1, 7, 1)
    expect(result.body.data.getPath.bestSolution).toEqual([
      {
        x: 1,
        y: 0,
        description: 'Fill X',
      },
    ])
  })

  it('calculate 1, 7, 3', async () => {
    const result = await getPath(1, 7, 3)
    expect(result.body.data.getPath.bestSolution).toEqual([
      {
        x: 1,
        y: 0,
        description: 'Fill X',
      },
      {
        x: 0,
        y: 1,
        description: 'Pour X to Y',
      },
      {
        x: 1,
        y: 1,
        description: 'Fill X',
      },
      {
        x: 0,
        y: 2,
        description: 'Pour X to Y',
      },
      {
        x: 1,
        y: 2,
        description: 'Fill X',
      },
      {
        x: 0,
        y: 3,
        description: 'Pour X to Y',
      },
    ])
  })

  it('calculate 7, 1, 3', async () => {
    const result = await getPath(7, 1, 3)
    expect(result.body.data.getPath.bestSolution).toEqual([
      {
        x: 0,
        y: 1,
        description: 'Fill Y',
      },
      {
        x: 1,
        y: 0,
        description: 'Pour Y to X',
      },
      {
        x: 1,
        y: 1,
        description: 'Fill Y',
      },
      {
        x: 2,
        y: 0,
        description: 'Pour Y to X',
      },
      {
        x: 2,
        y: 1,
        description: 'Fill Y',
      },
      {
        x: 3,
        y: 0,
        description: 'Pour Y to X',
      },
    ])
  })

  it('calculate 0, 0, 1', async () => {
    const result = await getPath(0, 0, 1)
    expect(result.body.data.getPath.bestSolution).toEqual(null)
  })
  it('calculate 10, 10, 0', async () => {
    const result = await getPath(0, 0, 1)
    expect(result.body.data.getPath.bestSolution).toEqual(null)
  })
  it('calculate 0, 1, 1', async () => {
    const result = await getPath(0, 0, 1)
    expect(result.body.data.getPath.bestSolution).toEqual(null)
  })
  it('calculate 1, 0, 1', async () => {
    const result = await getPath(0, 0, 1)
    expect(result.body.data.getPath.bestSolution).toEqual(null)
  })

  const getPath = async (x, y, z) => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: `
      query getPath($pathInput: PathInput!) {
        getPath(pathInput: $pathInput) {
          bestSolution {
            x
            y
            description
          }
          worstSolution {
            x
            y
            description
          }
        }
      }`,
        variables: {
          pathInput: {
            x,
            y,
            z,
          },
        },
      })
      .set('Accept', 'application/json')
  }
})
