const { Credentials } = require('aws-sdk')
const S3 = require('aws-sdk/clients/s3')

const s3Client = new S3({
  region: process.env.LINODE_OBJECT_STORAGE_REGION,
  endpoint: process.env.LINODE_OBJECT_STORAGE_ENDPOINT,
  sslEnabled: false,
  s3ForcePathStyle: true,
  credentials: new Credentials({
    accessKeyId: process.env.LINODE_OBJECT_STORAGE_ACCESS_KEY_ID,
    secretAccessKey: process.env.LINODE_OBJECT_STORAGE_SECRET_ACCESS_KEY
  })
})

const deletePhotoFromS3 = async (key) => {
  const params = {
    Bucket: process.env.LINODE_OBJECT_STORAGE_BUCKET,
    Key: key
  }

  return new Promise((resolve, reject) => {
    s3Client.deleteObject(params, function(err, data) {
      if (err) {
        console.log(err.toString())
        reject({
          statusCode: 500,
          body: err.toString()
        })
      } else {
        console.log(data)
        resolve({
          statusCode: 200,
          body: data
        })
      }
    })
  })
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 
    'Origin, X-Requested-With, Content-Type, Accept',
  'Access-Control-Allow-Methods': '*'
}

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
    }
  }

  try {
    const { name } = JSON.parse(event.body)
    console.log(name)
    const response = await deletePhotoFromS3(name)
    if (response.statusCode !== 200) {
      return {
        statusCode: response.statusCode,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
        body: response.body,
      }
    } else {
      return {
        statusCode: response.statusCode,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response.body)
      }
    }
  } catch (error) {
    return { 
      statusCode: 500,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
      },
      body: error.toString()
    }
  }
}

module.exports = { handler }
