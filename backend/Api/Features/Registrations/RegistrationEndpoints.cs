
namespace Api.Features.Registrations;

using Api.Common.Extensions;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Application.Features.Registrations.GetRegistrations;
using Application.Features.Registrations.GetRegistrationById;
using Application.Features.Registrations.GetRegistrationSummary;
using Domain.Common;
using Domain.Entities;
using FluentValidation;

public static class RegistrationEndpoints
{
    public static void MapRegistrationEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/registrations")
            .WithTags("Registrations");

        // POST: Create a registration
        group.MapPost("/", CreateRegistration)
            .AddEndpointFilter<ValidationFilter<CreateRegistrationCommand>>()
            .WithName("CreateRegistration")
            .WithSummary("Create a new car show registration")
            .Produces<CreateRegistrationResponse>(StatusCodes.Status201Created)
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status409Conflict);

        // GET: Get registrations with filtering and pagination
        group.MapGet("/", GetRegistrations)
            .WithName("GetRegistrations")
            .WithSummary("Get registrations with optional filters and pagination")
            .Produces<PagedRegistrationsResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status400BadRequest);

        // GET: Get registration summary
        group.MapGet("/summary", GetRegistrationSummary)
            .WithName("GetRegistrationSummary")
            .WithSummary("Get registration and payment summary")
            .Produces<RegistrationSummaryResponse>(StatusCodes.Status200OK);

        // GET: Get one registration by ID
        group.MapGet("/{id:guid}", GetRegistrationById)
            .WithName("GetRegistrationById")
            .WithSummary("Get a registration by its ID")
            .Produces<CreateRegistrationResponse>(StatusCodes.Status200OK)
            .ProducesProblem(StatusCodes.Status404NotFound);
    }

    private static async Task<IResult> CreateRegistration(
        CreateRegistrationCommand command,
        ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>> handler,
        CancellationToken cancellationToken)
    {
        var result = await handler.HandleAsync(command, cancellationToken);

        if (!result.IsSuccess)
        {
            return result.ToProblemDetails();
        }

        return Results.Created(
            $"/api/registrations/{result.Value!.Id}",
            result.Value);
    }

    private static async Task<IResult> GetRegistrations(
        string? participantName,
        RegistrationType? registrationType,
        RegistrationStatus? status,
        int? page,
        int? pageSize,
        IValidator<GetRegistrationsQuery> validator,
        IQueryHandler<GetRegistrationsQuery, Result<PagedRegistrationsResponse>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetRegistrationsQuery(
            participantName,
            registrationType,
            status,
            page ?? 1,
            pageSize ?? 10);

        var validationResult = await validator.ValidateAsync(
            query,
            cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = validationResult.Errors
                .GroupBy(error => error.PropertyName)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(error => error.ErrorMessage).ToArray());

            return Results.ValidationProblem(errors);
        }

        var result = await handler.HandleAsync(query, cancellationToken);

        if (!result.IsSuccess)
        {
            return result.ToProblemDetails();
        }

        return Results.Ok(result.Value);
    }

    private static async Task<IResult> GetRegistrationSummary(
        IQueryHandler<GetRegistrationSummaryQuery, Result<RegistrationSummaryResponse>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetRegistrationSummaryQuery();

        var result = await handler.HandleAsync(query, cancellationToken);

        if (!result.IsSuccess)
        {
            return result.ToProblemDetails();
        }

        return Results.Ok(result.Value);
    }

    private static async Task<IResult> GetRegistrationById(
        Guid id,
        IQueryHandler<GetRegistrationByIdQuery, Result<CreateRegistrationResponse>> handler,
        CancellationToken cancellationToken)
    {
        var query = new GetRegistrationByIdQuery(id);

        var result = await handler.HandleAsync(query, cancellationToken);

        if (!result.IsSuccess)
        {
            return result.ToProblemDetails();
        }

        return Results.Ok(result.Value);
    }
}
