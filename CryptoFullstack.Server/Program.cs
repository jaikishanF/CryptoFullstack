using CryptoAPI;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        policyBuilder => policyBuilder.WithOrigins("https://localhost:4200")
            .AllowAnyHeader()
            .AllowAnyMethod());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Setup the connection with the API of CoinMarketCap
builder.Services.AddHttpClient("CoinMarketCapClient", client =>
{
    // Setup the URL where all requests are being sent to
    client.BaseAddress = new Uri("https://pro-api.coinmarketcap.com/");
    // Setup to expect return JSON 
    client.DefaultRequestHeaders.Add("Accept", "application/json");
    // Personal API key for authentication
    client.DefaultRequestHeaders.Add("X-CMC_PRO_API_KEY", "043697ba-4117-4253-8e6a-530f901584e6");
});

builder.Services.AddScoped<CoinMarketCapService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors("AllowSpecificOrigin");

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
