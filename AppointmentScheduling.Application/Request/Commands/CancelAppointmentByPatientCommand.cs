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
    public class CancelAppointmentByPatientCommand : IRequest<int>
    {
        public int Id { get; set; } 
    }

    public  class CancelAppointmentByPatientCommandHandler : IRequestHandler<CancelAppointmentByPatientCommand, int>
    {
        private readonly AppointmentSchedulingContext context;

        public CancelAppointmentByPatientCommandHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<int> Handle(CancelAppointmentByPatientCommand request, CancellationToken cancellationToken)
        {
            Appointments appointments = context.Appointments.Where(x => x.Id == request.Id).FirstOrDefault();

            appointments.Status = Appointments.StatusEnum.cancelled;
            appointments.slot = AppointmentScheduling.Domain.Entity.Appointments.SlotTime.NineToNineThirty;
            context.Appointments.Update(appointments);
            return await context.SaveChangesAsync();
        }

    }
}
