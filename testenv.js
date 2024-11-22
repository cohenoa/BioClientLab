// // Load environment variables from .env file
// const { Client } = require('minio');
// require('dotenv').config();

// // Access environment variables
// const minioClient = new Client({
//   endPoint: process.env.MINIO_API_URL,    // MinIO server address
//   accessKey: process.env.MINIO_ACCESS_ID,  // MinIO access key
//   secretKey: process.env.MINIO_ACCESS_PASS, // MinIO secret key
// });

// // Example usage: Download an object
// const bucketName = "bio-upload-files";       // Replace with your bucket name
// const objectName = 'send.txt';     // Replace with the object name
// const filePath = "/home/nitzan/Documents/GitHub/BioClientLab/send.txt"; // Replace with the local file path

// minioClient.fPutObject(bucketName, objectName, filePath, (error) => {
//   if (error) {
//     return console.log('Error occurred:', error);
//   }
//   console.log(`Successfully downloaded ${objectName} to ${filePath}`);
// });
