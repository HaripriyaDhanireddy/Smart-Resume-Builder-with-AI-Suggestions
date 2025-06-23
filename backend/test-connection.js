const { MongoClient } = require('mongodb');

async function testConnection() {
  const uri = "mongodb+srv://elevatelabsproject:Haripriya%4020@haripriya.qdsldvy.mongodb.net/resume-builder?retryWrites=true&w=majority";
  
  try {
    const client = new MongoClient(uri, {
      tlsAllowInvalidCertificates: true,  // Bypass SSL validation
      serverSelectionTimeoutMS: 5000
    });
    await client.connect();
    console.log("✅ Successfully connected to MongoDB Atlas");
    await client.db().command({ ping: 1 });
    console.log("✅ Database ping successful");
    await client.close();
  } catch (err) {
    console.error("❌ Connection failed:", err.message);
  }
}

testConnection();