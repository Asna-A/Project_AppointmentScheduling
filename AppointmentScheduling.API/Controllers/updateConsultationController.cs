using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class updateConsultationController : ControllerBase
    {
        private readonly IMediator mediator;

        public updateConsultationController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPatch]

        public async Task<int> updateConsultation([FromBody]int id)
        {

            return await mediator.Send(new updateConsultationCommand
            {
                Id = id
            });
          

        }
    }
}
