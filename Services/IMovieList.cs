using System.Collections.Generic;
using System.Threading.Tasks;
using CopaFilmesTeste.Models;

namespace CopaFilmesTeste.Services
{
    public interface IMovieList
    {
        List<Competitors> FirstRound(List<Competitors> movies);

        List<Competitors> SecondRound(List<Competitors> movies);

        List<Competitors> FinalRound(List<Competitors> movies);
    }
}
