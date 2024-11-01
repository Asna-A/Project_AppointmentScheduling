using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using static AppointmentScheduling.Domain.Entity.Appointments;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class BookDoctorCommand:IRequest<bool>
    {
        
            public DateOnly AppointmentDate { get; set; }
          
            public SlotTime slot { get; set; }
            public bool Status { get; set; } = true;

            public Patients Patient { get; set; }
            public int PatientId { get; set; }

            public Doctor Doctor { get; set; }
            public int DoctorId { get; set; }
 
    }


    public class BookDoctorCommandHandler : IRequestHandler<BookDoctorCommand, bool>
    {
        private readonly AppointmentSchedulingContext _context;

        public BookDoctorCommandHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(BookDoctorCommand request, CancellationToken cancellationToken)
        {
            var appointment = new Appointments
            {
                DoctorId=request.DoctorId,
                PatientId=request.PatientId,
                AppointmentDate=request.AppointmentDate,
                slot=request.slot,
                Status=request.Status,
                Patient=request.Patient,
                Doctor=request.Doctor


            };

            _context.Appointments.Add(appointment);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }
    }


}
