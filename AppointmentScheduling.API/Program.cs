using System.Reflection;
using AppointmentScheduling.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "_myAllowSpecificOrigins",
                      builder =>
                      {
                          builder.AllowAnyOrigin()
                                  .AllowAnyMethod()
                                  .AllowAnyHeader();
                      });
});

builder.Services.AddDbContext<AppointmentSchedulingContext>(
    x =>
    { x.UseSqlServer(@"Server=localhost;Database=Appointment3Project;User Id=sa;Password=Pass@word1;TrustServerCertificate=true"); });


builder.Services.AddScoped<AppointmentSchedulingContext>();

builder.Services.AddMediatR(x => {
    x.RegisterServicesFromAssembly(Assembly.Load("AppointmentScheduling.Application"));


});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthorization();
app.UseCors("_myAllowSpecificOrigins");

app.UseHttpsRedirection();


app.MapControllers();

app.Run();
