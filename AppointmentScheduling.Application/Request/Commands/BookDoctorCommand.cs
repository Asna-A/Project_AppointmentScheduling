using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using static AppointmentScheduling.Domain.Entity.Appointments;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class BookDoctorCommand : IRequest<BookStatusDTO>
    {
        public string AppointmentDate { get; set; }

        public SlotTime Slot { get; set; }

        public StatusEnum Status { get; set; }

        public int PatientId { get; set; }

        public int DoctorId { get; set; }

    }


    public class BookDoctorCommandHandler : IRequestHandler<BookDoctorCommand, BookStatusDTO>
    {
        private readonly AppointmentSchedulingContext _context;

        public BookDoctorCommandHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<BookStatusDTO> Handle(BookDoctorCommand request, CancellationToken cancellationToken)
        {

            Appointments appointment = new()
            {
                DoctorId = request.DoctorId,
                PatientId = request.PatientId,
                AppointmentDate = DateOnly.Parse(request.AppointmentDate),
                slot = request.Slot,
                Status = request.Status
            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync(cancellationToken);

            var status = request.Status;

            return new BookStatusDTO { Status = status };
        }
    }
}
