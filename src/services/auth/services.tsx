/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { addData, retriveDataByField } from '@/lib/firebase/service';

export async function signIn(email: string) {
  const data = await retriveDataByField('user', 'email', email);

  if (data) {
    return data[0];
  } else {
    return null;
  }
}

export async function loginWithGoogle(data: { email: string; role?: string }, callback: Function) {
  const user = await retriveDataByField('user', 'email', data.email);

  if (user.length > 0) {
    callback(user[0]);
  } else {
    data.role = 'member';
    await addData('user', data, (result: boolean) => {
      if (result) {
        callback(data);
      }
    });
  }
}
