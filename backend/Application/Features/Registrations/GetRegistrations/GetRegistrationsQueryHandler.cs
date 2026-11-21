namespace Application.Features.Registrations.GetRegistrations;

using Application.Abstractions.Data;
using Application.Abstractions.Messaging;
using Domain.Common;
using Microsoft.EntityFrameworkCore;

public sealed class GetRegistrationsQueryHandler
    : IQueryHandler<GetRegistrationsQuery, Result<PagedRegistrationsResponse>>
{
    private readonly IAppDbContext _dbContext;

    public GetRegistrationsQueryHandler(IAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<Result<PagedRegistrationsResponse>> HandleAsync(
        GetRegistrationsQuery query,
        CancellationToken cancellationToken = default)
    {
        var registrations = _dbContext.Registrations.AsNoTracking();

        // Filter by participant name.
        if (!string.IsNullOrWhiteSpace(query.ParticipantName))
        {
            registrations = registrations.Where(r =>
                EF.Functions.Like(
                    r.ParticipantName,
                    $"%{query.ParticipantName.Trim()}%"));
        }

        // Filter by registration type.
        if (query.RegistrationType.HasValue)
        {
            registrations = registrations.Where(r =>
                r.RegistrationType == query.RegistrationType.Value);
        }

        // Filter by registration status.
        if (query.Status.HasValue)
        {
            registrations = registrations.Where(r =>
                r.Status == query.Status.Value);
        }

        var totalCount = await registrations.CountAsync(cancellationToken);

        var items = await registrations
            .OrderByDescending(r => r.RegistrationDate)
            .ThenByDescending(r => r.Id)
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .Select(r => new RegistrationListItem(
                r.Id,
                r.RegistrationNumber,
                r.RegistrationDate,
                r.ParticipantName,
                r.CarMakeModel,
                r.PlateNumber,
                r.RegistrationType,
                r.Status,
                r.RegistrationFee,
                r.AmountPaid,
                r.PaymentStatus))
            .ToListAsync(cancellationToken);

        var totalPages = (int)Math.Ceiling(
            (double)totalCount / query.PageSize);

        var response = new PagedRegistrationsResponse(
            items,
            query.Page,
            query.PageSize,
            totalCount,
            totalPages);

        return Result<PagedRegistrationsResponse>.Success(response);
    }
}