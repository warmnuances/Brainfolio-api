// import { Test, TestingModule } from '@nestjs/testing';
// import { HttpStatus, INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import * as mongoose from 'mongoose';
// import { ProjectsModule } from '../src/projects/projects.module';
// import { ProjectDto } from '../src/projects/dto/create-project.dto'
// import { AppModule } from '../src/app.module';
// import * as admin from 'firebase-admin';
// import { MongooseConfig } from '../src/Config/mongoose.config';
// import Axios from 'axios';
// var FormData = require('form-data');


// describe('ProjectController (e2e)', () => {
    
//     // Constants for testing
//     const idpUrl = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyCustomToken?key=${process.env.FIREBASE_API_KEY}`
//     const testUid = "OqeZshgUhlch84UvjorRhVVntxj1";

//     //Token for testing
//     let globalIdToken;

//     // App
//     let app: INestApplication;

//     beforeAll(async () => {
//         await mongoose.connect(process.env.TEST_MONGO, MongooseConfig)
//         await mongoose.connection.db.dropDatabase();
    
//         console.log(process.env.FIREBASE_APPLICATION_CREDENTIALS)
//         admin.initializeApp({
//         credential: admin.credential.cert(process.env.FIREBASE_APPLICATION_CREDENTIALS),
//         storageBucket: "brainfolio-1faf6.appspot.com"
//         }); 

//         const customToken = await admin.auth().createCustomToken(testUid);
//         await Axios.post(idpUrl,{
//         token: customToken,
//         returnSecureToken: true
//         })
//         .then(async ({data}) => {
//         const { idToken } = data;
//         globalIdToken = idToken;
        

//         }).catch(err => {
//         console.log(err)
//         })
//     })

//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//         imports: [AppModule],
//         }).compile();

//         app = moduleFixture.createNestApplication();
//         await app.init(); 
//     });

//     afterAll(async done => {
//         await mongoose.disconnect(done);
//         await app.close()
//     })



//     var mockProjectData = new FormData();
//     mockProjectData.append('_id', '')
//     mockProjectData.append('title',"The Only Project" )
//     mockProjectData.append('startDate', "14 December 2020")
//     mockProjectData.append('endDate',  "25 December 2020")
//     mockProjectData.append('isPublic', 'true')
//     mockProjectData.append('description', "The only project I have ever made.")
//     mockProjectData.append('contributor', "jack,jack@nutz.com")
//     mockProjectData.append('filesToDelete','')
//     mockProjectData.append('filesToDelete','')
//     console.log(mockProjectData);
    
    

//     it('should create a new project', async (done) => {
    
//         return request(app.getHttpServer())
//         .post('/projects/save')
//         .set('Authorization', `Bearer ${globalIdToken}`)
//         .set('Content-Type', 'multipart/form-data')
//         .send(mockProjectData)
//         .expect(response => {
//             console.log(response);
            
            
//             // expect(response).toBeDefined()
//             // expect(response.body._id).toBeDefined();
//             // expect(response.body.title).toBeDefined();
//             // expect(response.body.startDate).toBeDefined();
//             // expect(response.body.endDate).toBeDefined();
//             // expect(response.body.visibility).toBeDefined();
//             // expect(response.body.description).toBeUndefined();
//             // expect(response.body.contributor).toBeUndefined();
//             // expect(response.body.filesToDelete).toBeUndefined();
//             // expect(HttpStatus.CREATED)
//             // done()
            
//         })
//     });



// });