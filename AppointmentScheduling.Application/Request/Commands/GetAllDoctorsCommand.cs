using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Domain.Entity;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;

namespace AppointmentScheduling.Application.Request.Commands
{
    public class GetAllDoctorsCommand : IRequest<List<GetAllDoctorsDTO>>
    {
    }

    public class GetAllDoctorsCommandHandler : IRequestHandler<GetAllDoctorsCommand,List<GetAllDoctorsDTO>>
    {
        private readonly AppointmentSchedulingContext context;

        public GetAllDoctorsCommandHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }

        public async Task<List<GetAllDoctorsDTO>> Handle(GetAllDoctorsCommand request, CancellationToken cancellationToken)
        {
            List<GetAllDoctorsDTO> getAllDoctorsDTOsList = new List<GetAllDoctorsDTO>();
            
            foreach (Doctor doctor in context.Doctors)
            {
                GetAllDoctorsDTO getAllDoctorsDTO = new GetAllDoctorsDTO();
                getAllDoctorsDTO.id = doctor.Id;
                getAllDoctorsDTO.Name = doctor.Name;
                getAllDoctorsDTO.Experience = doctor.Experience;
                getAllDoctorsDTOsList.Add(getAllDoctorsDTO);
            }

            return await Task.FromResult(getAllDoctorsDTOsList);

        }
    }


}
