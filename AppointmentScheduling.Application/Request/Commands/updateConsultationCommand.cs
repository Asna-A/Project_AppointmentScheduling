using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class updateConsultationCommand : IRequest<int>
    {
        public int Id { get; set; }
    }

    public class updateConsultationCommandHandler : IRequestHandler<updateConsultationCommand, int>
    {
        private readonly AppointmentSchedulingContext context;

        public updateConsultationCommandHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<int> Handle(updateConsultationCommand request, CancellationToken cancellationToken)
        {
            Appointments appointments = context.Appointments.Where(x => x.Id == request.Id).FirstOrDefault();

            appointments.Status = Appointments.StatusEnum.consulted;
            context.Appointments.Update(appointments);
            return await context.SaveChangesAsync();
        }

    }
}
