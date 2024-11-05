using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckUserExistController : ControllerBase
    {
        private readonly IMediator mediator;

        public CheckUserExistController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Login(CheckUserExist CheckUserExist)
        {
            var patientId = await mediator.Send(CheckUserExist);
            if (patientId == false)
            {
                return Ok(true);
            }
            else
            {
                return Ok(false);
            }
        }
    }
}