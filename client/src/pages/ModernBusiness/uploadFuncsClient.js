import axios from 'axios'

// const evaulation = require("../../package.json");
// // console.log(evaulation)
// const { config } = require("../../package.json");

let handleUpload = async (ev, uploadInput, values) => {
    let urls = []

    for (let i in uploadInput) {
        let file = uploadInput[i].files[0];

        // Split the filename to get the name and type
        let fileParts = uploadInput[i].files[0].name.split('.');
        let fileName = fileParts[0];
        let fileType = fileParts[1];
        console.log("Preparing the upload");
        let url = await insertFile(file, fileName, fileType)
        console.log(url)
        urls.push(url)

    }
    // console.log('infunc')
    // console.log('f', urls, urls.length)
    return urls

}

let insertFile = (file, fileName, fileType) => {
    return axios.post("/sign_s3", {
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
                        'Content-Type': fileType
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