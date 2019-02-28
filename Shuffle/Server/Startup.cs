using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MagnificentMovieMenu.movies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

namespace MagnificentMovieMenu
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<moviesContext>(options =>
          options.UseMySql(Configuration.GetConnectionString("DefaultConnection")));
      services.AddIdentity<IdentityUser, IdentityRole>()
          .AddEntityFrameworkStores<moviesContext>()
          .AddDefaultTokenProviders();
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "Client/dist";
      });
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseStaticFiles();

      //app.UseSpaStaticFiles();
      //app.UseSpa(spa =>
      //{
      //    spa.Options.SourcePath = "ClientApp";
      //    if (env.IsDevelopment())
      //    {
      //        spa.UseAngularCliServer(npmScript: "start");
      //    }
      //});

      app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());
      app.UseHttpsRedirection();
      app.UseMvc();

      //dbContext.Database.EnsureCreated();
    }
  }
}
