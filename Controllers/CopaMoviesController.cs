using CopaFilmesTeste.Models;
using CopaFilmesTeste.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CopaFilmesTeste.Controllers
{
    [ApiController]
    [EnableCors("EnableCORS")]
    public class CopaMoviesController : ControllerBase
    {
        private readonly IMatchService _matchService;
        private readonly IMovieList _movieList;

        public CopaMoviesController(IMatchService matchService, IMovieList movieList)
        {
            _matchService = matchService;
            _movieList = movieList;
        }

        [HttpGet]
        [Route("/api/allmovies")]
        public async Task<IActionResult> GetAllMovies()
        {
            var result = await _matchService.GetAllMovies();

            return Ok(result);

        }

        [HttpPost]
        [Route("/api/championship")]
        public IActionResult FinalRound([FromBody] List<Competitors> competitors)
        {
            List<Competitors> moviesToMatch = competitors;
            _movieList.FirstRound(moviesToMatch);
            _movieList.SecondRound(moviesToMatch);
            var final = _movieList.FinalRound(moviesToMatch);

            return Ok(final);
        }
    }
}