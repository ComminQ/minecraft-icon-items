module.exports = ([items, icons, bukkits]) => {
  const toMap = {};
  bukkits.forEach((element) => {
    toMap[element.name] = element.bukkitEnum;
  });

  return items.map((item) =>
    Object.assign(item, { icon: icons[item.id], bukkit: toMap[item.name] })
  );
};
