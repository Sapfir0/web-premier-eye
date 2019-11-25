using System.Net.Http;

namespace serverTest {
    public class Base {
        protected const string ServerUrl = "http://localhost:8050/";
        protected static readonly HttpClient Client = new HttpClient();

    }
}