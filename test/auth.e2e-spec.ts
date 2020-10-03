import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import { AppModule } from './../src/app.module';
import { SignInDto } from 'src/Auth/dto/sign-in-dto';
import { CreateUserDto } from 'src/Auth/dto/create-user-dto';

describe('AppController (e2e)', () => {

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
    await mongoose.connection.close()
    await app.close()
    await done()
  })


  /**________TEST START________**/
  const user: CreateUserDto = {
    fullname: "Deez Nutz",
    email: "Deez@nutz.com",
    password: "123456"
  }

  it('should Sign up user', (done) => {
  
  return request(app.getHttpServer())
    .post('/auth/signup')
    .send(user)
    .expect(response => {
      expect(response.body).toBeDefined()
      expect(response.body.fullname).toBeDefined();
      expect(response.body.email).toBeDefined();
      // expect(response.body.password).toBeUndefined();
      // expect(response.body.salt).toBeUndefined();
      expect(HttpStatus.CREATED)
      done()
    }).then(() => {
      done()
    })
  });


  // it('should not Sign up User(Duplicate)', (done) => {
  
  //   return request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .send(user)
  //     .expect(response => {
  //       expect(response.body).toBeUndefined()
  //       expect(response.body.fullname).toBeUndefined();
  //       expect(response.body.email).toBeUndefined();
  //       // expect(response.body.password).toBeUndefined();
  //       // expect(response.body.salt).toBeUndefined();
  //       expect(HttpStatus.CREATED)
  //       done()
  //     }).then(() => {
  //       done()
  //     })
  //   });


  // it('should login and return JWT', (done) => {
  //   const user: SignInDto = {
  //     email: "Deez@nutz.com",
  //     password: "123456"
  //   }
  //   return request(app.getHttpServer())
  //     .post('/auth/signin')
  //     .send(user)
  //     .then(response => {
  //       expect(response.body.accessToken).toBeDefined();
  //       expect(response.status).toBe(200);
  //       done();
  //     })
  // });



});
