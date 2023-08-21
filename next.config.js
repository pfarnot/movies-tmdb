module.exports = {

    env: {
        apikey: process.env.API_KEY,
    },
    serverRuntimeConfig: {
        apikey: process.env.API_KEY,
        // Will only be available on the server side
        //   mySecret: 'secret',
        //   secondSecret: process.env.SECOND_SECRET, // Pass through env variables
    },
    publicRuntimeConfig: {
        apikey: process.env.API_KEY,
        // Will be available on both server and client
        //   staticFolder: '/static',
    },
}

// /** @type {import('next').NextConfig} */
// const nextConfig = {

//     apikey:process.env.API_KEY,

// }

// module.exports = nextConfig


