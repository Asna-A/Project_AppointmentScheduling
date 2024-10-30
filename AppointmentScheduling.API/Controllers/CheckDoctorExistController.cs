using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckDoctorExistController : ControllerBase
    {
        private readonly IMediator mediator;

        public CheckDoctorExistController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<string> checkUsernamePassword(CheckDoctorExist checkDoctorExist)
        {
            return await mediator.Send(checkDoctorExist);
        }
    }
}