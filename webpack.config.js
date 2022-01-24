const { HotModuleReplacementPlugin } = require("webpack");
const path = require("path");

class WatchStatePlugin {
  apply(compiler) {
    const id = `WatchStatePlugin`;
    let count = 1;
    let isWatchMode = false;
    let prevAssets = [];

    compiler.hooks.watchRun.tapAsync(id, function (compiler, callback) {
      callback();

      if (compiler.modifiedFiles) {
        Array.from(compiler.modifiedFiles).forEach((file) => {
          console.log("-".repeat(100));
          console.log(
            `\u001b[33m[${id}][WatchTriggers] MODIFIED: ${file}\u001b[0m`
          );
          console.log("-".repeat(100));
        });
      }

      if (compiler.removedFiles) {
        Array.from(compiler.removedFiles).forEach((file) => {
          console.log("-".repeat(100));
          console.log(
            `\u001b[33m[${id}][WatchTriggers] REMOVED: ${file}\u001b[0m`
          );
          console.log("-".repeat(100));
        });
      }
      isWatchMode = true;
    });

    compiler.hooks.afterEmit.tapAsync(id, function (compilation, callback) {
      callback();

      console.log("-".repeat(100));
      console.log("Compilation counter: ", count++);
      console.log("-".repeat(100));

      return;
    });
  }
}

module.exports = {
  mode: "development",
  target: "node",
  entry: "./src/app",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  watchOptions: {
    // aggregateTimeout: 100,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [],
      },
    ],
  },
  plugins: [new HotModuleReplacementPlugin(), new WatchStatePlugin()],
};