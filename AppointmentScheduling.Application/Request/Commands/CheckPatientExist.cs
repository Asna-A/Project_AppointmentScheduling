using AppointmentScheduling.Infrastructure.Data;
using MediatR;

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
        async Task<string> IRequestHandler<CheckPatinetExist, string>.Handle(CheckPatinetExist request, CancellationToken cancellationToken)
        {
            Boolean exist = context.patients.Any(x => x.UserName == request.userName && x.Password == request.password);
            if (exist)
            {
                return await Task.FromResult("Correct");
            }
            else
            {
                return await Task.FromResult("InCorrect username or password ");
            }

        }
    }
}