using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduling.Application.Request.Queries
{
    public class GetAllAppointmentsOfPatientQuery: IRequest<List<GetAllAppointmentsOfPatientByIdDTO>>
    {
        public int Id { get; set; } 
    }

    public class GetAllAppointmentsOfPatientQueryHandler : IRequestHandler<GetAllAppointmentsOfPatientQuery, List<GetAllAppointmentsOfPatientByIdDTO>>
    {
        private readonly AppointmentSchedulingContext _context;

        public GetAllAppointmentsOfPatientQueryHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<List<GetAllAppointmentsOfPatientByIdDTO>> Handle(GetAllAppointmentsOfPatientQuery request, CancellationToken cancellationToken)
        {
            return await _context.Appointments
                .Where(a => a.PatientId == request.Id)
                .Include(a => a.Doctor)
                .ThenInclude(d => d.DoctorSpecializations)
                .ThenInclude(ds => ds.Specialization)
                .Select(a => new GetAllAppointmentsOfPatientByIdDTO
                {
                    Id = a.Id,
                    DoctorName = a.Doctor.Name,
                    DoctorSpecialization = a.Doctor.DoctorSpecializations
                                            .Select(ds => ds.Specialization.SpecializationName).ToList()
                                            ,
                    AppointmentDate = a.AppointmentDate,
                    SlotTime = a.slot,
                    Status = a.Status,
                }).ToListAsync(cancellationToken);
        }
    }
}
