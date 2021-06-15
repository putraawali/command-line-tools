module.exports = function convert(dataLog) {
  dataLog = dataLog.split("\r\n");
  let temp = [];
  dataLog.forEach((each) => {
    temp.push(each.split(": "));
  });
  let obj = {};
  temp.forEach((each) => {
    obj[each[0]] = each[1];
  });
  console.log(obj);
  return obj;
};
