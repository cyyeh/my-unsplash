const { Credentials } = require('aws-sdk')
const S3 = require('aws-sdk/clients/s3')
const axios = require('axios')

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

const uploadFileToS3 = async (fileName, data, type) => {
  const params = {
    Bucket: process.env.LINODE_OBJECT_STORAGE_BUCKET,
    Key: fileName,
    Body: Buffer.from(data.replace(/^data:image\/\w+;base64,/, ""), 'base64'),
    ContentEncoding: 'base64',
    ACL: 'public-read',
    ContentType: type,
  }

  return new Promise((resolve, reject) => {
    s3Client.upload(params, function(err, data) {
      if (err) {
        console.log(err.toString())
        reject({
          statusCode: 500,
          body: err.toString()
        })
      } else {
        resolve({
          statusCode: 200,
          body: data
        })
      }
    })
  })
}

const transformUrlToImgData = async (imageUrl) => {
  const res = await axios.get(
    imageUrl,
    { responseType: 'arraybuffer' }
  )
  return [
    `data:${res.headers["content-type"]};base64,${Buffer.from(res.data).toString('base64')}`,
    res.headers["content-type"]
  ]
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
    const { label, url } = JSON.parse(event.body)
    const [data, type] = await transformUrlToImgData(url)
    const fileName = `${label}.${type.split('/')[1]}`
    const response = await uploadFileToS3(fileName, data, type)
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
        body: JSON.stringify({ name: fileName, url: response.body.Location, label: label })
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
