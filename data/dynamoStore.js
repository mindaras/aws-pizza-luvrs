const AWS = require("aws-sdk");

AWS.config.update({ region: "eu-central-1" });

const dynamodb = new AWS.DynamoDB();

function putItem(table, item, callback) {
  const params = {
    TableName: table,
    Item: {}
  };

  for (key of Object.keys(item)) {
    let val;

    if (typeof item[key] === "string") {
      val = { S: item[key] };
    } else if (typeof item[key] === "number") {
      val = { N: `${item[key]}` };
    } else if (item[key] instanceof Array) {
      val = { SS: item[key] };
    }

    params.Item[key] = val;
  }

  dynamodb.putItem(params, callback);
}

function getAllItems(table, callback) {
  const params = {
    TableName: table
  };

  dynamodb.scan(params, callback);
}

function getItem(table, idName, id, callback) {
  const params = {
    TableName: table,
    Key: {}
  };

  params.Key[idName] = { S: id };

  dynamodb.getItem(params, callback);
}

module.exports.putItem = putItem;
module.exports.getAllItems = getAllItems;
module.exports.getItem = getItem;
