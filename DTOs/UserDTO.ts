type userDTOParams = {
  email: string;
  name: string;
  id?: string;
  _id?: string;
};

export default class UserDTO {
  email: string;
  name: string;
  id: string | undefined;

  constructor({ email, name, id, _id }: userDTOParams) {
    this.email = email;
    this.name = name;
    this.id = id || _id;
  }
}
