using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class CheckUserExist : IRequest<bool>
    {
        public string userName { get; set; }

    }

    public class CheckUserExistHandler : IRequestHandler<CheckUserExist, bool>
    {
        private readonly AppointmentSchedulingContext context;

        public CheckUserExistHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<bool> Handle(CheckUserExist request, CancellationToken cancellationToken)
        {
            var patient = await context.patients.Where(x => x.UserName == request.userName).AnyAsync();

            if (patient == true)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
    }
}