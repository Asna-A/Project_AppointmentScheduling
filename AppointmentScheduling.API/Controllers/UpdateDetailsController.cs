using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UpdateDetailsController : ControllerBase
    {
        private readonly IMediator mediator;

        public UpdateDetailsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPatch("{id}")]  // Accept the ID as a route parameter
        public async Task<int> Update(int id,UpdateDetailsCommand update)
        {
            // Set the command's Id property with the route parameter value
            update.Id = id;
            return await mediator.Send(update);
        }
    }
}
