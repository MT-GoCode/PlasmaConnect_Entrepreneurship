const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
var cors = require('cors');
const { generateKeyPair } = require('crypto');



app = express.Router();
app.use(cors())

// configuring the DiscStorage engine.
const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

//setting the credentials
//The region should be the region of the bucket that you created
//Visit this if you have any confusion - https://docs.aws.amazon.com/general/latest/gr/rande.html
AWS.config.update({
    accessKeyId: process.env.iam_access_id,
    secretAccessKey: process.env.iam_secret,
    region: 'us-west-1',
});

//Creating a new instance of S3:
const s3 = new AWS.S3();

//POST method route for uploading file
app.post('/post_file', upload.single('demo_file'), function (req, res) {
    //Multer middleware adds file(in case of single file ) or files(multiple files) object to the request object.
    //req.file is the demo_file
    uploadFile(req.file.path, req.file.filename, req.file.mimetype, res);
})

//GET method route for downloading/retrieving file
app.get('/get_file/:file_name', (req, res) => {
    console.log('req received for get_file', req.params.file_name)
    retrieveFile(req.params.file_name, res);
});

//listening to server 3000
// app.listen(3100, () => {
//     console.log('Server running on port 3100');
// });

//The uploadFile function
function uploadFile(source, targetName, mimetype, res) {
    // console.log('request to upload from ' + source, targetName, mimetype)
    console.log('preparing to upload...');
    fs.readFile(source, function (err, filedata) {
        if (!err) {
            const putParams = {
                Bucket: process.env.Bucket,
                Key: targetName,
                Body: filedata,
                ContentType: mimetype,
                ContentDisposition: 'attachment',


            };

            s3.putObject(putParams, function (err, data) {

                if (err) {
                    console.log('Could nor upload the file. Error :', err);
                    return res.send({ success: false });
                }
                else {
                    fs.unlink(source, () => { console.log('') });// Deleting the file from uploads folder(Optional).Do Whatever you prefer.
                    console.log('Successfully uploaded the file', data);
                    // console.log(targetName)
                    var s3url = s3.getSignedUrl('getObject', { Key: targetName, Bucket: process.env.Bucket });
                    console.log(s3url)
                    res.setHeader('Content-Type', 'application/json');
                    return res.json({
                        // success: true,
                        key: targetName,
                        contentType: mimetype,
                    });
                }
            });

        }

        else {
            console.log({ 'err': err });
        }
    });
}

//The retrieveFile function
function retrieveFile(filename, res) {
    
    const getParams = {
        Bucket: process.env.Bucket,
        Key: filename
    };
    console.log(getParams)

    s3.getObject(getParams, function (err, data) {
        if (err) {

            return res.status(400).send({ success: false, err: err });
        }
        else {
            const encodedString = new Buffer(data.Body).toString('base64');
            res.set({
                'Content-Type': 'image/png',
                'Content-Disposition': `inline; filename="${filename}"`,
                
            });
            return res.send(encodedString);
        }
    });
}

module.exports = app;