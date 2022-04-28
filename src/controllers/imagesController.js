const carSchema = require('../models/carSchema');
const aws = require('aws-sdk');

const s3 = new aws.S3();

exports.upload = async (req, res) => {
    const { key, location: url = "" } = req.file
    const carId = req.params.carId

    await carSchema.findByIdAndUpdate(carId, { $push: { images: { key: key, url: url } } });

    return res.json();
}

exports.delete = async (req, res) => {
    const carId = req.params.carId
    const key = req.params.key

    await carSchema.findByIdAndUpdate(carId, { $pull: { images: { key: key } } }, { multi: true });

    function removeStorage() {

        return s3
            .deleteObject({
                Bucket: process.env.BUCKET,
                Key: key
            }).promise()
    };

    removeStorage();

    return res.send();

}



