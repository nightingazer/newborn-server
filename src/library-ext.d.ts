export {}

declare global {
  namespace Express {
    // augmentation of Passport's User interface
    // to meet this app's needs
    interface User {
      userId: string
      email: string
    }
  }
}
