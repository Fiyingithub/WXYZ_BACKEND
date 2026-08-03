// import dotenv from "dotenv";


// // Correct dotenv config
// dotenv.config();

// const ENV = {
//   nodeEnv: process.env.NODE_ENV || "development",
  

//   port: process.env.PORT || 5000,

//   db: {
//     host: process.env.NODE_ENV === "development" ? process.env.DEV_DB_HOST : process.env.PROD_DB_HOST, 
//     user: process.env.NODE_ENV === "development" ? process.env.DEV_DB_USER : process.env.PROD_DB_USER,
//     password: process.env.NODE_ENV === "development" ? process.env.DEV_DB_PASSWORD : process.env.PROD_DB_PASSWORD,
//     name: process.env.NODE_ENV === "development" ? process.env.DEV_DB_NAME : process.env.PROD_DB_NAME,
//     dialect: process.env.NODE_ENV === "development" ? process.env.DEV_DB_DIALECT : process.env.PROD_DB_DIALECT,
//     dataBaseUrl: process.env.NODE_ENV === "development" ? process.env.DEV_DATABASE_URL : process.env.PROD_DATABASE_URL,
//     port: process.env.NODE_ENV === "development" ? process.env.DB_PORT : process.env.PROD_DB_PORT,
//   },

//   jwt: {
//     accessSecret: process.env.JWT_ACCESS_SECRET,
//     refreshSecret: process.env.JWT_REFRESH_SECRET,
//     accessSecretExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "1d",
//     refreshSecretExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
//   },

//   mail: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   brevo: {
//     user: process.env.BREVO_USER,
//     key: process.env.BREVO_KEY,
//   },
//   email: {
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   baseUrl: {
//     development: process.env.DEV_BASE_URL,
//     production: process.env.PROD_BASE_URL
//   },
//   openai: {
//     apiKey: process.env.OPENAI_API_KEY
//   },
//   google: {
//     apiKey: process.env.GOOGLE_GEMINI_API_KEY
//   },
//   groq: {
//     apiKey: process.env.GROQ_API_KEY
//   },
//   redis: {
//     url: process.env.REDIS_URL,
//     host: process.env.REDIS_HOST,
//     port: Number(process.env.REDIS_PORT),
//     password: process.env.REDIS_PASS,
//     username: process.env.REDIS_USER, // optional, Redis Cloud uses default
//   }, 
//   cloudinary: {
//     cloudName: process.env.CLOUDINARY_NAME,
//     apiKey: process.env.CLOUDINARY_KEY,
//     apiSecret: process.env.CLOUDINARY_SECRET,
//   },
// };

// export default ENV;












import dotenv from "dotenv";

dotenv.config();


const ENV = {

 nodeEnv: process.env.NODE_ENV ?? "development",

 port:Number(process.env.PORT ?? 4000),


 database:{
    url:process.env.DATABASE_URL,

    ssl:
      process.env.DATABASE_SSL === "true",

    caPath:
      process.env.CA_CERT_PATH ?? "certs/ca.pem"
 },


 jwt:{
    accessSecret:process.env.JWT_ACCESS_SECRET,
    refreshSecret:process.env.JWT_REFRESH_SECRET
 },


 cloudinary:{
    cloudName:process.env.CLOUDINARY_NAME,
    apiKey:process.env.CLOUDINARY_KEY,
    apiSecret:process.env.CLOUDINARY_SECRET
 }

};

export default ENV;