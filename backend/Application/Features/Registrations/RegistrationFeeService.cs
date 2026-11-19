
namespace Application.Features.Registrations;

using Domain.Entities;

public static class RegistrationFeeService
{
    public static decimal GetFee(RegistrationType registrationType)
    {
        return registrationType switch
        {
            RegistrationType.Exhibitor => 1500m,
            RegistrationType.Competitor => 2500m,
            RegistrationType.VIP => 5000m,
            _ => throw new ArgumentOutOfRangeException(
                nameof(registrationType),
                registrationType,
                "Invalid registration type.")
        };
    }
}
