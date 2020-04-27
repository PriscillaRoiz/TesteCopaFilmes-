using CopaFilmesTeste.Models;
using CopaFilmesTeste.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace CopaFilmesTeste.Services
{
    public class MatchService : IMatchService

    {
        public async Task<List<Movie>> GetAllMovies()
        {
            using (var client = new HttpClient())
            {
                var url = new Uri("http://copafilmes.azurewebsites.net/api/filmes");

                var response = await client.GetAsync(url);

                List<Movie> moviesList = new List<Movie>();

                using (var content = response.Content)
                {
                    string apiResponse = await content.ReadAsStringAsync();
                    moviesList = JsonConvert.DeserializeObject<List<Movie>>(apiResponse);
                }

                return moviesList;
            }
        }
    }
}

