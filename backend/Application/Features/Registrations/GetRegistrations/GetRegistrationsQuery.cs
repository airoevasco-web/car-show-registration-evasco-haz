namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Messaging;
using Domain.Common;
using Domain.Entities;

public sealed record GetRegistrationsQuery(
    string? ParticipantName,
    RegistrationType? RegistrationType,
    RegistrationStatus? Status,
    int Page,
    int PageSize
) : IQuery<Result<PagedRegistrationsResponse>>;

public sealed record PagedRegistrationsResponse(
    IReadOnlyList<RegistrationListItem> Items,
    int Page,
    int PageSize,
    int TotalCount,
    int TotalPages
);

public sealed record RegistrationListItem(
    Guid Id,
    string RegistrationNumber,
    DateTime RegistrationDate,
    string ParticipantName,
    string CarMakeModel,
    string PlateNumber,
    RegistrationType RegistrationType,
    RegistrationStatus Status,
    decimal RegistrationFee,
    decimal AmountPaid,
    PaymentStatus PaymentStatus
); 