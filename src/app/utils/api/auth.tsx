export function login(username: string, password: string) {
  return new Promise(resolve => {
    setTimeout(() => resolve({ token: '1', ttl: 123 }), 5000);
  });
}
