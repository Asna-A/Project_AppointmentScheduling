using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using static AppointmentScheduling.Domain.Entity.Appointments;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class CheckSlotCommand : IRequest<bool>
    {

        public string AppointmentDate { get; set; }

        public SlotTime slot { get; set; }

      

    }


    public class CheckSlotCommandHandler : IRequestHandler<CheckSlotCommand, bool>
    {
        private readonly AppointmentSchedulingContext _context;

        public CheckSlotCommandHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(CheckSlotCommand request, CancellationToken cancellationToken)
        {

            var appointmentDate=DateOnly.Parse(request.AppointmentDate);
            var slot = await _context.Appointments.Where(x => x.AppointmentDate == appointmentDate && x.slot == request.slot && x.Status == StatusEnum.live).AnyAsync(cancellationToken);

            if (slot == true)
            {
                return false;
            }
            else
            {
                return true;
            }


        }
    }


}
