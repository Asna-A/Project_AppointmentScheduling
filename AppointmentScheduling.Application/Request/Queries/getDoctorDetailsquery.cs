using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AppointmentScheduling.Application.Request.Queries
{
    public class getDoctorDetailsQuery : IRequest<getDoctorDetailsDTO>
    {

        public int doctorId { get; set; }
    }

    public class getDoctorDetailsQueryHandler : IRequestHandler<getDoctorDetailsQuery, getDoctorDetailsDTO>
    {
        private readonly AppointmentSchedulingContext _context;

        public getDoctorDetailsQueryHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<getDoctorDetailsDTO> Handle(getDoctorDetailsQuery request, CancellationToken cancellationToken)
        {

            var doctor = await _context.Doctors.Where(x => x.Id == request.doctorId).Include(x=>x.DoctorSpecializations).ThenInclude(x => x.Specialization).Select(x => new getDoctorDetailsDTO
            {

              Name=x.Name,
              Experience=x.Experience,
              RegistrationId=x.RegistrationId,
              specializations=x.DoctorSpecializations.Select(x=>x.Specialization.SpecializationName).ToArray()
            }).FirstOrDefaultAsync(cancellationToken);

            return doctor;


        }

    }
}
