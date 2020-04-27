using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Http;
using CopaFilmesTeste.Services;
using System.Collections.Generic;

namespace CopaFilmesTeste
{
     public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("EnableCORS", builder =>
                {
                    builder
                       .AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod();
                });
            });

            services.AddSingleton<IMatchService, MatchService>();
            services.AddSingleton<IMovieList, MovieList>();

            services.AddMvc();
        }

        public void Configure(IApplicationBuilder app, IHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseHttpsRedirection();

            }

            app.UseCors("EnableCORS");

        }
    }
}