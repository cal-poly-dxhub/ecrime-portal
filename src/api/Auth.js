import { Auth } from 'aws-amplify';

export const logout = () => Auth.signOut();
