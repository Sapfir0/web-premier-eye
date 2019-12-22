using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;
using System.Drawing;

namespace serverTest {
    public class UploadImage : Base {
        private const string routeUrl = ServerUrl + "upload";
        
        [TestCase(routeUrl)]
        public async Task UploadImageWithInfoAreCorrectly(string route) {
            
            string resPath = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..", "res");
            string imagePath = Path.Combine(resPath, "1_20190718144434.jpg");
            string jsonPath = Path.Combine(resPath, "test.json");
            string image = File.ReadAllText(imagePath);
            string json = File.ReadAllText(jsonPath);
            
            MultipartFormDataContent form = new MultipartFormDataContent();
            
            form.Add(new StringContent(image), "file");
          
            form.Add(new StringContent(json), "json");
            
            
            var response = await Client.PostAsync(route, form );

            Assert.IsTrue(response.IsSuccessStatusCode);
        }
        
        [TestCase(routeUrl), Timeout(1000)]
        public async Task TimeTestInCorrectSituation(string route) {
            await UploadImageWithInfoAreCorrectly(route);
        }

        [TestCase(routeUrl)]
        public async Task NoImageJsonHere(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task NoJsonImageHere(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task NoImageNoJson(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task IncorrectJson(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task IncorrectImageFilename(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task ImageFilenameFromTheFutureMustBeDenied(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task IncorrectImageExtension(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task JsonNotInUtf8(string route) {
        
        }
        
        [TestCase(routeUrl)]
        public async Task IncorrectPostBodySpecifier(string route) {
            // должен вернуть что-то явное
        }
    }
}