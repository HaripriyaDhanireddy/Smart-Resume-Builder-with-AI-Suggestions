const { MongoClient } = require('mongodb');

// Modified connection options
const uri = "mongodb+srv://elevatelabsproject:Haripriya%4020@haripriya.qdsldvy.mongodb.net/resume-builder?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: false,
  tlsInsecure: false,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 20000,
  connectTimeoutMS: 20000,
  retryWrites: true,
  retryReads: true,
  appName: "ResumeBuilderApp"
});

async function run() {
  try {
    console.log("⌛ Attempting connection...");
    await client.connect();
    
    // Verify connection
    await client.db().command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB Atlas!");
    
    // List databases to confirm access
    const dbs = await client.db().admin().listDatabases();
    console.log("📦 Available databases:", dbs.databases.map(db => db.name));
    
  } catch (err) {
    console.error("❌ Fatal connection error:", err.message);
    console.error("Full error details:", err);
    
    // Detailed SSL diagnostics
    if (err.message.includes('SSL')) {
      console.log("\n🔐 SSL Troubleshooting:");
      console.log("1. Try adding these to connection options:");
      console.log("   tlsAllowInvalidCertificates: true");
      console.log("2. Check your OpenSSL version:");
      console.log("   openssl version");
      console.log("3. Verify network connectivity:");
      console.log("   ping haripriya.qdsldvy.mongodb.net");
    }
  } finally {
    await client.close();
  }
}

run();

