
namespace Application.Features.Registrations.GetRegistrationById;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations.CreateRegistration;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationByIdQueryHandler
    : IQueryHandler<GetRegistrationByIdQuery, Result<CreateRegistrationResponse>>
{
    private readonly IAppDbContext _dbContext;

    public GetRegistrationByIdQueryHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<CreateRegistrationResponse>> HandleAsync(
        GetRegistrationByIdQuery query,
        CancellationToken cancellationToken = default)
    {
        var registration = await _dbContext.Registrations
            .AsNoTracking()
            .FirstOrDefaultAsync(
                r => r.Id == query.Id,
                cancellationToken);

        if (registration is null)
        {
            return Result<CreateRegistrationResponse>.Failure(
                Error.NotFound(
                    "Registration.NotFound",
                    "The requested registration was not found."));
        }

        var response = new CreateRegistrationResponse(
            registration.Id,
            registration.RegistrationNumber,
            registration.RegistrationDate,
            registration.ParticipantName,
            registration.ContactNumber,
            registration.Email,
            registration.Address,
            registration.CarMakeModel,
            registration.PlateNumber,
            registration.RegistrationType,
            registration.Status,
            registration.RegistrationFee,
            registration.AmountPaid,
            registration.PaymentStatus);

        return Result<CreateRegistrationResponse>.Success(response);
    }
}
