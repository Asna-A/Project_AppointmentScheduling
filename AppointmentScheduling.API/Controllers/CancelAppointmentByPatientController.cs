using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CancelAppointmentByPatientController : ControllerBase
    {
        private readonly IMediator mediator;

        public CancelAppointmentByPatientController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPatch]

        public async Task<int> CancelAppointmentByPatient(CancelAppointmentByPatientCommand id)
        {
            return await mediator.Send(id);

        }
    }
}
