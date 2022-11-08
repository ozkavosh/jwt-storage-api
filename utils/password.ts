import bCrypt from "bcrypt";

export const isValidPassword = (user: any, password: any) => {
  return bCrypt.compareSync(password, user.password);
};

export const encryptPassword = (password: any) => {
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10));
};