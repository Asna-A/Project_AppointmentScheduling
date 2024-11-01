using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IMediator mediator;

        public LoginController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Login(CheckPatinetExist checkPatinetExist)
        {
            var patientId = await mediator.Send(checkPatinetExist);
            if (patientId != null)
            {
                return Ok(new { patientId });
            }
            else
            {
                return Unauthorized("Incorrect username or password");
            }
        }
    }
}