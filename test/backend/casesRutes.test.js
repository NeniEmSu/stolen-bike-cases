import request from 'supertest'
require('dotenv').config()
const app = process.env.BASE_URL

const caseData = {
  owners_name: 'Fred',
  bike_description: 'red bmx bike for a teen',
  type: 'sports BMX',
  theft_date: '1995-12-06T20:00:00.000Z',
  theft_location: 'bazar',
  theft_description:
    'i chained the bike to the pole but it was cut and the bike taken',
}

describe('Post Endpoints', () => {
  it('Should post to /api/cases without and retun status of 201', async () => {
    const res = await request(app)
      .post('/api/cases')
      .send(caseData)
      .set('Content-Type', 'application/json')
      .expect('Content-Type', /json/)
    expect(res.status).toEqual(201)
    expect(res.body).toHaveProperty('newCase')
  })
})
