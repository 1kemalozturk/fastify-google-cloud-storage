'use strict'

const fp = require('fastify-plugin')
const { Storage } = require('@google-cloud/storage')

function fastifyGoogleCloudStorage (fastify, options, next) {
  const { projectId, keyFilename } = options

  const storage = new Storage({
  projectId: projectId,
  keyFilename: keyFilename
  });
  
    async function listBuckets() {
    const [buckets] = await storage.getBuckets();

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
        fastify.decorate('googleCloudStorage', storage)

        next()
    });
  }

  listBuckets().catch(console.error);

}

module.exports = fp(fastifyGoogleCloudStorage, {
  fastify: '>=3.0.0',
  name: 'fastify-google-cloud-storage'
})
