import axios from 'axios'
var aws = require('aws-sdk');

// // require('dotenv').config(); // Configure dotenv to load in the .env file
// // Configure aws with your accessKeyId and your secretAccessKey
// aws.config.update({
//   region: 'us-west-1', // Put your aws region here
//   accessKeyId: "AKIAJCEIL2IUDTO4BGEQ",
//   secretAccessKey:"YTAl4KZ9T3V9hyv4bKKo2VapzutE9uq9+V9XexAW"
// })

let handleUpload = async (ev, uploadInput, values) => {
    let urls = []
    // let fileNames = [this.uploadInputDF.value.replace(/^.*[\\\/]/, ''), this.uploadInputTR.value.replace(/^.*[\\\/]/, '')]

    for (let i in uploadInput) {
        let file = uploadInput[i].files[0];

        // Split the filename to get the name and type
        let fileParts = uploadInput[i].files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        // console.log(uploadInput[i].files[0].name, fileParts[1])
        // uploadInput[i].files[0].name is the full name.
        // fileParts[1] is the file extension

        // console.log("Preparing the upload");
        let url = await insertFile(file, fileName, fileType)
        console.log(url)
        urls.push(url)

    }
    // console.log('infunc')
    // console.log('f', urls, urls.length)
    return urls

}

let insertFile = (file, fileName, fileType) => {
    // const s3 = new aws.S3();
    // var params = {
    //     Body: file,
    //     Bucket: "plasma-donations", 
    //     Key: fileName, 
    //     ContentDisposition: `attachment; filename="${fileName + '.' + fileType}";`, // from `originalname`
    //     ContentType: 'application/'+fileType, // from `mimetype`
    //    };

      
    //    s3.putObject(params, function(err, data) {
    //     if (err) console.log(err, err.stack); // an error occurred
    //     else{
    //       console.log(data);           // successful response
    //       return ('yaw')
    //     }
    //   });
    
    return axios.post("/sign_s3", {
            file: file,
            fileName: fileName,
            fileType: fileType
        })
            .then(response => {
                var returnData = response.data.data.returnData;
                var signedRequest = returnData.signedRequest;
                var url = returnData.url;
                // console.log(url)

                var options = {
                    headers: {
                        'Content-Type': fileType,
                        'Content-Disposition': `attachment; filename="${fileName + '.' + fileType}";`,
                    }
                };
                return [signedRequest, file, options, url]
                
            }).then((data) => {
                let signedRequest = data[0]
                let file = data[1]
                let options = data[2]
                let url = data[3]
                return axios.put(signedRequest, file, options)
                .then(result => {
                    console.log("Response from s3 successful")

                    return url

                })
                .catch(error => {
                    alert("ERROR " + JSON.stringify(error));
                })
            }
                
            )
            .catch(error => {
                alert(JSON.stringify(error));
            })
}




// let handleUpload = (e, uploadInput) => {
//     console.log('func reached')
//     for (let i in uploadInput) {
//         let file = uploadInput[i].files[0];
//         console.log(file)
//     }
//     // let file = uploadInput.files[0];
//     // console.log(file)
// }
export default handleUpload