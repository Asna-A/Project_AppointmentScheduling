using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class checkDoctorExist : IRequest<string>
    {
        public string userName { get; set; }
        public string password { get; set; }
    }

    public class checkDoctorExistHandler : IRequestHandler<checkDoctorExist, string>
    {
        private readonly AppointmentSchedulingContext context;

        public checkDoctorExistHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<string> Handle(checkDoctorExist request, CancellationToken cancellationToken)
        {
            var doctor = await context.Doctors.Where(x => x.UserName == request.userName && x.Password == request.password).Select(x => new { x.Id }).FirstOrDefaultAsync(cancellationToken);

            if (doctor != null)
            {
                return doctor.Id.ToString();
            }
            else
            {
                return null;
            }

        }
    }
}