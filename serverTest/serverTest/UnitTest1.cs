using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;


namespace serverTest {
    public class Tests : Base {
        
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
        public async Task IsServerIsOk() {
            HttpResponseMessage response = await Client.GetAsync(ServerUrl);  // кинет исключение если не найдет ури
            Assert.IsTrue(response.EnsureSuccessStatusCode().StatusCode == HttpStatusCode.OK);
        }
        

    }
}
