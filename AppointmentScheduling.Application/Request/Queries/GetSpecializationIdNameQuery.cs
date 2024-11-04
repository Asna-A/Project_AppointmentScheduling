using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Infrastructure.Data;
using MediatR;

namespace AppointmentScheduling.Application.Request.Queries
{
    public class GetSpecializationIdNameQuery : IRequest<List<GetSpecializationIdNameDTO>>
    {

    }

    public class GetSpecializationIdNameQueryHandler : IRequestHandler<GetSpecializationIdNameQuery, List<GetSpecializationIdNameDTO>>
    {
        private readonly AppointmentSchedulingContext context;

        public GetSpecializationIdNameQueryHandler(AppointmentSchedulingContext context)
        {
            this.context = context;
        }
        public async Task<List<GetSpecializationIdNameDTO>> Handle(GetSpecializationIdNameQuery request, CancellationToken cancellationToken)
        {
            List<GetSpecializationIdNameDTO> getSpecializationIdNameDTOList = new List<GetSpecializationIdNameDTO>();
            getSpecializationIdNameDTOList = context.Specializations.Select(x => new GetSpecializationIdNameDTO
            {
                Id = x.Id,
                specializationName = x.SpecializationName,
            }).ToList();

            return await Task.FromResult(getSpecializationIdNameDTOList);
        }
    }
}

