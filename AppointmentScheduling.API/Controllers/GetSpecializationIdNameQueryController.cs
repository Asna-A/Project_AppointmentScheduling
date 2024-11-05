using AppointmentScheduling.Application.Request.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AppointmentScheduling.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GetSpecializationIdNameQueryController : ControllerBase
    {
        private readonly IMediator mediator;

        public GetSpecializationIdNameQueryController(IMediator mediator)
        {
            this.mediator = mediator;
        }
        [HttpGet]
        public async Task<IActionResult> GetSpecializationIdName()
        {
            GetSpecializationIdNameQuery query = new GetSpecializationIdNameQuery();

            var specializations = await mediator.Send(query);

            if (specializations.Any())

                return Ok(specializations);
            return BadRequest();


        }
    }
}