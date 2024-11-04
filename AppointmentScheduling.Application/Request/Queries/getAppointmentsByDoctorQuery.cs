using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AppointmentScheduling.Application.Request.Queries
{
    public class GetAppointmentsByDoctorQuery : IRequest<List<GetAppointmentsByDoctorDTO>>
    {
        public int Id { get; set; }
    }

    public class GetAppointmentsByDoctorQueryHandler : IRequestHandler<GetAppointmentsByDoctorQuery, List<GetAppointmentsByDoctorDTO>>
    {
        private readonly AppointmentSchedulingContext _context;

        public GetAppointmentsByDoctorQueryHandler(AppointmentSchedulingContext context)
        {
           _context = context;
        }
        public async Task<List<GetAppointmentsByDoctorDTO>> Handle(GetAppointmentsByDoctorQuery request, CancellationToken cancellationToken)
        {
            var AppointmentList =await _context.Appointments
                .Where(a => a.DoctorId == request.Id)
                .Include(a=>a.Patient)
                .Select(a => new GetAppointmentsByDoctorDTO
                { 
                    patientName = a.Patient.PatientName,
                    AppointmentDate = a.AppointmentDate,
                    SlotTime = a.slot,
                    status = a.Status,
                }).ToListAsync();
            return AppointmentList;
        }
    }
}
