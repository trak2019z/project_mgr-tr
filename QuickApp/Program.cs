using System;
using System.IO;
using System.Net;
using DAL;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using QuickApp.Helpers;

namespace QuickApp
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IConfigurationRoot config = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json").AddCommandLine(args)
                .Build();

            var host = CreateWebHostBuilder(args, config).Build();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var databaseInitializer = services.GetRequiredService<IDatabaseInitializer>();
                    databaseInitializer.SeedAsync().Wait();
                }
                catch (Exception ex)
                {
                    var logger = services.GetRequiredService<ILogger<Program>>();
                    logger.LogCritical(LoggingEvents.INIT_DATABASE, ex, LoggingEvents.INIT_DATABASE.Name);

                    throw new Exception(LoggingEvents.INIT_DATABASE.Name, ex);
                }

                host.Run();
            }
        }


        public static IWebHostBuilder CreateWebHostBuilder(string[] args, IConfigurationRoot config) =>
        WebHost.CreateDefaultBuilder(args).UseKestrel(options => {
            bool useSelfSignedCert = false;
            bool.TryParse(config["SelfSignedCert"], out useSelfSignedCert);
            var useHttps = false;
            bool.TryParse(config["UseHttps"], out useHttps);
            if (useHttps)
            {
                {
                    options.Listen(IPAddress.Loopback, 5001);
                    options.Listen(IPAddress.Loopback, 5002,
                        listenOptions => { listenOptions.UseHttps(config["SSLKeyPath"], config["SSLPassword"]); });
                }
         
            }
        })
                .UseStartup<Startup>()
                .ConfigureLogging((hostingContext, logging) =>
                {
                    logging.ClearProviders();
                    logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
                    logging.AddConsole();
                    logging.AddDebug();
                    logging.AddEventSourceLogger();
                    logging.AddFile(hostingContext.Configuration.GetSection("Logging"));
                });
    }
}
