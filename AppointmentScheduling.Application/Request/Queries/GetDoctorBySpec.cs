using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduling.Application.Request.Queries
{
    public class GetDoctorBySpec : IRequest<List<GetDoctorBySpecDTO>>
    {

        public int specializationId { get; set; }
    }

    public class GetDoctorBySpecHandler : IRequestHandler<GetDoctorBySpec, List<GetDoctorBySpecDTO>>
    {
        private readonly AppointmentSchedulingContext _context;

        public GetDoctorBySpecHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<List<GetDoctorBySpecDTO>> Handle(GetDoctorBySpec request, CancellationToken cancellationToken)
        {

            var doctors = await _context.DoctorSpecializations.Where(x => x.SpecializationId == request.specializationId).Include(x => x.Doctor).Select(x => new GetDoctorBySpecDTO
            {
                DoctorId = x.DoctorId.ToString(),
                Name = x.Doctor.Name,
                RegistrationId = x.Doctor.RegistrationId,
                Experience = x.Doctor.Experience
            }).ToListAsync();

            return doctors;


        }

    }

}
