// import { Test, TestingModule } from '@nestjs/testing';
// import { HttpStatus, INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import * as mongoose from 'mongoose';
// import { ProjectsModule } from '../src/projects/projects.module';
// import { ProjectDto } from '../src/projects/dto/create-project.dto'
// import { AppModule } from './../src/app.module';

// describe('ProjectController (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     await mongoose.connect(process.env.TEST_MONGO, 
//       {useNewUrlParser: true, useUnifiedTopology: true})
//     await mongoose.connection.db.dropDatabase();
//   })

//   beforeEach(async () => {
//     const moduleFixture: TestingModule = await Test.createTestingModule({
//       imports: [AppModule],
//     }).compile();

//     app = moduleFixture.createNestApplication();
//     await app.init(); 
//   });

//   afterAll(async done => {
//     await mongoose.disconnect(done);
//     await app.close()
//   })

  
//   const project = {
//     _id: "",
//     title: "The Only Project",
//     startDate: "14 December 2020",
//     endDate: "25 December 2020",
//     visibility: "Public",
//     description: "The only project I have ever made.",
//     contributor: [["jack", "jack@nutz.com"]],
//     filesToDelete: [],
//     files:[]
//   }

//   it('should create a new project', async (done) => {
  
//     return request(app.getHttpServer())
//       .post('/projects/save')
//       .send(project)
//       .expect(response => {
//         response
        
//         // expect(response).toBeDefined()
//         // expect(response.body._id).toBeDefined();
//         // expect(response.body.title).toBeDefined();
//         // expect(response.body.startDate).toBeDefined();
//         // expect(response.body.endDate).toBeDefined();
//         // expect(response.body.visibility).toBeDefined();
//         // expect(response.body.description).toBeUndefined();
//         // expect(response.body.contributor).toBeUndefined();
//         // expect(response.body.filesToDelete).toBeUndefined();
//         // expect(HttpStatus.CREATED)
//         // done()
        
//       })
//     });



// });