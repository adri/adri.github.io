function filenameToTitle(opts) {
  return function checkTitleTransformer(root, file) {
    console.log("file", file, file.cwd, file.stem, file.data);
    console.log(root.children[0]);

    return;
  };
}

module.exports = filenameToTitle;
