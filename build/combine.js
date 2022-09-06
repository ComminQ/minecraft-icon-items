const fs = require("fs");

module.exports = ([items, icons, bukkits]) => {
  const toMap = {};
  bukkits.forEach((element) => {
    toMap[element.name] = element.bukkitEnum;
  });

  const differences = JSON.parse(
    fs.readFileSync("./build/Difference.json", {
      encoding: "utf-8",
    })
  );
  const differencesMap = {};
  differences.forEach((element) => {
    differencesMap[element.name] = element.bukkit;
  });

  return items.map((item) => {
    const res = Object.assign(item, {
      icon: icons[item.id],
      bukkit: toMap[item.name],
    });

    let found = false;
    if (!res.bukkit) {
      res.bukkit = differencesMap[item.name];
      if (res.bukkit) {
        console.log(
          `Resolved unknown block with difference (${res.bukkit} / ${item.name})`
        );
      }
    }
    return res;
  });
};
