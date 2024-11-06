using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckSlotController : ControllerBase
    {
        private readonly IMediator _mediator;

        public CheckSlotController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<bool> CheckSlot([FromBody] CheckSlotCommand command)
        {
            var result = await _mediator.Send(command);
            
            return result;

            
        }
    }
}
