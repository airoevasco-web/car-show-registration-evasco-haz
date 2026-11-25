
namespace Application.Features.Registrations.GetRegistrationById;

using FluentValidation;

public sealed class GetRegistrationByIdQueryValidator
    : AbstractValidator<GetRegistrationByIdQuery>
{
    public GetRegistrationByIdQueryValidator()
    {
        RuleFor(x => x.Id)
            .NotEmpty()
            .WithMessage("Registration ID is required.");
    }
}
