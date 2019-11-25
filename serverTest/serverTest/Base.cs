using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Mime;
using System.Threading.Tasks;
using NUnit.Framework;
using System.Drawing;
using System.IO;
using System.Text.Encodings.Web;

namespace serverTest {
    public class Base {
        protected const string ServerUrl = "http://localhost:8050/";
        protected static readonly HttpClient Client = new HttpClient();

        [Test]
        public async Task IsServerIsOk() {
            HttpResponseMessage response = await Client.GetAsync(ServerUrl);  // кинет исключение если не найдет ури
            Assert.IsTrue(response.IsSuccessStatusCode);
        }
        
    }
}