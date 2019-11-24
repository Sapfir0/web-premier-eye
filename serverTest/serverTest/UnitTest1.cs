using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NUnit.Framework;


namespace serverTest {
    public class Tests {
        static readonly HttpClient client = new HttpClient();
        protected static readonly string ServerUrl = "http://localhost:8050/";
        
        [OneTimeSetUp]
        public void OneTimeSetup() {
        }

        [OneTimeTearDown]
        public void OneTimeTearDown() {

        }
        
        [SetUp]
        public void Setup() {
        }
        

        [Test]
        public async Task IsStatusCodeIsOk() {
            HttpResponseMessage response = await client.GetAsync(ServerUrl);  // кинет исключение если не найдет
            Assert.IsTrue(response.EnsureSuccessStatusCode().StatusCode == HttpStatusCode.OK);
        }


        
        [TestCase(ServerUrl+"gallery/camera")]
        public async Task IsAllCamerasAvailable(string route) {
            int camersCount = 5;
            for (int camera = 1; camera < camersCount; camera++) {
                HttpResponseMessage response = await client.GetAsync($"{route}/{camera}");
                if (response.EnsureSuccessStatusCode().StatusCode != HttpStatusCode.OK) {
                    Assert.Warn($"Camera {camera} is not found");
                }
            }
        }
    }
}
