using AppointmentScheduling.Application.Request.Commands;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CheckPatinetExistController : ControllerBase
    {
        private readonly IMediator mediator;

        public CheckPatinetExistController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        public async Task<string> checkUsernamePassword(Application.Request.Commands.CheckPatinetExist checkPatinetExist)
        {
            return await mediator.Send(checkPatinetExist);
        }
    }
}