using FlowerStore.Hubs;
using FlowerStore.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Configuration;
using System.Security.Cryptography;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<FlowerStoreContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("FlowerStore"));
});

builder.Services.AddCors();

// Đọc các cài đặt từ appsettings.json hoặc nơi bạn lưu cài đặt
byte[] secretKeyBytes;
using (var cryptoProvider = new RNGCryptoServiceProvider())
{
    secretKeyBytes = new byte[32]; // Độ dài khóa 256 bits
    cryptoProvider.GetBytes(secretKeyBytes);
}

var key = new SymmetricSecurityKey(secretKeyBytes); // Đổi khóa bí mật này thành một giá trị thực sự an toàn

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(secretKeyBytes),
            ValidateIssuer = false, // Có thể đặt theo nơi bạn phát hành token
            ValidateAudience = false // Có thể đặt theo nơi bạn phát hành token
        };
    });

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(builder =>
        builder.WithOrigins("http://127.0.0.1:5501", "https://flowerstore.bsite.net").AllowAnyMethod().AllowAnyHeader().AllowCredentials());
}

app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.MapControllerRoute(name: "api",
        pattern: "api/{controller}/{action}/{id?}");

app.MapHub<ChatHub>("/chatHub");

app.Run();
