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

        [HttpPatch("{id}")]  
        public async Task<int> Update(int id,UpdateDetailsCommand update)
        {
           
            update.Id = id;
            return await mediator.Send(update);
        }
    }
}
