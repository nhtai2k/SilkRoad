using BOM.DAL;
using Lipstick.DAL;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi;
using PersonalFinance.DAL;
using Serilog;
using Stock.DAL;
using Survey.DAL;
using System.DAL;
using System.DAL.DTOs;
using System.Globalization;
using System.Reflection;
using System.Share;
using System.Share.Models;
using System.Text;
using System.Text.Json.Serialization;
using WebCore.Server._Convergence.Hubs;

namespace WebCore.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Configure Serilog
            Log.Logger = new LoggerConfiguration()
                .MinimumLevel.Debug()
                .WriteTo.Console()
                .WriteTo.File("Logs/log-.txt", rollingInterval: RollingInterval.Day)
                .CreateLogger();

            try
            {
                Log.Information("Starting web application");

                var builder = WebApplication.CreateBuilder(args);

                // Add Serilog to DI and logging
                builder.Host.UseSerilog();

                var applicationconfig = builder.Configuration.GetSection("AppConfig");
                var crossOrigins = builder.Configuration.GetSection("CorsOrigins").Get<string[]>();
                ServerAppConfig appConfig = applicationconfig.Get<ServerAppConfig>();
                if(appConfig == null || crossOrigins == null)
                {
                    throw new Exception("AppConfig section is missing or invalid in appsettings.json");
                }

                builder.Services.AddSingleton(appConfig);
                builder.Services.AddControllers();
                builder.Services.AddSignalR();
                // Add CORS policy
                builder.Services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy", builder => builder
                        .WithOrigins(crossOrigins)
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
                });
                // Add services to the container.
                #region add database context
                builder.Services.Configure<MongoDBSettings>(builder.Configuration.GetSection("MongoDBSettings"));
                //BOM DB
                builder.Services.AddDbContext<BOM.DAL.ApplicationContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("BOMSqlConnection")));
                //Survey DB
                builder.Services.AddDbContext<Survey.DAL.ApplicationContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("SurveySqlConnection")));
                //Personal Finance DB
                builder.Services.AddDbContext<PersonalFinance.DAL.ApplicationContext>(options =>
               options.UseSqlServer(builder.Configuration.GetConnectionString("PersonalFinanceSqlConnection")));
                //Lipstick DB
                builder.Services.AddDbContext<Lipstick.DAL.ApplicationContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("LipstickSqlConnection")));
                //LipstickMember DB
                builder.Services.AddDbContext<LipstickDataAccess.MemberContext.LipstickMemberDatabaseContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("LipstickMemberSqlConnection")));
                //Stock Market DB
                builder.Services.AddDbContext<Stock.DAL.ApplicationContext>(options =>
                    options.UseSqlServer(builder.Configuration.GetConnectionString("StockMarketSqlConnection")));
                //System DB
                builder.Services.AddDbContext<System.DAL.ApplicationContext>(options =>
                                options.UseSqlServer(builder.Configuration.GetConnectionString("SqlConnection")));
                builder.Services.AddIdentity<UserDTO, RoleDTO>()
                    .AddEntityFrameworkStores<System.DAL.ApplicationContext>()
                    .AddDefaultTokenProviders();
                builder.Services.Configure<IdentityOptions>(options =>
                {
                    // Password settings.
                    options.Password.RequireDigit = false;
                    options.Password.RequireLowercase = false;
                    options.Password.RequireNonAlphanumeric = false;
                    options.Password.RequireUppercase = false;
                    options.Password.RequiredLength = 6;
                    options.Password.RequiredUniqueChars = 1;

                    // Lockout settings.
                    options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                    options.Lockout.MaxFailedAccessAttempts = 10;
                    options.Lockout.AllowedForNewUsers = true;

                    // User settings.
                    //options.User.AllowedUserNameCharacters =
                    //"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._@+";
                    //options.User.RequireUniqueEmail = false;
                });
                builder.Services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                }).AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ClockSkew = TimeSpan.Zero,
                        ValidIssuer = appConfig.Issuer,
                        ValidAudience = appConfig.Audience,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appConfig.Key))
                    };
                });
                builder.Services.AddAuthorization();
                builder.Services.ConfigureApplicationCookie(options =>
                {
                    // Cookie settings
                    options.Cookie.HttpOnly = true;
                    options.ExpireTimeSpan = TimeSpan.FromHours(8);

                    //options.LoginPath = "/Admin/Login/Index";
                    //options.AccessDeniedPath = "/Admin/Login/AccessDenied";
                    options.SlidingExpiration = true;
                });
                #endregion
                #region AddLocalization
                builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");
                builder.Services.AddMvc()
                    .AddViewLocalization()
                    .AddDataAnnotationsLocalization(options =>
                    {
                        options.DataAnnotationLocalizerProvider = (type, factory) =>
                        {
                            var assemblyName = new AssemblyName(typeof(SharedResource).GetTypeInfo().Assembly.FullName);
                            return factory.Create("ErrorMessage", assemblyName.Name);
                        };
                    });
                builder.Services.Configure<RequestLocalizationOptions>(options =>
                {
                    var supportedCultures = new[]
                    {
                        new CultureInfo("en-US"),
                        new CultureInfo("vi-VN")
                    };

                    options.DefaultRequestCulture = new RequestCulture("en-US");
                    options.SupportedCultures = supportedCultures;
                    options.SupportedUICultures = supportedCultures;
                    var cookieProvider = options.RequestCultureProviders
                            .OfType<CookieRequestCultureProvider>()
                            .First();
                    //cookieProvider.Options.DefaultRequestCulture = new RequestCulture("vi-VN");
                    //options.RequestCultureProviders.Clear();
                    options.RequestCultureProviders.Add(cookieProvider);
                    //options.RequestCultureProviders.Insert(0, new QueryStringRequestCultureProvider());
                });
                //builder.Services.AddSingleton<WebAppLanguageService>();
                #endregion
                #region Swagger
                // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
                builder.Services.AddOpenApi();
                // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
                builder.Services.AddEndpointsApiExplorer();
                builder.Services.AddSwaggerGen(opt =>
                {
                    opt.SwaggerDoc("v1", new OpenApiInfo { Title = "AuthCore API", Version = "v1" });
                    opt.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                    {
                        In = ParameterLocation.Header,
                        Description = "Please enter token",
                        Name = "Authorization",
                        Type = SecuritySchemeType.Http,
                        BearerFormat = "JWT",
                        Scheme = "bearer"
                    });
                    opt.AddSecurityRequirement(document => new OpenApiSecurityRequirement
                    {
                        //{
                        //    new OpenApiSecurityScheme
                        //    {
                        //        Reference = new OpenApiReference
                        //        {
                        //            Type=ReferenceType.SecurityScheme,
                        //            Id="Bearer"
                        //        }
                        //    },
                        //    new string[]{}
                        //}
                        [new OpenApiSecuritySchemeReference("bearer", document)] = []
                    });
                });
                #endregion
                builder.Services.SignUp();
                builder.Services.AddControllers().AddJsonOptions(options =>
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
                var app = builder.Build();
                app.UseSerilogRequestLogging();
                #region Add Localization
                app.UseRequestLocalization(app.Services.GetRequiredService<IOptions<RequestLocalizationOptions>>().Value);
                #endregion
                app.UseDefaultFiles();
                app.MapStaticAssets();

                // Configure the HTTP request pipeline.
                if (app.Environment.IsDevelopment())
                {
                    app.MapOpenApi();
                    app.UseSwagger();
                    app.UseSwaggerUI(c =>
                    {
                        c.SwaggerEndpoint("/swagger/v1/swagger.json", "AuthCore API V1");
                    });
                }
                // Use CORS - must be before MapControllers and MapHub
                app.UseCors("CorsPolicy");
                app.UseHttpsRedirection();

                app.UseAuthentication();
                app.UseAuthorization();

                app.MapControllers();

                app.MapFallbackToFile("/index.html");
                app.MapHub<ChatHub>("/chat");
                app.Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Application terminated unexpectedly");
            }
            finally
            {
                Log.CloseAndFlush();
            }
        }
    }
}
