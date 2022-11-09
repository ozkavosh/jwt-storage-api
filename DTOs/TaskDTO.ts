type userDTOParams = {
  title: string;
  body: string;
  status: string;
  createdAt: string;
  finishedAt?: string;
  id?: string;
  _id?: string;
};

export default class UserDTO {
  title: string;
  body: string;
  status: string;
  createdAt: string;
  finishedAt?: string;
  id?: string;

  constructor({ title, body, status, createdAt, finishedAt, id, _id }: userDTOParams) {
    this.title = title;
    this.body = body;
    this.status = status;
    this.createdAt = createdAt;
    this.finishedAt = finishedAt;
    this.id = id || _id;
  }
}
