using System;
using System.IO;
using System.Net;
using System.Net.Http;
using NUnit.Framework;


namespace serverTest {
    public class Tests {
        private WebRequest _request;
        
        [OneTimeSetUp]
        public void OneTimeSetup() {
            _request = WebRequest.Create("http://localhost:8050/");
            _request.Credentials = CredentialCache.DefaultCredentials;
        }

        [OneTimeTearDown]
        public void OneTimeTearDown() {

        }
        
        [SetUp]
        public void Setup() {
        }

        [Test]
        public void IsServerAvailable() {
            WebResponse response = _request.GetResponse();
            Assert.AreEqual("OK", ((HttpWebResponse)response).StatusDescription);
            response.Close();
        }

        public string readData() {
            WebResponse response = _request.GetResponse();
            string responseFromServer;
            using (Stream dataStream = response.GetResponseStream())
            {
                // Open the stream using a StreamReader for easy access.  
                StreamReader reader = new StreamReader(dataStream);
                // Read the content.  
                responseFromServer = reader.ReadToEnd();
                // Display the content.  
                Console.WriteLine(responseFromServer);
            }
            response.Close();
            return responseFromServer;
        }
        
        [Test]
        public void Test1() {

        }
    }
}
