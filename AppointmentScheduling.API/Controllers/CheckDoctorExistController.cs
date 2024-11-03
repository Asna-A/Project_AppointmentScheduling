using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class doctorLoginController : ControllerBase
    {
        private readonly IMediator mediator;

        public doctorLoginController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> Login(checkDoctorExist checkDoctorExist)
        {
            var doctorId = await mediator.Send(checkDoctorExist);
            if (doctorId != null)
            {
                return Ok(new { doctorId });
            }
            else
            {
                return Unauthorized("Incorrect username or password");
            }
        }
    }
}