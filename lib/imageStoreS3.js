const AWS = require("aws-sdk");

const s3 = new AWS.S3({ region: "eu-central-1" });

module.exports.save = (name, data, callback) => {
  const params = {
    Bucket: "mindaugas-lazauskas-pizza-luvrs",
    Key: `pizzas/${name}.png`,
    Body: Buffer.from(data, "base64"),
    ContentEncoding: "base64",
    ContentType: "image/png"
  };

  s3.putObject(params, (err, data) => {
    callback(
      err,
      `//s3.eu-central-1.amazonaws.com/mindaugas-lazauskas-pizza-luvrs/${
        params.key
      }`
    );
  });
};
