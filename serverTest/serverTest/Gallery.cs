using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NUnit.Framework;

namespace serverTest {
    public class Gallery : Base {
        private const string routeUrl = ServerUrl + "gallery";
        
        [TestCase(routeUrl)]
        public async Task GetAllImagesNotEmpty(string route) {
            string response = await Client.GetStringAsync(route);
            var imagesList = JsonConvert.DeserializeObject<List<string>>(response);
            Assert.IsNotEmpty(imagesList); 
            
        }
        
        [TestCase(routeUrl)]
        public async Task GetAllImagesHaveSameElements(string route) {
            string response = await Client.GetStringAsync(route);
            var imagesList = JsonConvert.DeserializeObject<List<string>>(response);
            Assert.IsTrue(imagesList.Distinct().Skip(1).Any());
        }
    }
}