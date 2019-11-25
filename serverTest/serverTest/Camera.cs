using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using NUnit.Framework;

namespace serverTest {
    public class Camera : Base {

        
        [TestCase( ServerUrl + "gallery/camera")]
        public async Task IsAllCamerasAvailable(string route) {
            int camersCount = 5;
            for (int camera = 1; camera < camersCount; camera++) {
                HttpResponseMessage response = await Client.GetAsync($"{route}/{camera}");
                if (response.EnsureSuccessStatusCode().StatusCode != HttpStatusCode.OK) {
                    Assert.Warn($"Camera {camera} is not found");
                }
            }
        }
    }
}