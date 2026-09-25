// import { seedUsers } from "./user.seed";

const main = async () => {
  // const { userCount } = await seedUsers();
};

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed ⚠️", err);
    process.exit(1);
  });
