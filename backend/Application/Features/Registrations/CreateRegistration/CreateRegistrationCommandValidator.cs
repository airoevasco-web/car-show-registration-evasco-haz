namespace Application.Features.Registrations.CreateRegistration;

using Domain.Entities;
using FluentValidation;

public sealed class CreateRegistrationCommandValidator
    : AbstractValidator<CreateRegistrationCommand>
{
    public CreateRegistrationCommandValidator()
    {
        RuleFor(x => x.ParticipantName)
            .NotEmpty()
            .MaximumLength(150);

        RuleFor(x => x.ContactNumber)
            .NotEmpty()
            .Matches(@"^09\d{9}$")
            .WithMessage("Contact number must be a valid 11-digit Philippine mobile number.");

        RuleFor(x => x.Email)
            .NotEmpty()
            .EmailAddress()
            .MaximumLength(200);

        RuleFor(x => x.Address)
            .NotEmpty()
            .MaximumLength(300);

        RuleFor(x => x.CarMakeModel)
            .NotEmpty()
            .MaximumLength(100);

        RuleFor(x => x.PlateNumber)
            .NotEmpty()
            .MaximumLength(15);

        RuleFor(x => x.RegistrationType)
            .IsInEnum()
            .Must(x => Enum.IsDefined(x))
            .WithMessage("Invalid registration type.");

        RuleFor(x => x.AmountPaid)
            .GreaterThanOrEqualTo(0)
            .Must((command, amount) => command.RegistrationType switch
            {
                RegistrationType.Exhibitor => amount <= 1500m,
                RegistrationType.Competitor => amount <= 2500m,
                RegistrationType.VIP => amount <= 5000m,
                _ => false
            })
            .WithMessage("Amount paid cannot exceed the registration fee.");
    }
}