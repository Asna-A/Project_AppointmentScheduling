using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class CheckDoctorExist : IRequest<string>
    {
        public string username { get; set; }
        public string password { get; set; }

    }

    public class CheckDoctorExistHandler : IRequestHandler<CheckDoctorExist, string>
    {
        private readonly AppointmentSchedulingContext context;

        public CheckDoctorExistHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }

        public async Task<string> Handle(CheckDoctorExist request, CancellationToken cancellationToken)
        {
            Boolean exist = context.Doctors.Any(x => x.UserName == request.username && x.Password == request.password);

            if (exist)
            {
                return await Task.FromResult("Correct");
            }
            else
            {
                return await Task.FromResult("InCorrect username or password");
            }
        }
    }
}