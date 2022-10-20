import yargs from "yargs";

const yargsInstance = yargs(process.argv.slice(2))
  .default({
    p: 8080,
  })
  .alias({
    p: "PORT",
  });

const args = yargsInstance.argv;

const config = {
  port: args.PORT,
  others: args._,
};

export default config;
