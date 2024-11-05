using AppointmentScheduling.Application.Functions;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class CheckPatinetExist : IRequest<string>
    {
        public string userName { get; set; }
        public string password { get; set; }
    }

    public class CheckPatinetExistHandler : IRequestHandler<CheckPatinetExist, string>
    {
        private readonly AppointmentSchedulingContext context;

        public CheckPatinetExistHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<string>Handle(CheckPatinetExist request, CancellationToken cancellationToken)
        {
            Hashing hashing = new Hashing();
            var hashedPassword = hashing.HashPassword(request.password);
            var patient = await context.patients.Where(x => x.UserName == request.userName && x.Password == hashedPassword).Select(x => new { x.Id }).FirstOrDefaultAsync(cancellationToken);
            if (patient!=null)
            {
                return patient.Id.ToString();
            }
            else
            {
                return null;
            }

        }
    }
}