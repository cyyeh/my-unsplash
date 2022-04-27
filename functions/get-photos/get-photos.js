const { Credentials } = require('aws-sdk')
const S3 = require('aws-sdk/clients/s3')

const s3Client = new S3({
  region: process.env.S3_REGION,
  endpoint: process.env.S3_ENDPOINT,
  sslEnabled: false,
  s3ForcePathStyle: true,
  credentials: new Credentials({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY
  })
})

const getPhotosFromS3 = async () => {
  const params = {
    Bucket: process.env.S3_BUCKET,
  }

  return new Promise((resolve, reject) => {
    s3Client.listObjects(params, function(err, data) {
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
          body: data.Contents.map(photo => {
            const _photoSplit = photo.Key.split('.')
            return {
              "name": photo.Key,
              "url": `http://${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/${photo.Key}`,
              "label": _photoSplit.slice(0, _photoSplit.length - 1).join('.')
            }
          })
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
    const response = await getPhotosFromS3()
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
