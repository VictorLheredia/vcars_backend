const crypto = require('crypto');
const aws = require('aws-sdk')
const multerS3 = require('multer-s3')


aws.config.update({
    'credentials': {
        'accessKeyId': process.env.AWS_ACCESS_KEY_ID_MYAPP,
        'secretAccessKey': process.env.AWS_SECRET_ACCESS_KEY_MYAPP
    },
    'region': process.env.AWS_REGION_MYAPP,
    'bucketname': process.env.AWS_BUCKET_NAME
    // (...)
})


const storageTypes = {
    s3: multerS3({
        s3: new aws.S3(),
        bucket: process.env.AWS_BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            crypto.randomBytes(6, (err, hash) => {
                if (err) cb(err);
                const filename = `${hash.toString('hex')}.${file.mimetype.split('/').pop()}`;
                cb(null, filename);
            })
        }
    })
}

module.exports = {
    storage: storageTypes.s3,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/gif'
        ];
        if (allowedMimes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Invalid file type."));
        }
    }
};