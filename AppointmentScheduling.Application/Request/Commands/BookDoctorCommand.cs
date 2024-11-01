using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using static AppointmentScheduling.Domain.Entity.Appointments;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class BookDoctorCommand:IRequest<bool>
    {
        
            public string AppointmentDate { get; set; }
          
            public SlotTime slot { get; set; }

            public bool Status { get; set; } = true;

            public int PatientId { get; set; }

           
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
                    DoctorId = request.DoctorId,
                    PatientId = request.PatientId,
                    AppointmentDate = DateOnly.Parse(request.AppointmentDate),
                    slot = request.slot,
                    Status = request.Status



                };

                _context.Appointments.Add(appointment);
                await _context.SaveChangesAsync(cancellationToken);
                return true;
            

        }
    }


}
