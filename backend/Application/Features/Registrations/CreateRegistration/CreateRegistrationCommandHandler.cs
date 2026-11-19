namespace Application.Features.Registrations.CreateRegistration;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Application.Features.Registrations;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

public sealed class CreateRegistrationCommandHandler
    : ICommandHandler<CreateRegistrationCommand, Result<CreateRegistrationResponse>>
{
    private readonly IAppDbContext _dbContext;

    public CreateRegistrationCommandHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<CreateRegistrationResponse>> HandleAsync(
        CreateRegistrationCommand command,
        CancellationToken cancellationToken = default)
    {
        // Check if the plate number already exists.
        var plateExists = await _dbContext.Registrations
            .AnyAsync(
                r => r.PlateNumber == command.PlateNumber,
                cancellationToken);

        if (plateExists)
        {
            return Result<CreateRegistrationResponse>.Failure(
                new Error(
                    "Registration.Conflict",
                    "This plate number is already registered."));
        }

        // Generate the next registration number.
        var totalRegistrations = await _dbContext.Registrations
            .CountAsync(cancellationToken);

        var registrationNumber = $"CS27-{totalRegistrations + 1:D4}";

        // The server determines the registration fee.
        var registrationFee = RegistrationFeeService.GetFee(
            command.RegistrationType);

        var registration = new Registration
        {
            Id = Guid.NewGuid(),
            RegistrationNumber = registrationNumber,
            RegistrationDate = DateTime.UtcNow,
            ParticipantName = command.ParticipantName,
            ContactNumber = command.ContactNumber,
            Email = command.Email,
            Address = command.Address,
            CarMakeModel = command.CarMakeModel,
            PlateNumber = command.PlateNumber,
            RegistrationType = command.RegistrationType,
            Status = RegistrationStatus.Pending,
            RegistrationFee = registrationFee,
            AmountPaid = command.AmountPaid
        };

        _dbContext.Registrations.Add(registration);

        await _dbContext.SaveChangesAsync(cancellationToken);

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