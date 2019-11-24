using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using NUnit.Framework;

namespace serverTest {
    public class gallery : Tests {
        [TestCase(ServerUrl+"gallery")]
        public async Task GetAllImagesNotEmpty(string route) {
            string response = await client.GetStringAsync(route);
            var imagesList = JsonConvert.DeserializeObject<List<string>>(response);
            Assert.IsNotEmpty(imagesList); // хотя бы одно изображение
            
        }
        
        [TestCase(ServerUrl+"gallery")]
        public async Task GetAllImagesHaveSameElements(string route) {
            string response = await client.GetStringAsync(route);
            var imagesList = JsonConvert.DeserializeObject<List<string>>(response);
            Assert.IsTrue(imagesList.Distinct().Skip(1).Any());
        }
    }
}