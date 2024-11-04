using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduling.Application.Request.Queries
{
    public class getPatientDetails : IRequest<getdoctorDetailsDTO>
    {

        public int patientId { get; set; }
    }

    public class getPatientDetailsHandler : IRequestHandler<getPatientDetails, getdoctorDetailsDTO>
    {
        private readonly AppointmentSchedulingContext _context;

        public getPatientDetailsHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<getdoctorDetailsDTO> Handle(getPatientDetails request, CancellationToken cancellationToken)
        {

            var patient = await _context.patients.Where(x => x.Id == request.patientId).Select(x => new getdoctorDetailsDTO
            {
                PatientName = x.PatientName,
                Age = x.Age,
                Gender = x.Gender,
                City = x.City,
                State = x.State,
                Pin = x.Pin,
                Phone = x.Phone,
                Email = x.Email
            }).FirstOrDefaultAsync(cancellationToken);

            return patient;


        }

    }
}
