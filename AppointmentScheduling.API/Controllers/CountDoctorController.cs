using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountDoctorController : ControllerBase
    {

        private readonly IMediator _mediator;

        public CountDoctorController(IMediator mediator)
        {
            _mediator = mediator;
        }

 
        [HttpGet("{specializationId}/doctor-count")]
        public async Task<GetCountDTO> CountDoctor(int specializationId)
        {
            CountDoctorQuery query = new CountDoctorQuery();   
            query.Id = specializationId;
            return await _mediator.Send(query);
        }
    }
}
