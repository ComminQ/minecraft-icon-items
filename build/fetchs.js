const superagent = require("superagent");
const binaryParser = require("superagent-binary-parser");
const jsonParser = require("superagent-jsonparse");
const AdmZip = require("adm-zip");
const fs = require("fs/promises");

module.exports.fetchItems = () =>
  superagent
    .get("http://minecraft-ids.grahamedgecombe.com/items.json")
    .then((res) => JSON.parse(res.text));

const pathToId = (path) => {
  const matched = path.match(/^(\d+)-(\d+)\.png$/);
  return `${matched[1]}:${matched[2]}`;
};

module.exports.fetchIcons = () => {
  const icons = {};

  return superagent
    .get("http://minecraft-ids.grahamedgecombe.com/items.zip")
    .buffer()
    .parse(binaryParser)
    .then((res) => res.body)
    .then((buffer) => new AdmZip(buffer))
    .then((zip) => zip.getEntries())
    .then((entries) =>
      entries.forEach((entry) => {
        const itemId = pathToId(entry.entryName);
        icons[itemId] = entry.getData().toString("base64");
      })
    )
    .then(() => icons);
};

module.exports.fetchBukkit = () => {

  return fs
    .readFile("./build/Output.json", { encoding: "utf-8" })
    .then((buffer) => JSON.parse(buffer));
};
