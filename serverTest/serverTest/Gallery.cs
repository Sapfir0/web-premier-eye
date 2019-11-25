using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NUnit.Framework;

namespace serverTest {
    public class Gallery : Base  {
        static readonly HttpClient Client = new HttpClient();

        [TestCase(ServerUrl + "gallery")]
        public async Task GetAllImagesNotEmpty(string route) {
            string response = await Client.GetStringAsync(route);
            var imagesList = JsonConvert.DeserializeObject<List<string>>(response);
            Assert.IsNotEmpty(imagesList); 
            
        }
        
        [TestCase(ServerUrl + "gallery")]
        public async Task GetAllImagesHaveSameElements(string route) {
            string response = await Client.GetStringAsync(route);
            var imagesList = JsonConvert.DeserializeObject<List<string>>(response);
            Assert.IsTrue(imagesList.Distinct().Skip(1).Any());
        }
    }
}