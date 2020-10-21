import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule, HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';
import * as mongoose from 'mongoose';
import * as admin from 'firebase-admin';
import { MongooseConfig } from "../src/Config/mongoose.config";
import  Axios from 'axios';

describe('AuthControllerV2 (e2e)', () => {
  // Constants for testing
  const idpUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`
  const testUid = "fnkyS9tHuwhW2seFI1H3d5ZCjnh1";

  //Token for testing
  let globalIdToken;

  // App
  let app: INestApplication;

  beforeAll(async () => {
    await mongoose.connect(process.env.TEST_MONGO, MongooseConfig)
    await mongoose.connection.db.dropDatabase();
    
    admin.initializeApp({
      credential: admin.credential.cert(process.env.FIREBASE_APPLICATION_CREDENTIALS),
      storageBucket: "brainfolio-1faf6.appspot.com"
    }); 

    const customToken = await admin.auth().createCustomToken(testUid);
    await Axios.post(idpUrl,{
      token: customToken,
      returnSecureToken: true
    })
    .then(async ({data}) => {
      const { idToken } = data;
      globalIdToken = idToken;
      

    }).catch(err => {
      console.log(err)
    })
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, HttpModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init(); 
  });

  afterAll(async done => {
    await mongoose.disconnect(done);
    await app.close()
    done()
  })


  /**________TEST START________**/



  it('Expect Token to be Defined', (done) => {
     expect(globalIdToken).toBeDefined()
     done()
  })

  it('POST /check/username should be true', async (done) => {
    
    await request(app.getHttpServer())
    .post('/v2/auth/check/username')
    .send({
      username: "random_username"
    })
    .expect(response => {
      expect(response.body).toBeDefined()
      expect(response.body.isUnique).toBe(true);
      expect(HttpStatus.OK)
      done()
    })

    await done()
 
  });



  it('POST /validate should return user', async (done) => {
    expect(globalIdToken).toBeDefined()
    await request(app.getHttpServer())
    .post('/v2/auth/validate')
    .set('Authorization', `Bearer ${globalIdToken}`)
    .expect(response => {
      expect(response.body).toBeDefined()
      expect(response.body.uid).toBeDefined();
      expect(response.body.email).toBeDefined();
      expect(response.body.visibilitylist).toBeDefined();
      expect(HttpStatus.OK)
    })
    await done()
  });

  it('POST /set/username should return user with username', async (done) => {
    await request(app.getHttpServer())
    .post('/v2/auth/set/username')
    .set('Authorization', `Bearer ${globalIdToken}`)
    .send({
      username: "random_username"
    })
    .expect(response => {
      expect(response.body).toBeDefined()
      expect(response.body.uid).toBeDefined();
      expect(response.body.email).toBeDefined();
      expect(response.body.visibilitylist).toBeDefined();
      expect(response.body.username).toBeDefined();
      expect(HttpStatus.OK)
      done()
    })

    await done()
  });

  it('POST /set/username should return conflict', async (done) => {
    await request(app.getHttpServer())
    .post('/v2/auth/set/username')
    .set('Authorization', `Bearer ${globalIdToken}`)
    .send({
      username: "random_username"
    })
    .expect(response => {
      expect(response.body).toBeDefined()
      expect(response.body.uid).toBeUndefined();
      expect(response.body.email).toBeUndefined();
      expect(response.body.visibilitylist).toBeUndefined();
      expect(response.body.username).toBeUndefined();
      expect(HttpStatus.CONFLICT)
      done()
    })
    await done()
  });

  it('POST /check/username should be false', async(done) => {
    await request(app.getHttpServer())
    .post('/v2/auth/check/username')
    .send({
      username: "random_username"
    })
    .expect(response => {
      expect(response.body).toBeDefined()
      expect(response.body.isUnique).toBe(false);
      expect(HttpStatus.OK)
      done()
    })
    await done()
  });

  
 })
  
