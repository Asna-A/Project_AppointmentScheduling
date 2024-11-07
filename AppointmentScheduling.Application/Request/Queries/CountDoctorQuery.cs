using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
namespace AppointmentScheduling.Application.Request.Commands
{
    public class CountDoctorQuery : IRequest<GetCountDTO>
    {
        public int Id { get; set; }
    }

    public class CountDoctorHandler : IRequestHandler<CountDoctorQuery, GetCountDTO>
    {
        private readonly AppointmentSchedulingContext _context;

        public CountDoctorHandler(AppointmentSchedulingContext context)
        {
            _context = context;
        }
        public async Task<GetCountDTO> Handle(CountDoctorQuery request, CancellationToken cancellationToken)
        {
            
                GetCountDTO getCountDTO=new GetCountDTO();
                var count = await _context.DoctorSpecializations.CountAsync(x=>x.SpecializationId==request.Id);

                return new GetCountDTO { Count = count };


        }
    }
}