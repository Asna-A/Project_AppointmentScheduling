using AppointmentScheduling.Application.DTO;
using AppointmentScheduling.Application.Request.Queries;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetAllAppointmentsByIdController : ControllerBase
    {
        private readonly IMediator mediator;

        public GetAllAppointmentsByIdController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{id}")]

        public async Task<List<GetAllAppointmentsOfPatientByIdDTO>> GetAllAppointmentById(int id)
        {
            return await mediator.Send(new GetAllAppointmentsOfPatientQuery { Id = id });
        }
    }
}
