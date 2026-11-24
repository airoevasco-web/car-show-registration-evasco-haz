
using Api.Features.Registrations;
using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Common;
using Domain.Entities;
using FluentValidation;
using Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// CORS - Allow React Frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactFrontend", policy =>
    {
        policy.WithOrigins(
                "http://localhost:5173",
                "http://localhost:5174")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(
        new System.Text.Json.Serialization.JsonStringEnumConverter());
});

// Database - SQLite
builder.Services.AddDbContext<IAppDbContext, AppDbContext>(options =>
    options.UseSqlite("Data Source=carshow.db"));

// Validators
builder.Services.AddValidatorsFromAssembly(typeof(IAppDbContext).Assembly);

// Command handlers
builder.Services.AddScoped<
    ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>,
    CreateRegistrationCommandHandler>();

builder.Services.AddScoped<
    IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>>,
    GetRegistrationSummaryQueryHandler>();

// Query handlers
builder.Services.AddScoped<
    IQueryHandler<GetRegistrationsQuery, Result<PagedRegistrationsResponse>>,
    GetRegistrationsQueryHandler>();

builder.Services.AddScoped<
    IQueryHandler<GetRegistrationByIdQuery, Result<CreateRegistrationResponse>>,
    GetRegistrationByIdQueryHandler>();

// API
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddOpenApi(options =>
{
    options.AddDocumentTransformer((document, _, _) =>
    {
        document.Info.Title = "Car Show Registration API";
        document.Info.Description = "API for managing Car Show Registrations";
        return Task.CompletedTask;
    });
});

var app = builder.Build();

// Enable CORS
app.UseCors("AllowReactFrontend");

// Seed data
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    var existingNumbers = await dbContext.Registrations
        .Select(r => r.RegistrationNumber)
        .ToListAsync();

    var existingPlates = await dbContext.Registrations
        .Select(r => r.PlateNumber)
        .ToListAsync();

    var registrationNumbers = existingNumbers.ToHashSet();
    var plateNumbers = existingPlates.ToHashSet();

    var carModels = new[]
    {
        "Honda Civic",
        "Toyota Vios",
        "Mitsubishi Mirage",
        "Toyota Fortuner",
        "Honda City",
        "Nissan Almera"
    };

    var registrationsToAdd = new List<Registration>();

    for (int i = 2; i <= 25; i++)
    {
        var registrationNumber = $"CS27-{i:0000}";
        var plateNumber = $"SEED-{i:0000}";

        if (registrationNumbers.Contains(registrationNumber) ||
            plateNumbers.Contains(plateNumber))
        {
            continue;
        }

        var type = (RegistrationType)((i - 2) % 3);
        var status = (RegistrationStatus)((i - 2) % 4);
        var paymentChoice = (i - 2) % 3;

        var fee = type switch
        {
            RegistrationType.Exhibitor => 1500m,
            RegistrationType.Competitor => 2500m,
            RegistrationType.VIP => 5000m,
            _ => 1500m
        };

        var amountPaid = paymentChoice switch
        {
            0 => 0m,
            1 => fee / 2,
            _ => fee
        };

        registrationsToAdd.Add(new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = registrationNumber,
            RegistrationDate = DateTime.UtcNow.AddDays(-i),
            ParticipantName = $"Participant {i}",
            ContactNumber = $"0917{i:0000000}",
            Email = $"participant{i}@example.com",
            Address = "Sorsogon City, Philippines",
            CarMakeModel = carModels[(i - 2) % carModels.Length],
            PlateNumber = plateNumber,
            RegistrationType = type,
            Status = status,
            RegistrationFee = fee,
            AmountPaid = amountPaid
        });
    }

    if (registrationsToAdd.Count > 0)
    {
        dbContext.Registrations.AddRange(registrationsToAdd);
        await dbContext.SaveChangesAsync();
    }

    Console.WriteLine(
        $"Database contains {await dbContext.Registrations.CountAsync()} registrations.");
}

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
}

// Root endpoint
app.MapGet("/", () =>
    "Welcome to the Car Show Registration API! Go to /scalar/v1 for API documentation.");

// Map endpoints
app.MapRegistrationEndpoints();

app.Run();
