import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from '../src/app.module';
import { SignInDto } from 'src/Auth/dto/sign-in-dto';
import { CreateUserDto } from 'src/Auth/dto/create-user-dto';

describe('AuthController (e2e) ', () => {

  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO, 
      {useNewUrlParser: true, useUnifiedTopology: true})
    await mongoose.connection.db.dropDatabase();
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init(); 
  });

  afterAll(async done => {
    await mongoose.disconnect(done);
    await app.close()
  })


  /**________TEST START________**/
  const user: CreateUserDto = {
    fullname: "Deez Nutz",
    email: "Deez@nutz.com",
    password: "123456",
    username: "DeezNutZ",
    visibility: "private",
    visibilitylist: []
  }

  it('should Sign up user', async (done) => {
  
  return request(app.getHttpServer())
    .post('/auth/signup')
    .send(user)
    .expect(response => {
      expect(response.body).toBeDefined()
      expect(response.body.fullname).toBeDefined();
      expect(response.body.email).toBeDefined();
      expect(response.body.username).toBeDefined();
      expect(response.body.visibility).toBeDefined();
      expect(response.body.visibilitylist).toBeDefined();
      expect(response.body.password).toBeUndefined();
      expect(response.body.salt).toBeUndefined();
      expect(HttpStatus.CREATED)
      done()
    })
  });

  
  it('should not Sign up User(Duplicate)', async (done) => {
  
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(user)
      .expect(response => {
        expect(response.body.fullname).toBeUndefined();
        expect(response.body.email).toBeUndefined();
        expect(HttpStatus.CONFLICT)
        done()
      })
  });

  it('should fail to login (UnAuthorised)', (done) => {

    const user: SignInDto = {
      email: "NonExistentEmail@nutz.com",
      password: "123456"
    }
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(user)
      .then(response => {
        expect(response.body.accessToken).toBeUndefined();
        expect(response.body.fullname).toBeUndefined();
        expect(response.body.email).toBeUndefined();
        expect(HttpStatus.UNAUTHORIZED)
        done();
      })
  });

  let token = null;

  it('should login and return JWT', (done) => {
    const user: SignInDto = {
      email: "Deez@nutz.com",
      password: "123456",

    }
    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(user)
      .then(response => {
        expect(response.body.accessToken).toBeDefined();
        expect(response.body.fullname).toBeDefined();
        expect(response.body.email).toBeDefined();
        expect(response.body.username).toBeDefined();
        expect(response.body.visibility).toBeDefined();
        expect(response.body.visibilitylist).toBeDefined();
        expect(HttpStatus.OK)
        token = response.body.accessToken;
        done();
      })
  });

  it('Access Token Should work', (done) => {
    expect(token).toBeDefined()
    request(app.getHttpServer())
      .get('/test/authenticated')
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(HttpStatus.OK)
        done();
      })
  })



});
