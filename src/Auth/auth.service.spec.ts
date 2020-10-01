
import { JwtModule } from "@nestjs/jwt/dist/jwt.module";
import { Test, TestingModule } from "@nestjs/testing"
import { AuthController } from "./auth.controller";
import { AuthModule } from "./auth.module";
import { AuthService } from "./auth.service";

const mockTaskRepository = () => ({
  signIn: jest.fn(),
});




describe('TasksService', () => {

  let authService: AuthService;

  beforeEach( async() => {
    const module:TestingModule = await Test.createTestingModule({
      providers: [
        { provide: AuthService, useFactory: mockTaskRepository },
      ],
    }).compile();

    authService = await module.get<AuthService>(AuthService);
  }); 

  it('signUp', () => {
    authService.signIn({email: "1234", password:"1234"})
    expect(authService.signUp).not.toHaveBeenCalled();
  })

  // describe('SignUp', () => {
  //   console.log(authService)

  //   it('successfully signs up the user', () => {
  //     // save.mockResolvedValue(undefined)
  //     // expect(authService.signUp(mockCredentialsDto).resolves.not.toThrow())
  //     expect(true).toBe(true)
  //   })

  // })
})
