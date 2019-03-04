using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using MagnificentMovieMenu.Repositories.Things;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using MagnificentMovieMenu.AzureDbContext;
using Microsoft.AspNetCore.Cors.Infrastructure;


namespace MagnificentMovieMenu
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
          .SetBasePath(env.ContentRootPath)
          .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
          .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
          .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfigurationRoot Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddDbContext<moviesContext>(options =>
              options.UseMySql(Configuration.GetConnectionString("AzureConnection")));

      services.AddCors(options =>
      {
        options.AddPolicy("AllowAll",
        builder =>
        {
          builder
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
        });
      });

      // ********************
      // Setup CORS
      // ********************
      // var corsBuilder = new CorsPolicyBuilder();
      // corsBuilder.AllowAnyHeader();
      // corsBuilder.AllowAnyMethod();
      // corsBuilder.AllowAnyOrigin(); // For anyone access.
      //                               //corsBuilder.WithOrigins("http://localhost:56573"); // for a specific url. Don't add a forward slash on the end!
      // corsBuilder.AllowCredentials();

      // services.AddCors(options =>
      // {
      //   options.AddPolicy("SiteCorsPolicy", corsBuilder.Build());
      // });

      // Add framework services.
      services.AddSingleton<IThingsRepository, ThingsRepository>();
      services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      var angularRoutes = new[] {
                 "/menu",
                 "/about"
             };

      app.Use(async (context, next) =>
      {
        if (context.Request.Path.HasValue && null != angularRoutes.FirstOrDefault(
                  (ar) => context.Request.Path.Value.StartsWith(ar, StringComparison.OrdinalIgnoreCase)))
        {
          context.Request.Path = new PathString("/");
        }

        await next();
      });



      app.UseCors("AllowAll");
      //app.UseCors(options => options.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod().AllowCredentials());

      // app.UseCors("SiteCorsPolicy");


      app.UseDefaultFiles();
      app.UseStaticFiles();

      app.UseMvc(routes =>
      {
        routes.MapRoute(
                  name: "default",
                  template: "{controller=Home}/{action=Index}/{id?}");
      });
    }
  }
}
