import { faker } from "@faker-js/faker"
export const generateRandomUsers = () => {
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      color: faker.color.rgb(),
    });
  }
  return users;
}