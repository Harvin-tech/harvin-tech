// utils/auth.ts
import { cookies } from 'next/headers';

export async function getToken() {
  const cookieStore = cookies();
  const token = cookieStore.get('token')?.value;
  // Add JWT verification logic here
  return token ? JSON.parse(token) : null;
}
