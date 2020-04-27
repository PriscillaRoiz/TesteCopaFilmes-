using CopaFilmesTeste.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CopaFilmesTeste.Services
{
    public interface IMatchService
    {
        Task<List<Movie>> GetAllMovies();

    }
} 