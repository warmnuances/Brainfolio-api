export interface ISignInResponse {
  accessToken: string | null,
  fullname: string
  email: string
  username: string
  visibility: string
  visibilitylist: string[]
}