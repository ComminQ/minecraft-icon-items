const { fetchIcons, fetchItems, fetchBukkit } = require("./fetchs");
const combineItemsAndIcons = require("./combine");
const  mapFetchedItems = require("./mapFetchedItems");
const objectifyMappedItems = require("./objectifyMappedItems");
const writeJsonFiles = require("./writeJsonFiles");
const path = require("path");

function step(str) {
  return (arguments) => {
    console.log(str);
    return arguments;
  };
}

Promise.all([fetchItems(), fetchIcons(), fetchBukkit()])
  .then(step("Loaded items, icons and bukkit"))
  .then(step("Mapping..."))
  // .then(([items, icons, bukkit]) => console.log([items.length, Object.keys(icons).length, bukkit.length]))
  .then(([items, icons, bukkit]) => [mapFetchedItems(items), icons, bukkit])
  .then(step("Combine items, icons and bukkit data..."))
  .then(combineItemsAndIcons)
  .then(step("Create objects ..."))
  .then(objectifyMappedItems)
  .then(step("Write to json file..."))
  .then((items) => writeJsonFiles(items, path.join(__dirname, "../data")))
  .then(step("Finished !"));
