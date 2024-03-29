class Env {
  static API_URL: string = process.env.NEXT_PUBLIC_API_URL as string;
  static APP_URL: string = process.env.NEXT_PUBLIC_NEXT_AUTH_URL as string;
}

export default Env;
