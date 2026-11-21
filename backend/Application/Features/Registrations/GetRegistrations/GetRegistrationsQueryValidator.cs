namespace Application.Features.Registrations.GetRegistrations;

using FluentValidation;

public sealed class GetRegistrationsQueryValidator
    : AbstractValidator<GetRegistrationsQuery>
{
    public GetRegistrationsQueryValidator()
    {
        RuleFor(x => x.ParticipantName)
            .MaximumLength(150)
            .When(x => !string.IsNullOrWhiteSpace(x.ParticipantName));

        RuleFor(x => x.RegistrationType)
            .Must(x => !x.HasValue || Enum.IsDefined(x.Value))
            .WithMessage("Invalid registration type.");

        RuleFor(x => x.Status)
            .Must(x => !x.HasValue || Enum.IsDefined(x.Value))
            .WithMessage("Invalid registration status.");

        RuleFor(x => x.Page)
            .GreaterThanOrEqualTo(1)
            .WithMessage("Page must be at least 1.");

        RuleFor(x => x.PageSize)
            .InclusiveBetween(1, 50)
            .WithMessage("Page size must be between 1 and 50.");
    }
}